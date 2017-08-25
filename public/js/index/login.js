/**
 * Created by lenovo on 2017/8/20.
 */
define(["jquery", "cookie", "bootstrap", "form"], function ($, cookie) {
  $(function () {
    
    $("form").submit(function () {
      $(this).ajaxSubmit({
        type: "post",
        url: "/api/login",
        success: function (info) {
          if (info.code == 200) {
            var userinfo = JSON.stringify(info.result);
            $.cookie("userinfo", userinfo, {path: "/", expires: 1});
            location.href="/";
          }
        }
      })
      return false;
    })
  })
});