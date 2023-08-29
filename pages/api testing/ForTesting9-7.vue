<template>
  <v-container fluid>
    <div>
      現在時間:
      <div id="time"></div>
    </div>
    <v-row>
      <v-col cols="6" v-for="(item, index) in arr" :key="index">
        <div class="cover">
          <video :id="'video' + index" muted autoplay />
          <div :id="'play' + index" class="ads"></div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: 'HistoricalMonitoringPage',
  // head: {
  //   script: [
  //     {
  //       src: '/js/libs/adapter.min.js',
  //       type: 'module',
  //     },
  //     {
  //       src: '/js/webrtcstreamer.js',
  //       type: 'module',
  //     },
  //   ],
  // },
  // 載入完成外部(第三方)插件，使用callback呼叫local 方法
  metaInfo() {
    return {
      script: [
        // {
        //   hid: 'extscript',
        //   src: '/js/libs/adapter.min.js',
        // },
        // {
        //   hid: 'extscript',
        //   src: '/js/webrtcstreamer.js',
        //   callback: () => {
        //     this.stream()
        //   },
        // },
        // {
        //   skip: !this.externalLoaded,
        //   innerHTML: `
        //     /* this is only added once external script has been loaded */
        //     /* and e.g. window.$externalVar exists */
        //   `,
        // },
      ],
    }
  },
  data: () => ({
    arr: [
      // 'rtsp://192.168.0.138/avc',
      // 'rtsp://192.168.0.138/avc',
      // 'rtsp://192.168.0.138/avc',
      // 'rtsp://192.168.0.138/avc',
      'rtsp://192.168.0.177:9554/live?channel=0&subtype=0',
      // 'rtsp://192.168.0.150:554/type=0&id=1',
      // 'rtsp://192.168.0.150:554/type=0&id=1',
      // 'rtsp://192.168.0.138/avc',
      // 'rtsp://192.168.0.150:554/type=0&id=1',
      // 'rtsp://192.168.0.138/avc',
      // 'rtsp://192.168.0.150:554/type=0&id=1',
      // 'rtsp://192.168.0.138/avc',
      // 'rtsp://192.168.0.150:554/type=0&id=1',
    ],
    webRTC: [],
  }),
  mounted() {
    // 時間
    window.setInterval(() => {
      var time = new Date()
      var getTime =
        time.getFullYear() +
        '-' +
        ('0' + (time.getMonth() + 1)).slice(-2) +
        '-' +
        ('0' + time.getDate()).slice(-2) +
        ' ' +
        ('0' + time.getHours()).slice(-2) +
        ':' +
        ('0' + time.getMinutes()).slice(-2) +
        ':' +
        ('0' + time.getSeconds()).slice(-2) +
        ':' +
        ('0' + time.getMilliseconds()).slice(-3)
      var div = document.getElementById('time')
      div.innerHTML = getTime
    }, 11)
    // 串流
    // this.stream()
  },
  methods: {
    // stream() {
    //   var arr = this.arr
    //   for (var i = 0; i < arr.length; i++) {
    //     var webRtcServer = null
    //     var id = 'video' + i
    //     webRtcServer = new WebRtcStreamer(
    //       id,
    //       location.protocol + '//' + window.location.hostname + ':8000'
    //     )
    //     webRtcServer.connect(arr[i])
    //     this.webRTC.push(webRtcServer)
    //     var tmp = null
    //     var video = document.getElementById('video0')
    //     var play = document.getElementById('play0')
    //     var tp = 0
    //     var int = setInterval(() => {
    //       if (tmp !== video.currentTime) {
    //         tp = 0
    //         play.innerHTML = '正常:' + video.currentTime
    //       } else {
    //         if (tp > 10) {
    //           webRtcServer.disconnect()
    //           this.stream()
    //           clearInterval(int)
    //         }
    //         console.log(tp)
    //         tp = tp + 1
    //         play.innerHTML = '播放中斷:' + video.currentTime
    //       }
    //       tmp = video.currentTime
    //     }, 100)
    //     // video.addEventListener('playing', () => {
    //     //   play.innerHTML = '播放中'
    //     // })
    //     // window.onbeforeunload = () => {
    //     //   webRtcServer.disconnect()
    //     // }
    //   }
    // },
  },

  beforeDestroy() {
    var arr = this.webRTC
    arr.forEach((index) => {
      index.disconnect()
    })
  },
}
</script>
<style>
.cover {
  width: 100%;
  height: 0;
  padding-bottom: 70%;
  background-color: rgb(145, 145, 145);
  float: left;
  margin: 12px;
  position: relative;
}

.cover video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.ads {
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #959595;
  z-index: 9;
}
</style>
