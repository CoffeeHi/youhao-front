require.config ( {
    baseUrl: 'js',
    paths      : {
        'jq': 'plugins/jquery-1.11.2.min',
        "domReady": 'plugins/ready.min',
        'login':'modules/login/login'
    },
    shim       : {
        'login':['jq']
    },
    packages   : [],
    waitSeconds: 0
} );
require ( ['domReady','jq', 'login'], function () {
    var http = require('common/restful').http;
    var method = require('common/restful').method;
    var base = require('common/base');
    var toast = require('common/toast').toast;
    var toastHtml = require('common/toast').toastHtml;
    var toastDetail = require('common/toast').toastDetail;
    var toastType = require('common/toast').toastType;

    var template = require('plugins/template');
    //var touristsTpl = tourists.toString;
    //var touristsRender = template.compile(touristsTpl);
    //template.helper('getRole', function (role) {
    //    return base.getRole(role);
    //});

    var tourId = location.search.substr(1);
    var tourUrl = 'web/front/tour/' + tourId; //获取旅单详情
    var tourJoinUrl = 'web/front/tour/' + tourId + '/role/'; //加入旅单
    var tourTouristsUrl = 'web/front/tour/' + tourId + '/tourists'; //获取旅单人员
    var tourExitUrl = 'web/front/tour/' + tourId; //退出旅单

    var contact = '';
    var contactType = 0;

    getTour();
    getTourists();

    //获取旅单信息
    function getTour(){
        http(tourUrl, {action:method.GET}, function (resp) {
            if(resp.status){
                var tour = resp.info;
                //state
                var tourState = base.getTourState(tour.state);
                $('#tourState').text(tourState);
                //tags
                var tagsHtml = '';
                tour.tags.forEach(function (val) {
                    tagsHtml += '<span class="label label-primary">' + val + '</span> '
                });
                $('.tags').html(tagsHtml);
                // the rest
                $('#target').text(tour.target);
                $('#date').text(tour.dateStart.split(' ')[0] + ' 至 ' + tour.dateOver.split(' ')[0]);
                $('#content').html(tour.content);
                $('#payway').text(base.getPayway(tour.payway));
                $('#touristNum').text(tour.touristNum + '人');
                $('#tourists').text(tour.tourists + '人');
                $('#postTime').text(tour.postTime.substr(0, 16));
                $('#goods').text(tour.goods);
                //contact //显示联系方式
                contact = tour.contact;
                contactType = tour.contactType;
                $('#showContact').click(function () {
                    toastHtml(base.getContact(contactType), contact, base.getContactIcon(contactType));
                });
                //author
                $('#authorName').text(tour.authorName);
                $('#authorImage').attr('src', tour.authorImage);
                $('#authorIntro').text(base.isEmpty(tour.authorIntro) ? '这位大侠还没有介绍自己哦(⊙o⊙)':tour.authorIntro);
            }
        });
    }

    //获取旅单人员信息
    function getTourists(){
        http(tourTouristsUrl, {action: method.GET}, function (resp) {
            if(resp.status){
                //显示人员
                var touristsHtml = '';
                var tourists = resp.info;
                tourists.tourUsers.forEach(function (val) {
                    touristsHtml += '<a href="#" class="userRole" data-toggle="tooltip" data-placement="bottom" title="我是' + base.getRole(val.userRole) + '">'+
                        '<img src="' + val.userImage + '" alt="..." class="img-thumbnail">' +
                        '</a>' ;
                });
                $('.member').html(touristsHtml);
                $('[data-toggle="tooltip"]').tooltip();
                //隐藏加入/退出按钮
                if(tourists.ifJoin){
                    $('.toApply').hide();
                    $('.toExit').show();
                }else {
                    $('.toApply').show();
                    $('.toExit').hide();
                }
            }
        });

    }


    //$('#cover').mouseover(function () {
    //    $(this).animate({
    //        height:500
    //    },{
    //        easing: 'easeInOutBounce',
    //        duration: 500
    //    });
    //});

    //退出旅单
    $('.toExit').click(function () {
        toastDetail('确定退出吗？', toastType.warning, '确定', '取消', function () {
            http(tourExitUrl, {action:method.DELETE}, function (resp) {
                if(resp.status){
                    toast('已退出', toastType.success, function () {
                        getTourists();
                        getTour();
                    });
                }else {
                    toast(resp.info, toastType.warning);
                }
            });
        }, function () {});
    });

    //立即加入
    $('#applyBtn').click(function () {
        $(this).button('loading');
        var role = $('.role-item-active').attr('value');
        if(base.isEmpty(role)){
            toast('请选择角色', toastType.warning, function () {
                $('#applyBtn').button('reset');
            });
            return;
        }
        http(tourJoinUrl + role, {action:method.POST}, function (resp) {
            if(resp.status){
                toast('加入成功', toastType.success, function () {
                    $('#apply').modal('hide');
                    $('#applyBtn').button('reset');
                    getTourists();
                    getTour();
                });
            }else{
                toast(resp.info, toastType.warning,function () {
                    //$('#apply').modal('hide');
                    $('#applyBtn').button('reset');
                });
            }
        });
    });

    $('#apply').on('hidden.bs.modal', function () {
        $('.role-item').removeClass('role-item-active');
    });

    $('.role-item').click(function () {
        $(this).addClass('role-item-active').siblings('.role-item').removeClass('role-item-active');
    });

    //评论弹窗
    $('.reply').on('click', function () {
        swal({
            title: "发布评论",
            type: "input",
            closeOnConfirm: false,
            inputPlaceholder: "请输入你的评论...",
            showLoaderOnConfirm: true,
            showCancelButton: true,
            confirmButtonText: "发布",
            cancelButtonText:"取消",
            animation:"slide-from-top"
        }, function (inputValue) {
            if (inputValue === false) return false;
            if (inputValue === "") {
                swal.showInputError("评论不能为空!");
                return false
            }
            setTimeout(function () {
                swal("Good Boy!", "你特么写了: " + inputValue, "success");
            } ,2000);
        });
    });
    //Demo
    $('#comment').click(function () {
        swal({
            title:"删除成功",
            type:"success",
            showLoaderOnConfirm: true,
            confirmButtonText: "确定"
        });
    });
} );

