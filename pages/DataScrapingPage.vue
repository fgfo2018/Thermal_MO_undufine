<template>
  <div class="fluid mt-3">
    <v-img class="bgimg" src="bgimg.png" height="93.2vh" />

    <v-row>
      <!-- 左測選項----------------------------------------------------------------------------------------------- -->
      <v-col cols="12" md="12">
        <!-- <v-col cols="12" md="7" style="border: 1px solid red"> -->
        <v-card class="mt-3 mx-6" rounded="md" elevation="6" height="51.55em">
          <v-tabs vertical slider-size="3" color="#37484C" background-color="#f1f1f1" height="51.55em" v-model="tab">
            <v-tab href="#tab-1" style="font-size: 15px; justify-content: left">
              <img class="" alt="" src="/data_scraping/data.png" width="14em" />
              <p>&nbsp;&nbsp;</p>
              整體資料監測
            </v-tab>

            <v-tab disabled style="
                font-size: 15px;
                justify-content: left;
                color: black;
                font-weight: 900;
              ">
              <img class="" alt="" src="/data_scraping/data.png" width="14em" />
              <p>&nbsp;&nbsp;</p>
              全局數據
            </v-tab>

            <v-tab href="#tab-2" style="font-size: 9px; height: 26px">
              <!-- <img class="" alt="" src="/data_scraping/data.png" width="14em" /> -->
              <!-- <v-icon>mdi-menu-right</v-icon> -->
              年度資料完成度
            </v-tab>

            <v-tab href="#tab-3" style="font-size: 9px; height: 26px">
              <!-- <img class="" alt="" src="/data_scraping/data.png" width="14em" /> -->
              <!-- <v-icon>mdi-circle-medium</v-icon> -->
              當月資料完成度
            </v-tab>

            <v-tab disabled style="
                font-size: 15px;
                justify-content: left;
                color: black;
                font-weight: 900;
              ">
              <img class="" alt="" src="/data_scraping/data.png" width="14em" />
              <p>&nbsp;&nbsp;</p>
              指定數據
            </v-tab>

            <v-tab href="#tab-4" style="font-size: 9px; height: 26px">
              <!-- <img class="" alt="" src="/data_scraping/data.png" width="14em" /> -->
              <!-- <v-icon>mdi-menu-right</v-icon> -->
              年度資料完成度
            </v-tab>

            <v-tab href="#tab-5" style="font-size: 9px; height: 26px">
              <!-- <img class="" alt="" src="/data_scraping/data.png" width="14em" /> -->
              <!-- <v-icon>mdi-circle-medium</v-icon> -->
              當月資料完成度
            </v-tab>

            <v-tab-item value="tab-1">
              <OverallDataScraping />
              <div>
                <v-img max-width="30em" class="place-image" src="data_scraping/img/globalData.png" />
              </div>
              <v-btn icon class="hoverimg1" style="position: absolute; bottom: 30px; left: 50px">
                <v-icon large>mdi-information-outline</v-icon>
              </v-btn>
              <div>
                <v-img max-width="30em" class="place-image2" src="data_scraping/img/roiData.png" />
              </div>
              <v-btn icon class="hoverimg2" style="position: absolute; bottom: 30px; right: 780px">
                <v-icon large>mdi-information-outline</v-icon>
              </v-btn>

              <v-btn @click="changeTabToGlobalData()" color="#37484C" depressed elevation="2" style="
                  position: absolute;
                  bottom: 30px;
                  right: 900px;
                  color: white;
                ">查看更多</v-btn>
              <v-btn @click="changeTabToSpecifiedData()" color="#37484C" depressed elevation="2" style="
                  position: absolute;
                  bottom: 30px;
                  right: 50px;
                  color: white;
                ">查看更多</v-btn>
            </v-tab-item>
            <v-tab-item> </v-tab-item>
            <v-tab-item value="tab-2">
              <completion-of-the-year />
            </v-tab-item>
            <v-tab-item value="tab-3">
              <completion-of-the-month />
            </v-tab-item>
            <v-tab-item> </v-tab-item>
            <v-tab-item value="tab-4">
              <completion-of-the-year-2 />
            </v-tab-item>
            <v-tab-item value="tab-5">
              <completion-of-the-month-2 />
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// echarts引入
// import DonutChart1 from '../components/DataScraping/DonutChart1.vue'
// import DonutChart2 from '../components/DataScraping/DonutChart2.vue'
// import HeatMap2 from '../components/DataScraping/HeatMap2.vue'
// import MonthHeatMap1 from '../components/DataScraping/MonthHeatMap/MonthHeatMap1.vue'
// import MonthHeatMap2 from '../components/DataScraping/MonthHeatMap/MonthHeatMap2.vue'
// import MonthHeatMap3 from '../components/DataScraping/MonthHeatMap/MonthHeatMap3.vue'
// import MonthHeatMap4 from '../components/DataScraping/MonthHeatMap/MonthHeatMap4.vue'
// import MonthHeatMap5 from '../components/DataScraping/MonthHeatMap/MonthHeatMap5.vue'
// import MonthHeatMap6 from '../components/DataScraping/MonthHeatMap/MonthHeatMap6.vue'
// import MonthHeatMap7 from '../components/DataScraping/MonthHeatMap/MonthHeatMap7.vue'
// import MonthHeatMap8 from '../components/DataScraping/MonthHeatMap/MonthHeatMap8.vue'
// import MonthHeatMap9 from '../components/DataScraping/MonthHeatMap/MonthHeatMap9.vue'
// import MonthHeatMap10 from '../components/DataScraping/MonthHeatMap/MonthHeatMap10.vue'
// import MonthHeatMap11 from '../components/DataScraping/MonthHeatMap/MonthHeatMap11.vue'
// import MonthHeatMap12 from '../components/DataScraping/MonthHeatMap/MonthHeatMap12.vue'
// import LineAndBarChart2022vs2021 from '../components/DataScraping/LineAndBarChart/LineAndBarChart2022vs2021.vue'
import CompletionOfTheMonth from '../components/DataScraping/CompletionOfTheMonth.vue'
import CompletionOfTheMonth2 from '../components/DataScraping/CompletionOfTheMonth2.vue'
import CompletionOfTheYear from '../components/DataScraping/CompletionOfTheYear.vue'
import CompletionOfTheYear2 from '../components/DataScraping/CompletionOfTheYear2.vue'
import OverallDataScraping from '../components/DataScraping/OverallDataScraping.vue'

