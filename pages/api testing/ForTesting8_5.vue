<template>
  <div>
    <!-- <div id="my" style="width: 80%; height: 600px"></div> -->
    <!-- <v-btn id="start" @click="test3()">開始</v-btn> -->
    <div ref="lineChart" style="width: 80%; height: 600px"></div>
  </div>
</template>
<script>
import * as echarts from 'echarts'
import axios from 'axios'
export default {
  name: 'HistoricalMonitoringPage',
  data: () => ({
    // 定義
    // 時間
    time: [],
    // Curve
    arr: {
      F1: [],
      F2: [],
      F3: [],
      F4: [],
      F5: [],
    },
  }),
  mounted() {
    // 初始化
    this.test3()

    // 計時載入新資料(1sec/1value)
    var init = 0
    var tmp = 5
    var start = setInterval(() => {
      this.getData(init, tmp)
      init = tmp + 1
      tmp = tmp + 1
    }, 1000)
    console.log(start)

    // 計時載入新資料(5sec/5value)
    // var init = 0
    // var tmp = 5
    // var start = setInterval(() => {
    //   this.getData(init, tmp)
    //   init = tmp + 1
    //   tmp = tmp + 5
    // }, 5000)
    // console.log(start)
  },
  methods: {
    // axios
    getData(start, stop) {
      // console.log(start, stop)
      axios({
        method: 'get',
        url: 'http://localhost:8080/finalchartgo',
        // url: 'http://127.0.0.1:5000/api/alarm/max',

        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          start,
          stop,
        },
      }).then((params) => {
        var F1 = params.data[0].spot1
        var F2 = params.data[0].spot2
        var F3 = params.data[0].spot3
        var F4 = params.data[0].spot4
        var F5 = params.data[0].spot5
        var time = params.data[0].time
        F1.forEach((index) => {
          var arr = this.arr.F1
          arr.push(index)
          // console.log(index)
        })
        F2.forEach((index) => {
          var arr = this.arr.F2
          arr.push(index)
          // console.log(index)
        })
        F3.forEach((index) => {
          var arr = this.arr.F3
          arr.push(index)
          // console.log(index)
        })
        F4.forEach((index) => {
          var arr = this.arr.F4
          arr.push(index)
          // console.log(index)
        })
        F5.forEach((index) => {
          var arr = this.arr.F5
          arr.push(index)
          // console.log(index)
        })
        time.forEach((index) => {
          var time = this.time
          time.push(index)
          // console.log(index)
        })
        this.test4()
      })
    },
    //
    test4() {
      // var start = setInterval(() => {
      // var init = 0
      // var tmp = 5
      //   this.getData(init, tmp)
      //   init = tmp + 1
      //   tmp = tmp + 5
      // }, 5000)
      // console.log(start)
      // ECHART初始化
      // var chartDom = document.getElementById('my')
      // var myChart = echarts.init(chartDom)
      // 可重複使用之ECHART初始化
      const chartDom = this.$refs.lineChart
      const myChart = echarts.init(chartDom)

      myChart.setOption({
        xAxis: {
          // data: this.data,
          data: this.time,
        },
        series: [
          {
            name: 'spot1',
            data: this.arr.F1,
          },
          {
            name: 'spot2',
            data: this.arr.F2,
          },
          {
            name: 'spot3',
            data: this.arr.F3,
          },
          {
            name: 'spot4',
            data: this.arr.F4,
          },
          {
            name: 'spot5',
            data: this.arr.F5,
          },
        ],
      })
    },

    // 初始化
    test3() {
      // ECHART初始化
      // var chartDom = document.getElementById('my')
      // var myChart = echarts.init(chartDom)
      // var option

      // 可重複使用之ECHART初始化
      const chartDom = this.$refs.lineChart
      const myChart = echarts.init(chartDom)
      var option

      option = {
        tooltip: {
          trigger: 'axis',
        },
        dataZoom: [
          // 数据滑块设置
          {
            type: 'slider', // 数据滑块
            start: 0, // 起始0
            end: 100, // 终止100
            minSpan: 8,
            bottom: '0%',
            dataBackground: {
              lineStyle: {
                color: '#F0F2F5',
              },
              areaStyle: {
                color: '#F0F2F5',
                opacity: 1,
              },
            },
            fillerColor: 'rgba(255,255,255,.6)',
          },
          {
            type: 'inside', // 使鼠标在图表中时滚轮可用
          },
        ],
        xAxis: {
          type: 'category',
          boundaryGap: false,
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '30%'],
        },
        series: [
          {
            name: 'spot1',
            type: 'line',
            symbol: 'none',
          },
          {
            name: 'spot2',
            type: 'line',
            symbol: 'none',
          },
          {
            name: 'spot3',
            type: 'line',
            symbol: 'none',
          },
          {
            name: 'spot4',
            type: 'line',
            symbol: 'none',
          },
          {
            name: 'spot5',
            type: 'line',
            symbol: 'none',
          },
        ],
      }
      option && myChart.setOption(option)
    },
  },
}
</script>
<style scoped>
#asdferg {
  width: 300px;
  height: 300px;
}
</style>
