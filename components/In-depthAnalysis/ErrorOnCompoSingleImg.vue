<template>
  <v-row>
    <v-col cols="12" lg="12" md="12">
      <v-card ref="form" class="my-6 mx-6 card" flat outlined height="48.5em">
        <v-card-title>
          <v-row>
            <v-col cols="12" class="pb-0">
              <h6 style="color: #4f5e62">
                異常分析 > 區域異常分析 > 異常元件統計 > 異常元件影像分析 >
                單元件影像分析
              </h6>
            </v-col>
            <v-col cols="12" md="12" class="py-0">
              <div class="d-flex">
                <div class="d-flex">
                  <v-text-field
                    class="classification input mr-2"
                    dense
                    disabled
                    outlined
                    ref=""
                    :items="repeat_transmission"
                    value="C-A棟"
                    hide-details
                  ></v-text-field>
                  <v-text-field
                    class="classification input mr-2"
                    dense
                    disabled
                    outlined
                    ref=""
                    :items="repeat_transmission"
                    value="C-A-1區"
                    hide-details
                  ></v-text-field>
                  <v-text-field
                    class="classification input mr-2"
                    dense
                    disabled
                    outlined
                    ref=""
                    :items="repeat_transmission"
                    value="CAM-S1-52"
                    hide-details
                  ></v-text-field>

                  <v-text-field
                    class="classification input mr-2"
                    dense
                    disabled
                    outlined
                    ref=""
                    :items="repeat_transmission"
                    value="接點"
                    hide-details
                  ></v-text-field>

                  <v-select
                    class="classification input mr-2"
                    dense
                    outlined
                    ref=""
                    :items="repeat_transmission"
                    placeholder="ID: 20220829"
                    hide-details
                    :menu-props="{ bottom: true, offsetY: true }"
                  ></v-select>

                  <date-picker
                    class="classification input mr-2"
                    v-model="value1"
                    type="datetime"
                    range
                    placeholder="Select datetime range"
                    style="width: 350px"
                  ></date-picker>

                  <!-- <ol class="timeline">
  <li>2000
    <span>
      Infos about the year 2000.
    </span>
  </li>
  <li>2001 (test)
    <span>
      Infos about the year 2001.
    </span>
  </li>
  <li>2002
    <span>
      Infos about the year 2002.
    </span>  
  </li>
  <li>2003
      <span>
      Infos about the year 2003.
    </span>
  </li>
  <li>2004
      <span>
      Infos about the year 2004.
    </span>
  </li>
</ol> -->
                </div>
                <v-spacer />

                <v-switch
                  v-if="switch1 === true"
                  v-model="switch1"
                  label="全部顯示"
                ></v-switch>
                <v-switch
                  v-else
                  v-model="switch1"
                  label="僅顯示 已標籤"
                ></v-switch>
              </div>
            </v-col>
          </v-row>
        </v-card-title>

        <!-- this dialog is used for both create and update -->
        <!-- 表格 -->
        <v-row>
          <v-col cols="12" class="pa-1">
            <!-- <Two2X1 /> -->
            <SingleLine />
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
// import axios from 'axios'
// import Two2X1 from './GRIDs/Two2X1.vue'
import SingleLine from './TIMELINEs/SingleLine.vue'

