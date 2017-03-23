;
define(['jq', 'plugins/sweetalert.min'], function () {

    var toastType = {
        warning: 'warning',
        success: 'success',
        error: 'error',
        info: 'info',
        input: 'input'
    };

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

    function toastHtml(title, htmlText, imageUrl) {
        swal({
            title: title,
            text: htmlText,
            imageUrl: imageUrl,
            html:true,
            showConfirmButton: true,
            confirmButtonText: '确定',
            confirmButtonClass: "btn-info"
        });
    }

    /**
     *
     * @param text
     * @param type
     * @param confirmText
     * @param cancelText
     * @param confirmFunc
     * @param cancelFunc
     */
    function toastDetail(text, type, confirmText, cancelText, confirmFunc, cancelFunc) {
        swal({
            title:"",
            text: text,
            type: type,
            closeOnCancel: true,
            closeOnConfirm: false,
            showConfirmButton: true,
            showCancelButton: true,
            cancelButtonText: cancelText,
            confirmButtonText: confirmText,
            confirmButtonClass: "btn-primary"
        }, function (isConfirm) {
            if (isConfirm) {
                confirmFunc();
            } else {
                cancelFunc();
            }
        });
    }

    return {
        toast:toast,
        toastHtml:toastHtml,
        toastDetail:toastDetail,
        toastType: toastType
    }
});