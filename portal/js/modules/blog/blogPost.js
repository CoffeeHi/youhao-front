require.config ( {
    baseUrl: 'js',
    paths      : {
        'jq': 'plugins/jquery-1.11.2.min',
        'domReady': 'plugins/ready.min',
        'login':'modules/login/login',
        'summernote':'plugins/summernote.min',
        'summernote-CN':'plugins/summernote-zh-CN.min',
        'jq-form':'plugins/jquery-form'

    },
    shim       : {
        'login':['jq'],
        'summernote':['jq'],
        'summernote-CN':['summernote'],
        'jq-form': ['jq']
    },
    packages   : [],
    waitSeconds: 0
} );
require ( ['domReady', 'jq', 'login', 'summernote', 'summernote-CN', 'jq-form'], function () {

    var http = require('common/restful').http;
    var method = require('common/restful').method;
    var base = require('common/base');
    var toast = require('common/toast').toast;
    var toastDetail = require('common/toast').toastDetail;
    var toastType = require('common/toast').toastType;

    var uploadImageUrl = "web/front/blog/upload/blogImage?" + new Date().getTime(); //上传说明图片路径
    var blogUrl = "web/front/blog";

    var blogArgs = {
        title:'',
        content:''
    };

    $("#blogForm").submit(function(){
        blogArgs.title = $('#title').val().trim();
        blogArgs.content = $('#summernote').summernote('code');
        http(blogUrl, {action: method.POST, data: blogArgs}, function (resp) {
            if(resp.status){
                toastDetail('发布成功', toastType.success, '查看详情', '继续发布', function () {
                    location.href = "blogDetail.html?" + resp.info;
                }, function () {
                    $("#blogForm").resetForm(); //重置表单为初始状态
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
                                },
                                error: function (resp) {
                                    if(resp.status == 401){
                                        toast('用户未登录', toastType.warning);
                                    }
                                }
                            });
                        });
                    }
                }
            });
        });
    }());


} );

