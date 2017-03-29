;
define([], function () {
    var s = [   '<h4>评论</h4>{{each list}}',
        '<div class="media response-info">',
            '                        <div class="media-left response-text-left">',
            '                            <a href="#">',
            '                                <img class="media-object" src="{{$value.comAuthorImg}}" alt=""/>',
            '                            </a>',
            '                            <h5><a href="#">{{$value.comAuthorName}}</a></h5>',
            '                        </div>',
            '                        <div class="media-body response-text-right">',
            '                            <p>{{$value.comContent}}</p>',
            '                            <ul>',
            '                                <li>{{$value.comTime}}</li>',
            '                                <li><a class="reply" id="{{$value.comId}}" href="javascript:;">回复</a></li>',
            '                                {{if ($value.comAuthor | ifOwnCom)}}<li><a class="delete" delId="{{$value.comId}}" href="javascript:;">删除</a></li>{{/if}}',
            '                            </ul>','{{each $value.commentList as val i}}',
            '                            <div class="media response-info">',
            '                                <div class="media-left response-text-left">',
            '                                    <a href="#">',
            '                                        <img class="media-object" src="{{val.comAuthorImg}}" alt=""/>',
            '                                    </a>',
            '                                    <h5><a href="#">{{val.comAuthorName}}</a></h5>',
            '                                </div>',
            '                                <div class="media-body response-text-right">',
            '                                    <p>{{val.comContent}}</p>',
            '                                    <ul>',
            '                                        <li>{{val.comTime}}</li>',
            '                                        {{if val.comAuthor | ifOwnCom}}<li><a class="delete" delId="{{val.comId}}" href="javascript:;">删除</a></li>{{/if}}',
            '                                    </ul>',
            '                                </div>',
            '                                <div class="clearfix"></div>',
            '                            </div>{{/each}}',
            '                        </div>',
            '                        <div class="clearfix"></div>',
            '                    </div>',
        '{{/each}}'].join("");
    return {
        toString : s
    };
});