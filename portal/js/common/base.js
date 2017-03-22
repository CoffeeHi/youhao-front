;
define([], function () {
    //验证码类型
    var codeType = {
        LOGIN:1,
        REG:2,
        FORGET:3 //忘记密码
    };

    //账号类型
    var numType = {
        EMAIL : 1,
        PHONE : 2
    };

    var domain = 'youhao.cn';
    return {
        codeType: codeType,
        domain: domain,
        numType: numType
    }
});