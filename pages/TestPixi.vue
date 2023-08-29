<template>
  <div id="append">
    <canvas v-for="(item, index) in test" :id="item" :key="index"></canvas>
    <!-- <canvas id="canvas01"></canvas> -->
    <div id="qwq"></div>
    <PixijsDisplayData v-for="i in pixijstotle" :key="i" :roidata="blob" :canvasId="'test' + i" camId="cam_00_00001" />
    <!-- <PixijsDisplayData :roidata="blob" canvasId="test02" camId="cam_00_00001" />
    <PixijsDisplayData :roidata="blob" canvasId="test03" camId="cam_00_00001" />
    <PixijsDisplayData :roidata="blob" canvasId="test04" camId="cam_00_00001" />
    <PixijsDisplayData :roidata="blob" canvasId="test05" camId="cam_00_00001" />
    <PixijsDisplayData :roidata="blob" canvasId="test06" camId="cam_00_00001" />
    <PixijsDisplayData :roidata="blob" canvasId="test07" camId="cam_00_00001" />
    <PixijsDisplayData :roidata="blob" canvasId="test08" camId="cam_00_00001" />
    <PixijsDisplayData :roidata="blob" canvasId="test09" camId="cam_00_00001" />
    <PixijsDisplayData :roidata="blob" canvasId="test10" camId="cam_00_00001" />
    <PixijsDisplayData :roidata="blob" canvasId="test11" camId="cam_00_00001" />
    <PixijsDisplayData :roidata="blob" canvasId="test12" camId="cam_00_00001" /> -->
    <!-- <div class="test-point"></div> -->
    <!-- <div v-for="(item, index) in items" :key="index">
      <div v-if="test">
        <div>{{ item.name }}</div><input v-model="item.value" />
      </div>
      <div v-else>
        <div>{{ item.name }}123</div><input v-model="item.value" />
      </div>
    </div>
    <div v-for="(item, index1) in items" :key="index1">
      <div>{{ item.name }}</div><input v-model="item.value" />
    </div> -->
  </div>
</template>
<script>

