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

    //检验是否为空
    function isEmpty(val){
        return val === '' || val == null;
    }

    //旅单费用方式
    function getPayway(type){
        if(type == 1){
            return '线下AA';
        }else if(type == 2){
            return '我买单';
        }
    }

    //旅单发布者联系方式 1:QQ 2:微信 3:邮箱 4:手机号
    function getContact(contactType){
        if(contactType == 1){
            return 'QQ';
        }else if(contactType == 2){
            return '微信';
        }else if(contactType == 3){
            return '邮箱';
        }else if(contactType == 4){
            return '手机号';
        }else {
            return '';
        }
    }

    //旅单发布者联系方式图标 1:QQ 2:微信 3:邮箱 4:手机号
    function getContactIcon(contactType){
        var qqIcon = 'images/qq.jpg';
        var wechatIcon = 'images/wechat.jpg';
        var emailIcon = 'images/email.jpg';
        var phoneIcon = 'images/phone.jpg';
        if(contactType == 1){
            return qqIcon;
        }else if(contactType == 2){
            return wechatIcon;
        }else if(contactType == 3){
            return emailIcon;
        }else if(contactType == 4){
            return phoneIcon;
        }else {
            return '';
        }
    }

    var domain = 'youhao.cn';
    return {
        codeType: codeType,
        domain: domain,
        numType: numType,
        getPayway:getPayway,
        getContact:getContact,
        getContactIcon:getContactIcon,
        isEmpty:isEmpty
    }
});