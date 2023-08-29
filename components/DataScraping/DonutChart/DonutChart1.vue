<template>
  <div ref="donutChart1" style="height: 335px; width: 400px"></div>
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
      const chartDom = this.$refs.donutChart1
      const myChart = echarts.init(chartDom) // echarts初始化
      const colorPalette = ['#37484C', '#9aa2a4', '#d8dddd', '#E6E8E9']
      var option

      // 選擇圖表樣式------------------------------------------

      option = {
        tooltip: {
          trigger: 'item',
        },
        legend: {
          top: '10px',
          width: '100px',
          left: 'right',
          itemWidth: 10, // 图例的宽度
          itemHeight: 10, // 图例的高度
          textStyle: {
            // 图例文字的样式
            color: '#ccc',
            fontSize: 12,
          },
        },

        series: [
          {
            name: '',
            top: '30px',
            right: "30px",
            avoidLabelOverlap: false,
            type: 'pie',
            radius: ['60%', '80%'],
            itemStyle: {
              borderRadius: 5,
              borderColor: '#fff',
              borderWidth: 5,
            },

            color: colorPalette,

            label: {
              show: true,
              position: 'center',
              // formatter(d) {
              // return d.value;
              formatter: '{d}%',
              fontSize: '30',
              backgroundColor: 'white',

            },

            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                // fontWeight: 'bold',
                backgroundColor: 'white',
                 borderColor: '#fff',
                 borderWidth: 5,
              },
            },
            labelLine: {
              show: true,
            },
            data: [
              { name: '異常筆數', value: 2 },
              { name: '些微異常筆數', value: 3 },
              { name: '良好總筆數', value: 100 },
            ],
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

<style></style>
