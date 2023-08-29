<template>
    <div class="Konva-canvas">
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
                        offsetX: -36,
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
                        offsetX: -32,
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
                    stroke: '#fff',
                    strokeWidth: 2,
                    strokeScaleEnabled: false,
                    draggable: true,
                    name: 'scope' + itemScopes.scope_number,
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
                        offsetX: -20,
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
                        offsetX: -16,
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
    props: ['size'],
    data: () => ({
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
    }),
    watch: {},
    mounted() {
        const SpotsImage = new window.Image()
        SpotsImage.src = '/images/spot_1.png'
        SpotsImage.onload = () => {
            this.konvaSpot = SpotsImage
        }
        console.log(Konva)
        var canvasWidth = document.getElementById(this.size).clientWidth
        var canvasHeight = document.getElementById(this.size).clientHeight
        this.configKonva = {
            width: canvasWidth,
            height: canvasHeight,
        }
        // this.Refresh()
        setInterval(() => {
            // console.log(document.getElementById(this.size).offsetWidth)
            this.Refresh()
        }, 1000)
        this.konvaAnimation()
        // const previewStage = new Konva.Stage({
        //     container: 'testIDDD1',
        //     width: 640,
        //     height: 480,
        //     // scaleX: ,
        //     // scaleY: 1 / 4,
        // });
        setTimeout(() => {
            var stage = this.$refs.layer.getNode()
            console.log(Konva)
            console.log(stage)
            // const previewLayer = stage.clone({ listening: false });
            // previewStage.add(previewLayer);
            updatePreview(stage)
        }, 3000)
        function updatePreview(stage) {
            try {
            const scale = 1;
            // use pixelRatio to generate smaller preview
            const url = stage.toDataURL({ pixelRatio: scale});
            // document.getElementById('preview').src = url;
            document.getElementById('testIDDD1').style.background = `url(${url}) center center no-repeat`;
            document.getElementById('testIDDD1').style.backgroundSize = '100%'
            } catch (e) {
                console.log(e)
            }
        }
    },
    methods: {
        // 總呼叫程序
        Refresh() {
            axios({
                method: 'post',
                url: 'http://127.0.0.1:5002/api/monitor/object/data',
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
                            document.getElementById(this.size).offsetWidth,
                        Y:
                            reference.reference_position.y *
                            document.getElementById(this.size).offsetHeight,
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
                            document.getElementById(this.size).offsetWidth
                        index.spot_position.Y =
                            index.spot_position.Y *
                            document.getElementById(this.size).offsetHeight
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
                            document.getElementById(this.size).offsetWidth *
                            (index.scope_position_point_BR.X -
                                index.scope_position_point_LT.X)
                        index.scope_position_point_BR.Y =
                            document.getElementById(this.size).offsetHeight *
                            (index.scope_position_point_BR.Y -
                                index.scope_position_point_LT.Y)

                        index.scope_position_point_LT.X =
                            index.scope_position_point_LT.X *
                            document.getElementById(this.size).offsetWidth
                        index.scope_position_point_LT.Y =
                            index.scope_position_point_LT.Y *
                            document.getElementById(this.size).offsetHeight
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
                            document.getElementById(this.size).offsetWidth
                        index.line_position_point_A.Y =
                            index.line_position_point_A.Y *
                            document.getElementById(this.size).offsetHeight
                        index.line_position_point_B.X =
                            index.line_position_point_B.X *
                            document.getElementById(this.size).offsetWidth
                        index.line_position_point_B.Y =
                            index.line_position_point_B.Y *
                            document.getElementById(this.size).offsetHeight
                    })
                    if (this.dragObjectStatus) {
                        this.lines = params.data.line
                    }
                    // 取得"線"資料 end
                    // 取得"blob"資料'
                    try {
                        var arrblob = []
                        var blobnumber = []
                        var blob = params.data.blob
                        this.blobTempItems = params.data.blob
                        var savedblob = blob.filter((item, index, array) => {
                            return item.blob_number === this.recordChangeblob;
                        });
                        if (savedblob.length > 0) {
                            // function 1
                            var ar1 = this.currentIndex(savedblob)
                            ar1.forEach((item) => {
                                arrblob.push(item)
                            })
                        }
                        // arrblob.push(savedblob)
                        blob.forEach((index) => {
                            blobnumber.push(index.blob_number)
                            if (index.blob_number !== this.recordChangeblob) {
                                // function 1
                                var ar = this.currentIndex(index)
                                ar.forEach((item) => {
                                    arrblob.push(item)
                                })
                            }
                        })
                        this.blobItems = arrblob
                        // console.log(this.blobItems)
                        // this.radioListarea = blobnumber
                        // this.BlobCalculateNumber()
                    } catch (e) {
                        console.log(e)
                    }
                    // this.blobItems = arrblob
                    // 取得"blob"資料 end
                    this.Interval = 0
                })
                .catch((error) => console.log('error from axios', error))
        },
        currentIndex(index) {
            // 沒有被focus的元件則根據alarm狀態來判斷顏色
            var associated = 0 // associated = 用來判斷該blob是不是同一個元件
            var ar = []
            index.points.forEach((e1) => {
                var pr = []
                e1.forEach((val, index1) => {
                    if (index1 % 2) {
                        pr.push((document.getElementById(this.size).offsetHeight * val))
                    } else {
                        pr.push((document.getElementById(this.size).offsetWidth * val))
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
            })
            return ar
        },
        // konva 動畫
        konvaAnimation() {
            var stage = this.$refs.stage.getNode()
            var index1 = 0
            var anim = new Konva.Animation((frame) => {
                try {
                    var tempArr = []
                    var path = stage.find('.blobFind')
                    path.forEach((value, index) => {
                        // Blob background fill 
                        var co2 = Math.abs(Math.sin((frame.time * 2 * Math.PI) / 3000) / 4) + 0.2 // 貝茲曲線函數
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
                        // Blob background fill end
                        // Add number to blob
                        // function 3
                        if (index1 % 100 === 0 || index1 < 100) {
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
                            this.blobnumbers = tempArr
                            if (index1 > 10000) {
                                index1 = 100
                            }
                        }
                        // Add number to blob end
                    })
                } catch (e) {
                    console.log(e)
                }
                index1 += 1
            }, stage);
            anim.start();
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
</style>