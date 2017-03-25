require.config ( {
    baseUrl: 'js',
    paths      : {
        'jq': 'plugins/jquery-1.11.2.min',
        "domReady": 'plugins/ready.min',
        'login':'modules/login/login',
        'upload':'modules/self/uploadUserImage',
        'cropper':'plugins/cropper.min'
    },
    shim       : {
        'login':['jq'],
        'upload':['jq','cropper','login'],
        'cropper':['jq']
    },
    packages   : [],
    waitSeconds: 0
} );
require ( ['domReady', 'jq', 'login', 'upload', 'cropper'], function (d, j, login) {

    var restful = require('common/restful');
    var flushLogin = login.checkLogin;

    var http = restful.http;
    var method = restful.method;
    var userUrl = 'web/front/user';
    //var detailUrl = 'web/front/user/detail';
    var editData = {
        name:'',
        addr:'',
        job:'',
        sig:'',
        intro:''
    };

    var param = window.location.search.substr(1);
    if(param == 1){
        $('#cateName').html($('#myMsg').text());
        $('#userMsg').show().siblings('div').hide();
        $('#myMsg').addClass(' item-active').siblings('.item-active').removeClass('item-active');
    }else if(param == 2){
        $('#cateName').html($('#myTour').text());
    }else if(param == 3){
        $('#cateName').html($('#myInfo').text());
        $('#userInfo').show().siblings('div').hide();
        $('#myInfo').addClass(' item-active').siblings('.item-active').removeClass('item-active');
        getUserInfo();
    }

    /*右边导航*/
    $('.list-group a').click(function () {
        $('#cateName').html($(this).text());
        $(this).addClass(' item-active').siblings('.item-active').removeClass('item-active');
        if($(this).attr('id') === 'myInfo'){
            $('#userInfo').show().siblings('div').hide();
            getUserInfo();
        }else if($(this).attr('id') === 'myMsg'){
            $('#userMsg').show().siblings('div').hide();
        }else if($(this).attr('id') === 'myTour'){
        }
    });

    /*编辑个人信息*/
    $('#editInfo').on('click', function () {
        $(this).hide();
        $('#saveInfo').show();
        //展现输入框
        $('#addrInput').val($('#addr').text()).show();
        $('#jobInput').val($('#job').text()).show();
        $('#introInput').val($('#intro').text()).show();
        $('#editName, #editSig').show();
        $('#nameInput').val($('.name').text());
        $('#sigInput').val($('.sig').text());
        //隐藏用户信息
        $('#job').hide();
        $('#addr').hide();
        $('#intro').hide();
        $('#nameSig').hide();
    });

    /*保存个人信息*/
    $('#saveInfo').on('click', function () {
        editData.addr = $('#addrInput').val().trim();
        editData.intro = $('#introInput').val().trim();
        editData.job = $('#jobInput').val().trim();
        editData.sig = $('#sigInput').val().trim();
        editData.name = $('#nameInput').val().trim();
        http(userUrl, {action:method.PUT, sync:true, data:editData}, function (o) {
            if(o.status){
                $('#nameSig').show();
                $('.name').text(editData.name).show();
                $('.sig').text(editData.sig).show();
                $('#addr').text(editData.addr).show();
                $('#job').text(editData.job).show();
                $('#intro').text(editData.intro).show();
                //隐藏输入框
                $('#addrInput').hide();
                $('#jobInput').hide();
                $('#introInput').hide();
                $('#editName, #editSig').hide();
                flushLogin();
                //保存按钮切换成编辑按钮
                $('#saveInfo').hide();
                $('#editInfo').show();
            }
        });
    });

    /*获取用户信息*/
    function getUserInfo(){
        http(userUrl, {action:method.GET}, function (o) {
            if(o.status){
                var data = o.info;
                $('#name').text(data.name);
                $('#sig').text(data.sig);
                $('#addr').text(data.addr);
                $('#job').text(data.job);
                $('#intro').text(data.intro);
                $('#image').attr('src', data.image);
            }
        });
    }
} );


