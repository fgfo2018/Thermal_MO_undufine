<template>
  <div ref="lineBarChart" style="height: 670px; width: 1250px"></div>
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
      const colorPalette = ['#37484C', '#9aa2a4', '#d8dddd', '#E6E8E9']
      var option

      // 選擇圖表樣式------------------------------------------

      option = {
        title: {
          left: 'left',
          text: '概率',
          show: false,
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
            type: 'cross',
          },
          // triggerOn: 'click', // 触发方式
          // alwaysShowContent:true,   // 鼠标离开区域不消失
          trigger: 'axis',

          formatter(params) {
            var html = ''
            if (params.length > 0) {
              html += ' ' + params[0].name + '<br>'
              for (var int = 0; int < params.length; int++) {
                if (int === 0) {
                  html +=
                    params[int].marker +
                    params[int].seriesName +
                    ': ' +
                    params[int].value +
                    params[1].value +
                    params[2].value +
                    '<br/><button class="btn" id="specialLook" οnclick="lookVideoGo" style="width:150px;height:50px;">查看更多</button><br>'
                  // lookVideoGo按钮触发函数 ，注意传递参数引号规则
                }
              }
            }
            return html
          },
        },

            grid: {
          show: false,
          top: '90',
          bottom: '20',
          right: '110',
          left: '60',
        },
        legend: {
          show: true,
          selectedMode: 'multiple', // 設定顯示單一圖例的圖形，點選可切換
          right: 80,
          textStyle: {
            color: '#666',
            fontSize: 12,
          },
          itemGap: 20,
          data: ['2019-2022', '2019-2021', '2019-2020', 'line'],
          inactiveColor: '#ccc',
        },
        xAxis: [
          {
            type: 'category',
            data: [
              '1',
              '2',
              '3',
              '4',
              '5',
              '6',
              '7',
              '8',
              '9',
              '10',
              '11',
              '12',
            ],
            axisPointer: {
              type: 'shadow',
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
            name: '(%)',
            min: 30,
            max: 100,
            show: true,
            interval: 10,
            //             axisLabel: {
            //   formatter: '{value} %',
            // },
          },
          {
            type: 'value',
            name: '(%)',
            min: 0,
            max: 3.5,
            interval: 0.5,
            // axisLabel: {
            //   formatter: '{value} %',
            // },
          },
        ],

        // 每個裝置分數量、概率2個指標，只要讓他們的name一致，即可通過，legeng進行統一的切換
        color: colorPalette,

        series: [
          // 2022-2021
          {
            name: '2019-2022',
            type: 'bar',
            data: [32, 55, 37, 46, 50, 33, 38, 57, 54, 48, 42, 36],
            // barWidth: '50%',
          },

          {
            name: '2019-2021',
            type: 'bar',
            data: [32, 31, 57, 42, 34, 55, 46, 43, 35, 60, 41, 49],
            // barWidth: '50%',
          },

          {
            name: '2019-2020',
            type: 'bar',
            data: [52, 46, 45, 58, 43, 60, 41, 59, 39, 47, 32, 31],
            // barWidth: '50%',
          },


          {
            name: 'line',
            type: 'line',
            yAxisIndex: 0, // 這裡要設定哪個y軸，預設是最左邊的是0，然後1，2順序來。
            data: [85, 92, 74, 63, 97, 100, 99, 73, 72, 70, 60, 71],
            symbolSize: 10,
            itemStyle: {
              normal: {
                color: '#37484C',
              },
            },
          },

        ],
      }

      // -------------------------------------------------------------

      option && myChart.setOption(option)
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
