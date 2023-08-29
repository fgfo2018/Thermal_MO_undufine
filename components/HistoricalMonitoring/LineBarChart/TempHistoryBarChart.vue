<template>
  <v-row :column="$vuetify.breakpoint.mdAndDown">
    <date-picker v-model="dates" type="date" :disabled="disabled" range placeholder="請選擇日期" value-type="format"
      format="YYYY-MM-DD" style="
        font-size: 12px;
        margin-left: 145px;
        margin-top: 10px;
        position: absolute;
        z-index: 4;
        width: 202px;
      " :disabled-date="notBeforeTodayTwelveOClock" @change="dateRange"></date-picker>

    <v-col cols="12" lg="12" style="border: 1px solid rgba(0, 0, 0, 0)">
      <div>
        <div ref="lineBarChart" id="lineBarChart001" style="height: 335px; width: 1050px"></div>
        <v-progress-linear v-model="valueDeterminate" :active="show" color="indigo darken-2"
          style="width: 975px"></v-progress-linear>
        <v-row>
          <v-col cols="11">
            <div style="margin: 12px 0px 0px 0px">
              {{ loadingname }}
            </div>
          </v-col>
          <!-- <v-col cols="1" class=""><v-btn @click="stopRes" color="error" :loading="loading" :disabled="loading"
              :class="btushow" style="margin: 5px 0px 0px 12px">中斷</v-btn></v-col> -->
        </v-row>
        <div id="echart-loading-cover" class="d-none"></div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import * as echarts from 'echarts'
