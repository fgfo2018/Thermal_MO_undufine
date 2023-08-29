<template>
   <div id="test-charts4" style="height: 100px"></div>
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
        const chartDom = document.getElementById('test-charts4');
        const myChart = echarts.init(chartDom); // echarts初始化
        var option;

// 選擇圖表樣式------------------------------------------

option = {
  tooltip: {
    trigger: 'item'
  },
  // legend: {
  //   top: '5%',
  //   left: 'center'
  // },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 0,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '40',
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ]
    }
  ]
};


// -------------------------------------------------------------
      
      option && myChart.setOption(option);
    },
  },
};
// let myChart = echarts.init(document.getElementById('charts'));
</script>

<style>
</style>