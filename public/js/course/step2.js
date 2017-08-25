/**
 * Created by lenovo on 2017/8/25.
 */
define(["jquery", "template", "tool", "uploadify"], function ($, template, tool) {
  $(function () {
    var cs_id = tool.getlink("cs_id");
    $.ajax({
      type: "get",
      url: "/api/course/picture",
      data: {cs_id: cs_id},
      success: function (info) {
        console.log(info);
        if (info.code == 200) {
          var html = template("step2_tpl", info.result);
          $(".step2_content").html(html);
          //上传图片插件
          $("#file_upload").uploadify({
            height: 30,
            swf: '/public/assets/uploadify/uploadify.swf',
            uploader: '/api/uploader/cover',
            width: 70,
            fileObjName: "cs_cover_original",
            formData: {cs_id: cs_id},
            buttonText: "上传图片",
            fileTypeExts : '*.gif; *.jpg; *.png',
            itemTemplate:"<span></span>",
            buttonClass: "btn btn-success btn-sm btn_change",
            onUploadSuccess: function (file, data) {
              data = JSON.parse(data);
              var path = data.result.path;
              //设置图片
              $(".preview img").attr("src", path);
              $(".thumb img").attr("src", path);
              
              location.href="/course/step3?cs_id="+cs_id;
              
            }
          });
        }
      }
    })
  })
})