export default {
  components: { SingleLine },

  data() {
    return {
      switch1: true,

      // 元件資料
      elementImgHeaders: [
        {
          text: '項次',
          sortable: false,
          align: 'center',
          value: 'index',
        },
        { text: '影像ID', align: 'center', sortable: false, value: 'img_id' },
        {
          text: '元件類別',
          align: 'center',
          sortable: false,
          value: 'element_type',
        },
        {
          text: '異常原因',
          align: 'center',
          sortable: false,
          value: 'error_reason',
        },
        {
          text: '擷取時間',
          align: 'center',
          sortable: false,
          value: 'capture_time',
        },
      ],
      elementImgItems: [
        {
          index: '01',
          img_id: '20220829001',
          element_type: '接點',
          error_reason: '自體異常',
          capture_time: '2022/05/31',
        },
        {
          index: '02',
          img_id: '20220829001',
          element_type: '接點',
          error_reason: '自體異常',
          capture_time: '2022/05/31',
        },
        {
          index: '03',
          img_id: '20220829001',
          element_type: '接點',
          error_reason: '自體異常',
          capture_time: '2022/05/31',
        },
        {
          index: '04',
          img_id: '20220829001',
          element_type: '接點',
          error_reason: '自體異常',
          capture_time: '2022/05/31',
        },
        {
          index: '05',
          img_id: '20220829001',
          element_type: '接點',
          error_reason: '自體異常',
          capture_time: '2022/05/31',
        },
        {
          index: '06',
          img_id: '20220829001',
          element_type: '接點',
          error_reason: '自體異常',
          capture_time: '2022/05/31',
        },
        {
          index: '07',
          img_id: '20220829001',
          element_type: '接點',
          error_reason: '自體異常',
          capture_time: '2022/05/31',
        },
        {
          index: '08',
          img_id: '20220829001',
          element_type: '接點',
          error_reason: '自體異常',
          capture_time: '2022/05/31',
        },
        {
          index: '09',
          img_id: '20220829001',
          element_type: '接點',
          error_reason: '自體異常',
          capture_time: '2022/05/31',
        },
        {
          index: '10',
          img_id: '20220829001',
          element_type: '接點',
          error_reason: '自體異常',
          capture_time: '2022/05/31',
        },
        {
          index: '11',
          img_id: '20220829001',
          element_type: '接點',
          error_reason: '自體異常',
          capture_time: '2022/05/31',
        },
      ],

      // 接點資料
      contactHeaders: [
        {
          text: '項次',
          sortable: false,
          value: 'index',
        },
        { text: '影像ID', sortable: false, value: 'img_id' },
        { text: '自體異常', sortable: false, value: 'error_self' },
        { text: '比照異常', sortable: false, value: 'error_compare' },
        { text: '加總', sortable: false, value: 'total' },
        {
          text: '詳細資訊',
          value: 'actions',
          sortable: false,
        },
      ],
      contactItems: [
        {
          index: '01',
          img_id: '20220829001',
          error_self: 1,
          error_compare: 1,
          total: 2,
        },
        {
          index: '02',
          img_id: '20220829002',
          error_self: 0,
          error_compare: 2,
          total: 2,
        },
        {
          index: '03',
          img_id: '20220829003',
          error_self: 2,
          error_compare: 2,
          total: 4,
        },
        {
          index: '04',
          img_id: '20220829004',
          error_self: 0,
          error_compare: 0,
          total: 0,
        },
        {
          index: '05',
          img_id: '20220829005',
          error_self: 1,
          error_compare: 1,
          total: 2,
        },
      ],

      // 線材資料
      cableHeaders: [
        {
          text: '項次',
          align: 'start',
          sortable: false,
          value: 'index',
        },
        { text: '影像ID', sortable: false, value: 'img_id' },
        { text: '自體異常', sortable: false, value: 'error_self' },
        { text: '比照異常', sortable: false, value: 'error_compare' },
        { text: '加總', sortable: false, value: 'total' },
        {
          text: '詳細資訊',
          value: 'actions',
          sortable: false,
        },
      ],
      cableItems: [
        {
          index: '01',
          img_id: '20220829001',
          error_self: 1,
          error_compare: 1,
          total: 2,
        },
        {
          index: '02',
          img_id: '20220829002',
          error_self: 0,
          error_compare: 2,
          total: 2,
        },
        {
          index: '03',
          img_id: '20220829003',
          error_self: 2,
          error_compare: 2,
          total: 4,
        },
        {
          index: '04',
          img_id: '20220829004',
          error_self: 0,
          error_compare: 0,
          total: 0,
        },
        {
          index: '05',
          img_id: '20220829005',
          error_self: 1,
          error_compare: 1,
          total: 2,
        },
      ],

      // date-picker
      value1: [new Date(), new Date()],
      valid: true,

      expanded: [],
      singleExpand: false,
      selected: [],
      n: 0,

      message: false,

      // 搜尋
      search: '',
      // 分頁
      page: 1,
      pageCount: 0,
      itemsPerPage: 12,
      // pageTotle: 10,

      // 密碼

      // 信箱
      show: false,
      loading: true,
      // email: '',
      // emailRules: [
      //   (v) => !!v || '有效的信箱',
      //   (v) => /.+@.+/.test(v) || '無效的信箱格式',
      // ],
      items: [],
      itemsForCamTable: [],

      status: ['enable', 'disable'],
      itemsSelect: ['user', 'viewer', 'admin'],
      dialog: false,
      dialogForAddServer: false,
      // dialogForServerDetailInfo: false,
      editedItem: {},
      radio: '',
      snack: false,
      snackColor: '',
      snackText: '',
      snackIcon: '',
      dialogForConfirm: false,
      dialogForConfirmServerDetailInfo: false,

      radioGroup: 1,
      dialogForTurnBack: false,
      menu: false,
      panel: [0, 1],

      // 分頁
    }
  },

  mounted() {},

  methods: {
    // 分業
    setPage(data) {
      this.page = data
    },
    // 允許使用之變色
    getGreenColor() {
      return '#8AB284'
    },
    getRedColor() {
      return '#e89595'
    },
    // 對話框
    showEditDialog(item) {
      this.editedItem = item || {}
      this.dialog = !this.dialog
    },
  },
}
</script>
<style scoped>
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
<style lang="scss">
.my-header-style {
  color: #4f5e62 !important;
  font-size: 9px;
}

