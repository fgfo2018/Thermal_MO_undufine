<template>
  <v-row class="pa-0">
    <v-col cols="2" class="pa-0 ma-0">
      <h4 class="cardtitle ml-3 mt-2 pa-0" style="position: absolute">
        當月超溫次數統計
      </h4>
    </v-col>
    <v-col cols="2" class="pa-0 ma-0">
      <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date"
        transition="scale-transition" offset-y max-width="290px" min-width="auto">
        <template v-slot:activator="{ on, attrs }">
          <v-text-field v-model="date" label="" readonly v-bind="attrs" v-on="on" dense outlined
            style="font-size: 12px; position: absolute" color="#505f62" append-icon="mdi-calendar" class="mt-1">
            <!-- <v-icon slot="prepend" small dense style="line-height: 22px" v-model="date">
              mdi-calendar
            </v-icon> -->
          </v-text-field>
        </template>
        <v-date-picker v-model="date" type="month" no-title scrollable locale="zh-tw" color="#505f62">
          <v-spacer></v-spacer>
          <!-- <v-btn text color="primary" @click="menu = false"> 關閉 </v-btn> -->
          <v-btn text color="#505f62" @click="$refs.menu.save(date)">
            確定
          </v-btn>
        </v-date-picker>
      </v-menu>
    </v-col>
    <v-col cols="12" class="mt-9">
      <v-row :column="$vuetify.breakpoint.mdAndDown">
        <v-col cols="12" lg="12" style="border: 1px solid rgba(0, 0, 0, 0)" class="pt-0 py-0">
          <div class="carousel-wrapper px-16 py-0">
            <VueSlickCarousel v-bind="slickOptions" class="px-3 py-0" ref="carousel" @afterChange="onChangeCarousel">
              <div class="img-wrapper" v-for="(item, index) in month" :key="'H' + index">
                <div class="block4HidingBug"></div>
                <div :ref="item" :id="item" class="monthHeat"></div>
              </div>
              <div></div>
              <div></div>
            </VueSlickCarousel>
          </div>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import * as echarts from 'echarts'
