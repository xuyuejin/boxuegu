/**
 * Created by lenovo on 2017/8/24.
 */
define(["jquery","template"],function ($,template) {
    $(function () {
      $.ajax({
        type:"get",
        url:"/api/category",
        success:function (info) {
          console.log(info);
          var html=template("category_list_tpl",info);
          $("tbody").html(html);
        }
      })
      
    })
})