.my-header-style2 {
  color: #4f5e62 !important;
  font-size: 16px;
}

.my-footer-style {
  color: #4f5e62 !important;
}

.v-data-footer .v-icon {
  color: #4f5e62;
  // color: #69c585;
}

// .v-data-footer > .v-input__slot {
//   min-height: 2.21em !important;
//   // width: 8em !important;
//   color: #828c8f;
//   display: flex !important;
//   align-items: center !important;
// }

// #table > .v-data-footer .v-icon {
//   color: black;
// }

.input_edit_left .v-input__slot .v-icon {
  // max-height: 1em !important;
  // width: 20em !important;
  // color: red;
  // display: flex !important;
  // align-items: left !important;
  font-size: 15px;
  // padding: 0px 0px 0px 0px;
}

.classification .v-input__slot {
  min-height: 36px !important;
  width: 10em !important;
  font-size: 13px;

  max-height: 36px !important;
  // color: red;
  display: flex !important;
  align-items: left !important;
  // padding: 0px 0px 0px 0px;
}

.classification .v-input__slot .v-icon {
  font-size: 20px;
}

.classification .v-input__slot .v-label {
  font-size: 13px;
}

.tiny_input .v-input__slot {
  min-height: 22px !important;
  width: 10em !important;
  font-size: 13px;

  max-height: 22px !important;
  // color: red;
  display: flex !important;
  align-items: left !important;
  // padding: 0px 0px 0px 0px;
}

.tiny_input .v-input__slot .v-icon {
  font-size: 20px;
}

.tiny_input .v-input__slot .v-label {
  font-size: 13px;
}

.tiny_input input {
  // color: #4f5e62 ;
}

.tiny_input_select .v-input__slot {
  min-height: 22px !important;
  width: 10em !important;
  font-size: 13px;
  max-height: 22px !important;
  // color: red;
  // display: flex !important;
  // align-items: left !important;
  // padding: 0px 0px 0px 0px;
}

.tiny_input_select .v-input__slot .v-icon {
  font-size: 20px;
  margin-bottom: 17px;
  margin-left: 20px;
}

.tiny_input_select .v-input__slot .v-label {
  font-size: 13px;
}

.tiny_input_select input {
  color: #4f5e62 !important;
}

.theme--light.tiny_input_select.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state)
  > .v-input__control
  > .v-input__slot
  fieldset {
  color: rgba(0, 0, 0, 0.1);
}
// 小select
.most_tiny_input_select .v-input__slot {
  min-height: 22px !important;
  width: 6em !important;
  font-size: 13px;
  max-height: 22px !important;
  // color: red;
  // display: flex !important;
  // align-items: left !important;
  // padding: 0px 0px 0px 0px;
}

