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
                  <v-select
                    class="classification input mr-2"
                    dense
                    outlined
                    ref=""
                    :items="repeat_transmission"
                    placeholder="棟"
                    hide-details
                    :menu-props="{ bottom: true, offsetY: true }"
                  ></v-select>
                  <v-select
                    class="classification input mr-2"
                    dense
                    outlined
                    ref=""
                    :items="repeat_transmission"
                    placeholder="區"
                    hide-details
                    :menu-props="{ bottom: true, offsetY: true }"
                  ></v-select>

                  <date-picker
                    v-model="value1"
                    type="datetime"
                    range
                    placeholder="Select datetime range"
                    style="width: 350px"
                  ></date-picker>
                </div>
                <v-spacer />
              </div>
            </v-col>
          </v-row>
        </v-card-title>

        <!-- this dialog is used for both create and update -->
        <!-- 表格 -->
        <v-row>
          <v-col cols="6">
            <v-card outlined class="ml-4">
              <v-card-text>
            <v-data-table
              max-width="px"
              :search="search"
              :headers="headers"
              :items="itemsWithIndex"
              mobile-breakpoint="800"
              :loading="loading ? '#4f5e62' : null"
              loading-text="資料加載中... 請稍後"
              style="color: #4f5e62"
              hide-default-footer
              v-model="selected"
              show-select
              :page.sync="page"
              @page-count="pageCount = $event"
              :items-per-page="itemsPerPage"
              fixed-header
              class="mx-4"
              color="#4f5e62"
              checkbox-color="#4f5e62"
            >
              <!-- 複選框 -->
              <template
                v-slot:[`item.data-table-select`]="{ isSelected, select }"
              >
                <v-simple-checkbox
                  :value="isSelected"
                  @input="select($event)"
                  color="#4f5e62"
                  class="pl-4"
                ></v-simple-checkbox>
              </template>

              <!-- 書籤 -->
              <template v-slot:[`item.book_mark`]>
                <v-btn icon> <v-icon>mdi-pin-outline</v-icon></v-btn>
              </template>

              <!-- 詳細資訊 -->


        
              <template v-slot:[`item.actions`]="{ item }">
                <v-menu v-model="dialog" >
                  <template v-slot:activator="{ on, attrs }"
                  
                   >
                    <v-icon
                      v-bind="attrs"
                      v-on="on"
                      @click="showEditDialog(item)"
                      color="#4f5e62"
                    >
                      mdi-information-outline
                    </v-icon>
                  </template>
                  <v-card>
                    <v-card-text> 
                      
                       </v-card-text>
                  </v-card>
                </v-menu>
              </template>
            </v-data-table>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="6">
            <ErrorHeat />
          </v-col>
        </v-row>
      </v-card>
      <!-- 消息通知(通知儲存成功or失敗) -->
    </v-col>
  </v-row>
</template>
<script>
import axios from 'axios'
import ErrorHeat from './CHARTs/ErrorHeat'

const apiToken = 'keywVOqtjDGyPhH76'
const airTableApp = 'app6yRQvvjTLLmjhB'
const airTableName = 'Table%201'

