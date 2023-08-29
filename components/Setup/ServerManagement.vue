<template>
  <v-row>
    <v-col cols="12" lg="12" md="12">
      <v-card ref="form" class="my-6 mx-6 card" flat outlined height="48.5em">
        <v-card-title>
          <v-row>
            <v-col cols="12" class="pb-0">
              <h5 style="color: #4f5e62">伺服器主機管理</h5>
            </v-col>
            <v-col cols="12" md="12" class="py-0">
              <div class="d-flex">
                <div class="d-flex">
                  <v-select class="classification input mr-2" dense outlined ref="" placeholder="主位置" hide-details
                    :menu-props="{ bottom: true, offsetY: true }"></v-select>
                  <v-select class="classification input mr-2" dense outlined ref="" placeholder="次位置" hide-details
                    :menu-props="{ bottom: true, offsetY: true }"></v-select>
                  <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" label="搜尋" outlined hide-details dense
                    color="#4f5e62" class="search" style="color: #4f5e62; margin-right: 8px"></v-text-field>
                </div>
                <v-spacer />
                <div class="d-flex">
                  <v-text-field placeholder="筆數" :value="itemsPerPage" outlined hide-details type="number" dense min="-1"
                    max="12" class="item_per_page mr-2" @input="itemsPerPage = parseInt($event, 10)"></v-text-field>
                </div>
                <!-- 新增伺服器主機對話框 -->
                <v-dialog v-model="dialogForAddServer" max-width="500px" persistent>
                  <template v-slot:activator="{ on }">
                    <v-btn v-on="on" outlined text color="#4f5e62" disabled>
                      <v-icon left>mdi-plus-circle-outline</v-icon>
                      <h5>新增伺服器主機</h5>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title class="">
                      <h5>伺服器主機資訊</h5>
                    </v-card-title>
                    <v-card-text>
                      <v-row>
                        <v-col cols="12" md="12" class="ma-0 pb-0">
                          <v-card ref="form" class="my-0 ma-0 py-4 pl-3 pr-1" flat outlined>
                            <v-row>
                              <v-col cols="6" class="d-flex pb-0 px-0">
                                <h7 class="mb-1 pb-0 pl-3 font">IP位置</h7>
                                <v-spacer class="font mb-1 pb-0" />

                                <div cols="12" class="d-flex pb-0">
                                  <v-text-field outlined hide-details placeholder="192.168.0.000" dense color="#4f5e62"
                                    style="color: #4f5e62" class="tiny_input pb-0"></v-text-field>
                                  <v-btn x-small icon class="ml-1 pb-0"><v-icon small
                                      style="padding-left: 1px">mdi-reload</v-icon></v-btn>
                                </div>
                              </v-col>

                              <v-col cols="6" class="d-flex pb-0 px-0">
                                <h7 class="mb-1 pb-0 pl-3 font">系統編號</h7>
                                <v-spacer class="font mb-1" />

                                <div cols="12" class="d-flex pb-0">
                                  <v-text-field outlined hide-details v-model="server_main_position"
                                    placeholder="server-00" dense color="#4f5e62"
                                    style="color: #4f5e62; margin-right: 25px" class="tiny_input" disabled
                                    background-color="rgba(0, 0, 0,0.05)"></v-text-field>
                                </div>
                              </v-col>

                              <v-col cols="6" class="d-flex py-0 px-0">
                                <h7 class="mb-1 pb-0 pl-3 font">名稱</h7>
                                <v-spacer class="font mb-1" />
                                <div cols="12" class="d-flex pb-0">
                                  <v-text-field outlined hide-details placeholder="svr-s1-14" dense color="#4f5e62"
                                    style="color: #4f5e62; margin-right: 24px" class="tiny_input"></v-text-field>
                                </div>
                              </v-col>

                              <v-col cols="6" class="d-flex py-0 px-0">
                                <h7 class="mb-1 pb-0 pl-3 font">型號</h7>
                                <v-spacer class="font mb-1" />
                                <div cols="12" class="d-flex pb-0">
                                  <v-select class="tiny_input_select" dense outlined ref="" hide-details :menu-props="{
                                    bottom: true,
                                    offsetY: true,
                                  }" style="margin-right: 25px"></v-select>
                                </div>
                              </v-col>
                              <v-col cols="6" class="d-flex pt-0 px-0 pb-2">
                                <h7 class="mb-1 pb-0 pl-3 font">位置</h7>
                                <!-- <v-spacer class="font mb-1" /> -->
                                <div class="d-flex">
                                  <v-select class="most_tiny_input_select ml-3" dense outlined ref="" hide-details
                                    :menu-props="{
                                      bottom: true,
                                      offsetY: true,
                                    }"></v-select>
                                  <v-select class="most_tiny_input_select mr-6" dense outlined ref="" hide-details
                                    :menu-props="{
                                      bottom: true,
                                      offsetY: true,
                                    }"></v-select>
                                </div>
                              </v-col>

                              <v-col cols="6" class="d-flex py-0">
                                <h7 class="my-0 py-0 font">連線</h7>
                                <v-spacer class="font my-0" />
                                <v-radio-group v-model="radio" mandatory dense class="small-radio">
                                  <div class="d-flex" style="padding-top: 2px">
                                    <v-radio label="ON" value="radio-1" color="#4f5e62"
                                      class="small-radio pa-0 my-0 pr-2"></v-radio>
                                    <v-radio label="OFF" value="radio-2" color="#4f5e62"
                                      class="small-radio pa-0 my-0 pr-3"></v-radio>
                                  </div>
                                </v-radio-group>
                              </v-col>
                            </v-row>
                          </v-card>
                        </v-col>
                      </v-row>
                    </v-card-text>
                    <v-card-title class="pt-0">
                      <h5>登入位置</h5>
                    </v-card-title>
                    <v-card-text>
                      <v-row>
                        <v-col cols="12" md="12" class="ma-0">
                          <v-card ref="form" class="my-0 ma-0 py-4 pl-3 pr-1" flat outlined>
                            <v-row>
                              <v-col cols="6" class="d-flex pb-0 px-0">
                                <h7 class="mb-1 pl-3 pb-0 font">帳號</h7>
                                <v-spacer class="font mb-1 pb-0" />

                                <div cols="12" class="d-flex pb-0">
                                  <v-text-field outlined hide-details value="admin" dense color="#4f5e62"
                                    style="color: #4f5e62; margin-right: 25px" class="tiny_input pb-0" disabled
                                    background-color="rgba(0, 0, 0,0.05)"></v-text-field>
                                </div>
                              </v-col>

                              <v-col cols="6" class="d-flex pb-0 px-0">
                                <h7 class="mb-1 pl-3 pb-0 font">密碼</h7>
                                <v-spacer class="font mb-1" />

                                <div cols="12" class="d-flex pb-0">
                                  <v-text-field outlined hide-details value="a*****" dense color="#4f5e62"
                                    style="color: #4f5e62; margin-right: 25px" class="tiny_input" disabled
                                    background-color="rgba(0, 0, 0,0.05)"></v-text-field>
                                </div>
                              </v-col>

                              <v-col cols="6" class="d-flex py-0 px-0">
                                <h7 class="mb-1 pl-3 pb-0 font">位址遮罩</h7>
                                <v-spacer class="font mb-1" />

                                <div cols="12" class="d-flex pb-0">
                                  <v-text-field outlined hide-details value="255.255.0.0" dense color="#4f5e62"
                                    style="color: #4f5e62; margin-right: 25px" class="tiny_input" disabled
                                    background-color="rgba(0, 0, 0, 0.05)"></v-text-field>
                                </div>
                              </v-col>

                              <v-col cols="6" class="d-flex py-0 px-0">
                                <h7 class="mb-1 pl-3 pb-0 font">閘道器</h7>
                                <v-spacer class="font mb-1" />
                                <div cols="12" class="d-flex pb-0">
                                  <v-text-field outlined hide-details value="192.168.0.1" dense color="#4f5e62"
                                    style="color: #4f5e62; margin-right: 25px" class="tiny_input" disabled
                                    background-color="rgba(0, 0, 0, 0.05)"></v-text-field>
                                </div>
                              </v-col>

                              <v-col cols="6" class="d-flex py-0 px-0">
                                <h7 class="mb-1 pl-3 pb-2 font">MAC位置</h7>
                                <v-spacer class="font mb-1" />
                                <div cols="12" class="d-flex pb-0">
                                  <v-text-field outlined hide-details value="00:40:7F:04:F7:23" dense color=""
                                    style="color: green; margin-right: 25px" class="tiny_input" disabled
                                    background-color="rgba(0, 0, 0, 0.05)"></v-text-field>
                                </div>
                              </v-col>
                            </v-row>
                          </v-card>
                        </v-col>
                      </v-row>
                    </v-card-text>
                    <v-card-actions class="pt-0">
                      <v-spacer></v-spacer>
                      <v-dialog large persistent max-width="290" v-model="dialogForTurnBack">
                        <template #activator="{ on, attrs }">
                          <v-btn dark color="#4f5e62" class="mb-4" depressed v-bind="attrs" v-on="on">
                            取消
                          </v-btn>
                        </template>
                        <v-card flat>
                          <v-card-title>
                            <h5>確定取消?</h5>
                          </v-card-title>
                          <v-card-text></v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn small color="#4f5e62" dark depressed @click="dialogForTurnBack = false">取消</v-btn>
                            <v-btn color="#4f5e62" outlined text small @click="
                              dialogForAddServer = false
                                                                                                                          cancel()
                                                                                                                        ">確定</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>

                      <v-btn color="#4f5e62" outlined text class="mr-2 mb-4" :loading="dialogForConfirm" @click="
                        dialogForConfirm = true
                                                                                                  dialogForAddServer = false
                                                                                                ">確定</v-btn>
                      <v-dialog v-model="dialogForConfirm" hide-overlay persistent width="300">
                        <v-card color="primary" dark>
                          <v-card-text>
                            資料儲存中...請稍後
                            <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                          </v-card-text>
                        </v-card>
                      </v-dialog>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <!-- 詳細資訊對話框 -->
                <v-dialog v-model="dialog" max-width="950px" persistent>
                  <v-card>
                    <v-card-title class="">
                      <h5>伺服器主機詳細資訊</h5>
                      <v-spacer />
                      <v-btn outlined small text color="#4f5e62">
                        <v-icon left> mdi-lightning-bolt-circle </v-icon>
                        連線 ON
                      </v-btn>
                    </v-card-title>
                    <v-card-text>
                      <v-row>
                        <v-col cols="12" md="4" class="ma-0">
                          <v-card class="my-0 ma-0 pa-0" flat>
                            <v-row>
                              <v-card class="card ml-3 pr-2 px-0 mb-2 mt-3" flat outlined>
                                <v-col cols="12" class="d-flex pb-0">
                                  <h7 class="mb-1 pb-0 pl-3 font">名稱</h7>
                                  <!-- <v-spacer class="font mb-1" /> -->
                                  <div cols="12" class="d-flex pb-0 pl-15">
                                    <v-text-field outlined hide-details placeholder="svr-s1-14" dense color="#4f5e62"
                                      style="color: #4f5e62; margin-right: 24px" class="tiny_input"></v-text-field>
                                  </div>
                                </v-col>

                                <v-col cols="12" class="d-flex py-0">
                                  <h7 class="mb-3 pb-0 pl-3 font">位置</h7>
                                  <!-- <v-spacer class="font mb-1" /> -->
                                  <div class="d-flex pl-15">
                                    <v-select class="most_tiny_input_select" dense outlined ref="" hide-details
                                      :menu-props="{
                                        bottom: true,
                                        offsetY: true,
                                      }"></v-select>
                                    <v-select class="most_tiny_input_select" dense outlined ref="" hide-details
                                      :menu-props="{
                                        bottom: true,
                                        offsetY: true,
                                      }"></v-select>
                                  </div>
                                </v-col>
                              </v-card>
                              <v-col cols="12" class="d-flex py-0">
                                <h7 class="mb-1 pl-6 pb-0 font_bg_color">系統編號</h7>
                                <v-spacer class="font_bg_color mb-1 mx-0" />

                                <v-icon large class="font_bg_color mb-1 pb-0 serv_icon"
                                  v-if="editedItem.server_status === '1'" :color="getGreenColor()"
                                  style="padding-top: 3px; padding-right: 0px">mdi-circle-small</v-icon>
                                <v-icon large class="font_bg_color mb-1 pb-0 serv_icon" v-else :color="getRedColor()"
                                  style="padding-top: 3px; padding-right: 0px">mdi-circle-small</v-icon>

                                <h7 class="mb-1 pr-7 pb-0 font_bg_color">{{
                                  editedItem.server_system_number
                                }}
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </h7>
                              </v-col>

                              <v-col cols="12" class="d-flex py-0">
                                <h7 class="mb-1 pl-6 pb-0 font_bg_color">型號</h7>
                                <v-spacer class="font_bg_color mb-1" />
                                <h7 class="mb-1 pr-7 pb-0 font_bg_color">{{
                                  editedItem.server_type
                                }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </h7>
                              </v-col>

                              <v-col cols="12" class="d-flex py-0">
                                <h7 class="mb-1 pl-6 pb-0 font_bg_color">IP位址</h7>
                                <v-spacer class="font_bg_color mb-1" />
                                <h7 class="mb-1 pr-7 pb-0 font_bg_color">{{
                                  editedItem.server_ip
                                }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </h7>
                              </v-col>

                              <v-col cols="12" class="d-flex py-0">
                                <h7 class="mb-1 pl-6 pb-0 font_bg_color">MAC位址</h7>
                                <v-spacer class="font_bg_color mb-1" />
                                <h7 class="mb-1 pr-7 pb-0 font_bg_color">{{
                                  editedItem.server_mac_address
                                }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </h7>
                              </v-col>

                              <!-- ---- -->
                              <v-col cols="12" class="py-0 pl-0">
                                <!-- 伺服器使用量 -->
                                <v-expansion-panels v-model="panel" multiple class="d-flex py-0" flat>
                                  <v-expansion-panel class="pa-0 pl-3 mb-1">
                                    <v-expansion-panel-header class="pa-0 expan_header">
                                      <v-col cols="12" class="d-flex py-0 pt-1">
                                        <h7 class="pl-3 font_bg_color">硬碟使用量</h7>
                                        <v-spacer class="font_bg_color mb-1" />

                                        <h7 class="mb-1 pb-0 font_bg_color" v-if="
                                          editedItem.server_status === '1'
                                        " style="
                                                  color: #ffa726;
                                                  margin-right: 116px;
                                                ">{{
                                                  editedItem.server_usage_percent
                                                }}%</h7>
                                      </v-col>
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content class="font_bg_color2">
                                      <v-row>
                                        <v-col cols="6" class="pt-7 pb-2">
                                          <v-progress-circular class="usage_cir" :rotate="-90" :size="95" :width="10"
                                            :value="
                                              editedItem.server_usage_percent
                                            " color="#FFA726" backgroud>
                                            <h3>
                                              {{
                                                editedItem.server_usage_percent
                                              }}
                                            </h3>
                                          </v-progress-circular>
                                        </v-col>
                                        <v-col cols="6" class="pt-13 pb-2 pl-0 ml-0">
                                          <v-row>
                                            <v-col cols="7" class="d-flex py-0">
                                              <h7 class="my-0 py-0 font_bg_color">剩餘空間</h7>
                                            </v-col>
                                            <v-col cols="5" class="d-flex py-0">
                                              <!-- <v-spacer /> -->
                                              <h7 class="my-0 py-0 font_bg_color">{{
                                                editedItem.server_usage_spare_capacity
                                              }}GB</h7>
                                            </v-col>

                                            <v-col cols="7" class="d-flex py-0">
                                              <h7 class="my-0 py-0 font_bg_color">已使用</h7>
                                            </v-col>
                                            <v-col cols="5" class="d-flex py-0">
                                              <!-- <v-spacer /> -->
                                              <h7 class="my-0 py-0 font_bg_color">{{
                                                editedItem.server_usage_capacity
                                              }}GB</h7>
                                            </v-col>

                                            <v-col cols="7" class="d-flex py-0">
                                              <h7 class="my-0 py-0 font_bg_color">總容量</h7>
                                            </v-col>

                                            <v-col cols="5" class="d-flex py-0">
                                              <!-- <v-spacer /> -->
                                              <h7 class="my-0 py-0 font_bg_color">{{
                                                editedItem.server_usage_total_capacity
                                              }}GB</h7>
                                            </v-col>
                                          </v-row>
                                        </v-col>
                                      </v-row>
                                    </v-expansion-panel-content>
                                  </v-expansion-panel>

                                  <v-expansion-panel class="ma-0 pa-0 pl-3 mb-1">
                                    <v-expansion-panel-header class="pa-0 ma-0 expan_header">
                                      <v-col cols="12" class="d-flex py-0 pt-1">
                                        <h7 class="mb-1 pl-3 pb-0 font_bg_color">狀態</h7>
                                        <v-spacer class="font_bg_color mb-1" />
                                        <h7 class="mb-1 pb-0 font_bg_color" v-if="
                                          editedItem.server_status === '1'
                                        " style="
                                                  color: #69c585;
                                                  margin-right: 116px;
                                                ">良好</h7>

                                        <h7 class="mb-1 pb-0 font_bg_color" v-else style="
                                                  color: #69c585;
                                                  margin-right: 116px;
                                                ">惡劣</h7>
                                      </v-col>
                                    </v-expansion-panel-header>

                                    <v-expansion-panel-content class="font_bg_color2">
                                      <v-row>
                                        <v-col cols="12" class="pt-6 pb-3">
                                          <v-row>
                                            <v-col cols="4" class="d-flex pb-0">
                                              <h7 class="my-0 py-0">傳輸速率</h7>
                                            </v-col>
                                            <v-col cols="6" class="d-flex pb-0">
                                              <!-- <v-spacer /> -->
                                              <h7 class="my-0 py-0 pr-3">{{
                                                editedItem.server_usage_spare_capacity
                                              }}GB</h7>
                                            </v-col>

                                            <v-col cols="4" class="d-flex py-0">
                                              <h7 class="my-0 py-0">已接收</h7>
                                              <!-- <v-spacer /> -->
                                            </v-col>
                                            <v-col cols="6" class="d-flex py-0">
                                              <h7 class="my-0 py-0">{{
                                                editedItem.server_status_received
                                              }}MB</h7>
                                            </v-col>

                                            <v-col cols="4" class="d-flex py-0">
                                              <h7 class="my-0 py-0">已傳輸</h7>
                                              <!-- <v-spacer /> -->
                                            </v-col>
                                            <v-col cols="6" class="d-flex py-0">
                                              <h7 class="my-0 py-0">{{
                                                editedItem.server_status_transferred
                                              }}MB</h7>
                                            </v-col>

                                            <v-col cols="4" class="d-flex py-0">
                                              <h7 class="my-0 py-0">錯誤/中斷</h7>
                                            </v-col>
                                            <v-col cols="6" class="d-flex py-0">
                                              <!-- <v-spacer /> -->
                                              <h7 class="my-0 py-0">{{
                                                editedItem.server_status_error
                                              }}/{{
  editedItem.server_status_error
}}</h7>
                                            </v-col>
                                          </v-row>
                                        </v-col>
                                      </v-row>
                                    </v-expansion-panel-content>
                                  </v-expansion-panel>
                                </v-expansion-panels>
                              </v-col>

                              <v-col cols="12" class="d-flex py-0">
                                <h7 class="mb-1 pl-6 pb-0 font_bg_color">更新時間</h7>
                                <v-spacer class="font_bg_color mb-1" />
                                <h7 class="mb-1 pr-7 pb-0 font_bg_color">{{
                                  editedItem.server_created_time
                                }}</h7>
                              </v-col>

                              <v-col cols="12" class="d-flex py-0 mb-2">
                                <h7 class="mb-1 pl-6 pb-0 font_bg_color">建立時間</h7>
                                <v-spacer class="font_bg_color mb-1" />
                                <h7 class="mb-1 pr-7 pb-0 font_bg_color">{{
                                  editedItem.server_last_modified
                                }}</h7>
                              </v-col>
                            </v-row>
                          </v-card>
                        </v-col>
                        <v-col cols="12" md="8" class="ma-0">
                          <v-card ref="form" class="my-0 mx-0" flat outlined>
                            <!-- 相機表格 -->
                            <div class="d-flex">
                              <div class="d-flex">
                                <v-card-subtitle class="font">掛載相機</v-card-subtitle>
                                <v-select class="tiny_input_select mr-2 pt-4" dense outlined ref="" placeholder="主位置"
                                  hide-details :menu-props="{ bottom: true, offsetY: true }"></v-select>

                                <v-select class="tiny_input_select mr-2 pt-4" dense outlined ref="" placeholder="次位置"
                                  hide-details :menu-props="{ bottom: true, offsetY: true }"></v-select>
                              </div>
                            </div>

                            <v-data-table :headers="headersForDialogCamTable" :items="itemsWithIndexForCamTsble"
                              :loading="loading ? '#4f5e62' : null" loading-text="資料加載中... 請稍後" style="color: #4f5e62"
                              fixed-header class="mx-4 mb-5" color="#4f5e62" dense disable-pagination hide-default-footer
                              height="437px">
                              <!-- 相機狀態 -->
                              <template v-slot:[`item.cam_status`]="ssts">
                                <v-icon v-if="ssts.item.cam_status === '1'" :color="getGreenColor()"
                                  x-small>mdi-circle</v-icon>
                                <v-icon v-else :color="getRedColor()" x-small>mdi-circle</v-icon>
                              </template>

                              <!-- 相機主位置 -->
                              <template v-slot:[`item.cam_main_position`]="{ item }">
                                <td style="text-align: center">
                                  {{ item.cam_main_position }}棟
                                </td>
                              </template>

                              <!-- 相機次位置 -->
                              <template v-slot:[`item.cam_secondary_position`]="{
                                item,
                              }">
                                <td style="text-align: center">
                                  {{ item.cam_secondary_position }}區
                                </td>
                              </template>

                              <!-- 查看更多 -->
                              <template v-slot:[`item.learn_more`]="{ item }">
                                <v-btn x-small @click="item" text color="#828c8f">查看
                                </v-btn>
                              </template>
                            </v-data-table>
                          </v-card>
                        </v-col>
                      </v-row>
                    </v-card-text>
                    <!-- 伺服器主機詳細資訊 取消/確定 -->
                    <v-card-actions class="pt-0">
                      <v-spacer></v-spacer>
                      <v-dialog large persistent max-width="290" v-model="dialogForTurnBack">
                        <template #activator="{ on, attrs }">
                          <v-btn dark color="#4f5e62" class="mb-4" depressed v-bind="attrs" v-on="on">
                            取消
                          </v-btn>
                        </template>
                        <v-card flat>
                          <v-card-title>
                            <h5>確定取消?</h5>
                          </v-card-title>
                          <v-card-text></v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn small color="#4f5e62" dark depressed @click="dialogForTurnBack = false">取消</v-btn>
                            <v-btn color="#4f5e62" outlined text small @click="
                              dialog = false
                                                                                                                          dialogForTurnBack = false
                            cancel()
                                                                                                                        ">確定</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>

                      <v-btn color="#4f5e62" outlined text class="mr-2 mb-4" :loading="dialogForConfirmServerDetailInfo"
                        @click="
                          dialogForConfirmServerDetailInfo = true
                                                                                                        dialog = false
                                                                                                      ">確定</v-btn>
                      <v-dialog v-model="dialogForConfirmServerDetailInfo" hide-overlay persistent width="300">
                        <v-card color="primary" dark>
                          <v-card-text>
                            資料儲存中...請稍後
                            <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                          </v-card-text>
                        </v-card>
                      </v-dialog>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
            </v-col>
            <v-col cols="12" md="12" class="pb-0 pt-1 my-0 pr-0">
              <div class="d-flex">
                <div class="d-flex">
                  <v-btn icon @click="buttonCallback" style="
                            color: #4f5e62;
                            margin-right: 8px;
                            margin-top: 5px;
                            border: 1px solid rgba(0, 0, 0, 0.1);
                          ">
                    <v-icon style="padding-left: 1.6px">mdi-reload</v-icon>
                  </v-btn>
                  <v-btn icon @click="buttonCallback" outlined style="
                            color: #4f5e62;
                            margin-right: 8px;
                            margin-top: 5px;
                            border: 1px solid rgba(0, 0, 0, 0.1);
                          ">
                    <v-icon>mdi-eye</v-icon>
                  </v-btn>
                  <v-btn icon @click="buttonCallback" outlined style="
                            color: #4f5e62;
                            margin-right: 8px;
                            margin-top: 5px;
                            border: 1px solid rgba(0, 0, 0, 0.1);
                          ">
                    <v-icon>mdi-bookmark-outline</v-icon>
                  </v-btn>
                  <v-btn icon @click="buttonCallback" outlined style="
                            color: #4f5e62;
                            margin-right: 8px;
                            margin-top: 5px;
                            border: 1px solid rgba(0, 0, 0, 0.1);
                          ">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                  <v-btn icon @click="buttonCallback" outlined style="
                            color: #4f5e62;
                            margin-right: 8px;
                            margin-top: 5px;
                            border: 1px solid rgba(0, 0, 0, 0.1);
                          ">
                    <v-icon>mdi-lightning-bolt-circle</v-icon>
                  </v-btn>
                </div>
                <v-spacer />
                <div class="d-flex">
                  <!-- <v-pagination
                    v-model="page"
                    :length="pageCount"
                    :total-visible="10"
                    class="custom"
                    style="padding-right: 2px"
                  ></v-pagination> -->
                  <Pagination :totle="pageCount" width="1000px" @toggle="setPage" pagClass="asdas"
                    class="edit_pagination" />
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card-title>
        <v-divider class="mx-4"></v-divider>

        <!-- this dialog is used for both create and update -->
        <!-- 表格 -->

        <v-data-table :search="search" :headers="headers" :items="itemsWithIndex" mobile-breakpoint="800"
          :loading="loading ? '#4f5e62' : null" loading-text="資料加載中... 請稍後" style="color: #4f5e62" hide-default-footer
          v-model="selected" show-select :page.sync="page" @page-count="pageCount = $event" :items-per-page="itemsPerPage"
          fixed-header class="mx-4" color="#4f5e62" checkbox-color="#4f5e62">
          <!-- 複選框 -->
          <template v-slot:[`item.data-table-select`]="{ isSelected, select }">
            <v-simple-checkbox :value="isSelected" @input="select($event)" color="#4f5e62"
              class=""></v-simple-checkbox>
          </template>

          <!-- 書籤 -->
          <template v-slot:[`item.book_mark`]="{ item }">
            <v-btn icon v-if="item.book_mark === '0'">
              <v-icon>mdi-bookmark-outline</v-icon></v-btn>
          </template>
          <!-- 伺服器狀態 -->
          <template v-slot:[`item.server_status`]="ssts">
            <v-icon v-if="ssts.item.server_status === '1'" :color="getGreenColor()" x-small>mdi-circle</v-icon>
            <v-icon v-else :color="getRedColor()" x-small>mdi-circle</v-icon>
          </template>

          <!-- 伺服器主位置 -->
          <template v-slot:[`item.server_main_position`]="{ item }">
            <td style="text-align: center">
              {{ item.server_main_position }}棟
            </td>
          </template>

          <!-- 伺服器次位置 -->
          <template v-slot:[`item.server_secondary_position`]="{ item }">
            <td style="text-align: center">
              {{ item.server_secondary_position }}區
            </td>
          </template>

          <!-- 伺服器使用量 -->
          <template v-slot:[`item.server_usage_percent`]="{ item }">
            <td style="text-align: center">{{ item.server_usage_percent }}%</td>
          </template>

          <!-- 詳細資訊 -->
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon @click="showEditDialog(item)" color="#4f5e62">
              mdi-information-outline
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
      <!-- 消息通知(通知儲存成功or失敗) -->
      <v-snackbar v-model="snack" :color="snackColor" min-height="20px" class="snack" right>
        <div class="d-flex">
          <v-icon small>{{ snackIcon }}</v-icon>
          <div style="margin-left: 4px; padding-top: 3px">{{ snackText }}</div>
        </div>

        <template #action="{ attrs }">
          <v-btn v-bind="attrs" small icon @click="snack = false">
            <v-icon small dark>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </v-col>
  </v-row>
