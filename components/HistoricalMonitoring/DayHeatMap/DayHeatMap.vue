<template>
  <div ref="heatMap2" id="heatMap2_for_this" style="height: 185px; width: 880px"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'HeatMap2',

  data() {
    return {}
  },
  mounted() {
    this.drawBar()
  },
  methods: {
    clickHeatMap(data) {
      this.$emit('clickHeatMap1', data)
    },
    drawBar() {
      var chartDom = this.$refs.heatMap2
      var myChart = echarts.init(chartDom) // echarts初始化
      // const colorPalette = ['#37484C', '#E6E8E9']
      var option

      // 選擇圖表樣式------------------------------------------

      // prettier-ignore
      var hours = [
        '0', '1', '2', '3', '4', '5', '6',
        '7', '8', '9', '10', '11',
        '12', '13', '14', '15', '16', '17',
        '18', '19', '20', '21', '22', '23'
      ];
      // prettier-ignore
      var mins = [
        '0', '10', '20', '30',
        '40', '50',
      ];
      // for (var i = 0; i < 6; i++) {
      //   for (var j = 0; j < 23; j++) {
      //     console.log('123')
      //   }
      // }
      // prettier-ignore
      option = {
        // color: colorPalette,
        tooltip: {
          position: 'top',
          formatter(params) {
            var data = params.data
            var res = '<div>'
            res += `超溫次數${data[2]}筆<hr />${data[0]}:${(data[1] * 10)}~${data[0]}:${(data[1] * 10) + 9}`
            res += '</div>'
            return res
          },
          // trigger: 'item',
        },
        grid: {
          height: '75%',
          // right: 'center',
          bottom: '50px',
          left: '30px',
          top: '28px',
          width: '750px',
        },
        xAxis: {
          type: 'category',
          name: '(hr)',
          data: hours,
          splitArea: {
            show: true,
          },
        },
        yAxis: {
          name: '(min)',
          type: 'category',
          data: mins,
          splitArea: {
            show: true,
            position: 'absoiute',
          },
        },
        mytextStyle: {
          fontSize: 9,
        },
        visualMap: {
          min: 0,
          max: 2,
          calculable: true,
          orient: 'vertical',
          left: '1500',
          top: 'center',
          inRange: {
            color: ['#f1f3f4', '#E6E8E9', '#9aa2a4', '#37484C'],
          },
          itemStyle: {
            borderColor: '#808b8e',
          },
          show: false,
        },

        series: [
          {
            name: '',
            type: 'heatmap',
            label: {
              show: true,
              textStyle: {
                // fontFamily: 'Arial, Verdana, sans...',
                fontFamily: 'Arial',
                fontSize: '9',
                // fontStyle: 'normal',
                // color: '#505f62',
              },

            },
            itemStyle: {
              borderWidth: 0.1,
              borderColor: '#808b8e',
            },

            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                // shadowColor: 'rgba(0, 0, 0, 0.5)',
                borderColor: '#fff',
              },
            },
          },
        ],
      }

      // -------------------------------------------------------------
      option && myChart.setOption(option)
      var tmp = [0, 0]
      var lock = 0
      myChart.on('click', (data1) => {
        // console.log(data)
        var data = data1
        data.lock = false
        myChart.dispatchAction({
          type: 'highlight',
          seriesIndex: data.seriesIndex,
          dataIndex: data.dataIndex
        })
        if (tmp[0] !== data.seriesIndex && tmp[1] !== data.dataIndex) {
          lock = true
        }
        this.$emit('clickHeatMap1', data)
        if (lock % 2 === 0) {
          myChart.dispatchAction({
            type: 'downplay',
            seriesIndex: tmp[0],
            dataIndex: tmp[1]
          });
          if (tmp[0] === data.seriesIndex && tmp[1] === data.dataIndex) {
            // console.log('解除')
            data.lock = true
            this.$emit('clickHeatMap1', data)
          }
        }
        // if (!lock) {
        //   lock = true
        // }
        if (tmp[0] === data.seriesIndex && tmp[1] === data.dataIndex) {
          // console.log('解除')
          lock++
        }else{
          lock = 0
        }
        tmp = [data.seriesIndex, data.dataIndex]
      })
      // setTimeout(() => {
      //   myChart.dispatchAction({
      //     type: 'highlight',
      //     seriesIndex: 0,
      //     dataIndex: [1,10]
      //   });
      // }, 5000)
      chartDom = null
      // myChart = null
      hours = null
      mins = null
      option = null
    },
  },
  beforeDestroy() {
    const chartDom = this.$refs.heatMap2
    var chart = echarts.getInstanceByDom(chartDom)
    if (chart !== undefined) {
      // console.log("test", chart);
      chart.dispose()
    }
  }
}
// let myChart = echarts.init(document.getElementById('charts'));
</script>

<style></style>