import axios from 'axios'
export default {
  data: () => ({
    url: 'http://127.0.0.1:5002/api/normal',
    url1: 'http://127.0.0.1:5002/api/change/roi',
    loadingname: '',
    loading: false,
    disabled: true,
    // dates: ['2022-06-01', '2022-06-01'],
    dates: ['', ''],
    controller: null, // axios 辨識ID
    output: [],
    date: [],
    outputLast: {},
    loadingnumber: 0,
    activePicker: null,
    Currently: 0, // 紀錄目前進度
    datalist: null,
    downloadTime: null,
    timeleft: null,
    intervalTime: null,
    // 進度計算
    valueDeterminate: 0,
    show: true,
    totledata: 0,
    finish: 0,
    percentage: 0,
    sum: 0,
    errorM: '',
    // 最低溫度
    minOutput: [],
    minoutputLast: [],
    // 平均溫度
    avgOutput: [],
    avgoutputLast: [],
    messageDate: null,
    btushow: 'btudis',
    ws4: null,
    PeakHoursStatisticsBarChartdata: [],
    sethighlineColorName: '',
    wsListener1: {
      close: null,
      message: null
    },
    category: {},
  }),
  computed: {
    dateRangeText() {
      var datess = this.dates
      datess = datess.sort()
      return datess.join(' ~ ')
    },
  },
  mounted() {
    // setInterval(() => {

    //   console.log("tessssss", seriesNames);
    // }, 5000)
    // 上線要解除這邊的註解
    this.dates = [
      new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
    ]
    this.$emit('selectdata', this.dates.join(' ~ '))
    // this.dates = [ '2023-04-01' ,'2023-05-01']
    this.myChartinit()
    // this.drawBar(this.dates)
    // this.getAPI(this.dates[0])
    var openwebsocket03 = () => {
      if (this.$myPlugin.webSocketconnect01().readyState === 1) {
        this.ws4 = this.$myPlugin.webSocketconnect03()
        this.getData()
        var messageEvent = (e) => {
          var event = JSON.parse(e.data)
          // console.log(event);
          // var newObj = parseValues(event);
          // var newArr = processArray(event);
          // console.log(event);

          if (event.type === 'PeakHoursStatisticsBarChart') {
            this.loadingname = '資料處理中...'
            this.valueDeterminate = 70
            var output = this.output
            var minOutput = this.minOutput
            var avgOutput = this.avgOutput
            var data = event.data.normal
            // group 處理
            var groupOutput = {}
            var category = event.data.category
            this.categoryData = category
            Object.keys(category).forEach((key) => {
              groupOutput[category[key].type] = []
            })
            Object.keys(category).forEach((key) => {
              var find = groupOutput[category[key].type].find((item) => item === category[key].group)
              if (find === undefined) {
                // console.log("object", find);
                groupOutput[category[key].type].push(category[key].group)
              }
            })
            // Object.keys(category).forEach((key) => {
            //   groupOutput[key] = []
            // })
            console.log("output", groupOutput);
            this.$store.dispatch('myData/incrementAsync', { type: 'HistoricalGroupSet', params: groupOutput });
            groupOutput = null
            category = null
            // group 處理 end
            // console.log(data);
            data = getdata(data)
            output.push(data.max)
            minOutput.push(data.min)
            avgOutput.push(data.avg)
            output.sort(function (a, b) {
              if (a.time[0] > b.time[0]) {
                return 1 // 正數時，後面的數放在前面
              } else {
                return -1 // 負數時，前面的數放在前面
              }
            })
            minOutput.sort(function (a, b) {
              if (a.time[0] > b.time[0]) {
                return 1 // 正數時，後面的數放在前面
              } else {
                return -1 // 負數時，前面的數放在前面
              }
            })
            avgOutput.sort(function (a, b) {
              if (a.time[0] > b.time[0]) {
                return 1 // 正數時，後面的數放在前面
              } else {
                return -1 // 負數時，前面的數放在前面
              }
            })
            output[0].PeakHoursStatisticsBarChart = event.data.PeakHoursStatisticsBarChart
            this.output = output
            this.minOutput = minOutput
            this.avgOutput = avgOutput
            output = null
            minOutput = null
            avgOutput = null
            data = null
            // -------loading data-------
            // const parentNode1 = document.querySelector('.my-' + day)
            // parentNode1.style.display = 'none'
            // this.finish = this.finish + 1
          }
          function getdata(params) {
            var time = params.time
            var max = params.max
            var min = params.min
            var avg = params.avg
            var dataMax = currentData(time, max)
            var dataMin = currentData(time, min)
            var dataAvg = currentData(time, avg)
            var arr = {
              max: {
                time: dataMax.time,
                max: dataMax.data,
              },
              min: {
                time: dataMin.time,
                min: dataMin.data,
              },
              avg: {
                time: dataAvg.time,
                avg: dataAvg.data,
              },
            }
            // var avgKey = []
            // 列出time的時間
            time = null
            max = null
            min = null
            avg = null
            dataMax = null
            dataMin = null
            dataAvg = null
            return arr
          }
          function currentData(time, data) {
            var timeKey = []
            time.forEach((index, value) => {
              timeKey.push(index)
            })
            var arr = {
              time: [],
              data: [],
            }
            Object.keys(data).forEach((key) => {
              arr.data[key] = []
            })
            for (const i in timeKey) {
              var st = false
              // 判斷物件全部皆為空
              Object.keys(data).forEach((keys) => {
                var tp = data[keys][i]
                if (tp != null) {
                  st = true
                }
                tp = null
              })
              // 將數值塞入物件
              Object.keys(data).forEach((keys) => {
                var tp = data[keys][i]
                if (st) {
                  arr.data[keys].push(tp)
                }
                tp = null
              })
              if (st) {
                arr.time.push(timeKey[i])
              }
              st = null
            }
            timeKey = null
            return arr
          }
          // this.changPoint(event.data.normal)
          event = null
        }
        this.ws4.addEventListener("message", messageEvent)
        this.wsListener1.message = messageEvent
      }
    }
    openwebsocket03()
    // this.ws4 = new WebSocket('ws://127.0.0.1:8703')
    // this.ws4.onopen = (e) => {
    //   console.log('open websocket4');
    //   this.getData()
    // }
    // this.ws4.onclose = (e) => {
    //   console.log('close websocket4');
    // }
    // // 定義一個遞迴函數來處理陣列中的每個值
    //   function parseValues(obj) {
    //     // 遍歷物件中的每個屬性
    //     for (var key in obj) {
    //       // 取得屬性的值
    //       var value = obj[key];
    //       // 判斷值的類型
    //       if (typeof value === 'string') {
    //         // 檢查值是否包含非數字的字符，如果是，則跳過解析
    //         if (/\D/.test(value)) {
    //           continue;
    //         }
    //         // 如果不是，則將逗號替換為小數點
    //         value = value.replace(/,/, '.');
    //         // 解析值為浮點數
    //         var floatValue = parseFloat(value);
    //         // 檢查是否是NaN，如果是，則轉換為null
    //         if (isNaN(floatValue)) {
    //           floatValue = null;
    //         }
    //         // 將轉換後的值存回物件
    //         obj[key] = floatValue;
    //       } else if (typeof value === 'object') {
    //         // 如果是物件，則繼續遞迴處理其屬性
    //         parseValues(value);
    //       }
    //     }
    //   }
    // this.ws4.onmessage = (e) => {}
  },
  watch: {
    '$store.state.myData.params.tooltipFocus': {
      handler(newValue) {
        var arr1 = [{
          group_name: undefined,
          group_id: undefined
        }]
        arr1[0].group_name = newValue.groupName
        if (newValue.groupId === undefined) {
          arr1[0].group_id = ""
        } else {
          arr1[0].group_id = newValue.groupId
        }
        // console.log(arr1[0]);
        this.$store.dispatch('myData/incrementAsync', { type: 'Locked', params: arr1 });
        arr1 = null
        var fr = {}
        Object.keys(this.categoryData).forEach((key) => {
          if (this.categoryData[key].type === newValue.groupName) {
            fr[key] = this.categoryData[key]
          }
        })
        var out = {}
        if (newValue.groupId !== undefined) {
          // fr.filter
          Object.keys(fr).forEach((key) => {
            if (fr[key].group === newValue.groupId) {
              out[key] = this.categoryData[key]
            }
          })
        } else {
          out = fr
        }
        // console.log("objectx", out);
        var c = this.$refs.lineBarChart
        var chart1 = echarts.getInstanceByDom(c)
        var currentOption = chart1.getOption();
        var calendarLow = document.getElementById('lineLowChart')
        var myChartLow = echarts.getInstanceByDom(calendarLow)
        var calendarAvg = document.getElementById('lineAvgChart')
        var myChartAvg = echarts.getInstanceByDom(calendarAvg)
        var peakChat1 = document.getElementById('peakChat')
        var peakChat2 = echarts.getInstanceByDom(peakChat1)
        // 提取物件名称示例：获取系列(series)名称
        var seriesNames = currentOption.series.map(function (series) {
          return series;
        });
        var arr = {}
        seriesNames.forEach((item) => {
          arr[item.name] = Object.keys(out).find((item1) => item1 === item.name) !== undefined
        })
        chart1.setOption({
          legend: {
            selected: arr
          }
        })
        myChartLow.setOption({
          legend: {
            selected: arr
          }
        })
        myChartAvg.setOption({
          legend: {
            selected: arr
          }
        })
        peakChat2.setOption({
          legend: {
            selected: arr
          }
        })
      }
    },
    '$store.state.myData.params.tooltipHover': {
      handler(newValue) {
        // console.log("x", newValue);
      }
    },
    sethighlineColorName(data) {
      // console.log(data);
      var calendarLow = document.getElementById('lineLowChart')
      var myChartLow = echarts.getInstanceByDom(calendarLow)
      var calendarAvg = document.getElementById('lineAvgChart')
      var myChartAvg = echarts.getInstanceByDom(calendarAvg)
      var eq = [myChartLow, myChartAvg]
      for (var el = 0; el < 2; el++) {
        var arr = []
        // console.log(event.seriesName);
        var option = eq[el].getOption();
        var series = option.series
        var serieslen = option.series.length
        for (var i = 0; i < serieslen; i++) {
          if (series[i].name === data) {
            series[i].color = "#37484C"
            series[i].z = 2
          } else {
            series[i].color = "#d8dddd"
            series[i].z = 0
          }
          arr.push(series[i])
        }
        eq[el].setOption(
          {
            series: arr
          }
        )
        arr = null
        option = null
        series = null
        serieslen = null
      }
      calendarLow = null
      myChartLow = null
      calendarAvg = null
      myChartAvg = null
      eq = null
    },
    // 第一段觸發
    output(data1) {
      // console.log(data1);
      // console.log(data1.length)
      if (data1.length > 0) {
        var data = data1
        var arr = {}
        // 處理time key
        data.forEach((index) => {
          Object.keys(index).forEach((key) => {
            arr[key] = []
          })
        })
        // 處理max key
        data.forEach((index) => {
          Object.keys(index.max).forEach((key) => {
            arr.max[key] = []
          })
        })
        // 處理資料
        data.forEach((index) => {
          index.time.forEach((time) => {
            arr.time.push(time)
          })
        })
        // 在指定時間中塞入value
        Object.keys(arr.max).forEach((key) => {
          data.forEach((index) => {
            var ae = index.max[key]
            if (ae !== undefined) {
              ae.forEach((value) => {
                arr.max[key].push(value)
              })
            } else {
              var nulltime = index.time
              nulltime.forEach(() => {
                arr.max[key].push(null)
              })
              nulltime = null
            }
            ae = null
          })
        })
        arr.PeakHoursStatisticsBarChart = data1[0].PeakHoursStatisticsBarChart
        this.PeakHoursStatisticsBarChartdata = data1[0].PeakHoursStatisticsBarChart
        // console.log("213d" , arr);
        this.outputLast = arr
        data = null
        arr = null
      }
    },
    // 被output觸發
    outputLast(data) {
      // console.log("123",data)
      // 將處理好的數據丟給echarts
      if (JSON.parse(JSON.stringify(data)).time.length > 0) {
        this.echartsCrr(data)
      }
      if (this.valueDeterminate >= 20) {
        this.changPoint(data)
      }
      // console.log(JSON.parse(JSON.stringify(data)).time.length)
    },
    // 第一段觸發
    minOutput(data1) {
      if (data1.length > 0) {
        // 處理time key
        var data = data1
        var arr = {}
        data.forEach((index) => {
          Object.keys(index).forEach((key) => {
            arr[key] = []
          })
        })
        // 處理max key
        data.forEach((index) => {
          Object.keys(index.min).forEach((key) => {
            arr.min[key] = []
          })
        })
        // 處理資料
        data.forEach((index) => {
          index.time.forEach((time) => {
            arr.time.push(time)
          })
        })
        // 在指定時間中塞入value
        Object.keys(arr.min).forEach((key) => {
          data.forEach((index) => {
            var ae = index.min[key]
            if (ae !== undefined) {
              ae.forEach((value) => {
                arr.min[key].push(value)
              })
            } else {
              var nulltime = index.time
              nulltime.forEach(() => {
                arr.min[key].push('null')
              })
              nulltime = null
            }
            ae = null
          })
        })
        this.minoutputLast = arr
        data = null
        arr = null
      }
    },
    minoutputLast(data) {
      if (JSON.parse(JSON.stringify(data)).time.length > 0) {
        const calendar = document.getElementById('lineLowChart')
        const myChart = echarts.getInstanceByDom(calendar)
        var data1 = JSON.parse(JSON.stringify(data))
        var time = data1.time
        var min = data.min
        var arr = []
        Object.keys(min).forEach((key) => {
          var toFixedarr = []
          var minlen = min[key].length
          for (var i = 0; i < minlen; i++) {
            if (typeof min[key][i] === 'number') {
              toFixedarr.push(min[key][i].toFixed(1))
            } else {
              toFixedarr.push(min[key][i])
            }
          }
          arr.push({
            name: key,
            data: toFixedarr,
            type: 'line',
            yAxisIndex: 0,
            symbolSize: 1,
            color: '#828C8F',
          })
          toFixedarr = null
          minlen = null
        })
        var displaytotle = time.length - 50
        myChart.setOption({
          dataZoom: [
            {
              startValue: displaytotle,
              endValue: time.length,
            },
          ],
          xAxis: {
            data: time,
          },
          series: arr,
        })
        displaytotle = null
        data1 = null
        time = null
        min = null
        arr = null
      }
    },
    // 第一段觸發
    avgOutput(data1) {
      if (data1.length > 0) {
        // 處理time key
        var data = data1
        var arr = {}
        data.forEach((index) => {
          Object.keys(index).forEach((key) => {
            arr[key] = []
          })
        })
        // 處理max key
        data.forEach((index) => {
          Object.keys(index.avg).forEach((key) => {
            arr.avg[key] = []
          })
        })
        // 處理資料
        data.forEach((index) => {
          index.time.forEach((time) => {
            arr.time.push(time)
          })
        })
        // 在指定時間中塞入value
        Object.keys(arr.avg).forEach((key) => {
          data.forEach((index) => {
            var ae = index.avg[key]
            if (ae !== undefined) {
              ae.forEach((value) => {
                arr.avg[key].push(value)
              })
            } else {
              var nulltime = index.time
              nulltime.forEach(() => {
                arr.avg[key].push(null)
              })
              nulltime = null
            }
            ae = null
          })
        })
        this.avgoutputLast = arr
        data = null
        arr = null
      }
    },
    avgoutputLast(data) {
      if (JSON.parse(JSON.stringify(data)).time.length > 0) {
        const calendar = document.getElementById('lineAvgChart')
        const myChart = echarts.getInstanceByDom(calendar)
        var data1 = JSON.parse(JSON.stringify(data))
        var time = data1.time
        var avg = data.avg
        var arr = []
        Object.keys(avg).forEach((key) => {
          var toFixedarr = []
          var avglen = avg[key].length
          for (var i = 0; i < avglen; i++) {
            if (typeof avg[key][i] === 'number') {
              toFixedarr.push(avg[key][i].toFixed(1))
            } else {
              toFixedarr.push(avg[key][i])
            }
          }
          arr.push({
            name: key,
            data: toFixedarr,
            type: 'line',
            yAxisIndex: 0,
            symbolSize: 1,
            color: '#828C8F',
          })
          toFixedarr = null
          avglen = null
        })
        var displaytotle = time.length - 50
        myChart.setOption({
          dataZoom: [
            {
              startValue: displaytotle,
              endValue: time.length,
            },
          ],
          xAxis: {
            data: time,
          },
          series: arr,
        })
        data1 = null
        time = null
        avg = null
        arr = null
      }
      // console.log(data)
    },
    PeakHoursStatisticsBarChartdata(data) {
      // console.log(data);
      const calendar = document.getElementById('peakChat')
      const myChart = echarts.getInstanceByDom(calendar)
      const colorPalette = ['#37484C', '#9aa2a4', '#d8dddd', '#E6E8E9']
      var peakKey = []
      Object.keys(data).forEach((key) => {
        peakKey.push(key)
      })
      var series = []
      var daysBetweenDates = calculateDaysBetweenDates(this.dates[0], this.dates[1]);
      var peakKeylen = peakKey.length
      var ti1 = 0
      for (var d = 0; d < daysBetweenDates; d++) {
        var arr = []
        if (ti1 > colorPalette.length - 1) {
          ti1 = 0
        }
        for (var roi = 0; roi < peakKeylen; roi++) {
          // console.log(peakKey[roi]);
          var peakdata = {
            name: peakKey[roi],
            type: 'bar',
            stack: peakKey[roi],
            itemStyle: {
              color: colorPalette[ti1]
            },
            emphasis: {
              focus: 'series'
            },
            data: []
          }
          var index = 0
          for (var h = 0; h < 24; h++) {
            var hour = ("0" + h).slice(-2)
            var start = new Date(`${this.dates[0]} ${hour}:00:00`)
            start.setDate(start.getDate() + d)
            var stop = new Date(`${this.dates[0]} ${hour}:59:59`)
            stop.setDate(stop.getDate() + d)
            // console.log(object);
            var newroiarr = data[peakKey[roi]].filter((item) => {
              var roitime = new Date(item)
              return roitime >= start && roitime < stop
            })
            // console.log(start, stop, newroiarr);
            stop = null
            index = newroiarr.length
            // peakdata.custom.push(start)
            peakdata.data.push({ value: index, start })
            start = null
            hour = null
            newroiarr = null
          }
          // console.log(peakdata);
          arr.push(peakdata)
          peakdata = null
          index = null
        }
        var arrlen = arr.length
        for (var en = 0; en < arrlen; en++) {
          series.push(arr[en])
        }
        ti1++
        arr = null
        arrlen = null
      }
      // console.log(series);
      myChart.setOption({
        series
      })
      peakKey = null
      series = null
      daysBetweenDates = null
      peakKeylen = null
      ti1 = null
      // 計算時間
      function calculateDaysBetweenDates(date1, date2) {
        // 将日期字符串转换为 Date 对象
        var d1 = new Date(date1);
        var d2 = new Date(date2);

        // 计算两个日期之间的时间差（单位为毫秒）
        var timeDiff = Math.abs(d2.getTime() - d1.getTime());

        // 将时间差转换为天数
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        d1 = null
        d2 = null
        timeDiff = null
        return diffDays + 1;
      }
    }
  },
  methods: {
    // send 資料給ws4
    getData() {
      this.loadingname = '送出資料...'
      this.valueDeterminate = 10
      this.ws4.send(JSON.stringify(
        {
          type: "PeakHoursStatisticsBarChart",
          cam_id: this.$route.query.cam,
          session: Math.random().toString(36).substr(2),
          start_date: this.dates[0] + " 00:00:00",
          stop_date: this.dates[1] + " 23:59:59"
        }
      ))
    },
    // 渲染呼叫渲染線
    changPoint(data) {
      // console.log("觸發修改", data);
      this.loadingname = '下載修改資料...'
      var time = data.time
      var timeKey = []
      var max = data.max
      var tempdata = data
      // 列出全部物件

      time.forEach((index, value) => {
        timeKey.push(index)
      })
      var output = []
      Object.keys(max).forEach((key) => {
        var data1 = []
        max[key].forEach((value) => {
          var value1 = 'N/A'
          if (value !== 'null' && value !== null) {
            // if (typeof min[key][i] === 'number') {
            value = parseFloat(value)
            value1 = value.toFixed(1)
            // }
          }
          var data2 = {
            value: value1,
            point: 0,
          }
          data1.push(data2)
          value1 = null
          // console.log(value)
        })
        // avgKey.push(key)
        output.push({
          name: key,
          type: 'line',
          yAxisIndex: 0,
          data: data1,
          symbolSize: 1,
          markLine: {
            symbol: ['none', 'none'],
            label: {
              show: false,
            },
            lineStyle: {
              width: 4,
              color: '#697A7A'
            },
            data: [],
          },
        })
        data1 = null
      })
      const chartDom = this.$refs.lineBarChart
      const myChart = echarts.init(chartDom) // echarts初始化
      var DataStartDay1 = new Date(this.dates[0])
      var DataStartDay = DataStartDay1.getFullYear()
      // 標記修改
      axios({
        method: 'post',
        url: this.url1,
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify([
          {
            // table_timeselectStart: DataStartDay,
            // table_timeselectStop: DataEndDay,
            cam_id: this.$route.query.cam,
            table_timeselectStart: DataStartDay + '-01-01',
            table_timeselectStop: DataStartDay + '-12-31',
          },
        ]),
      })
        .then((params) => {
          // console.log("my is api"); 
          this.loadingname = '下載修改資料完成，資料處理中....'
          try {
            var data = params.data
            // console.log("收到修改資料", data);
            var res = []
            data.forEach((re) => {
              res.push(re.table_change_start)
            })
            var uniqueArr = [...new Set(res)]
            uniqueArr.sort(function (a, b) {
              if (a < b) {
                return -1
              } else {
                return 1
              }
            })
            // console.log(uniqueArr)
            var time = []
            data.forEach((index, value) => {
              var dt = new Date(index.table_change_start)
              var su = 0
              timeKey.forEach((indexe, value) => {
                var nw = new Date(indexe)
                if (dt.getTime() > nw.getTime()) {
                  su = su + 1
                }
              })
              time.push({
                object: index.table_itemName,
                time: index.table_change_start,
                correspond: su,
                table_change_status: index.table_change_status,
              })
            })
            var ar = []
            time.forEach((index, value) => {
              ar[index.object] = []
            })
            time.forEach((index, value) => {
              ar[index.object].push({
                xAxis: index.correspond,
                data: index.time,
              })
            })
            var output1 = []
            Object.keys(ar).forEach((key) => {
              var are = {
                name: key,
                markLine: {
                  symbol: ['none', 'none'],
                  label: {
                    show: false,
                  },
                  lineStyle: {
                    width: 3,
                  },
                  data: ar[key],
                },
              }
              output1.push(are)
            })

            output1.forEach((index) => {
              var result = $.map(output, function (item, index) {
                return item.name
              }).indexOf(index.name)
              var data = index.markLine.data
              data.forEach((el) => {
                if (result >= 0) {
                  if (output[result].data[el.xAxis] !== undefined) {
                    // 塞入上一個修改日期
                    var result01 = uniqueArr.indexOf(el.data)
                    if (result01 !== 0) {
                      result01 = result01 - 1
                    } else if (result01 === 0) {
                      // 如果為第一個日期，則在呼叫前一年的資料，最大呼叫到前三年
                      // 這邊因為axios無法同步請求，所以改用ajax要往前的資料
                      var lastReqStatus = true
                      // var lastReqMax = 0
                      for (var i = 1; i <= 3; i++) {
                        if (lastReqStatus) {
                          var lastyear = new Date(DataStartDay1)
                          lastyear.setFullYear(lastyear.getFullYear() - i)
                          lastyear = lastyear.getFullYear()
                          const lastdata = $.ajax({
                            method: 'post',
                            url: this.url1,
                            async: false, // 關閉異步處理(主要是要這個功能才用ajax)
                            dataType: 'json',
                            contentType: 'application/json; charset=UTF-8',
                            data: JSON.stringify([
                              {
                                // table_timeselectStart: DataStartDay,
                                // table_timeselectStop: DataEndDay,
                                cam_id: this.$route.query.cam,
                                table_timeselectStart: `${lastyear}-01-01`,
                                table_timeselectStop: `${lastyear}-12-31`,
                              },
                            ]),
                          })
                          var resultdata = lastdata.responseJSON
                          if (resultdata.length > 0) {
                            result01 =
                              resultdata[resultdata.length - 1].table_change_start
                            lastReqStatus = false
                          }
                        }
                      }
                    }
                    var lasttime = null
                    if (typeof result01 === 'string') {
                      lasttime = result01
                    } else {
                      lasttime = uniqueArr[result01]
                    }

                    // console.log("last:"+lasttime,"now:"+el.data)
                    //
                    output[result].data[el.xAxis].point = {
                      now: el.data,
                      last: lasttime,
                    }
                  }
                }
              })
            })

            Object.keys(tempdata.PeakHoursStatisticsBarChart).forEach((key) => {
              if (tempdata.max[key] !== undefined && tempdata.max[key] !== null) {
                var max123 = tempdata.max[key]
                var markerPoint = {
                  symbol: 'circle',
                  symbolSize: 10,
                  itemStyle: {
                    color: 'rgb(200,0,0)'
                  },
                  data: []
                }
                var len = tempdata.PeakHoursStatisticsBarChart[key].length
                var PeakHoursData = tempdata.PeakHoursStatisticsBarChart[key]
                for (var i = 0; i < len; i++) {
                  var se = tempdata.time.findIndex((item) => item === PeakHoursData[i])
                  if (max123[se] !== null && se !== -1) {
                    markerPoint.data.push({
                      yAxis: max123[se],
                      xAxis: se
                      // name: key,
                      // xAxis: tempdata.time[se],
                      // yAxis: se,
                      // data: tempdata.time[se]
                    })
                  }
                }
                var on = output.findIndex((item) => item.name === key)
                if (on !== -1) {
                  output[on].markPoint = markerPoint
                }
              }
            })
            myChart.setOption({
              series: output,
            })
            myChart.setOption({
              series: output1,
            })
            this.valueDeterminate = 100
            setTimeout(() => {
              this.loadingname = '完成!'
              setTimeout(() => {
                this.disabled = false
                this.show = false
                this.loadingname = ''
              }, 1000)
            }, 1500)
            time = null
            timeKey = null
            max = null
            tempdata = null
            output = null
            DataStartDay1 = null
            DataStartDay = null
            data = null
            res = null
            uniqueArr = null
            time = null
            ar = null
          } catch (error) {
            console.log('修改ROI錯誤', error);
          }
        })
        .catch((err) => {
          console.log(err)
        })
      // end
    },
    // 修改日期 從新呼叫
    dateRange() {
      if (this.dates[0] !== null) {
        if (this.dates.length <= 1) {
          var arr = this.dates
          arr.push(this.dates[0])
          this.dates = arr
          arr = null
        }
        this.$emit('selectdata', this.dates.join(' ~ '))
        // console.log(this.dates)
        this.valueDeterminate = 0
        this.errorM = ''
        this.totledata = 0
        this.finish = 0
        this.show = true
        this.percentage = 0
        this.output = []
        this.minOutput = []
        this.avgOutput = []
        this.outputLast = { time: [] }
        this.disabled = true
        this.getData()
        // var input = this.dates
        // this.drawBar(input)
      }
    },
    // 初始化圖表
    myChartinit() {
      const chartDom = this.$refs.lineBarChart
      const myChart = echarts.init(chartDom) // echarts初始化
      // const colorPalette = ['#37484C', '#9aa2a4', '#d8dddd', '#E6E8E9']
      const camid = this.$route.query.cam
      var option
      // 選擇圖表樣式------------------------------------------
      option = {
        title: {
          left: '-6',
          text: '最高溫度與區間比較',
          textStyle: {
            fontFamily: 'Arial',
            fontSize: '14',
            fontWeight: '700',
            color: '#505f62',
          },
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
          // className: 'echarts-tooltip-vivew',
          // triggerOn: 'click', // 触发方式
          alwaysShowContent: false, // 鼠标离开区域不消失
          trigger: 'axis',
          position(pos, params, el, elRect, size) {
            var obj = []
            if (pos[0] < size.viewSize[0] / 2) {
              obj[0] = pos[0] + 20
            } else {
              obj[0] = pos[0] - (size.contentSize[0] + 20)
            }
            if (pos[1] < size.viewSize[1] * 0.7) {
              obj[1] = pos[1] - size.contentSize[1] / 6
            } else {
              obj[1] = pos[1] - size.contentSize[1] / 1.5
            }

            return obj
          },
          formatter(params) {
            var arr = params
            var status = false
            var record = []
            var changeTime = null
            var changeTimelast = null
            // var report = false
            arr.forEach((index, value) => {
              if (index.data.point !== 0) {
                changeTime = index.data.point.now
                changeTimelast = index.data.point.last
                record.push(index.seriesName)
                status = true
              }
            })
            var res = ''
            res += `<div>${params[0].axisValue}</div>`
            if (status) {
              res += '<div class="echarts-tooltip-Monitoring">'

              for (var h = 0; h < params.length; h++) {
                var po = false
                var changea = ''
                res += `<div class='tooltip-point' style="`
                record.forEach((index) => {
                  if (index === params[h].seriesName) {
                    po = true
                    res += `background-color: #b5666687;`
                  }
                })
                if (po) {
                  changea = '(變動)'
                }
                res += `"><span
										style="background-color:${[params[h].color]};"></span>${params[h].seriesName}:${params[h].data.value
                  }°C${changea}</div>
								`
              }

              res += `</div><hr />`
              res += '<div class="echarts-tooltip-Monitoring-point">'
              res += `
              <div class="echarts-tooltip-Monitoring-content-title">Before</div>
              <div class="echarts-tooltip-Monitoring-content-title">After</div>
              <div class="echarts-tooltip-Monitoring-content-img"><img id="history-before" src="${GetImageUrli(
                changeTimelast
              )}" />
              <div class="echarts-tooltip-Monitoring-content-img-txt">${changeTimelast}</div>
              </div>
              <div class="echarts-tooltip-Monitoring-content-img"><img id="history-after" src="${GetImageUrli(
                changeTime
              )}" />
              <div class="echarts-tooltip-Monitoring-content-img-txt">${changeTime}</div></div>`
              res += '</div>'
              res += '<div class="echarts-footer">此時段被修改的物件:'
              record.forEach((index) => {
                res += `<span>[${index}]</span> `
              })
              res += `</div>`
            } else {
              res += '<div class="echarts-tooltip-Monitoring">'
              for (var i = 0; i < params.length; i++) {
                res += `<div class='tooltip-point' style=""><span
										style="background-color:${[params[i].color]};"></span>${params[i].seriesName}:${params[i].data.value
                  }°C</div>
								`
              }
              res += `</div>`
            }
            // function ImageExist(url) {
            //   var img = new Image()
            //   img.src = url
            //   return img.height !== 0
            // }
            function GetImageUrli(url) {
              var nowtime = new Date(url)

              // var imgUrl = `http://127.0.0.1:5002/api/database/share/setting%5C${this.$route.query.cam}%5C${nowtime.getFullYear()} ${('0' + (nowtime.getMonth() + 1)).slice(-2)}%5Croisettinghistory%5Croi_setting_history_${nowtime.getFullYear() +
              //   ('0' + (nowtime.getMonth() + 1)).slice(-2) +
              //   ('0' + nowtime.getDate()).slice(-2) +
              //   '_T' +
              //   ('0' + nowtime.getHours()).slice(-2) +
              //   ('0' + nowtime.getMinutes()).slice(-2) +
              //   ('0' + nowtime.getSeconds()).slice(-2) +}.jpg`
              var imgUrl =
                'http://127.0.0.1:5002/api/database/share/setting%5Croisettinghistory%5C' + camid + '%5Croi_setting_history_' +
                nowtime.getFullYear() +
                ('0' + (nowtime.getMonth() + 1)).slice(-2) +
                ('0' + nowtime.getDate()).slice(-2) +
                '_T' +
                ('0' + nowtime.getHours()).slice(-2) +
                ('0' + nowtime.getMinutes()).slice(-2) +
                ('0' + nowtime.getSeconds()).slice(-2) +
                '.jpg'
              return imgUrl
            }
            return res
          },
        },

        grid: {
          show: false,
          // top: '50',
          top: '70',
          bottom: '25',
          right: '130',
          left: '60',
        },
        legend: {
          show: true,
          selectedMode: 'multiple', // 設定顯示單一圖例的圖形，點選可切換
          right: 80,
          width: '600px',
          type: 'scroll',
          textStyle: {
            color: '#666',
            fontSize: 9,
          },
          itemGap: 10,
          inactiveColor: '#ccc',
        },
        xAxis: [
          {
            type: 'category',
            // itemStyle:{
            // }
            // axisPointer: {
            //   type: 'shadow',
            // },

            // axisTick: {
            //   show: false,
            //   interval: 0,
            // },
          },
        ],
        dataZoom: [
          {
            type: 'inside',
            realtime: true,
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
            // scale:3
            // boundaryGap: ['20%', '20%']
            min(value) {
              return value.min - 10;
            },
            max(value) {
              return value.max + 5;
            }
            //             axisLabel: {
            //   formatter: '{value} %',
            // },
          },
          {
            type: 'value',
            name: '(%)',
            min: 0,
            max: 400,
            // interval: 0.5,
            // axisLabel: {
            //   formatter: '{value} %',
            // },
          },
        ],

        // 每個裝置分數量、概率2個指標，只要讓他們的name一致，即可通過，legeng進行統一的切換
        // color: colorPalette,

        series: [],
      }
      // -------------------------------------------------------------
      option && myChart.setOption(option)
      option = null
      myChart.on('click', (event) => {
        this.sethighlineColorName = event.seriesName
        // myChart.on('mousemove', (event) => {
        var arr = []
        // console.log(event.seriesName);
        var option = myChart.getOption();
        var series = option.series
        var serieslen = option.series.length
        for (var i = 0; i < serieslen; i++) {
          if (series[i].name === event.seriesName) {
            series[i].color = "#37484C"
            series[i].z = 2
          } else {
            series[i].color = "#d8dddd"
            series[i].z = 0
          }
          arr.push(series[i])
        }
        myChart.setOption(
          {
            series: arr
          }
        )
        arr = null
        option = null
        series = null
        serieslen = null
      })
      // var tr = true
      myChart.getZr().on('click', (event) => {
        // if (event.target !== undefined) {
        //   var id = event.target.id; // 獲取被點擊元素的 ID
        //   var option = myChart.getOption(); // 獲取圖表的配置選項
        //   console.log(id, option);
        //   // 遍歷數據系列（series）
        //   for (var i = 0; i < option.series.length; i++) {
        //     var series = option.series[i];

        //     // 檢查 series 的 ID 是否與點擊的 ID 匹配
        //     if (series.id === id) {
        //       var seriesName = series.name; // 獲取匹配的 seriesName
        //       console.log('Series Name:', seriesName);

        //       // 在這裡可以進一步處理對應的 seriesName

        //       break; // 找到匹配的 seriesName 後，結束遍歷
        //     }
        //   }
        // }
        // if (tr) {
        //   myChart.setOption({
        //     tooltip: {
        //       triggerOn: 'click', // 触发方式
        //       alwaysShowContent: true,
        //     },
        //   })
        //   tr = false
        // } else {
        //   myChart.setOption({
        //     tooltip: {
        //       triggerOn: 'mousemove', // 触发方式
        //       alwaysShowContent: false,
        //     },
        //   })
        //   tr = true
        // }
      })
    },
    // 處理資料
    echartsCrr(data) {
      var time = data.time
      var timeKey = []
      var max = data.max
      // 列出全部物件

      time.forEach((index, value) => {
        timeKey.push(index)
      })
      var output = []
      Object.keys(max).forEach((key) => {
        var data1 = []
        max[key].forEach((value) => {
          var value1 = 'N/A'
          if (value !== 'null' && value !== null) {
            // console.log(value);
            value1 = value.toFixed(1)
          }
          var data2 = {
            value: value1,
            point: 0,
          }
          data1.push(data2)
          value1 = null
          data2 = null
          // console.log(value)
        })
        // avgKey.push(key)
        output.push({
          name: key,
          type: 'line',
          yAxisIndex: 0,
          data: data1,
          symbolSize: 1,
          triggerLineEvent: true,
          // itemStyle: {
          //   normal: {
          color: '#828C8F',
          //   },
          // },
          markLine: {
            symbol: ['none', 'none'],
            label: {
              show: false,
            },
            lineStyle: {
              width: 3,
            },
            data: [],
          },
        })
        data1 = null
      })
      var totledisplay = timeKey.length - 50
      // 輸出資料給cheats
      this.dataProcessing(timeKey, totledisplay, output)
      time = null
      timeKey = null
      max = null
      output = null
      totledisplay = null
      // 輸出資料給cheats
    },
    dataProcessing(timeKey, totledisplay, output) {
      const chartDom = this.$refs.lineBarChart
      const myChart = echarts.init(chartDom) // echarts初始化
      myChart.setOption({
        dataZoom: [
          {
            startValue: totledisplay,
            endValue: timeKey.length,
          },
        ],
        xAxis: {
          data: timeKey,
        },
        series: output,
      })
    },
    notBeforeTodayTwelveOClock(date) {
      var today = new Date()
      var minday = new Date('2010-01-01')
      return date > today || date < minday
    },
    // 秒 轉 分、時、天，並且隱藏時間未到的單位
    getDuration(second) {
      var days = Math.floor(second / 86400)
      var hours = Math.floor((second % 86400) / 3600)
      var minutes = Math.floor(((second % 86400) % 3600) / 60)
      var seconds = Math.floor(((second % 86400) % 3600) % 60)
      var duration = null
      if (second < 60) {
        duration = seconds + '秒'
      } else if (second >= 60 && second < 3600) {
        duration = minutes + '分' + seconds + '秒'
      } else if (second >= 3600 && second < 86400) {
        duration = hours + '時<br />' + minutes + '分' + seconds + '秒'
      } else if (second >= 86400) {
        duration =
          days + '天' + hours + '時<br />' + minutes + '分' + seconds + '秒'
      }
      days = null
      hours = null
      minutes = null
      seconds = null
      return duration
    },
  },
  beforeDestroy() {
    if (this.wsListener1.message !== null) {
      this.ws4.removeEventListener("message", this.wsListener1.message)
      this.wsListener1.message = null
    }
    if (this.ws4 !== null) {
      // this.ws4.close()
      this.ws4 = null
    }
    if (this.intervalTime !== null) {
      clearInterval(this.intervalTime)
      this.intervalTime = null
      console.log('Destroy:intervalTime(TempHistoryChart)')
    }
    // 銷毀echarts
    var chartDom1 = this.$refs.lineBarChart
    var chart1 = echarts.getInstanceByDom(chartDom1)
    if (chart1 !== undefined) {
      chart1.dispose()
      chartDom1 = null
      chart1 = null
    }
    var calendarLow = document.getElementById('lineLowChart')
    var myChartLow = echarts.getInstanceByDom(calendarLow)
    var calendarAvg = document.getElementById('lineAvgChart')
    var myChartAvg = echarts.getInstanceByDom(calendarAvg)
    if (myChartLow !== undefined) {
      myChartLow.dispose()
      calendarLow = null
      myChartLow = null
    }
    if (myChartAvg !== undefined) {
      myChartAvg.dispose()
      calendarAvg = null
      myChartAvg = null
    }
    for (var key in this.$data) {
      // console.log("remove : " + [key]);
      this[key] = null;
    }
    this.$store.dispatch('myData/incrementAsync', { type: 'HistoricalGroupSet', params: {} });
  }
}
// let myChart = echarts.init(document.getElementById('charts'));
</script>