// import PixijsDisplayData from '../components/Index/pixijs-display-data.vue'
import PixijsDisplayData from '../components/Index/pixijs-display-data_beta.vue'
export default {
  components: {
    PixijsDisplayData
  },
  data() {
    return {
      items: [
        { name: '1', value: 123, test: true },
        { name: '2', value: 32, test: false }
      ],
      pixijstotle: 0,
      appPixi: [],
      totle: 2,
      pixiapp: null,
      ws1: null,
      blob: [],
      pixiJsRoiBlobData: [],
      test: []
    }
  },
  head: {
    script: [
      {
        src: 'https://mrdoob.github.io/stats.js/build/stats.min.js',
        type: 'text/javascript',
      },
    ],
  },
  metaInfo() {
    return {
      script: [
        {
          hid: 'extscript',
          body: true,
          src:
            // 問號後面是隨機給的亂數，避免瀏覽器暫存.JS，造成metaInfo不起作用
            '/js/pixi.min.js?' + Math.random().toString(36).substr(2),
          // '/js/pixi.min.js',
          callback: () => {
            this.pixijstotle = 1
          },
        },
        {
          hid: 'extscript',
          body: true,
          src:
            // 問號後面是隨機給的亂數，避免瀏覽器暫存.JS，造成metaInfo不起作用
            'https://mrdoob.github.io/stats.js/build/stats.min.js?' + Math.random().toString(36).substr(2),
          callback: () => {
            this.fps()
          },
        },
      ]
    }
  },
  created() {
    var arr = []
    for (var z = 0; z < 12; z++) {
      arr.push('canvas' + z)
    }
    this.test = arr
  },
  mounted() {
    var workerList = []
    // ------
    this.test.forEach(element => {
      var width = 320
      var height = 240
      var canvas = document.getElementById(element)
      // var canvas = document.createElement('canvas')
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      // document.getElementById('append').appendChild(canvas)
      var worker = new Worker('/worker/streaming-pixijs.js');
      //   const offscreen = canvas.transferControlToOffscreen()
      //   worker.postMessage({
      //     type: 'init',
      //     offscreen, width, height
      //   }, [offscreen])
      workerList.push(worker)
    });
    var ws = this.$myPlugin.webSocketconnect01()
    ws.addEventListener('message', (e) => {
      var data = e.data
      for (var i = 0; i < workerList.length; i++) {
        workerList[i].postMessage({
          type: 'getImage',
          content: data
        })
      }
      // worker.postMessage({
      //   type: 'getImage',
      //   content: data
      // })
    })
    // for (var q = 0; q < workerList.length; q++) {
    workerList.forEach((item, index) => {
      item.addEventListener('message', (event) => {
        var data = event.data
        // console.log(data);
        if (data.type === 'getImage') {
          var canvas = document.getElementById(this.test[index])
          var ctx = canvas.getContext('2d');
          // 创建一个Image元素
          var img = new Image();
          var blob = data.parameter; // 这里是你的Blob对象
          var reader = new FileReader();
          reader.onload = function (e) {
            // 当读取完成时，将数据赋值给Image的src属性
            img.src = e.target.result;

            // 在图像加载完成后绘制到Canvas上
            img.onload = function () {
              // 设置Canvas的宽高与图像一致
              canvas.width = img.width;
              canvas.height = img.height;

              // 清空Canvas
              ctx.clearRect(0, 0, canvas.width, canvas.height);

              // 绘制图像到Canvas上
              ctx.drawImage(img, 0, 0);
              // 现在可以使用canvas对象进行后续操作，比如将Canvas显示在页面上
              // document.body.appendChild(canvas);
            };
          };

          // 读取Blob中的数据
          reader.readAsDataURL(blob);
          // console.log(canvas, index);
          // console.log(data.parameter);
        }
      });
    })

    // }
    // ------
    // worker.postMessage(event);
    // worker.addEventListener('message', (event) => {
    // 将事件数据发送给Web Worker
    // });
    // setTimeout(() => {
    //   this.pixijstotle = 2
    // },5000)
    // setInterval(() => {
    //   this.pixijstotle = Math.floor(Math.random() * 12)
    // },3000)
    // if (process.browser) {
    //   const PIXI = window.PIXI
    //   Vue.prototype.$PIXI = PIXI
    // }
    // const app = new this.$PIXI.Application({
    //   width: 640,
    //   height: 480,
    //   backgroundColor: 0x1099bb
    // })
    // this.getdata()
  },
  methods: {
    getdata() {
      this.ws1 = new WebSocket('ws://192.168.0.173:8702')
      this.ws1.onopen = (e) => {
        console.log("開啟ROI連接")
      }
      this.ws1.onmessage = (e) => {
        this.blob = e
      }
    },
    // 右上角FPS測試視窗
    fps() {
      // eslint-disable-next-line no-undef
      var stats = new Stats();
      stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
      document.body.appendChild(stats.dom);
      function animate() {
        stats.begin();
        // monitored code goes here
        stats.end();
        requestAnimationFrame(animate);
      }
      requestAnimationFrame(animate);
    },
  },
  // 脫鉤(nuxt生命週期)
  beforeDestroy() {
  }
}
</script>
<style>
/* .links {
  width: 800px;
  height: 640px;
} */
.test-point {
  width: 50px;
  height: 50px;
  background-color: red;
  position: fixed;
  bottom: 2%;
  left: 0%;
  border-radius: 50px;
  animation-name: example;
  animation-duration: 1s;
  animation-iteration-count: infinite;
}

@keyframes example {
  0% {
    left: 0%;
  }

  50% {
    left: 20%;
  }

  100% {
    left: 0%;
  }
}
</style>