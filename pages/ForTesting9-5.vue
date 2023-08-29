<template>
  <div>
    <div id="main" style="height: 400px; width: 1800px"></div>
    <v-btn @click="stop1">stop</v-btn>
    <v-btn @click="reset('realtime')">reaktime</v-btn>
    <v-btn @click="reset('set300k')">300k</v-btn>
    <v-btn @click="reset('set600k')">600k</v-btn>
    <v-btn @click="reset('testlines')">testlines</v-btn>
  </div>
</template>
<script>
import * as echarts from 'echarts'
export default {
  name: 'HistoricalMonitoringPage',
  metaInfo() {
    return {
      script: [
        {
          hid: 'extscript',
          body: true,
          src:
            // 問號後面是隨機給的亂數，避免瀏覽器暫存.JS，造成metaInfo不起作用
            'https://mrdoob.github.io/stats.js/build/stats.min.js?' + Math.random().toString(36).substr(2),
          callback: () => {
            this.fps()
          },
        }
      ]
    }
  },
  data: () => ({
    // e: { a: new Array(1e7), bee: new Array(1e7) }
    totleData: [],
    wk1: null
  }),
  mounted() {
    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom, {
      // devicePixelRatio: 0.5
    });
    var option;
    option = {
      xAxis: {
        type: 'category',
        // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: [
        {
          max: 100,
          min: 0,
          scale: true
        }
      ],
      dataZoom: [
        {
          type: 'inside',
          realtime: true,
        },
      ],
      series: [
        // {
        //   data: [1320, 1800],
        //   type: 'line'
        // },
        {
          type: 'lines',
          coordinateSystem: 'cartesian2d',
          polyline: true,
          large: true,
          progressive: 10000,
          select: {
            disabled: true
          },
          data: [
            // {
            //   coords: [['Mon', 1500], ['Tue', 1800], ['Wed', 1800], ['Thu', 1800]]
            // }
            // {
            //   coords: [['Tue', 1800], ['Wed', 1800]]
            // }
          ]
        }
      ]
    }

    option && myChart.setOption(option);
    this.wk1 = new WebSocket('ws://localhost:8703')
    this.wk1.onopen = () => {
      console.log("open");
    }
    this.wk1.onmessage = (e) => {
      var data = JSON.parse(e.data)
      console.log(data.series);
      myChart.setOption({
        animation: false,
        xAxis: {
          type: 'category',
          // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          data: data.time
        },
        dataZoom: [
          {
            type: 'inside',
            // realtime: true,
            startValue: data.start,
            endValue: data.stop,
          },
        ],
        series: [
          {
            type: 'lines',
            polyline: true,
            coordinateSystem: 'cartesian2d',
            emphasis: {
              disabled: true
            },
            data: data.series
          }
        ]
      }, { replaceMerge: ['dataZoom', 'series', 'xAxis'] });
      data = null
    }
    // var option;

    // option = {
    //   animation: false,
    //   // tooltip: {
    //   //   trigger: 'axis'
    //   // },
    //   dataZoom: [
    //     {
    //       type: 'inside',
    //       realtime: true,
    //     },
    //   ],
    //   xAxis: {
    //     type: 'category'
    //   },
    //   yAxis: {
    //     type: 'value',
    //     splitArea: {
    //       show: false
    //     }
    //   },
    //   series: [],
    //   // hoverLayerThreshold: 1000
    // };
    // option && myChart.setOption(option);
    // this.wk1 = new Worker('/worker/testEchart.js');
    // this.wk1.addEventListener('message', (e) => {
    //   var data = e.data
    //   // this.totleData = this.totleData.concat(data.series)
    //   // console.log(e);
    //   myChart.setOption({
    //     xAxis: {
    //       type: 'category',
    //       data: data.time,
    //       silent: false,
    //       splitLine: {
    //         show: false
    //       },
    //       splitArea: {
    //         show: false
    //       }
    //     },
    //     dataZoom: [
    //       {
    //         type: 'inside',
    //         realtime: true,
    //         startValue: data.start,
    //         endValue: data.stop,
    //       },
    //     ],
    //     series: [
    //       {
    //         // data: this.totleData,
    //         data: data.series,
    //         type: 'line',
    //         showSymbol: false,
    //         showAllSymbol: false,
    //         legendHoverLink: false,
    //         triggerLineEvent: false,
    //         emphasis: {
    //           disabled: true
    //         },
    //         silent: true,
    //         // sampling: 'lttb',
    //       },
    //       {
    //         // data: this.totleData,
    //         data: data.series2,
    //         type: 'line',
    //         showSymbol: false,
    //         showAllSymbol: false,
    //         legendHoverLink: false,
    //         triggerLineEvent: false,
    //         emphasis: {
    //           disabled: true
    //         },
    //         silent: true,
    //         // sampling: 'lttb',
    //       }
    //     ]
    //   }, { replaceMerge: ['dataZoom', 'series', 'xAxis'] });
    //   data = null
    // })
  },
  methods: {
    fps() {
      // eslint-disable-next-line no-undef
      var stats = new Stats();
      stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
      document.body.appendChild(stats.dom);
      function animate() {
        stats.begin();
        // monitored code goes here
        stats.end();
        requestAnimationFrame(animate);
      }
      requestAnimationFrame(animate);
    },
    stop1() {
      this.wk1.close();
    },
    reset(type) {
      // this.wk1.postMessage({ type });
      this.wk1.send(JSON.stringify({ type }))
      // if(type === 'set300k') {
      //   this.wk1.send(type)
      // }else if(type === 'reaktime') {
      //   this.wk1.send(type)
      // }
    }
  },
  beforeDestroy() {
    if (this.wk1 !== null) {
      this.wk1.close();
      this.wk1 = null
    }
    this.e = null
  }
}
</script>
<style scoped></style>
