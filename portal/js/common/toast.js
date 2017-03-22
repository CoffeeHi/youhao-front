;
define(['jq', 'plugins/sweetalert.min'], function () {

    var toastType = {
        warning: 'warning',
        success: 'success',
        error: 'error',
        info: 'info',
        input: 'input'
    };

    function toast(text, type, func) {
        swal({
            title:"",
            text: text,
            type: type,
            showConfirmButton: true,
            confirmButtonText: '确定',
            confirmButtonClass: "btn-default"
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
        toastDetail:toastDetail,
        toastType: toastType
    }
});