<template>
    <div ref="donutChart1" style="height: 138px; width: 190px"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
    props:['data1'],
    // data() {},
    mounted() {
        this.drawBar()
    },
    methods: {
        drawBar() {
            const chartDom = this.$refs.donutChart1
            const myChart = echarts.init(chartDom) // echarts初始化
            const colorPalette = ['#37484C', '#9aa2a4', '#d8dddd', '#E6E8E9']
            var option

            // 選擇圖表樣式------------------------------------------

            option = {
                tooltip: {
                    trigger: 'item',
                },
                legend: {
                    show: false,
                    top: '10px',
                    width: '100px',
                    left: 'right',
                    itemWidth: 10, // 图例的宽度
                    itemHeight: 10, // 图例的高度
                    textStyle: {
                        // 图例文字的样式
                        color: '#ccc',
                        fontSize: 15,
                    },
                },

                series: [
                    {
                        name: '',
                        top: '0px',
                        right: "0px",
                        avoidLabelOverlap: false,
                        type: 'pie',
                        radius: ['70%', '90%'],
                        itemStyle: {
                            // borderRadius: 5,
                            // borderColor: '#fff',
                            // borderWidth: 3,
                        },

                        color: colorPalette,

                        label: {
                            show: true,
                            position: 'center',
                            // formatter(d) {
                            // return d.value;
                            // formatter: '{d}%',
                            formatter: '{c}',
                            fontSize: '16',
                            // backgroundColor: 'white',

                        },

                        emphasis: {
                            label: {
                                show: true,
                                // fontSize: '60',
                                // fontWeight: 'bold',
                                // backgroundColor: 'white',
                                // borderColor: '#fff',
                                borderWidth: 5,
                            },
                        },
                        labelLine: {
                            show: true,
                        },
                        data: [
                            { name: '開通數量', value: this.data1.opened },
                            { name: '啟用', value: this.data1.on },
                            { name: '停用', value: this.data1.off },
                            { name: '尚有', value: this.data1.nohave },
                        ],
                    },
                ],
            }

            // -------------------------------------------------------------

            option && myChart.setOption(option)
        },
    },
}
</script>
<style scoped></style>
