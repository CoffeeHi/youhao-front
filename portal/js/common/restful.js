;
define(['jq', 'sweetAlert'], function () {
    var $ajax = $.ajax;
    var toastType = {
        warning: 'warning',
        success: 'success',
        error: 'error',
        info: 'info',
        input: 'input'
    };

    /**
     *
     * @param url
     * @param param
     * @param fun
     * @returns {*}
     */
    function http(url, param, fun) {
        return $ajax({
            type: param.action,
            url: url+'?'+new Date().valueOf(),
            async: !param.sync,
            data: param.data,
            dataType: "json",
            success: function (data, textStatus) {
                fun(data);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                toast('网络请求异常', toastType.error);
            },
            statusCode: {
                404: function () {
                    toast('页面不存在啊兄弟', toastType.error); //之后改成跳转到404页面
                },
                401: function () {
                    toast('还没登录呢少年', toastType.warning); //之后改成跳转到登录页面
                }
            }
        });
    }

    function restUrl(url, target, filter) {
        for (var prop in target) {
            url += '/' + prop;
            if (target[prop] instanceof Array) {
                for (var item in target[prop]) {
                    url += '/' + item;
                }
            } else {
                url += '/' + target[prop];
            }
        }
        return encodeURIComponent(url + '?' + filter.serialize());
    }

    function toast(text, type) {
        swal({
            title:"",
            text: text,
            type: type,
            showConfirmButton: true,
            confirmButtonText: '确定',
            confirmButtonClass: "btn-default"
        });
    }


    var method = {
        GET:"GET", //查询
        POST:"POST", //创建
        PUT:"PUT", //更新
        DELETE:"DELETE" //删除
    };

    var exampleParam = {
        sync: true,
        action: method.GET,
        data:"what you'll send"
    };


    return {
        method:method,
        http: http
    }
});