/**
 * Created by lenovo on 2017/8/25.
 */
define(["jquery", "template", "tool", "bootstrap","form"], function ($, template, tool) {
  $(function () {
    var cs_id = tool.getlink("cs_id");
    //渲染页面
    $.ajax({
      type: "get",
      url: "/api/course/lesson",
      data: {cs_id: cs_id},
      success: function (info) {
        console.log(info);
        if (info.code == 200) {
          var html = template("step3_tpl", info.result);
          $("#step3_content").html(html);
        }
      }
    });
    //添加页面
    $("body").on("click", "#btn_add", function () {
      var data = {title: "添加课时", btnText: "添 加", sign: "add",ct_cs_id:cs_id}
      var html = template("modal_tpl", data);
      $("#lesson").html(html);
      $("#lesson").modal("show")
    })
    //编辑页面
    $("body").on("click", "#btn_edit", function () {
      var ct_id = $(this).parent().data("id");
      
      $.ajax({
        type: "get",
        url: "/api/course/chapter/edit",
        data: {ct_id: ct_id},
        success: function (info) {
          console.log(info);
          var data = info.result;
          data.title = "编辑课时";
          data.btnText = "编 辑"
          data.sign = "edit"
          if (info.code == 200) {
            var html = template("modal_tpl", data);
            $("#lesson").html(html);
          }
          $("#lesson").modal("show")
        }
      })
    })
    
    //点击确认提交
    $("body").on("click", "#btn_save", function () {
      var sign = $(this).parent().data("sign")
      // 判断选中没选中
      var ct_is_free;
      if ($("#ct_is_free").prop("checked")) {
        ct_is_free = 0;
      } else {
        ct_is_free = 1;
      }
      var url = "";
      if (sign == "add") {
        url = "/api/course/chapter/add"
      } else {
        url = "/api/course/chapter/modify"
      }
      
      $("form").ajaxSubmit({
        type: "post",
        url: url,
        data: {ct_is_free:ct_is_free},
        success: function (info) {
          if(info.code==200){
            location.href="/course/step3?cs_id="+cs_id;
          }
        }
      })
    })
  })
})