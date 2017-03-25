require.config ( {
    baseUrl: 'js',
    paths      : {
        'jq': 'plugins/jquery-1.11.2.min',
        'domReady': 'plugins/ready.min',
        'login':'modules/login/login',
        'datetime':'plugins/bootstrap-datetimepicker.min',
        'datetime-CN':'plugins/bootstrap-datetimepicker.zh-CN',
        'summernote':'plugins/summernote.min',
        'summernote-CN':'plugins/summernote-zh-CN.min',
        'jq-form':'plugins/jquery-form',

        'migrate':'plugins/jquery-migrate-1.2.1', //为弥补jq1.9之后废弃的功能导致图片不能剪裁
        'zyUpload':'plugins/zyupload-1.0.0.min'
    },
    shim       : {
        'login':['jq'],
        'datetime': ['jq'],
        'datetime-CN': ['datetime'],
        'summernote':['jq'],
        'summernote-CN':['summernote'],
        'jq-form': ['jq'],

        'zyUpload':['jq','migrate'],
        'migrate':['jq'] //为弥补jq1.9之后废弃的功能导致图片不能剪裁
    },
    packages   : [],
    waitSeconds: 0
} );
require ( ['domReady', 'jq', 'login', 'datetime', 'datetime-CN',
    'summernote', 'summernote-CN', 'jq-form'], function () {

    var http = require('common/restful').http;
    var method = require('common/restful').method;
    var base = require('common/base');
    var toast = require('common/toast').toast;
    var toastDetail = require('common/toast').toastDetail;
    var toastType = require('common/toast').toastType;

    var uploadCoverUrl = "web/front/tour/upload/tourImage/2?" + new Date().getTime(); //上传封面图片路径
    var uploadImageUrl = "web/front/tour/upload/tourImage/1?" + new Date().getTime(); //上传说明图片路径
    var tourUrl = "web/front/tour?" + + new Date().getTime();

    var defaultCover = 'upload/default/tour/covers/default_cover.jpg';
    var tourArgs = {
        target:'',
        dateStart:'',
        dateOver:'',
        touristNum:0,
        payway:0,
        content:'',
        contactType:0,
        contact:'',
        coverPath:'',
        tags:[]
    };

    $("#tourForm").submit(function(){
        tourArgs.target = $('#target').val().trim();
        tourArgs.dateStart = $('#dateStart').val().trim();
        tourArgs.dateOver = $('#dateOver').val().trim();
        tourArgs.touristNum = parseInt($('#touristNum').val());
        tourArgs.payway = parseInt($('[name="payway"]:checked').val());
        tourArgs.content = $('#summernote').summernote('code');
        tourArgs.contactType = parseInt($('#contactType').val());
        tourArgs.contact = $('#contact').val().trim();
        tourArgs.coverPath = $('#coverPath').val().trim();
        var tags = $('#tags .tag');
        for(var i = 0; i < tags.length; i++){
            tourArgs.tags.push($(tags[i]).text());
        }
        console.log('提交的旅单', tourArgs);
        http(tourUrl, {action: method.POST, data: tourArgs}, function (resp) {
            if(resp.status){
                toastDetail('发布成功', toastType.success, '查看详情', '继续发布', function () {
                    location.href = "tourDetail.html?" + resp.info;
                }, function () {
                    //$("#tourForm").clearForm();
                    $("#tourForm").resetForm(); //重置表单为初始状态
                    $('#coverPrew').attr('src', defaultCover);
                    $('#tags').html('');
                    $('#summernote').summernote('reset');
                });
            }
        });
        return false;   //阻止表单默认提交
    });

    //初始化富文本编辑器
    (function initSummernote() {
        $('#summernote').each(function () {
            var $this = $(this);
            var placeholder = $this.attr("placeholder") || '';
            $this.summernote({
                lang: 'zh-CN',
                placeholder: placeholder,
                minHeight: 200,
                dialogsFade: true,// Add fade effect on dialogs
                dialogsInBody: true,// Dialogs can be placed in body, not in
// summernote.
                disableDragAndDrop: false,// default false You can disable drag
// and drop
                callbacks: {
                    onImageUpload: function (files) {
                        var $files = $(files);
                        $files.each(function () {
                            var file = this;
                            var data = new FormData();
                            data.append("image", file);
                            $.ajax({
                                data: data,
                                type: "POST",
                                url: uploadImageUrl,
                                cache: false,
                                contentType: false,
                                processData: false,
                                success: function (resp) {
                                    if(resp.status){
                                        $this.summernote('insertImage', resp.info, function ($image) {

                                        });
                                    }else if(resp.code == '401'){
                                        toast('用户未登录', toastType.warning);
                                    }else {
                                        toast(resp.info, toastType.warning);
                                    }
                                    console.log(resp);
                                },
                                error: function (resp) {
                                    if(resp.status == 401){
                                        toast('用户未登录', toastType.warning);
                                    }
                                }
                            });
                        });
                    },
                    onBlur: function () {
                        console.log($this.summernote('code'));
                        //$('#content').val($this.summernote('code'));
                    }
                }
            });
        });
    }());

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

    //封面上传
    $('[data-toggle="tooltip"]').tooltip();
    $('#coverPrew').click(function () {
        $('#cover').trigger('click');
    });
    $('#cover').change(function () {
        readAsDataURL();
    });
    function readAsDataURL(){
        ////判断浏览器是否支持FileReader接口
        //if(typeof FileReader == 'undefined'){
        //    toast('你的浏览器不支持本地预览图片', toastType.warning);
        //}
        ////检验是否为图像文件
        //console.log($('#cover'));
        //var file = $('#cover')[0].files[0];
        //if(!/image\/\w+/.test(file.type)){
        //    toast("封面需要图片", toastType.error);
        //    return false;
        //}
        //var reader = new FileReader();
        ////将文件以Data URL形式读入页面
        //reader.readAsDataURL(file);
        //reader.onload = function(e){
        //    //显示文件
        //    $('#coverPrew').attr('src', this.result);
        //}
        var data = new FormData();
        data.append("image", $('#cover')[0].files[0]);
        $.ajax({
            data: data,
            type: "POST",
            url: uploadCoverUrl,
            cache: false,
            contentType: false,
            processData: false,
            success: function (resp) {
                if(resp.status){
                    $('#coverPrew').attr('src', resp.info);
                    $('#coverPath').val(resp.info);
                }else if(resp.code == '401'){
                    toast('用户未登录', toastType.warning);
                }else {
                    toast(resp.info, toastType.warning);
                }
                console.log(resp);
            },
            error: function (resp) {
                if(resp.status == 401){
                    toast('用户未登录', toastType.warning);
                }
            }
        });
    }

    //添加标签
    $('#addtag').click(function () {
        if($('#tags').children().length < 3){
            if($('#taginfo').val() === '' || $('#taginfo').val() === null){
                swal({
                    title:"标签不能为空",
                    type:"warning",
                    confirmButtonText: "确定"
                });
                return;
            }
            $('#tags').append('<span class="label label-primary">' + '<span id="killtag" class="glyphicon glyphicon-remove" aria-hidden="true"></span><span class="tag">' + $('#taginfo').val() + '</span></span>')
            $('#taginfo').val('');
        }else {
            swal({
                title:"最多添加三个标签",
                type:"warning",
                confirmButtonText: "确定"
            });
        }
    });
    $('#tags').on('click', '#killtag', function () {
        $(this).parent().remove();
    });

    //图片上传
    // 初始化插件
    //$("#zyupload").zyUpload({
    //    width            :   "580px",                 // 宽度
    //    height           :   "330px",                 // 宽度
    //    itemWidth        :   "100px",                 // 文件项的宽度
    //    itemHeight       :   "70px",                 // 文件项的高度
    //    url              :   "/upload/UploadAction",  // 上传文件的路径
    //    fileType         :   ["jpg","png","txt","js","exe"],// 上传文件的类型
    //    fileSize         :   51200000,                // 上传文件的大小
    //    multiple         :   true,                    // 是否可以多个文件上传
    //    dragDrop         :   true,                    // 是否可以拖动上传文件
    //    tailor           :   true,                    // 是否可以裁剪图片
    //    del              :   true,                    // 是否可以删除文件
    //    finishDel        :   false,  				  // 是否在上传文件完成后删除预览
    //    /* 外部获得的回调接口 */
    //    onSelect: function(selectFiles, allFiles){    // 选择文件的回调方法  selectFile:当前选中的文件  allFiles:还没上传的全部文件
    //        console.info("当前选择了以下文件：");
    //        console.info(selectFiles);
    //    },
    //    onDelete: function(file, files){              // 删除一个文件的回调方法 file:当前删除的文件  files:删除之后的文件
    //        console.info("当前删除了此文件：");
    //        console.info(file.name);
    //    },
    //    onSuccess: function(file, response){          // 文件上传成功的回调方法
    //        console.info("此文件上传成功：");
    //        console.info(file.name);
    //        console.info("此文件上传到服务器地址：");
    //        console.info(response);
    //        $("#uploadInf").append("<p>上传成功，文件地址是：" + response + "</p>");
    //    },
    //    onFailure: function(file, response){          // 文件上传失败的回调方法
    //        console.info("此文件上传失败：");
    //        console.info(file.name);
    //    },
    //    onComplete: function(response){           	  // 上传完成的回调方法
    //        console.info("文件上传完成");
    //        console.info(response);
    //    }
    //});
} );

