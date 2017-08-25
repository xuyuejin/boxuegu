/**
 * Created by lenovo on 2017/8/24.
 */
define(["jquery","template"],function ($,template) {
    $(function () {
      $.ajax({
        type:"get",
        url:"/api/course",
        success:function (info) {
          console.log(info);
          var html=template("course_list_tpl",info);
          $("#course_list").html(html);
        }
      })
    })
})