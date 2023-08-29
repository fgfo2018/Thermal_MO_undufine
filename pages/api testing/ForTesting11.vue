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
    key: [],
    output: [],
  }),
  watch: {
    time(data) {
      // console.log(JSON.parse(JSON.stringify(data)))
      var keys = this.key
      keys.forEach((index) => {
        console.log(index)
      })
      console.log(this.key)
      this.test4(data, '0')
    },
  },
  mounted() {
    // 初始化
    this.test3()
    this.test4()
    var delayTime = 0 // 設定緩衝時間(給後端的)，避免後端還未記錄，我們就先要資料了
    var falsetime = new Date() // 正式上線請註解
    var intervalData = setInterval(() => {
      falsetime.setMilliseconds(falsetime.getMilliseconds() + 1)
      var getTime = new Date(falsetime) // 正式上線請將falsetime 拿掉
      getTime.setSeconds(getTime.getSeconds() - delayTime)
      var crrtime = new Date(getTime)
      var start =
        crrtime.getFullYear() +
        '-' +
        ('0' + (crrtime.getMonth() + 1)).slice(-2) +
        '-' +
        ('0' + crrtime.getDate()).slice(-2) +
        ' ' +
        ('0' + crrtime.getHours()).slice(-2) +
        ':' +
        ('0' + crrtime.getMinutes()).slice(-2) +
        ':' +
        ('0' + crrtime.getSeconds()).slice(-2)
         +
        ':' +
        ('0' + crrtime.getMilliseconds()).slice(-3)

      var stop = crrtime.setSeconds(crrtime.getSeconds() + 1)
      stop = new Date(stop)
      stop =
        stop.getFullYear() +
        '-' +
        ('0' + (stop.getMonth() + 1)).slice(-2) +
        '-' +
        ('0' + stop.getDate()).slice(-2) +
        ' ' +
        ('0' + stop.getHours()).slice(-2) +
        ':' +
        ('0' + stop.getMinutes()).slice(-2) +
        ':' +
        ('0' + stop.getSeconds()).slice(-2)
         +
        ':' +
        ('0' + stop.getMilliseconds()).slice(-3)
      this.getData(start, stop)
    }, 1000)
    console.log(intervalData)
    // 計時載入新資料(5sec/5value)
  },
  methods: {
    // axios
    getData(DataStartTime, DataEndTime) {
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
      })
        .then((events) => {
          var arr = events.data[0]
          var thisTime = this.time
          var time = arr.time
          var timeleg = thisTime.length // 保存目前時間長度(如果有增加物件，前方需要補齊key)
          thisTime.push(time[0])
          delete arr.time
          var data = arr
          Object.keys(data).forEach((key) => {
            var ar = this.key[key]
            if (ar !== undefined) {
              console.log('ok')
            } else {
              this.key[key] = []
              for (var i = 0; i < timeleg; i++) {
                this.key[key].push(null)
              }
            }
          })
          var arr01 = this.key
          Object.keys(arr01).forEach((key) => {
            if (data[key] !== undefined) {
              this.key[key].push(data[key][0])
            } else {
              this.key[key].push(null)
            }
          })
        })
        .catch((err) => {
          console.log(err)
        })
    },

    test4(time, data) {
      const chartDom = this.$refs.lineChart
      const myChart = echarts.init(chartDom)
      var arr01 = this.key
      var output = []
      Object.keys(arr01).forEach((key1) => {
        console.log(key1)
        output.push({
          type: 'line',
          name: key1,
          data: arr01[key1],
        })
      })
      myChart.setOption({
        xAxis: [
          {
            data: time,
          },
        ],
        series: output,
      })
    },

    // 初始化
    test3() {
      // const DataStartTime = '2022-06-01 00:00:00'
      // const DataEndTime = '2022-06-01 00:59:59'
      // var DataStartDay = new Date(DataStartTime)
      // DataStartDay =
      //   DataStartDay.getFullYear() +
      //   '-' +
      //   (DataStartDay.getMonth() + 1) +
      //   '-' +
      //   DataStartDay.getDate()
      // var DataEndDay = new Date(DataEndTime)
      // DataEndDay.setDate(DataEndDay.getDate() + 1)
      // DataEndDay =
      //   DataEndDay.getFullYear() +
      //   '-' +
      //   (DataEndDay.getMonth() + 1) +
      //   '-' +
      //   DataEndDay.getDate()
      // console.log(DataStartDay, DataEndDay)

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
          data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '30%'],
        },
        series: [],
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