import axios from 'axios'
export default {
  name: 'HeatMap',
  // props: ['ws4'],
  data: () => ({
    // 左上日期選單
    listyear: null,
    date: new Date().toISOString().substr(0, 7),
    menu: false,
    // 對話框
    month: [
      'jan',
      'feb',
      'mar',
      'apr',
      'may',
      'jun',
      'jul',
      'aug',
      'sep',
      'oct',
      'nov',
      'dec',
    ],
    echartsData: [],
    slickOptions: {
      slidesToShow: 3,
      arrows: true,
      infinite: false,
      centerMode: true,
      centerPadding: '0px',
      // slidesToScroll: 3,
      // centerMode: true,
      // dots: true,
      // focusOnSelect: true,
      // touchThreshold: 3,
      swipeToSlide: true,
    },
    params1: null,
  }),
  watch: {
    date(val) {
      if (this.menu === true) {
        var arr = {
          status: 'update',
          date: val,
        }
        this.drawBar(arr) // 暫時關閉
        arr = null
      }
      // const chartDom = this.$refs.jan
      // const myChart = echarts.getInstanceByDom(chartDom)
      // console.log(myChart)
    },
  },
  mounted() {
    // setInterval(()=>{
    //   console.log("test",this.echartsData);
    // },1000)
    this.drawBar('initial') // 暫時關閉

    // 熱力圖初始化
    // setTimeout(() => {
    // console.log("123", this.ws4);
    // var ws = this.ws4
    // ws.onopen = (e) => {
    //   var today = new Date()
    //   this.getData(today)
    //   today = null
    // }


    // }, 3000)
  },
  methods: {
    getData(today) {
      var year = today.getFullYear()
      today =
        today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
      var url = 'http://127.0.0.1:5002/api/alarm/list' // 宣告取得警報list網址
      // var ws = this.ws4
      // ws.send(JSON.stringify({
      //   type: "alarmList",
      //   cam_id: this.$route.query.cam,
      //   session: Math.random().toString(36).substr(2),
      //   table_timeselectStart: year + '-01-01',
      //   table_timeselectStop: year + '-12-31',
      // }))
      // ws.onmessage = (e) => {
      //   var data = JSON.parse(e.data)
      //   console.log("777", data);
      // }
      // console.log(today);
      axios({
        method: 'post',
        url,
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify([
          {
            cam_id: this.$route.query.cam,
            table_timeselectStart: year + '-01-01',
            table_timeselectStop: year + '-12-31',
          },
        ]),
      })
        .then((paramse) => {
          this.getHeatData(paramse.data, { data: [today] })
        })
        .catch((error) => console.log('error from axios', error))
      year = null
      url = null
    },
    clickDate(date, index) {
      this.$emit('selectDate', [date, index])
    },
    onChangeCarousel(event) {
      var date = this.date
      var selectedDate = new Date(date)
      var year = selectedDate.getFullYear()
      var month = ('0' + (event + 1)).slice(-2)
      this.date = year + '-' + month
      date = null
      selectedDate = null
      year = null
      month = null
      // console.log(this.date)
    },
    drawBar(index) {
      // 選擇圖表樣式------------------------------------------
      // fakeData
      var url = 'http://127.0.0.1:5002/api/alarm/list' // 宣告取得警報list網址
      if (index.status === 'update') {
        var selectedDate = new Date(index.date)
        var year = selectedDate.getFullYear()
        var month = selectedDate.getMonth()
        this.$refs.carousel.goTo(month)
        // 判斷使用者選擇日期有沒有跨年度
        if (year !== this.listyear) {
          axios({
            method: 'post',
            url,
            headers: {
              'Content-Type': 'application/json',
            },
            data: JSON.stringify([
              {
                cam_id: this.$route.query.cam,
                table_timeselectStart: year + '-01-01',
                table_timeselectStop: year + '-12-31',
              },
            ]),
          })
            .then((paramse) => {
              this.params1 = paramse
              var arr = this.month
              var data = paramse.data
              var initial = new Date(year + '-01-01 00:00:00')
              var start = null
              var last = null
              var nowYear = null
              var nowMonth = null
              var nowDay = null
              var nowtime = null
              var output = []
              var dayTotle = leapyear(year)
              for (var i = 1; i <= dayTotle; i++) {
                start = initial.setDate(initial.getDate())
                start = new Date(start)
                last = initial.setDate(initial.getDate() + 1)
                nowYear = start.getFullYear()
                nowMonth = ('0' + (start.getMonth() + 1)).slice(-2)
                nowDay = ('0' + start.getDate()).slice(-2)
                nowtime = nowYear + '-' + nowMonth + '-' + nowDay
                last = new Date(last)
                var sum = 0
                var thistime = null
                data.forEach((index) => {
                  thistime = new Date(index.table_alarm_start)
                  if (thistime >= start && thistime < last) {
                    sum = sum + 1
                  }
                })
                output.push([nowtime, nowYear, sum])
                sum = null
                thistime = null
              }
              arr.forEach((index, value) => {
                var chartDom = this.$refs[index]
                var myChart = echarts.getInstanceByDom(chartDom)
                myChart.setOption({
                  calendar: {
                    range: [nowYear + '-' + (value + 1)],
                  },
                  series: [
                    {
                      type: 'heatmap',
                      coordinateSystem: 'calendar',
                      data: output,
                    },
                  ],
                })
                chartDom = null
                myChart = null
              })
              arr = null
              data = null
              initial = null
              start = null
              last = null
              nowYear = null
              nowMonth = null
              nowDay = null
              nowtime = null
              output = null
              dayTotle = null
            })
            .catch((error) => console.log('error from axios', error))
          this.listyear = year
        }
        // 高亮今天的日期
        var currentYear = year.toString();
        var hasTimestamp = new Date() - new Date(currentYear);
        var hasDays = Math.ceil(hasTimestamp / 86400000)
        if (hasDays > 0 && hasDays <= 365) {
          this.echartsData.forEach((index) => {
            var myChart = index
            myChart.dispatchAction({
              type: 'highlight',
              seriesIndex: 0,
              dataIndex: hasDays - 1
            });
            myChart = null
          })
        }
        currentYear = null
        hasTimestamp = null
        hasDays = null
        // console.log(index)
      } else {
        var arr = this.month
        var seDate = this.date
        seDate = new Date(seDate)
        var seYear = seDate.getFullYear()
        seDate = null
        this.listyear = seYear
        // 導入警報資料
        axios({
          method: 'post',
          url,
          headers: {
            'Content-Type': 'application/json',
          },
          data: JSON.stringify([
            {
              cam_id: this.$route.query.cam,
              table_timeselectStart: seYear + '-01-01',
              table_timeselectStop: seYear + '-12-31',
            },
          ]),
        })
          .then((paramse) => {
            this.params1 = paramse
            var data = paramse.data
            var initial = new Date(seYear + '-01-01 00:00:00')
            var start = null
            var last = null
            var nowYear = null
            var nowMonth = null
            var nowDay = null
            var nowtime = null
            var output = []
            var dayTotle = leapyear(seYear)
            // var arr = []
            for (var i = 1; i <= dayTotle; i++) {
              start = initial.setDate(initial.getDate())
              start = new Date(start)
              last = initial.setDate(initial.getDate() + 1)
              nowYear = start.getFullYear()
              nowMonth = ('0' + (start.getMonth() + 1)).slice(-2)
              nowDay = ('0' + start.getDate()).slice(-2)
              nowtime = nowYear + '-' + nowMonth + '-' + nowDay
              last = new Date(last)
              var sum = 0
              var thistime = null
              data.forEach((index) => {
                thistime = new Date(index.table_alarm_start)
                if (thistime >= start && thistime < last) {
                  sum = sum + 1
                }
              })
              output.push([nowtime, nowYear, sum])
              sum = null
              thistime = null
              // console.log(nowtime)
            }
            arr.forEach((index, value) => {
              // console.log(index, value)
              var chartDom = this.$refs[index]
              var myChart = echarts.init(chartDom) // echarts初始化
              this.echartsData.push(myChart)
              var option
              option = {
                id: 1,
                tooltip: {
                  position: 'top',
                },
                visualMap: {
                  // top: '30px',
                  min: 0,
                  max: 2,
                  show: false,
                  calculable: true,
                  orient: 'vertical',
                  // left: '2660',
                  inRange: {
                    color: ['#f1f3f4', '#E6E8E9', '#9aa2a4', '#37484C'],
                  },
                },
                mytextStyle: {
                  fontSize: 9,
                },
                calendar: {
                  top: '45px',
                  //  top: '25px',
                  left: '30px',
                  // right: '23px',
                  cellSize: ['23', '23'],
                  orient: 'vertical',

                  range: [nowYear + '-' + (value + 1)],
                  itemStyle: {
                    borderWidth: 0.1,
                  },
                  yearLabel: {
                    show: false,
                    textStyle: {
                      // fontFamily: 'Arial, Verdana, sans...',
                      fontFamily: 'Arial',
                      fontSize: '14',
                      // fontStyle: 'normal',
                      color: '#505f62',
                    },
                  },
                  splitLine: {
                    lineStyle: {
                      color: '#9ba5a8',
                      borderWidth: 0.1,
                    },
                  },
                  monthLabel: {
                    nameMap: [
                      '1月',
                      '2月',
                      '3月',
                      '4月',
                      '5月',
                      '6月',
                      '7月',
                      '8月',
                      '9月',
                      '10月',
                      '11月',
                      '12月',
                    ],
                  },
                  dayLabel: {
                    nameMap: ['日', '一', '二', '三', '四', '五', '六'],
                  },
                },
                series: [
                  {
                    type: 'heatmap',
                    coordinateSystem: 'calendar',
                    data: output,
                    itemStyle: {
                      borderColor: '#9ba5a8',
                      borderWidth: 0.1,
                    },
                    emphasis: {
                      itemStyle: {
                        shadowBlur: 10,
                        // shadowColor: 'rgba(0, 0, 0, 0.5)',
                        borderColor: '#fff',
                      },
                    },
                    label: {
                      show: true,
                      formatter(params) {
                        return Number(params.data[0].substring(8, 10))
                      },
                      textStyle: {
                        // fontFamily: 'Arial, Verdana, sans...',
                        fontFamily: 'Arial',
                        fontSize: '9',
                        // fontStyle: 'normal',
                        // color: '#505f62',
                      },
                    },
                  },
                ],
              }
              option && myChart.setOption(option)
              myChart.on('click', (params) => {
                var data = paramse.data
                this.getHeatData(data, params)
                this.clickDate(data, params)
                data = null
                // 熱力圖資料更新放這邊
              })
              // 高亮今天的日期
              var currentYear = new Date().getFullYear().toString();
              var hasTimestamp = new Date() - new Date(currentYear);
              var hasDays = Math.ceil(hasTimestamp / 86400000)
              myChart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: hasDays - 1
              });
              chartDom = null
              myChart = null
              option = null
              hasDays = null
              currentYear = null
              hasTimestamp = null
            })
            var date = this.date
            var selectedDate = new Date(date)
            var month = selectedDate.getMonth()
            this.$refs.carousel.goTo(month)
            date = null
            selectedDate = null
            month = null
            data = null
            initial = null
            start = null
            last = null
            nowYear = null
            nowMonth = null
            nowDay = null
            nowtime = null
            output = null
            dayTotle = null
            arr = null
            seYear = null
          })
          .catch((error) => console.log('error from axios', error))
      }
      url = null
      // 閏年判斷器
      function leapyear(yyyy) {
        if ((yyyy % 4 === 0 && yyyy % 100 !== 0) || yyyy % 400 === 0) {
          // 安安我是閏年
          return 366
        } else {
          return 365
        }
      }
    },
    getHeatData(data1, params) {
      // console.log(params);
      var data = this.params1.data
      var start = new Date(params.data[0] + ' 00:00:00')
      var stop = new Date(params.data[0] + ' 23:59:59')
      var arr = []
      data.forEach((index) => {
        var dataStartTime = new Date(index.table_alarm_start)
        if (dataStartTime >= start && dataStartTime <= stop) {
          arr.push(index)
        }
      })
      // console.log(arr)
      var heatData = []
      // 判斷當日超溫次數統計(熱力圖)
      for (var i = 0; i < 24; i++) {
        for (var j = 0; j < 6; j++) {
          var heatDateStart = new Date(
            params.data[0] + ' ' + i + ':' + j * 10 + ':00'
          )
          var heatDateStop = new Date(
            params.data[0] + ' ' + i + ':' + (j * 10 + 9) + ':59'
          )
          var totle = 0
          arr.forEach((index, value) => {
            var arrTimeStart = new Date(index.table_alarm_start)
            if (arrTimeStart >= heatDateStart && arrTimeStart <= heatDateStop) {
              totle++
            }
            arrTimeStart = null
          })
          heatData.push([i, j, totle])
          totle = null
          heatDateStart = null
          heatDateStop = null
        }
      }
      // console.log(heatData)
      // 控制台打印数据的名称
      // axios({
      //   method: 'get',
      //   url: url1,
      // })
      //   .then((paramse) => {
      data = heatData.map(function (item) {
        return [item[0], item[1], item[2]]
      })
      var heat = document.getElementById('heatMap2_for_this')
      var myChart = echarts.getInstanceByDom(heat)
      myChart.setOption({
        series: [
          {
            name: '',
            data,
          },
        ],
      })
      // })
      // .catch((error) => console.log('error from axios', error))
      start = null
      stop = null
      heat = null
      myChart = null
      data = null
      heatData = null
      arr = null
    },
  },
  beforeDestroy() {
    // console.log("test",this.echartsData);
    if (this.echartsData.length > 0) {
      for (var i = 0; i < this.echartsData.length; i++) {
        // console.log("test", this.echartsData[i]);
        this.echartsData[i].dispose()
      }
    }
    for (var key in this.$data) {
      // console.log("remove : " + [key]);
      this[key] = null;
    }
  }
}
// let myChart = echarts.init(document.getElementById('charts'));
</script>

