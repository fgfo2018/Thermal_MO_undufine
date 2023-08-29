<template>
  <div>
    <div id="main" style="height: 400px; width: 1050px"></div>
    <v-btn @click="off1">OFF WK</v-btn>
    <!-- <div class="testWebScoket" id="">
      <canvas id="testWebScoket" />
    </div> -->
    <v-stage ref="stage" :config="configKonva" @mousedown="handleStageMouseDown" @touchstart="handleStageMouseDown">
      <!-- @mousemove="areaShow = false" @mouseout="areaShow = true" -->
      <v-layer ref="layer">
        <!-- <v-shape :config="{
          anchorStroke: 'red',
          anchorFill: 'yellow',
          anchorSize: 20,
          borderStroke: 'green',
          borderDash: [3, 3],
          nodes: [circle],
        }"></v-shape>
        <v-circle v-for="(item, index) in configCircle" :key="index" :config="item"></v-circle> -->
        <!-- <v-shape v-for="i in Math.floor(640 / col)" :key="i" :config="{
          sceneFunc: function (context, shape) {
            context.beginPath()
            context.moveTo(0, i * col)
            context.lineTo(640, i * col)
            context.fillText(i * col, 0, i * col)

            context.moveTo(i * col, 0)
            context.lineTo(i * col, 480)
            context.fillText(i * col, i * col, 10)
            // special Konva.js method
            context.closePath();
            context.fillStrokeShape(shape)
          },
          stroke: '#000',
          strokeWidth: 1,
        }" @mousemove="(e) => { shapeDraw(e, 1) }" @mouseout="(e) => { shapeDraw(e, 0) }"></v-shape> -->
        <v-transformer ref="transformer" />

      </v-layer>
    </v-stage>
    <!-- <v-stage ref="stage1">
      <v-layer ref="layer1"></v-layer>
    </v-stage> -->
    <!-- <v-btn @click="test ? (test = false) : (test = true)">{{
              test ? '取消跟隨' : '跟隨'
            }}</v-btn> -->
    <v-btn v-if="test1" @click="test1 = false" disabled>D</v-btn>
    <v-btn v-else @click="(test1 = true), (test2 = 'asdasdas')">B</v-btn>
    <v-btn @click="down">download</v-btn>
    <v-btn @click="rec">紀錄</v-btn>已紀錄:{{ rectotle }}
    <v-btn @click="areaShow === true ? areaShow = false : areaShow = true">隱藏區域</v-btn>
    <v-btn :to="'?cam=' + tre" @click="teste">get url</v-btn>
    <div class="test-point"></div>
  </div>
