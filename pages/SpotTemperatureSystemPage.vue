<template>
    <div class="fluid mt-3">
        <v-img class="bgimg" src="bgimg.png" height="93.2vh" />
        <v-row>
            <v-col cols="12" md="12">
                <v-card class="mt-3 mx-6" rounded="md" elevation="6" height="51.55em">
                    <v-tabs v-model="tab" vertical slider-size="3" color="#37484C" background-color="#f1f1f1"
                        height="51.55em">
                        <v-tab href="#tab-1" style="font-size: 15px; justify-content: left">
                            <img class="" alt="" src="/data_scraping/data.png" width="14em" />
                            <p>&nbsp;&nbsp;</p>
                            總架構圖
                        </v-tab>

                        <v-tab href="#tab-2" style="font-size: 15px; justify-content: left"
                            v-if="this.$auth.hasScope('user')" disabled>
                            <img class="" alt="" src="/data_scraping/data.png" width="14em" />
                            <p>&nbsp;&nbsp;</p>
                            單線圖
                        </v-tab>

                        <v-tab href="#tab-3" style="font-size: 15px; justify-content: left" disabled>
                            <img class="" alt="" src="/data_scraping/data.png" width="14em" />
                            <p>&nbsp;&nbsp;</p>
                            趨勢表
                        </v-tab>

                        <v-tab href="#tab-4" style="font-size: 15px; justify-content: left" disabled>
                            <img class="" alt="" src="/data_scraping/data.png" width="14em" />
                            <p>&nbsp;&nbsp;</p>
                            即時警報
                        </v-tab>

                        <v-tab href="#tab-5" style="font-size: 15px; justify-content: left" disabled>
                            <img class="" alt="" src="/data_scraping/data.png" width="14em" />
                            <p>&nbsp;&nbsp;</p>
                            歷史事件
                        </v-tab>

                        <v-tab-item value="tab-1">
                            <div class="all-system-canvas">
                                <div class="all-system-cloum col-rt ">
                                    <div class="col-lb all-system-item">
                                        <div class="col-bb positionRelative">
                                            <!-- 區域1 -->
                                            <div class="text-right title-1 pa-3">A 迴路</div>
                                            <div>
                                                <div class="text-right cp0001">3000A BUS DUCT</div>
                                            </div>
                                            <div class="cp0002">
                                                <img src="/images/SpotTemperatureSystemPage/roi_all.png" width="100%" />
                                            </div>
                                            <div class="cp0003">
                                                <div class="all-system-title">5A01</div>
                                            </div>
                                            <div class="d-flex flex-column all-system-list-row cp0004"
                                                v-if="tempList !== null">
                                                <div v-for="(item, index) in tempKey" :key="index"
                                                    class="all-system-list d-flex">
                                                    <div class="px-2">{{ item }} 溫度值</div>
                                                    <div class="px-2 text-right tempFont">{{ tempList['5A01'][item].temp }}
                                                    </div>
                                                    <div class="px-2 text-center">°C</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="positionRelative">
                                            <!-- 區域2 -->
                                            <div class="cp0005">
                                                <img src="/images/SpotTemperatureSystemPage/roi_all.png" width="100%" />
                                            </div>
                                            <div class="cp0003">
                                                <div class="all-system-title">5A02</div>
                                            </div>
                                            <div class="d-flex flex-column all-system-list-row cp0004"
                                                v-if="tempList !== null">
                                                <div v-for="(item, index) in tempKey" :key="index"
                                                    class="all-system-list d-flex">
                                                    <div class="px-2">{{ item }} 溫度值</div>
                                                    <div class="px-2 text-right tempFont">{{ tempList['5A02'][item].temp }}
                                                    </div>
                                                    <div class="px-2 text-center">°C</div>
                                                </div>
                                            </div>
                                            <div class="cp0006">
                                                <img src="/images/SpotTemperatureSystemPage/roi_all.png" width="100%" />
                                            </div>
                                            <div class="cp0007">
                                                <div class="all-system-title">5A04</div>
                                            </div>
                                            <div class="d-flex flex-column all-system-list-row cp0008"
                                                v-if="tempList !== null">
                                                <div v-for="(item, index) in tempKey" :key="index"
                                                    class="all-system-list d-flex">
                                                    <div class="px-2">{{ item }} 溫度值</div>
                                                    <div class="px-2 text-right tempFont">{{ tempList['5A04'][item].temp }}
                                                    </div>
                                                    <div class="px-2 text-center">°C</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lb all-system-item">
                                        <div class="col-bb positionRelative">
                                            <!-- 區域3 -->
                                            <div class="text-left title-1 pa-3">B 迴路</div>
                                            <div>
                                                <div class="text-right cp0001">3000A BUS DUCT</div>
                                            </div>
                                            <div class="cp0002">
                                                <img src="/images/SpotTemperatureSystemPage/roi_all.png" width="100%" />
                                            </div>
                                            <div class="cp0003">
                                                <div class="all-system-title">5B01</div>
                                            </div>
                                            <div class="d-flex flex-column all-system-list-row cp0004"
                                                v-if="tempList !== null">
                                                <div v-for="(item, index) in tempKey" :key="index"
                                                    class="all-system-list d-flex">
                                                    <div class="px-2">{{ item }} 溫度值</div>
                                                    <div class="px-2 text-right tempFont">{{ tempList['5B01'][item].temp }}
                                                    </div>
                                                    <div class="px-2 text-center">°C</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="positionRelative cp-0012">
                                            <!-- 區域4 -->
                                            <div class="positionRelative">
                                                <div class="cp0009">
                                                    <img src="/images/SpotTemperatureSystemPage/roi_all.png" width="100%" />
                                                </div>
                                                <div class="cp0010">
                                                    <div class="all-system-title">5B02</div>
                                                </div>
                                                <div class="d-flex flex-column all-system-list-row cp0011"
                                                    v-if="tempList !== null">
                                                    <div v-for="(item, index) in tempKey" :key="index"
                                                        class="all-system-list d-flex">
                                                        <div class="px-2">{{ item }} 溫度值</div>
                                                        <div class="px-2 text-right tempFont">{{ tempList['5B02'][item].temp
                                                        }}
                                                        </div>
                                                        <div class="px-2 text-center">°C</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="positionRelative">
                                                <div class="cp0009">
                                                    <img src="/images/SpotTemperatureSystemPage/roi_all.png" width="100%" />
                                                </div>
                                                <div class="cp0010">
                                                    <div class="all-system-title">5B03</div>
                                                </div>
                                                <div class="d-flex flex-column all-system-list-row cp0011"
                                                    v-if="tempList !== null">
                                                    <div v-for="(item, index) in tempKey" :key="index"
                                                        class="all-system-list d-flex">
                                                        <div class="px-2">{{ item }} 溫度值</div>
                                                        <div class="px-2 text-right tempFont">{{ tempList['5B03'][item].temp
                                                        }}
                                                        </div>
                                                        <div class="px-2 text-center">°C</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="positionRelative">
                                                <div class="cp0009">
                                                    <img src="/images/SpotTemperatureSystemPage/roi_all.png" width="100%" />
                                                </div>
                                                <div class="cp0010">
                                                    <div class="all-system-title">5B04</div>
                                                </div>
                                                <div class="d-flex flex-column all-system-list-row cp0011"
                                                    v-if="tempList !== null">
                                                    <div v-for="(item, index) in tempKey" :key="index"
                                                        class="all-system-list d-flex">
                                                        <div class="px-2">{{ item }} 溫度值</div>
                                                        <div class="px-2 text-right tempFont">{{ tempList['5B04'][item].temp
                                                        }}
                                                        </div>
                                                        <div class="px-2 text-center">°C</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="all-system-cloum col-rt ">
                                    <div class="col-lb all-system-item">
                                        <div class="col-bb positionRelative">
                                            <!-- 區域5 -->
                                            <div class="text-right title-1 pa-3">E 迴路</div>
                                            <div class="cp0012">
                                                <img src="/images/SpotTemperatureSystemPage/roi_all.png" width="100%" />
                                            </div>
                                            <div class="cp0003">
                                                <div class="all-system-title">5E01</div>
                                            </div>
                                            <div class="d-flex flex-column all-system-list-row cp0004"
                                                v-if="tempList !== null">
                                                <div v-for="(item, index) in tempKey" :key="index"
                                                    class="all-system-list d-flex">
                                                    <div class="px-2">{{ item }} 溫度值</div>
                                                    <div class="px-2 text-right tempFont">{{ tempList['5E01'][item].temp
                                                    }}
                                                    </div>
                                                    <div class="px-2 text-center">°C</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="positionRelative">
                                            <!-- 區域6 -->
                                            <div class="cp0013">
                                                <img src="/images/SpotTemperatureSystemPage/roi_all.png" width="100%" />
                                            </div>
                                            <div class="cp0003">
                                                <div class="all-system-title">5E04</div>
                                            </div>
                                            <div class="d-flex flex-column all-system-list-row cp0004"
                                                v-if="tempList !== null">
                                                <div v-for="(item, index) in tempKey" :key="index"
                                                    class="all-system-list d-flex">
                                                    <div class="px-2">{{ item }} 溫度值</div>
                                                    <div class="px-2 text-right tempFont">{{ tempList['5E04'][item].temp
                                                    }}
                                                    </div>
                                                    <div class="px-2 text-center">°C</div>
                                                </div>
                                            </div>
                                            <div class="cp0006">
                                                <img src="/images/SpotTemperatureSystemPage/roi_all.png" width="100%" />
                                            </div>
                                            <div class="cp0007">
                                                <div class="all-system-title">5E02</div>
                                            </div>
                                            <div class="d-flex flex-column all-system-list-row cp0008"
                                                v-if="tempList !== null">
                                                <div v-for="(item, index) in tempKey" :key="index"
                                                    class="all-system-list d-flex">
                                                    <div class="px-2">{{ item }} 溫度值</div>
                                                    <div class="px-2 text-right tempFont">{{ tempList['5E02'][item].temp
                                                    }}
                                                    </div>
                                                    <div class="px-2 text-center">°C</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lb all-system-item">
                                        <div class="col-bb positionRelative">
                                            <!-- 區域7 -->
                                            <div class="text-left title-1 pa-3">D 迴路</div>
                                            <div>
                                                <div class="text-right cp0001">4000A BUS DUCT</div>
                                            </div>
                                            <div class="cp0002">
                                                <img src="/images/SpotTemperatureSystemPage/roi_all.png" width="100%" />
                                            </div>
                                            <div class="cp0003">
                                                <div class="all-system-title">5D01</div>
                                            </div>
                                            <div class="d-flex flex-column all-system-list-row cp0004"
                                                v-if="tempList !== null">
                                                <div v-for="(item, index) in tempKey" :key="index"
                                                    class="all-system-list d-flex">
                                                    <div class="px-2">{{ item }} 溫度值</div>
                                                    <div class="px-2 text-right tempFont">{{ tempList['5D01'][item].temp
                                                    }}
                                                    </div>
                                                    <div class="px-2 text-center">°C</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="positionRelative">
                                            <!-- 區域8 -->
                                            <div class="cp0005">
                                                <img src="/images/SpotTemperatureSystemPage/roi_all.png" width="100%" />
                                            </div>
                                            <div class="cp0003">
                                                <div class="all-system-title">5D03</div>
                                            </div>
                                            <div class="d-flex flex-column all-system-list-row cp0004"
                                                v-if="tempList !== null">
                                                <div v-for="(item, index) in tempKey" :key="index"
                                                    class="all-system-list d-flex">
                                                    <div class="px-2">{{ item }} 溫度值</div>
                                                    <div class="px-2 text-right tempFont">{{ tempList['5D03'][item].temp
                                                    }}
                                                    </div>
                                                    <div class="px-2 text-center">°C</div>
                                                </div>
                                            </div>
                                            <div class="cp0006">
                                                <img src="/images/SpotTemperatureSystemPage/roi_all.png" width="100%" />
                                            </div>
                                            <div class="cp0007">
                                                <div class="all-system-title">5D05</div>
                                            </div>
                                            <div class="d-flex flex-column all-system-list-row cp0008"
                                                v-if="tempList !== null">
                                                <div v-for="(item, index) in tempKey" :key="index"
                                                    class="all-system-list d-flex">
                                                    <div class="px-2">{{ item }} 溫度值</div>
                                                    <div class="px-2 text-right tempFont">{{ tempList['5D05'][item].temp
                                                    }}
                                                    </div>
                                                    <div class="px-2 text-center">°C</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </v-tab-item>

                        <v-tab-item value="tab-2">
                            <div>2</div>
                        </v-tab-item>

                        <v-tab-item value="tab-3">
                            <div>3</div>
                        </v-tab-item>

                        <v-tab-item value="tab-4">
                            <div>4</div>
                        </v-tab-item>

                        <v-tab-item value="tab-5">
                            <div>5</div>
                        </v-tab-item>
                    </v-tabs>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    name: 'SpotTemperatureSystemPage',
    components: {},
    data: () => ({
        tab: 'tab-1',
        wsListener3: {
            close: null,
            message: null
        },
        ws3: null,
        sendInt: null,
        tempKey: ['R1', 'S1', 'T1', 'R2', 'S2', 'T2'],
        tempList: null
    }),
    mounted() {
        this.getData()
    },
    methods: {
        getData() {
            var openwebsocket03 = () => {
                if (this.$myPlugin.webSocketconnect03().readyState === 1) {
                    if (this.sendInt !== null) {
                        clearInterval(this.sendInt)
                        this.sendInt = null
                    }
                    this.ws3 = this.$myPlugin.webSocketconnect03()
                    if (this.wsListener3.close !== null) {
                        this.ws3.removeEventListener("close", this.wsListener3.close)
                        this.wsListener3.close = null
                    }
                    var colseEvent = () => {
                        setTimeout(() => {
                            openwebsocket03()
                        }, 1000)
                        if (this.sendInt !== null) {
                            clearInterval(this.sendInt)
                            this.sendInt = null
                        }
                    }
                    this.ws3.addEventListener("close", colseEvent)
                    this.wsListener3.close = colseEvent
                    // this.wkstreaming.postMessage({ type: 'open', content: '' });
                    var messageEvent = (event) => {
                        var data = JSON.parse(event.data)
                        var output = {}
                        if (data.type === "spotTempSystem" && data.method === "queryTempe_all") {
                            var content = data.content
                            var contentlen = content.length
                            for (var i = 0; i < contentlen; i++) {
                                var arr = {}
                                Object.keys(content[i]).forEach((value, index) => {
                                    if (value !== 'name') {
                                        arr[value] = content[i][value]
                                    }
                                })
                                output[content[i].name] = arr
                            }
                        }
                        this.tempList = output
                        // console.log(data, output);
                        data = null
                        output = null
                        // this.wkstreaming.postMessage({ type: 'connection', content: event.data });
                    }
                    this.ws3.addEventListener("message", messageEvent)
                    this.wsListener3.message = messageEvent
                    var getData1 = () => {
                        this.ws3.send(JSON.stringify(
                            {
                                type: "spotTempSystem",
                                method: "queryTempe_all"
                            }
                        ))
                    }
                    this.sendInt = setInterval(() => {
                        getData1()
                    }, 3000)
                    this.sendInt()
                    getData1()
                } else if (this.$myPlugin.webSocketconnect03().readyState !== 1) {
                    setTimeout(() => {
                        openwebsocket03()
                    }, 1000)
                    if (this.sendInt !== null) {
                        clearInterval(this.sendInt)
                        this.sendInt = null
                    }
                }
            }
            openwebsocket03()
        }
    },
    beforeDestroy() {
        if (this.sendInt !== null) {
            clearInterval(this.sendInt)
            this.sendInt = null
        }
        if (this.wsListener3.close !== null) {
            this.ws3.removeEventListener("close", this.wsListener3.close)
            this.wsListener3.close = null
        }
        if (this.wsListener3.message !== null) {
            this.ws3.removeEventListener("message", this.wsListener3.message)
            this.wsListener3.message = null
        }
        if (this.ws3 !== null) {
            // this.ws4.close()
            this.ws3 = null
        }
    }
}
</script>
<style scoped>
.title-1 {
    font-size: 23px;
    font-weight: 600;
}

