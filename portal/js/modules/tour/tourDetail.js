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
    var toastInput = require('common/toast').toastInput;
    var toastType = require('common/toast').toastType;

    var getCookie = require('common/cookie').getCookie;

    var tourId = location.search.substr(1);
    var tourUrl = 'web/front/tour/' + tourId; //获取旅单详情
    var tourJoinUrl = 'web/front/tour/' + tourId + '/role/'; //加入旅单
    var tourTouristsUrl = 'web/front/tour/' + tourId + '/tourists'; //获取旅单人员
    var tourExitUrl = 'web/front/tour/' + tourId; //退出旅单
    var insertComUrl = 'web/front/com/tour'; //评论旅单
    var deleteComUrl = 'web/front/com/tour/'; //删除评论
    var getComUrl = 'web/portal/com/tour/page/'; //查询评论
    var getTourRecentUrl = 'web/portal/tour/recent/' + tourId; //查看最近访问和最新发布旅单

    var contact = '',contactType = 0;

    var comArgs = {
        comTarget:tourId,
        comType:1,  //评论类型(0-旅单、1-文章、2-全景)
        comContent:'',
        comParent:''
    };
    var comPageNo = 1, comPageSize = 10;

    getTour();
    getTourists();
    getTourRecent();
    getComs(comPageNo, comPageSize);

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
                //author
                $('#authorName').text(tour.authorName);
                $('#authorImage').attr('src', tour.authorImage);
                $('#authorIntro').text(base.isEmpty(tour.authorIntro) ? '这位大侠还没有介绍自己哦(⊙o⊙)':tour.authorIntro);
            }else {
                toast(resp.info, toastType.warning);
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
                    $('#showContact').click(function () {
                        toastHtml(base.getContact(contactType), contact, base.getContactIcon(contactType));
                    });
                    $('.toApply').hide();
                    $('.toExit').show();
                }else {
                    $('#showContact').click(function () {
                        toast("请先加入旅单", toastType.warning);
                    });
                    $('.toApply').show();
                    $('.toExit').hide();
                }
            }
        });

    }

    //获取旅单评论
    function getComs(pageNo, pageSize){
        http(getComUrl+pageNo+'/'+pageSize+'/'+tourId, {action: method.GET}, function (resp) {
            if(resp.status){
                var comListHtml = '';
                resp.info.forEach(function (val) {
                    comListHtml += [' <div class="media response-info">',
                        '                        <div class="media-left response-text-left">',
                        '                            <a href="#">',
                        '                                <img class="media-object" src="',val.comAuthorImg,'" alt=""/>',
                        '                            </a>',
                        '                            <h5><a href="#">',val.comAuthorName,'</a></h5>',
                        '                        </div>',
                        '                        <div class="media-body response-text-right">',
                        '                            <p>',val.comContent,'</p>',
                        '                            <ul>',
                        '                                <li>',val.comTime,'</li>',
                        '                                <li><a class="reply" ','id="'+val.comId,'" href="javascript:;">回复</a></li>'].join('');
                        if(getCookie('userId') === val.comAuthor){
                            comListHtml += '                                <li><a class="delete" '+'delId="'+val.comId+'" href="javascript:;">删除</a></li>';
                        }
                        comListHtml += '                            </ul>';
                    val.commentList.forEach(function (val2) {
                        comListHtml += ['                            <div class="media response-info">',
                            '                                <div class="media-left response-text-left">',
                            '                                    <a href="#">',
                            '                                        <img class="media-object" src="',val2.comAuthorImg,'" alt=""/>',
                            '                                    </a>',
                            '                                    <h5><a href="#">',val2.comAuthorName,'</a></h5>',
                            '                                </div>',
                            '                                <div class="media-body response-text-right">',
                            '                                    <p>',val2.comContent,'</p>',
                            '                                    <ul>',
                            '                                        <li>',val2.comTime,'</li>'].join('');
                        if(getCookie('userId') === val2.comAuthor){
                            comListHtml += '                                <li><a class="delete" '+'delId="'+val2.comId+'" href="javascript:;">删除</a></li>';
                        }
                            comListHtml += ['                                    </ul>',
                            '                                </div>',
                            '                                <div class="clearfix"></div>',
                            '                            </div>'].join('');
                    });

                    comListHtml += ['                        </div>',
                        '                        <div class="clearfix"></div>',
                        '                    </div>'].join("");
                });

                $('#comments').html(comListHtml);
                bindReplyAndDel();
            }
        });
    }

    function bindReplyAndDel(){
        //评论弹窗
        $('.reply').on('click', function () {
            comArgs.comParent = $(this).attr('id');
            toastInput("回复评论", "请输入你的评论...", "确定", "评论不能为空!", function (inputValue) {
                comArgs.comContent = inputValue;
                http(insertComUrl, {action: method.POST, data: comArgs}, function (resp) {
                    if(resp.status){
                        toast("回复成功", toastType.success, function () {
                            getComs(comPageNo, comPageSize);
                        });
                    }else {
                        toast("回复失败，请重试", toastType.warning);
                    }
                });
            });
        });
        //删除弹窗
        $('.delete').on('click', function () {
            var comId = $(this).attr('delId');
            toastDetail("删除评论", toastType.warning, "确定", "取消", function () {
                http(deleteComUrl + comId, {action: method.DELETE}, function (resp) {
                    if(resp.status){
                        toast("删除成功", toastType.success);
                        getComs(comPageNo, comPageSize);
                    }else {
                        toast("删除失败", toastType.warning);
                    }
                });
            });
        });
    }

    //获取最近访问和最新发布旅单
    function getTourRecent(){
        http(getTourRecentUrl, {action: method.GET}, function (resp) {
            if(resp.status){
                //最近浏览人员
                var tourVisitors = resp.info.tourVisitors;
                var visitorHtml = '';
                tourVisitors.forEach(function (val) {
                    visitorHtml +='<div class="comments-info">'+
                    '                        <div class="cmnt-icon-left">'+
                        '                            <a href="#"><img src="' + val.userImage + '" alt=""></a>'+
                        '                        </div>'+
                        '                        <div class="cmnt-icon-right">'+
                        '                            <p>'+val.visitTime+'</p>'+
                        '                            <p><a href="#">' +val.userName + '</a></p>'+
                        '                        </div>'+
                        '                        <div class="clearfix"></div>'+
                        '                        <p class="cmmnt">个性签名：'+ (val.userSig == "" ? "我还没有签名（⊙o⊙）":val.userSig) + '</p>'+
                        '                    </div>';
                });
                $('#visitors').html(visitorHtml);
                //最近发布旅单
                var tourRecentPosts = resp.info.tourRecentPosts;
                var recentPostHtml = '';
                tourRecentPosts.forEach(function (val) {
                    recentPostHtml += ' <div class="col-xs-6 col-md-3 related-grids">'+
                    '<a href="tourDetail.html?'+ val.id +'" class="thumbnail recentCover">'+
                        '<img src="'+ val.coverPath +'" alt=""/>'+
                        '</a>'+
                        '<h5><a class="rich-text" href="tourDetail.html?' + val.id + '">' + val.target + '</a></h5>'+
                    '</div>';
                });
                $('#recentPost').html(recentPostHtml);
            }
        });
    }

    //发布评论
    $('#comment').click(function () {
        comArgs.comContent = $('#comText').val().trim();
        comArgs.comParent = '';
        http(insertComUrl, {action: method.POST, data: comArgs}, function (resp) {
            if(resp.status){
                toast('评论成功', toastType.success, function () {
                    getComs(comPageNo, comPageSize);
                });
                $('#comText').val('');
            }else {
                toast('评论失败，请重试', toastType.warning);
            }
        });
    });

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

} );

