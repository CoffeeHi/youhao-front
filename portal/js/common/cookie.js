;
define(['common', 'jq', 'jqCookie'], function (common) {
    function setCookie(cookieName, cookieValue, expiresNum) {

        var options = {
            'path': '/',
            'domain': common.domain,
            'secure': false,//关闭https传输cookie
            'raw': true,//关闭cookie的自动编码功能
            'expires': expiresNum || 30 //cookie的过期时间，如没有传值默认30天过期
        };

        $.cookie(cookieName, cookieValue, options);

    }

    function getCookie(cookieName) {
        return $.cookie(cookieName);
    }

    function getToken() {
        return $.cookie('token');
    }

    function delCookie(cookieName) {
        $.cookie(cookieName, '', {
            'path': '/',
            'expires': -1
        });
    }

    return {
        setCookie:setCookie,
        getCookie:getCookie,
        getToken:getToken,
        delCookie:delCookie
    }
});