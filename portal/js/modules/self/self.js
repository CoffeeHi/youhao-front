require.config ( {
    baseUrl: 'js',
    paths      : {
        'jq': 'plugins/jquery-1.11.2.min',
        "domReady": 'plugins/ready.min',
        'login':'modules/login/login',
        'top':'common/top',
        'base':'common/base'
    },
    shim       : {},
    packages   : [],
    waitSeconds: 0,
    callback   : function () {
        require ( ['domReady', 'jq', 'top', 'login'], function (d, j, t, login) {

            var restful = require('common/restful');
            var base = require('common/base');
            var flushLogin = login.flushLogin;

            var http = restful.http;
            var method = restful.method;
            var editUrl = 'web/front/user/edit';
            var detailUrl = 'web/front/user/detail';
            var editData = {
                name:'',
                addr:'',
                job:'',
                sig:'',
                intro:''
            };

            var param = window.location.search.substr(1);
            if(param == 1){
                $('#userMsg').show().siblings('div').hide();
                $('#myMsg').addClass(' item-active').siblings('.item-active').removeClass('item-active');
            }else if(param == 2){

            }else if(param == 3){
                $('#userInfo').show().siblings('div').hide();
                $('#myInfo').addClass(' item-active').siblings('.item-active').removeClass('item-active');
                getUserInfo();
            }

            /*右边导航*/
            $('.list-group a').click(function () {
                $('.category h4').html($(this).text());
                $(this).addClass(' item-active').siblings('.item-active').removeClass('item-active');
                if($(this).attr('id') === 'myInfo'){
                    $('#userInfo').show().siblings('div').hide();
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
                editData.addr = $('#addrInput').val();
                editData.intro = $('#introInput').val();
                editData.job = $('#jobInput').val();
                editData.sig = $('#sigInput').val();
                editData.name = $('#nameInput').val();
                http(editUrl, {action:method.PUT, sync:true, data:editData}, function (o) {
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
                http(detailUrl, {action:method.GET}, function (o) {
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
    }
} );

