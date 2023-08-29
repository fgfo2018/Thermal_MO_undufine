<template>
  <div id="test-charts3" style="height: 120px; width: 120px"></div>
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
      const chartDom = document.getElementById('test-charts3')
      const myChart = echarts.init(chartDom) // echarts初始化
      const colorPalette = ['#37484C', '#E6E8E9']
      var option

      // 選擇圖表樣式------------------------------------------

 option = {
        tooltip: {
          trigger: 'item',
        },
        // legend: {
        //   top: '5%',
        //   left: 'center'
        // },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['50%', '90%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 5,
              borderColor: '#fff',
              borderWidth: 5,
            },

            color: colorPalette,

            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '15',
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 25, name: '超溫' },
              { value: 75, name: '正常' },
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
