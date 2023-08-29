<template>
  <div>
    <v-stage
      ref="stage"
      :config="configKonva"
      @mousedown="handleStageMouseDown"
      @touchstart="handleStageMouseDown"
      @mousemove="mousemovekonva"
    >
      <v-layer ref="layer">
        <v-shape
          v-for="i in Math.floor(1920 / col)"
          :key="i"
          :config="{
            sceneFunc: function (context, shape) {
              context.beginPath()
              context.moveTo(0, i * col)
              context.lineTo(1920, i * col)
              context.fillText(i * col, 0, i * col)

              context.moveTo(i * col, 0)
              context.lineTo(i * col, 500)
              context.fillText(i * col, i * col, 10)
              // special Konva.js method
              context.fillStrokeShape(shape)
            },
            stroke: 'gray',
            strokeWidth: 1,
          }"
        ></v-shape>
        <v-shape
          :config="{
            anchorStroke: 'red',
            anchorFill: 'yellow',
            anchorSize: 20,
            borderStroke: 'green',
            borderDash: [3, 3],
            nodes: [circle],
          }"
        ></v-shape>
        <v-circle
          v-for="(item, index) in configCircle"
          :key="index"
          :config="item"
        ></v-circle>
        <v-transformer ref="transformer" />
      </v-layer>
    </v-stage>
    <v-btn @click="test ? (test = false) : (test = true)">{{
      test ? "取消跟隨" : "跟隨"
    }}</v-btn>
  </div>
</template>
<script>
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
      col: 30,
      configKonva: {},
      configCircle: [],
      Konva: null, // 宣告Konva
      test: false,
    }
  },
  mounted() {
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
    var width = window.innerWidth
    // var height = window.innerHeight
    this.configKonva = {
      width,
      height: '500',
    }
    this.configCircle = [
      {
        x: 200,
        y: 100,
        radius: 50,
        fill: 'green',
        // [x1,y1,x2,y2]
        // points: [23, 20, 23, 160, 70, 93],
        // fillPatternImage: p,
        // stroke: 'red',
        // strokeWidth: 2,
        // closed: true,
        name: 'rect1',
        draggable: true,
      },
    ]

    // canvas.addEventListener('mousemove', this.draw)
  },
  methods: {
    mousemovekonva(e) {
      console.log({ x: e.evt.layerX, y: e.evt.layerY })
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
  },
}
</script>

<style>
</style>