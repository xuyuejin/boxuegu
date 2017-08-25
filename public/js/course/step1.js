/**
 * Created by lenovo on 2017/8/24.
 */
define(["jquery", "template", "tool","ckeditor"], function ($, template, tool,CKEDITOR) {
  $(function () {
    var cs_id = tool.getlink("cs_id");
    if (cs_id) {
      $.ajax({
        type: "get",
        url: "/api/course/basic",
        data: {cs_id: cs_id},
        success: function (info) {
          console.log(info);
          if (info.code == 200) {
            var data = info.result;
            data.title = "课程修改";
            data.btn = "修改";
            data.cs_id = cs_id;
            var html = template("step_one_tpl", data)
            $("#course_add").html(html);
            // 富文本编辑器插件
            CKEDITOR.replace('tc_introduce');
          }
        }
      })
    } else {
      
      var html = template("step_one_tpl", {title: '课程新增', btn: '新增'})
      $("#course_add").html(html);
      // 富文本编辑器插件
      CKEDITOR.replace('tc_introduce');
    }
    //重点二级联动,(当一级选框选中内容发生改变的时候,拿到一级选框的cs_cg_pid,发送ajax,重新渲染二级框内容);
    $("body").on("change", "#first_checkbox", function () {
      var cg_id = $(this).val();
      $.ajax({
        type: "get",
        url: "/api/category/child",
        data: {cg_id: cg_id},
        success: function (info) {
          console.log(info);
          if (info.code == 200) {
            var html = template("cs_cg_id_tpl", info)
            $("#cs_cg_id").html(html);
          }
        }
      })
    })
    
    
    //点击保存按钮
    $("body").on("click", ".btn_save", function () {
      // console.log($("form").serialize());
      //点击提交时，把富文本编辑的内容同步到textarea中，这样后端获取到这个值
      for ( instance in CKEDITOR.instances ) {
        CKEDITOR.instances[instance].updateElement();
      }
      $.ajax({
        type: "post",
        url: "/api/course/update/basic",
        data: $("form").serialize(),
        success: function (info) {
          if (info.code == 200) {
            console.log(info);
            var cs_id = info.result.cs_id;
            //跳转到下一步step2,并且带上id
            location.href = "/course/step2?cs_id=" + cs_id
          }
        }
      })
    })
  })
})