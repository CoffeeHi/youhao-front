/**
 * sea.config.js
 * 依赖关系配置
 * 版本控制
 **/
;
(function () {
  var IEVersion;
  // IE 版本判断
  var notIe = false;
  var ieVersion = 4;
  var ieStart = ieVersion + 1;
  var elem = document.createElement("div");
  var childElems = elem.getElementsByTagName("i");
  while (elem.innerHTML = '<!--[if gt IE ' + (++ieVersion) + ']><i></i><![endif]-->',
    childElems[0]);
  IEVersion = (ieVersion > ieStart) ? ieVersion : notIe;

  seajs.config({
    //别名
    alias: {
        jquery: 'jquery-2.1.4.min',
        moveTop: 'move-top',
        easing: 'easing',
        bootstrap : 'bootstrap.min'
    }
    // 模块的路径别名配置
    , paths: {
        'p' : 'plugins', 'm':'modules'
    },
    //预加载
    preload: [
        'jquery',
        'moveTop',
        'easing',
        'bootstrap',
        (IEVersion == 8 && (JSON && (JSON = undefined))) || typeof JSON === 'undefined' ? 'http://cdn.bootcss.com/json2/20130526/json2.min.js' : ''
    ],
    //文件映射
    map: [
    ],
  // 变量配置
  vars: {
      'datepicker': 'bootstrap-datetimepicker',
      'locale': 'zh-CN'
  },
    //编码
    charset: 'utf-8'
  });

})();