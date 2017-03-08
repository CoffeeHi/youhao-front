require.config ( {
    baseUrl: 'js/plugins/',
    paths      : {
        'jq': 'jquery-1.11.2.min',
        "domReady": 'ready.min',
        'moveTop': 'move-top',
        'easing': 'easing',
        'bootstrap': 'bootstrap.min',
        'sweetAlert':'sweetalert.min'
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
            /*右边导航*/
            $('.list-group a').click(function () {
                $('.category h4').html($(this).text());
                $(this).parent().children('.item-active').removeClass('item-active');
                $(this).addClass(' item-active');
                if($(this).text() === '个人中心'){
                    var selfInfo = ['<div class="info">',
                        '                <div class="info-cover">',
                        '                    <button class="info-cover-edit">编辑封面图片</button>',
                        '                    <div class="info-cover-img">',
                        '                        <img src="images/banner1.jpg" alt=""/>',
                        '                    </div>',
                        '                </div>',
                        '                <div class="info-detail">',
                        '                    <div class="info-detail-headimg">',
                        '                        <img src="images/head4.jpg" alt=""/>',
                        '                    </div>',
                        '                    <div class="info-detail-about">',
                        '                        <div class="info-detail-about-head rich-text">',
                        '                            <span class="name">陈祥</span><span class="signature">后知后觉</span>',
                        '                        </div>',
                        '                        <div class="info-detail-about-content">',
                        '                            <div class="content-item">',
                        '                                <span class="content-label">居住地</span>',
                        '                                <span id="location">福州</span>',
                        '                                <input type="text" class="form-control" style="display: none;" id="locationInput" placeholder="你现在住哪儿...">',
                        '                            </div>',
                        '                            <div class="content-item">',
                        '                                <span class="content-label">所在行业</span>',
                        '                                <span id="career">互联网</span>',
                        '                                <input type="text" class="form-control" style="display: none" id="careerInput" placeholder="你现在做啥...">',
                        '                            </div>',
                        '                            <div class="content-item form-inline">',
                        '                                <span class="content-label">个人简介</span>',
                        '                                <span id="introduce">老司机</span>',
                        '                                <textarea id="introduceInput" style="display: none" class="form-control" rows="3" placeholder="简要介绍下自己..."></textarea>',
                        '                                </div>',
                        '                            <button id="editInfo" class="info-detail-about-edit">编辑</button>',
                        '                            <button id="saveInfo" class="info-detail-about-edit" style="display: none">保存</button>',
                        '                        </div>',
                        '                    </div>',
                        '                    <div class="info-detail-edit"></div>',
                        '                </div>',
                        '            </div>'].join("");
                    $('#changePage').html(selfInfo);
                }else if($(this).text() === '我的消息'){
                    $('#myMsg').show();
                }else if($(this).text() === '我的旅单'){
                    $('#changePage').html('');
                }
            });
            /*编辑个人信息*/
            $('.single-page-left').on('click', '#editInfo', function () {
                $(this).hide();
                $('#saveInfo').show();
//            展现输入框
                $('#locationInput').val($('#location').text()).show();
                $('#careerInput').val($('#career').text()).show();
                $('#introduceInput').val($('#introduce').text()).show();
//            隐藏数据
                $('#career').hide();
                $('#location').hide();
                $('#introduce').hide();
            });
            $('.single-page-left').on('click', '#saveInfo', function () {
                //ajax
                $(this).hide();
                $('#editInfo').show();
            });
        } );
    }
} );

