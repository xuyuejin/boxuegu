/**
 * Created by lenovo on 2017/8/21.
 */
define(["jquery", "template", "bootstrap"], function ($, template) {
  $(function () {
    $.ajax({
      type: "get",
      url: "/api/teacher",
      dataType: "json",
      success: function (info) {
        if (info.code == 200) {
          //渲染出讲师列表信息
          var html = template("tea_listTp", info);
          $("#teacher_detail").html(html);
          
        }
        
      }
    });
    //点击查看按钮发送请求，渲染模态框内容，显示模态框
    $("#teacher_detail").on("click", ".examine", function () {
      var tc_id = $(this).parent().data("id");
      $.ajax({
        type: "get",
        url: "/api/teacher/view",
        data: {tc_id: tc_id},
        dataType: "json",
        success: function (info) {
          console.log(1)
          if (info.code == 200) {
            var html = template("Modal_tpl", info.result);
            $("#teacherModal").html(html).modal('show');
          }
        }
      })
      return false;
    });
    //注销按钮功能
    $("#teacher_detail").on("click",".cancel",function () {
      var $that=$(this);
      var tc_id=$that.parent().data("id");
      var tc_status=$that.parent().data("status");
      $.ajax({
        type: "post",
        url: "/api/teacher/handle",
        data: {tc_id: tc_id,tc_status:tc_status},
        dataType: "json",
        success: function (info) {
          if (info.code == 200) {
            //根据返回的status切换当前按钮的
            if(info.result.tc_status == 0){
              $that.text("注 销");
              $that.removeClass("btn-success");
              $that.addClass("btn-warning");
            }else {
              $that.text("启 用");
              $that.addClass("btn-success");
              $that.removeClass("btn-warning");
            }
            $that.parent().data("status", info.result.tc_status);
          }
        }
      })
    })
  });
});