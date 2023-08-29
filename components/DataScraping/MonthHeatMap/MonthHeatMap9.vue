<template>
  <!-- <div id="month-heat-map1" style="height: 200px; width: 220px"></div> -->
  <div ref="monthHeatMap9" style="height: 200px; width: 220px"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'HeatMap',

  data() {
    return {}
  },
  mounted() {
    this.drawBar()
  },
  methods: {
    drawBar() {
      const chartDom = this.$refs.monthHeatMap9
      const myChart = echarts.init(chartDom) // echarts初始化
      // const myChart = echarts.init(this.$refs.month-heat-map1); // echarts初始化

      const colorPalette = ['#37484C', '#9aa2a4', '#d8dddd', '#E6E8E9']
      var option

      // 選擇圖表樣式------------------------------------------
      function getVirtulData(year) {
        year = year || '2017'
        var date = +echarts.number.parseDate(year + '-01-01')
        var end = +echarts.number.parseDate(+year + 1 + '-01-01')
        var dayTime = 3600 * 24 * 1000
        var data = []
        for (var time = date; time < end; time += dayTime) {
          data.push([
            echarts.format.formatTime('yyyy-MM-dd', time),
            Math.floor(Math.random() * 800),
          ])
        }
        return data
      }

      option = {
        color: colorPalette,

        tooltip: {
          position(pos, params, el, elRect, size) {
            var obj = [10, pos[1] - size.contentSize[1]]
            // if (pos[0] < size.viewSize[0] / 2) {
            //   obj[0] = pos[0] + 20
            // } else {
            //   obj[0] = pos[0] - (size.contentSize[0] + 20)
            // }
            // if (pos[1] < size.viewSize[1] * 0.7) {
            //   obj[1] = pos[1] - size.contentSize[1] / 6
            // } else {
            //   obj[1] = pos[1] - size.contentSize[1] / 1.5
            // }

            return obj
          },
          formatter(p) {
            var format = echarts.format.formatTime('yyyy-MM-dd', p.data[0])
            var div = `<div>`
            var dataw = p.data[1]
            if (dataw <= 200) {
              div = '<div>' + format + ': ' + p.data[1] + '<br />良好-資料丟失率<2.5% (單日) </div>'
            } else if (dataw > 200 && dataw <= 400) {
              div = '<div>' + format + ': ' + p.data[1] + '<br />些微異常-資料丟失率<5% (單日) </div>'
            } else if (dataw > 400 && dataw <= 600) {
              div = '<div>' + format + ': ' + p.data[1] + '<br />些微異常-資料丟失率<5% (單日) </div>'
            } else {
              div = '<div>' + format + ': ' + p.data[1] + '<br />異常-資料丟失率<10% (單日)  </div>'
            }
            console.log(div);
            return div
          },
        },
        visualMap: {
          top: '30px',
          min: 0,
          max: 1000,
          calculable: true,
          orient: 'vertical',
          left: '2660',
          inRange: {
            color: ['#37484C', '#9aa2a4', '#d8dddd', '#E6E8E9'],
          },
        },
        calendar: [
          {
            top: '70px',
            // yearLabel: { show: false },
            orient: 'vertical',
            range: '2022/1',
            splitLine: {
              lineStyle: {
                color: '#fff',
              },
            },
          },
        ],
        series: [
          {
            type: 'heatmap',
            coordinateSystem: 'calendar',
            calendarIndex: 0,
            data: getVirtulData('2022'),
            itemStyle: {
              borderColor: '#fff',
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

<style></style>
