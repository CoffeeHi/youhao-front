;
define(['jq', 'common/toast'], function (jq, toast) {
    var $ajax = $.ajax;
    var toastType = toast.toastType;
    var toast = toast.toast;

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
            url: url+'?' + new Date().valueOf(),
            async: !param.sync,
            data: (param.action == method.GET && param.data != undefined) ? ('requestString=' + JSON.stringify(param.data)):JSON.stringify(param.data), //配合后端的@RequestBody注解
            dataType: "json",
            contentType:"application/json",
            success: function (data, textStatus) {
                fun(data);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                toast('网络请求异常', toastType.error);//todo 会和登录页冲突以后要修改
            },
            statusCode: {
                404: function () {
                    toast('页面不存在啊兄弟', toastType.error); //todo 之后改成跳转到404页面
                },
                401: function () {
                    toast('还没登录呢少年', toastType.warning); //todo 之后改成跳转到登录页面
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