export default {
  // echarts引入
  components: {
    // HeatMap2,
    // DonutChart1,
    // DonutChart2,
    // MonthHeatMap1,
    // MonthHeatMap2,
    // MonthHeatMap3,
    // MonthHeatMap4,
    // MonthHeatMap5,
    // MonthHeatMap6,
    // MonthHeatMap7,
    // MonthHeatMap8,
    // MonthHeatMap9,
    // MonthHeatMap10,
    // MonthHeatMap11,
    // MonthHeatMap12,
    // LineAndBarChart2022vs2021,
    CompletionOfTheMonth,
    CompletionOfTheYear,
    OverallDataScraping,
    CompletionOfTheMonth2,
    CompletionOfTheYear2,
  },
  name: 'IndexPage',
  head: {
    title: '即時監控',
    link: [
      // { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: 'stylesheet', href: '/css/jquery-ui.css' },
      { rel: 'stylesheet', href: '/css/object.css' },
      { rel: 'stylesheet', href: '/css/card3.css' },
      { rel: 'stylesheet', href: 'css/details.css' },
    ],
    script: [
      {
        src: '/js/jquery.js',
        type: 'text/javascript',
      },
      {
        src: '/js/jquery-ui.js',
        type: 'text/javascript',
      },
      {
        src: '/js/jquery-collision.js',
        type: 'text/javascript',
      },
      // {
      //   src: '/js/object.js',
      //   type: 'text/javascript',
      // },
    ],
  },
  data: () => ({
    options: {
      loop: false,
      perPage: 3,
      paginationEnabled: false,
      ws4: null
    },
    tab: 'tab-1',
    ws4Data: null,
    wsListener1: {
      close: null,
      message: null
    },
    outTimeID: null,
  }),
  methods: {
    getData() {
      var openwebsocket01 = () => {
        if (this.$myPlugin.webSocketconnect03().readyState === 1) {
          if (this.outTimeID !== null) {
            clearTimeout(this.outTimeID)
            this.outTimeID = null
          }
          this.ws4 = this.$myPlugin.webSocketconnect03()
          console.log('成功建立雙向連接')
          this.ws4.send(JSON.stringify(
            {
              "type": "DataScrapingPage",
              "method": "query",
              "session": "020420230331143215980",
              "params": {}
            }
          ))
          if (this.wsListener1.close !== null) {
            this.ws4.removeEventListener("close", this.wsListener1.close)
            this.wsListener1.close = null
          }
          var colseEvent = () => {
            setTimeout(() => {
              openwebsocket01()
            }, 1000)
          }
          this.ws4.addEventListener("close", colseEvent)
          this.wsListener1.close = colseEvent
          var messageEvent = (e) => {
            var data = JSON.parse(e.data)
            if (data.type === 'DataScrapingPage') {
              console.log(data);
            }
            data = null
          }
          this.ws4.addEventListener("message", messageEvent)
          this.wsListener1.message = messageEvent
        } if (this.$myPlugin.webSocketconnect03().readyState !== 1) {
          this.outTimeID = setTimeout(() => {
            openwebsocket01()
          }, 1000)
        }
      }
      openwebsocket01()
      // this.ws4 = new WebSocket('ws://localhost:8703')
      // this.ws4.onopen = () => {
      //   console.log('成功建立雙向連接')
      //   this.ws4.send(JSON.stringify(
      //     {
      //       "type": "DataScrapingPage",
      //       "method": "query",
      //       "session": "020420230331143215980",
      //       "params": {}
      //     }
      //   ))
      // }
      // this.ws4.onclose = () => {
      //   console.log('雙向連接斷開，3秒後重新建立連接...')
      //   setTimeout(() => {
      //     console.log('雙向重新連接中...')
      //     this.getData()
      //   }, 3000)
      // }
      // this.ws4.onmessage = (e) => {
      //   var data = JSON.parse(e.data)
      //   if (data.type === 'DataScrapingPage') {
      //     console.log(data);
      //   }
      // }
    },
    // 查看更多
    changeTabToGlobalData() {
      this.tab = 'tab-2'
    },
    changeTabToSpecifiedData() {
      this.tab = 'tab-4'
    },
  },
  mounted() {
    this.getData()
    // this.tab = this.$route.query.tab
    // setTimeout(() => {
    //   this.$router.push({ query: { tab: 'tab-1' } }, () => {
    //     window.location.reload()
    //   })
    // },3000)
    const unthumb = document.querySelectorAll('.thumb')
    for (const unthumbs of unthumb) {
      unthumbs.onclick = function (e) {
        // console.log(e.target.src);
        // console.log(e.target.getAttribute("src"));
        const newImg = e.target.src // 絕對連結
        // let newImg = e.target.getAttribute("src");  // getAttribute取得屬性 e.g. src //相對連結
        document.querySelector('.pic').setAttribute('src', newImg) // 取得這個pic之後，去設定他的scr屬性值是newImg(我點選時所得到的），你要設定的屬性是誰
        for (const th of this.thumb) {
          th.classList.remove('active')
        }
        e.target.classList.add('active')
      }
    }
    $('.hoverimg1').hover(
      function () {
        $('.place-image').fadeIn('slow')
      },
      function () {
        $('.place-image').fadeOut('slow')
      }
    )

    $('.hoverimg2').hover(
      function () {
        $('.place-image2').fadeIn('slow')
      },
      function () {
        $('.place-image2').fadeOut('slow')
      }
    )
  },
  beforeDestroy() {
    if(this.outTimeID !== null) {
      clearTimeout(this.outTimeID)
      this.outTimeID = null
    }
    if (this.wsListener1.close !== null) {
      this.ws4.removeEventListener("close", this.wsListener1.close)
      this.wsListener1.close = null
    }
    if (this.wsListener1.message !== null) {
      this.ws4.removeEventListener("message", this.wsListener1.message)
      this.wsListener1.message = null
    }
    if (this.ws4 !== null) {
      // this.ws4.close()
      this.ws4 = null
    }
  }
}
</script>
<style scoped>
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

// 熱圖影像
.place-image {
  display: none;
  position: absolute;
  // width: 126px;
  // z-index: 9999;
  bottom: 80px;
  left: 100px;
}

.place-image2 {
  display: none;
  position: absolute;
  // width: 126px;
  // z-index: 9999;
  bottom: 80px;
  right: 290px;
}
</style>