<style></style>
<style lang="scss">
.carousel-wrapper {
  margin-top: 10px;
  padding-right: 30px;
  padding-left: 30px;
}

.ycoordinates {
  position: absolute;
  font-size: 12px;
  right: 80px;
  bottom: 49px;
}

.xcoordinates {
  position: absolute;
  font-size: 12px;
  bottom: 275px;
  left: 505px;
}

.faketime {
  font-weight: 500;
  margin-left: 10px;
}

.btn {
  background-color: #f2f4f4;
}

.reset {
  // float: right;
  // margin-top: 0.5em;
  // margin-right: 0.5em;
  right: 0.5em;
  top: 0.5em;
  position: absolute;
  float: right;
  margin-top: 0.5em;
  margin-right: 0.5em;
}

.piccc {
  background-image: url('/xzoom/images/20220510_v1.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 200%;
}

.img-wrapper {
  padding-top: 0px;
  margin-top: 0px;
  height: 178px;
}

.tablefont {
  // font-size: 12px;
  color: #9ba3a5;
  // text-align: left;
  // font-family: 'Noto Sans TC', sans-serif;
}

.carousel-wrapper {
  // padding-right: 50px;
  padding-left: 50px;
  padding-right: 10px;
  // padding-right: 100px;
}

button.slick-prev:before,
button.slick-next:before {
  color: #505f62 !important;
}

.block4HidingBug {
  background-color: #fff;
  height: 30px;
  width: 30px;
  position: absolute;
  z-index: 99999;
}

.carouselCover1 {
  // background-color: rgba(255, 255, 255, 0.8);
  background: linear-gradient(to left,
      rgba(255, 255, 255, 0),
      rgb(255, 255, 255));
  position: absolute;
  height: 185px;
  width: 50px;
  z-index: 9999999;
}

.carouselCover2 {
  background: linear-gradient(to left,
      rgba(255, 255, 255),
      rgb(255, 255, 255, 0));
  position: absolute;
  height: 185px;
  width: 50px;
  margin-left: 725px;
  z-index: 9999998;
}

// #zoom-target2 {
//   margin-top:50px
// }

// .carouselCenterBorder {
//   border: 2px solid black;
//   position: absolute;
//   height: 185px;
//   width: 210px;
//   margin-left: 275px;
// }
.monthHeat {
  height: 200px;
  width: 218px;
}
</style>

<style lang="scss">
.v-data-table>.v-data-table__wrapper>table>tbody>tr>td,
.v-data-table>.v-data-table__wrapper>table>thead>tr>td,
.v-data-table>.v-data-table__wrapper>table>tfoot>tr>td {
  font-size: 12px !important;
  // margin-right: 10px !important;
  padding: 0px !important;
}
</style>
