/**
 * Created by lenovo on 2017/8/24.
 */
define(["jquery","template","tool"],function ($,template,tool) {
    $(function () {
       var cg_id=tool.getlink("cg_id");
      if(cg_id){
        $.ajax({
          type:"get",
          url:"/api/category/edit",
          data:{cg_id:cg_id},
          success:function (info) {
            console.log(info);
            var data=info.result;
            data.title="修改分类";
            data.btn="修 改";
            var html=template("category_add_tpl",data);
            $("#category_list").html(html);
            $("#cg_pid").val(data.cg_pid);
          }
        })
      }else{
        $.ajax({
          type:"get",
          url:"/api/category/top",
          success:function (info) {
            console.log(info);
            info.top=info.result;
            info.title="增加分类";
            info.btn="增 加";
            var html=template("category_add_tpl",info);
            $("#category_list").html(html);
          }
        })
      }
      $("body").on("click",".btn_save",function () {
          var url="";
        if(cg_id){
          url="/api/category/modify"
        }else{
          url="/api/category/add"
        }
        console.log($("form").serialize());
        $.ajax({
          url:url,
          type:"post",
          data:$("form").serialize(),
          success:function (info) {
            console.log(info);
          }
        })
      })
      
      
      
    })
})