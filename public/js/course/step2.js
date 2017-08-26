/**
 * Created by lenovo on 2017/8/25.
 */
define(["jquery", "template", "tool", "Jcrop", "uploadify"], function ($, template, tool) {
  $(function () {
    var cs_id = tool.getlink("cs_id");
    var x;
    var y;
    var w;
    var h;
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
            fileTypeExts: '*.gif; *.jpg; *.png',
            itemTemplate: "<span></span>",
            buttonClass: "btn btn-success btn-sm btn_change",
            onUploadSuccess: function (file, data) {
              data = JSON.parse(data);
              var path = data.result.path;
              //设置图片
              $(".preview img").attr("src", path);
              $(".thumb img").attr("src", path);
              
              location.href = "/course/step2?cs_id=" + cs_id;
              
            }
          });
        }
      }
    });
    $("body").on("click", "#btn_jcrop", function () {
      if ($(this).text() == "裁切图片") {
        $(this).text("保存图片");
        $('.preview img').Jcrop({
          setSelect: [0, 0, 10000, 10000],
          aspectRatio: 2,   //宽高比
          boxWidth: 400
        }, function () {
          this.initComponent('Thumbnailer', {width: 240, height: 120, parent: ".thumb"});
          //一进来，先获取到裁剪框的值，初始化x,y,w,h
          var init = this.getSelection();
          x = init.x;
          y = init.y;
          w = init.w;
          h = init.h;
        
          $('.preview').on("cropmove", function (a, b, c) {
            x = parseInt(c.x);
            y = parseInt(c.y);
            w = parseInt(c.w);
            h = parseInt(c.h);
          });
        });
      } else {
        console.log("呵呵");
        //发送ajax请求，裁切图片
        $.ajax({
          type:"post",
          url:"/api/course/update/picture",
          data:{
            cs_id:cs_id,
            x:x,
            y:y,
            w:w,
            h:h
          },
          success:function (info) {
            console.log(info);
            if(info.code == 200){
              location.href = "/course/step3?cs_id="+cs_id;
            }
          }
        });
      }
    })
    /*$("body").on("click", ".btn_tailor", function () {
      $(this).text("保存图片");
      $('.preview img').Jcrop({
        setSelect: [ 0,0,100,100 ],
        aspectRatio: 2,//裁剪框宽高比例2/1
        boxWidth: 400
      },function () {
        this.initComponent('Thumbnailer', {width: 240, height: 120, parent: ".thumb"});
      });
      //
      
      
    })*/
  })
})