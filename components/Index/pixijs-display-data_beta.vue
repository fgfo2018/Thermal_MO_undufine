<template>
    <!-- <div :class="'only'+ canvasId"> -->
    <div :id="canvasId"></div>
    <!-- </div> -->
</template>
<script>


export default {
    props: ['roidata', 'canvasId', 'camId', 'size'],
    data() {
        return {}
    },
    watch: {},
    mounted() {
        const PIXI = window.PIXI
        const worker = new Worker('/worker/pixijs.js');

        const width = 800;
        const height = 600;
        const resolution = window.devicePixelRatio;
        const canvas = document.createElement('canvas');
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        var div = document.getElementById(this.canvasId);
        div.appendChild(canvas);
        const view = canvas.transferControlToOffscreen();
        console.log(PIXI , window.PIXI_WEBWORKER_URL);
        // const baseUrl = window.location.href;
        // const pixiWebWorkerUrl = window.PIXI_WEBWORKER_URL;
        worker.postMessage({
            // baseUrl,
            // pixiWebWorkerUrl,
            options: {
                width, height, resolution, view, background: 0x1099bb,
            },
        }, [view]);
    },
    methods: {},
    // 脫鉤(nuxt生命週期)
    beforeDestroy() {}
}
</script>
<style>
/* .links {
  width: 800px;
  height: 640px;
} */
</style>