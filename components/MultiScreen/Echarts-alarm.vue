<template>
    <v-card class="mr-6" style="max-height: 202px" rounded="md" elevation="6">
        <div class="flash-video-and-log">
            <!-- <v-tooltip left class="tips">
                      <template #activator="{ on, attrs }">
                        <v-btn
                          x-small
                          icon
                          class="btn reset"
                          color="#9BA3A5"
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon x-small class="icon">mdi-restore</v-icon>
                        </v-btn>
                      </template>
                      <span>重置</span>
                    </v-tooltip> -->
            <div>
                <div class="flash-image-title">
                    <div style="width: 152px">
                        <h4 class="cardtitle mx-3">即時超溫影像紀錄</h4>
                    </div>
                    <div style="width: 270px">
                        <span style="color: #e58a8e">{{ alarmStartTime }}</span>
                    </div>
                </div>
                <div class="flash-image-img mx-3">
                    <div class="flash-image-11">
                        <KonvaDisplayData :image="image1" @renderinge="renderingRoi" />
                        <img :src="image2" id="image11" />
                        <v-stage ref="stage" :config="configKonva" class="flash-image-konva">
                            <v-layer>
                                <v-rect ref="rect1" :config="{
                                    x: 5,
                                    y: 5,
                                    width: 64,
                                    height: 48,
                                    fill: 'rgba(255,255,255,0.5)',
                                    draggable: true,
                                }" @dragmove="(e) => {
    handleDragMove(e)
    handleDragZoom(e)
}" @mouseover="handleDragStart" @mouseout="handleDragEnd" />
                            </v-layer>
                        </v-stage>
                    </div>
                    <div>
                        <div id="image2"></div>
                    </div>
                </div>
            </div>
            <!-- 折線圖 -->
            <div>
                <div ref="FlashImageLog" id="FlashImageLog" style="height: 240px; width: 385px"></div>
            </div>
        </div>

        <!-- <v-btn icon class="btn reset" color="#9BA3A5"> 
                      <v-icon  class="icon">mdi-cached</v-icon>
                    </v-btn> -->
    </v-card>
