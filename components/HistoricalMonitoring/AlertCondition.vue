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
      <div style="margin-left: 20px; top: 12px; position: absolute;display: flex;">
        <v-btn color="#9BA3A5" rounded x-small depressed style="color: #fff">
          警報狀況
        </v-btn>
        <div style="margin-top: -20px; margin-top: -6px;
                            margin-left: 20px;">
          <div>
            <v-select v-model="selectList" :items="cameraList" class="camSelect" label="Solo field" solo dense
              hide-details @change="updateSelectDate"></v-select>
          </div>
        </div>
      </div>
      <v-row>
        <v-col cols="12">
          <v-row class="mx-2 mt-8" style="border: 3px solid #f1f1f1; border-radius: 10px">
            <v-col cols="12" md="6">
              <!-- 當月超溫統計 區塊全數移置MonthHeatMap1 2022/05/19-louis -->
              <MonthHeatMap1 @selectDate="selectDate1" />
            </v-col>

            <v-col cols="12" md="6">
              <v-row :column="$vuetify.breakpoint.mdAndDown">
                <h4 class="cardtitle ml-3" style="position: absolute">
                  當日超溫次數統計
                </h4>

                <v-col cols="12" lg="12" style="border: 1px solid rgba(0, 0, 0, 0)" class="mt-7">
                  <!-- <div class="legend">
                        <v-icon color="#d8dddd">mdi-square-medium</v-icon
                        ><span class="subtitle-right"
                          >良好-資料丟失率&lt;2.5% (單日)&nbsp;&nbsp;</span
                        >
                        <v-icon color="#9aa2a4">mdi-square-medium</v-icon
                        ><span class="subtitle-right"
                          >些微異常-資料丟失率&lt;5% (單日)&nbsp;&nbsp;</span
                        ><v-icon color="#37484C">mdi-square-medium</v-icon
                        ><span class="subtitle-right"
                          >異常-資料丟失率&lt;10% (單日)&nbsp;&nbsp;</span
                        >
                        <v-icon color="#eef1f9">mdi-square-medium</v-icon
                        ><span class="subtitle-right"
                          >尚未偵測&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                        >
                      </div> -->

                  <DayHeatMap @clickHeatMap1="selectHeatMap" />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" md="12">
          <v-row>
            <v-col cols="12" lg="3">
              <v-card flat outlined class="ml-3 mt-3" style="width: 600px">
                <v-card-title class="d-flex py-0 px-1">
                  <h6 class="cardtitle ml-3" style="color: #4f5e62">
                    監測項目超溫次數統計
                  </h6>
                  <v-spacer />
                  <date-picker v-model="value1" type="date" range style="width: 200px;"
                    @change="selectRangeDate"></date-picker>
                  <!-- 查看修改動作 -->
                  <v-dialog v-model="dialog" width="500" hide-overlay style="z-index: 99999">
                    <template v-slot:activator="{ on, attrs }">
                      <v-tooltip top>
                        <template v-slot:activator="{ on: tooltip }">
                          <v-btn icon color="#000" v-bind="attrs" v-on="{ ...tooltip, ...on }">
                            <v-icon>mdi-alert-circle-outline</v-icon>
                          </v-btn>
                        </template>
                        <span>監測影像變動圖</span>
                      </v-tooltip>
                    </template>

                    <v-card>
                      <v-card-text>
                        <v-data-table :headers="firstHeadersForNotice" :items="firstBodysForNotice" :expanded="expanded"
                          item-key="calories" show-expand hide-default-footer disable-sort width="900px"
                          style="color: #4f5e62" v-model="selected" show-select fixed-header class="mx-4" color="#4f5e62"
                          checkbox-color="#4f5e62">
                          <template v-slot:expanded-item="{ headers }">
                            <td :colspan="headers.length" hide-default-footer class="elevation-0 tablefont" dense
                              disable-sort style="background-color: transparent">
                              <v-row>
                                <v-col cols="6">
                                  <h5>before</h5>
                                </v-col>
                                <v-col cols="6">
                                  <h5>after</h5>
                                </v-col>
                              </v-row>

                              <v-row>
                                <v-col cols="6" class="py-0">
                                  <v-img justify="center" src="/xzoom/images/20220510_v1.jpg" width="200"
                                    style="display: block; margin: auto" />
                                </v-col>
                                <v-col cols="6" class="py-0">
                                  <v-img justify="center" src="/xzoom/images/20220510_after.png" width="200"
                                    style="display: block; margin: auto" />
                                </v-col>
                              </v-row>
                            </td>
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                          </template>
                        </v-data-table>
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="#505f62" text @click="dialog = false">
                          關閉
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-card-title>
                <v-card-text class="px-1">
                  <v-col cols="12" md="12" class="px-0">
                    <!-- 預覽圖 -->
                    <!-- <div class="preview-cover">
                      <div>
                        <KonvaDisplayData :image="image1" @renderinge="renderingRoi" />
                        <div id="ROI-preview"></div>
                      </div>
                    </div> -->
                    <div class="preview0zoom">
                      <v-stage :config="ImagecomparisonKonva">
                        <v-layer ref="Imagecomparisonlayer">
                          <v-image :config="ImagecomparisonKonvaImageConfig" ref="ImagecomparisonKonva" @mouseenter="(events) => {
                            imagecomparisonImageMove(events, 0)
                          }
                            " @mousemove="(events) => {
    imagecomparisonImageMove(events, 1)
  }
    " @mouseleave="(events) => {
    imagecomparisonImageMove(events, 2)
  }
    " @mousedown="(events) => {
    zoomstatus = true
    imagecomparisonImageMove(events, 'start')
  }
    " @mouseup="zoomstatus = false" @wheel="(event) =>
    event.evt.deltaY > 0 ? zoomfunction(0) : zoomfunction(1)" />
                        </v-layer>
                      </v-stage>
                    </div>
                    <!-- <KonvaDisplayData :image="image1" @renderinge="renderingRoi" /> -->
                    <!-- <v-img justify="center" :src="image1" width="280" style="display: block; margin: auto" /> -->
                    <div class="firstHeaderscss">
                      <v-data-table :headers="firstHeaders" :items="firstBodys" :expanded.sync="expanded" item-key="name"
                        show-expand dense hide-default-footer height="195px" style="color: #4f5e62" color="#4f5e62"
                        no-data-text="目前沒有警報" class="mx-2" disable-sort>
                        <template v-slot:expanded-item="{ headers, item }">

                          <td :colspan="headers.length" hide-default-footer class="tablefont" dense disable-sort
                            style="background-color: transparent">
                            <v-data-table :colspan="headers.length" :headers="secondHeaders" :items="item.secondBodys"
                              hide-default-footer class="ablefont" dense disable-sort
                              style="background-color: transparent"></v-data-table>
                          </td>
                        </template>
                      </v-data-table>
                    </div>
                    <!-- 
                    <template v-slot:expanded-item="{ headers }">
                      <td
                        :colspan="headers.length"
                        hide-default-footer
                        class="elevation-0 tablefont"
                        dense
                        disable-sort
                        style="background-color: transparent"
                      >
                        <v-data-table
                          :colspan="headers.length"
                          :headers="secondHeaders"
                          :items="secondBodys"
                          hide-default-footer
                          class="elevation-0 tablefont"
                          dense
                          disable-sort
                          style="
                            position: relative;
                            background-color: transparent;
                          "
                        ></v-data-table>
                      </td>
                    </template>
 -->
                  </v-col>
                </v-card-text>
              </v-card>
            </v-col>

            <v-col cols="12" lg="9">
              <v-row class="mx-2 mt-2" style="border: 3px solid #f1f1f1; border-radius: 10px">
                <!-- <h4 class="cardtitle">監測項目時段超溫紀錄表</h4> -->
                <v-col cols="9">
                  <v-row>
                    <!-- ----------------------------------------------------------------------------------------------- -->
                    <h4 class="cardtitle ml-3">監測項目時段超溫紀錄表</h4>
                    <v-col cols="12" lg="12" class="py-0 pl-10">
                      <div class="fakeTempsHeaderscss">
                        <v-data-table :headers="fakeTempsHeaders" :items="fakeTemps" :single-select="singleSelect"
                          :value="fakeTempsvalue" no-data-text="目前沒有警報" :expanded="expanded" item-key="index" show-select
                          class="elevation-0" height="190px" hide-default-footer fixed-header style="width: 970px"
                          @input="tableSelect">
                        </v-data-table>
                      </div>
                    </v-col>

                    <v-col cols="12" lg="12" style="border: 1px solid rgba(0, 0, 0, 0)">
                      <overheat-records-line-chart />
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="3">
                  <!-- 放大鏡 -->
                  <div class="flash-image-img">
                    <div class="flash-image-11">
                      <KonvaDisplayData :image="image3" @renderinge="renderingRoi1" :roi="false" />
                      <img :src="image4" id="image11" />
                      <v-stage ref="stage1" :config="configKonva" class="flash-image-konva">
                        <v-layer>
                          <v-rect ref="rect1" :config="{
                            x: 5,
                            y: 5,
                            width: 64,
                            height: 48,
                            fill: 'rgba(255,255,255,0.5)',
                            draggable: true,
                          }" @dragmove="(e) => {
  handleDragMove1(e)
  handleDragZoom1(e)
}" @mouseover="handleDragStart1" @mouseout="handleDragEnd1" />
                        </v-layer>
                      </v-stage>
                    </div>
                    <div>
                      <div id="image4"></div>
                    </div>
                  </div>
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
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import * as echarts from 'echarts'
import axios from 'axios'
// import Konva from 'konva'
// echarts引入
import KonvaDisplayData from '../Index/konva-display-data.vue'
import DayHeatMap from './DayHeatMap/DayHeatMap.vue'
import MonthHeatMap1 from './MonthHeatMap/MonthHeatMap1.vue'
import overheatRecordsLineChart from './overheatRecordsLineChart/overheatRecordsLineChart.vue'

