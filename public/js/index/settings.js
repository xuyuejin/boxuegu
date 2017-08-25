/**
 * Created by lenovo on 2017/8/22.
 */
define(["jquery", "template", "tool", "ckeditor", "uploadify", "region", "cookie"], function ($, template, tool, CKEDITOR) {
  $(function () {
    $.ajax({
      type: "get",
      url: "/api/teacher/profile",
      success: function (info) {
        console.log(info);
        var data = info.result;
        if (info.code == 200) {
          var html = template("personal_center_tpl", data);
          $(".personal_center").html(html);
          //上传图像插件
          //上传图片插件
          $("#upfile").uploadify({
            height: 120,
            swf: '/public/assets/uploadify/uploadify.swf',
            uploader: '/api/uploader/avatar',
            width: 120,
            fileObjName: "tc_avatar",
            buttonText: "",
            onUploadSuccess: function (file, data) {
              data = JSON.parse(data);
              var path = data.result.path;
              //设置图片
              $(".preview img").attr("src", path);
              $("#user_info img").attr("src", path);
              
              // 将cookie中的userinfo对象中的tc_avatar属性更换为path
             
              var userinfo = $.cookie("userinfo");
              //一.userinfo为一个字符串,转化为对象
              userinfo = JSON.parse(userinfo);
              //二.更改userinfo的tc_avatar属性
              userinfo.tc_avatar = path;
              //三.更改完成后将userinfo装换为json字符串
              userinfo = JSON.stringify(userinfo);
              //四.将userinfo字符串,存入userinfo对象中,更新数据
              $.cookie("userinfo", userinfo, {path: "/", expires: 1});
            }
          });
          
          //三级联动插件
          $(".demo_three").region({
            url: "/public/assets/jquery-region/region.json"
          });
          
          // 日期控件插件
          tool.datepicker("#tc_birthday");
          tool.datepicker("#tc_join_date");
          
          // 富文本编辑器插件
          CKEDITOR.replace('tc_introduce');
        }
      }
    })
    
    //注册委托事件
    $("body").on("click","#btn_save",function () {
      // console.log($("form").serialize());
      //点击提交时，把富文本编辑的内容同步到textarea中，这样后端获取到这个值
      for ( instance in CKEDITOR.instances ) {
        CKEDITOR.instances[instance].updateElement();
      }
  
      $.ajax({
        type:"post",
        data:$("form").serialize(),
        url:"/api/teacher/modify",
        success:function (info) {
          console.log(info);
          //保存成功之后刷新页面
          location.href="/index/settings";
          
        }
      })
      
      return false;
    });
    
  });
})