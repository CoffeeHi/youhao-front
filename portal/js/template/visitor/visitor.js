;
define([], function () {
    var s = ['{{each list}}<div class="comments-info">',
        '                        <div class="cmnt-icon-left">',
        '                            <a href="#"><img src="{{$value.userImage}}" alt=""></a>',
        '                        </div>',
        '                        <div class="cmnt-icon-right">',
        '                            <p>{{$value.visitTime}}</p>',
        '                            <p><a href="#">{{$value.userName}}</a></p>',
        '                        </div>',
        '                        <div class="clearfix"></div>',
        '                        <p class="cmmnt">个性签名：{{$value.userSig == "" ? "我还没有签名（⊙o⊙）":$value.userSig }}</p>',
        '                    </div>{{/each}}'].join("");
    return {
        toStr :s
    }
});