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
        <v-btn rounded x-small depressed style="color: #9ba3a5">
          整體資料監測
        </v-btn>
        <span style="font-size: 18px">&raquo;</span>
        <v-btn rounded x-small depressed style="color: #9ba3a5">
          指定數據: 年度資料完成度
        </v-btn>
        <span style="font-size: 18px">&raquo;</span>
        <v-btn color="#9BA3A5" rounded x-small depressed style="color: #fff">
          指定數據: 當月資料完成度
        </v-btn>
      </div>

      <v-row>
        <v-col cols="12" md="12">
          <v-row :column="$vuetify.breakpoint.mdAndDown">
            <!-- (上)----------------------------------------------------------------------------------------------- -->
            <!-- <v-col cols="12" lg="12"> -->

            <v-col cols="12" lg="12">
              <v-row
                class="mx-2 mt-8"
                style="border: 3px solid #f1f1f1; border-radius: 10px"
              >
                <v-col cols="12" md="3">
                  <v-row :column="$vuetify.breakpoint.mdAndDown">
                    <!-- (上)圓餅圖:當月資料完成度----------------------------------------------------------------------------------------------- -->
                    <!-- <v-col cols="12" lg="12"> -->
                    <v-col
                      cols="12"
                      lg="12"
                      style="
                        border: 1px solid rgba(0, 0, 0, 0);
                        border-radius: 5px;
                      "
                    >
                      <h4 class="cardtitle ml-3" style="position: absolute">
                        當月資料完成度
                      </h4>
                      <donut-chart-1 />
                    </v-col>
                  </v-row>
                </v-col>

                <v-col cols="12" md="9">
                  <v-row :column="$vuetify.breakpoint.mdAndDown">
                    <!-- ------------------------------------------------------------------------------------------------- -->
                    <!-- <v-col cols="12" lg="12"> -->
                    <v-col
                      cols="12"
                      lg="12"
                      style="border: 1px solid rgba(0, 0, 0, 0)"
                    >
                      <div class="legend">
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
                      </div>
                      <h4 class="cardtitle ml-3">當月資料紀錄</h4>
                      <v-row class="ma-3">
                        <v-col cols="12" md="3">
                          <v-row :column="$vuetify.breakpoint.mdAndDown">
                            <!-- (上)(已選中)當月熱力圖展示----------------------------------------------------------------------------------------------- -->
                            <!-- <v-col cols="12" lg="12"> -->
                            <v-col
                              cols="12"
                              lg="12"
                              style="border: 1px solid rgba(0, 0, 0, 0)"
                            >
                              <month-heat-map-1 style="margin-top: 10px" />
                            </v-col>
                          </v-row>
                        </v-col>

                        <v-col cols="12" md="9">
                          <v-row :column="$vuetify.breakpoint.mdAndDown">
                            <!-- (上)(輪播)當月熱力圖顯示----------------------------------------------------------------------------------------------- -->
                            <!-- <v-col cols="12" lg="12"> -->
                            <v-col
                              cols="12"
                              lg="12"
                              style="border: 1px solid rgba(0, 0, 0, 0)"
                            >
                                  <div class="carousel-wrapper">
                                    <VueSlickCarousel v-bind="slickOptions">
                                      <div class="img-wrapper">
                                        <MonthHeatMap1 />
                                      </div>

                                      <div class="img-wrapper">
                                        <MonthHeatMap2 />
                                      </div>

                                      <div class="img-wrapper">
                                        <MonthHeatMap3 />
                                      </div>

                                      <div class="img-wrapper">
                                        <MonthHeatMap4 />
                                      </div>

                                      <div class="img-wrapper">
                                        <MonthHeatMap5 />
                                      </div>

                                      <div class="img-wrapper">
                                        <MonthHeatMap6 />
                                      </div>

                                      <div class="img-wrapper">
                                        <MonthHeatMap7 />
                                      </div>

                                      <div class="img-wrapper">
                                        <MonthHeatMap8 />
                                      </div>

                                      <div class="img-wrapper">
                                        <MonthHeatMap9 />
                                      </div>

                                      <div class="img-wrapper">
                                        <MonthHeatMap10 />
                                      </div>

                                      <div class="img-wrapper">
                                        <MonthHeatMap11 />
                                      </div>

                                      <div class="img-wrapper">
                                        <MonthHeatMap12 />
                                      </div>
                                    </VueSlickCarousel>
                                  </div>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" md="12">
          <v-row :column="$vuetify.breakpoint.mdAndDown">
            <!-- (下)----------------------------------------------------------------------------------------------- -->
            <!-- <v-col cols="12" lg="12"> -->
            <v-col cols="12" lg="12">
              <v-row
                class="mx-2 mt-2"
                style="border: 3px solid #f1f1f1; border-radius: 10px"
              >
                <v-col cols="12" md="3">
                  <v-row :column="$vuetify.breakpoint.mdAndDown">
                    <!-- (下)圓餅圖:當日資料完成度 ----------------------------------------------------------------------------------------------- -->
                    <!-- <v-col cols="12" lg="12"> -->
                    <v-col
                      cols="12"
                      lg="12"
                      style="
                        border: 1px solid rgba(0, 0, 0, 0);
                        border-radius: 5px;
                      "
                    >
                      <h4 class="cardtitle ml-3" style="position: absolute">
                        當日資料完成度
                      </h4>

                      <donut-chart-2 />
                    </v-col>
                  </v-row>
                </v-col>

                <v-col cols="12" md="9">
                  <v-row :column="$vuetify.breakpoint.mdAndDown">
                    <!-- ----------------------------------------------------------------------------------------------- -->
                    <v-col
                      cols="12"
                      lg="12"
                      style="border: 1px solid rgba(0, 0, 0, 0)"
                    >
                      <div class="legend">
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
                      </div>
                      <h4 class="cardtitle ml-3">
                        當日資料紀錄<span class="faketime">2022-4-12</span>
                      </h4>
                      <v-row class="ma-3">
                        <v-col cols="12" md="12">
                          <v-row :column="$vuetify.breakpoint.mdAndDown">
                            <!-- (下)當日熱力圖顯示----------------------------------------------------------------------------------------------- -->
                            <v-col
                              cols="12"
                              lg="12"
                              style="border: 1px solid rgba(0, 0, 0, 0)"
                            >
                              <DayHeatMap />
                              <p class="xcoordinates">(min)</p>
                              <p class="ycoordinates">(hr)</p>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
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
import DonutChart1 from './DonutChart/DonutChart1.vue'
import DonutChart2 from './DonutChart/DonutChart2.vue'
import DayHeatMap from './DayHeatMap/DayHeatMap.vue'
import MonthHeatMap1 from './MonthHeatMap/MonthHeatMap1.vue'
import MonthHeatMap2 from './MonthHeatMap/MonthHeatMap2.vue'
import MonthHeatMap3 from './MonthHeatMap/MonthHeatMap3.vue'
import MonthHeatMap4 from './MonthHeatMap/MonthHeatMap4.vue'
import MonthHeatMap5 from './MonthHeatMap/MonthHeatMap5.vue'
import MonthHeatMap6 from './MonthHeatMap/MonthHeatMap6.vue'
import MonthHeatMap7 from './MonthHeatMap/MonthHeatMap7.vue'
import MonthHeatMap8 from './MonthHeatMap/MonthHeatMap8.vue'
import MonthHeatMap9 from './MonthHeatMap/MonthHeatMap9.vue'
import MonthHeatMap10 from './MonthHeatMap/MonthHeatMap10.vue'
import MonthHeatMap11 from './MonthHeatMap/MonthHeatMap11.vue'
import MonthHeatMap12 from './MonthHeatMap/MonthHeatMap12.vue'
// import LineAndBarChart2022vs2021 from '../components/DataScraping/LineAndBarChart/LineAndBarChart2022vs2021.vue'

