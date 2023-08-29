<template>
  <div class="fluid mt-3">
    <v-img class="bgimg" src="bgimg.png" height="93.2vh" />

    <v-row>
      <!-- 左測選項----------------------------------------------------------------------------------------------- -->
      <v-col cols="12" md="12">
        <!-- <v-col cols="12" md="7" style="border: 1px solid red"> -->
        <v-card class="mt-3 mx-6" rounded="md" elevation="6" height="51.55em">
          <v-tabs vertical slider-size="3" color="#37484C" background-color="#f1f1f1" height="51.55em" v-model="tab">
            <v-tab href="#tab-1" style="font-size: 15px; justify-content: left">
              <img class="" alt="" src="/data_scraping/data.png" width="14em" />
              <p>&nbsp;&nbsp;</p>
              使用者管理
            </v-tab>

            <v-tab href="#tab-2" style="font-size: 15px; justify-content: left">
              <img class="" alt="" src="/data_scraping/data.png" width="14em" />
              <p>&nbsp;&nbsp;</p>
              活動紀錄
            </v-tab>

            <v-tab-item value="tab-1">
              <no-ssr>
                <!-- <v-card> -->

                <!-- <p>admin 已使用 {{ n }} 個，尚有{{ n }}可用</p>
                  <p>user 已使用 {{ n }} 個，尚有{{ n }}可用</p>
                  <p>viewer 已使用 {{ n }} 個，尚有{{ n }}可用</p>
                  <a href="https://www.w3schools.com">擴增權限數量</a> -->
                <v-data-iterator hide-default-footer :headers="headers" :items="items1" mobile-breakpoint="800"
                  class="elevation-0 mx-6" :loading="loading ? '#828c8f' : null" loading-text="資料加載中... 請稍後"
                  style="color: #828c8f">
                  <template v-slot:default="props">
                    <v-row>
                      <v-col cols="8">
                        <v-card-title class="px-0" style="color: #80898C">
                          <h5>使用者開通狀態</h5>
                        </v-card-title>

                        <v-row class="my-0">
                          <v-col v-for="item in props.items" :key="item" cols="12" lg="4" style="">
                            <v-card>
                              <!-- {{ item.opened }}
                              {{ item.used }}
                              {{ item.left }} -->
                              <v-row class="py-4 px-6">
                                <v-col cols="5">
                                  <div style="color: #80898C">
                                    <h4>{{ item.name }}</h4>
                                  </div>
                                  <div style="color: #80898C;font-size: 14px;">
                                    <div>
                                      開通數量:{{ item.data.opened }}
                                    </div>
                                    <div>
                                      啟用:{{ item.data.on }}
                                    </div>
                                    <div>
                                      停用:{{ item.data.off }}
                                    </div>
                                    <div>
                                      尚有:{{ item.data.nohave }}
                                    </div>
                                  </div>
                                </v-col>
                                <v-col cols="7" class="pa-0">
                                  <!-- <DonutChart :data1="{
                                    opened: 1,
                                    on: 1,
                                    off: 0,
                                    nohave: 0
                                  }" /> -->
                                  <DonutChart :data1="item.data" />

                                </v-col>
                              </v-row>
                            </v-card>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="4">
                        <v-card-title class="px-0" style="color: #80898C">
                          <h5>使用者權限功能</h5>
                        </v-card-title>
                        <v-card class="my-0">
                          <v-row class="my-0 px-4">
                            <v-col v-for="item in props.items" :key="'tes' + item" cols="4">
                              <div style="color: #80898C">
                                <h4>{{ item.name }}</h4>
                              </div>
                              <div style="color: #80898C">
                                <div class="d-flex py-2">
                                  <div class="mr-6">功能一</div>
                                  <div>
                                    <div class="switch-field py-0 my-0 px-1">
                                      <input id="radio-one-email-notice" type="radio" name="switch-one" value="yes"
                                        :checked="checkbox ? true : false" @click="checkbox ? false : true" />
                                      <label for="radio-one-email-notice">ON</label>
                                      <input id="radio-two-email-notice" type="radio" name="switch-one" value="no"
                                        :checked="checkbox ? false : true" @click="checkbox ? false : true" />
                                      <label for="radio-two-email-notice">OFF</label>
                                    </div>
                                  </div>
                                </div>
                                <div class="d-flex py-2">
                                  <div class="mr-6">功能二</div>
                                  <div>
                                    <div class="switch-field py-0 my-0 px-1">
                                      <input id="radio-one-email-notice" type="radio" name="switch-one" value="yes"
                                        :checked="checkbox ? true : false" @click="checkbox ? false : true" />
                                      <label for="radio-one-email-notice">ON</label>
                                      <input id="radio-two-email-notice" type="radio" name="switch-one" value="no"
                                        :checked="checkbox ? false : true" @click="checkbox ? false : true" />
                                      <label for="radio-two-email-notice">OFF</label>
                                    </div>
                                  </div>
                                </div>
                                <div class="d-flex py-2">
                                  <div class="mr-6">功能三</div>
                                  <div>
                                    <div class="switch-field py-0 my-0 px-1">
                                      <input id="radio-one-email-notice" type="radio" name="switch-one" value="yes"
                                        :checked="checkbox ? true : false" @click="checkbox ? false : true" />
                                      <label for="radio-one-email-notice">ON</label>
                                      <input id="radio-two-email-notice" type="radio" name="switch-one" value="no"
                                        :checked="checkbox ? false : true" @click="checkbox ? false : true" />
                                      <label for="radio-two-email-notice">OFF</label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </v-col>
                          </v-row>
                        </v-card>
                      </v-col>
                    </v-row>
                  </template>
                </v-data-iterator>
                <div class="px-6">
                  <v-card-title style="color: #80898C">
                    <h5>使用者管理</h5>
                  </v-card-title>
                  <!-- this dialog is used for both create and update -->
                  <!-- <v-divider></v-divider> -->
                  <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" label="搜尋 使用者身分、使用者名稱、系統ID" outlined
                    hide-details dense color="#828c8f" style="
                            color: #828c8f;
                            height: 30px;
                            width: 300px;
                          "></v-text-field>
                  <v-dialog v-model="dialog" max-width="700px">
                    <!-- <template v-slot:activator="{ on }"> -->
                    <div class="d-flex">
                      <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" label="搜尋 使用者身分、使用者名稱、系統ID" outlined
                        hide-details dense color="#828c8f" style="
                            color: #828c8f;
                            height: 30px;
                            width: 100px;
                          "></v-text-field>
                      <v-spacer />
                      <!-- <v-btn color="#828c8f" dark v-on="on" outlined style="margin-right: 24px">
                        <v-icon small>mdi-plus-circle-outline</v-icon>
                        <h5>新增</h5>
                      </v-btn> -->
                    </div>
                    <!-- </template> -->
                    <v-card>
                      <v-card-title>
                        <span v-if="editedItem.id">編輯 {{ editedItem.Name }}</span>
                        <span v-else>新增</span>
                      </v-card-title>
                      <v-card-text>
                        <v-row>
                          <v-col cols="12" sm="6">
                            <v-text-field v-model="editedItem.Name" label="名稱"></v-text-field>
                          </v-col>

                          <!-- <v-col cols="12" sm="4">
                          <v-text-field
                            v-model="editedItem.email"
                            label="信箱"
                            :rules="emailRules"
                            required
                          ></v-text-field>
                        </v-col> -->
                          <v-col cols="12" sm="6">
                            <v-text-field v-model="editedItem.Password" :type="show ? 'text' : 'password'"
                              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" @click:append="show = !show" label="密碼"
                              required></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-autocomplete v-model="editedItem.Permission" label="權限" :items="itemsSelect"
                              dense></v-autocomplete>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-autocomplete v-model="editedItem.Status" label="狀態" :items="status" dense></v-autocomplete>
                          </v-col>
                        </v-row>
                      </v-card-text>
                      <v-spacer></v-spacer>
                      <v-btn color="" text @click="showEditDialog()">取消</v-btn>
                      <v-btn color="" text>儲存</v-btn>
                    </v-card>
                  </v-dialog>
                  <!-- 表格 -->
                  <div class="d-flex justify-space-between">
                    <div class="d-flex">
                      <v-btn icon small style="margin-top: 20px">
                        <v-icon>mdi-reload</v-icon>
                      </v-btn>
                      <v-btn icon small style="margin-top: 20px">
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                      <v-btn icon small style="margin-top: 20px">
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                    </div>
                    <div class="mr-6">
                      <Pagination :totle="pageCount" width="1000px" @toggle="setPage" pagClass="asdas"
                        class="edit_pagination-end" />
                    </div>
                  </div>
                  <v-data-table :search="search" :headers="headers" :items="items" mobile-breakpoint="800"
                    class="elevation-0" :loading="loading ? '#828c8f' : null" loading-text="資料加載中... 請稍後"
                    style="color: #828c8f" hide-default-footer :page.sync="page" @page-count="pageCount = $event"
                    :items-per-page="itemsPerPage">
                    <!-- 刷新 -->

                    <!-- 分頁 -->
                    <template>
                      <div class="d-flex">
                        <v-btn icon small @click="buttonCallback" style="margin-top: 20px">
                          <v-icon style="margin-left: 1.5px">mdi-reload</v-icon>
                        </v-btn>
                        <v-btn icon small @click="buttonCallback" style="margin-top: 20px">
                          <v-icon style="margin-left: 1.5px">mdi-delete</v-icon>
                        </v-btn>
                        <v-btn icon small @click="buttonCallback" style="margin-top: 20px">
                          <v-icon style="margin-left: 1.5px">mdi-reload</v-icon>
                        </v-btn>
                      </div>
                      <v-divider></v-divider>
                    </template>
                    <template v-slot:[`item.idx`]="idxs">
                      <tr>
                        <td v-for="headerData in headers.filter(
                          (val, index, arr) => {
                            return index === 0
                          }
                        )" :key="headerData.value">
                          {{ idxs.index + 1 }}
                        </td>
                      </tr>
                    </template>

                    <template v-slot:[`item.Status`]="sts">
                      <v-chip v-if="sts.item.Status === 'enable'" :color="getGreenColor()" dark>
                        {{ sts.item.Status }}
                      </v-chip>
                      <v-chip v-else :color="getRedColor()" dark>
                        {{ sts.item.Status }}
                      </v-chip>
                    </template>

                    <!-- 編輯刪除 -->
                    <template v-slot:[`item.actions`]="{ item }">
                      <div class="text-truncate">
                        <v-icon small class="mr-2" @click="showEditDialog(item)" color="#828c8f">
                          mdi-pencil
                        </v-icon>
                        <v-icon small color="#e89595">
                          mdi-delete
                        </v-icon>
                      </div>
                    </template>

                    <!-- <template v-slot:[`opened`]="{ opened }">
                      <div class="text-truncate" style="width: 180px">
                        {{ opened }}
                      </div>
                    </template> -->
                  </v-data-table>
                  <!-- <v-divider></v-divider> -->

                  <!-- </v-card> -->
                </div>
              </no-ssr>
            </v-tab-item>

            <v-tab-item value="tab-2">
              <no-ssr>
                <TheTab2 />
              </no-ssr>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
