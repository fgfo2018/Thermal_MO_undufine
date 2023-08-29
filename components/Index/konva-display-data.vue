<template>
    <div class="Konva-canvas" :class="konvaUpdataS === false ? 'forcehide' : ''">
        <!-- <div class="Konva-canvas"> -->
        <v-stage ref="stage" :config="configKonva">
            <v-layer ref="layer">
                <v-group v-for="(itemSpots, index) in spots" :key="'spotsK' + index" :config="{
                    x: itemSpots.spot_position.X,
                    y: itemSpots.spot_position.Y,
                    draggable: true,
                    offsetX: 16.5,
                    offsetY: 16.5,
                }">
                    <v-circle :config="{
                        radius: 9,
                        fill: '#fff',
                        offsetX: 0,
                        offsetY: 5,
                        stroke: 'black',
                        strokeWidth: 1,
                        shadowBlur: 3,
                    }" />
                    <v-image :config="{
                        image: konvaSpot,
                    }" />
                    <v-text :config="{
                        text: itemSpots.spot_number,
                        fontSize: 14,
                        fill: 'black',
                        offsetX: 4,
                        offsetY: 10,
                    }" />
                </v-group>
                <!-- scope -->
                <v-rect v-for="(itemScopes1, index) in dragScopeTempData" :key="'scopeK' + index" :config="{
                    x: itemScopes1.scope_position_point_LT.X,
                    y: itemScopes1.scope_position_point_LT.Y,
                    width: itemScopes1.scope_position_point_BR.X,
                    height: itemScopes1.scope_position_point_BR.Y,
                    stroke: 'black',
                    strokeWidth: 4,
                }" />
                <v-rect v-for="(itemScopes, index) in scopes" :key="'scopeH' + index" :config="{
                    x: itemScopes.scope_position_point_LT.X,
                    y: itemScopes.scope_position_point_LT.Y,
                    width: itemScopes.scope_position_point_BR.X,
                    height: itemScopes.scope_position_point_BR.Y,
                    stroke: itemScopes.approval === 1 ? 'rgba(216,58,59,0.7)' : '#fff',
                    strokeWidth: 2,
                    strokeScaleEnabled: false,
                    draggable: true,
                    name: 'scope' + itemScopes.scope_number,
                }" />
                <v-circle v-for="(itemScopes, index) in scopes" :key="'scopez' + index" :config="{
                    x: itemScopes.scope_position_point_LT.X,
                    y: itemScopes.scope_position_point_LT.Y,
                    radius: 9,
                    fill: itemScopes.approval === 1 ? 'rgba(216,58,59,0.7)' : '#fff',
                    offsetX: 10,
                    offsetY: 5,
                    stroke: itemScopes.approval === 1 ? 'rgba(216,58,59,0)' : 'black',
                    strokeWidth: 1,
                    shadowBlur: 3,
                }" />
                <v-text v-for="(itemScopes, index) in scopes" :key="'scopeasd' + index" :config="{
                    x: itemScopes.scope_position_point_LT.X,
                    y: itemScopes.scope_position_point_LT.Y,
                    text: itemScopes.scope_number,
                    fontSize: 14,
                    fill: 'black',
                    offsetX: 14,
                    offsetY: 10,
                }" />
                <!-- line -->
                <v-group v-for="(itemLines, index) in lines" :key="'lineK' + index">
                    <v-line :config="{
                        points: [
                            itemLines.line_position_point_B.X,
                            itemLines.line_position_point_B.Y,
                            itemLines.line_position_point_A.X,
                            itemLines.line_position_point_A.Y,
                        ],
                        stroke: 'black',
                        strokeWidth: 4,
                    }"></v-line>
                    <v-line :config="{
                        x: 0,
                        y: 0,
                        points: [
                            itemLines.line_position_point_B.X,
                            itemLines.line_position_point_B.Y,
                            itemLines.line_position_point_A.X,
                            itemLines.line_position_point_A.Y,
                        ],
                        stroke: '#fff',
                        strokeWidth: 2,
                    }"></v-line>
                    <v-circle :config="{
                        x: itemLines.line_position_point_A.X,
                        y: itemLines.line_position_point_A.Y,
                        draggable: true,
                        radius: 7,
                        fill: '#051a1fk',
                        stroke: '#fff',
                        strokeWidth: 1,
                    }" />
                    <v-circle :config="{
                        x: itemLines.line_position_point_B.X,
                        y: itemLines.line_position_point_B.Y,
                        draggable: true,
                        radius: 7,
                        fill: '#051a1f',
                        stroke: '#fff',
                        strokeWidth: 1,
                    }" />
                    <v-circle :config="{
                        x: itemLines.line_position_point_B.X,
                        y: itemLines.line_position_point_B.Y,
                        radius: 9,
                        fill: '#fff',
                        offsetX: 20,
                        offsetY: 15,
                        stroke: 'black',
                        strokeWidth: 1,
                        shadowBlur: 3,
                    }" />
                    <v-text :config="{
                        x: itemLines.line_position_point_B.X,
                        y: itemLines.line_position_point_B.Y,
                        text: itemLines.line_number,
                        fontSize: 14,
                        fill: 'black',
                        offsetX: 24,
                        offsetY: 21,
                    }" />
                </v-group>
                <v-path v-for="(item, index) in blobItems" :key="'sp' + index" :config="item"></v-path>
                <v-circle v-for="(item, index) in blobnumbers" :key="'s11p' + index" :config="{
                    x: item.x,
                    y: item.y,
                    fill: item.fill,
                    radius: 10
                }"></v-circle>
                <v-text v-for="(item, index) in blobnumbers" :key="'s11pqwe' + index" :config="{
                    x: item.x,
                    y: item.y,
                    width: 20,
                    text: item.blob_number,
                    fontSize: 14,
                    fill: 'black',
                    offsetX: 10,
                    offsetY: 6,
                    align: 'center'
                }" />
                <!-- 暫存用 -->
                <v-line :config="blobTempsData"></v-line>
                <!-- <v-circle :config="removePoint" ref="circleZindexTop">
                    </v-circle> -->
                <!-- spline end -->
                <!-- 編輯點 -->
                <v-circle v-for="(item, index) in drageObjects" :key="'revies' + index" :config="item"></v-circle>
                <!-- end -->
                <!-- <v-transformer ref="transformer" @transformstart="transformlimit" :config="transformerConfig" /> -->
            </v-layer>
        </v-stage>
    </div>
