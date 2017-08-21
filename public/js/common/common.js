define(["jquery", "template", "cookie", "bootstrap"], function ($, template) {
  $(function () {
    if(!$.cookie("PHPSESSID")){
      location.href="/login";
      return false;
    }
    //获取cookie数据,渲染页面侧边栏
    var userinfo = JSON.parse($.cookie("userinfo"));
    var html = template("aside_info", userinfo);
    $("#user_info").html(html);
    //侧边栏样式设置
    
    //判断当前页面的路径,让当前对应的侧边栏高亮
    var $menu_links = $(".navs a");
    $menu_links.each(function (i, e) {
      var $that = $(this);
      $that.removeClass("active");
      if (location.pathname == $(this).attr("href")) {
        $that.addClass("active");
      }
    })
    //二级菜单下拉框toggle效果
    $("body").on("click",".two_menu",function () {
      //下拉框有active就让ul显示状态
      if($(".two_menu a").hasClass("active")){
        $("#two_menu_list").show();
      }else{
        $("#two_menu_list").stop().fadeToggle();
      }
    });
    if($(".two_menu a").hasClass("active")){
      $("#two_menu_list").show();
    };
    
    //退出功能
    //发请求给服务器过期存储
    $("body").on("click","#logout",function () {
      $.ajax({
        type:"post",
        dataType:"json",
        url:"/api/logout",
        success:function (info) {
          console.log(info);
          if(info.code==200){
            $.removeCookie("userinfo", {path: "/"});
            location.href="/login";
          }
        }
      })
    });
    //如果cookie中没有PHPSESSID，就让页面跳转到登录页面
    
    
    
    
    
  });
})