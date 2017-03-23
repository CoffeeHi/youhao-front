;
define([], function () {
    //登录注册弹窗
    var loginInfo = ['{{if haveLogin == false}}<div class="login" id="toLogin">',
        '               <a href="#" data-toggle="modal" data-target="#modal">登录</a>',
        '              </div>{{else}}',
        ' <div class="user">',
        '                    <ul class="nav nav-pills">',
        '                        <li>',
        '                            <div class="dropdown-toggle" style="padding-bottom: 2px;"><a>{{loginInfo.userName}}</a>',
        '                                <img src="{{loginInfo.userImage}}" id="headImage" class="img-rounded" style="width: 35px;height: 35px;" alt="..."/>',
        '                                <b class="caret"></b>',
        '                            <ul id="user-menu" class="dropdown-menu" role="menu" aria-labelledby="drop4">',
        '                                <li role="presentation"><a role="menuitem" tabindex="-1" href="self.html?1">我的消息</a></li>',
        '                                <li role="presentation"><a role="menuitem" tabindex="-1" href="self.html?2">我的旅单</a></li>',
        '                                <li role="presentation"><a role="menuitem" tabindex="-1" href="self.html?3">个人中心</a></li>',
        '                                <li role="presentation" class="divider"></li>',
        '                                <li role="presentation"><a role="menuitem" tabindex="-1" href="#"" id="exit">退出登录</a></li>',
        '                            </ul>',
        '                            </div>',
        '                        </li>',
        '                    </ul>',
        '                </div>{{/if}}'].join("");
    return {
        toString:loginInfo
    }
});