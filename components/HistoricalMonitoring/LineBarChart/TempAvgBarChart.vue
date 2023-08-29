<template>
  <div ref="lineBarChart" id="lineAvgChart" style="height: 190px; width: 750px"></div>
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
      const chartDom = this.$refs.lineBarChart
      const myChart = echarts.init(chartDom) // echarts初始化
      // const colorPalette = ['#37484C', '#9aa2a4', '#d8dddd', '#E6E8E9']
      var option

      // 選擇圖表樣式------------------------------------------

      option = {
        title: {
          left: '5',
          text: '平均溫度',
          textStyle: {
            fontFamily: 'Arial',
            fontSize: '14',
            fontWeight: '700',
            color: '#505f62',
          },

          show: true,
        },
        // tooltip: {
        //   trigger: 'axis',

        //   triggerOn: 'click',
        //   enterable:true,

        //   formatter: '{a}:{c}',
        //   axisPointer: {
        //     type: 'cross',
        //     crossStyle: {
        //       color: '#999',
        //     },
        //   },
        // },

        tooltip: {
          axisPointer: {
            type: 'line',
          },
          // triggerOn: 'click', // 触发方式
          // alwaysShowContent:true,   // 鼠标离开区域不消失
          trigger: 'axis',
          alwaysShowContent: false, // 鼠标离开区域不消失
        },

        grid: {
          show: false,
          top: '70',
          bottom: '20',
          right: '110',
          left: '60', 
        },
        dataZoom: [
          {
            type: 'inside',
            realtime: true,
          },
        ],
        legend: {
          show: true,
          selectedMode: 'multiple', // 設定顯示單一圖例的圖形，點選可切換
          right: 80,
          width: '500px',
          type: 'scroll',
          textStyle: {
            color: '#666',
            fontSize: 9,
          },
          itemGap: 10,
          // data: ['矩形1vs矩形2', '矩形2vs矩形3', '矩形1', '矩形2', '矩形3'],
          inactiveColor: '#ccc',
        },
        xAxis: [
          {
            type: 'category',
            data: [],
            axisPointer: {
              type: 'line',
            },

            axisTick: {
              show: true,
              interval: 0,
            },
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
            interval: 10,
            min(value) {
              return value.min - 10;
            },
            max(value) {
              return value.max + 5;
            }
            // minInterval: 20
            //             axisLabel: {
            //   formatter: '{value} %',
            // },
          }
          // ,
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

        series: [],
      }

      // -------------------------------------------------------------

      option && myChart.setOption(option)
      var tr = true
      myChart.getZr().on('click', (event) => {
        if (tr) {
          myChart.setOption({
            tooltip: {
              triggerOn: 'click', // 触发方式
              alwaysShowContent: true,
            },
          })
          tr = false
        } else {
          myChart.setOption({
            tooltip: {
              triggerOn: 'mousemove', // 触发方式
              alwaysShowContent: false,
            },
          })
          tr = true
        }
      })
    },
  },
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
