<template>
  <v-row>
    <v-col cols="12" lg="6" md="6">
      <v-card ref="form" class="my-6 ml-6 card" flat outlined height="48.5em">
        <v-card-title>
          <v-row>
            <v-col cols="12" class="pb-0">
              <h5 style="color: #4f5e62">伺服器主機分類管理</h5>
            </v-col>
            <v-col cols="12" md="12" class="pt-0">
              <div class="d-flex">
                <v-text-field
                  v-model="search"
                  prepend-inner-icon="mdi-magnify"
                  label="搜尋"
                  outlined
                  hide-details
                  dense
                  color="#4f5e62"
                  class="search"
                  style="color: #4f5e62; margin-right: 8px"
                ></v-text-field>

                <!-- <v-spacer></v-spacer> -->
                <v-btn color="#4f5e62" outlined text> 查看更多 </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-card-title>
        <v-divider class="mx-4"></v-divider>
        <v-card-text class="pt-2 px-4">
          <v-row>
            <v-col cols="4" class="py-0"
              ><v-card-title class="font px-0"
                ><h5>主位置</h5></v-card-title
              ></v-col
            >
            <v-col cols="8" class="py-0"
              ><v-card-title class="font px-0"
                ><h5>次位置</h5></v-card-title
              ></v-col
            >
          </v-row>
          <v-divider></v-divider>
          <v-row class="pa-1">
            <v-col cols="3">
              <v-data-table
                class="hardhare_table"
                :headers="headers"
                :items="desserts"
                :search="search"
                fixed-header
                height="490px"
                hide-default-footer
                hide-default-header
                max-width="600"
              >
                <v-divider inset></v-divider>
                <template v-slot:top>
                  <v-btn
                    v-on="on"
                    outlined
                    text
                    color="#4f5e62"
                    class="mt-1"
                    @click="addNew"
                  >
                    <v-icon left>mdi-plus-circle-outline</v-icon>
                    <h5>新增棟</h5>
                  </v-btn>
                </template>
                <template v-slot:[`item.name`]="{ item }">
                  <v-text-field
                    v-model="editedItem.name"
                    :hide-details="true"
                    dense
                    single-line
                    :autofocus="true"
                    v-if="item.id === editedItem.id"
                    class="hardware_text"
                    outlined
                  ></v-text-field>
                  <v-text-field
                    :hide-details="true"
                    dense
                    single-line
                    :autofocus="true"
                    v-else
                    class="hardware_text"
                    disabled
                    outlined
                    v-model="item.name"
                  ></v-text-field>
                </template>
                <template v-slot:[`item.calories`]="{ item }">
                  <v-text-field
                    v-model="editedItem.calories"
                    :hide-details="true"
                    dense
                    single-line
                    v-if="item.id === editedItem.id"
                  ></v-text-field>
                  <span v-else>{{ item.calories }}</span>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                  <div v-if="item.id === editedItem.id" class="pr-3">
                    <v-btn x-small icon plain @click="close">
                      <v-icon small class=""> mdi-window-close </v-icon>
                    </v-btn>
                    <v-btn x-small icon plain @click="save">
                      <v-icon small> mdi-content-save </v-icon>
                    </v-btn>
                  </div>
                  <div v-else class="pr-3">
                    <v-btn x-small icon plain @click="editItem(item)">
                      <v-icon small> mdi-pencil </v-icon>
                    </v-btn>
                    <v-btn x-small icon plain @click="deleteItem(item)">
                      <v-icon small> mdi-delete </v-icon>
                    </v-btn>
                  </div>
                </template>
                <template v-slot:no-data>
                  <v-btn color="primary" @click="initialize">Reset</v-btn>
                </template>
              </v-data-table>
              <!-- --- -->
            </v-col>
            
          </v-row>
        </v-card-text>

        <!-- </v-card> -->
      </v-card>
    </v-col>
    <v-col cols="12" lg="6" md="6">
      <v-card ref="form" class="my-6 mr-6" flat outlined height="48.5em">
        <v-card-title>
          <v-row>
            <v-col cols="12" class="pb-0">
              <h5 style="color: #4f5e62">相機分類管理</h5>
            </v-col>
            <v-col cols="12" md="12" class="pt-0">
              <div class="d-flex">
                <v-text-field
                  v-model="search"
                  prepend-inner-icon="mdi-magnify"
                  label="搜尋"
                  outlined
                  hide-details
                  dense
                  color="#4f5e62"
                  class="search"
                  style="color: #4f5e62; margin-right: 8px"
                ></v-text-field>

                <!-- <v-spacer></v-spacer> -->
                <v-btn color="#4f5e62" outlined text> 查看更多 </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-card-title>
        <v-divider class="mx-4"></v-divider>
        <v-card-text class="pt-2 px-4">
          <v-row class="pa-1">
            <v-col cols="4">主位置</v-col>
            <v-col cols="8"
              >次位置
              <div>
                <!-- <v-btn
                  icon
                  @click="buttonCallback"
                  style="
                    color: #4f5e62;
                    margin-right: 8px;
                    margin-top: 5px;
                    border: 1px solid rgba(0, 0, 0, 0.1);
                  "
                >
                  <v-icon style="padding-left: 1.6px">mdi-reload</v-icon>
                </v-btn>
                <v-btn
                  icon
                  @click="buttonCallback"
                  outlined
                  style="
                    color: #4f5e62;
                    margin-right: 8px;
                    margin-top: 5px;
                    border: 1px solid rgba(0, 0, 0, 0.1);
                  "
                >
                  <v-icon>mdi-lightning-bolt-circle</v-icon>
                </v-btn> -->
              </div>
              <div></div>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row class="pa-1">
            <v-col cols="3">
              <div class="py-2">
                <v-btn
                  v-on="on"
                  outlined
                  text
                  color="#4f5e62"
                  class="mt-1"
                  @click="addNew"
                >
                  <v-icon left>mdi-plus-circle-outline</v-icon>
                  <h5>新增棟</h5>
                </v-btn>
                <!-- <v-btn color="#9ba3a5" outlined>新增主分類</v-btn> -->
              </div>
              <div class="py-1 server-primary">
                <v-text-field
                  class="search mr-4"
                  value="C-A 棟"
                  readonly
                  dense
                  hide-details
                  outlined
                ></v-text-field>
                <v-btn v-on="on" small icon color="rgba(0, 0, 0, 0.1)">
                  <v-icon small>mdi-pencil</v-icon>
                </v-btn>
                <v-btn v-on="on" small icon color="rgba(0, 0, 0, 0.1)">
                  <v-icon small>mdi-delete</v-icon>
                </v-btn>
              </div>
            </v-col>
            <v-col cols="9" class="px-0">
              <div class="py-2 camera-pages d-flex">
                <v-btn v-on="on" outlined text color="#4f5e62" class="mt-1">
                  <v-icon left>mdi-plus-circle-outline</v-icon>
                  <h5>新增區</h5>
                </v-btn>

                <Pagination
                  :totle="pagaTotle"
                  width="500px"
                  @toggle="setPage"
                  pagClass="asdas"
                  class="edit_pagination py-0 my-0"
                  style="padding-bottom: 5px"
                />
                <!-- 
                  1.totle=總分頁數 
                  2.@toggle=回傳目前選擇的分頁 
                  3.width=總寬度 
                  4.pag_class = 如果要覆蓋分頁按鈕style，請自行使用此參數，加上自訂class
                -->
              </div>
              <div class="server-primary-flex">
                <div v-for="j in 30" :key="j" class="py-1 server-primary mr-11">
                  <v-text-field
                    class="search mr-4"
                    :value="'C-A-' + j + '棟'"
                    readonly
                    dense
                    hide-details
                    outlined
                  ></v-text-field>
                  <v-btn v-on="on" small icon color="rgba(0, 0, 0, 0.1)">
                    <v-icon small>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn v-on="on" small icon color="rgba(0, 0, 0, 0.1)">
                    <v-icon small>mdi-delete</v-icon>
                  </v-btn>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card-text>

        <!-- </v-card> -->
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import Pagination from '../Pagination/OmitPagination.vue'
export default {
  components: {
    Pagination,
  },
  data: () => ({
    // 分類
    server: ['A 棟', 'B 棟', 'C 棟', 'D 棟', 'E 棟', 'F 棟'],
    search: null,
    // 分頁
    pagaTotle: 2,

    headers: [
      {
        text: 'Dessert (100g serving)',
        value: 'name',
        sortable: false,
      },
      { text: 'Actions', value: 'actions', sortable: false, width: '100px' },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      id: 0,
      name: '',
      calories: 0,
    },
    defaultItem: {
      id: 0,
      name: 'A',
      calories: 0,
    },
  }),
  created() {
    this.initialize()
  },

  methods: {
    // 分頁控制
    setPage(data) {
      console.log('選取:' + data)
    },
    initialize() {
      this.desserts = [
        {
          id: 1,
          name: 'A',
        },
      ]
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item)
      confirm('Are you sure you want to delete this item?') &&
        this.desserts.splice(index, 1)
    },

    close() {
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    addNew() {
      const addObj = Object.assign({}, this.defaultItem)
      addObj.id = this.desserts.length + 1
      this.desserts.unshift(addObj)
      this.editItem(addObj)
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      }
      this.close()
    },
  },
}
</script>
<style scoped>
/* 伺服器管理 */
.server-primary {
  display: grid;
  grid-template-columns: 95px 32px 32px;
  align-items: center;
}

