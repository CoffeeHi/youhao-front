;
define(['jq', 'plugins/move-top', 'plugins/easing', 'plugins/bootstrap.min'], function () {

    (function moveSlowly() {
        <!-- start-smoth-scrolling-->
        $(".scroll").click(function (event) {
            event.preventDefault();
            $('html,body').animate({scrollTop: $(this.hash).offset().top}, 1000);
        });
        <!--smooth-scrolling-of-move-up-->
        $().UItoTop({easingType: 'easeOutQuart'});
    })();

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

    //得到旅单用户角色
    function getRole(role){
        switch (role){
            case 0:return '组织者';break;
            case 1:return '拍摄';break;
            case 2:return '老司机';break;
            case 3:return '翻译';break;
            case 4:return '百科全书';break;
            case 5:return '后勤保障';break;
            case 6:return '吃瓜群众';break;
            case 7:return '行程指挥';break;
            case 8:return '砍价能手';break;
            default : return '';
        }
    }

    //获取旅单状态
    function getTourState(state){
        switch (state){
            case 0:return '拼团中(^_^)';break;
            case 1:return '已组团(๑•̀ㅂ•́)و✧';break;
            case 2:return '进行中(⊙o⊙)';break;
            case 3:return '已完成(*˘︶˘*)♡';break;
            case 4:return '已解散|･ω･｀)';break;
            default : return '';
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
        isEmpty:isEmpty,
        getRole:getRole,
        getTourState:getTourState
    }
});