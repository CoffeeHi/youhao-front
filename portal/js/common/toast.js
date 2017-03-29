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
        }, function () {
            func != undefined && func();
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
                confirmFunc != undefined && confirmFunc();
            } else {
                cancelFunc != undefined && cancelFunc();
            }
        });
    }

    function toastInput(title, inputPlaceholder, confirmButtonText, inputError, ajaxFunc){
        swal({
            title: title,
            type: "input",
            closeOnConfirm: false,
            inputPlaceholder: inputPlaceholder,
            showLoaderOnConfirm: true,
            showCancelButton: true,
            confirmButtonText: confirmButtonText,
            cancelButtonText:"取消",
            animation:"slide-from-top"
        }, function (inputValue) {
            if (inputValue === false) return false;
            if (inputValue === "") {
                swal.showInputError(inputError);
                return false
            }
            ajaxFunc(inputValue);
        });
    }

    return {
        toast:toast,
        toastHtml:toastHtml,
        toastDetail:toastDetail,
        toastInput:toastInput,
        toastType: toastType
    }
});