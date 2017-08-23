/**
 * Created by lenovo on 2017/8/20.
 */
define(["jquery", "cookie", "bootstrap", "form"], function ($, cookie) {
  $(function () {
    var tc_name = null;
    var tc_pass = null;
    
    
    $("form").submit(function () {
      $(this).ajaxSubmit({
        type: "post",
        url: "/api/login",
        success: function (info) {
          if (info.code == 200) {
            var userinfo = JSON.stringify(info.result);
            $.cookie("userinfo", userinfo, {path: "/", expires: 1});
            tc_name = $("input").eq(0).val();
            console.log(tc_name);
  
            tc_pass = $("input").eq(1).val();
            console.log(tc_pass);
            if ($("form").serialize())
              if (tc_name == "前端学院" && tc_pass == "123456") {
                location.href = "/";
              } else {
                alert("用户名或密码错误，请重新登录")
                location.href = "/login";
              }
            
          }
        }
      })
      return false;
    })
  })
});