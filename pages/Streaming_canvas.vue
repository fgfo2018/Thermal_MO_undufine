<template>
  <div>
    <canvas v-for="i in totle" :key="i" :id="'canvas' + i" width="320" height="230"></canvas>
    <!-- <canvas id="canvas0" width="640" height="480"></canvas> -->
    <!-- <canvas id="canvas1" width="640" height="480"></canvas> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      totle: 12
    }
  },
  mounted() {
    this.ws1 = this.$myPlugin.webSocketconnect01()
    var worker = new Worker('/worker/streaming-canvas.js');
    worker.addEventListener('message', (e) => {
      console.log(e);
    })
    for (var i = 1; i <= this.totle; i++) {
      const canvas = document.getElementById("canvas" + i)
      const offscreen = canvas.transferControlToOffscreen()
      worker.postMessage({
        type: 'init',
        offscreen,
      }, [offscreen])
    }
    const messageEvent = (e) => {
      var data = JSON.parse(e.data)
      worker.postMessage({
        type: 'send',
        base64: data,
      })
    }
    this.ws1.addEventListener("message", messageEvent)
    // ---------

    // function loadImageWithImageTag(src) {
    //   return new Promise((resolve, reject) => {
    //     const img = new Image;
    //     img.crossOrigin = '';
    //     img.src = src;
    //     img.onload = () => { resolve(img); };
    //     img.onerror = () => { reject(img); };
    //   });
    // }

    // function createWorker(f) {
    //   return new Worker(URL.createObjectURL(new Blob([`(${f})()`])));
    // }

    // const worker = createWorker(() => {
    //   self.addEventListener('message', e => {
    //     const src = e.data;
    //     fetch(src, { mode: 'cors' })
    //       .then(response => response.blob())
    //       .then(blob => createImageBitmap(blob))
    //       .then(bitmap => {
    //         self.postMessage({ src, bitmap }, [bitmap]);
    //       });
    //   });
    // });

    // function loadImageWithWorker(src) {
    //   return new Promise((resolve, reject) => {
    //     function handler(e) {
    //       if (e.data.src === src) {
    //         worker.removeEventListener('message', handler);
    //         if (e.data.error) {
    //           reject(e.data.error);
    //         }
    //         resolve(e.data.bitmap);
    //       }
    //     }
    //     worker.addEventListener('message', handler);
    //     worker.postMessage(src);
    //   });
    // }
    // const loader = loadImageWithWorker;
    // const messageEvent = (e) => {
    //   var data = JSON.parse(e.data)
    //   data = data.cam_00_00001
    //   // console.log(data);
    //   loader('data:image/jpeg;base64,' + data).then(img => {
    //     for (var i = 1; i <= this.totle; i++) {
    //       const ctx = document.getElementById('canvas' + i).getContext('2d');
    //       ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);
    //     }
    //   });
    // }
    // const loader = loadImageWithImageTag;


    // this.ws1.addEventListener("message", messageEvent)
  },
  methods: {},
  beforeDestroy() { }
}
</script>

<style></style>