.server-primary-btn {
  cursor: pointer;
}
.server-primary img {
  width: 100%;
  padding: 2px;
}
.server-add-btn {
  padding: 8px 10px;
  color: #4f5e62;
  outline: 1px #9ba3a5 solid;
  border-radius: 3px;
  display: flex;
  transition: background-color 0.3s;
  justify-content: center;
}
.server-add-btn > img {
  width: 19px;
  margin: 0 8px 0px 0px;
}
.server-add-btn:hover {
  background-color: rgb(216, 216, 216);
}
.server-add-btn:active {
  background-color: rgb(179, 179, 179);
}
.server-primary-flex {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 500px;
  align-content: flex-start;
}
/* 相機管理 */
/* .camera-pages {
  display: flex;
  height: 47px;
} */

/* 左側浮動按鈕 */
.drawer {
  position: fixed;
  width: 3.6em;
  left: -3.599em;
  height: 51.8em;
  transition: all 0.5s;
  border-radius: 0px 10px 10px 0px;
  z-index: 99999;
  /* background-color: #031316; */
  color: rgba(89, 89, 91, 1);
}
.box {
  background-color: #fff;
}
.box:hover .drawer {
  left: 0;
}

/* 影像串流 */
.frame {
  width: 74em;
  margin-left: 0.3em;
  margin-top: 0.7em;
}
.cover {
  position: relative;
  max-width: 100%;
  width: 100%;
  display: inline-block;
  isolation: isolate;
}
#image {
  width: 100%;
  /* width: 70.5em; */
  pointer-events: none;
  /* margin-left: 2.1em; */
  /* margin-top: 2em; */
  isolation: isolate;
}
.arrow {
  height: 23px;
  width: 100px;
  position: absolute;
  margin-left: 1.16em;
  margin-top: 25.5em;
  transform: rotate(270deg);
  border-radius: 0 0 100px 100px;
}
/* 按鈕提示 */
.tips {
  z-index: 100000;
}
/* 區塊標題文字 */
.subtitle {
  font-size: 12px;
  color: #d9dddd;
  text-align: center;
}
.subtitle-right {
  font-size: 12px;
  color: #9ba3a5;
  text-align: left;
  font-family: 'Noto Sans TC', sans-serif;
}
/* h4 {
  line-height: 2em;
  padding-left: 1em;
  color: #031418;
  font-family: 'Noto Sans TC', sans-serif;
  font-weight: bold;
} */
.gg {
  float: left;
  text-align: center;
}
.font-display {
  font-family: 'Noto Sans TC', sans-serif;
}
.chartTitle {
  color: #545454;
}

