<template>
  <div ref="lineBarChart" style="height: 285px; width: 1030px" id="peakChat"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {}
  },
  mounted() {
    this.drawBar()
  },

  methods: {
    drawBar() {
      // var series = []
      // for (var i = 0; i < 16; i++) {
      //   var data = []
      //   for (var j = 0; j < 24; j++) {
      //     data.push(Math.floor(Math.random() * 6))
      //   }
      //   series.push({
      //     name: '矩形' + i,
      //     type: 'bar',
      //     data,

      //     // barWidth: '50%',],
      //     // barWidth: '50%',
      //   },)
      // }
      const chartDom = this.$refs.lineBarChart
      const myChart = echarts.init(chartDom) // echarts初始化
      // const colorPalette = ['#37484C', '#9aa2a4', '#d8dddd', '#E6E8E9']
      var hours26 = []
      for (var i = 0; i < 24; i++) {
        hours26.push(i)
      }
      var option
      // 選擇圖表樣式------------------------------------------

      option = {
        title: {
          left: 'left',
          text: '高溫時段統計圖',
          textStyle: {
            fontFamily: 'Arial',
            fontSize: '14',
            fontWeight: '700',
            color: '#505f62',
          },
        },

        // tooltip: {
        //   axisPointer: {
        //     type: 'cross',
        //   },
        //   // alwaysShowContent:true,   // 鼠标离开区域不消失
        //   trigger: 'axis',
        // },
        tooltip: {
          trigger: 'axis',
          // axisPointer: {
          //   type: 'shadow'
          // }
          formatter(params) {
            // console.log(params);
            var paramslen = params.length
            var totle = 0
            for (var i = 0; i < paramslen; i++) {
              totle += params[i].data.value
            }
            var div = `<div class="d-flex flex-column">`
            for (var z = 0; z < paramslen; z++) {
              var start = new Date(params[z].data.start)
              start = (start.getMonth() + 1) + '/' + start.getDate()
              div += `<div class="custompeaktootip"><div>${params[z].marker}</div><div>${start} : </div><div>${params[z].data.value}</div></div>`
            }
            div += `<hr class="mt-1"><div class="custompeaktootip"><div></div><div>總計 : </div><div>${totle}</div></div></div>`
            return div
          }
        },
        legend: { // 左上角物件開關
          right: 100,
          type: 'scroll',
          width: 500,
          selectedMode: 'single'
        },
        grid: {
          // left: '3%',
          // right: '4%',
          // bottom: '3%',
          top: '90',
          bottom: '0',
          right: '115',
          left: '30',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            axisPointer: {
              type: 'line',
            },
            axisTick: {
              show: true,
              interval: 0,
            },
            data: hours26
          }
        ],

        yAxis: [
          {
            type: 'value'
          }
        ],
        series: []
      }

      // -------------------------------------------------------------

      option && myChart.setOption(option)
    },
  },
  beforeDestroy() {
    const chartDom = this.$refs.lineBarChart
    var chart = echarts.getInstanceByDom(chartDom)
    if (chart !== undefined) {
      // console.log("test", chart);
      chart.dispose()
    }
  }
}
// let myChart = echarts.init(document.getElementById('charts'));
</script>

<style>
.custompeaktootip {
  display: grid;
  grid-template-columns: 20px 49px 24px;
}

#specialLook {
  pointer-events: all;

  border: 0;
  background-color: #37484c;
  color: #fff;
  border-radius: 10px;
  cursor: pointer;
}

#specialLook:hover {
  color: #37484c;
  background-color: #fff;
  border: 2px #37484c solid;
}
</style>
