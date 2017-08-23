/**
 * Created by lenovo on 2017/8/22.
 */
define(["jquery", "template", "tool", "datepicker", "datepickerzh_CN"], function ($, template, tool) {
  $(function () {
    var tc_id = tool.getlink("tc_id");
    console.log(tc_id);
    if (tc_id) {
      console.log("修改")
      $.ajax({
        type: "GET",
        url: "/api/teacher/edit",
        data: {tc_id: tc_id},
        success: function (info) {
          info.result["title"] = "修改讲师";
          info.result["btntext"] = "修改";
          console.log(info);
          var html = template("teacher_add_tpl", info.result)
          $(".teacher_edit").html(html);
          //添加日期插件
          $('.datepicker').datepicker({
            format: 'yyyy-mm-dd',//修改日期格式
            todayBtn: true,//显示今天按钮
            endDate: "+0d",//限定选取范围
            language: 'zh-CN',//修改显示语言，引用js文件
            autoclose: true,//选取后自动关闭
            todayHighlight:true
          });
        }
      })
    } else {
      var html = template("teacher_add_tpl", {title: "增加讲师", btntext: "增加", tc_id: tc_id})
      $(".teacher_edit").html(html);
      console.log("增加")
      //添加日期插件
      $('.datepicker').datepicker({
        format: 'yyyy-mm-dd',//修改日期格式
        todayBtn: true,//显示今天按钮
        endDate: "+0d",//限定选取范围
        language: 'zh-CN',//修改显示语言，引用js文件
        autoclose: true,//选取后自动关闭
        todayHighlight:true
      });
    }
    ;
    $("body").on("click", ".info_save", function () {
      var url;
      if (tc_id) {
        url = "/api/teacher/update"
      } else {
        url = "/api/teacher/add"
      }
      console.log($("form").serialize());
      $.ajax({
        type: "post",
        url: url,
        data: $("form").serialize(),
        success: function (info) {
          if (info.code == 200) {
            console.log("保存成功");
          }
        }
      })
    });
    
  })
})