.date-picker {
  float: right;
}

.card5 {
  display: flex;
  /* 水平置中 */
  justify-content: center;
  /* 垂直置中 */
  align-content: center;
  flex-wrap: wrap;
}
.card5content {
  width: 6em;
  float: left;
  margin: auto;
}
.btn {
  background-color: #f2f4f4;
}
.reset {
  float: right;
  margin-top: 0.5em;
  margin-right: 0.5em;
}
.cardtitle {
  line-height: 2.5em;
  font-weight: 900;
  color: #505f62;
}

.text-color >>> .v-text-field__slot input {
  color: #9ba3a5;
}

.left-btn {
  background-color: #2d2d2d;
  width: 2.25em;
  height: 2.25em;
}

.right-btn {
  background-color: #f2f4f4;
  width: 2.25em;
  height: 2.25em;
}

.donut1 {
  float: left;
}
.donut2 {
  float: right;
}
/* .rectangle {
  z-index: 99999;
} */
.bgimg {
  position: absolute;
}

.scroll {
  /* width: 20px; */
  /* height: 200px; */
  /* overflow: auto; */
  /* float: right; */
  /* margin: 0 10px; */
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

<style lang="scss" scrope>
.search .v-input__slot {
  min-height: 36px !important;
  // width: 15em !important;
  font-size: 13px;
}

.search input {
  color: #4f5e62 !important;
}
.search .v-input__slot .v-icon {
  font-size: 20px;
}

.search .v-input__slot .v-label {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.1);

  // padding: 0px 0px 0px 0px;
}

.theme--light.search.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state)
  > .v-input__control
  > .v-input__slot
  fieldset {
  color: rgba(0, 0, 0, 0.1);
}

.hardware_text .v-input__slot {
  min-height: 36px !important;
  width: 80px !important;
  font-size: 13px;
}

.hardware_text input {
  color: #4f5e62 !important;
}
.hardware_text .v-input__slot .v-icon {
  font-size: 20px;
}

.hardware_text .v-input__slot .v-label {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.1);

  // padding: 0px 0px 0px 0px;
}

.theme--light.hardware_text.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state)
  > .v-input__control
  > .v-input__slot
  fieldset {
  color: rgba(0, 0, 0, 0.1);
}

.hardhare_table tbody {
  tr:hover {
    background-color: transparent !important;
  }
}
</style>
<style>
.server-primary input {
  color: #4f5e62 !important;
}
/* .custom-pagination ul li button {
  box-shadow: none !important;
  outline: 1px rgba(0, 0, 0, 0.12) solid;
}
.custom-pagination .v-pagination__item--active{
  background-color: #f0f2f3 !important;
  color: #4f5e62 !important;
  outline: 1px #4f5e62 solid;
}
.custom-pagination .v-pagination>li:first-child {
  background-color: #1680b4 !important;
  position: absolute;
  pointer-events: none;
  visibility: hidden;
} */
</style>
