require.config ( {
    baseUrl: 'js/plugins/',
    paths      : {
        'jq': 'jquery-1.11.2.min',
        "domReady": 'ready.min',
        'moveTop': 'move-top',
        'easing': 'easing',
        'bootstrap': 'bootstrap.min',
        'resp': 'responsiveslides.min',
        'salvattore': 'salvattore.min',
        'waypoints':'jquery.waypoints.min',
        'datetime':'bootstrap-datetimepicker.min',
        'CN':'bootstrap-datetimepicker.zh-CN'
    },
    shim       : {
        'moveTop': ['jq'],
        'easing': ['jq'],
        'bootstrap': ['jq'],
        'resp': ['jq'],
        'datetime': ['jq'],
        'CN': ['jq', 'datetime'],
        'waypoints': ['jq'],
        'salvattore': ['jq']
    },
    packages   : [],
    waitSeconds: 0,
    callback   : function () {
        require ( ['domReady','moveTop', 'easing', 'bootstrap', 'datetime', 'CN',
            'salvattore', 'waypoints', 'resp' ], function () {
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
            <!-- 订单封面扇叶 -->
            $("#covers").responsiveSlides({
                auto: false, //自动播放
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
            <!--日期选择器-->
            $('#dateStart').datetimepicker({
                format: 'yyyy-mm-dd', //日期的格式
                startDate:'1900-01-01', //选择器的开始日期
                autoclose:true, //日期选择完成后是否关闭选择框
                language:'zh-CN', //语言
                minView: 'month' //表示日期选择的最小范围，默认是hour
            }).on('changeDate',function(e){
                var startTime = e.date;
                $('#dateOver').datetimepicker('setStartDate',startTime);
            });
            $('#dateOver').datetimepicker({
                format: 'yyyy-mm-dd', //日期的格式
                startDate:'1900-01-01', //选择器的开始日期
                autoclose:true, //日期选择完成后是否关闭选择框
                language:'zh-CN', //语言
                minView: 'month' //表示日期选择的最小范围，默认是hour
            }).on('changeDate',function(e){
                var endTime = e.date;
                $('#dateStart').datetimepicker('setEndDate',endTime);
            });
            //监听刷新
            var animateBoxWayPoint = function() {
                if ($('.order').length > 0) {
                    $('.order').waypoint( function( direction ) {
                        if( direction === 'down' && !$(this).hasClass('animated') ) {
                            $(this.element).addClass('bounceIn animated');
                        }
                    } , { offset: '75%' } );
                }
            };
            animateBoxWayPoint();
        } );
    }
} );