export default {
  // echarts引入
  components: {
    DonutChart1,
    DonutChart2,
    DayHeatMap,
    MonthHeatMap1,
    MonthHeatMap2,
    MonthHeatMap3,
    MonthHeatMap4,
    MonthHeatMap5,
    MonthHeatMap6,
    MonthHeatMap7,
    MonthHeatMap8,
    MonthHeatMap9,
    MonthHeatMap10,
    MonthHeatMap11,
    MonthHeatMap12,
    // LineAndBarChart2022vs2021,
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
      slickOptions: {
        slidesToShow: 3,
        arrows: false,
        // slidesToScroll: 3,
        // centerMode: true,
        // dots: true,
        // focusOnSelect: true,
        // touchThreshold: 3,
        swipeToSlide: true,
      },
    items: [
      {
        text: '整體資料監測',
        disabled: true,
        href: 'breadcrumbs_link_2',
      },
      {
        text: '指定數據: 年度資料完成度',
        disabled: true,
        href: 'breadcrumbs_link_2',
      },
      {
        text: '指定數據: 當月資料完成度',
        disabled: true,
        href: 'breadcrumbs_link_2',
      },
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
  top: 0.5em;
  position: absolute;
  float: right;
  margin-top: 0.5em;
  margin-right: 0.5em;
}
</style>
