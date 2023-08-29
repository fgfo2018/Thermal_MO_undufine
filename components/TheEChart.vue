<template>
   <div id="test-charts" style="height: 350px"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "DataScrapingPage",
  
  
  data() {
    return {};
  },
  mounted() {
    this.drawBar();
  },
  methods: {
    drawBar() {
        const chartDom = document.getElementById('test-charts');
        const myChart = echarts.init(chartDom); // echarts初始化
        var option;
        // -------------------------------------------
      option = {
        xAxis: {
          type: "category",
          data: ["一月", "二月", "三月", "四月", "五月", "六月", "七月"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 1111],
            type: "line",
          },
        ],
      };
              // -------------------------------------------
      
      option && myChart.setOption(option);
    },
  },
};
// let myChart = echarts.init(document.getElementById('charts'));
</script>

<style>
</style>