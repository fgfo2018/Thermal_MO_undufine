<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="9">
        <v-row>
          <v-col v-for="(item, index) in rtspLists" :key="index" cols="2">
            <div>
              <img
                src="/loadingBG.png"
                :id="'rtsp-img' + index"
                class="rtpsimg"
                width="100%"
              />
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="3">
        <v-row>
          <v-col cols="7">
            <v-text-field
              v-model="CameraIP"
              label="Camera URL(RTSP)"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="5">
            <v-text-field
              v-model="proxy"
              label="代理網址(可選)"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <template v-if="this.$auth.hasScope('admin')">
              <v-btn @click="cameraadd">新增</v-btn>
              <v-btn @click="startStream1">start stream</v-btn>
              <v-btn @click="streamStop">stop stream</v-btn>
            </template>
          </v-col>
          <v-col cols="12">
            <div>permission:{{ this.$auth.hasScope('admin') }}</div>
            <v-data-table
              dense
              :headers="headers"
              :items="desserts"
              item-key="name"
              class="elevation-1"
              hide-default-footer
              disable-pagination
            ></v-data-table>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
// import * as echarts from 'echarts'
import axios from 'axios'
export default {
  name: 'HistoricalMonitoringPage',
  beforeCreate() {
    if (!this.$auth.hasScope('admin')) {
      this.$router.push('/')
    }
  },
  data: () => ({
    rtspLists: [],
    CameraIP: 'rtsp://192.168.0.138/avc', // 輸入框
    proxy: null, // 輸入框
    CameraName: null,
    CameraFps: null,
    rtsp: [],
    desserts: [],
    headers: [
      {
        text: 'id',
        align: 'center',
        // sortable: false,
        value: 'id',
      },
      { text: 'Proxy', value: 'proxy' },
      { text: 'RTSP URL', value: 'rtsp' },
    ],
    getDataSetInt: null,
  }),
  mounted() {
    // 渲染分格畫面
    var ar = []
    for (var i = 0; i < 300; i++) {
      ar.push('0')
    }
    this.rtspLists = ar
    // 避免SSR重複執行setint
    if (this.getDataSetInt !== null) {
      clearInterval(this.getDataSetInt)
    }
    // 每秒刷新相機列表
    this.getDataSetInt = setInterval(() => {
      this.getData()
    }, 1000)
  },
  methods: {
    // 取得資料
    getData() {
      // 抓取資料
      axios({
        method: 'get',
        url: 'http://192.168.0.173:6148/cameraList',
      })
        .then((response) => {
          var data = response.data
          var arr = []
          data.forEach((index, i) => {
            // var str = index.cam
            // if(str.length > 20){
            //   str = str.substr(0,20) + '...'
            // }
            // var str01 = index.proxy
            // if(str01.length > 20){
            //   str01 = str01.substr(0,20) + '...'
            // }
            arr.push({
              id: i + 1,
              proxy: `/${index.proxy}`,
              rtsp: index.cam,
            })
          })
          this.desserts = arr
        })
        .catch((error) => console.log('error from axios', error))
    },
    // 開始直播
    startStream1() {
      // 切斷目前正在直播的相機(如果有)
      var rtspid = this.rtsp
      if (rtspid.length > 0) {
        rtspid.forEach((index) => {
          index.disconnect()
        })
        this.rtsp = []
      }
      const rtpsimg = $('.rtpsimg')
      rtpsimg.each(function () {
        this.src = '/loadingBG.png'
      })
      // 將目前相機列表存入陣列中
      var rtspStream = []
      this.desserts.forEach((index) => {
        rtspStream.push({
          id: index.id,
          proxy: index.proxy,
          rtsp: index.rtsp,
        })
      })
      // 把目前要轉碼直播的列表傳送給nodejs
      axios({
        method: 'post',
        url: 'http://192.168.0.173:6148/stream',
        data: rtspStream,
      })
        .then((params) => {
          var data = params.data
          var arr = []
          for (var i = 0; i < data.length; i++) {
            this.socket = this.$nuxtSocket({
              name: 'main', // select "main" socket from nuxt.config.js - we could also skip this because "main" is the default socket
              channel: '/' + data[i].proxy,
            })
            const img = document.getElementById('rtsp-img' + i)
            this.socket.on('data', function (data) {
              img.src = 'data:image/jpeg;base64,' + data
            })
            // 將socket ID 存入arr陣列中
            arr.push(this.socket)
          }
          // 保存socket ID至記憶體
          this.rtsp = arr
        })
        .catch((error) => console.log('error from axios', error))
    },
    // 新增相機
    cameraadd() {
      // CameraIP 必須要有值，否則彈出錯誤視窗，proxy如果沒值，nodejs 會給予隨機唯一辨識碼
      if (this.CameraIP !== null && this.CameraIP !== '') {
        // 過濾proxy
        if (this.proxy === '') {
          this.proxy = null
        }
        // 宣告IP & proxy
        var data = { ip: this.CameraIP, proxy: this.proxy }
        // 把相機資訊傳送給nodejs保存
        axios({
          method: 'post',
          url: 'http://192.168.0.173:6148/add',
          data,
        })
          .then((params) => {
            const data = params.data
            // nodejs會做資料驗證，根據status做判斷
            if (data.status === '200') {
              this.getData()
              // this.startStream1()
              this.proxy = null
            } else if (data.status === '403') {
              alert('輸入有誤，可能是"代理網址"有重複，請查明後重新輸入')
            }
          })
          .catch((error) => console.log('error from axios', error))
      } else {
        alert('請輸入完整資訊')
      }
    },
    // 關閉直播
    streamStop() {
      var rtspid = this.rtsp
      if (this.socket !== undefined) {
        rtspid.forEach((index) => {
          index.disconnect()
        })
        this.rtsp = []
      }
      const rtpsimg = $('.rtpsimg')
      rtpsimg.each(function () {
        this.src = '/loadingBG.png'
      })
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
