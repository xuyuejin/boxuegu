/**
 * Created by lenovo on 2017/8/24.
 */
define(["jquery","template","tool"],function ($,template,tool) {
    $(function () {
        var cs_id=tool.getlink("cs_id");
      if(cs_id){
        $.ajax({
          type:"get",
          url:"/api/course/basic",
          data:{cs_id:cs_id},
          success:function (info) {
            console.log(info);
            if(info.code==200){
              var data=info.result;
              data.title="课程修改";
              data.btn="修改";
              data.cs_id=cs_id;
              var html=template("step_one_tpl",data)
              $("#course_add").html(html);
            }
          }
        })
      }else{
        
        var html=template("step_one_tpl",{title:'课程新增',btn:'新增'})
        $("#course_add").html(html);
      }
      $("body").on("click",".btn_save",function () {
        console.log($("form").serialize());
        $.ajax({
            type:"post",
            url:"/api/course/update/basic",
            data:$("form").serialize(),
            success:function (info) {
              console.log(info);
            }
          })
      })
    })
})