.tempFont {
    /* color: rgb(27, 228, 111); */
    color: #000;
}

/* 區域1 */
.cp0001 {
    position: absolute;
    top: 20%;
    left: 4%;
}

.cp0002 {
    width: 26px;
    position: absolute;
    top: 8%;
    left: 19%;
}

.cp0002::before {
    content: "";
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: #000;
    border-radius: 10px;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, -50%);
}

.cp0003 {
    position: absolute;
    top: 50%;
    left: 26%;
    transform: translate(0px, -50%);
}

.cp0004 {
    position: absolute;
    top: 2%;
    left: 36%;
    border: #000 1px solid;
}

/* 區域2 */
.cp0005 {
    width: 26px;
    position: absolute;
    top: 2%;
    left: 19%;
}

.cp0006 {
    width: 26px;
    position: absolute;
    top: 2%;
    left: 61%;
}

.cp0006::before {
    content: "";
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: #000;
    border-radius: 10px;
    top: -5px;
    left: 50%;
    transform: translate(-50%, -50%);
}

.cp0007 {
    position: absolute;
    top: 50%;
    left: 67%;
    transform: translate(0px, -50%);
}

.cp0008 {
    position: absolute;
    top: 2%;
    left: 76%;
    border: #000 1px solid;
}

/* 區域3 */
/* 區域4 */
.cp-0012 {
    display: grid;
    grid-template-columns: 33% 33% 33%;
}

