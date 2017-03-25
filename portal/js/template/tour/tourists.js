;
define([], function () {
    var s = [   '{{each list}}',
        '<a href="#" class="userRole" data-toggle="tooltip" data-placement="bottom" title="我是{{getRole($value.userRole)}}">',
        '                        <img src="{{$value.userImage}}" alt="..." class="img-thumbnail">',
        '                    </a>',
        '{{/each}}'].join("");

    return {
        toString : s
    };
});