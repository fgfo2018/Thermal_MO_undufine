<template>
  <div class="fluid mt-3">
    <v-img class="bgimg" src="bgimg.png" height="93.2vh" />

    <v-row>
      <!-- 左測選項----------------------------------------------------------------------------------------------- -->
      <v-col cols="12" md="12">
        <!-- <v-col cols="12" md="7" style="border: 1px solid red"> -->
        <v-card class="mt-3 mx-6" rounded="md" elevation="6" height="51.55em">
          <v-tabs
            vertical
            slider-size="3"
            color="#37484C"
            background-color="#f1f1f1"
            height="51.55em"
            v-model="tab"
          >
            <v-tab
              disabled
              style="
                font-size: 15px;
                justify-content: left;
                color: black;
                font-weight: 900;
              "
            >
              <img class="" alt="" src="/data_scraping/data.png" width="14em" />
              <p>&nbsp;&nbsp;</p>
              異常分析
            </v-tab>

            <v-tab href="#tab-2" style="font-size: 9px; height: 26px">
              <!-- <img class="" alt="" src="/data_scraping/data.png" width="14em" /> -->
              <!-- <v-icon>mdi-menu-right</v-icon> -->
              區域異常統計
            </v-tab>

            <v-tab href="#tab-3" style="font-size: 9px; height: 26px">
              <!-- <img class="" alt="" src="/data_scraping/data.png" width="14em" /> -->
              <!-- <v-icon>mdi-circle-medium</v-icon> -->
              異常元件統計
            </v-tab>

            <v-tab href="#tab-4" style="font-size: 9px; height: 26px">
              <!-- <img class="" alt="" src="/data_scraping/data.png" width="14em" /> -->
              <!-- <v-icon>mdi-menu-right</v-icon> -->
              異常元件影像分析
            </v-tab>

            <v-tab href="#tab-5" style="font-size: 9px; height: 26px">
              <!-- <img class="" alt="" src="/data_scraping/data.png" width="14em" /> -->
              <!-- <v-icon>mdi-menu-right</v-icon> -->
              年度資料完成度
            </v-tab>

            <v-tab-item> </v-tab-item>
            <v-tab-item value="tab-2">
              <ErrorOnArea />
            </v-tab-item>
            <v-tab-item value="tab-3"><ErrorOnCompo/></v-tab-item>
            <v-tab-item value="tab-4"><ErrorOnCompoImg/></v-tab-item>
            <v-tab-item value="tab-5"><ErrorOnCompoSingleImg/></v-tab-item>
          </v-tabs>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ErrorOnArea from '../components/In-depthAnalysis/ErrorOnArea.vue'
import ErrorOnCompo from '../components/In-depthAnalysis/ErrorOnCompo.vue'
import ErrorOnCompoImg from '../components/In-depthAnalysis/ErrorOnCompoImg.vue'
import ErrorOnCompoSingleImg from '../components/In-depthAnalysis/ErrorOnCompoSingleImg.vue'

export default {
  components: {
    ErrorOnArea,
    ErrorOnCompo,
    ErrorOnCompoImg,
    ErrorOnCompoSingleImg,
  },
  data: () => ({
    options: {
      loop: false,
      perPage: 3,
      paginationEnabled: false,
    },
    tab: 'tab-1',
  }),
  name: 'In-depthAnalysis',
}
</script>

<style>
.bgimg {
  position: absolute;
}
</style>
