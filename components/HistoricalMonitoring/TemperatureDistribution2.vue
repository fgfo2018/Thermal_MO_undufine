<template>
  <v-card flat>
    <v-card-text>
      <!-- 刷新按鈕 -->
      <v-tooltip left class="tips">
        <template #activator="{ on, attrs }">
          <v-btn small icon class="btn reset" color="#9BA3A5" v-bind="attrs" v-on="on" @click="restartbtn">
            <v-icon small class="icon">mdi-restore</v-icon>
          </v-btn>
        </template>
        <span>重置</span>
      </v-tooltip>

      <!-- 麵包屑 -->
      <!-- <v-breadcrumbs
              :items="items"
              style="padding-top: 0px; position: absolute"
            >
              <template v-slot:divider>
                <v-icon>mdi-chevron-right</v-icon>
              </template>
            </v-breadcrumbs> -->

      <div style="margin-left: 20px; top: 12px; position: absolute;display: flex;">
        <v-btn color="#9BA3A5" rounded x-small depressed style="color: #fff">
          溫度分佈
        </v-btn>
        <div style="margin-top: -20px; margin-top: -6px;
                    margin-left: 20px;">
          <div>
            <v-select v-model="selectList" :items="cameraList" class="camSelect" label="Solo field" solo dense
              hide-details @change="updateSelectDate1"></v-select>
          </div>
        </div>
      </div>

      <v-row>
        <v-col cols="12" md="12">
          <v-row :column="$vuetify.breakpoint.mdAndDown">
            <v-col cols="12" lg="12">
              <v-row class="mx-2 mt-8" style="border: 3px solid #f1f1f1; border-radius: 10px">
                <v-col cols="12" md="7">
                  <v-row :column="$vuetify.breakpoint.mdAndDown">
                    <v-col cols="12" lg="12" style="
                                border: 1px solid rgba(0, 0, 0, 0);
                                border-radius: 5px;
                              " class="py-2">
                      <temp-history-bar-chart @selectdata="selectdata1" />
                    </v-col>
                  </v-row>
                </v-col>

                <v-col cols="12" md="5">
                  <v-row :column="$vuetify.breakpoint.mdAndDown">
                    <v-col cols="12" lg="12" style="border: 1px solid rgba(0, 0, 0, 0)" class="py-2">
                      <temp-low-bar-chart />
                    </v-col>

                    <v-col cols="12" lg="12" style="border: 1px solid rgba(0, 0, 0, 0)" class="py-0">
                      <temp-avg-bar-chart />
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="5">
          <v-row :column="$vuetify.breakpoint.mdAndDown">
            <v-col cols="12" lg="12">
              <v-row class="mx-2 mt-2" style="border: 3px solid #f1f1f1; border-radius: 10px">
                <h4 class="cardtitle ml-3">
                  物件修改對照
                </h4>
                <div class="ml-3 mt-2">時間:{{ settingImg }}</div>
                <v-col cols="12" md="12">
                  <div class="flash-image-img">
                    <div class="flash-image-11">
                      <KonvaDisplayData :image="image1" @renderinge="renderingRoi" :roi="false" />
                      <img :src="image2" id="image112" />
                      <v-stage ref="stage" :config="configKonva" class="flash-image-konva">
                        <v-layer>
                          <v-rect ref="rect1" :config="{
                            x: 5,
                            y: 5,
                            width: 64,
                            height: 48,
                            fill: 'rgba(255,255,255,0.5)',
                            draggable: true,
                          }" @dragmove="(e) => {
  handleDragMove(e)
  handleDragZoom(e)
}" @mouseover="handleDragStart" @mouseout="handleDragEnd" />
                        </v-layer>
                      </v-stage>
                    </div>
                    <div>
                      <div id="image2"></div>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" md="7">
          <v-row :column="$vuetify.breakpoint.mdAndDown">
            <v-col cols="12" lg="12">
              <v-row class="mr-2 mt-2" style="border: 3px solid #f1f1f1; border-radius: 10px">
                <!-- <v-menu
                  ref="menu2"
                  v-model="menu2"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                  ><template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="dateRangeText"
                      label=""
                      readonly
                      dense
                      v-bind="attrs"
                      v-on="on"
                      style="
                        font-size: 12px;
                        margin-left: 140px;
                        margin-top: 8px;

                        position: absolute;
                        z-index: 999999;
                      "
                    >
                      <v-icon
                        slot="prepend"
                        small
                        dense
                        style="line-height: 22px"
                        v-model="date"
                      >
                        mdi-calendar
                      </v-icon>
                    </v-text-field>
                  </template>
                  <v-date-picker
                    no-title
                    scrollable
                    v-model="dates"
                    range
                    :active-picker.sync="activePicker"
                    locale="zh-tw"
                    :max="
                      new Date(
                        Date.now() - new Date().getTimezoneOffset() * 60000
                      )
                        .toISOString()
                        .substr(0, 10)
                    "
                    min="2010-01-01"
                  >
                    <v-btn text color="primary" @click="dateRange2">
                      確定
                    </v-btn></v-date-picker
                  >
                </v-menu> -->
                <!-- date-picker選擇時間日期區間 -->
                <div style="
                            position: absolute;
                            margin-left: 130px;
                            margin-top: 13px;
                            z-index: 9999;
                            width: 300px;">時間範圍:{{ date1 }}</div>
                <!-- <date-picker v-model="value1" type="date" class="mt-2" range placeholder="Select datetime range" style="
                            position: absolute;
                            margin-left: 130px;
                            z-index: 9999;
                            width: 202px;
                          "></date-picker> -->
                <v-col cols="12" md="12">
                  <peak-hours-statistics-bar-chart />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>


      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import * as echarts from 'echarts'