export default {
  // props: ['camlist', 'wsway', 'stws'],
  props: ['camlist'],
  selected01: [],
  // echarts引入
  components: {
    DayHeatMap,
    MonthHeatMap1,
    overheatRecordsLineChart,
    KonvaDisplayData
  },
  name: 'IndexPage',
  head: {
    title: '即時監控',
    link: [
      { rel: 'stylesheet', href: '/css/jquery-ui.css' },
      { rel: 'stylesheet', href: '/css/object.css' },
      { rel: 'stylesheet', href: '/css/card3.css' },
    ],
  },
  data: () => ({
    // 影像對照圖
    ImagecomparisonKonva: {},
    ImagecomparisonKonvaImageConfig: {
      width: 280,
      height: 210,
      image: null,
      scale: 1,
    },
    // 影像放大相關
    zoomLvl: 1,
    zoomstatus: false,
    logZoomPostion: [0, 0, 0, 0],
    zoomin: {
      x: 540,
      y: 20,
      width: 30,
      height: 30,
      image: null,
    },
    zoomout: {
      x: 580,
      y: 20,
      width: 30,
      height: 30,
      image: null,
    },
    // 
    selectList: [],
    cameraList: [],
    // date-picker
    value1: [new Date(), new Date()],
    image1: 'EMPTYv1-fill.png',
    image2: 'EMPTYv1-fill.png',
    image3: 'EMPTYv1-fill.png',
    image4: 'EMPTYv1-fill.png',
    // 對話框
    dialog: false,
    dates: new Date().toISOString().substr(0, 10),
    slickOptions: {
      slidesToShow: 3,
      arrows: true,
      // slidesToScroll: 3,
      // centerMode: true,
      // dots: true,
      // focusOnSelect: true,
      // touchThreshold: 3,
      swipeToSlide: true,
    },
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
    // 假數據顯示(待刪)
    fakeTempsHeaders: [
      {
        text: '',
        align: 'start',
        sortable: false,
        value: 'selected',
      },
      {
        text: '項次',
        // align: 'start',
        sortable: false,
        value: 'index',
      },
      {
        text: '項目',
        // align: 'start',
        sortable: false,
        value: 'object_name',
      },
      { text: '超溫開始日期', value: 'object_date' },
      { text: '超溫開始時間', value: 'object_time_start' },
      { text: '超溫停止時間', value: 'object_tiem_stop' },
      { text: '持續時間', value: 'object_time_totle' },
      { text: '預設警報溫度', value: 'object_setting_temperature' },
      { text: '最大溫度', value: 'object_temperature_max' },
    ],
    fakeTemps: [],
    fakeTempsvalue: [{ index: 1 }],
    // 左下下拉填單
    select: ['2022/03/08 03:08:57 - 2022/05/17 08:22:09'],
    timeItems: [
      '2022/01/10 01:00:17 - 2022/02/27 08:09:31',
      '2022/02/27 02:53:05 - 2022/03/08 21:09:25',
      '2022/03/08 03:08:57 - 2022/05/17 08:22:09',
    ],

    // 監測項目超溫次數統計 巢狀表格
    expanded: [],
    singleExpand: false,
    firstHeaders: [
      {
        text: '項目',
        sortable: false,
        value: 'name',
        align: 'center',
        class: 'my-header-style',
      },
      {
        text: '開始紀錄時間',
        sortable: false,
        value: 'calories',
        align: 'center',
        class: 'my-header-style',
      },
      {
        text: '超溫占比',
        sortable: false,
        value: 'carbs',
        align: 'center',
        class: 'my-header-style',
      },
      {
        text: '超溫總數',
        sortable: false,
        value: 'protein',
        align: 'center',
        class: 'my-header-style',
      },
      {
        text: '',
        sortable: false,
        value: 'data-table-expand',
        align: 'center',
        class: 'my-header-style ma-0',
      },
    ],

    secondHeaders: [
      {
        text: '',
        align: 'center',
        class: 'my-header-style mx-0',
        sortable: false,
        value: 'name',
      },
      {
        text: '超溫開始時間',
        value: 'calories',
        align: 'center',
        class: 'my-header-style  mx-0',
      },
      {
        text: '持續時間',
        value: 'carbs',
        align: 'center',
        class: 'my-header-style  mx-0',
      },
      {
        text: '最高溫度',
        value: 'protein',
        align: 'center',
        class: 'my-header-style  mx-0',
      },
      {
        text: '警報溫度',
        value: 'iron',
        align: 'center',
        class: 'my-header-style  mx-0',
      },
    ],

    // 紅色通知 巢狀表格

    firstHeadersForNotice: [
      {
        text: '項目',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      { text: '更動時間', value: 'calories' },
      { text: '狀況', value: 'fat' },
    ],

    secondHeadersForNotice: [
      {
        text: '',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      { text: '超溫開始時間', value: 'calories' },
      { text: '持續時間', value: 'carbs' },
      { text: '最高溫度', value: 'protein' },
      { text: '警報溫度', value: 'iron' },
    ],
    firstBodys: [],
    firstBodysForNotice: [],
    secondBodysForNotice: [
      {
        // name: '矩形1',
        calories: '2022/05/17 01:20:58',
        fat: '2022/05/17 01:25:58',
        carbs: '12分',
        protein: '60°C',
        iron: '50°C',
      },
      {
        // name: '矩形1',
        calories: '2022/05/17 01:20:58',
        fat: '2022/05/17 01:25:58',
        carbs: '5分',
        protein: '62°C',
        iron: '43°C',
      },
    ],
    secondBodys2: [
      {
        // name: '矩形1',
        calories: '2022/05/17 01:20:58',
        fat: '2022/05/17 01:25:58',
        carbs: '12分',
        protein: '60°C',
        iron: '50°C',
      },
      {
        // name: '矩形1',
        calories: '2022/05/17 01:20:58',
        fat: '2022/05/17 01:25:58',
        carbs: '5分',
        protein: '62°C',
        iron: '43°C',
      },
    ],
    // fakefakefake
    singleSelect: true,
    selected: [],
    headers: [
      {
        text: 'Dessert (100g serving)',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      { text: 'Calories', value: 'calories' },
      { text: 'Fat (g)', value: 'fat' },
      { text: 'Carbs (g)', value: 'carbs' },
      { text: 'Protein (g)', value: 'protein' },
      { text: 'Iron (%)', value: 'iron' },
    ],
    clicked: null,
    desserts: [
      {
        name: 'Frozen Yogurt',
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        iron: '1%',
      },
      {
        name: 'Ice cream sandwich',
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        iron: '1%',
      },
      {
        name: 'Eclair',
        calories: 262,
        fat: 16.0,
        carbs: 23,
        protein: 6.0,
        iron: '7%',
      },
      {
        name: 'Cupcake',
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
        iron: '8%',
      },
      {
        name: 'Gingerbread',
        calories: 356,
        fat: 16.0,
        carbs: 49,
        protein: 3.9,
        iron: '16%',
      },
      {
        name: 'Jelly bean',
        calories: 375,
        fat: 0.0,
        carbs: 94,
        protein: 0.0,
        iron: '0%',
      },
      {
        name: 'Lollipop',
        calories: 392,
        fat: 0.2,
        carbs: 98,
        protein: 0,
        iron: '2%',
      },
      {
        name: 'Honeycomb',
        calories: 408,
        fat: 3.2,
        carbs: 87,
        protein: 6.5,
        iron: '45%',
      },
      {
        name: 'Donut',
        calories: 452,
        fat: 25.0,
        carbs: 51,
        protein: 4.9,
        iron: '22%',
      },
      {
        name: 'KitKat',
        calories: 518,
        fat: 26.0,
        carbs: 65,
        protein: 7,
        iron: '6%',
      },
    ],
    objectName: {
      spot1: '點1',
      spot2: '點2',
      spot3: '點3',
      spot4: '點4',
      spot5: '點5',
      spot6: '點6',
      line1: '線1',
      line2: '線2',
      line3: '線3',
      line4: '線4',
      line5: '線5',
      line6: '線6',
      scope1: '矩形1',
      scope2: '矩形2',
      scope3: '矩形3',
      scope4: '矩形4',
      scope5: '矩形5',
      scope6: '矩形6',
    },
    configKonva: {
      width: 640,
      height: 480,
    },
  }),
  watch: {
    fakeTemps(data) {
      if (data.length > 0) {
        this.tableSelect(data)
      }
    },
    camlist(data) {
      this.initcamList()
    }
  },
  mounted() {
    // console.log(this.$route.query.cam)

    // this.overTemperatureTtems('http://localhost:5002/api/alarm/list', today)
    // this.overTemperatureChangeTtems('http://localhost:5002/api/change/roi', today)
    // 判斷echarts 是否渲染完成 ---- 2022/12/21 廢棄 (louis)
    // var calendar = this.month
    // var loadingEcharts = setInterval(() => {
    //   const calendarID = document.getElementById(calendar[0])
    //   const myChart1 = echarts.getInstanceByDom(calendarID)
    //   if (myChart1 !== undefined) {
    //     clearInterval(loadingEcharts)
    //     this.initial()
    //   }
    // })

    // this.imagecomparisonImageMove()
    // setInterval(() => {
    //   var testdata = {
    //     "type": "alarmList",
    //     "cam_id": "xxxxxxxx",
    //     "session": "020420230331143215980",
    //     "table_timeselectStart": "2022-05-02",
    //     "table_timeselectStop": "2022-07-02"
    //   }
    //   this.wsway.send(JSON.stringify(testdata))
    // }, 1000)
    // var loadingws = setInterval(() => {
    // if (this.stws) {
    // var w4 = this.wsway
    // w4.onmessage = (e) => {
    //   var data = JSON.parse(e.data)
    //   if (data.type === "alarmList") {
    //     console.log(data);
    //   }
    // }
    // clearInterval(loadingws)
    // }
    // }, 0)
    this.init()
  },
  methods: {
    restartbtn() {
      console.log("ssssrestart");
    },
    init() {
      var today = new Date()
      today =
        today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
      this.getlist('http://localhost:5002/api/alarm/list', today) // 初始抓取今天的警報
      this.selectRangeDate(this.value1)
      this.initKonva()
      this.initcamList()
      this.imagecomparison()
    },
    // 對照圖程式
    imagecomparison() {
      // var canvasWidth = document.getElementById(
      //   'Imagecomparison-konva'
      // ).clientWidth
      // var canvasHeight = document.getElementById(
      //   'Imagecomparison-konva'
      // ).clientHeight
      this.ImagecomparisonKonva = {
        width: 280,
        height: 210,
      }
      this.ImagecomparisonKonvaImageConfig.width = 280
      this.ImagecomparisonKonvaImageConfig.height = 210
      var image = new window.Image()
      image.src = this.image1
      image.onload = () => {
        // set image only when it is loaded
        this.ImagecomparisonKonvaImageConfig.image = image
        image = null
      }
      this.zoomin.x = 280 * 0.89
      this.zoomout.x = 210 * 0.94
      var imgeobject = this.$refs.ImagecomparisonKonva.getNode()
      imgeobject.scale({
        x: this.zoomLvl,
        y: this.zoomLvl,
      })
      imgeobject = null
    },
    imagecomparisonImageMove(e, st) {
      // console.log(e)
      var zoomLvl = this.zoomLvl // 放大級數
      var parent = e.target.getParent() // 取得點選元件的父元素
      var pos = parent.getStage().getPointerPosition() // 取得父元素的position
      if (st === 'start') {
        this.logZoomPostion[0] = pos.x
        this.logZoomPostion[1] = pos.y
        this.logZoomPostion[2] = e.target.x()
        this.logZoomPostion[3] = e.target.y()
      }
      if (st === 0) {
        e.target.scale({
          x: zoomLvl,
          y: zoomLvl,
        })
      } else if (st === 1) {
        if (this.zoomstatus && zoomLvl > 1) {
          e.target.x(this.logZoomPostion[2] - (this.logZoomPostion[0] - pos.x))
          e.target.y(this.logZoomPostion[3] - (this.logZoomPostion[1] - pos.y))
          if (e.target.x() > 0) {
            e.target.x(0)
          } else if (e.target.x() < -(parent.getStage().width() * (zoomLvl - 1))) {
            e.target.x(-(parent.getStage().width() * (zoomLvl - 1)))
          }

          if (e.target.y() > 0) {
            e.target.y(0)
          } else if (e.target.y() < -(parent.getStage().height() * (zoomLvl - 1))) {
            e.target.y(-(parent.getStage().height() * (zoomLvl - 1)))
          }
        }
      } else if (st === 2) {
        this.zoomstatus = false
      }
      zoomLvl = null
      parent = null
      pos = null
    },
    zoomfunction(e, w) {
      var transformerNode = this.$refs.ImagecomparisonKonva.getNode()
      var PW = transformerNode.getParent().width() / 2
      var PH = transformerNode.getParent().height() / 2
      var NodeX = Math.abs(transformerNode.x())
      var NodeY = Math.abs(transformerNode.y())
      var NodeWidth = transformerNode.width() * this.zoomLvl
      var NodeHeight = transformerNode.height() * this.zoomLvl
      var displayCenter = {
        x: NodeX / (NodeWidth + PW),
        y: NodeY / (NodeHeight + PH)
      }
      if (e === 0) {
        if (this.zoomLvl > 1) {
          this.zoomLvl -= 1
        }
        transformerNode.to({
          x: 0,
          y: 0,
          scaleY: this.zoomLvl, scaleX: this.zoomLvl
        })
      } else if (e === 1) {
        if (this.zoomLvl < 4) {
          this.zoomLvl += 1
          transformerNode.to({
            x: -(displayCenter.x * ((transformerNode.width() * this.zoomLvl) + PW)),
            y: -(displayCenter.y * ((transformerNode.height() * this.zoomLvl) + PH)),
            scaleY: this.zoomLvl,
            scaleX: this.zoomLvl
          })
        }
      }
      transformerNode = null
      PW = null
      PH = null
      NodeX = null
      NodeY = null
      NodeWidth = null
      NodeHeight = null
      displayCenter = null
    },
    updateSelectDate(event) {
      // this.$route.push({ path: '/' })
      this.$router.push({ query: { cam: event, main: this.$route.query.main, secondary: this.$route.query.secondary, tab: 'tab-1' } }, () => {
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
      // this.selectList = value.name
      this.cameraList = camAll
      this.selectList = this.$route.query.cam
      camAll = null
      // this.selectList = this.camlist
    },
    initKonva() {
      // 初始化相機選單
      var img = document.getElementById('image11')
      var canvasWidth = 0
      var canvasHeight = 0
      var rect1 = this.$refs.rect1.getNode()
      img.addEventListener('load', () => {
        canvasWidth = document.getElementById('image11').clientWidth
        canvasHeight = document.getElementById('image11').clientHeight
        // console.log(canvasWidth, canvasHeight)
        this.configKonva = {
          width: canvasWidth,
          height: canvasHeight,
        }
        rect1.x(canvasWidth / 2 - 32)
        rect1.y(canvasHeight / 2 - 24)
      })
      img = null
      canvasWidth = null
      canvasHeight = null
      rect1 = null
    },
    renderingRoi1(data) {
      // console.log(data)
      this.image4 = data
      document.getElementById('image4').style.background = `url(${data}) no-repeat center center`
    },
    handleDragStart1() {
      document.body.style.cursor = 'move'
    },
    handleDragEnd1() {
      document.body.style.cursor = 'auto'
    },
    // 避免kovan元素超出邊界
    handleDragMove1(e) {
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
    handleDragZoom1(e) {
      var x = e.target.x()
      var y = e.target.y()
      var width = e.target.width()
      var height = e.target.height()
      var canvasKonva = this.configKonva
      var xZoom = Math.floor(Math.abs((x / (width - canvasKonva.width) * 100)))
      var yZoom = Math.floor(Math.abs((y / (height - canvasKonva.height) * 100)))
      document.getElementById('image4').style.backgroundPosition = `${xZoom}% ${yZoom}%`
      x = null
      y = null
      width = null
      height = null
      canvasKonva = null
      xZoom = null
      yZoom = null
      // console.log(xZoom, yZoom)
    },
    // 監測項目超溫次數統計預覽圖
    renderingRoi(data) {
      // console.log(data)
      this.image2 = data
      // document.getElementById('image2').style.background = `url(${data}) no-repeat center center`
    },
    selectHeatMap(params) {
      // console.log(params);
      var url = 'http://localhost:5002/api/alarm/list' // 宣告取得警報list網址
      var dates = this.dates
      var yeast = new Date(dates)
      yeast = yeast.setDate(yeast.getDate() + 1)
      yeast = new Date(yeast)
      yeast =
        yeast.getFullYear() +
        '-' +
        (yeast.getMonth() + 1) +
        '-' +
        yeast.getDate()
      var startTime = ''
      var stopTime = ''
      if (params.lock) {
        startTime =
          dates + ' 00:00:00'
        stopTime =
          dates + ' 23:59:59'
      } else {
        startTime =
          dates + ' ' + params.data[0] + ':' + params.data[1] * 10 + ':00'
        stopTime =
          dates + ' ' + params.data[0] + ':' + (params.data[1] * 10 + 9) + ':59'
      }
      // console.log(startTime, stopTime, params.lock)
      var sendData = [
        {
          type: "alarmList",
          session: Math.random().toString(36).substr(2),
          cam_id: this.$route.query.cam,
          table_timeselectStart: dates,
          table_timeselectStop: yeast,
        },
      ]
      this.wsway.send(JSON.stringify(sendData))
      axios({
        method: 'post',
        url,
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify([
          {
            cam_id: this.$route.query.cam,
            table_timeselectStart: dates,
            table_timeselectStop: yeast,
          },
        ]),
      })
        .then((events) => {
          // console.log(events.data)
          var data = events.data
          var output = []
          var arr = []
          data.forEach((index) => {
            var datastart = new Date(startTime)
            var datastop = new Date(stopTime)
            var datatoday = new Date(index.table_alarm_start)
            if (datatoday >= datastart && datatoday <= datastop) {
              arr.push(index)
            }
          })
          arr.forEach((index, value) => {
            var start = new Date(index.table_alarm_start)
            var startDate =
              start.getFullYear() +
              '-' +
              ('0' + (start.getMonth() + 1)).slice(-2) +
              '-' +
              ('0' + start.getDate()).slice(-2)
            var startTime =
              ('0' + start.getHours()).slice(-2) +
              ':' +
              ('0' + start.getMinutes()).slice(-2) +
              ':' +
              ('0' + start.getSeconds()).slice(-2)
            var stop = null
            var ings = 'N/A'
            if (index.table_alarm_stop != null) {
              stop = new Date(index.table_alarm_stop)
              // console.log(stop.getTime() - start.getTime())
              ings = this.getDuration(
                (stop.getTime() - start.getTime()) / 1000
              )
              stop =
                ('0' + stop.getHours()).slice(-2) +
                ':' +
                ('0' + stop.getMinutes()).slice(-2) +
                ':' +
                ('0' + stop.getSeconds()).slice(-2)
            } else {
              stop = 'N/A'
            }
            output.push({
              index: value + 1,
              object_name: index.table_itemName,
              object_date: startDate,
              object_time_start: startTime,
              object_tiem_stop: stop,
              object_time_totle: ings,
              object_setting_temperature:
                index.table_alarm_threshold.toFixed(1) + '°C',
              object_temperature_max: index.table_max.toFixed(1) + '°C',
            })
          })
          this.fakeTemps = output
          output = null
          arr = null
          data = null
          dates = null
          yeast = null
          startTime = null
          stopTime = null
          url = null
        })
        .catch((e) => {
          console.log(e)
        })
    },
    selectDate1(data) {
      this.fakeTempsvalue = [{ index: 1 }]
      var date = data[1].value[0]
      // console.log(date)
      var url = 'http://localhost:5002/api/alarm/list' // 宣告取得警報list網址
      var url1 = 'http://localhost:5002/api/change/roi' // 特定時段內的所有標記區域修改紀錄網址
      this.dates = date
      // this.value1 = new Date(date)
      this.getlist(url, date) // 更新"監測項目時段超溫紀錄表"
      // this.overTemperatureTtems(url, date) // 更新"更新監測項目超溫次數統計"
      var stop = new Date(date)
      stop.setDate(stop.getDate() + 1)
      stop = `${stop.getFullYear()}-${stop.getMonth() + 1}-${stop.getDate()}`
      // console.log("sssscccc", url, date, stop);
      this.overTemperatureChangeTtems(url1, date, stop)
      date = null
      url = null
      url1 = null
    },
    tableSelect(input) {
      // console.log(input)
      if (input.length > 0) {
        var chartDom = document.getElementById('lineBarChart0001')
        var myChart = echarts.init(chartDom) // echarts初始化
        var selectedStartTime =
          input[0].object_date + ' ' + input[0].object_time_start
        var selectedStopTime = null
        if (input[0].object_tiem_stop === 'N/A') {
          selectedStopTime = new Date()
          // selectedStopTime.setMinutes(selectedStopTime.getMinutes() + 10)
          selectedStopTime =
            selectedStopTime.getFullYear() +
            '-' +
            ('0' + (selectedStopTime.getMonth() + 1)).slice(-2) +
            '-' +
            ('0' + selectedStopTime.getDate()).slice(-2) +
            ' ' +
            ('0' + selectedStopTime.getHours()).slice(-2) +
            ':' +
            ('0' + selectedStopTime.getMinutes()).slice(-2) +
            ':' +
            ('0' + selectedStopTime.getSeconds()).slice(-2)
        } else {
          // }
          var startTime = new Date(
            input[0].object_date + ' ' + input[0].object_time_start
          )
          var stopTime = new Date(
            input[0].object_date + ' ' + input[0].object_tiem_stop
          )
          var totleTime = (stopTime.getTime() - startTime.getTime()) / 1000
          selectedStopTime = new Date(selectedStartTime)
          selectedStopTime.setSeconds(
            selectedStopTime.getSeconds() + (totleTime + 1)
          )
          selectedStopTime =
            selectedStopTime.getFullYear() +
            '-' +
            ('0' + (selectedStopTime.getMonth() + 1)).slice(-2) +
            '-' +
            ('0' + selectedStopTime.getDate()).slice(-2) +
            ' ' +
            ('0' + selectedStopTime.getHours()).slice(-2) +
            ':' +
            ('0' + selectedStopTime.getMinutes()).slice(-2) +
            ':' +
            ('0' + selectedStopTime.getSeconds()).slice(-2)
        }
        // var imgblob = (data) => {
        //   var req = new XMLHttpRequest();
        //   req.open('GET', data, true);
        //   req.responseType = 'blob';
        //   req.onload = () => {
        //     if (req.status === 200) {
        //       var blob = req.response;
        //       var vid = URL.createObjectURL(blob);
        //       console.log("img load");
        //       this.image3 = vid
        //       return vid
        //     } else {
        //       console.log("img error");
        //       setTimeout(() => {
        //         imgblob(data)
        //       },1000)
        //       // 請求失敗，處理錯誤
        //     }
        //   };
        //   req.send();
        // }
        // console.log(selectedStartTime, selectedStopTime)
        axios({
          method: 'post',
          url: 'http://localhost:5002/api/alarm/max',
          headers: {
            'Content-Type': 'application/json',
          },
          data: JSON.stringify([
            {
              cam_id: this.$route.query.cam,
              table_alarm_start: selectedStartTime,
              table_alarm_stop: selectedStopTime,
            },
          ]),
        })
          .then((events) => {
            try {
              var arr = events.data
              var time = arr[0].time
              delete arr[0].time
              var data = arr[0]
              var seriesData = []
              Object.keys(data).forEach((key) => {
                var newdata = []
                data[key].forEach((value) => {
                  if (value !== null) {
                    newdata.push(value.toFixed(2))
                  } else {
                    newdata.push(value)
                  }
                })
                // console.log(data[key])
                console.log("s", key, input[0].object_name);

                var arr = {
                  type: 'line',
                  name: key,
                  yAxisIndex: 0,
                  // markLine: {
                  // symbol: ['none', 'none'],
                  //     label: { show: false },
                  //     color: 'red',
                  //     data: [{ xAxis: 1 },{ xAxis: 4 }]
                  //   },
                  data: newdata,
                  symbolSize: 1,
                  itemStyle: {
                    normal: {
                      color: key === input[0].object_name ? 'rgb(229, 138, 142)' : '#828C8F',
                    },
                  },
                }
                seriesData.push(arr)
                arr = null
                newdata = null
              })
              // var arrcler = []
              // var option = myChart.getOption();
              // var series = option.series
              // var serieslen = option.series.length
              // for (var i = 0; i < serieslen; i++) {
              //   myChart.removeSeries(i)
              // }
              // myChart.clear()
              // var runData = async (myChart ,time, seriesData) => {
              // const r = await aw();
              // console.log(r);
              myChart.setOption({
                xAxis: [
                  {
                    data: time,
                  },
                ],
                series: seriesData,
              }, { replaceMerge: ['xAxis', 'series'] })
              var settingtemp = input[0].object_setting_temperature
              settingtemp = settingtemp.replace(/°C/g, "");
              settingtemp = parseFloat(settingtemp)
              console.log(settingtemp);
              myChart.setOption({
                series: [
                  {
                    markLine: {
                      symbol: ["none", "none"],
                      label: {
                        show: false,
                      },
                      data: [
                        {
                          yAxis: settingtemp,
                          lineStyle: {
                            // type: "line",
                            type: 'dashed',
                            width: 2,
                            color: "#DE8788",
                          },
                        },
                      ],
                    },

                    type: "line",
                    smooth: true,
                    symbol: "none",
                    markArea: {
                      itemStyle: {
                        color: "rgba(240, 125, 125,0.1)",
                      },
                      data: [
                        [
                          {
                            // name: "Morning Peak",
                            yAxis: settingtemp,
                          },
                          {
                            yAxis: settingtemp + 1000,
                          },
                        ],
                      ],
                    },
                  },
                ],
              })
              settingtemp = null
              // }
              // runData(myChart, time, seriesData)


              var inteimg = setTimeout(() => {
                this.image3 = this.imageChange(selectedStartTime)
                // imgblob(this.imageChange(selectedStartTime) + "redom=" + Math.floor(Math.random() * 999999))
                // console.log("sasd", );
                console.log(inteimg);
                inteimg = null
                selectedStartTime = null
              }, 500)

              // console.log(randingimg)
              chartDom = null
              myChart = null
              arr = null
              time = null
              seriesData = null
              data = null
              selectedStopTime = null
              startTime = null
              stopTime = null
              totleTime = null
            } catch (e) {
              console.log(e)
            }
          })
          .catch((err) => console.error(err))
      }
      // function aw() {
      //   return true
      // }
    },
    selectRangeDate(date) {
      var start = new Date(date[0])
      start = `${start.getFullYear()}-${start.getMonth() + 1}-${start.getDate()}`
      var stop = new Date(date[1])
      stop.setDate(stop.getDate() + 1)
      stop = `${stop.getFullYear()}-${stop.getMonth() + 1}-${stop.getDate()}`
      var url = 'http://localhost:5002/api/alarm/list'
      this.overTemperatureTtems(url, start, stop)
      this.overTemperatureChangeTtems(url, start, stop)
      start = null
      stop = null
      url = null
    },
    overTemperatureChangeTtems(url, start, stop) {
      // var stop = new Date(date)
      // stop.setDate(stop.getDate() + 1)
      // var stopYear = stop.getFullYear()
      // var stopMonth = stop.getMonth() + 1
      // var stopDate = stop.getDate()
      // console.log(`${date}`,
      //   `${stopYear}-${stopMonth}-${stopDate}`)
      axios({
        method: 'post',
        url,
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify([
          {
            cam_id: this.$route.query.cam,
            table_timeselectStart: `${start}`,
            table_timeselectStop: `${stop}`,
          },
        ]),
      })
        .then((events) => {
          var data = events.data
          // console.log(data)

          var arr = []
          data.forEach((item) => {
            var st = item.table_change_status === 0 ? '新增' : item.table_change_status === 1 ? '刪除' : '更新'
            arr.push({
              name: item.table_itemName,
              // calories: item.table_change_start,
              calories: '2023-05-03 14:00:59',
              fat: st,
            },)
          })
          this.firstBodysForNotice = arr
          arr = null
          data = null
        })
        .catch((e) => {
          console.log(e)
        })
    },
    // 更新監測項目超溫次數統計
    overTemperatureTtems(url, start, stop) {

      var roiItem = []
      var output = []
      axios({
        method: 'post',
        url,
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify([
          {
            cam_id: this.$route.query.cam,
            table_timeselectStart: `${start}`,
            table_timeselectStop: `${stop}`,
          },
        ]),
      })
        .then((events) => {
          var totle = 0
          var data = events.data
          if (data.length > 0) {
            var firstTime = new Date(data[0].table_alarm_start)
            console.log(data, data[0].table_alarm_start, firstTime)
            this.image1 = this.imageChange(firstTime)
            const image = new window.Image()
            image.src = this.image1
            image.onload = () => {
              // set image only when it is loaded
              this.ImagecomparisonKonvaImageConfig.image = image
            }
          } else {
            this.image1 = 'EMPTYv1-fill.png'
          }
          // console.log(data)
          // 先記錄出現過的ROI
          data.forEach((index) => {
            roiItem[index.table_itemName] = []
          })
          // 重組新陣列
          Object.keys(roiItem).forEach((key) => {
            const result = data.filter(roiname => roiname.table_itemName === key);
            result.forEach((row) => {
              roiItem[key].push(row)
            })
            // 計算總數
            roiItem[key].forEach(() => {
              totle += 1
            })
          })
          // 新陣列轉換table格式
          Object.keys(roiItem).forEach((key) => {
            var thisRoiTotle = roiItem[key].length
            var carbs = (thisRoiTotle / totle) * 100
            var arr = {
              name: key,
              calories: roiItem[key][0].table_alarm_start,
              fat: roiItem[key][0].table_alarm_start,
              carbs: `${carbs.toFixed(1)}%`,
              protein: thisRoiTotle,
              secondBodys: []
            }
            roiItem[key].forEach((row) => {
              var start = new Date(row.table_alarm_start)
              var stop = new Date(row.table_alarm_stop)
              arr.secondBodys.push(
                {
                  calories: row.table_alarm_start,
                  carbs: row.table_alarm_stop === null ? '持續中' : this.getDuration((stop.getTime() - start.getTime()) / 1000),
                  protein: `${row.table_alarm_threshold.toFixed(1)}°C`,
                  iron: `${row.table_max.toFixed(1)}°C`,
                }
              )
            })
            output.push(arr)
          })
          console.log(output)
          this.firstBodys = output
          output = null
          data = null
          totle = null
          stop = null
          roiItem = null
        })
        .catch((e) => {
          console.log(e)
        })
    },
    getlist(url, Nowtime) {
      var stop = new Date(Nowtime)
      stop.setDate(stop.getDate() + 1)
      var stopYear = stop.getFullYear()
      var stopMonth = stop.getMonth() + 1
      var stopDate = stop.getDate()
      this.selected01 = []
      axios({
        method: 'post',
        url,
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify([
          {
            cam_id: this.$route.query.cam,
            table_timeselectStart: Nowtime,
            table_timeselectStop: stopYear + '-' + stopMonth + '-' + stopDate,
          },
        ]),
      })
        .then((events) => {
          var data = events.data
          var output = []

          data.forEach((index, value) => {
            var start = new Date(index.table_alarm_start)
            var startDate =
              start.getFullYear() +
              '-' +
              ('0' + (start.getMonth() + 1)).slice(-2) +
              '-' +
              ('0' + start.getDate()).slice(-2)
            var startTime =
              ('0' + start.getHours()).slice(-2) +
              ':' +
              ('0' + start.getMinutes()).slice(-2) +
              ':' +
              ('0' + start.getSeconds()).slice(-2)
            var stop = null
            var ings = 'N/A'
            if (index.table_alarm_stop != null) {
              stop = new Date(index.table_alarm_stop)
              // console.log(stop.getTime() - start.getTime())
              ings = this.getDuration((stop.getTime() - start.getTime()) / 1000)
              stop =
                ('0' + stop.getHours()).slice(-2) +
                ':' +
                ('0' + stop.getMinutes()).slice(-2) +
                ':' +
                ('0' + stop.getSeconds()).slice(-2)
            } else {
              stop = 'N/A'
            }
            output.push({
              index: value + 1,
              object_name: index.table_itemName,
              object_date: startDate,
              object_time_start: startTime,
              object_tiem_stop: stop,
              object_time_totle: ings,
              object_setting_temperature:
                index.table_alarm_threshold.toFixed(1) + '°C',
              object_temperature_max: index.table_max.toFixed(1) + '°C',
            })
          })
          this.fakeTemps = output
          output = null
          data = null
          stop = null
          stopYear = null
          stopMonth = null
          stopDate = null
        })
        .catch((e) => {
          console.log(e)
        })
    },
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
        duration = hours + '時' + minutes + '分' + seconds + '秒'
      } else if (second >= 86400) {
        duration =
          days + '天' + hours + '時' + minutes + '分' + seconds + '秒'
      }
      return duration
    },
    imageChange(oupTime) {
      // console.log(oupTime)
      // function toDataURL(url, callback) {
      //   var xhr = new XMLHttpRequest();
      //   xhr.onload = function () {
      //     var reader = new FileReader();
      //     reader.onloadend = function () {
      //       callback(reader.result);
      //     }
      //     reader.readAsDataURL(xhr.response);
      //   };
      //   xhr.open('GET', url);
      //   xhr.responseType = 'blob';
      //   xhr.send();
      // }

      var date = new Date(oupTime)
      var YMD =
        date.getFullYear() +
        ('0' + (date.getMonth() + 1)).slice(-2) +
        ('0' + date.getDate()).slice(-2)
      var YM =
        date.getFullYear() +
        ('0' + (date.getMonth() + 1)).slice(-2)
      // var YM = date.getFullYear() + ('0' + (date.getMonth() + 1)).slice(-2)
      var HMS =
        ('0' + date.getHours()).slice(-2) +
        ('0' + date.getMinutes()).slice(-2) +
        ('0' + date.getSeconds()).slice(-2)
      // toDataURL(`http://127.0.0.1:5002/api/database/share/setting%5Croisettinghistory%5Croi_setting_history_${YMD}_T${HMS}.jpg`,(base64)=>{
      //   this.image3 = base64
      // })
      // this.image3 = `http://localhost:5002/api/database/share/setting%5Croisettinghistory%5Croi_setting_history_${YMD}_T${HMS}.jpg`
      // this.image3 = `http://localhost:5002/api/database/share/alarmtemp%5C${YM}%5Calarmtemp_${YMD}_T${HMS}.jpg`
      // return `http://localhost:5002/api/database/share/alarmtemp%5C${YM}%5C${this.$route.query.cam}_alarmtemp_${YMD}_T${HMS}.jpg`
      var random1 = "?redom=" + Math.floor(Math.random() * 999999)
      return `http://localhost:5002/api/database/share/alarmtemp%5C${this.$route.query.cam}%5C${YM}%5Calarmtemp_${YMD}_T${HMS}.jpg${random1}`
      // return `http://127.0.0.1:5002/api/database/share/setting%5Croisettinghistory%5Croi_setting_history_${YMD}_T${HMS}.jpg`
      // console.log(`http://127.0.0.1:5002/api/database/share/setting%5Croisettinghistory%5Croi_setting_history_${YMD}_T${HMS}.jpg`)
      // date = null
      // YMD = null
      // HMS = null
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
.preview0zoom {
  display: flex;
  justify-content: center;
}

#image4 {
  width: 100%;
  height: 210px;
  background: url(/EMPTYv1-fill.png) no-repeat center center;
  background-position: 50% 50%;
}

.flash-image-img {
  display: flex;
  flex-direction: column;
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

.preview-cover {
  /* position: relative; */
  width: 100%;
  display: flex;
  justify-content: center;
}

.preview-cover>div {
  width: 70%;
}

#ROI-preview {
  /* position: absolute; */
  width: 100%;
  /* left: 0; */
  /* height: 0; */
  padding-bottom: 75%;
  /* background: aqua; */
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

.legend {
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

.scroll {
  /* width: 20px; */
  /* height: 200px; */
  /* overflow: auto; */
  /* float: right; */
  /* margin: 0 10px; */
}

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
.mx-input {
  font-size: 13px !important;
}

.firstHeaderscss th {
  padding-left: 0px !important;
  padding-right: 0px !important;
}

.fakeTempsHeaderscss .text-start {
  text-align: center !important;
}

.fakeTempsHeaderscss .text-start {
  padding-left: 0px !important;
  padding-right: 0px !important;
}

.fakeTempsHeaderscss .text-start>span {
  padding-left: 10px;
}

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
</style>

<style lang="scss">
.v-data-table>.v-data-table__wrapper>table>tbody>tr>td,
.v-data-table>.v-data-table__wrapper>table>thead>tr>td,
.v-data-table>.v-data-table__wrapper>table>tfoot>tr>td {
  font-size: 12px !important;
  // margin-right: 10px !important;
  padding: 0px !important;
}

.camSelect div {
  box-shadow: unset !important;
  font-size: 17px;
  color: #80898c;
}
</style>