</template>
<script>

import Konva from 'konva'
import axios from 'axios'
export default {
    // 定義:
    // size 給指定元素ID，自動抓取該元素寬高 [選填] | 預設 640 * 480
    // image 給予背景圖片 [選填] | 空值背景為透明 [選填]
    // zoom 指定某元素ID，將給予background url postion [選填]
    props: ['size', 'image', 'zoom', 'roi', 'cam_id', 'tabVal', 'roiData'],
    data: () => ({
        animationPoint: [],
        workerBuffer: true,
        konvaUpdataS: false,
        canvasWidth: 0,
        canvasHeight: 0,
        imgbackground: {
            width: 0,
            height: 0,
            image: null
        },
        configKonva: {
            width: 0,
            height: 0,
        },
        spots: [],
        scopes: [],
        lines: [],
        blobItems: [],
        blobnumbers: [],
        blobTempsData: {},
        recordChangeblob: null, // 保存被觸發的blob
        drageObjects: {},
        dragScopeTempData: [],
        konvaSpot: null,
        reference: null,
        dragObjectStatus: true,
        temperatureChange: [
            ['rgba(216,58,59,0)',
                'rgba(216,58,59,0.4)'],
            ['rgb(255 199 82 / 0%)',
                'rgb(255 199 82 / 50%)'],
            ['rgba(216,58,59,0.4)',
                'rgba(216,58,59,0)'],
            ['rgb(255 199 82 / 50%)',
                'rgb(255 199 82 / 0%)']],
        Interval1: null,
        webs1: null,
        anim: null,
        saveBlob: null,
        saveBlob1: [],
        saveBlobChanges: true,
        anim1: null
    }),
    watch: {
        image: {
            handler(val) {
                if (val !== null) {
                    this.loadimage1(val)
                }
                // function getBlob(byteString, mimeString) {
                //     var ab = new ArrayBuffer(byteString.length)
                //     var ia = new Uint8Array(ab)
                //     for (var i = 0; i < byteString.length; i++) {
                //         ia[i] = byteString.charCodeAt(i)
                //     }
                //     var blob = new Blob([ab], { type: mimeString })
                //     return blob
                // }
            }
        },
        roiData(data) {
            this.Refresh1(data)
        },
    },
    mounted() {
        // setInterval(() => {
        //     var testws = this.$myPlugin.webSocketconnect()
        //     testws.send(JSON.stringify({
        //         type: 'getRoiData'
        //     }))
        //     console.log('send');
        // }, 1000)
        // console.log(window.location.hostname)
        // console.log("konva-p", this.cam_id)
        if (this.size === undefined) {
            this.canvasWidth = 640
            this.canvasHeight = 480
            this.konvaUpdataS = false
        } else {
            this.canvasWidth = document.getElementById(this.size).clientWidth
            this.canvasHeight = document.getElementById(this.size).clientHeight
            this.konvaUpdataS = true
        }

        var SpotsImage = new window.Image()
        SpotsImage.src = '/images/spot_1.png'
        SpotsImage.onload = () => {
            this.konvaSpot = SpotsImage
            SpotsImage = null
        }
        console.log(Konva)
        this.configKonva = {
            width: this.canvasWidth,
            height: this.canvasHeight,
        }
        this.imgbackground.width = this.canvasWidth
        this.imgbackground.height = this.canvasHeight
        // this.Refresh()
        if (this.konvaUpdataS) {
            // this.Interval1 = setInterval(() => {
            // console.log(document.getElementById(this.size).offsetWidth)
            // this.Refresh()
            // }, 1000)
            // setTimeout(() => {
            this.konvaAnimation()
            this.Refresh1()
            // }, 10000)
        }
    },
    // created() {
    //     console.log('created')
    // },
    methods: {
        loadimage1(val) {
            var image = new window.Image();
            image.crossOrigin = 'Anonymous';
            image.src = val;
            console.log(val);
            image.onload = () => {
                console.log("圖片載入完成");
                // set image only when it is loaded
                this.imgbackground.image = image;
                if (this.roi === false) {
                    this.staticStartNotRoi()
                } else {
                    this.staticStartNotRoi()
                    // this.staticStart()
                }
                image = null
            }
            image.onerror = () => {
                console.log("圖片載入錯誤");
                setTimeout(() => {
                    this.loadimage1(val)
                    console.log("重新下載圖片");
                }, 2000)
                image = null
            }
        },
        staticStart() {
            axios({
                method: 'post',
                url: 'http://localhost:5002/api/monitor/object/data',
                // url: 'http://127.0.0.1:6189/api/monitor/object/data',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: JSON.stringify([
                    {
                        cam_id: this.camid,
                    },
                ]),
            })
                .then((params) => {
                    var stage = this.$refs.stage.getNode()
                    var layer = this.$refs.layer.getNode()
                    // layer.destroy();
                    var background = new Konva.Image(this.imgbackground);
                    layer.add(background);
                    // 參考點
                    var reference = params.data.reference[0]
                    var sumtmp = ''
                    if (reference.reference_temperature != null) {
                        sumtmp = reference.reference_temperature.toFixed(1)
                    }
                    var referenceArr = {
                        reference_temperature: sumtmp,
                        X:
                            reference.reference_position.X *
                            this.canvasWidth,
                        Y:
                            reference.reference_position.y *
                            this.canvasHeight,
                    }
                    this.reference = referenceArr
                    // 取得"點"資料
                    var array = params.data.spot
                    // console.log(params.data.spot)
                    array.forEach((index) => {
                        var group = new Konva.Group({
                            x: index.spot_position.X *
                                this.canvasWidth,
                            y: index.spot_position.Y *
                                this.canvasHeight,
                            draggable: true,
                            offsetX: 16.5,
                            offsetY: 16.5,
                        });
                        var circle1 = new Konva.Circle({
                            radius: 9,
                            fill: '#fff',
                            offsetX: -36,
                            offsetY: 5,
                            stroke: 'black',
                            strokeWidth: 1,
                            shadowBlur: 3,
                        });
                        var yoda = new Konva.Image({
                            image: this.konvaSpot,
                        });
                        var simpleText = new Konva.Text({
                            text: index.spot_number,
                            fontSize: 14,
                            fill: 'black',
                            offsetX: -32,
                            offsetY: 10,
                        });
                        group.add(circle1);
                        group.add(yoda);
                        group.add(simpleText);
                        layer.add(group);
                        circle1 = null
                        yoda = null
                        simpleText = null
                        group = null
                    })
                    // 取得"點"資料 end
                    // 取得"範圍"資料
                    var scopes = params.data.scope
                    scopes.forEach((index) => {
                        var rect1 = new Konva.Rect({
                            x: index.scope_position_point_LT.X *
                                this.canvasWidth,
                            y: index.scope_position_point_LT.Y *
                                this.canvasHeight,
                            width: this.canvasWidth *
                                (index.scope_position_point_BR.X -
                                    index.scope_position_point_LT.X),
                            height: this.canvasHeight *
                                (index.scope_position_point_BR.Y -
                                    index.scope_position_point_LT.Y),
                            stroke: 'black',
                            strokeWidth: 4,
                        });
                        var rect2 = new Konva.Rect({
                            x: index.scope_position_point_LT.X *
                                this.canvasWidth,
                            y: index.scope_position_point_LT.Y *
                                this.canvasHeight,
                            width: this.canvasWidth *
                                (index.scope_position_point_BR.X -
                                    index.scope_position_point_LT.X),
                            height: this.canvasHeight *
                                (index.scope_position_point_BR.Y -
                                    index.scope_position_point_LT.Y),
                            stroke: '#fff',
                            strokeWidth: 2,
                            strokeScaleEnabled: false,
                        });
                        layer.add(rect1);
                        layer.add(rect2);
                        rect1 = null
                        rect2 = null
                    })
                    // 取得"範圍"資料 end
                    // 取得"線"資料
                    var lines = params.data.line
                    lines.forEach((index) => {
                        var group = new Konva.Group({
                        });
                        var L1 = new Konva.Line({
                            points: [
                                index.line_position_point_B.X *
                                this.canvasWidth,
                                index.line_position_point_B.Y *
                                this.canvasHeight,
                                index.line_position_point_A.X *
                                this.canvasWidth,
                                index.line_position_point_A.Y *
                                this.canvasHeight,
                            ],
                            stroke: 'black',
                            strokeWidth: 4,
                        });
                        var L2 = new Konva.Line({
                            x: 0,
                            y: 0,
                            points: [
                                index.line_position_point_B.X *
                                this.canvasWidth,
                                index.line_position_point_B.Y *
                                this.canvasHeight,
                                index.line_position_point_A.X *
                                this.canvasWidth,
                                index.line_position_point_A.Y *
                                this.canvasHeight,
                            ],
                            stroke: '#fff',
                            strokeWidth: 2,
                        });
                        var circle1 = new Konva.Circle({
                            x: index.line_position_point_A.X *
                                this.canvasWidth,
                            y: index.line_position_point_A.Y *
                                this.canvasHeight,
                            radius: 7,
                            fill: '#051a1f',
                            stroke: '#fff',
                            strokeWidth: 1,
                        });
                        var circle2 = new Konva.Circle({
                            x: index.line_position_point_B.X *
                                this.canvasWidth,
                            y: index.line_position_point_B.Y *
                                this.canvasHeight,
                            radius: 7,
                            fill: '#051a1f',
                            stroke: '#fff',
                            strokeWidth: 1,
                        });
                        var circle3 = new Konva.Circle({
                            x: index.line_position_point_B.X *
                                this.canvasWidth,
                            y: index.line_position_point_B.Y *
                                this.canvasHeight,
                            radius: 9,
                            fill: '#fff',
                            offsetX: -20,
                            offsetY: 15,
                            stroke: 'black',
                            strokeWidth: 1,
                            shadowBlur: 3,
                        });
                        var simpleText = new Konva.Text({
                            x: index.line_position_point_B.X *
                                this.canvasWidth,
                            y: index.line_position_point_B.Y *
                                this.canvasHeight,
                            text: index.line_number,
                            fontSize: 14,
                            fill: 'black',
                            offsetX: -16,
                            offsetY: 21,
                        });
                        group.add(L1);
                        group.add(L2);
                        group.add(circle1);
                        group.add(circle2);
                        group.add(circle3);
                        group.add(simpleText);
                        layer.add(group);
                        L1 = null
                        L2 = null
                        circle1 = null
                        circle2 = null
                        circle3 = null
                        simpleText = null
                        group = null
                    })
                    // 取得"線"資料 end
                    // 取得"blob"資料'
                    try {
                        var blobnumber = []
                        var blob = params.data.blob
                        blob.forEach((index) => {
                            blobnumber.push(index.blob_number)
                            if (index.blob_number !== this.recordChangeblob) {
                                var ar = this.currentIndex(index)
                                ar.forEach((item) => {
                                    var newarray = this.staticImage(item)
                                    var path = new Konva.Path(newarray);
                                    layer.add(path);
                                    newarray = null
                                    path = null
                                })
                                ar = null
                            }
                        })
                        var pathList = stage.find('.blobFind')
                        var drawBlobNumber = this.staticNumber(pathList)
                        drawBlobNumber.forEach((index) => {
                            var circle1 = new Konva.Circle({
                                x: index.x,
                                y: index.y,
                                fill: index.fill,
                                radius: 10
                            });
                            var simpleText = new Konva.Text({
                                x: index.x,
                                y: index.y,
                                width: 20,
                                text: index.blob_number,
                                fontSize: 14,
                                fill: 'black',
                                offsetX: 10,
                                offsetY: 6,
                                align: 'center'
                            });
                            layer.add(circle1);
                            layer.add(simpleText);
                            circle1 = null
                            simpleText = null
                        })
                        stage.add(layer);
                        this.updatePreview(stage)
                        blobnumber = null
                        blob = null
                        pathList = null
                        drawBlobNumber = null

                    } catch (e) {
                        console.log(e)
                    }
                    stage = null
                    layer = null
                    background = null
                    reference = null
                    sumtmp = null
                    referenceArr = null
                    array = null
                    scopes = null
                    lines = null
                })
                .then((error) => console.log(error))
        },
        staticStartNotRoi() {
            var stage = this.$refs.stage.getNode()
            var layer = this.$refs.layer.getNode()
            // layer.destroy();
            var background = new Konva.Image(this.imgbackground);
            layer.add(background);
            stage.add(layer);
            this.updatePreview(stage)
            stage = null
            layer = null
            background = null
        },
        updatePreview(stage) {
            try {
                var scale = 1;
                // use pixelRatio to generate smaller preview
                var url = stage.toDataURL({ pixelRatio: scale });
                // document.getElementById('preview').src = url;
                // document.getElementById('testIDDD1').style.background = `url(${url}) center center no-repeat`;
                // document.getElementById('testIDDD1').style.backgroundSize = '100%'
                // console.log('123')
                this.$emit('renderinge', url)
                scale = null
                url = null
            } catch (e) {
                console.log(e)
            }
        },
        // 總呼叫程序
        Refresh1(event) {
            try {
                if (this.size !== undefined) {
                    if (document.getElementById(this.size).clientWidth > 10 && document.getElementById(this.size).clientHeight > 10) {
                        this.canvasWidth = document.getElementById(this.size).clientWidth
                        this.canvasHeight = document.getElementById(this.size).clientHeight
                        this.configKonva = {
                            width: this.canvasWidth,
                            height: this.canvasHeight,
                        }
                    }
                }
                var params = JSON.parse(event.data)
                params = { data: params[this.cam_id] }
                var reference = params.data.reference[0]
                var sumtmp = ''
                if (reference.reference_temperature != null) {
                    sumtmp = reference.reference_temperature.toFixed(1)
                }
                var referenceArr = {
                    reference_temperature: sumtmp,
                    X:
                        reference.reference_position.X *
                        this.canvasWidth,
                    Y:
                        reference.reference_position.y *
                        this.canvasHeight,
                }
                this.reference = referenceArr
                // 取得"點"資料
                var array = params.data.spot
                array.forEach((index) => {
                    if (index.spot_temperature != null) {
                        index.spot_temperature = index.spot_temperature.toFixed(1)
                    }
                    index.spot_position.X =
                        index.spot_position.X *
                        this.canvasWidth
                    index.spot_position.Y =
                        index.spot_position.Y *
                        this.canvasHeight
                })
                if (this.dragObjectStatus) {
                    this.spots = params.data.spot
                }
                // 取得"點"資料 end
                // 取得"範圍"資料
                var scopes = params.data.scope
                scopes.forEach((index) => {
                    if (index.scope_temperature_max != null) {
                        index.scope_temperature_max =
                            index.scope_temperature_max.toFixed(1)
                    }
                    index.scope_position_point_BR.X =
                        this.canvasWidth *
                        (index.scope_position_point_BR.X -
                            index.scope_position_point_LT.X)
                    index.scope_position_point_BR.Y =
                        this.canvasHeight *
                        (index.scope_position_point_BR.Y -
                            index.scope_position_point_LT.Y)

                    index.scope_position_point_LT.X =
                        index.scope_position_point_LT.X *
                        this.canvasWidth
                    index.scope_position_point_LT.Y =
                        index.scope_position_point_LT.Y *
                        this.canvasHeight
                })
                if (this.dragObjectStatus) {
                    this.scopes = params.data.scope
                    this.dragScopeTempData = params.data.scope
                }
                // 取得"範圍"資料 end
                // 取得"線"資料
                var lines = params.data.line
                lines.forEach((index) => {
                    if (index.line_temperature_max != null) {
                        index.line_temperature_max = index.line_temperature_max.toFixed(1)
                    }
                    index.line_position_point_A.X =
                        index.line_position_point_A.X *
                        this.canvasWidth
                    index.line_position_point_A.Y =
                        index.line_position_point_A.Y *
                        this.canvasHeight
                    index.line_position_point_B.X =
                        index.line_position_point_B.X *
                        this.canvasWidth
                    index.line_position_point_B.Y =
                        index.line_position_point_B.Y *
                        this.canvasHeight
                })
                if (this.dragObjectStatus) {
                    this.lines = params.data.line
                }
                // 取得"線"資料 end
                // 取得"blob"資料'
                try {
                    // ---- 2023-01-31
                    var blob = params.data.blob
                    var worker = new Worker('/worker/object.js');
                    worker.postMessage(
                        {
                            data: blob,
                            height: this.canvasHeight,
                            width: this.canvasWidth
                        });
                    worker.addEventListener('message', (e) => {
                        this.blobItems = e.data
                        worker.terminate()
                    }, false);
                } catch (e) {
                    console.log(e)
                }
                reference = null
                sumtmp = null
                referenceArr = null
                array = null
                scopes = null
                lines = null
                // this.blobItems = arrblob
                // 取得"blob"資料 end
                this.Interval = 0
            } catch (error) {
                console.log(error)
            }
        },
        Refresh() {
            // axios({
            //     method: 'post',
            //     url: 'http://127.0.0.1:5002/api/monitor/object/data',
            //     // url: 'http://127.0.0.1:6189/api/monitor/object/data',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     data: JSON.stringify([
            //         {
            //             cam_id: this.camid,
            //         },
            //     ]),
            // })
            //     .then((params) => {
            // 參考點
            // this.webs1 = new WebSocket('ws://localhost:8702')
            this.webs1 = new WebSocket('ws://localhost:6188/server1')
            this.webs1.onopen = () => {
                console.log('web socket3 is open')
            }
            var buffer = true
            this.webs1.onmessage = (event) => {
                try {
                    // console.log('as', document.getElementById(this.size).clientWidth)
                    if (this.size !== undefined) {
                        if (document.getElementById(this.size).clientWidth > 10 && document.getElementById(this.size).clientHeight > 10) {
                            this.canvasWidth = document.getElementById(this.size).clientWidth
                            this.canvasHeight = document.getElementById(this.size).clientHeight
                            this.configKonva = {
                                width: this.canvasWidth,
                                height: this.canvasHeight,
                            }
                        }
                    }
                    var params = JSON.parse(event.data)
                    params = { data: params[this.cam_id] }
                    var reference = params.data.reference[0]
                    var sumtmp = ''
                    if (reference.reference_temperature != null) {
                        sumtmp = reference.reference_temperature.toFixed(1)
                    }
                    var referenceArr = {
                        reference_temperature: sumtmp,
                        X:
                            reference.reference_position.X *
                            this.canvasWidth,
                        Y:
                            reference.reference_position.y *
                            this.canvasHeight,
                    }
                    this.reference = referenceArr
                    // 取得"點"資料
                    var array = params.data.spot
                    // console.log(params.data.spot)
                    array.forEach((index) => {
                        // console.log(index.position.Y)
                        if (index.spot_temperature != null) {
                            index.spot_temperature = index.spot_temperature.toFixed(1)
                        }
                        index.spot_position.X =
                            index.spot_position.X *
                            this.canvasWidth
                        index.spot_position.Y =
                            index.spot_position.Y *
                            this.canvasHeight
                    })
                    if (this.dragObjectStatus) {
                        this.spots = params.data.spot
                    }
                    // 取得"點"資料 end
                    // 取得"範圍"資料
                    var scopes = params.data.scope
                    scopes.forEach((index) => {
                        if (index.scope_temperature_max != null) {
                            index.scope_temperature_max =
                                index.scope_temperature_max.toFixed(1)
                        }
                        index.scope_position_point_BR.X =
                            this.canvasWidth *
                            (index.scope_position_point_BR.X -
                                index.scope_position_point_LT.X)
                        index.scope_position_point_BR.Y =
                            this.canvasHeight *
                            (index.scope_position_point_BR.Y -
                                index.scope_position_point_LT.Y)

                        index.scope_position_point_LT.X =
                            index.scope_position_point_LT.X *
                            this.canvasWidth
                        index.scope_position_point_LT.Y =
                            index.scope_position_point_LT.Y *
                            this.canvasHeight
                    })
                    if (this.dragObjectStatus) {
                        this.scopes = params.data.scope
                        this.dragScopeTempData = params.data.scope
                    }
                    // 取得"範圍"資料 end
                    // 取得"線"資料
                    var lines = params.data.line
                    lines.forEach((index) => {
                        if (index.line_temperature_max != null) {
                            index.line_temperature_max = index.line_temperature_max.toFixed(1)
                        }
                        index.line_position_point_A.X =
                            index.line_position_point_A.X *
                            this.canvasWidth
                        index.line_position_point_A.Y =
                            index.line_position_point_A.Y *
                            this.canvasHeight
                        index.line_position_point_B.X =
                            index.line_position_point_B.X *
                            this.canvasWidth
                        index.line_position_point_B.Y =
                            index.line_position_point_B.Y *
                            this.canvasHeight
                    })
                    if (this.dragObjectStatus) {
                        this.lines = params.data.line
                    }
                    // 取得"線"資料 end
                    // 取得"blob"資料'
                    try {
                        // ---- 2023-01-31
                        var blob = params.data.blob
                        // add web worker function
                        // console.log('run worker')
                        if (buffer) {
                            buffer = false
                            var worker = new Worker('/worker/object.js');
                            worker.postMessage(
                                {
                                    data: blob,
                                    height: this.canvasHeight,
                                    width: this.canvasWidth
                                });
                            worker.addEventListener('message', (e) => {
                                // this.test = e.data[0][0]
                                // console.log('Worker said: ', e.data);
                                this.blobItems = e.data
                                buffer = true
                                worker.terminate()
                            }, false);
                        }
                        // web worker function end

                        // blob.forEach((index) => {
                        //     console.log(index)
                        //     index.points.forEach((e1) => {
                        //         var pr = []
                        //         e1.forEach((val, index1) => {
                        //             if (index1 % 2) {
                        //                 pr.push((this.canvasHeight * val))
                        //             } else {
                        //                 pr.push((this.canvasWidth * val))
                        //             }
                        //         })
                        //     })
                        // })
                        // ---- 2023-01-31 end

                        // var arrblob = []
                        // var blobnumber = []
                        // var blob = params.data.blob
                        // this.blobTempItems = params.data.blob
                        // var savedblob = blob.filter((item, index, array) => {
                        //     return item.blob_number === this.recordChangeblob;
                        // });
                        // if (savedblob.length > 0) {
                        //     // function 1
                        //     var ar1 = this.currentIndex(savedblob)
                        //     ar1.forEach((item) => {
                        //         arrblob.push(item)
                        //     })
                        //     ar1 = null
                        // }
                        // // arrblob.push(savedblob)
                        // blob.forEach((index) => {
                        //     blobnumber.push(index.blob_number)
                        //     if (index.blob_number !== this.recordChangeblob) {
                        //         // function 1
                        //         var ar = this.currentIndex(index)
                        //         ar.forEach((item) => {
                        //             arrblob.push(item)
                        //         })
                        //         ar = null
                        //     }
                        // })
                        // this.blobItems = arrblob
                        // var stage1 = this.$refs.stage.getNode()
                        // var path1 = stage1.find('.blobFind')
                        // this.staticNumber(path1)
                        // arrblob = null
                        // blobnumber = null
                        // blob = null
                        // savedblob = null
                        // stage1 = null
                        // path1 = null
                        // this.staticStart()
                        // console.log(this.blobItems)
                        // this.radioListarea = blobnumber
                        // this.BlobCalculateNumber()
                    } catch (e) {
                        console.log(e)
                    }
                    reference = null
                    sumtmp = null
                    referenceArr = null
                    array = null
                    scopes = null
                    lines = null
                    // this.blobItems = arrblob
                    // 取得"blob"資料 end
                    this.Interval = 0
                } catch (error) {
                    console.log(error)
                }
            }
            // })
            // .catch((error) => console.log('error from axios', error))
        },
        // konva 動畫
        konvaAnimation() {
            var stage = this.$refs.stage.getNode()
            // var handleRoiLoctin = []
            // var index1 = 0
            var e = true
            var anim = new Konva.Animation((frame) => {
                if (e && this.tabVal) {
                    e = false
                    // 限制禎率
                    var delay = Math.min(1000, (1000 / 3) - frame.timeDiff)
                    setTimeout(() => {
                        try {
                            run(frame)
                        } catch (eeee) {
                            this.workerBuffer = true;
                            console.log(eeee)
                        }
                        e = true

                    }, delay);
                } else {
                    return false;
                }
            }, stage);
            anim.start();
            this.anim1 = anim
            // function compare(a, b) {
            //     if (a.x < b.x) {
            //         return -1;
            //     }
            //     if (a.x > b.x) {
            //         return 1;
            //     }
            //     return 0;
            // }
            var run = async (frame) => {
                try {
                    const r = await test(frame);
                    var stage = this.$refs.stage.getNode()
                    var path = stage.find('.blobFind')
                    var st = true
                    var points = []
                    // var SelfRect = []
                    path.forEach((value, index) => {
                        // var point = value.toObject()
                        points.push(value.attrs.points)
                    })
                    var srtingPath = JSON.stringify(points)
                    this.saveBlob === srtingPath ? st = false : st = true
                    // st = true
                    path.forEach((value, index) => {
                        var co2 = Math.abs(Math.sin((frame.time * 2 * Math.PI) / 3000) / 4) + 0.2
                        var roiNumber = parseFloat(value.attrs.blob_number)
                        var roiTemperatureMax = parseFloat(value.attrs.blob_temperature_max)
                        var roiAlarmStatus = parseInt(value.attrs.blob_alarm_status)
                        var roiThreshold = parseFloat(value.attrs.blob_threshold)
                        var focusBlolbNumber = null
                        if (roiAlarmStatus === 1 && roiTemperatureMax >= roiThreshold) { // 超溫
                            if (focusBlolbNumber === roiNumber) {
                                value.fill(`rgba(216,58,59,0.7)`)
                            } else {
                                value.fill(`rgba(216,58,59,${co2})`)
                            }
                            value.fillPatternImage('')
                            value.stroke('rgb(216,58,59)')
                        } else { // 沒超溫
                            if (focusBlolbNumber === roiNumber) {
                                value.fillPatternImage(this.fillBackground(
                                    this.temperatureChange[3][0],
                                    this.temperatureChange[3][1]
                                ))
                            } else {
                                value.fillPatternImage(this.fillBackground(
                                    this.temperatureChange[1][0],
                                    this.temperatureChange[1][1]
                                ))
                            }
                            value.fill('')
                            value.stroke('rgb(255 199 82)')
                        }
                        co2 = null
                        roiNumber = null
                        roiTemperatureMax = null
                        roiAlarmStatus = null
                        roiThreshold = null
                        focusBlolbNumber = null
                    })
                    if (st) {
                        // console.log(`updata roi "^FE2i\`:`)
                        // console.log(path)
                        if (this.workerBuffer) {
                            var worker = new Worker('/worker/animation.js');
                            // worker.postMessage([JSON.stringify(path), SelfRect]);
                            worker.postMessage([JSON.stringify(path)]);
                            worker.addEventListener('message', (e) => {
                                this.blobnumbers = e.data
                                this.workerBuffer = true;
                                this.saveBlobChanges = false
                                this.saveBlob = srtingPath
                                // console.log('Worker said: ', e.data);
                                worker.terminate()
                                // worker.close()
                            }, false);
                        }
                    }
                    stage = null
                    path = null
                    st = null
                    points = null
                    return r
                } catch (error) {
                    console.log(error)
                }
            }
            var test = (frame) => {
                return true
            }
        },
        currentIndex(index) {
            // 沒有被focus的元件則根據alarm狀態來判斷顏色
            var associated = 0 // associated = 用來判斷該blob是不是同一個元件
            var ar = []
            index.points.forEach((e1) => {
                var pr = []
                e1.forEach((val, index1) => {
                    if (index1 % 2) {
                        pr.push((this.canvasHeight * val))
                    } else {
                        pr.push((this.canvasWidth * val))
                    }
                })
                // console.log(this.shortLogBlobGroup)
                // fille = this.fillBackground(
                //   this.temperatureChange[0][0],
                //   this.temperatureChange[0][1]
                // )
                // var fille = null
                var stroke1 = null
                // var fillcolor = null
                // 判斷元件有沒有超溫
                if (index.blob_alarm_status === 1 && index.blob_temperature_max >= index.blob_threshold) {
                    //   fille = null
                    //   fillcolor = 'rgba(216,58,59,0.2)'
                    stroke1 = 'rgba(216,58,59,1)'
                } else {
                    //   fille = this.fillBackground(
                    //     this.temperatureChange[1][0],
                    //     this.temperatureChange[1][1]
                    //   )
                    //   fillcolor = null
                    stroke1 = 'rgb(255 199 82)'
                }
                // function 2
                var path = this.splineFunction(pr, 0.5, 25, true)

                // add web worker function
                // console.log('run worker')
                // var worker = new Worker('/js/worker.js');
                // worker.postMessage(
                //     {
                //         points: pr,
                //         tension: 0.5,
                //         numOfSeg: 25,
                //         close: true,
                //     });
                // worker.addEventListener('message', (e) => {
                //     // this.test = e.data[0][0]
                //     console.log('Worker said: ', e.data);
                //     worker.terminate()
                // }, false);
                // web worker function end

                var TempPath = []
                var a = null
                path.forEach((va, ie) => {
                    if (ie % 2 === 0) {
                        a = {
                            x: 0,
                            y: 0
                        }
                        a.x = va
                    } else {
                        a.y = va
                        TempPath.push(a)
                    }
                })
                // object to path svg
                var svgPath = "M" + TempPath[0].x + " " + TempPath[0].y;
                for (var z = 1; z < TempPath.length; z = z + 1) {
                    svgPath = svgPath + " L" + TempPath[z].x + " " + TempPath[z].y;
                }
                // console.log(svgPath)
                ar.push({
                    points: pr,
                    data: svgPath,
                    stroke: stroke1,
                    strokeWidth: 1,
                    lineJoin: 'round',
                    tension: index.tension,
                    name: 'blobFind',
                    // fill:fillcolor,
                    // fillPatternImage: fille,
                    closed: true,
                    fillPatternRotation: -20,
                    /*
                     * line segments with a length of 33px
                     * with a gap of 10px
                     */
                    // dash: [33, 10],
                    // lineCap: 'round',
                    group_name: index.group_name,
                    blob_number: index.blob_number,
                    blob_alarm_status: index.blob_alarm_status,
                    blob_temperature_max: parseFloat(index.blob_temperature_max).toFixed(1),
                    blob_threshold: index.blob_threshold,
                    associated
                })
                associated += 1
                pr = null
                stroke1 = null
                path = null
                TempPath = null
                svgPath = null
            })
            return ar
        },
        staticImage(data) {
            var arr = data
            var roiTemperatureMax = parseFloat(arr.blob_temperature_max)
            var roiAlarmStatus = parseInt(arr.blob_alarm_status)
            var roiThreshold = parseFloat(arr.blob_threshold)
            // console.log(roiTemperatureMax, roiAlarmStatus, roiThreshold)
            if (roiAlarmStatus === 1 && roiTemperatureMax >= roiThreshold) {
                arr.fill = `rgba(216,58,59,0.7)`
                arr.stroke = 'rgb(216,58,59)'
            } else {
                arr.fillPatternImage = this.fillBackground(
                    this.temperatureChange[1][0],
                    this.temperatureChange[1][1]
                )
                arr.stroke = 'rgb(255 199 82)'
            }
            roiTemperatureMax = null
            roiAlarmStatus = null
            roiThreshold = null
            return arr
        },
        staticNumber(data) {
            var tempArr = []
            data.forEach((value) => {
                var pathPointsLength = value.getLength()
                var SelfRect = value.getSelfRect()
                var arr = [] // 把整個piexl打包
                var tmp = {
                    x: 0,
                    y: 0,
                }
                for (var i = 0; i < pathPointsLength; i++) {
                    tmp = {
                        x: value.getPointAtLength(i).x,
                        y: value.getPointAtLength(i).y
                    }
                    arr.push(tmp)
                }
                // console.log(arr)
                var filterAgeThan5 = arr.filter(function (item, index, array) {
                    return item.y > SelfRect.y + (SelfRect.height * 0) && item.y <= SelfRect.y + (SelfRect.height * 0.05);
                });
                filterAgeThan5.sort(compare)
                if (value.attrs.blob_alarm_status === 1 && parseFloat(value.attrs.blob_temperature_max
                ) >= parseFloat(value.attrs.blob_threshold
                )) {
                    tempArr.push({
                        blob_number: value.attrs.blob_number,
                        x: filterAgeThan5[0].x - 11,
                        y: filterAgeThan5[0].y - 11,
                        fill: 'rgba(216,58,59,1)',
                    })
                } else {
                    tempArr.push({
                        blob_number: value.attrs.blob_number,
                        x: filterAgeThan5[0].x - 11,
                        y: filterAgeThan5[0].y - 11,
                        fill: 'rgb(255 199 82)',
                    })
                }
                pathPointsLength = null
                SelfRect = null
                arr = null
                tmp = null
                filterAgeThan5 = null
                // this.blobnumbers = tempArr
            })
            return tempArr
            // var stage = this.$refs.layer.getNode()

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

        // 斜線方法
        fillBackground(fillStyle, strokeStyle) {
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
            pctx.fillStyle = fillStyle
            pctx.fill()

            pctx.strokeStyle = strokeStyle
            pctx.lineWidth = 1
            pctx.beginPath()
            pctx.moveTo(x0, y0)
            pctx.lineTo(x1, y1)
            pctx.moveTo(x0 - offset, y0)
            pctx.lineTo(x1 - offset, y1)
            pctx.moveTo(x0 + offset, y0)
            pctx.lineTo(x1 + offset, y1)
            pctx.stroke()
            pctx = null
            x0 = null
            x1 = null
            y0 = null
            y1 = null
            offset = null
            return p
        },
        // spline Function
        splineFunction(points, tension, numOfSeg, close) {
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
                i = null
                t = null
                pt1 = null
                pt2 = null
                pt3 = null
                pt4 = null
                t1x = null
                t1y = null
                t2x = null
                t2y = null
                c = null
                c1 = null
                c2 = null
                c3 = null
                c4 = null
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

            pts = null
            i = null
            l = null
            rPos = null
            rLen = null
            // res = null
            cache = null
            cachePtr = null
            st = null
            st2 = null
            st3 = null
            st23 = null
            st32 = null
            parse = null
            return res
        },
    },
    beforeDestroy() {
        if (this.anim1 !== null) {
            this.anim1.stop()

        }
        var stage = this.$refs.stage.getNode()
        stage.off();
        var layers = stage.children;
        // console.log("remove" , layers);
        layers.forEach(layer => layer.destroy());

        // 销毁画布对象
        stage.destroy();
        stage = null
        layers = null
        if (this.Interval1 !== null) {
            clearInterval(this.Interval1)
            this.Interval1 = null
            // console.log('Destroy:Interval1(konva)')
        }
        if (this.webs1 !== null) {
            this.webs1.close()
            this.webs1 = null
        }
        for (var key in this.$data) {
            // console.log("remove : " + [key]);
            this[key] = null;
        }
        // this.anim.stop();
    }
}
</script>
<style scoped>
.Konva-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* background-color: rgba(0, 0, 255, 0.575); */
    z-index: 0;
}

.forcehide {
    position: fixed;
    top: 1000vh;
    left: 1000vh;
}
</style>