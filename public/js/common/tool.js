/**
 * Created by lenovo on 2017/8/22.
 */
define(["jquery", "datepicker", "datepickerzh_CN"], function () {
  
  function getlinkobj() {
    var linkStr = location.search;
    linkStr = linkStr.slice(1);
    var linkStrarr = linkStr.split("&");
    var linkStrobj = {};
    for (var i = 0; i < linkStrarr.length; i++) {
      var key = linkStrarr[i].split("=")[0];
      var value = linkStrarr[i].split("=")[1];
      linkStrobj[key] = value;
    }
    return linkStrobj;
  }
  
  function getlink(key) {
    return getlinkobj()[key];
  }
  function datepicker(e) {
    $(e).datepicker({
      format: 'yyyy-mm-dd',//修改日期格式
      todayBtn: true,//显示今天按钮
      endDate: "+0d",//限定选取范围
      language: 'zh-CN',//修改显示语言，引用js文件
      autoclose: true,//选取后自动关闭
      todayHighlight:true
    });
  }
  
  
  
  
  return {
    getlink: getlink,
    getlinkobj: getlinkobj,
    datepicker:datepicker
  }
  
})