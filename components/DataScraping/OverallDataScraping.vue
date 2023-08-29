<template>
  <v-card flat>

    <v-card-text>

                  <!-- 刷新按鈕 -->
            <v-tooltip left class="tips">
              <template #activator="{ on, attrs }">
                <v-btn
                  small
                  icon
                  class="btn reset"
                  color="#9BA3A5"
                  v-bind="attrs"
                  v-on="on"
                >
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


                  <div style="margin-left: 20px; top: 12px; position: absolute">
        <v-btn color="#9BA3A5" rounded x-small depressed style="color:#fff"> 整體資料監測 </v-btn>
      </div>



      <v-row>
        <!-- 全局數據 -->
        <v-col cols="12" md="6">
          <v-row :column="$vuetify.breakpoint.mdAndDown">


            <v-col cols="12" lg="12" style="border: 1px solid white">
              <v-row
                class="ml-2 mt-8"
                style="
                  border: 3px solid #f1f1f1;
                  border-radius: 10px;
                  margin-right: -2px;
                "
              >
                <v-col cols="12" md="12">
                  <h3 class="cardtitle ml-3" style="position: absolute">
                    全局數據
                  </h3>
                  <h4 class="cardtitle ml-3 mt-7" style="position: absolute">
                    2022/01~2022/12 資料紀錄
                  </h4>

                  <DonutChartForOverallLeft />
                  <!-- <v-btn
                  @click="changeTab()"
                    color="#37484C"
                    depressed
                    elevation="2"
                    style="
                      position: absolute;
                      bottom: 30px;
                      right: 900px;
                      color: white;
                    "
                    >查看更多</v-btn
                  > -->
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
<!-- 指定數據 -->
        <v-col cols="12" md="6">
          <v-row :column="$vuetify.breakpoint.mdAndDown">
            <!-- 右上畫面顯示----------------------------------------------------------------------------------------------- -->
            <!-- <v-col cols="12" lg="12"> -->
            <v-col cols="12" lg="12" style="border: 1px solid white">
              <v-row
                class="mr-2 mt-8"
                style="
                  border: 3px solid #f1f1f1;
                  border-radius: 10px;
                  margin-left: -2px;
                "
              >
                <v-col cols="12" md="12">
                  <h3 class="cardtitle ml-3" style="position: absolute">
                    指定數據
                  </h3>
                  <h4 class="cardtitle ml-3 mt-7" style="position: absolute">
                    2022/01~2022/12 資料紀錄
                  </h4>
                  <DonutChartForAssignRight />
                  <!-- <v-btn
                  @click="changeTab()"
                    color="#37484C"
                    depressed
                    elevation="2"
                    style="
                      position: absolute;
                      bottom: 30px;
                      right: 50px;
                      color: white;
                    "
                    >查看更多</v-btn
                  > -->
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
// echarts引入
// import DonutChart1 from './DonutChart/DonutChart1.vue'
// import DonutChart2 from './DonutChart2.vue'
// import HeatMap2 from './HeatMap2.vue'
// import MonthHeatMap1 from './MonthHeatMap/MonthHeatMap1.vue'
// import MonthHeatMap2 from './MonthHeatMap/MonthHeatMap2.vue'
// import MonthHeatMap3 from './MonthHeatMap/MonthHeatMap3.vue'
// import MonthHeatMap4 from './MonthHeatMap/MonthHeatMap4.vue'
// import MonthHeatMap5 from './MonthHeatMap/MonthHeatMap5.vue'
// import MonthHeatMap6 from './MonthHeatMap/MonthHeatMap6.vue'
// import MonthHeatMap7 from './MonthHeatMap/MonthHeatMap7.vue'
// import MonthHeatMap8 from './MonthHeatMap/MonthHeatMap8.vue'
// import MonthHeatMap9 from './MonthHeatMap/MonthHeatMap9.vue'
// import MonthHeatMap10 from './MonthHeatMap/MonthHeatMap10.vue'
// import MonthHeatMap11 from './MonthHeatMap/MonthHeatMap11.vue'
// import MonthHeatMap12 from './MonthHeatMap/MonthHeatMap12.vue'
// import LineBarChart from './LineBarChart/LineBarChart.vue'
import DonutChartForOverallLeft from './DonutChart/DonutChartForOverallLeft.vue'
import DonutChartForAssignRight from './DonutChart/DonutChartForAssignRight.vue'

export default {
  // echarts引入
  components: {
    // DonutChart1,
    // DonutChart2,
    // HeatMap2,
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
    // LineBarChart,
    DonutChartForOverallLeft,
    DonutChartForAssignRight,
  },
  name: 'IndexPage',
  head: {
    title: '即時監控',
    link: [
      // { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: 'stylesheet', href: '/css/jquery-ui.css' },
      { rel: 'stylesheet', href: '/css/object.css' },
      { rel: 'stylesheet', href: '/css/card3.css' },
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
    },
    items: [
      {
        text: '整體資料監測',
        disabled: true,
        href: '../DataScrapingPage',
      },
      //   {
      //     text: '全局數據',
      //     disabled: false,
      //     href: 'breadcrumbs_link_2',
      //   },
      //   {
      //     text: '年度資料完成度',
      //     disabled: true,
      //     href: '../DataScrapingPage',
      //   },
      // {
      //   text: '當月資料完成度',
      //   disabled: false,
      //   href: 'breadcrumbs_link_2',
      // },
    ],
  }),

  mounted() {
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
  },
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

.text-color >>> .v-text-field__slot input {
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
  top:0.5em;
  position: absolute;
}
</style>
