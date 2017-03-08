require.config ( {
    baseUrl: 'js/plugins/',
    paths      : {
        'jq': 'jquery-1.11.2.min',
        "domReady": 'ready.min',
        'moveTop': 'move-top',
        'easing': 'easing',
        'bootstrap': 'bootstrap.min',
        'sweetAlert':'sweetalert.min',
        'resp': 'responsiveslides.min'
    },
    shim       : {
        'moveTop': ['jq'],
        'easing': ['jq'],
        'bootstrap': ['jq'],
        'resp': ['jq']
    },
    packages   : [],
    waitSeconds: 0,
    callback   : function () {
        require ( ['domReady','moveTop', 'easing', 'bootstrap','sweetAlert'], function () {
            var init = function () {
                <!-- start-smoth-scrolling-->
                $(".scroll").click(function (event) {
                    event.preventDefault();
                    $('html,body').animate({scrollTop: $(this.hash).offset().top}, 1000);
                });
                <!--smooth-scrolling-of-move-up-->
                $().UItoTop({easingType: 'easeOutQuart'});
                //测试登录
                $('#close').click(function () {
                    $('.user').show();
                    $('.login').hide();
                });
            }();
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

