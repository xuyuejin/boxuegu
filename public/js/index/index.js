/**
 * Created by lenovo on 2017/8/20.
 */
define(["jquery", "echarts"], function ($, ec) {
  $.ajax({
    type: "get",
    url: "/api/dashboard",
    success: function (info) {
      // 基于准备好的dom，初始化echarts实例
      var myChart = ec.init(document.getElementById('main'));
      myChart.setOption(info);
    }
  });
  
  
})