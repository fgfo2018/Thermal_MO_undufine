<template>
  <div ref="lineBarChart" id="lineBarChart0001" style="height: 231px; width: 930px"></div>
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
      var chartDom = this.$refs.lineBarChart
      var myChart = echarts.init(chartDom) // echarts初始化
      // const colorPalette = ['#37484C', '#9aa2a4', '#d8dddd', '#E6E8E9']
      var option

      // 選擇圖表樣式------------------------------------------

      option = {
        title: {
          left: '-5',
          text: '監測項目時段超溫紀錄圖',
          textStyle: {
            fontFamily: 'Arial',
            fontSize: '14',
            fontWeight: '700',
            color: '#505f62',
          },
        },
        tooltip: {
          axisPointer: {
            type: 'cross',
          },
          // triggerOn: 'click', // 触发方式
          // alwaysShowContent:true,   // 鼠标离开区域不消失
          trigger: 'axis',
        },

        grid: {
          show: false,
          top: '70',
          bottom: '20',
          right: '0',
          left: '50',
          width: '830',
        },
        legend: {
          show: true,
          selectedMode: 'multiple', // 設定顯示單一圖例的圖形，點選可切換
          right: 10,
          width: '770px',
          textStyle: {
            color: '#666',
            fontSize: 9,
          },
          itemGap: 10,
          // data: [
          //   '矩形1vs矩形2',
          //   '矩形2vs矩形3',
          //   '矩形1',
          //   '矩形2',
          //   '矩形3',
          //   '參考點',
          // ],
          inactiveColor: '#ccc',
        },
        xAxis: [
          {
            name: '(sec)',
            type: 'category',
            // data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            // axisPointer: {
            //   type: 'shadow',
            // },

            // axisTick: {
            //   show: false,
            //   interval: 0,
            // },
          },
        ],

        // 設定兩個y軸，左邊顯示數量，右邊顯示概率

        yAxis: [
          {
            type: 'value',
            name: '(°C)',
            // min: 0,
            // max: 60,
            show: true,
            // interval: 10,
            min(value) {
              return value.min - (value.min * 0.2);
            },
            max(value) {
              return value.max + (value.min * 0.1);
            }
            //             axisLabel: {
            //   formatter: '{value} %',
            // },
          },
          // {
          //   type: 'value',
          //   name: '(%)',
          //   min: 0,
          //   max: 3.5,
          //   interval: 0.5,
          //   // axisLabel: {
          //   //   formatter: '{value} %',
          //   // },
          // },
        ],

        // 每個裝置分數量、概率2個指標，只要讓他們的name一致，即可通過，legeng進行統一的切換
        // color: colorPalette,
        series: [
          // {
          //   name: '矩形2',
          //   type: 'line',
          //   yAxisIndex: 0, // 這裡要設定哪個y軸，預設是最左邊的是0，然後1，2順序來。
          //   markLine: {
          //     symbol: ['none', 'none'],
          //     label: { show: false },
          //     color: 'red',
          //     data: [{ xAxis: 1 },{ xAxis: 4 }]
          //   },
          //   data: [
          //     45, 55, "", "", 37, 31, 35, 33, 40, 31, 30, 39, 34, 27, 40, 49,
          //     43, 42, 40, 33, 32, 30, 30, 47,
          //   ],
          //   symbolSize: 1,
          //   itemStyle: {
          //     normal: {
          //       color: '#828C8F',
          //     },
          //   },
          // }
        ],
      }

      // -------------------------------------------------------------

      option && myChart.setOption(option)
      chartDom = null
      myChart = null
      option = null
    },
  },
  beforeDestroy() {
    var chartDom = this.$refs.lineBarChart
    var chart = echarts.getInstanceByDom(chartDom)
    if (chart !== undefined) {
      // console.log("test", chart);
      chart.dispose()
      chartDom = null
      chart = null
    }
  }
}
// let myChart = echarts.init(document.getElementById('charts'));
</script>

<style>
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
