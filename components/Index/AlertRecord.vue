<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    item-key="ROI"
    sort-by="ROI"
    group-by="date"
    class="elevation-1"
    dense
    show-group-by
    hide-default-footer
  ></v-data-table>
</template>
<script>
export default {
  data() {
    return {
      headers: [
        {
          // text: 'Dessert (100g serving)',
          align: 'start',
          value: 'name',
          groupable: false,
        },
        { text: '範圍', value: 'ROI', align: 'center' },
        { text: '狀況', value: 'situation', align: 'right' },
        { text: '期間', value: 'duration', align: 'right' },
        { text: '超溫值', value: 'overtemp', align: 'right' },
        { text: '日期', value: 'date', align: 'right' },
      ],
      desserts: [
        {
          ROI: '點3',
          situation: '曾超溫',
          duration: '17m',
          time: '12:10:08',
          date: '2022/03/17',
        },
        {
          ROI: '點2',
          situation: '曾超溫',
          duration: '36m',
          time: '12:10:08',
          date: '2022/03/15',
        },
        {
          ROI: '矩形2',
          situation: '曾超溫',
          duration: '2d',
          time: '12:10:08',
          date: '2022/03/10',
        },
        {
          ROI: '點4',
          situation: '已超溫',
          duration: '1m17s',
          time: '12:10:08',
          date: '2022/03/15',
        },
        {
          ROI: '線3',
          situation: '曾超溫',
          duration: '1h20m',
          time: '12:10:08',
          date: '2022/03/07',
        },
        {
          ROI: '線2',
          situation: '已超溫',
          duration: '1m55s',
          time: '12:10:08',
          date: '2022/03/07',
        },
        {
          ROI: '線1',
          situation: '已超溫',
          duration: '1m',
          time: '12:10:08',
          date: '2022/03/15',
        },
        {
          ROI: '點1',
          situation: '已超溫',
          duration: '55s',
          time: '12:10:08',
          date: '2022/03/07',
        },
        {
          ROI: '矩形1',
          situation: '曾超溫',
          duration: '14s',
          time: '18:30:14',
          date: '2022/03/10',
        },
      ],
    }
  },
}
</script>

temps: [ { name: '點3', temperature: 30, situation: '超溫', time: '07:04:22',
duration: '55s' date: '2022/3/17', }, { name: '點2', temperature: 26, situation:
'超溫', time: '02:10:07', date: '2022/3/17', }, { name: '矩形1', temperature:
23, situation: '超溫', time: '18:30:14', date: '2022/3/16', }, { name: '點1',
temperature: 15, situation: '超溫', time: '17:15:08', date: '2022/3/14', }, // {
// name: '點4', // temperature: 30, // situation: '超溫', // time: '04:30:14',
// date: '2022/3/14', // }, // { // name: '點4', // temperature: 30, //
situation: '超溫', // time: '04:30:14', // date: '2022/3/14', // }, ],
