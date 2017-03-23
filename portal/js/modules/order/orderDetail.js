require.config ( {
    baseUrl: 'js',
    paths      : {
        'jq': 'plugins/jquery-1.11.2.min',
        "domReady": 'plugins/ready.min',
        'login':'modules/login/login',
        'top':'common/top'
    },
    shim       : {
        'top':['jq'],
        'login':['jq']
    },
    packages   : [],
    waitSeconds: 0,
    callback   : function () {
        require ( ['domReady','jq','top','login'], function () {
            var http = require('common/restful').http;
            var method = require('common/restful').method;
            var base = require('common/base');
            var toast = require('common/toast').toast;
            var toastHtml = require('common/toast').toastHtml;
            var toastType = require('common/toast').toastType;

            var tourId = location.search.substr(1);
            var tourUrl = 'web/portal/tour/' + tourId;

            var contact = '';
            var contactType = 0;
            (function getTour(){
                http(tourUrl, {action:method.GET}, function (resp) {
                    if(resp.status){
                        var tour = resp.info;
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
                        $('#touristNum').text(tour.touristNum);
                        $('#tourists').text(tour.tourists);
                        $('#postTime').text(tour.postTime.substr(0, 16));
                        $('#goods').text(tour.goods);
                        //contact
                        contact = tour.contact;
                        contactType = tour.contactType;
                        //author
                        $('#authorName').text(tour.authorName);
                        $('#authorImage').attr('src', tour.authorImage);
                        $('#authorIntro').text(base.isEmpty(tour.authorIntro) ? '这位大侠还没有签名哦(⊙o⊙)':tour.authorIntro);
                    }
                });
            }());


            //$('#cover').mouseover(function () {
            //    $(this).animate({
            //        height:500
            //    },{
            //        easing: 'easeInOutBounce',
            //        duration: 500
            //    });
            //});

            $('#showContact').click(function () {
                toastHtml(base.getContact(contactType), contact, base.getContactIcon(contactType));
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
    }
} );