<style>
.mx-input {
  font-size: 13px !important;
}

.btudis {
  display: none;
}

#specialLook {
  pointer-events: all;

  border: 0;
  background-color: #37484c;
  color: #fff;
  border-radius: 10px;
  cursor: pointer;
}

.echarts-tooltip-Monitoring-content-img {
  position: relative;
}

.echarts-tooltip-Monitoring-content-img-txt {
  position: absolute;
  bottom: 9px;
  color: white;
  background-color: #00000047;
  right: 5px;
}

#specialLook:hover {
  color: #37484c;
  background-color: #fff;
  border: 2px #37484c solid;
}

.echarts-tooltip-vivew {
  width: min-content;
}

.echarts-tooltip-Monitoring-point {
  /* grid-template-columns: 250px 250px; */
  grid-template-columns: 50% 50%;
  display: grid !important;
  /* max-width: 100%; */
}

.echarts-tooltip-Monitoring-content-title {
  background-color: #efefef;
  margin: 0.4em 4px 0px 4px;
  border-radius: 2px;
}

.echarts-tooltip-Monitoring-point>div {
  padding: 0em 0.3em 0.3em 0.3em;
}

.echarts-tooltip-Monitoring-point>div img {
  max-width: 241px;
  width: 100%;
}

.echarts-tooltip-Monitoring {
  /* max-height: 300px; */
  /* max-width: 500px; */
  /* grid-template-columns: 130px 130px 130px 130px; */
  grid-template-columns: repeat(4, auto);
  display: grid !important;
}

.echarts-footer {
  margin: 0em 0.3em 0.3em 0.3em;
  padding: 0.3em;
  background-color: #efefef;
}

.tooltip-value {
  margin-bottom: 5px;
  padding: 0 12px;
  width: 100%;
  height: 24px;
  line-height: 24px;
  background: rgba(255, 255, 255, 0.425);
  border-radius: 3px;
}

.tooltip-point {
  color: #000;
  font-size: 12px;
  padding: 0 12px;
  line-height: 30px;
}

.tooltip-point>span {
  display: inline-block;
  margin-right: 3px;
  border-radius: 2px;
  width: 10px;
  height: 10px;
}

#echart-loading-cover {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  height: 26px;
  overflow: hidden;
}

.error-date {
  color: rgb(187, 0, 0);
}
</style>
