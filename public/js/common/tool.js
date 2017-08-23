/**
 * Created by lenovo on 2017/8/22.
 */
define([], function () {
  
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
  
  return {
    getlink: getlink,
    getlinkobj: getlinkobj
  }
  
})