/**
 * Created by lenovo on 2017/8/20.
 */
require.config({
    baseUrl:"/public/",
    paths:{
      template:"assets/artTemplate/template-web",
      jquery:"assets/jquery/jquery",
      bootstrap:"assets/bootstrap/js/bootstrap",
      cookie:"assets/jquery-cookie/jquery.cookie",
      form:"assets/jquery-form/jquery.form",
      tool:"js/common/tool",
      datepicker:"assets/bootstrap-datepicker/js/bootstrap-datepicker.min",
      datepickerzh_CN:"assets/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min",
      nprogress:"assets/nprogress/nprogress",
      uploadify:"assets/uploadify/jquery.uploadify",
      region:"assets/jquery-region/jquery.region",
      ckeditor:"assets/ckeditor/ckeditor"
    },
    shim:{
      bootstrap:{
        deps:["jquery"]
      },
      datepickerzh_CN:{
        deps:["jquery"]
      },
      uploadify:{
        deps:["jquery"]
      },
      ckeditor:{
        exports:"CKEDITOR"
      }
    }
}
  
);
