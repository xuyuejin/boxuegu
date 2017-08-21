/**
 * Created by lenovo on 2017/8/20.
 */
define(["jquery", "cookie", "bootstrap", "form"], function ($) {
  $(function () {
   var tc_name=null;
    var tc_pass=null;
    $("input").eq(0).change(function () {
      tc_name=$("input").eq(0).val();
    })
    $("input").eq(1).change(function () {
      tc_pass=$("input").eq(1).val();
    })
    $("form").submit(function () {
    $(this).ajaxSubmit({
        type: "post",
        url: "/api/login",
        success: function (info) {
          if (info.code == 200) {
            var userinfo = JSON.stringify(info.result);
            $.cookie("userinfo", userinfo, {path: "/", expries: 1});
            if($("form").serialize())
              if(tc_name=="前端学院"&&tc_pass=="123456"){
                location.href = "/";
              }else{
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