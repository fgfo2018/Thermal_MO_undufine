<template>
  <div ref="heatMap2" style="height: 250px; width: 1400px"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'HeatMap2',

  data() {
    return {}
  },
  mounted() {
    this.drawBar()
  },
  methods: {
    drawBar() {
      const chartDom = this.$refs.heatMap2
      const myChart = echarts.init(chartDom) // echarts初始化
      // const colorPalette = ['#37484C', '#E6E8E9']
      var option

      // 選擇圖表樣式------------------------------------------

      // prettier-ignore
      const hours = [
    '0', '1', '2', '3', '4', '5', '6',
    '7', '8', '9', '10', '11',
    '12', '13', '14', '15', '16', '17',
    '18', '19', '20', '21', '22', '23'
];
      // prettier-ignore
      const mins = [
    '0','10', '20', '30',
    '40', '50', 
];
      for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 23; j++) {
          console.log("123")
        }
      }
      // prettier-ignore
      const data = [
        [0, 0, 0], [0, 1, 4], [0, 2, 5], [0, 3, 5], [0, 4, 5],
        [0, 5, 5], [0, 6, 5], [0, 7, 5], [0, 8, 4], [0, 9, 5],
        [0, 10, 5], [0, 11, 5], [0, 12, 5], [0, 13, 0], [0, 14, 5],
        [0, 15, 5], [0, 16, 5], 

        [1, 0, 5], [1, 1, 5], [1, 2, 5], [1, 3, 5], [1, 4, 5], 
        [1, 5, 3], [1, 6, 5], [1, 7, 5], [1, 8, 5], [1, 9, 5], 
        [1, 10, 1], [1, 11, 3], [1, 12,], [1, 13, 5], [1, 14, 5], 
        [1, 15, 5], [1, 16, 5], 

        [2, 0, 5], [2, 1, 5],[2, 2, 5], [2, 3, 5], [2, 4, 5], [2, 5, 5],
        [2, 6, 5], [2, 7, 5], [2, 8, 0], [2, 9, 5], [2, 10, 5], [2, 11, 5],
        [2, 12, 5], [2, 13, 5], [2, 14, 5], [2, 15, 1], [2, 16, 5],
        

        [3, 0, 5], [3, 1, 3], [3, 2, 0], [3, 3, 5], [3, 4, 5], [3, 5, 5], 
        [3, 6, 5], [3, 7, 5], [3, 8, 2], [3, 9, 5], [3, 10, 3], [3, 11, 4],
        [3, 12, 5], [3, 13, 5], [3, 14, 5], [3, 15, 5], 
        
        
        [4, 0, 2], [4, 1, 5], [4, 2, 5], [4, 3, 5], [4, 4, 5],
        [4, 5, 5], [4, 6, 5], [4, 7, 3], [4, 8, 5], [4, 9, 5], [4, 10, 5],
        [4, 11, 4], [4, 12, 5], [4, 13, 5], [4, 14, 4], [4, 15, 5],
       
        
        [5, 0, 5], [5, 1, 5], [5, 2, 5], [5, 3, 5], [5, 4, 5], [5, 5, 5], 
        [5, 6, 5], [5, 7, ], [5, 8, 2], [5, 9, 5], [5, 10, 4], [5, 11, 5],
        [5, 12, 5], [5, 13, 5], [5, 14, 5], [5, 15, 5],
       

        // [6, 0, 5], [6, 1, 5], [6, 2, 5], [6, 3, 5], [6, 4, 5], [6, 5, 5], 
        // [6, 6, 5], [6, 7, 5], [6, 8, 5], [6, 9, 5], [6, 10, 5], [6, 11, 5], 
        // [6, 12, 5], [6, 13, 5], [6, 14, 3], [6, 15, 4], [6, 16, 5], 
   
        ]
    .map(function (item) {
    return [item[1], item[0], item[2] ];
});
      option = {
        // color: colorPalette,
        tooltip: {
          position: 'top',
          // trigger: 'item',
          formatter(params) {
            if (params.value[2] <= 2) {
              return (
                params.value[0] +
                ':' +
                params.value[1] +
                '0' +
                '<br/>' +
                '已收集了' +
                params.value[2] +
                '/5筆資料' +
                '<br/>' +
                '• 異常-資料丟失率<10% (單日)'
              )
            } else if (params.value[2] <= 3) {
              return (
                params.value[0] +
                ':' +
                params.value[1] +
                '0' +
                '<br/>' +
                '已收集了' +
                params.value[0] +
                '/5筆資料' +
                '<br/>' +
                '• 些微異常-資料丟失率<5% (單日)'
              )
            } else if (params.value[2] <= 4) {
              return (
                params.value[0] +
                ':' +
                params.value[1] +
                '0' +
                '<br/>' +
                '已收集了' +
                params.value[0] +
                '/5筆資料' +
                '<br/>' +
                '• 良好-資料丟失率<2.5% (單日)'
              )
            } else if (params.value[2] === '') {
              return (
                params.value[0] +
                ':' +
                params.value[1] +
                '0' +
                '<br/>' +
                '已收集了' +
                params.value[0] +
                '/5筆資料' +
                '<br/>' +
                '• 資料丟失'
              )
            } else {
              return (
                params.value[0] +
                ':' +
                params.value[1] +
                '0' +
                '<br/>' +
                '已收集了' +
                params.value[2] +
                '/5筆資料' +
                '<br/>' +
                '• 良好-資料丟失率<2.5% (單日)'
              )
            }
          },
        },
        grid: {
          height: '80%',
          // right: 'center',
          left: '50px',
          top: 'center',
          width: '1100px',
        },
        xAxis: {
          type: 'category',
          data: hours,
          splitArea: {
            show: true,
          },
        },
        yAxis: {
          type: 'category',
          data: mins,
          splitArea: {
            show: true,
          },
        },

        visualMap: {
          min: 0,
          max: 5,
          calculable: true,
          orient: 'vertical',
          left: '1500',
          top: 'center',
          inRange: {
            color: ['#37484C', '#9aa2a4', '#d8dddd', '#E6E8E9'],
          },
          itemStyle: {
            borderColor: '#fff',
          },
        },

        series: [
          {
            name: '',
            type: 'heatmap',
            data,
            label: {
              show: true,
            },
            itemStyle: {
              borderWidth: 3,
              borderColor: '#fff',
            },
            emphasis: {
              itemStyle: {
                // shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                // borderColor: '#fff',
              },
            },
          },
        ],
      }

      // -------------------------------------------------------------

      option && myChart.setOption(option)
    },
  },
}
// let myChart = echarts.init(document.getElementById('charts'));
</script>

<style></style>