import axios from 'axios'
// echarts引入
import KonvaDisplayData from '../Index/konva-display-data.vue'
import TempHistoryBarChart from './LineBarChart/TempHistoryBarChart.vue'
import TempLowBarChart from './LineBarChart/TempLowBarChart.vue'
import TempAvgBarChart from './LineBarChart/TempAvgBarChart.vue'
import PeakHoursStatisticsBarChart from './LineBarChart/PeakHoursStatisticsBarChart.vue'
export default {
  props: ['camlist'],
  // echarts引入
  components: {
    TempHistoryBarChart,
    TempLowBarChart,
    TempAvgBarChart,
    PeakHoursStatisticsBarChart,
    KonvaDisplayData
  },
  name: 'IndexPage',
  head: {
    title: '即時監控',
    link: [
      // { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: 'stylesheet', href: '/css/object.css' },
      { rel: 'stylesheet', href: '/css/card3.css' },
    ],
    script: [],
  },
  data: () => ({
    selectList: [],
    cameraList: [],
    image1: 'EMPTYv1-fill.png',
    image2: 'EMPTYv1-fill.png',
    // date-picker
    value1: [new Date(), new Date()],
    activePicker: null,
    url1: 'http://127.0.0.1:5002/api/change/roi',
    date: ['', ''],
    dates: ['', ''],
    changeData: [],
    settingImg: null,
    menu: false,
    options: {
      loop: false,
      perPage: 3,
      paginationEnabled: false,
    },
    items: [],
    date1: null
  }),
  watch: {
    settingImg(data) {
      // this.imageChange(data)
    },
    camlist(data) {
      this.initcamList()
    }
  },
  mounted() {

    // const unthumb = document.querySelectorAll('.thumb')
    // for (const unthumbs of unthumb) {
    //   unthumbs.onclick = function (e) {
    //     // console.log(e.target.src);
    //     // console.log(e.target.getAttribute("src"));
    //     const newImg = e.target.src // 絕對連結
    //     // let newImg = e.target.getAttribute("src");  // getAttribute取得屬性 e.g. src //相對連結
    //     document.querySelector('.pic').setAttribute('src', newImg) // 取得這個pic之後，去設定他的scr屬性值是newImg(我點選時所得到的），你要設定的屬性是誰
    //     for (const th of this.thumb) {
    //       th.classList.remove('active')
    //     }
    //     e.target.classList.add('active')
    //   }
    // }
    this.dates = ['2022-05-13', '2022-05-13']

    this.myChartSelect()
    var now = new Date()
    now = now.getFullYear()
    this.getDate(now)
    this.initKonva()
    this.initcamList()
  },
  methods: {
    restartbtn() {
      var c = document.getElementById('lineBarChart001')
      var chart1 = echarts.getInstanceByDom(c)
      var currentOption = chart1.getOption();
      var calendarLow = document.getElementById('lineLowChart')
      var myChartLow = echarts.getInstanceByDom(calendarLow)
      var calendarAvg = document.getElementById('lineAvgChart')
      var myChartAvg = echarts.getInstanceByDom(calendarAvg)
      var peakChat1 = document.getElementById('peakChat')
      var peakChat2 = echarts.getInstanceByDom(peakChat1)
      var seriesNames = currentOption.series.map(function (series) {
        return series;
      });
      var arr = {}
      seriesNames.forEach((item) => {
        arr[item.name] = true
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
    },
    selectdata1(data) {
      this.date1 = data
    },
    updateSelectDate1(event) {
      // this.$route.push({ path: '/' })
      this.$router.push({ query: { cam: event, main: this.$route.query.main, secondary: this.$route.query.secondary, tab: 'tab-2' } }, () => {
        // window.location.reload()
        this.$emit('custom-event')
      })
    },
    initcamList() {
      // console.log('123', this.camlist)
      var camAll = []
      this.camlist.forEach((value) => {
        camAll.push({ text: value.name, value: value.cam_id })
        // if (this.$route.query.cam === value.cam_id) {
        //   this.selectList = value.name

        // }
        // console.log(this.$route.query.cam, value.cam_id)
      })
      this.cameraList = camAll
      this.selectList = this.$route.query.cam
      camAll = null
      // this.selectList = this.camlist
    },
    initKonva() {
      try {
      var img = document.getElementById('image112')
      var canvasWidth = 0
      var canvasHeight = 0
      const rect1 = this.$refs.rect1.getNode()
      img.addEventListener('load', () => {
        canvasWidth = document.getElementById('image112').clientWidth
        canvasHeight = document.getElementById('image112').clientHeight
        console.log(canvasWidth, canvasHeight)
        this.configKonva = {
          width: canvasWidth,
          height: canvasHeight,
        }
        rect1.x(canvasWidth / 2 - 32)
        rect1.y(canvasHeight / 2 - 24)
      })
      } catch (error) {
        console.log(error);
      }
    },
    renderingRoi(data) {
      // console.log(data)
      this.image2 = data
      document.getElementById('image2').style.background = `url(${data}) no-repeat center center`
    },
    handleDragStart() {
      document.body.style.cursor = 'move'
    },
    handleDragEnd() {
      document.body.style.cursor = 'auto'
    },
    // 避免kovan元素超出邊界
    handleDragMove(e) {
      var x = e.target.x()
      var y = e.target.y()
      var width = e.target.width()
      var height = e.target.height()
      var canvasKonva = this.configKonva
      if (x <= 0) {
        e.target.x(0)
      } else if (x >= canvasKonva.width - width) {
        e.target.x(canvasKonva.width - width)
      }

      if (y <= 0) {
        e.target.y(0)
      } else if (y >= canvasKonva.height - height) {
        e.target.y(canvasKonva.height - height)
      }
      x = null
      y = null
      width = null
      height = null
      canvasKonva = null
    },
    handleDragZoom(e) {
      var x = e.target.x()
      var y = e.target.y()
      var width = e.target.width()
      var height = e.target.height()
      var canvasKonva = this.configKonva
      var xZoom = Math.floor(Math.abs((x / (width - canvasKonva.width) * 100)))
      var yZoom = Math.floor(Math.abs((y / (height - canvasKonva.height) * 100)))
      document.getElementById('image2').style.backgroundPosition = `${xZoom}% ${yZoom}%`
      x = null
      y = null
      width = null
      height = null
      canvasKonva = null
      xZoom = null
      yZoom = null
      // console.log(xZoom, yZoom)
    },
    dateRange() {
      this.menu = false
      // var input = this.dates
      // console.log(input)
    },
    dateRange2() {
      this.menu2 = false
      // var input = this.dates
      // console.log(input)
    },
    getDate(year) {
      axios({
        method: 'post',
        url: this.url1,
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify([
          {
            cam_id: this.$route.query.cam,
            table_timeselectStart: `${year}-01-01`,
            table_timeselectStop: `${year}-12-31`,
          },
        ]),
      }).then((params) => {
        var data = params.data
        var arr = []
        data.forEach((index) => arr.push(index.table_change_start))
        arr.sort(function (a, b) {
          if (a < b) {
            return -1
          } else {
            return 1
          }
        })
        this.changeData = arr
        // console.log( "123",arr)
        this.settingImg = arr[arr.length - 1]
        this.imageChange(arr[arr.length - 1])
        data = null
        arr = null
      })
    },
    myChartSelect() {
      const calendar = document.getElementById('lineBarChart001')
      const myChart = echarts.getInstanceByDom(calendar)
      var tmp = null // 防止重複讀取
      myChart.getZr().on('mousemove', (params) => {
        var pointInPixel = [params.offsetX, params.offsetY]
        if (myChart.containPixel('grid', pointInPixel)) {
          try {
            // statements to try
            var xIndex = myChart.convertFromPixel({ seriesIndex: 0 }, [
              params.offsetX,
              params.offsetY,
            ])[0]
            var op = myChart.getOption()
            var xData = op.xAxis[0].data[xIndex]
            if (xData !== tmp) {
              // console.log(xData)
              // 判斷圖片
              var hoverTime = new Date(xData)
              var getChangeData = this.changeData
              var oupTime = null
              getChangeData.forEach((index) => {
                var changeTime = new Date(index)
                if (hoverTime > changeTime) {
                  oupTime = index
                }
                changeTime = null
              })
              this.settingImg = oupTime
              this.imageChange(oupTime)
              hoverTime = null
              getChangeData = null
              oupTime = null
            }
            tmp = xData
            op = null
            xIndex = null
            xData = null
          } catch (e) {
            console.log('err')
          }
        }
        pointInPixel = null
        // 參考:https://www.helloworld.net/p/7352350306
      })
      setTimeout(() => {
        var arr = this.changeData
        // console.log(arr)
        this.settingImg = arr[arr.length - 1]
        arr = null
      }, 1500)
      // console.log(myChart)
    },
    imageChange(oupTime) {
      // console.log(oupTime)
      var date = new Date(oupTime)
      var YMD =
        date.getFullYear() +
        ('0' + (date.getMonth() + 1)).slice(-2) +
        ('0' + date.getDate()).slice(-2)
      // var YM =
      //   date.getFullYear() +
      //   ('0' + (date.getMonth() + 1)).slice(-2)
      var HMS =
        ('0' + date.getHours()).slice(-2) +
        ('0' + date.getMinutes()).slice(-2) +
        ('0' + date.getSeconds()).slice(-2)
      // this.image1 = `http://localhost:5002/api/database/share/alarmtemp%5C${this.$route.query.cam}%5C${YM}%5Calarmtemp_${YMD}_T${HMS}.jpg` // 暫存
      this.image1 = `http://localhost:5002/api/database/share/setting%5Croisettinghistory%5C${this.$route.query.cam}%5Croi_setting_history_${YMD}_T${HMS}.jpg` // 暫存
      date = null
      YMD = null
      HMS = null
      // this.image1 = '/EMPTYv1-fill.png'
      // this.image1 =
      //   'http://127.0.0.1:5002/api/database/share/setting%5Croisettinghistory%5C' + camid + '%5Croi_setting_history_' +
      //   nowtime.getFullYear() +
      //   ('0' + (nowtime.getMonth() + 1)).slice(-2) +
      //   ('0' + nowtime.getDate()).slice(-2) +
      //   '_T' +
      //   ('0' + nowtime.getHours()).slice(-2) +
      //   ('0' + nowtime.getMinutes()).slice(-2) +
      //   ('0' + nowtime.getSeconds()).slice(-2) +
      //   '.jpg'



      // var date = new Date(oupTime)
      // var YMD =
      //   date.getFullYear() +
      //   ('0' + (date.getMonth() + 1)).slice(-2) +
      //   ('0' + date.getDate()).slice(-2)
      // var HMS =
      //   ('0' + date.getHours()).slice(-2) +
      //   ('0' + date.getMinutes()).slice(-2) +
      //   ('0' + date.getSeconds()).slice(-2)
      // var image = document.getElementById('image-wrap-change1')
      // image.style.background = `url('http://127.0.0.1:5002/api/database/share/setting%5Croisettinghistory%5Croi_setting_history_${YMD}_T${HMS}.jpg') no-repeat center center`
      // image.style.backgroundSize = '100%'
      // var imageresult = document.getElementById('image-wrap-img1')
      // imageresult.style.background = `url('http://127.0.0.1:5002/api/database/share/setting%5Croisettinghistory%5Croi_setting_history_${YMD}_T${HMS}.jpg') no-repeat center center`
    },
  },
  beforeDestroy() {
    for (var key in this.$data) {
      // console.log("remove : " + [key]);
      this[key] = null;
    }
  }
}
</script>
<style scoped>
#image2 {
  width: 100%;
  height: 234px;
  background: url(/EMPTYv1-fill.png) no-repeat center center;
  background-position: 50% 50%;
}

/* 左側浮動按鈕 */
.drawer {
  position: fixed;
  width: 3.6em;
  left: -3.599em;
  height: 51.8em;
  transition: all 0.5s;
  border-radius: 0px 10px 10px 0px;
  z-index: 99999;
  /* background-color: #031316; */
  color: rgba(89, 89, 91, 1);
}

.box {
  background-color: #fff;
}

.box:hover .drawer {
  left: 0;
}

/* 影像串流 */
.frame {
  width: 74em;
  margin-left: 0.3em;
  margin-top: 0.7em;
}

.cover {
  position: relative;
  max-width: 100%;
  width: 100%;
  display: inline-block;
  isolation: isolate;
}

#image {
  width: 100%;
  /* width: 70.5em; */
  pointer-events: none;
  /* margin-left: 2.1em; */
  /* margin-top: 2em; */
  isolation: isolate;
}