</template>
<script>
import * as echarts from 'echarts'
import axios from 'axios'
import KonvaDisplayData from '../Index/konva-display-data.vue'
// import Konva from 'konva'
export default {
    props: ['echartsItem', 'camid'],
    components: {
        KonvaDisplayData
    },
    data: () => ({
        image1: 'EMPTYv1-fill.png',
        image2: 'EMPTYv1-fill.png',
        alarmStartTime: null, // 紀錄開始時間
        time: [], // 暫存requst time
        key: [], // 暫存requst key
        totleData: [], // 儲存未整理的DATA
        handleData: [],
        output: [],
        IntervalID: null,
        configKonva: {
            width: 0,
            height: 0,
        },
        focusName: null,
        alertTemperature: 0
    }),
    watch: {
        echartsItem: {
            handler(val, oldVal) {
                // console.log("sss", val);
                this.alertTemperature = val.alertTemperature
                this.judge(val)
                this.focusName = val.objcet.name + val.objcet.number
            }
        },
    },
    mounted() {
        // this.image1 = 'EMPTYv1-fill.png'
        this.flashImageLog()
        this.initKonva()
    },
    methods: {
        renderingRoi(data) {
            // console.log(data)
            this.image2 = data
            document.getElementById('image2').style.background = `url(${data}) no-repeat center center`
        },
        initKonva() {
            var img = document.getElementById('image11')
            var canvasWidth = 0
            var canvasHeight = 0
            var rect1 = this.$refs.rect1.getNode()
            img.addEventListener('load', () => {
                canvasWidth = document.getElementById('image11').clientWidth
                canvasHeight = document.getElementById('image11').clientHeight
                console.log(canvasWidth, canvasHeight)
                this.configKonva = {
                    width: canvasWidth,
                    height: canvasHeight,
                }
                rect1.x(canvasWidth / 2 - 32)
                rect1.y(canvasHeight / 2 - 24)
                img = null
                canvasWidth = null
                canvasHeight = null
                rect1 = null
            })
        },
        handleDragStart() {
            document.body.style.cursor = 'move'
        },
        handleDragEnd() {
            document.body.style.cursor = 'auto'
        },
        // 避免kovan元素超出邊界
        handleDragMove(e) {
            var x = e.target.x()
            var y = e.target.y()
            var width = e.target.width()
            var height = e.target.height()
            var canvasKonva = this.configKonva
            if (x <= 0) {
                e.target.x(0)
            } else if (x >= canvasKonva.width - width) {
                e.target.x(canvasKonva.width - width)
            }

            if (y <= 0) {
                e.target.y(0)
            } else if (y >= canvasKonva.height - height) {
                e.target.y(canvasKonva.height - height)
            }
            x = null
            y = null
            width = null
            height = null
            canvasKonva = null
        },
        handleDragZoom(e) {
            var x = e.target.x()
            var y = e.target.y()
            var width = e.target.width()
            var height = e.target.height()
            var canvasKonva = this.configKonva
            var xZoom = Math.floor(Math.abs((x / (width - canvasKonva.width) * 100)))
            var yZoom = Math.floor(Math.abs((y / (height - canvasKonva.height) * 100)))
            document.getElementById('image2').style.backgroundPosition = `${xZoom}% ${yZoom}%`
            x = null
            y = null
            width = null
            height = null
            canvasKonva = null
            xZoom = null
            yZoom = null
            // console.log(xZoom, yZoom)
        },
        // 判斷是否警報中
        judge(data) {
            // console.log(data)
            if (this.IntervalID !== null) {
                clearInterval(this.IntervalID)
            }
            // 初始化
            this.time = []
            this.key = []
            this.totleData = []
            this.handleData = []
            // ________
            this.alarmStartTime = data.time
            var startTime = data.time
            var imageUrl = this.GetImageUrli(startTime)
            // var blob = getBlob(atob(decodeURIComponent(imageUrl)), 'image/jpg')
            // var objectURL = URL.createObjectURL(blob)
            this.image1 = imageUrl

            var endTime = data.endTime
            if (data.endTime === null) {
                console.log("正在警報中")
                var currentTime = new Date()
                var endTime1 =
                    currentTime.getFullYear() +
                    "-" +
                    ("0" + (currentTime.getMonth() + 1)).slice(-2) +
                    "-" +
                    ("0" + currentTime.getDate()).slice(-2) +
                    " " +
                    ("0" + currentTime.getHours()).slice(-2) +
                    ":" +
                    ("0" + currentTime.getMinutes()).slice(-2) +
                    ":" +
                    ("0" + currentTime.getSeconds()).slice(-2);
                console.log(startTime, endTime1)
                this.getApiDate(startTime, endTime1, data.alertTemperature)
            } else {
                this.getApiDate(startTime, endTime, data.alertTemperature)
            }
            // console.log(this.camid)
            endTime = null
            // function getBlob(byteString, mimeString) {
            //     var ab = new ArrayBuffer(byteString.length)
            //     var ia = new Uint8Array(ab)
            //     for (var i = 0; i < byteString.length; i++) {
            //         ia[i] = byteString.charCodeAt(i)
            //     }
            //     var blob = new Blob([ab], { type: mimeString })
            //     return blob
            // }
        },
        GetImageUrli(url) {
            var nowtime = new Date(url)
            var YMD =
                nowtime.getFullYear() +
                ('0' + (nowtime.getMonth() + 1)).slice(-2) +
                ('0' + nowtime.getDate()).slice(-2)
            var YM =
                nowtime.getFullYear() +
                ('0' + (nowtime.getMonth() + 1)).slice(-2)
            // var YM = date.getFullYear() + ('0' + (date.getMonth() + 1)).slice(-2)
            var HMS =
                ('0' + nowtime.getHours()).slice(-2) +
                ('0' + nowtime.getMinutes()).slice(-2) +
                ('0' + nowtime.getSeconds()).slice(-2)
            // var imgUrl =
            //     'http://127.0.0.1:5002/api/database/share/alarmtemp%5C' + YM + '%5alarmtemp_' +
            //     nowtime.getFullYear() +
            //     ('0' + (nowtime.getMonth() + 1)).slice(-2) +
            //     ('0' + nowtime.getDate()).slice(-2) +
            //     '_T' +
            //     ('0' + nowtime.getHours()).slice(-2) +
            //     ('0' + nowtime.getMinutes()).slice(-2) +
            //     ('0' + nowtime.getSeconds()).slice(-2) +
            //     '.jpg'cl
            // var imgUrl = `http://localhost:5002/api/database/share/alarmtemp%5C${YM}%5Calarmtemp_${YMD}_T${HMS}.jpg`
            var imgUrl = `http://localhost:5002/api/database/share/alarmtemp%5C${this.$route.query.cam}%5C${YM}%5Calarmtemp_${YMD}_T${HMS}.jpg`
            nowtime = null
            YMD = null
            YM = null
            HMS = null
            return imgUrl
        },
        getApiDate(startTime, endTime, alertTemperature) {
            // console.log("get" , alertTemperature);
            axios({
                method: 'post',
                url: 'http://127.0.0.1:5002/api/alarm/max',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: JSON.stringify([
                    {
                        cam_id: this.$route.query.cam,
                        table_alarm_start: startTime,
                        table_alarm_stop: endTime
                    },
                ]),
            }).then((events) => {

                var arr = events.data[0];
                // console.log("alarm", arr);
                var tempArr = {}
                var totleSum = arr.time.length
                Object.keys(arr).forEach((index) => {
                    // console.log(index)
                    if (arr[index].length !== totleSum) {
                        var addnull = []
                        var difference = totleSum - arr[index].length
                        for (var i = 0; i < difference; i++) {
                            addnull.push(null)
                        }
                        arr[index].forEach((e) => {
                            addnull.push(e)
                        })
                        tempArr[index] = addnull
                        // console.log(addnull)
                    } else {
                        tempArr[index] = arr[index]
                    }
                })
                this.totleData.push(tempArr)
                this.sortTotleArr() // 觸發排序
                document.getElementById('DoNotOperate').style.display = "none";
                arr = null
                tempArr = null
                totleSum = null
            })
                .catch((err) => {
                    console.log(err);
                    document.getElementById('DoNotOperate').style.display = "none";
                });
        },
        // 陣列排序
        sortTotleArr() {
            var arr = this.totleData.sort(compare)
            this.totleData = arr
            // console.log(this.totleData)
            this.handleTotleArr() // 觸發合併
            function compare(a, b) {
                // console.log(a, b)
                var aTime = new Date(a.time[0])
                var bTime = new Date(b.time[0])
                if (aTime < bTime) {
                    return -1;
                }
                if (aTime > bTime) {
                    return 1;
                }
                return 0;
            }
            arr = null
        },
        // 刪除指定時間>合併陣列>分離time、ROI陣列
        handleTotleArr() {
            var data1 = this.totleData
            var data = this.totleData
            // 刪除指定時間
            var deleteKey = null
            data1.forEach((item, index) => {
                var endTime = new Date(item.time[item.time.length - 1])
                var within12Hours = new Date()
                within12Hours.setHours(within12Hours.getHours() - 24)
                // within12Hours.setMinutes(within12Hours.getMinutes() - 1)
                if (endTime < within12Hours) {
                    deleteKey = index
                    // console.log('delete', index)
                }
                // console.log(endTime, within12Hours)
            })
            if (deleteKey !== null) {
                data.splice(0, deleteKey)
                // console.log('執行刪除作業')
            }
            // 刪除指定時間 end
            var tempItems = {}
            data.forEach((item) => {
                Object.keys(item).forEach((key) => {
                    tempItems[key] = []
                })
            })
            // 將出現的key save RAM
            Object.keys(tempItems).forEach((key) => {
                if (this.key.includes(key) === false && key !== 'time') {
                    this.key.push(key)
                }
            })
            data.forEach((item) => {
                var totlesum = item.time.length
                Object.keys(tempItems).forEach((index) => {
                    if (item[index] !== undefined) {
                        item[index].forEach((value) => {
                            tempItems[index].push(value)
                        })
                    } else {
                        for (var i = 0; i < totlesum; i++) {
                            tempItems[index].push(null)
                        }
                    }
                })
            })
            this.handleData = tempItems
            // console.log(this.handleData)
            this.rendering() // 渲染圖表
            // console.log(tempItems)
            // console.log(this.key)
            data1 = null
            data = null
            deleteKey = null
            tempItems = null
        },
        rendering() {
            // console.log("xx1" , this.alertTemperature);
            const chartDom = this.$refs.FlashImageLog;
            const myChart = echarts.init(chartDom);
            var output = []
            this.key.forEach((index) => {
                // console.log(index)
                var t = []
                this.handleData[index].forEach((e) => {
                    t.push(parseFloat(e).toFixed(1))
                })
                var data = {
                    name: index,
                    type: 'line',
                    smooth: true,
                    itemStyle: {
                        normal: {
                            color: index === this.focusName ? 'rgb(229, 138, 142)' : '#828C8F',
                        },
                    },
                    data: t
                }
                output.push(data)
            })

            // 限制顯示時間
            var totleSum = this.handleData.time.length
            var currentTime = new Date(this.handleData.time[totleSum - 1]);
            // currentTime.setHours(currentTime.getHours() - 1)
            // currentTime.setMinutes(currentTime.getMinutes() - 10)
            currentTime.setSeconds(currentTime.getSeconds() - 20)
            var interval = 0 // 計算要顯示的區段
            // console.log(totleSum)
            this.handleData.time.forEach((index) => {
                var time = new Date(index);
                if (time <= currentTime) {
                    interval += 1
                }
            })
            myChart.setOption({
                xAxis: [
                    {
                        data: this.handleData.time,
                    },
                ],
                series: output,
            });
            myChart.setOption({
                dataZoom: [
                    {
                        startValue: interval,
                        endValue: totleSum,
                    },
                ],
            })
            myChart.setOption({
                series: [
                    {
                        markLine: {
                            symbol: ["none", "none"],
                            label: {
                                show: false,
                            },
                            data: [
                                {
                                    yAxis: this.alertTemperature,
                                    lineStyle: {
                                        // type: "line",
                                        type: 'dashed',
                                        color: "#DE8788",
                                        // join:'round'
                                    },
                                },
                            ],
                        },

                        type: "line",
                        smooth: true,
                        symbol: "none",
                        markArea: {
                            itemStyle: {
                                color: "rgba(240, 125, 125,0.1)",
                            },
                            data: [
                                [
                                    {
                                        // name: "Morning Peak",
                                        yAxis: this.alertTemperature,
                                    },
                                    {
                                        yAxis: this.alertTemperature + 1000,
                                    },
                                ],
                            ],
                        },
                    },
                ],
            });
            output = null
            totleSum = null
            currentTime = null
            interval = null
        },
        // 即時超溫影像紀錄 折線圖
        flashImageLog() {
            var chartDom = document.getElementById('FlashImageLog')
            var myChart = echarts.init(chartDom)
            // const colorPalette = ['#37484C', '#9aa2a4', '#d8dddd', '#E6E8E9']
            var option

            option = {
                xAxis: {
                    type: 'category',
                },
                tooltip: {
                    axisPointer: {
                        type: 'cross',
                    },
                    // triggerOn: 'click', // 触发方式
                    // alwaysShowContent:true,   // 鼠标离开区域不消失
                    trigger: 'axis',
                },
                yAxis: {
                    type: 'value',
                    min(value) {
                        return value.min - 10;
                    },
                    max(value) {
                        return value.max + 5;
                    }
                },
                legend: {
                    show: false,
                    selectedMode: 'multiple', // 設定顯示單一圖例的圖形，點選可切換
                    right: 5,
                    top: 5,
                    textStyle: {
                        color: '#666',
                        fontSize: 9,
                    },
                    itemGap: 10,
                    inactiveColor: '#ccc',
                },
                dataZoom: [
                    {
                        type: 'inside',
                        realtime: true,
                    },
                ],
                // series: [
                //     {
                //         name: 'spot',
                //         data: [500, 732, 801, 134, 1590, 1130, 1020],
                //         type: 'line',
                //         smooth: true,
                //     },
                //     {
                //         name: 'line',
                //         data: [820, 932, 901, 934, 1290, 1330, 1320],
                //         type: 'line',
                //         smooth: true,
                //     },
                // ],
                // color: colorPalette,
            }

            option && myChart.setOption(option)
            option = null
        },
    },
    beforeDestroy() {
        var chartDom = this.$refs.FlashImageLog;
        var chart = echarts.getInstanceByDom(chartDom)
        if (chart !== undefined) {
            // console.log("test", chart);
            chart.dispose()
            chartDom = null
            chart = null
        }
        for (var key in this.$data) {
            // console.log("remove : " + [key]);
            this[key] = null;
        }
    }
}
</script>
<style>
.flash-video-and-log {
    display: grid;
    grid-template-columns: 53% 47%;
    transition: 1s;
}

.flash-image-title {
    display: flex;
    color: #80898c;
    align-items: center;
}

.flash-image-title>span {
    font-size: 15px;
}

.flash-image-img {
    display: grid;
    grid-template-columns: 50% 50%;
}

.flash-image-img>div {
    margin: 0 15px 10px 0px;
}

.flash-image-img img {
    width: 100%;
}

.flash-image-11 {
    position: relative;
}

.flash-image-konva {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
}

#image2 {
    width: 100%;
    height: 143px;
    background: url(/EMPTYv1-fill.png) no-repeat center center;
    background-position: 50% 50%;
}
</style>