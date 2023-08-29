<template>
  <v-row>
    <v-col cols="9">
      <div id="drawCanvas">
        <div @mousemove="movepoint">
          <v-stage ref="stage" :config="configKonva" @contextmenu="clickRight">
            <v-layer ref="layer">
              <v-image :config="Figure_1"></v-image>
              <v-shape v-for="i in Math.floor(drawCanvasW / col)" :key="i" :config="{
                  sceneFunc: function (context, shape) {
                    context.beginPath()
                    context.moveTo(0, i * col)
                    context.lineTo(drawCanvasW, i * col)
                    context.fillText(i * col, 0, i * col)

                    context.moveTo(i * col, 0)
                    context.lineTo(i * col, 800)
                    context.fillText(i * col, i * col, 10)
                    // special Konva.js method
                    context.fillStrokeShape(shape)
                  },
                  stroke: 'gray',
                  strokeWidth: 1,
                }"></v-shape>
              <v-shape :config="{
                  anchorStroke: 'red',
                  anchorFill: 'yellow',
                  anchorSize: 20,
                  borderStroke: 'green',
                  borderDash: [3, 3],
                }"></v-shape>

              <v-line v-for="(item, index) in testSpline1" :key="'sp' + index" :config="item" @mouseover="overSpline">
              </v-line>
              <v-line :config="testSpline"></v-line>
              <v-circle :config="removePoint" ref="circleZindexTop" @mouseover="circleEvents(1)"
                @mouseout="circleEvents(0)"></v-circle>
              <!-- <v-line :config="rrdd"></v-line> -->
              <v-path :config="testpath" ref="testtt" @mouseover="PathEvents"></v-path>
              <v-circle v-for="(item, index) in Pathcircle" :key="'pc' + index" :config="item">
              </v-circle>
              <v-circle :config="PathNumbercircle">
              </v-circle>
              <v-image :config="image"></v-image>
              <v-group ref="resolution" :config="resolutionConfig">
                <v-image :config="image1"></v-image>
              </v-group>
              <v-circle :config="resolutionEventCircle" @dragmove="resolutionEventMove">
              </v-circle>
            </v-layer>
          </v-stage>
          <v-menu v-model="showMenu" :position-x="MenuX" :position-y="MenuY" absolute offset-y>
            <v-list>
              <v-list-item v-for="(item, index) in MenuItems" :key="'ee' + index">
                <v-list-item-title>{{ item }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <v-btn @click="reset">reset api</v-btn>
        <v-text-field v-model="speed" type="nu"></v-text-field>
      </div>
    </v-col>
    <v-col cols="3">
      <v-card class="mt-3" rounded="md" elevation="6">
        <div class="cardtitle1 ml-3">警報設置</div>
        <v-simple-table id="style-3" fixed-header height="265px" class="mx-2" small>
          <template #default>
            <thead>
              <tr>
                <th class="text-center" style="height: 25px">監測項目</th>
                <th class="text-center" style="height: 25px">張力設定</th>
                <th class="text-center" style="height: 25px">元件類型</th>
                <th class="text-center" style="height: 25px">刪除</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in testSpline1" :key="'C' + index">
                <td class="text-center" style="padding: 0px 13px">
                  <v-badge :content="0" overlap color="#828C8F" class="my-0">
                    <v-btn icon class="right-btn"><img class="" alt="" src="/left-icons/polygon_spline.png"
                        width="20em" /></v-btn>
                  </v-badge>
                </td>
                <td class="text-center subtitle-right" style="padding: 0px 25px; width: 100px">
                  <v-text-field label="Regular" single-line :value="item.tension" full-width dense hide-details
                    type="number" min="0" max="0.5" step="0.02" @change="changetension" @click="focusObject(index)">
                  </v-text-field>
                </td>
                <td class="text-center" style="padding: 0px 25px; width: 100px">
                  <v-select :items="items" v-model="item.group_name" label="未選取" solo full-width hide-details>
                  </v-select>
                </td>
                <td class="text-center" style="padding: 0px 13px">
                  <v-btn color="" icon class="right-btn"><img class="" alt="" src="/right-icons/delete.png"
                      width="18em" /></v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import axios from 'axios'
import Konva from 'konva'
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
  data() {
    return {
      showMenu: false,
      MenuItems: ['ADD', 'Revise', 'REMOVE', 'RESET'],
      MenuX: 0,
      MenuY: 0,
      items: ['switch', 'wire'],
      col: 50,
      configKonva: {},
      configCircle: [],
      Konva: null, // 宣告Konva
      drawCanvasW: 0,
      test: false,
      testSpline: {
        points: [],
        stroke: 'green',
        strokeWidth: 8,
        lineJoin: 'round',
        tension: 0.5,
      },
      testSpline1: [],
      removePoint: {
        x: 50,
        y: 50,
        radius: 10,
        fill: 'red',
        name: 'removePoint',
        status: true,
        visible: false,
      },
      temp: [],
      p: null,
      pointtotle: 0,
      image: {
        x: 500,
        y: 100,
        width: 640,
        height: 480,
        image: null,
      },
      image1: {
        // x: 500,
        // y: 100,
        // width: 640,
        // height: 480,
        image: null,
        // draggable: true
      },
      resolutionConfig: {
        x: 500,
        y: 100,
      },
      resolutionEventCircle: {
        x: 500,
        y: 100,
        offsetY: -480 / 2,
        offsetX: -640 / 2,
        radius: 10,
        fill: 'red',
        draggable: true
      },
      Figure_1: {
        image: null,
      },
      focusObjectData: 0,
      // test
      // rrdd: {
      //   points: [20, 20, 20, 100, 200, 100, 200, 20],
      //   stroke: 'green',
      //   strokeWidth: 8,
      //   bezier: true,
      // },
      testpath: {
        data: '',
        stroke: 'green',
        fill: 'rgba(0, 0, 0, 0)',
        strokeWidth: 1,
      },
      Pathcircle: [{
        x: 0,
        y: 0,
        radius: 10,
        fill: 'red',
      }, {
        x: 0,
        y: 0,
        radius: 10,
        fill: '#6E27EE',
      }, {
        x: 0,
        y: 0,
        radius: 10,
        fill: '#9EE86F',
      }],
      PathNumbercircle: {
        x: 0,
        y: 0,
        radius: 10,
        // offsetX: 20,
        // offsetY: 15,
        fill: 'red',
      },
      interval1: null,
      gpuData: null
    }
  },
  mounted() {
    const resolution1 = new window.Image()
    resolution1.src = '/20221214_T092431.jpg'
    resolution1.onload = () => {
      // set image only when it is loaded
      this.image.image = resolution1
    }

    const resolution2 = new window.Image()
    resolution2.src = '/1656315342184.jpg'
    resolution2.onload = () => {
      // set image only when it is loaded
      this.image1.image = resolution2
    }
    var resolutiongroup = this.$refs.resolution.getNode()
    resolutiongroup.clip({
      x: 0,
      y: 0,
      width: 640 / 2,
      height: 480
    })
    // resolutiongroup.clipWidth(300)
    // image1node.forceUpdate();
    // image1node.width(100)
    // var ree = this.testSplineDemo(
    //   [
    //     184, 106, 93, 233, 295, 353, 360, 319, 397, 280, 416, 226, 455, 145,
    //     452, 73, 426, 27, 380, 12, 337, 22, 275, 58,
    //   ],
    //   0.5,
    //   25,
    //   true
    // )
    // this.rrdd.points = ree
    // console.log(ree)
    const image444 = new window.Image()
    image444.src = '/images/Figure_1.png'
    image444.onload = () => {
      // set image only when it is loaded
      this.Figure_1.image = image444
    }
    // const ws = new WebSocket('ws://localhost:6188/server1')
    // ws.onopen = (e) => {
    //   console.log('server open')
    //   ws.send('client connect')
    // }
    // ws.onclose = (e) => {
    //   console.log('server down')
    // }

    // ws.onmessage = (event) => {
    //   // console.log(event)
    // }
    this.drawCanvasW = document.getElementById('drawCanvas').offsetWidth
    // const image = new window.Image()
    // image.src = 'test.jpg'
    // image.onload = () => {
    //   // set image only when it is loaded
    //   this.image.image = image
    // }
    document.onkeydown = (event) => {
      var e = event || window.event
      // console.log(e.keyCode)
      if (e && e.keyCode === 27) {
        this.addspline()
      }
    }
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

    pctx.beginPath()
    pctx.rect(-2, -2, 34, 18)
    pctx.fillStyle = 'rgba(247,200,223,0.2)'
    pctx.fill()

    pctx.strokeStyle = 'rgb(255 0 0 / 43%)'
    pctx.lineWidth = 1
    pctx.beginPath()
    pctx.moveTo(x0, y0)
    pctx.lineTo(x1, y1)
    pctx.moveTo(x0 - offset, y0)
    pctx.lineTo(x1 - offset, y1)
    pctx.moveTo(x0 + offset, y0)
    pctx.lineTo(x1 + offset, y1)
    pctx.stroke()

    this.p = p
    // 斜線
    // var width = window.innerWidth
    // var height = window.innerHeight
    this.configKonva = {
      width: this.drawCanvasW,
      height: '800',
      name: 'draw',
    }
    // setInterval(() => {
    //   this.initSplint()
    // }, 1000)
    // this.testpath1()
    // this.animation1()
    // this.gputest()
  },
  methods: {
    resolutionEventMove(e){
      e.target.y(100)
      var thisX = 500
      if(e.target.x() - thisX < -(640 / 2) + 1){
        e.target.x(thisX - (640 / 2) + 1)
      }
      if(e.target.x() > (thisX + (640 / 2))){
        e.target.x((thisX + (640 / 2)))
      }
      var resolutiongroup = this.$refs.resolution.getNode()
      resolutiongroup.clip({
        x: 0,
        y: 0,
        width: (640 / 2) + e.target.x() - thisX,
        height: 480
      })
      console.log(e.target.x() - thisX);
    },
    gputest() {
      require('gpu.js')
      const gpu = new window.GPU();
      try {
        const kernel = gpu.createKernel(function () {
          const j = Math.floor(Math.random() * 1000000000);
          return j;
        }).setPipeline(true).setOutput([10000000]);
        setInterval(() => {
          this.gpuData = kernel();
          // var temp = result1.toArray()
          kernel.clear()
          console.log(this.gpuData.toArray())
        }, 100)
      } catch (e) {
        console.log('GPUjs us not working')
      }
    },
    animation1(e) {
      var stage = this.$refs.stage.getNode()
      var changeCircle1 = stage.findOne('.changeCircle1')
      var changeCircle2 = stage.findOne('.changeCircle2')
      var changeCircle3 = stage.findOne('.changeCircle3')
      // var amplitude = 600 // 移動的範圍
      // var period = 4000; // 時間頻率
      var anim = new Konva.Animation(function (frame) {
        // var dist = 50 * (frame.timeDiff / 1000);
        // var sum = Math.abs(amplitude * Math.sin((frame.time * 2 * Math.PI) / period)) + 300
        // changeCircle.x(sum)
        var co1 = Math.abs(Math.sin((frame.time * 2 * Math.PI) / 2000) / 2) + 0.5
        var co2 = Math.abs(Math.sin((frame.time * 2 * Math.PI) / 3000) / 2) + 0.5 // 美編選這個速度
        var co3 = Math.abs(Math.sin((frame.time * 2 * Math.PI) / 4000) / 2) + 0.5
        changeCircle1.fill(`rgba(216,58,59,${co1})`)
        changeCircle2.fill(`rgba(216,58,59,${co2})`)
        changeCircle3.fill(`rgba(216,58,59,${co3})`)
      }, stage);
      anim.start();
    },
    PathEvents(e) {
      console.log('hover')
      if (this.interval1 !== null) {
        clearInterval(this.interval1)
      }
      var pathPointsLength = e.target.getLength()
      var SelfRect = e.target.getSelfRect()
      // var getPointAtLength = e.target.getPointAtLength()
      console.log(e.target.getSelfRect())
      var arr = [] // 把整個piexl打包
      var tmp = {
        x: 0,
        y: 0,
      }
      for (var i = 0; i < pathPointsLength; i++) {
        tmp = {
          x: e.target.getPointAtLength(i).x,
          y: e.target.getPointAtLength(i).y
        }
        arr.push(tmp)
      }
      // console.log(arr)
      var filterAgeThan5 = arr.filter(function (item, index, array) {
        return item.y > SelfRect.y + (SelfRect.height * 0.08) && item.y <= SelfRect.y + (SelfRect.height * 0.1);
      });
      filterAgeThan5.sort(compare)
      console.log(filterAgeThan5)
      if (filterAgeThan5.length > 0) {
        this.PathNumbercircle.x = filterAgeThan5[0].x - 15
        this.PathNumbercircle.y = filterAgeThan5[0].y - 15
      }
      // 路徑動畫
      var index1 = 0
      var index2 = 0
      var index3 = 0
      this.interval1 = setInterval(() => {
        this.Pathcircle[0].x = e.target.getPointAtLength(index1).x
        this.Pathcircle[0].y = e.target.getPointAtLength(index1).y
        this.Pathcircle[1].x = e.target.getPointAtLength(index2).x
        this.Pathcircle[1].y = e.target.getPointAtLength(index2).y
        this.Pathcircle[2].x = e.target.getPointAtLength(index3).x
        this.Pathcircle[2].y = e.target.getPointAtLength(index3).y
        // console.log(e.target.getPointAtLength(index).x, e.target.getPointAtLength(index).y)
        index1 += Math.random() * 2
        index2 += Math.random() * 2
        index3 += Math.random() * 2
        if (index1 > pathPointsLength) {
          index1 = 0
        }
        if (index2 > pathPointsLength) {
          index2 = 0
        }
        if (index3 > pathPointsLength) {
          index3 = 0
        }
      }, 1)
      function compare(a, b) {
        if (a.x < b.x) {
          return -1;
        }
        if (a.x > b.x) {
          return 1;
        }
        return 0;
      }
    },
    testpath1(data1) {
      // var path = this.$refs.testtt.getNode()
      var ree = this.testSplineDemo(
        // [
        //   650, 50, 650, 100, 700, 100, 700, 50
        // ],
        // [378,12,333,19,269,55,179,107,90,231,294,352,360,321,400,275,417,231,452,143,450,69,426,28],
        data1,
        0.5,
        25,
        true
      )
      console.log(ree)
      // this.rrdd.points = ree
      var data = []
      var a = null
      ree.forEach((va, ie) => {
        if (ie % 2 === 0) {
          a = {
            x: 0,
            y: 0
          }
          a.x = va
        } else {
          a.y = va
          data.push(a)
        }
      })
      var p = "M" + data[0].x + " " + data[0].y;
      for (var z = 1; z < data.length; z = z + 1) {
        p = p + " L" + data[z].x + " " + data[z].y;
      }
      console.log(p)
      this.testpath.data = p
    },
    initSplint() {
      axios({
        method: 'get',
        url: `http://127.0.0.1:6189/api/monitor/object/data`,
        // data: InputScopeData,
      })
        .then((event) => {
          var arr = []
          var spline = event.data.spline
          console.log(spline)
          spline.forEach((index) => {
            arr.push({
              points: index.points,
              stroke: 'green',
              strokeWidth: 3,
              lineJoin: 'round',
              tension: 0.5,
              fillPatternImage: this.p,
              closed: true,
              group_name: index.group_name,
            })
          })
          this.testSpline1 = arr
          // this.dragObjectStatus = true
        })
        .catch((error) => console.log('error from axios', error))
    },
    clickRight(e) {
      e.evt.preventDefault()
      console.log(e)
      this.MenuX = e.evt.clientX
      this.MenuY = e.evt.clientY
      this.showMenu = true
    },
    overSpline(e) {
      console.log(e)
      console.log('over')
    },
    movepoint(e) {
      if (this.temp.length > 0) {
        console.log(
          this.testSpline.points[this.pointtotle - 1],
          this.testSpline.points[this.pointtotle - 2]
        )
        // 限制
        // var xxx = e.layerX
        // if (xxx > this.testSpline.points[this.pointtotle - 2] + 100) {
        //   xxx = this.testSpline.points[this.pointtotle - 2] + 100
        // } else if (xxx < this.testSpline.points[this.pointtotle - 2] - 100) {
        //   xxx = this.testSpline.points[this.pointtotle - 2] - 100
        // } else {
        //   xxx = e.layerX
        // }
        // var yyy = e.layerY
        // if (e.layerY > this.testSpline.points[this.pointtotle - 1] + 100) {
        //   yyy = this.testSpline.points[this.pointtotle - 1] + 100
        // } else if (yyy < this.testSpline.points[this.pointtotle - 1] - 100) {
        //   yyy = this.testSpline.points[this.pointtotle - 1] - 100
        // } else {
        //   yyy = e.layerY
        // }
        // end
        this.testSpline.points[this.pointtotle] = e.layerX
        this.testSpline.points[this.pointtotle + 1] = e.layerY
        this.testSpline.tension = 0.49999
        setTimeout(() => {
          this.testSpline.tension = 0.5
        }, 1)
      }
    },
    drawCanvas(e) {
      if (e.evt.which === 1) {
        if (this.removePoint.status) {
          this.removePoint.x = e.evt.layerX
          this.removePoint.y = e.evt.layerY
          this.removePoint.status = false
          this.removePoint.visible = true
        }
        if (
          e.target.name() === 'draw' ||
          e.target.name() === 'spline' ||
          e.target.name() === ''
        ) {
          this.temp.push(e.evt.layerX)
          this.temp.push(e.evt.layerY)
          this.testSpline = {
            points: this.temp,
            stroke: 'green',
            strokeWidth: 3,
            lineJoin: 'round',
            fillPatternImage: this.p,
            closed: false,
            tension: 0.49999,
            name: 'spline',
          }
          this.pointtotle += 2
          setTimeout(() => {
            this.testSpline.tension = 0.5
          }, 1)
        } else if (e.target.name() === 'removePoint') {
          this.addspline()
        }
      }
    },
    addspline() {
      this.testSpline.closed = true
      this.testSpline.points.pop()
      this.testSpline.points.pop()
      // axios({
      //   method: 'post',
      //   url: `http://127.0.0.1:6189/api/monitor/object/add/spline`,
      //   data: this.testSpline,
      // })
      //   .then((event) => {
      //     setTimeout(() => {
      this.testpath1(this.testSpline.points)
      this.testSpline.points = []
      //   }, 500)
      // })
      // .catch((error) => console.log('error from axios', error))
      console.log(this.testSpline)
      this.temp = []
      this.pointtotle = 0
      this.removePoint.status = true
      this.removePoint.visible = false
    },
    focusObject(e) {
      this.focusObjectData = e
    },
    changetension(data) {
      this.testSpline1[this.focusObjectData].tension = data
    },
    circleEvents(e) {
      console.log(e)
      if (e === 1) {
        document.body.style.cursor = 'pointer'
      } else {
        document.body.style.cursor = 'default'
      }
    },
    reset() {
      axios({
        method: 'get',
        url: `http://127.0.0.1:6189/api/monitor/object/reset`,
      }).catch((error) => console.log('error from axios', error))
    },
    // 機樣函數
    testSplineDemo(points, tension, numOfSeg, close) {
      tension = typeof tension === 'number' ? tension : 0.5
      // numOfSeg = typeof numOfSeg === 'number' ? numOfSeg : 25
      numOfSeg = 70

      var pts // for cloning point array
      var i = 1
      var l = points.length
      var rPos = 0
      var rLen = (l - 2) * numOfSeg + 2 + (close ? 2 * numOfSeg : 0)
      var res = new Float32Array(rLen)
      var cache = new Float32Array((numOfSeg + 2) * 4)
      var cachePtr = 4
      var st, st2, st3, st23, st32, parse

      pts = points.slice(0)
      if (close) {
        pts.unshift(points[l - 1]) // insert end point as first point
        pts.unshift(points[l - 2])
        pts.push(points[0], points[1]) // first point as last point
      } else {
        pts.unshift(points[1]) // copy 1. point and insert at beginning
        pts.unshift(points[0])
        pts.push(points[l - 2], points[l - 1]) // duplicate end-points
      }
      // cache inner-loop calculations as they are based on t alone
      cache[0] = 1 // 1,0,0,0
      for (; i < numOfSeg; i++) {
        st = i / numOfSeg
        st2 = st * st
        st3 = st2 * st
        st23 = st3 * 2
        st32 = st2 * 3
        cache[cachePtr++] = st23 - st32 + 1 // c1
        cache[cachePtr++] = st32 - st23 // c2
        cache[cachePtr++] = st3 - 2 * st2 + st // c3
        cache[cachePtr++] = st3 - st2 // c4
      }
      cache[++cachePtr] = 1 // 0,1,0,0

      parse = function (pts, cache, l) {
        var i = 2
        var t, pt1, pt2, pt3, pt4, t1x, t1y, t2x, t2y, c, c1, c2, c3, c4

        for (i; i < l; i += 2) {
          pt1 = pts[i]
          pt2 = pts[i + 1]
          pt3 = pts[i + 2]
          pt4 = pts[i + 3]
          t1x = (pt3 - pts[i - 2]) * tension
          t1y = (pt4 - pts[i - 1]) * tension
          t2x = (pts[i + 4] - pt1) * tension
          t2y = (pts[i + 5] - pt2) * tension
          for (t = 0; t < numOfSeg; t++) {
            // t * 4;
            c = t << 2 // jshint ignore: line
            c1 = cache[c]
            c2 = cache[c + 1]
            c3 = cache[c + 2]
            c4 = cache[c + 3]

            res[rPos++] = c1 * pt1 + c2 * pt3 + c3 * t1x + c4 * t2x
            res[rPos++] = c1 * pt2 + c2 * pt4 + c3 * t1y + c4 * t2y
          }
        }
      }

      // calc. points
      parse(pts, cache, l)

      if (close) {
        // l = points.length;
        pts = []
        pts.push(points[l - 4], points[l - 3], points[l - 2], points[l - 1]) // second last and last
        pts.push(points[0], points[1], points[2], points[3]) // first and second
        parse(pts, cache, 4)
      }
      // add last point
      l = close ? 0 : points.length - 2
      res[rPos++] = points[l]
      res[rPos] = points[l + 1]

      return res
    },
  },
}
</script>

<style>
#drawCanvas {
  width: 100;
}
</style>