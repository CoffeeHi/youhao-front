;
define([], function () {
    var s = [' <%for(var i=0; i<list.length; i++){ var item = list[i];%><div class="media response-info">',
        '                        <div class="media-left response-text-left">',
        '                            <a href="#">',
        '                                <img class="media-object" src="<%=item.comAuthorImg%>" alt=""/>',
        '                            </a>',
        '                            <h5><a href="#"><%=item.comAuthorName%></a></h5>',
        '                        </div>',
        '                        <div class="media-body response-text-right">',
        '                            <p><%=item.comContent%></p>',
        '                            <ul>',
        '                                <li><%=item.comTime%></li>',
        '                                <li><a class="reply" id="<%=item.comId%>" href="javascript:;">回复</a></li>',
        '                                <%if(ifOwnCom(item.comAuthor)){%><li><a class="delete" delId="<%=item.comId%>" href="javascript:;">删除</a></li><%}%>',
        '                            </ul><%for(var j=0; j<item.commentList.length; j++){ var item2 = item.commentList[j];%>',
        '                            <div class="media response-info">',
        '                                <div class="media-left response-text-left">',
        '                                    <a href="#">',
        '                                        <img class="media-object" src="<%=item2.comAuthorImg%>" alt=""/>',
        '                                    </a>',
        '                                    <h5><a href="#"><%=item2.comAuthorName%></a></h5>',
        '                                </div>',
        '                                <div class="media-body response-text-right">',
        '                                    <p><%=item2.comContent%></p>',
        '                                    <ul>',
        '                                        <li><%=item2.comTime%></li>',
        //'                                        <li><a class="reply" id="<%=item2.comId%>" href="javascript:;">回复</a></li>',
        '                                        <li><a class="delete" delId="<%=item2.comId%>" href="javascript:;">删除</a></li>',
        '                                    </ul>',
        '                                </div>',
        '                                <div class="clearfix"></div>',
        '                            </div><%}%>',
        '                        </div>',
        '                        <div class="clearfix"></div>',
        '                    </div><%}%>'].join("");
    return {
        toString : s
    };
});