.cp0009 {
    width: 26px;
    position: absolute;
    top: 2%;
    left: 10%;
}

.cp0009::before {
    content: "";
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: #000;
    border-radius: 10px;
    top: -5px;
    left: 50%;
    transform: translate(-50%, -50%);
}

.cp0010 {
    position: absolute;
    top: 50%;
    left: 26%;
    transform: translate(0px, -50%);
}

.cp0011 {
    position: absolute;
    top: 2%;
    right: 0%;
    border: #000 1px solid;
}

/* 區域5 */
.cp0012 {
    width: 27px;
    position: absolute;
    top: 5%;
    left: 19%;
}

.cp0012::before {
    content: "";
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: #000;
    border-radius: 10px;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, -50%);
}

/* 區域6 */
.cp0013 {
    width: 26px;
    position: absolute;
    top: 2%;
    left: 19%;
}

/* 區域7 */
/* 區域8 */
.all-system-list-row {}

.all-system-list {
    border: #000 1px solid;
    padding: 3px;
    /* background-color: rgb(96, 150, 206); */
    /* background-color: #949292; */
    background-color: rgb(195 195 195);
    justify-content: space-between;
}

.all-system-title {
    border: #666 2px solid;
    color: #666;
    padding: 4px;
}

.all-system-grid-5 {
    display: grid;
    grid-template-columns: 20% 10% 20% 20% 10%;
}

