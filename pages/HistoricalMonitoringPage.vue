<template>
  <div class="fluid mt-3">
    <v-img class="bgimg" src="bgimg.png" height="93.2vh" />

    <v-row>
      <!-- 左測選項----------------------------------------------------------------------------------------------- -->
      <v-col cols="12" md="12">
        <!-- <v-col cols="12" md="7" style="border: 1px solid red"> -->
        <v-card class="mt-3 mx-6" rounded="md" elevation="6" height="51.55em">
          <v-tabs vertical slider-size="3" color="#37484C" background-color="#f1f1f1" height="51.55em" v-model="tab">
            <!-- <v-tab :to="`/?cam=${$route.query.cam}&main=${$route.query.main}&tab=tab-2&secondary=${$route.query.secondary}`"> -->
            <v-tab @click="toindex">
            <!-- <v-tab :to="`/`"> -->
              <!-- <img class="" alt="" src="/data_scraping/data.png" width="14em" /> -->
              <img class="" alt="line" src="/images/arrow-right.png" width="20em" />
              <p>&nbsp;&nbsp;</p>
              返回相機畫面
            </v-tab>
            <v-tab href="#tab-1" style="font-size: 15px; justify-content: left">
              <img class="" alt="" src="/data_scraping/data.png" width="14em" />
              <p>&nbsp;&nbsp;</p>
              警報狀況
            </v-tab>

            <v-tab href="#tab-2" style="font-size: 15px; justify-content: left">
              <img class="" alt="" src="/data_scraping/data.png" width="14em" />
              <p>&nbsp;&nbsp;</p>
              溫度分佈
            </v-tab>

            <v-tab-item value="tab-1">
              <no-ssr>
                <template v-if="pagerestart">
                  <AlertCondition :camlist="camList" @custom-event="restartPage" />
                </template>
                <template v-else>
                  <div>{{ restartMessage }}</div>
                  <v-sheet class="pa-3">
                    <v-skeleton-loader type="card@3"></v-skeleton-loader>
                  </v-sheet>
                </template>
              </no-ssr>
            </v-tab-item>

            <v-tab-item value="tab-2">
              <no-ssr>
                <template v-if="pagerestart">
                  <TemperatureDistribution2 :camlist="camList" @custom-event="restartPage" />
                </template>
                <template v-else>
                  <div>{{ restartMessage }}</div>
                  <v-sheet class="pa-3">
                    <v-skeleton-loader type="card@3"></v-skeleton-loader>
                  </v-sheet>
                </template>
              </no-ssr>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// echarts引入
import axios from 'axios'
import AlertCondition from '../components/HistoricalMonitoring/AlertCondition.vue'
import TemperatureDistribution2 from '../components/HistoricalMonitoring/TemperatureDistribution2.vue'

export default {
  // echarts引入
  components: {
    AlertCondition,
    TemperatureDistribution2,
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
      // {
      //   src: '/js/jquery.js',
      //   type: 'text/javascript',
      // },
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
    tab: null,
    // tab: 'null',
    camList: [],
    ws4: null,
    wsblock: true,
    ws4st: false,
    pagerestart: true,
    restartMessage: ''
  }),
  mounted() {
    // this.connectTOWayWS() // 20230419註解 備份
    this.tab = this.$route.query.tab
    this.getCameraList()
    // setTimeout(() => {
    //   this.tab = 'tab-2'
    // },1000)
  },
  methods: {
    restartPage() {
      // console.log("restart test");
      this.pagerestart = false
      this.restartMessage = '清除暫存資訊..'
      var es = setTimeout(() => {
        this.restartMessage = '載入資訊中....'
        clearTimeout(es)
        es = null
        var es1 = setTimeout(() => {
          this.restartMessage = '切換相機中......'
          clearTimeout(es1)
          es1 = null
          var es2 = setTimeout(() => {
            this.restartMessage = '載入中........'
            clearTimeout(es2)
            es2 = null
            var es3 = setTimeout(() => {
              this.pagerestart = true
              clearTimeout(es3)
              es3 = null
            }, 1000)
          }, 500)
        }, 300)
      }, 300)
    },
    toindex() {
      this.$router.push({ path: '/', query: { cam: this.$route.query.cam, main: this.$route.query.main, secondary: this.$route.query.secondary, tab: 'tab-2' } }, () => {
        // window.location.reload()
      })
    },
    // connectTOWayWS() {
    //   this.ws4 = new WebSocket('ws://localhost:8703')
    //   this.ws4.onopen = (e) => {
    //     console.log('開啟雙向WebScoket')
    //     this.ws4st = true
    //   }
    //   this.ws4.onclose = (e) => {
    //     console.log('雙向WebScoket 斷線')
    //     if (this.wsblock) {
    //       setTimeout(() => {
    //         console.log('雙向WebScoket 重新建立連結');
    //         this.connectTOWayWS()
    //       }, 3000)
    //     }
    //   }
    // },
    getCameraList() {
      axios({
        method: 'post',
        url: 'http://127.0.0.1:5001/api/monitor/camera/list',
        // url: 'http://127.0.0.1:6189/api/monitor/camera/list',
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify([
          {
            main: this.$route.query.main,
            secondary: this.$route.query.secondary,
          },
        ]),
      })
        .then((params) => {
          // console.log(params.data)
          this.camList = params.data
        })
        .catch((err) => console.log(err))
    },
  },
  beforeDestroy() {
    this.wsblock = false
    if (this.ws4 !== null) {
      this.ws4.close()
      this.ws4 = null
    }
    for (var key in this.$data) {
      // console.log("remove : " + [key]);
      this[key] = null;
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
