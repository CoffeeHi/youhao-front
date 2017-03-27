require.config({
    baseUrl: 'js',
    paths: {
        'jq': 'plugins/jquery-1.11.2.min',
        "domReady": 'plugins/ready.min',
        'resp': 'plugins/responsiveslides.min',

        'login':'modules/login/login',
        'restful': 'common/restful'

    },
    shim: {
        'resp': ['jq'],
        'login':['jq']
    },
    packages: [],
    waitSeconds: 0
});
require(['domReady', 'jq', 'resp', 'login'], function () {

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