</template>
<script>
import Konva from 'konva'
import * as echarts from 'echarts'
export default {
  // plugins: [
  //   {
  //     src: '~/plugins/vuekonva',
  //     // mode: 'client',
  //   },
  // ],
  // build: {
  //   transpile: ['konva']
  // },
  metaInfo() {
    return {
      script: [
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
        // {
        //   skip: !this.externalLoaded,
        //   innerHTML: `
        //     /* this is only added once external script has been loaded */
        //     /* and e.g. window.$externalVar exists */
        //   `,
        // },
      ]
    }
  },
  data() {
    return {
      tre: 5000,
      test1: true,
      test2: "asdasd",
      areaShow: true,
      col: 80,
      configKonva: {},
      configCircle: [],
      Konva: null, // 宣告Konva
      test: false,
      definedStyle: {
        x: 0,
        y: 0,
        radius: 30,
        fill: '#fff',
        stroke: '#000',
        strokeWidth: 1,
        name: 'rect1',
        draggable: true,
      },
      image: null,
      rectBG: [],
      rectstroke: [],
      rect1: [],
      w1: null,
      // 保存溫度直
      rectotle: 0,
      recdata: [],
      recstate: false,
      group1: null,
      group2: null,
      wk1: null,
    }
  },
  mounted() {
    setTimeout(() => {
      this.test1 = false;
    }, 1000);
    this.Konva = window.Konva // 宣告Konva
    // 斜線
    var p = document.createElement('canvas')
    p.width = 32
    p.height = 16
    var pctx = p.getContext('2d')

    var x0 = 36
    var x1 = -4
    var y0 = -2
    var y1 = 18
    var offset = 32

    pctx.strokeStyle = '#FF0000'
    pctx.lineWidth = 1
    pctx.beginPath()
    pctx.moveTo(x0, y0)
    pctx.lineTo(x1, y1)
    pctx.moveTo(x0 - offset, y0)
    pctx.lineTo(x1 - offset, y1)
    pctx.moveTo(x0 + offset, y0)
    pctx.lineTo(x1 + offset, y1)
    pctx.stroke()
    // 斜線
    // var width = window.innerWidth
    var width = 640
    // var height = window.innerHeight
    this.configKonva = {
      width,
      height: '480',
    }

    const image = new window.Image();
    image.src = "/Web 1920 – 1 (1).png";
    image.onload = () => {
      // set image only when it is loaded
      this.image = image;
    };
    this.randering()
    this.websocketConnect()
    this.streaming()

    // 20230601 test 圖表
    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      animation: false,
      tooltip: {
        trigger: 'axis'
      },
      dataZoom: [
        {
          type: 'inside',
          realtime: true,
        },
      ],
      xAxis: {
        type: 'category'
      },
      yAxis: {
        type: 'value'
      },
      series: []
    };
    option && myChart.setOption(option);
    this.wk1 = new Worker('/worker/testEchart.js');
    this.wk1.addEventListener('message', (e) => {
      var data = e.data
      // console.log(e);
      myChart.setOption({
        dataZoom: [
          {
            type: 'inside',
            realtime: true,
            startValue: data.start,
            endValue: data.stop,
          },
        ],
        series: [
          {
            data: data.series,
            type: 'line',
            sampling: 'lttb',
            // large:true
          }
        ]
      }, { replaceMerge: ['dataZoom', 'series'] });
      data = null
    })
    // myChart.on('mousemove', function (params) {
    //   // 控制台打印数据的名称
    //   console.log(params.name);
    // });

  },
  methods: {
    off1() {
      this.wk1.terminate()
    },
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
    teste() {
      if (this.tre !== 6000) {
        this.tre = 6000
      } else {
        this.tre = 5000
      }
    },
    websocketConnect() {
      var layer = this.$refs.layer.getNode()
      var ws = new WebSocket('ws://192.168.0.173:6188/server1')
      // var ws = new WebSocket('ws://192.168.0.173:8702')
      ws.onopen = () => {
        console.log('web socket3 is open')
      }
      // var color = ['#37BEF09E', '#37BEF09E', '#9FD9F69E', '#EBF3F69E', '', '#F8ECE99E', '#FFB0B09E', '#FF85859E', '#FF85859E', '#FF85859E']
      // var color = ['#37BEF0', '#37BEF0', '#9FD9F6', '#EBF3F6', '', '#F8ECE9', '#FFB0B0', '#FF8585', '#FF8585', '#FF8585']
      var color = ['#FF8585', '#FF8585', '#FF8585', '#FF8585', '', '#FF8585', '#FF8585', '#FF8585', '#FF8585', '#FF8585']
      // var e = 0
      // setInterval(() => {
      //   // console.log(e)
      //   e = 0
      // }, 1000)
      ws.onmessage = (event) => {
        var data = JSON.parse(event.data)
        // e++
        var r = false
        if (r) {
          if (this.recstate) {
            this.recdata.push(data)
            this.rectotle = this.recdata.length
          }
          data = data[0]
          // console.log(data)
          data.difference.forEach((value, index) => {
            var difference = value + 4
            if (this.areaShow) {
              this.rect1[index].fill(color[difference])
            } else {
              this.rect1[index].fill("")
            }
            if (value === 0) {
              this.rectBG[index].fill('#FFFFFFA8')
              this.rectstroke[index].strokeEnabled(false)
            } else {
              this.rectBG[index].fill('')
              if (this.areaShow) {
                this.rectstroke[index].strokeEnabled(true)
              } else {
                this.rectstroke[index].strokeEnabled(false)
              }
            }
          })
          this.group2.destroy();
          this.group2 = this.group1.clone({ x: 0, y: 0 });
          layer.add(this.group2);
          this.group2.cache();
          // console.log('update')
          // this.rect1.forEach((value, index) => {
          //   this.rect1[index].fill(color[Math.floor(Math.random() * 7)])
          // })
        }

      }
      ws.onclose = (event) => {
        setTimeout(() => {
          this.websocketConnect()
        }, 1000)
      }
    },
    rec() {
      this.recdata = []
      this.recstate = true
    },
    down() {
      this.downloadFile("tesdt.txt", JSON.stringify(this.recdata))
    },
    downloadFile(fileName, data) { // 保存 string 到 文本文件
      const aLink = document.createElement('a')
      const blob = new Blob([data]); // new Blob([content])
      const evt = document.createEvent("HTMLEvents")
      evt.initEvent("click", true, true); // initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
      aLink.download = fileName
      aLink.href = URL.createObjectURL(blob)
      aLink.click()
    },
    randering() {
      // var stage = this.$refs.stage.getNode()
      var layer = this.$refs.layer.getNode()
      // stage.add(layer);
      var reszie = [32, 24]
      var w = 640
      var h = 480
      var col = w / reszie[0]
      var col1 = h / reszie[1]
      var arrBG = []
      var arr = []
      var arrstroke = []
      // var index = 0
      this.group1 = new Konva.Group({
        opacity: 0.8,
        x: 0,
        y: 0,
        // draggable: true,
      });
      for (var q = 0; q < Math.floor(h / col1); q++) {
        for (var c = 0; c < Math.floor(w / col); c++) {
          var rectBG = new Konva.Rect({
            x: c * col,
            y: q * col1,
            width: col,
            height: col1,
            fill: '#FFFFFFA8',
            opacity: 0.5
            // draggable: true
          });
          arrBG.push(rectBG);
          layer.add(rectBG);
          // group1.add(rectBG);
        }
      }
      for (var z = 0; z < Math.floor(h / col1); z++) {
        for (var y = 0; y < Math.floor(w / col); y++) {
          var rectstroke = new Konva.Rect({
            x: y * col,
            y: z * col1,
            width: col + 2,
            height: col1 + 2,
            offsetX: 1,
            offsetY: 1,
            stroke: '#C42C2C',
            strokeWidth: 2,
            dash: [10, 10],
            // draggable: true
          });
          arrstroke.push(rectstroke);
          // layer.add(rectstroke);
          this.group1.add(rectstroke);
        }
      }
      for (var i = 0; i < Math.floor(h / col1); i++) {
        for (var j = 0; j < Math.floor(w / col); j++) {
          var rect1 = new Konva.Rect({
            x: j * col,
            y: i * col1,
            width: col + 0.4,
            height: col1,
            stroke: 'rgba(0, 0, 0, 0.43)',
            strokeWidth: 0,
            // draggable: true
          });
          // var simpleText = new Konva.Text({
          //   x: j * col,
          //   y: i * col,
          //   text: `${index}`,
          //   fontSize: 10,
          //   fontFamily: 'Calibri',
          //   fill: 'black',
          // });
          arr.push(rect1);
          // layer.add(rect1);
          this.group1.add(rect1);
          // layer.add(simpleText);
          // index++
          // var anim = new Konva.Animation((frame) => {

          // },stage)
        }
      }
      this.rectBG = arrBG
      this.rectstroke = arrstroke
      this.rect1 = arr

      // var group1 = new Konva.Group({
      //   opacity: 0.7,
      //   x: 50,
      //   y: 50,
      //   // draggable: true,
      // });
      // var e1 = new Konva.Rect({
      //   x: 50,
      //   y: 100,
      //   width: 82,
      //   height: 82,
      //   offsetX: 1,
      //   offsetY: 1,
      //   stroke: '#C42C2C',
      //   strokeWidth: 2,
      //   dash: [10, 10],
      //   // draggable: true
      // })
      // var e11 = new Konva.Rect({
      //   x: 130,
      //   y: 100,
      //   width: 82,
      //   height: 82,
      //   offsetX: 1,
      //   offsetY: 1,
      //   stroke: '#C42C2C',
      //   strokeWidth: 2,
      //   dash: [10, 10],
      //   // draggable: true
      // })
      // var e2 = new Konva.Rect({
      //   x: 50,
      //   y: 100,
      //   width: 80,
      //   height: 80,
      //   fill: '#FF8585',
      //   draggable: true
      // })
      // var e22 =
      //   new Konva.Rect({
      //     x: 130,
      //     y: 100,
      //     width: 80,
      //     height: 80,
      //     fill: '#FF8585',
      //     draggable: true
      //   })
      // group1.add(e1);
      // group1.add(e11);
      // group1.add(e2);
      // group1.add(e22);
      // layer.add(group1);
      // lets create the second group
      this.group2 = this.group1.clone();
      layer.add(this.group2);
      // to change opacity behavior we have to fix whole group
      this.group2.cache();
      // setTimeout(() => {
      //   setInterval(() => {

      //   }, 1)
      // }, 2000)
    },
    shapeDraw(e, s) {
      console.log(e, s)
    },
    mousemovekonva(e) {
      // console.log({ x: e.evt.layerX, y: e.evt.layerY })
      if (this.test) {
        this.configCircle[0].x = e.evt.layerX
        this.configCircle[0].y = e.evt.layerY
      }
    },
    handleStageMouseDown(e) {
      // clicked on stage - clear selection
      if (e.target === e.target.getStage()) {
        this.selectedShapeName = ''
        this.updateTransformer()
        return
      }

      // clicked on transformer - do nothing
      const clickedOnTransformer =
        e.target.getParent().className === 'Transformer'
      if (clickedOnTransformer) {
        return
      }

      // find clicked rect by its name
      const name = e.target.name()
      const rect = this.configCircle.find((r) => r.name === name)
      if (rect) {
        this.selectedShapeName = name
      } else {
        this.selectedShapeName = ''
      }
      this.updateTransformer()
    },
    updateTransformer() {
      // here we need to manually attach or detach Transformer node
      const transformerNode = this.$refs.transformer.getNode()
      const stage = transformerNode.getStage()
      const { selectedShapeName } = this

      const selectedNode = stage.findOne('.' + selectedShapeName)
      // do nothing if selected node is already attached
      if (selectedNode === transformerNode.node()) {
        return
      }

      if (selectedNode) {
        // attach to another node
        transformerNode.nodes([selectedNode])
      } else {
        // remove transformer
        transformerNode.nodes([])
      }
    },
    streaming() {
      this.ws1 = new WebSocket('ws://192.168.0.173:8701')
      this.ws1.onopen = () => {
        console.log('連線成功')
      }
      this.ws1.onclose = () => {
        console.log('斷線')
      }
      let prevObjectURL = null
      this.ws1.onmessage = (event) => {
        try {
          var data = JSON.parse(event.data)
          data = data[0]
          // console.log(this.camid, data[this.camid])
          // var cameraName = []
          // Object.keys(data).forEach(key => {
          //   cameraName.push(key)
          // })
          // console.log('images is updated')
          // var data = JSON.parse(event.data)
          var cam = 'cam_00_0001'
          var blob = getBlob(atob(data[cam]), 'image/jpg')
          var objectURL = URL.createObjectURL(blob)
          // ____old____
          // const image = new window.Image()
          // image.src = objectURL
          // image.onload = () => {
          //   image.width = canvasWidth
          //   image.height = canvasHeight
          //   this.Konvaimage = image
          // }
          // URL.revokeObjectURL(prevObjectURL)
          // prevObjectURL = objectURL
          // _______NEW_______
          const canvas = document.getElementById(`testWebScoket`)
          var img = new Image()
          // img.src = 'data:image/jpeg;base64,' + data[0].img
          var ctx = canvas.getContext('2d')
          img.onload = function () {
            canvas.width = this.naturalWidth
            canvas.height = this.naturalHeight
            // URL.revokeObjectURL(url)
            ctx.drawImage(img, 0, 0, this.width, this.height)
          }
          img.src = objectURL
          URL.revokeObjectURL(prevObjectURL)
          prevObjectURL = objectURL
        } catch (error) {
          // console.log(error)
        }
      }
      function getBlob(byteString, mimeString) {
        var ab = new ArrayBuffer(byteString.length)
        var ia = new Uint8Array(ab)
        for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i)
        }
        var blob = new Blob([ab], { type: mimeString })
        return blob
      }
    }
  },
}
</script>

<style>
.testWebScoket {
  position: absolute;
  top: 0;
  left: 0;
  width: 640px;
  height: 480px;
}

.testWebScoket>canvas {
  width: 100%;
  height: 100%;
}

@media screen and (max-width:768px) {
  .konvajs-content {
    width: 100% !important;
  }

  .konvajs-content canvas {
    width: 100% !important;
  }
}

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

/* #main {
  transform: translateZ(0);
} */
</style>