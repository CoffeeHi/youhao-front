require.config({
    baseUrl: 'js',
    paths: {
        'jq': 'plugins/jquery-1.11.2.min',
        "domReady": 'plugins/ready.min',
        'moveTop': 'plugins/move-top',
        'easing': 'plugins/easing',
        'bootstrap': 'plugins/bootstrap.min',
        'resp': 'plugins/responsiveslides.min'
    },
    shim: {
        'moveTop': ['jq'],
        'easing': ['jq'],
        'bootstrap': ['jq'],
        'resp': ['jq']
    },
    packages: [],
    waitSeconds: 0,
    callback: function () {
        require(['domReady', 'resp', 'moveTop', 'easing', 'bootstrap'], function () {
            (function moveSlowly() {
                <!-- start-smoth-scrolling-->
                $(".scroll").click(function (event) {
                    event.preventDefault();
                    $('html,body').animate({scrollTop: $(this.hash).offset().top}, 1000);
                });
                <!--smooth-scrolling-of-move-up-->
                $().UItoTop({easingType: 'easeOutQuart'});
            })();
            //banner
            (function initBanner() {
                //banner
                $("#slider3").responsiveSlides({
                    auto: true, //自动播放
                    pager: false, //显示页码
                    nav: true, //显示左右导航
                    speed: 500, //动画持续时间，单位为毫秒
                    namespace: "callbacks", //修改默认的容器名称
                    before: function () { //切换前的回调函数
                        $('.events').append("<li>before event fired.</li>");
                    },
                    after: function () { //切换完成后回调函数
                        $('.events').append("<li>after event fired.</li>");
                    }
                });
            })();
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
                        $('#regValiImg').attr('src', 'web/login/validate/getValidateImg/1?' + new Date().valueOf());
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
            var passReg = /^[A-Za-z0-9]{6,20}$/;

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
                empty: '验证码不能为空',
                range: '请输入4位验证码'
            };
            var validateRight = '<span class="glyphicon glyphicon-ok" style="color:#42E4d8;" aria-hidden="true"></span>';

            /**
             * 账号
             * @param text 校验值
             * @param type 校验类型 1-登录 2-注册
             */
            function validateNum(num, type) {
                if (num.length < 1) {
                    if (type == 1) {
                        $('#logNumWarn').text(numWarn.empty);
                    } else {
                        $('#regNumWarn').text(numWarn.empty);
                    }
                    return false;
                } else {
                    if (num.indexOf('@') != -1) { //是否是邮箱
                        if (!emailReg.test(num)) {
                            if (type === 1) {
                                $('#logNumWarn').text(numWarn.email);
                            } else {
                                $('#regNumWarn').text(numWarn.email);
                            }
                            return false;
                        }
                    } else {
                        if (!phoneReg.test(num)) {
                            if (type === 1) {
                                $('#logNumWarn').text(numWarn.phone);
                            } else {
                                $('#regNumWarn').text(numWarn.phone);
                            }
                            return false;
                        }
                    }
                }
                if (type == 1) {
                    $('#logNumWarn').html(validateRight);
                } else {
                    $('#regNumWarn').html(validateRight);
                }
            }

            /**
             * 校验密码
             * @param pass 密码值
             * @param type 校验类型 1-登录 2-注册
             */
            function validatePass(pass, type) {
                if (pass.length < 1) {
                    if (type === 1) {
                        $('#logPassWarn').text(passWarn.empty);
                    } else {
                        $('#regPassWarn').text(passWarn.empty);
                    }
                    return false;
                } else if (!(pass.length >= 6 && pass.length <= 20)) {
                    if (type === 1) {
                        $('#logPassWarn').text(passWarn.range);
                    } else {
                        $('#regPassWarn').text(passWarn.range);
                    }
                    return false;
                } else {
                    if (!passReg.test(pass)) {
                        if (type === 1) {
                            $('#logPassWarn').text(passWarn.format);
                        } else {
                            $('#regPassWarn').text(passWarn.format);
                        }
                        return false;
                    }
                }
                if (type == 1) {
                    $('#logPassWarn').html(validateRight);
                } else {
                    $('#regPassWarn').html(validateRight);
                }
            }

            //校验验证码
            function validateCode(code, type) {
                if (code.length < 1) {
                    if (type === 1) {
                        $('#logValiWarn').text(codeWarn.empty);
                    } else {
                        $('#regValiWarn').text(codeWarn.empty);
                    }
                    return false ;
                }else if(code.length < 4){
                    if (type === 1) {
                        $('#logValiWarn').text(codeWarn.range);
                    } else {
                        $('#regValiWarn').text(codeWarn.range);
                    }
                    return false;
                }
                if (type == 1) {
                    $('#logValiWarn').html(validateRight);
                } else {
                    $('#regValiWarn').html(validateRight);
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
                validateCode($(this).val().trim(), 1);
            });
            //监听注册数据变化
            $('#regNum').on('input propertychange', function () {
                validateNum($(this).val().trim(), 2);
            });
            $('#regPass').on('input propertychange', function () {
                validatePass($(this).val().trim(), 2);
            });
            $('#regValiText').on('input propertychange', function () {
                validateCode($(this).val().trim(), 2);
            });
        });
    }
});

