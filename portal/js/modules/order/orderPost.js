require.config ( {
    baseUrl: 'js/plugins/',
    paths      : {
        'jq': 'jquery-1.11.2.min',
        'migrate':'jquery-migrate-1.2.1', //为弥补jq1.9之后废弃的功能导致图片不能剪裁
        "domReady": 'ready.min',
        'moveTop': 'move-top',
        'easing': 'easing',
        'bootstrap': 'bootstrap.min',
        'datetime':'bootstrap-datetimepicker.min',
        'CN':'bootstrap-datetimepicker.zh-CN',
        'sweetAlert':'sweetalert.min',
        'zyUpload':'zyupload-1.0.0.min'
    },
    shim       : {
        'moveTop': ['jq'],
        'easing': ['jq'],
        'bootstrap': ['jq'],
        'resp': ['jq'],
        'datetime': ['jq'],
        'CN': ['jq','datetime'],
        'sweetAlert': ['jq'],
        'zyUpload':['jq'],
        'migrate':['jq'] //为弥补jq1.9之后废弃的功能导致图片不能剪裁
    },
    packages   : [],
    waitSeconds: 0,
    callback   : function () {
        require ( ['migrate', 'domReady','moveTop', 'easing', 'bootstrap', 'datetime', 'CN',
            'sweetAlert', 'zyUpload'], function () {
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
            <!--根据旅单类型隐藏填写内容-->
            $('#type').change(function () {
                if($(this).children('option:selected').val() === '1'){ //组团求约时隐藏导游条件
                    $('#guides').hide();
                    $('#competers').hide();
                    $('#touristLabel').show();
                    $('#guideLabel').hide();
                }else {
                    $('#guides').show();
                    $('#competers').show();
                    $('#touristLabel').hide();
                    $('#guideLabel').show();
                }
            });
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
                    $('#tags').append('<span id="tag" class="label label-primary">' + '<span id="killtag" class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + $('#taginfo').val() + '</span>')
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
            $("#zyupload").zyUpload({
                width            :   "580px",                 // 宽度
                height           :   "330px",                 // 宽度
                itemWidth        :   "100px",                 // 文件项的宽度
                itemHeight       :   "70px",                 // 文件项的高度
                url              :   "/upload/UploadAction",  // 上传文件的路径
                fileType         :   ["jpg","png","txt","js","exe"],// 上传文件的类型
                fileSize         :   51200000,                // 上传文件的大小
                multiple         :   true,                    // 是否可以多个文件上传
                dragDrop         :   true,                    // 是否可以拖动上传文件
                tailor           :   true,                    // 是否可以裁剪图片
                del              :   true,                    // 是否可以删除文件
                finishDel        :   false,  				  // 是否在上传文件完成后删除预览
                /* 外部获得的回调接口 */
                onSelect: function(selectFiles, allFiles){    // 选择文件的回调方法  selectFile:当前选中的文件  allFiles:还没上传的全部文件
                    console.info("当前选择了以下文件：");
                    console.info(selectFiles);
                },
                onDelete: function(file, files){              // 删除一个文件的回调方法 file:当前删除的文件  files:删除之后的文件
                    console.info("当前删除了此文件：");
                    console.info(file.name);
                },
                onSuccess: function(file, response){          // 文件上传成功的回调方法
                    console.info("此文件上传成功：");
                    console.info(file.name);
                    console.info("此文件上传到服务器地址：");
                    console.info(response);
                    $("#uploadInf").append("<p>上传成功，文件地址是：" + response + "</p>");
                },
                onFailure: function(file, response){          // 文件上传失败的回调方法
                    console.info("此文件上传失败：");
                    console.info(file.name);
                },
                onComplete: function(response){           	  // 上传完成的回调方法
                    console.info("文件上传完成");
                    console.info(response);
                }
            });
        } );
    }
} );

