/**
 * Created by lenovo on 2017/8/24.
 */
define(["jquery"], function ($) {
  $(function () {
    $("body").on("click",".btn_create",function () {
      var cs_name = $("#cs_name").val().trim();
      if (cs_name != "") {
        $.ajax({
          type: "post",
          url: "/api/course/create",
          data: $("form").serialize(),
          success: function (info) {
            console.log(info);
            location.href="/course/step1?cs_id="+info.result.cs_id
          }
        })
      } else {
        alert("课程名不能为空哦!!!")
        return false;
      }
      
    })
  })
  
})