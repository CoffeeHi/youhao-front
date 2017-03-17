;
define(['jq', 'plugins/move-top', 'plugins/easing', 'plugins/bootstrap.min'], function () {
    (function moveSlowly() {
        <!-- start-smoth-scrolling-->
        $(".scroll").click(function (event) {
            event.preventDefault();
            $('html,body').animate({scrollTop: $(this.hash).offset().top}, 1000);
        });
        <!--smooth-scrolling-of-move-up-->
        $().UItoTop({easingType: 'easeOutQuart'});
    })();
});