// import axios from 'axios'
import TheTab2 from '../components/Permission/TheTab2.vue'
import Pagination from '../components/Pagination/OmitPagination.vue'
import DonutChart from '../components/Permission/DonutChart.vue'

// const apiToken = 'keywVOqtjDGyPhH76'
// const airTableApp = 'appUuhKyRHpI79vK4'
// const airTableName = 'Table%201'

export default {
  components: {
    TheTab2,
    Pagination,
    DonutChart
  },
  data() {
    return {
      n: 0,
      checkbox: false,
      headers: [
        // { text: 'Id', value: 'id' },
        { text: '#', value: 'idx', class: 'my-header-style' },
        { text: '狀態', value: 'Status', class: 'my-header-style' },
        { text: 'ID', value: 'id', class: 'my-header-style' },
        { text: '名稱', value: 'Name', class: 'my-header-style' },
        { text: '權限', value: 'Permission', class: 'my-header-style' },
        // { text: '信箱', value: 'email', class: 'my-header-style' },
        {
          text: '密碼',
          value: 'Password',
          class: 'my-header-style pwd-hide',
          sortable: false,
          type: 'password',
        },
        { text: '建立時間', value: 'createdTime', class: 'my-header-style' },
        {
          text: '最後編輯時間',
          value: 'Lastmodified',
          class: 'my-header-style',
        }
        // ,
        // {
        //   text: 'Action',
        //   value: 'actions',
        //   sortable: false,
        //   class: 'my-header-style',
        // },
      ],
      // 權限數量管理
      items1: [
        {
          name: 'ADMIN',
          opened: 1,
          used: 1,
          left: 0,
          data: {
            opened: 1,
            on: 1,
            off: 0,
            nohave: 0
          }
        },
        {
          name: 'USER',
          opened: 1,
          used: 0,
          left: 0,
          data: {
            opened: 1,
            on: 1,
            off: 0,
            nohave: 0
          }
        },
        {
          name: 'VIEWER',
          opened: 1,
          used: 0,
          left: 0,
          data: {
            opened: 1,
            on: 1,
            off: 0,
            nohave: 0
          }
        },
      ],
      // 搜尋
      search: '',
      // 分頁
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
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
      status: ['enable', 'disable'],
      itemsSelect: ['user', 'viewer', 'admin'],
      dialog: false,
      editedItem: {},
      tab: 'tab-1',
      buttonCallback: null
    }
  },
  mounted() {
    // this.loadItems()
    this.items = [
      {
        idx: 1,
        Status: '已開通',
        id: 'admin',
        Name: 'admin',
        Permission: 'admin',
        Password: '****',
        createdTime: '2023-01-01 00:00:00',
        Lastmodified: '2023-01-01 00:00:00',
        actions: '-'
      },
      {
        idx: 2,
        Status: '已開通',
        id: 'user',
        Name: 'user',
        Permission: 'user',
        Password: '****',
        createdTime: '2023-01-01 00:00:00',
        Lastmodified: '2023-01-01 00:00:00',
        actions: '-'
      },
      {
        idx: 3,
        Status: '已開通',
        id: 'viewer',
        Name: 'viewer',
        Permission: 'viewer',
        Password: '****',
        createdTime: '2023-01-01 00:00:00',
        Lastmodified: '2023-01-01 00:00:00',
        actions: '-'
      }
    ]
    this.loading = false
  },
  methods: {
    // 分業
    setPage(data) {
      this.page = data
    },
    // 允許使用之變色
    getGreenColor() {
      return '#69c585'
    },
    getRedColor() {
      return '#9AA2A4'
      // return '#e89595'
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
.edit_pagination-end {
  justify-content: end !important;
}

.switch-field {
  display: flex;
  margin-bottom: 36px;
  overflow: hidden;
}

.switch-field input {
  position: absolute !important;
  clip: rect(0, 0, 0, 0);
  height: 1px;
  width: 1px;
  border: 0;
  overflow: hidden;
}

.switch-field label {
  /* 	background-color: #e4e4e4; */
  font-size: 9px;
  line-height: 1;
  text-align: center;
  padding: 4px 8px;
  margin-right: -1px;
  border: 1px solid rgba(0, 0, 0, 0.102);
  /* 	box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3), 0 1px rgba(255, 255, 255, 0.1); */
  transition: all 0.3s ease-in-out;
  color: rgba(0, 0, 0, 0.102);
  font-size: 9px;
}

.switch-field label:hover {
  cursor: pointer;
}

.switch-field input:checked+label {
  background-color: white;
  box-shadow: none;
  color: #4f5e62;
  border: 1px solid #4f5e62;
}

.switch-field label:first-of-type {
  border-radius: 4px 0 0 4px;
}

.switch-field label:last-of-type {
  border-radius: 0 4px 4px 0;
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
<style lang="scss"></style>
