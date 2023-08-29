<template>
  <div>
    <v-btn @click="() => {
      backgroundws = 'http://localhost:3000/20221214_T092431.jpg?'+ Math.random() * 999999999;
    }">Img</v-btn>
    <div class="testIDDD">
      <div v-for="i in totle" :key="i" :id="`testID-d${i}`" class="testID12312">
        <canvas :id="`canvas-testID-d${i}`"></canvas>
        <KonvaDisplayData :image="backgroundws" />
      </div>
    </div>
    <div class="testIDDD1cover">
      <div class="testIDDD1" id="testIDDD1">
        <!-- <img id="preview" /> -->
      </div>
    </div>
  </div>
</template>
<script>
// import Konva from 'konva'
import KonvaDisplayData from '../components/Index/konva-display-data.vue'
export default {
  components: {
    KonvaDisplayData
  },
  data: () => ({
    totle: 1,
    ws: null,
    backgroundws: null
  }),
  mounted() {
    setTimeout(() => {
      this.backgroundws = 'http://localhost:3000/20221214_T092436.jpg'
    }, 2000)
    // this.ws = new WebSocket('ws://localhost:8777')
    this.ws = new WebSocket('ws://localhost:6188/server1')
    this.ws.onopen = () => {
      console.log('連線成功')
    }
    let prevObjectURL = null
    this.ws.onmessage = (event) => {
      var data = JSON.parse(event.data)
      var blob = getBlob(atob(data[0].img), 'image/jpg')
      var objectURL = URL.createObjectURL(blob)
      var e = []
      for (var i = 1; i <= this.totle; i++) {
        e.push(i)
      }
      e.forEach((val) => {
        // console.log(val)
        const canvas = document.getElementById(`canvas-testID-d${val}`)
        var img = new Image()
        // img.src = 'data:image/jpeg;base64,' + data[0].img
        var ctx = canvas.getContext('2d')
        var wwwww = document.getElementById(`testID-d${val}`).offsetWidth
        var hhhhh = document.getElementById(`testID-d${val}`).offsetHeight
        img.onload = function () {
          canvas.width = wwwww
          canvas.height = hhhhh
          // URL.revokeObjectURL(url)
          ctx.drawImage(img, 0, 0, wwwww, hhhhh)
        }
        // this.backgroundws = objectURL
        // img.src = objectURL
      })
      URL.revokeObjectURL(prevObjectURL)
      prevObjectURL = objectURL
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
    // var stage = this.$refs.stage.getNode()
    // const previewStage = new Konva.Stage({
    //   container: 'testIDDD1',
    //   width: 640,
    //   height: 480,
    //   scaleX: 1 / 4,
    //   scaleY: 1 / 4,
    // });
    // setTimeout(() => {
    //   console.log(Konva)
    //   console.log(stage)
    // }, 3000)

    // const previewLayer = stage.clone({ listening: false });
    // previewStage.add(previewLayer);
    // const layer = new Konva.Layer();

  },
}
</script>
<style>
.testIDDD {
  width: 80%;
  display: grid;
  /* grid-template-columns: 20% 20% 20% 20%; */
  grid-template-columns: 50% 50%;
}

.testID12312 {
  width: 100%;
  height: 0;
  padding-bottom: 70%;
  /* background-color:rgb(207, 88, 88); */
  position: relative;
}

.testIDDD1cover {
  width: 640px;
  height: 480px;
  position: relative;
}

#testIDDD1 {
  width: 100%;
  height: 0;
  padding-bottom: 70%;
}

#preview {
  width: 640px;
  height: 480px;
}
</style>