.most_tiny_input_select .v-input__slot .v-icon {
  font-size: 20px;
  margin-bottom: 13px;
  margin-left: 20px;
}

.most_tiny_input_select .v-input__slot .v-label {
  font-size: 13px;
}

.most_tiny_input_select input {
  color: #4f5e62 !important;
}

.theme--light.most_tiny_input_select.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state)
  > .v-input__control
  > .v-input__slot
  fieldset {
  color: rgba(0, 0, 0, 0.1);
}

// 移動位置按鈕設定
.most_tiny_input_select2 .v-input__slot {
  min-height: 22px !important;
  width: 6em !important;
  font-size: 13px;
  max-height: 22px !important;
  // color: red;
  // display: flex !important;
  // align-items: left !important;
  // padding: 0px 0px 0px 0px;
}

.most_tiny_input_select2 .v-input__slot .v-icon {
  font-size: 20px;
  margin-bottom: 17px;
  margin-left: 20px;
}

.most_tiny_input_select .v-input__slot .v-label {
  font-size: 13px;
}

.most_tiny_input_select2 input {
  color: #4f5e62 !important;
}

.theme--light.most_tiny_input_select2.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state)
  > .v-input__control
  > .v-input__slot
  fieldset {
  color: rgba(0, 0, 0, 0.1);
}
// -----

.theme--light.tiny_input.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state)
  > .v-input__control
  > .v-input__slot
  fieldset {
  color: rgba(0, 0, 0, 0.1);
}

.theme--light.classification.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state)
  > .v-input__control
  > .v-input__slot
  fieldset {
  color: rgba(0, 0, 0, 0.1);
}
// 顯示筆數
.item_per_page .v-input__slot {
  min-height: 36px !important;
  width: 5.3em !important;
  // width: 80px !important;
  font-size: 13px;
}

.item_per_page input {
  color: #4f5e62 !important;
}
.item_per_page .v-input__slot .v-icon {
  font-size: 20px;
}

.item_per_page .v-input__slot .v-label {
  font-size: 14px;
  // padding: 0px 0px 0px 0px;
}

.item_per_page.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state)
  > .v-input__control
  > .v-input__slot
  fieldset {
  color: rgba(0, 0, 0, 0.1);
}

// table
// .v-data-table > .v-data-table__wrapper > table > tbody > tr > td, .v-data-table > .v-data-table__wrapper > table > tbody > tr > th, .v-data-table > .v-data-table__wrapper > table > thead > tr > td, .v-data-table > .v-data-table__wrapper > table > thead > tr > th, .v-data-table > .v-data-table__wrapper > table > tfoot > tr > td, .v-data-table > .v-data-table__wrapper > table > tfoot > tr > th {
//      padding: 0 16px;
//     transition: height 0.2s cubic-bezier(0.4, 0, 0.6, 1);
// }

.item.data-table-select {
  padding: 0 16px;
}

.font {
  font-size: 9px;
  color: #4f5e62;
}

.font_bg_color {
  background-color: #f0f2f3;
  font-size: 9px;
  color: #4f5e62;
}

.font_bg_color2 {
  box-shadow: inset 0px 15px 10px -15px rgba(0, 0, 0, 0.49);
  background-color: #f0f2f3;
  color: #4f5e62;

  font-size: 9px;
}

.expan_header.v-expansion-panel-header {
  align-items: center;
  border-radius: 0px;
  display: flex;
  font-size: 0.9375rem;
  line-height: 1.2;
  min-height: 0px;
  outline: none;
  padding: 16px 24px;
  position: relative;
  transition: 0.3s min-height cubic-bezier(0.25, 0.8, 0.5, 1);
  width: 100%;
  background-color: #f0f2f3;
}

.v-expansion-panel--active > .expan_header.v-expansion-panel-header {
  min-height: 0px !important;
}

.small-radio i {
  font-size: 12px;
  padding: 0px;
  margin-top: -5px;
}
.small-radio label {
  font-size: 9px;
  padding-left: 0px;
  margin-left: -4px;
  margin-top: -5px;
}
.small-radio .v-radio {
  padding-right: 50px;
}

