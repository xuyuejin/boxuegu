/**
 * Created by lenovo on 2017/8/20.
 */
require.config({
    baseUrl:"/public/",
    paths:{
      template:"assets/artTemplate/template",
      jquery:"assets/jquery/jquery",
      bootstrap:"assets/bootstrap/js/bootstrap",
      cookie:"assets/jquery-cookie/jquery.cookie",
      form:"assets/jquery-form/jquery.form"
    },
    shim:{
      bootstrap:{
        deps:["jquery"]
      }
    }
}
  
);
