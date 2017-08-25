/**
 * Created by lenovo on 2017/8/23.
 */
define(["jquery"], function ($) {
  
  $("#btn_pass").click(function () {
    var new_pass = $("#tc_new_pass").val();
    var comfirm_pass = $("#comfirm_pass").val();
    if (new_pass !== comfirm_pass) {
      alert("新密码与确认密码不一致");
      location.href = "/index/repass";
      return false;
    }
    $.ajax({
      type:"post",
      url:"/api/teacher/repass",
      data:$("form").serialize(),
      success:function (info) {
          if(info.code==200){
            //保存成功之后触发,退出事件
            $("#logout").trigger("click");
          }
      }
    })
    
    
  })
})