.arrow {
  height: 23px;
  width: 100px;
  position: absolute;
  margin-left: 1.16em;
  margin-top: 25.5em;
  transform: rotate(270deg);
  border-radius: 0 0 100px 100px;
}

/* 按鈕提示 */
.tips {
  z-index: 100000;
}

/* 區塊標題文字 */
.subtitle {
  font-size: 12px;
  color: #d9dddd;
  text-align: center;
}

.subtitle-right {
  font-size: 12px;
  color: #9ba3a5;
  text-align: left;
  font-family: 'Noto Sans TC', sans-serif;
}

/* h4 {
  line-height: 2em;
  padding-left: 1em;
  color: #031418;
  font-family: 'Noto Sans TC', sans-serif;
  font-weight: bold;
} */
.gg {
  float: left;
  text-align: center;
}

.font-display {
  font-family: 'Noto Sans TC', sans-serif;
}

.chartTitle {
  color: #545454;
}

.date-picker {
  float: right;
}

.card5 {
  display: flex;
  /* 水平置中 */
  justify-content: center;
  /* 垂直置中 */
  align-content: center;
  flex-wrap: wrap;
}

.card5content {
  width: 6em;
  float: left;
  margin: auto;
}

.btn {
  background-color: #f2f4f4;
}

.reset {
  float: right;
  margin-top: 0.5em;
  margin-right: 0.5em;
}

