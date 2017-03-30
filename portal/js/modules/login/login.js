;
define(['common/restful', 'common/base', 'common/cookie', 'plugins/template', 'template/login/loginInfo', 'template/login/modal'], function (restful, base, cookie, temp, loginInfo) {

    var http = restful.http;
    var method = restful.method;
    var codeType = base.codeType;
    var numType = base.numType;
    var setCookie = cookie.setCookie;
    var getCookie = cookie.getCookie;
    var LOG_PASS =false; //登录验证正确
    var REG_PASS =false; //注册验证正确
    var regUrl = "web/login/register/account/";
    var logUrl = "web/login/login/front/";
    var chkUrl = "web/login/login/frontCheck/";
    var exitUrl = "web/login/login/frontExit";
    //var removeCookie = require('common/cookie').delCookie;
    var loginInfo = loginInfo.toString;
    var render = temp.compile(loginInfo);

    window.scrollTo(0, 1);

    //加载验证码
    (function initValidateCode() {
        $('#logValiText').focus(function () {
            if ($('#logValiImg').css('display') === 'none') {
                $('#logValiImg').attr('src', 'web/login/validate/getValidateImg/1?' + new Date().valueOf());
                $('#logValiImg').show();
            }
        });
        $('#regValiText').focus(function () {
            if ($('#regValiImg').css('display') === 'none') {
                $('#regValiImg').attr('src', 'web/login/validate/getValidateImg/2?' + new Date().valueOf());
                $('#regValiImg').show();
            }
        });
        $('#logValiImg, #regValiImg').click(function () {
            $(this).attr('src', $(this).attr('src').substr(0, $(this).attr('src').indexOf('?') + 1) + new Date().valueOf());
        });
    })();

    //正则验证
    var phoneReg = /(^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)|(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/;
    var emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var passReg = /^(\w){6,20}$/;

    //提示
    var numWarn = {
        empty: '账号不能为空',
        phone: '请输入正确手机号',
        email:'请输入有效格式邮箱'
    };
    var passWarn = {
        empty: '密码不能为空',
        range: '密码为6到20位',
        format :'密码为字母和数字组合'
    };
    var codeWarn = {
        EMPTY: '验证码不能为空',
        ERROR: '验证码错误'
    };
    var validateRight = '<span class="glyphicon glyphicon-ok" style="color:#42E4d8;" aria-hidden="true"></span>';

    /**
     * 校验账号(错误返回false)
     * @param text 校验值
     * @param type 校验类型 1-登录 2-注册
     */
    function validateNum(num, type) {
        if (num.length < 1) {
            if (type == codeType.LOGIN) {
                $('#logNumWarn').text(numWarn.empty);
            } else {
                $('#regNumWarn').text(numWarn.empty);
            }
            return false;
        } else {
            if (num.indexOf('@') != -1) { //是否是邮箱
                if (!emailReg.test(num)) {
                    if (type === codeType.LOGIN) {
                        $('#logNumWarn').text(numWarn.email);
                    } else {
                        $('#regNumWarn').text(numWarn.email);
                    }
                    return false;
                }
            } else {
                if (!phoneReg.test(num)) {
                    if (type === codeType.LOGIN) {
                        $('#logNumWarn').text(numWarn.phone);
                    } else {
                        $('#regNumWarn').text(numWarn.phone);
                    }
                    return false;
                }
            }
        }
        if (type == codeType.LOGIN) {
            $('#logNumWarn').html(validateRight);
        } else {
            $('#regNumWarn').html(validateRight);
        }
        return true;
    }

    /**
     * 校验密码(错误返回false)
     * @param pass 密码值
     * @param type 校验类型 1-登录 2-注册
     */
    function validatePass(pass, type) {
        if (pass.length < 1) {
            if (type === codeType.LOGIN) {
                $('#logPassWarn').text(passWarn.empty);
            } else {
                $('#regPassWarn').text(passWarn.empty);
            }
            return false;
        } else if (!(pass.length >= 6 && pass.length <= 20)) {
            if (type === codeType.LOGIN) {
                $('#logPassWarn').text(passWarn.range);
            } else {
                $('#regPassWarn').text(passWarn.range);
            }
            return false;
        } else {
            if (!passReg.test(pass)) {
                if (type === codeType.LOGIN) {
                    $('#logPassWarn').text(passWarn.format);
                } else {
                    $('#regPassWarn').text(passWarn.format);
                }
                return false;
            }
        }
        if (type == codeType.LOGIN) {
            $('#logPassWarn').html(validateRight);
        } else {
            $('#regPassWarn').html(validateRight);
        }
        return true;
    }

    var rightCode = false;
    /**
     * 校验验证码是否正确
     * @param type 验证码类型
     * @param code
     */
    function ifCodeRight(type, code){
        if(code ==null || code == ''){
            if (type == codeType.LOGIN) {
                $('#logValiWarn').text(codeWarn.EMPTY);
            } else {
                $('#regValiWarn').text(codeWarn.EMPTY);
            }
            return false;
        }else {
            var valiUrl = 'web/login/validate/validation/'+ type +'/' + code;
            http(valiUrl, {action:method.GET}, function (o) {
                if(o.info == true){
                    if (type == codeType.LOGIN) {
                        $('#logValiWarn').html(validateRight);
                    } else {
                        $('#regValiWarn').html(validateRight);
                    }
                    rightCode = true;
                }else {
                    if (type == codeType.LOGIN) {
                        $('#logValiWarn').text(codeWarn.ERROR);
                    } else {
                        $('#regValiWarn').text(codeWarn.ERROR);
                    }
                    rightCode = false;
                }
            });
            return rightCode;
        }
    }

    //监听登录数据变化
    $('#logNum').on('input propertychange', function () {
        validateNum($(this).val().trim(), 1);
    });
    $('#logPass').on('input propertychange', function () {
        validatePass($(this).val().trim(), 1);
    });
    $('#logValiText').on('input propertychange', function () {
        if($(this).val().trim().length == 0){
            $('#logValiWarn').text(codeWarn.EMPTY);
        }else{
            ifCodeRight(codeType.LOGIN, $(this).val().trim());
        }
    });

    //监听注册数据变化
    $('#regNum').on('input propertychange', function () {
        validateNum($(this).val().trim(), codeType.REG);
    });
    $('#regPass').on('input propertychange', function () {
        validatePass($(this).val().trim(), codeType.REG);
    });
    $('#regValiText').on('input propertychange', function () {
        if($(this).val().trim().length == 0){
            $('#regValiWarn').text(codeWarn.EMPTY);
        }else{
            ifCodeRight(codeType.REG, $(this).val().trim());
        }
    });

    //初始化注册按钮
    $('#regBtn').on('click', function () {
        var rightNum = validateNum($('#regNum').val().trim(), codeType.REG);
        var rightPass = validatePass($('#regPass').val().trim(), codeType.REG);
        var rightCode = ifCodeRight(codeType.REG, $('#regValiText').val().trim());
        if(rightCode && rightNum && rightPass){
            var restUrl = regUrl + $('#regNum').val().trim() + '/' + $('#regPass').val().trim() + '/' + ($('#regNum').val().trim().indexOf('@') != -1 ? numType.EMAIL : numType.PHONE);
            http(restUrl, {action: method.POST}, function (o) {
                if(o.info == 1){
                    $('#regWarn').text('注册成功，请登录...').addClass('submit-success');
                    setTimeout(function () {
                        clearLoginForm();
                        $('#logTab').trigger('click');
                        $('#logNum').val($('#regNum').val().trim());
                        clearRegForm();
                    },2000);
                }else {
                    $('#regWarn').text(o.info).removeClass('submit-success');
                }
            });
        }
    });

    //初始化登录按钮
    $('#logBtn').on('click', function () {
        var rightNum = validateNum($('#logNum').val().trim(), codeType.LOGIN);
        var rightPass = validatePass($('#logPass').val().trim(), codeType.LOGIN);
        var rightCode = ifCodeRight(codeType.LOGIN, $('#logValiText').val().trim());
        if(rightCode && rightNum && rightPass){
            var restUrl = logUrl + $('#logNum').val().trim() + '/' + $('#logPass').val().trim();
            http(restUrl, {action: method.GET}, function (o) {
                if(o.status){
                    $('#logWarn').text('登录成功').addClass('submit-success');
                    setTimeout(function () {
                        $('#logCloseBtn').trigger('click');
                        var html = render({loginInfo : o.info, haveLogin:true});
                        if($('#toLogin').length == 0){
                            $('.social-icons').after(html);
                        }else{
                            $('#toLogin').replaceWith(html);
                        }
                    }, 1500);
                    for(var a in o.info){
                        setCookie(a, o.info[a], 1);
                    }
                    location.reload(true);
                }else {
                    $('#logWarn').text(o.info).removeClass('submit-success');
                }
            });
        }
    });

    //验证是否是否已登录
    function checkLogin(){
        http(chkUrl, {action: method.GET}, function (o) {
            if(o.status){
                if($('.user').length == 0){
                    var html = render({loginInfo : o.info, haveLogin:true});
                    if($('#toLogin').length == 0){
                        $('.social-icons').after(html);
                    }else{
                        $('#toLogin').replaceWith(html);
                    }
                }else if($('.user').length > 0){
                    var html = render({loginInfo: o.info, haveLogin: true});
                    $('.user').length == 1 && $('.user').replaceWith(html);
                }
                for(var a in o.info){
                    setCookie(a, o.info[a], 1);
                }
                $('#exit').click(function () { //绑定退出按钮
                    http(exitUrl, {action: method.DELETE}, function () {

                        location.reload(true);
                    });
                });
            }else {
                if($('#toLogin').length == 0){
                    var html = render({haveLogin:false});
                    if($('.user').length == 0){
                        $('.social-icons').after(html);
                    }else {
                        $('.user').replaceWith(html);
                    }
                }
            }
        });
    }

    checkLogin();
    //setInterval(function(){
    //    checkLogin();
    //}, 10000);

    //刷新用户信息
    //function flushLogin(){
    //    http(chkUrl, {action: method.GET, sync: true}, function (o) {
    //        if (o.status) {
    //
    //        }
    //    });
    //}

    $('#logCloseBtn').on('click', function () {
       clearLoginForm();
        clearRegForm();
    });

    $('#regCloseBtn').on('click', function () {
        clearRegForm();
        clearLoginForm();
    });

    //清除登录表单
    function clearLoginForm(){
        //清除表单数据
        $('#logPass').val('');
        $('#logNum').val('');
        $('#logValiText').val('');
        $('#logValiImg').hide();
        //清除校验提示
        $('#log .input-warn').html('');
        $('#logWarn').text('');
    }

    //清除注册表单
    function clearRegForm(){
        //清除表单数据
        $('#regPass').val('');
        $('#regNum').val('');
        $('#regValiText').val('');
        $('#regValiImg').hide();
        //清除校验提示
        $('#reg .input-warn').html('');
        $('#regWarn').text('');
    }

    return {
        checkLogin:checkLogin
    }
});