.small-radio.v-input--selection-controls.v-input--dense
  .v-input--selection-controls__ripple {
  width: 0px;
  height: 0px;
  padding: 0px;
  margin: 0px;
}

.small-radio.v-input--radio-group--column
  .v-radio:not(:last-child):not(:only-child) {
  margin-bottom: 0px;
  padding: 0px;
}
.small-radio .v-messages {
  /* flex: 1 1 auto; */
  font-size: 12px;
  min-height: 0px;
  min-width: 1px;
  position: relative;
}

.usage_cir .v-progress-circular__underlay {
  stroke: #fff;
}

.serv_icon.mdi:before,
.mdi-set {
  display: inline-block;
  font: normal normal normal 24px/1 'Material Design Icons';
  font-size: inherit;
  text-rendering: auto;
  line-height: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

<style>
.edit_pagination.custom-pagination {
  /* display: grid;
  padding: 0 0 0 4px;
  grid-template-columns: 60px 60px 40px 40px 40px 40px 40px 60px 69px; */
  display: flex;
  justify-content: end !important;
  margin-right: 8.5px;
  margin-bottom: 5px;
}
.edit_pagination.custom-pagination span {
  user-select: none;
  pointer-events: none;
}
.edit_pagination.custom-pagination > button {
  color: #4f5e62;
  outline: 1px rgba(0, 0, 0, 0.12) solid;
  font-size: 12px;
  margin: 0px 5px;
  margin-top: 5.8px;
  text-align: center;
  padding: 0px 16px;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s;
  line-height: 2px;
  /* width: 35px; */
  height: 34.4px;
}
.edit_pagination.custom-pagination > button:hover {
  background-color: #dadada;
}
.edit_pagination.custom-pagination > button:active {
  background-color: #aaaaaa;
}
.edit_pagination.custom-pagination > button.custom-pagination-btn-disable {
  cursor: no-drop;
  background-color: unset !important;
  pointer-events: none;
  opacity: 0.5;
}
.edit_pagination.ustom-pagination-btn-foucs {
  background-color: #f0f2f3;
  color: #4f5e62;
  outline: 1px #4f5e62 solid !important;
  pointer-events: none;
}
.edit_pagination.custom-pagination > .custom-pagination-btn-number {
  padding: 8px 0px !important;
  width: 34.4px;
  height: 34.4px;
}
</style>

<style lang="scss">
.v-data-table > .v-data-table__wrapper > table > tbody > tr > td,
.v-data-table > .v-data-table__wrapper > table > thead > tr > td,
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > td {
  font-size: 12px !important;
  // margin-right: 10px !important;
  padding: 0px !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > th,
.v-data-table > .v-data-table__wrapper > table > thead > tr > th,
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > th {
  font-size: 12px !important;
  // margin-right: 10px !important;
  padding: 0px !important;
}
</style>

<style scoped>
/* .timeline {
  position: relative;
  display: block;
  background-color: #f00;
  height: 4px;
  margin: 200px 50px;
}

.timeline::before, .timeline::after {
  content: "";
  position: absolute;
  top: -8px;
  display: block;
  width: 0;
  height: 0;
  border-radius: 10px;
  border: 10px solid #f00;
}

.timeline::before {
  left: -20px;
}

.timeline::after {
  right: -10px;
  border: 10px solid transparent;
  border-radius: 30px;
  border-right: 0;
  border-left: 20px solid #f00;
}

.timeline li {
  position: relative;
  display: block;
  float: left;
  width: 120px;
  transform: rotate(-45deg);
  top: -65px;
 }

.timeline li::before {
  content: "";
  position: absolute;
  top: 3px;
  left: -30px;
  border: 3px solid #f00;
  border-radius: 15px;
  width: 10px;
  height: 10px;
  background: #F0F0F0;
}

.timeline li span {
  display: none;
  position: absolute;
  top: 40px;
  left: -100px;
  width: 150px;
}

.timeline li:hover::before {
  border: 4px solid #0f0;
}

.timeline li:hover span {
  display: block;
  transform: rotate(45deg);
} */
</style>
