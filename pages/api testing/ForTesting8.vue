<template>
  <div>
    <!-- <div id="my" style="width: 80%; height: 600px"></div> -->
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
    output:[]
  }),
  mounted() {
    // 初始化
    this.init()
    // 呼叫
    this.getData()

    // 計時載入新資料(1sec/1value)
    // var init = 0
    // var tmp = 1
    // var start = setInterval(() => {
    //   this.getData(init, tmp)
    //   init = tmp + 1
    //   tmp = tmp + 1
    // }, 1000)
    // console.log(start)

    // 計時載入新資料(1sec/1value)
    var tmp = 1
    var start = setInterval(() => {
    this.getData(tmp)
    tmp = tmp + 1
    }, 1000)
    console.log(start)
  },
  methods: {
    // 初始化
    init() {
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
            type: 'line',
            // symbol: 'none',
          },
          {
            type: 'line',
            // symbol: 'none',
          },
          {
            type: 'line',
            // symbol: 'none',
          },
          {
            type: 'line',
            // symbol: 'none',
          },
          {
            type: 'line',
            // symbol: 'none',
          },
        ],
      }
      option && myChart.setOption(option)
    },

    // 渲染
    render() {
      // 可重複使用之ECHART初始化
      const chartDom = this.$refs.lineChart
      const myChart = echarts.init(chartDom)

      myChart.setOption({
        xAxis: [
          {
            data: this.time,
          },
        ],
        series: [
          {
            name: 'F1',
            data: this.arr.F1,
          },
          {
            name: 'F2',
            data: this.arr.F2,
          },
          {
            name: 'F3',
            data: this.arr.F3,
          },
          {
            name: 'F4',
            data: this.arr.F4,
          },
          {
            name: 'F5',
            data: this.arr.F5,
          },
        ],
      })
    },

    // 陣列 axios
    getData() {
      const DataStartTime = '2022-06-01 00:00:00'
      const DataEndTime = '2022-06-01 00:00:05'
      // 格式化開始時間
      var DataStartDay = new Date(DataStartTime)
      var month = DataStartDay.getMonth() + 1
      if (month.toString().length === 1) {
        month = '0' + month
      }
      var day = DataStartDay.getDate()
      if (day.toString().length === 1) {
        day = '0' + day
      }
      var hour = DataStartDay.getHours()
      if (hour.toString().length === 1) {
        hour = '0' + hour
      }
      var min = DataStartDay.getMinutes()
      if (min.toString().length === 1) {
        min = '0' + min
      }
      var sec = DataStartDay.getSeconds()
      if (sec.toString().length === 1) {
        sec = '0' + sec
      }

      DataStartDay =
        DataStartDay.getFullYear() +
        '-' +
        month +
        '-' +
        day +
        ' ' +
        hour +
        ':' +
        min +
        ':' +
        sec

      // 格式化結束時間
      var DataEndDay = new Date(DataEndTime)
      // set----------------------------------------------
      DataEndDay.setSeconds(DataEndDay.getSeconds() + this.tmp)
      // -------------------------------------------------
      var month2 = DataEndDay.getMonth() + 1
      if (month2.toString().length === 1) {
        month2 = '0' + month2
      }
      var day2 = DataEndDay.getDate()
      if (day2.toString().length === 1) {
        day2 = '0' + day2
      }
      var hour2 = DataEndDay.getHours()
      if (hour2.toString().length === 1) {
        hour2 = '0' + hour2
      }
      var min2 = DataEndDay.getMinutes()
      if (min2.toString().length === 1) {
        min2 = '0' + min2
      }
      var sec2 = DataEndDay.getSeconds()
      if (sec2.toString().length === 1) {
        sec2 = '0' + sec2
      }

      DataEndDay =
        DataEndDay.getFullYear() +
        '-' +
        month2 +
        '-' +
        day2 +
        ' ' +
        hour2 +
        ':' +
        min2 +
        ':' +
        sec2
      console.log(DataStartDay, DataEndDay)
      // 取得API
      axios({
        method: 'post',
        url: 'http://127.0.0.1:5000/api/alarm/max',

        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify([
          {
            table_alarm_start: DataStartTime,
            table_alarm_stop: DataEndTime,
          },
        ]),
      }).then((params) => {
        var F1 = params.data[0].line1
        var F2 = params.data[0].line2
        var F3 = params.data[0].scope1
        var F4 = params.data[0].scope2
        var F5 = params.data[0].scope3
        var time = params.data[0].time
        F1.forEach((index) => {
          var arr = this.arr.F1
          arr.push(index)
          console.log(index)
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
        this.render()
      })
    },
  },
}
</script>
