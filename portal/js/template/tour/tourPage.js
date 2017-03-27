;
define([], function () {
    var s = [   '{{each list}}',
        '<div id="{{$value.id}}" class="order transparent-all friendly-box">',
            '                <div class="order-cover">',
        '                        <img src="{{$value.coverPath}}" alt=""/>',
            '                </div>',
            '                <div class="order-detail">',
            '                        <p><label>目的地：</label><span class="sight">{{$value.target}}</span></p>',
            '                        <p><label>时间：</label><span>{{$value.dateStart != undefined ? $value.dateStart.substr(0, 10):""}}—{{$value.dateOver!= undefined ? $value.dateOver.substr(0, 10):""}}</span></p>',
            '                        <p><label>发布者：</label><span>{{$value.userName}}</span></p>',
            '                        <p><label>发布时间：</label><span>{{$value.postTime.substr(0, 16)}}</span></p>',
            '                </div>',
            '            </div>',
        '{{/each}}'].join("");
    return {
        toString : s
    };
});