</template>
<script>
import axios from 'axios'
import Pagination from '../Pagination/OmitPagination.vue'

const apiToken = 'keywVOqtjDGyPhH76'
const airTableApp = 'appcP7dbIjYmTEvhg'
const airTableName = 'Table%201'

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      valid: true,
      server_main_position: null,
      expanded: [],
      singleExpand: false,
      selected: [],
      n: 0,
      headers: [
        {
          text: '項次',
          value: 'index',
          align: 'center',
          class: 'my-header-style',
        },
        {
          text: '書籤',
          value: 'book_mark',
          align: 'center',
          class: 'my-header-style',
        },
        {
          text: '伺服系統編號',
          value: 'server_system_number',
          align: 'center',
          class: 'my-header-style',
        },
        {
          text: '伺服名稱',
          value: 'server_name',
          align: 'center',
          class: 'my-header-style',
        },
        {
          text: '伺服狀態',
          value: 'server_status',
          align: 'center',
          class: 'my-header-style',
        },
        {
          text: '掛載相機數量',
          value: 'cam_quantity',
          align: 'center',
          class: 'my-header-style',
        },
        {
          text: '伺服主位置',
          value: 'server_main_position',
          align: 'center',
          class: 'my-header-style',
        },
        {
          text: '伺服次位置',
          value: 'server_secondary_position',
          align: 'center',
          class: 'my-header-style',
        },
        {
          text: '伺服IP',
          value: 'server_ip',
          align: 'center',
          class: 'my-header-style',
        },
        {
          text: '伺服MAC',
          value: 'server_mac_address',
          align: 'center',
          class: 'my-header-style',
        },
        {
          text: '伺服使用量',
          value: 'server_usage_percent',
          align: 'center',
          class: 'my-header-style',
        },
        {
          text: '更新時間',
          value: 'server_last_modified',
          align: 'center',
          class: 'my-header-style',
        },
        // {
        //   text: '主機建立時間',
        //   value: 'server_created_time',
        //   align: 'center',
        //   class: 'my-header-style',
        // },
        // {
        //   text: '詳細資訊',
        //   value: 'actions',
        //   sortable: false,
        //   align: 'center',
        //   class: 'my-header-style',
        // },
      ],

      headersForDialogCamTable: [
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
          text: '相機狀態',
          value: 'cam_status',
          align: 'center',
          class: 'my-header-style',
        },
        {
          text: '相機主位置',
          value: 'cam_main_position',
          align: 'center',
          class: 'my-header-style',
        },
        {
          text: '相機次位置',
          value: 'cam_secondary_position',
          align: 'center',
          class: 'my-header-style',
        },
        {
          text: '',
          value: 'learn_more',
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
    // this.loadItems()
    // this.loadItemsCam()
    this.initial()
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
    initial(){
      // 呼叫伺服器資訊
      axios({
        method: 'post',
        url: 'http://127.0.0.1:5001/api/monitor/initial',
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify([
          {
            USERID: 'admin',
          },
        ]),
      })
        .then((params) => {
          var data = params.data
          var list = data.main
          this.items = []
          var arr = []
          var index = 1
          Object.keys(list).forEach((key) => {
            Object.keys(list[key].secondary).forEach((key1) => {
              // console.log(data[key].secondary[key1]);
              arr.push({
                index,
                book_mark: '0',
                server_system_number: list[key].server_system_number,
                server_name: list[key].server_name,
                server_status: JSON.stringify(list[key].server_status),
                cam_quantity: list[key].cam_quantity,
                server_main_position: list[key].name_main,
                server_secondary_position: list[key].secondary[key1],
                server_ip: list[key].server_ip,
                server_mac_address: list[key].server_mac_address,
                server_usage_percent: list[key].server_usage_percent,
                server_last_modified: list[key].server_last_modified,
                actions: '-'
              })
              index++
            })
          });
          this.items = arr
          this.loading = false

        })
        .catch((err) => console.log('error from axios', err))
    },
    buttonCallback() {
      console.log('test');
    },
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

.theme--light.tiny_input_select.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state)>.v-input__control>.v-input__slot fieldset {
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

.theme--light.most_tiny_input_select.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state)>.v-input__control>.v-input__slot fieldset {
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

.theme--light.most_tiny_input_select2.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state)>.v-input__control>.v-input__slot fieldset {
  color: rgba(0, 0, 0, 0.1);
}

// -----

.theme--light.tiny_input.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state)>.v-input__control>.v-input__slot fieldset {
  color: rgba(0, 0, 0, 0.1);
}

.theme--light.classification.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state)>.v-input__control>.v-input__slot fieldset {
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

.item_per_page.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state)>.v-input__control>.v-input__slot fieldset {
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

.v-expansion-panel--active>.expan_header.v-expansion-panel-header {
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

.small-radio.v-input--selection-controls.v-input--dense .v-input--selection-controls__ripple {
  width: 0px;
  height: 0px;
  padding: 0px;
  margin: 0px;
}

.small-radio.v-input--radio-group--column .v-radio:not(:last-child):not(:only-child) {
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

.edit_pagination.custom-pagination>button {
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

.edit_pagination.custom-pagination>button:hover {
  background-color: #dadada;
}

.edit_pagination.custom-pagination>button:active {
  background-color: #aaaaaa;
}

.edit_pagination.custom-pagination>button.custom-pagination-btn-disable {
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

.edit_pagination.custom-pagination>.custom-pagination-btn-number {
  padding: 8px 0px !important;
  width: 34.4px;
  height: 34.4px;
}
</style>