.cardtitle {
  line-height: 2.5em;
  font-weight: 900;
  color: #505f62;
}

.text-color>>>.v-text-field__slot input {
  color: #9ba3a5;
}

.left-btn {
  background-color: #2d2d2d;
  width: 2.25em;
  height: 2.25em;
}

.right-btn {
  background-color: #f2f4f4;
  width: 2.25em;
  height: 2.25em;
}

.donut1 {
  float: left;
}

.donut2 {
  float: right;
}

/* .rectangle {
  z-index: 99999;
} */
.bgimg {
  position: absolute;
}

/* .scroll { */
/* width: 20px; */
/* height: 200px; */
/* overflow: auto; */
/* float: right; */
/* margin: 0 10px; */
/* } */

.scroll4::-webkit-scrollbar {
  width: 10px;
}

.scroll4::-webkit-scrollbar-thumb {
  background: #666;
  border-radius: 20px;
}

.scroll4::-webkit-scrollbar-track {
  background: #ddd;
  border-radius: 20px;
}
</style>

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
}
</style>

<style lang="scss">
.flash-image-img {
  display: grid;
  grid-template-columns: 50% 50%;
  // width: 100px;
  // height: 100px;
  // position: absolute;
  // top: 50%;
  // left: 50%;
  // -moz-transform: translateY(-50%) translateX(-50%);
  // -ms-transform: translateY(-50%) translateX(-50%);
  // -webkit-transform: translateY(-50%) translateX(-50%);
  // transform: translateY(-50%) translateX(-50%);
  // -moz-box-shadow: 1px 3px 8px rgba(0, 0, 0, 0.5);
  // -webkit-box-shadow: 1px 3px 8px rgba(0, 0, 0, 0.5);
  // box-shadow: 1px 3px 8px rgba(0, 0, 0, 0.5);
  // margin-left: 0px;
}

.flash-image-img>div {
  margin: 0 15px 10px 0px;
}

.flash-image-img img {
  width: 100%;
}

.flash-image-11 {
  position: relative;
}

.flash-image-konva {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

// @media (min-width: 550px) {
//   .image-wrap {
//     width: 608px;
//     height: 404px;
//   }
//   .image-wrap .image {
//     width: 50% !important;
//     height: 100% !important;
//     clear: none !important;
//   }
// }
.camSelect div {
  box-shadow: unset !important;
  font-size: 17px;
  color: #80898c;
}
</style>