.all-system-row {
    height: 100%;
    position: relative;
}

.all-system-item {
    display: grid;
    grid-template-rows: 50% 50%;

}

.positionRelative {
    position: relative;
}

.all-system-cloum {
    width: 100%;
    height: calc(100% / 2);
    display: grid;
    grid-template-columns: 50% 50%;
}

.col-lt {
    border-right: #fff 2px solid;
    border-bottom: #fff 2px solid;
}

.col-rt {
    border-bottom: #fff 2px solid;
}

.col-lb {
    border-right: #fff 2px solid;
}

.all-system-grid-row {
    height: 100%;
    display: grid;
    grid-template-rows: 50% 50%;
}

.col-rb {}

.col-bb {
    border-bottom: rgb(23, 60, 64) 2px solid;
}

.all-system-canvas {
    width: 100%;
    height: 826px;
    /* background-color: rgb(0, 122, 137); */
    background-color: rgb(220, 220, 220);
}

.bgimg {
    position: absolute;
}

.scroll4::-webkit-scrollbar {
    width: 10px;
}

.scroll4::-webkit-scrollbar-thumb {
    background: #666;
    border-radius: 20px;
}

.scroll4::-webkit-scrollbar-track {
    background: #ddd;
    border-radius: 20px;
}
</style>