export default {
  components: {
    ErrorHeat,
  },

  data() {
    return {
      // date-picker
      value1: [new Date(), new Date()],
      valid: true,

      expanded: [],
      singleExpand: false,
      selected: [],
      n: 0,
      headers: [
        {
          text: '書籤',
          value: 'book_mark',
          align: 'center',
          class: 'my-header-style',
        },
        {
          text: '項次',
          value: 'index',
          align: 'center',
          class: 'my-header-style',
        },

        {
          text: '相機名稱',
          value: 'cam_name',
          align: 'center',
          class: 'my-header-style',
        },
        {
          text: '監測項目',
          value: 'moni_item',
          align: 'center',
          class: 'my-header-style',
        },
        {
          text: '異常次數',
          value: 'error_count',
          align: 'center',
          class: 'my-header-style',
        },

        {
          text: '建立時間',
          value: 'Created',
          align: 'center',
          class: 'my-header-style',
        },

        {
          text: '詳細資訊',
          value: 'actions',
          sortable: false,
          align: 'center',
          class: 'my-header-style',
        },
      ],

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
  computed: {
    itemsWithIndex() {
      return this.items.map((items, index) => ({
        ...items,
        index: index + 1,
      }))
    },

    itemsWithIndexForCamTsble() {
      return this.itemsForCamTable.map((itemsForCamTable, index) => ({
        ...itemsForCamTable,
        index: index + 1,
      }))
    },
  },
  mounted() {
    this.loadItems()
    this.loadItemsCam()
  },
  watch: {
    // 按下確定後之進度條
    dialogForConfirm(val) {
      if (!val) return
      setTimeout(() => (this.dialogForConfirm = false), 4000)

      // setTimeout(() => this.save(), 4000)
      setTimeout(() => this.error(), 4000)
    },

    dialogForConfirmServerDetailInfo(val) {
      if (!val) return
      setTimeout(() => (this.dialogForConfirmServerDetailInfo = false), 4000)

      // setTimeout(() => this.save(), 4000)
      setTimeout(() => this.error(), 4000)
    },
  },
  methods: {
    // 消息顯示
    save() {
      this.snack = true
      this.snackColor = '#8AB284'
      this.snackText = '資料儲存成功!'
      this.snackIcon = 'mdi-check-circle'
    },
    cancel() {
      this.snack = true
      this.snackColor = '#4f5e62'
      this.snackText = '已取消'
      this.snackIcon = 'mdi-close-circle'
    },
    error() {
      this.snack = true
      this.snackColor = '#e89595'
      this.snackText = '資料儲存失敗!'
      this.snackIcon = 'mdi-alert-circle'
    },
    // 表單驗證
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },

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

    // sever's api
    loadItems() {
      this.loading = true
      this.items = []
      axios
        .get(`https://api.airtable.com/v0/${airTableApp}/${airTableName}`, {
          headers: { Authorization: 'Bearer ' + apiToken },
        })
        .then((response) => {
          this.items = response.data.records.map((item) => {
            return {
              id: item.id,
              createdTime: item.createdTime,
              server_created_time: item.created_time,
              server_last_modified: item.server_last_modified,
              ...item.fields,
            }
          })
          this.loading = false
        })
        .catch((error) => {
          console.log(error)
        })
    },

    saveItem(item) {
      // this is used for both creating and updating API records
      // the default method is POST for creating a new item

      let method = 'post'
      let url = `https://api.airtable.com/v0/${airTableApp}/${airTableName}`
      const id = item.id

      // airtable API needs the data to be placed in fields object
      const data = {
        fields: item,
      }

      if (id) {
        // if the item has an id, we're updating an existing item
        method = 'patch'
        url = `https://api.airtable.com/v0/${airTableApp}/${airTableName}/${id}`

        // must remove id from the data for airtable patch to work
        delete data.fields.id
        delete data.fields.createdTime
        delete data.fields.server_created_time
        delete data.fields.server_last_modified
      }

      // save the record
      axios[method](url, data, {
        headers: {
          Authorization: 'Bearer ' + apiToken,
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        if (response.data && response.data.id) {
          console.log(response.data)
          // add new item to state
          this.editedItem.id = response.data.id
          if (!id) {
            // add the new item to items state
            this.items.push(this.editedItem)
          }
          this.editedItem = {}
        }
        this.dialog = !this.dialog
      })
    },
    deleteItem(item) {
      // console.log('deleteItem', item)
      const id = item.id
      const idx = this.items.findIndex((item) => item.id === id)
      if (confirm('確定刪除?')) {
        /* not really deleting in API for demo */
        axios
          .delete(
            `https://api.airtable.com/v0/${airTableApp}/${airTableName}/${id}`,
            {
              headers: {
                Authorization: 'Bearer ' + apiToken,
                'Content-Type': 'application/json',
              },
            }
          )
          .then((response) => {
            this.items.splice(idx, 1)
          })
        this.items.splice(idx, 1)
      }
    },
    // cam's api
    loadItemsCam() {
      this.loading = true
      this.itemsForCamTable = []
      axios
        .get(`https://api.airtable.com/v0/appxyftNJN3Ry2NPa/${airTableName}`, {
          headers: { Authorization: 'Bearer ' + apiToken },
        })
        .then((response) => {
          this.itemsForCamTable = response.data.records.map((item) => {
            return {
              id: item.id,
              createdTime: item.createdTime,
              server_created_time: item.created_time,
              server_last_modified: item.server_last_modified,
              ...item.fields,
            }
          })
          this.loading = false
        })
        .catch((error) => {
          console.log(error)
        })
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
