/**
 * Created by lenovo on 2017/8/22.
 */
define(["jquery","template","uploadify"],function ($,template) {
    $(function () {
      $(function() {
        $("#upfile").uploadify({
          height        : 120,
          swf: '/public/assets/uploadify/uploadify.swf',
          uploader: '/api/uploader/avatar',
          width         : 120,
          fileObjName:"tc_avatar",
          buttonText:"",
          onUploadSuccess:function (file, data, response) {
            data = JSON.parse(data);
            //设置图片
            $(".preview img").attr("src", data.result.path);
          }
        });
      });
    });
})