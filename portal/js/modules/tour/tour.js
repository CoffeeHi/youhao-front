require.config ( {
    baseUrl: 'js',
    paths      : {
        'jq': 'plugins/jquery-1.11.2.min',
        "domReady": 'plugins/ready.min',
        'resp': 'plugins/responsiveslides.min',
        'salvattore': 'plugins/salvattore.min',
        'waypoints':'plugins/jquery.waypoints.min',
        'datetime':'plugins/bootstrap-datetimepicker.min',
        'CN':'plugins/bootstrap-datetimepicker.zh-CN',
        'login':'modules/login/login'
    },
    shim       : {
        'login':['jq'],
        'resp': ['jq'],
        'datetime': ['jq'],
        'CN': ['jq', 'datetime'],
        'waypoints': ['jq'],
        'salvattore': ['jq']
    },
    packages   : [],
    waitSeconds: 0
} );
require ( ['domReady', 'jq', 'login', 'template/tour/tourPage', 'salvattore', 'waypoints', 'resp','datetime', 'CN'], function (d, j, l, tourListStr, salvattore) {

    var http = require('common/restful').http;
    var method = require('common/restful').method;
    var toast = require('common/toast').toast;
    var toastType = require('common/toast').toastType;

    var temp = require('plugins/template');
    var tourListTpl = tourListStr.toString;
    var tourListRender = temp.compile(tourListTpl);

    var pageSize = 40, pageNo = 1, totalPageSize;

    var tourListUrl = 'web/portal/tour/page/';

    var tourParam = {
        dateStart:'',
        dateOver:'',
        target:''
    };

    getTourList(pageNo, pageSize);

    function getTourList(pageNo, pageSize){
        tourParam.dateStart = $('#dateStart').val().trim();
        tourParam.dateOver = $('#dateOver').val().trim();
        tourParam.target = $('#target').val().trim();
        http(tourListUrl + pageNo + '/' + pageSize, {action: method.GET, data: tourParam}, function (resp) {
            if(resp.status){
                totalPageSize = resp.totalPageSize;
                initRoll(totalPageSize, pageNo);

                var tourList = resp.info;
                var tourListHtml = tourListRender({list: tourList});
                $('#orderList').html(tourListHtml);
                initTourDetail();

                //瀑布流
                salvattore.registerGrid(document.querySelector('#orderList'));
                //监听滚动条弹出
                if ($('.order').length > 0) {
                    $('.order').waypoint( function( direction ) {
                        if( direction === 'down' && !$(this).hasClass('animated') ) {
                            $(this.element).addClass('bounceIn animated');
                        }
                    } , { offset: '75%' } );
                }
            }else {
                toast('加载失败，请重试', toastType.warning);
            }
        });
    }

    function initTourDetail(){
        $('.order').on('click', function () {
            location.href = "tourDetail.html?" + $(this).attr('id');
        });
    }

    function initRoll(totalPageSize, pageNo) {
        var rollHtml = '';
        for(var i = 1; i <= (totalPageSize > 5 ? 5: totalPageSize); i ++){
            rollHtml += (i == pageNo ? '<li class="page-active">':'<li>') + '<a href="javascript:;" class="page-index">' + i +'</a></li>';
        }
        if($('.page-index').length > 0){
            $('.page-index').parent('li').remove();
            $('#last').parent('li').after(rollHtml);
        }else {
            $('#last').parent('li').after(rollHtml);
        }

        $('.page-index').click(function () {
           pageNo = parseInt($(this).text());
            getTourList(pageNo, pageSize);
        });

    }

    //function scrollTop(){
    //    $('body,html').animate({ scrollTop: 0 },
    //        {
    //            easing: 'easeInOutQuad',
    //            duration: 1000
    //        });
    //}

    $('#query').click(function () {
        getTourList(pageNo, pageSize);
    });

    $('#last').click(function () {
        //if(parseInt($('.page-index').first().text()) > 1){
        //    $('.page-index').each(function () {
        //        $(this).text($(this).text() - 1);
        //    });
        //}

        pageNo > 1 && pageNo -- && getTourList(pageNo, pageSize);
    });

    $('#next').click(function () {
        //if(parseInt($('.page-index').last().text()) < totalPageSize){
        //    $('.page-index').each(function () {
        //        $(this).text($(this).text() + 1);
        //    });
        //}

        pageNo < totalPageSize && pageNo ++ && getTourList(pageNo, pageSize)
    });

    $('#lastest').click(function () {
        if(totalPageSize != 1){
            pageNo = 1 && getTourList(pageNo, pageSize);
        }else{
            toast('已到首页', toastType.info);
        }

    });

    $('#nextest').click(function () {
        if(pageNo != totalPageSize){
            pageNo = totalPageSize && getTourList(pageNo, pageSize);
        }else {
            toast('已到末页', toastType.info);
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

} );


