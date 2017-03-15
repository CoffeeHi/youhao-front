require.config({
    baseUrl: 'js',
    paths: {
        'jq': 'plugins/jquery-1.11.2.min',
        "domReady": 'plugins/ready.min',
        'moveTop': 'plugins/move-top',
        'easing': 'plugins/easing',
        'bootstrap': 'plugins/bootstrap.min',
        'resp': 'plugins/responsiveslides.min',
        'restful': 'common/restful',
        'common': 'common/common',
        'cookie': 'common/cookie',
        'jqCookie':'plugins/jquery.cookie',
        'sweetAlert':'plugins/sweetalert.min',
        'login':'modules/login/login'

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
        require(['domReady', 'resp', 'moveTop', 'easing', 'bootstrap','sweetAlert','login'], function () {
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

        });
    }
});

