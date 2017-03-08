;
define(['jquery', 'sweetAlert'], function () {
    var $ajax = $.ajax;
    var alertType = {
        warning: 'warning',
        success: 'success',
        error: 'error',
        info: 'info',
        input: 'input'
    };

    function http(url, param, action, fun) {
        return $ajax({
            type: action,
            url: restUrl(url, param.data),
            async: param.async,
            data: param.filter.serialize(),
            dataType: "json",
            success: function (data, textStatus) {
                if (data.status == true) {
                    fun(data);
                } else {
                    alert(data.info, alertType.warning);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert('网络请求异常', alertType.error);
            }
        });
    }

    function restUrl(url, data) {
        for (var prop in data) {
            url += '/' + prop;
            if (data[prop] instanceof Array) {
                for (var item in data[prop]) {
                    url += '/' + item;
                }
            } else {
                url += '/' + data[prop];
            }
        }
        return encodeURIComponent(url);
    }

    function alert(text, type) {
        swal({
            text: text,
            type: type,
            showConfirmButton: true,
            confirmButtonText: '确定',
            confirmButtonClass: "btn-default"
        });
    }

    return {
        http: http
    }
});