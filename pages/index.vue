<template>
  <div>
    <div class="consoleMjpg d-none" id="consoleMjpg">
      偵錯模式:(SUPER PRO MODEL)<br />
      影像刷新率(fps):<span id="fps1">{{ fps1 }}</span><br />
      總資料傳輸量/秒:<span id="datatotle">{{ datareques }}</span><br />
      連項狀況:<span id="datas">{{ webStatus }}</span>
    </div>
    <v-img class="bgimg" src="bgimg.png" height="93.2vh" />
    <v-tabs v-model="tab" vertical background-color="#fff0">
      <v-tab v-show="false" href="#tab-1">1</v-tab>
      <v-tab v-show="false" href="#tab-2">2</v-tab>
      <v-tabs-items v-model="tab" class="custom-tab-items">
        <v-tab-item value="tab-1">
          <v-container fluid>
            <div class="cover-bg" style="position: relative">
              <!-- 對話框 -->
              <div :class="c_diago">
                <!-- <div class="draggable-bar"></div> -->
                <div class="diago-head">
                  <div class="diago-point-cover">
                    <div class="diago-point mt-5"></div>
                  </div>
                  <div class="diago-title mt-3">
                    <div>
                      <div>
                        {{ focusCamName }}
                      </div>
                      <div>
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn class="arrow-diago" rounded tile width="20px" v-bind="attrs" v-on="on">
                              <img class="" alt="line" src="/images/tabs.png" width="60%" />
                            </v-btn>
                          </template>
                          <span>加入書籤</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn class="arrow-diago" rounded tile @click="openDialogImage()" v-bind="attrs" v-on="on">
                              <img class="" alt="line" src="/images/photo.png" width="60%" />
                            </v-btn>
                          </template>
                          <span>雙光影像</span>
                        </v-tooltip>
                      </div>
                    </div>
                    <div>IP: localhost</div>
                  </div>
                  <div class="diago-close">
                    <v-btn class="diago-close-icon" rounded outlined
                      @click="(e) => { diagoOff(e); autoOpenWindowStatus = true }">
                      <img class="" alt="line" src="/images/close.png" width="70%" />
                    </v-btn>
                    <!-- <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn class="diago-close-icon" rounded outlined v-bind="attrs" v-on="on"
                          @click="autoOpenWindowStatus ? autoOpenWindowStatus = false : autoOpenWindowStatus = true">
                          <img v-if="autoOpenWindowStatus" class="" alt="line" src="/images/Component 151 – 2-unlocak.png"
                            width="70%" />
                          <img v-else class="" alt="line" src="/images/Component 151 – 2-lock.png" width="70%" />
                        </v-btn>
                      </template>
                      <span>{{ autoOpenWindowStatus ? '鎖定視窗' : '解鎖視窗' }}</span> -->
                    <!-- </v-tooltip> -->
                  </div>
                </div>
                <div class="diago-contnet-cover">
                  <div class="diago-alarm-cover">
                    <!-- 警報設置 -->
                    <div class="diago-border1">
                      <strong class="diago-title">警報設置</strong>
                      <v-data-table dense :headers="diagoalarmHeaders" :items="diagoalarmDesserts" disable-pagination
                        hide-default-header hide-default-footer height="160px" class="diago-cus">
                        <template v-slot:header="{ props }">
                          <thead class="custom-thead">
                            <th v-for="(head, idx) in props.headers" :key="idx" class="diago-table-title">
                              {{ head.text.toUpperCase() }}
                            </th>
                          </thead>
                        </template>
                        <template v-slot:[`item.item`]="{ item }">
                          <v-badge :content="item.item.number" overlap color="#828C8F" class="my-2">
                            <v-btn icon class="right-btn alarm-btn-icon">
                              <!-- <img
                                    class=""
                                    alt=""
                                    src="/right-icons/spot2.png"
                                    width="18px" /> -->
                              <img v-if="item.item.name === 'spot'" class="" alt="alert" src="/right-icons/spot2.png"
                                width="18px" />
                              <img v-if="item.item.name === 'scope'" class="" alt="alert"
                                src="/right-icons/rectangle2.png" width="18px" />
                              <img v-if="item.item.name === 'line'" class="" alt="alert" src="/right-icons/line2.png"
                                width="18px" />
                              <img v-if="item.item.name === 'blob'" class="" alt="alert" src="/right-icons/blob.png"
                                width="18px" />
                            </v-btn>
                          </v-badge>
                        </template>
                        <template v-slot:[`item.setting`]="{ item }">
                          <v-btn color="" icon class="alert-off-cu" :class="item.setting === 2 ? 'right-btn1' : 'right-btn'
                            " @click="opendialog(item.item.number, item.item.name)
    ">
                            <img v-if="item.setting === 0" alt="" src="/right-icons/alert-off.png" width="15px"
                              depressed />
                            <img v-else-if="item.setting === 1" class="" alt="" src="/right-icons/alert-on.png"
                              width="15px" depressed />
                            <img v-else-if="item.setting === 2" class="" alt="" src="/right-icons/alert-fff.png"
                              width="15px" depressed />
                          </v-btn>
                        </template>
                      </v-data-table>
                      <!-- 物件警報(共用) -->
                    </div>
                    <!-- 警報紀錄 -->
                    <div class="diago-border1 ml-2">
                      <strong class="diago-title">警報紀錄</strong>
                      <v-data-table dense :headers="diagoalarmlogHeaders" :items="diagoalarmlogDesserts"
                        disable-pagination hide-default-header hide-default-footer height="160px" class="diago-cus">
                        <template v-slot:header="{ props }">
                          <thead class="custom-thead">
                            <th v-for="(head1, idz) in props.headers" :key="idz" class="diago-table-title">
                              {{ head1.text.toUpperCase() }}
                            </th>
                          </thead>
                        </template>
                        <template v-slot:[`item.item`]="{ item }">
                          <td :class="item.date[2] === 1 ? 'custom-tables-bgc' : ''
                            " class="text-center px-0">
                            <v-badge :content="item.item.number" overlap color="#828C8F" class="my-2">
                              <v-btn icon class="right-btn alarm-btn-icon">
                                <img v-if="item.item.name === 'spot'" class="" alt="alert" src="/right-icons/spot2.png"
                                  width="18px" />
                                <img v-if="item.item.name === 'scope'" class="" alt="alert"
                                  src="/right-icons/rectangle2.png" width="18px" />
                                <img v-if="item.item.name === 'line'" class="" alt="alert" src="/right-icons/line2.png"
                                  width="18px" />
                                <img v-if="item.item.name === 'blob'" class="" alt="alert" src="/right-icons/blob.png"
                                  width="18px" />

                              </v-btn>
                            </v-badge>
                          </td>
                        </template>
                        <template v-slot:[`item.temperature`]="{ item }">
                          <td :class="item.date[2] === 1 ? 'custom-tables-bgc' : ''
                            " class="text-center px-0">
                            {{ item.table_alarm_start.slice(-8) }}
                            <!-- {{ item.temperature }} -->
                          </td>
                        </template>
                        <template v-slot:[`item.status`]="{ item }">
                          <td :class="item.date[2] === 1 ? 'custom-tables-bgc' : ''
                            " class="text-center px-0">
                            {{ item.temperature }}
                          </td>
                        </template>
                        <template v-slot:[`item.date`]="{ item }">
                          <td :class="item.date[2] === 1 ? 'custom-tables-bgc' : ''
                            " class="text-center px-0">
                            {{ item.table_alarm_threshold }}°C
                          </td>
                        </template>
                        <template v-slot:[`item.location`]="{ item }">
                          <td :class="item.date[2] === 1 ? 'custom-tables-bgc' : ''
                            " class="text-center px-0">
                            {{ item.date[1] }}
                            <!-- X:{{ item.location.X }}<br />Y:{{ item.location.Y }} -->
                          </td>
                        </template>
                      </v-data-table>
                    </div>
                  </div>
                  <div class="diago-alarm-cover1">
                    <!-- 警報統計 -->
                    <div class="diago-border2">
                      <strong class="diago-title">警報統計</strong>
                      <!-- 圖表1 本日 -->
                      <div class="donut-flex mt-5">
                        <v-progress-circular class="donut1" :rotate="-90" :size="40" :width="5" :value="valueToday"
                          color="#828c8f" backgroud>
                          <h6>{{ valueToday }}</h6>
                        </v-progress-circular>
                        <div class="ml-3 donut-txt">當日</div>
                      </div>
                      <!-- 圖表1 昨日 -->
                      <div class="donut-flex mt-5">
                        <v-progress-circular class="donut1" :rotate="-90" :size="40" :width="5" :value="valueLastday"
                          color="#828c8f" backgroud>
                          <h6>{{ valueLastday }}</h6>
                        </v-progress-circular>
                        <div class="ml-3 donut-txt">昨日</div>
                      </div>
                      <!-- 圖表1 當周 -->
                      <div class="donut-flex mt-5">
                        <v-progress-circular class="donut1" :rotate="-90" :size="40" :width="5" :value="valueThisWeek"
                          color="#828c8f" backgroud>
                          <h6>{{ valueThisWeek }}</h6>
                        </v-progress-circular>
                        <div class="ml-3 donut-txt">當周</div>
                      </div>
                      <!-- 圖表1 當月 -->
                      <div class="donut-flex mt-5">
                        <v-progress-circular class="donut1" :rotate="-90" :size="40" :width="5" :value="valueThisMonth"
                          color="#828c8f" backgroud>
                          <h6>{{ valueThisMonth }}</h6>
                        </v-progress-circular>
                        <div class="ml-3 donut-txt">當月</div>
                      </div>
                    </div>
                    <!-- 警報歷史 -->
                    <div class="diago-border2 ml-2">
                      <strong class="diago-title">警報歷史</strong>
                      <div class="reset1">
                        <v-icon color="#d8d8d8">mdi-circle-medium</v-icon><span class="subtitle-right">正常</span>
                        <v-icon color="#828c8f">mdi-circle-medium</v-icon><span class="subtitle-right">超溫</span>
                      </div>
                      <v-date-picker v-model="date2" class="date-picker ml-10" :event-color="(date) => (date[9] % 2 ? 'red' : 'yellow')
                        " readonly no-title color="#828c8f" width="267" height="200"
                        style="height: 248px !important;"></v-date-picker>
                    </div>
                  </div>
                  <div class="diago-btn-cover mt-1 mb-3 mr-4 ml-3">
                    <v-btn :color="intobtnalarm ? '#de8788' : '#99A1A3'" class="diago-btn" max-height="24px"
                      max-width="95px" rounded @click="VideoActive('tab-2')">
                      <span class="diago-btn-font">查看更多</span>
                    </v-btn>
                  </div>
                </div>
                <!-- ROI物件設定視窗 -->
                <v-dialog v-model="dialog" persistent max-width="290">
                  <form @submit.prevent="submitForm">
                    <v-card>
                      <!-- <v-divider></v-divider> -->
                      <v-card-text class="pb-2">
                        <div class="d-flex justify-space-between align-center mb-3">
                          <h4 class="cardtitle2">設定警報</h4>
                          <div class="">
                            <div class="switch-field py-0 my-0 px-1">
                              <input id="radio-one-email-notice1" type="radio" name="switch-one" value="yes"
                                :checked="checkbox1 ? true : false" @click="alarmSwitch1(1)" />
                              <label for="radio-one-email-notice1">ON</label>
                              <input id="radio-two-email-notice1" type="radio" name="switch-one" value="no"
                                :checked="checkbox1 ? false : true" @click="alarmSwitch1(0)" />
                              <label for="radio-two-email-notice1">OFF</label>
                            </div>
                            <!-- <v-spacer></v-spacer> -->
                          </div>
                        </div>
                        <div class="alarm-dialog-contert pa-3">
                          <div>條件</div>
                          <div class="alarm-dialog-input">
                            <v-select disabled class="subtitle text-color" v-model="conditionSelect"
                              :items="conditionItems" :rules="[(v) => !!v || 'Item is required']" required full-width
                              outlined dense hide-details height="20"></v-select>
                          </div>
                          <div>閾值</div>
                          <div class="alarm-dialog-input">
                            <v-text-field v-model="threshold" class="subtitle text-color qwcegzsd" name="threshold"
                              color="#828c8f" outlined required full-width dense hide-details></v-text-field>
                          </div>
                          <div>滯後</div>
                          <div class="alarm-dialog-input">
                            <v-text-field disabled v-model="hysteresis" class="subtitle text-color" color="#828c8f"
                              outlined dense full-width hide-details></v-text-field>
                          </div>
                          <div>閾值時間</div>
                          <div class="alarm-dialog-input">
                            <v-text-field disabled v-model="thresholdTime" class="subtitle text-color" label=""
                              color="#828c8f" outlined dense hide-details full-width></v-text-field>
                          </div>
                          <div>捕捉</div>
                          <div class="alarm-dialog-input">
                            <v-select disabled class="subtitle text-color" v-model="captureSelect" :items="captureItems"
                              :rules="[(v) => !!v || 'Item is required']" label="" outlined required dense hide-details
                              full-width></v-select>
                          </div>
                          <div>脈衝時間</div>
                          <div class="alarm-dialog-input">
                            <v-text-field disabled v-model="pulseTime" class="subtitle text-color" label=""
                              color="#828c8f" outlined dense hide-details full-width></v-text-field>
                          </div>
                          <div>發報通知</div>
                          <div>
                            <div class="d-flex">
                              <v-checkbox :ripple="false" class="ma-0" hide-details dense></v-checkbox>電子信件通知
                            </div>
                            <div class="d-flex">
                              <v-checkbox :ripple="false" class="ma-0" hide-details dense></v-checkbox>LINE 通知
                            </div>
                          </div>
                        </div>
                      </v-card-text>

                      <v-card-actions class="justify-center pt-0">
                        <v-btn color="#828C8F" text @click="dialog = false" outlined>
                          取消
                        </v-btn>
                        <v-btn color="#828C8F" type="submit" text outlined>
                          確定
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </form>
                </v-dialog>
                <!-- 預覽視窗(可見光) -->
                <div class="diago-tootip-mask" :class="diagotootipimg ? '' : 'dialog-close'" @click="offDialogImage">
                </div>
                <div class="diago-tootip-img" :class="[
                  diagotootipimg ? '' : 'dialog-close',
                  diagotootipimgzoom ? 'diago-tootip-img-zoom' : '',
                ]" @mouseover="diagotootipimgbtn = true" @mouseout="diagotootipimgbtn = false">
                  <div class="pa-3 pe-1 diago-tootip-img-e">
                    <img id="streamingVIS" src="/images/Group 2453.png" width="100%" height="100%" />
                    <!-- <canvas id="diago-tootip-canvas1" class="pixi-cramre pa-3"></canvas>
                      <PixijsDisplayData :size="'diago-tootip-canvas1'" :canvasId="'diago-tootip-canvas1'" v-if="diagoTootipCanvas"
                                      :roidata="roiDataToKonve" :camId="focusCAMID === null ? $route.query.cam : focusCAMID" /> -->
                  </div>
                  <div class="pa-3 ps-1 diago-tootip-img-e">
                    <img id="streamingIR" src="/images/Group 2454.png" width="100%" height="100%" />
                    <canvas id="diago-tootip-canvas2" class="pixi-cramre pa-3"></canvas>
                    <PixijsDisplayData :size="'diago-tootip-canvas2'" :canvasId="'diago-tootip-canvas2'"
                      v-if="diagoTootipCanvas" :roidata="roiDataToKonve"
                      :camId="focusCAMID === null ? $route.query.cam : focusCAMID" />
                  </div>
                  <div class="diago-tootip-btn" :class="diagotootipimgbtn ? '' : 'diago-tootip-btn-close'" @click="diagotootipimgzoom
                    ? (diagotootipimgzoom = false)
                    : (diagotootipimgzoom = true)
                    ">
                    <img src="/images/enlarge.png" width="100%" />
                  </div>
                </div>
              </div>
              <v-row>
                <!-- 分隔畫面 -->
                <v-col cols="9" class="p-1">
                  <v-card class="camera-bg col-windows-ul align-items-c mt-3" style="">
                    <div class="newload"></div>
                    <div class="reload"></div>
                    <ul id="sortable" :class="sortable">
                      <li v-for="(item01, index01) in cam" :key="index01"
                        v-bind:class="[ui_state, item01.cam_id === '' ? 'ui-none' : `ui-${item01.cam_id}`]"
                        :id="`diagoHover`"
                        @click="(e) => { startGetROI(item01.cam_id, e, alarmCam.includes(item01.cam_id)), focusCamName = item01.name }">
                        <template v-if="item01.overflow">
                          <!-- <div
                              class="ui-state-cover"
                              v-bind:class="[
                                index01 % 2 !== 0 ? 'ui-state-cover-outline' : 'ui-state-normal',
                              ]"
                              > -->
                          <div class="ui-state-cover"
                            v-bind:class="[alarmCam.includes(item01.cam_id) === true ? 'ui-state-cover-outline' : 'ui-state-normal', item01.cam_id === focusCAMID && alarmCam.includes(item01.cam_id) === true ? 'ui-state-default-alarm-outline' : '',
                            item01.cam_id === focusCAMID && alarmCam.includes(item01.cam_id) === false ? 'ui-state-default-normal-outline' : '']">
                            <!-- <img
                                  src="loadingBG.png"
                                  class="test-cramre"
                                  :id="`test-cramre${index01}`"
                                  width="100%"
                                /> -->
                            <div class="ui-skeleton-loaders" :id="`sleleton-loaders-custom${index01}`"></div>
                            <canvas class="test-cramre cam-canvas" :id="`test-cramre${index01}`"></canvas>
                            <!-- <KonvaDisplayData :size="`test-cramre${index01}`" :cam_id="item01.cam_id"
                              :tabVal="konvaGetDataStatus" :roiData="roiDataToKonve" /> -->
                            <canvas :id="`pixi-cramre${index01}`" class="pixi-cramre"></canvas>
                            <PixijsDisplayData :size="`pixi-cramre${index01}`" :canvasId="`pixi-cramre${index01}`"
                              :roidata="roiDataToKonve" :camId="item01.cam_id" />
                            <div class="ui-state-default-footer" style="pointer-events: none;">
                              <div class="ui-state-default-point"></div>
                              <span>{{ item01.name }}</span>
                            </div>
                            <div class="ui-state-default-alarm" v-if="alarmCam.includes(item01.cam_id)"
                              style="pointer-events: none;">
                              <div>
                                <img src="/images/alarm-200.png" />超溫警報<img src="/images/alarm-200.png" />
                              </div>
                            </div>
                          </div>
                          <!-- <div
                                class="ui-state-default-test"
                                :id="'ui-state-default-test' + index01"
                              >
                                偵錯模式:
                              </div> -->
                        </template>
                        <template v-else>
                          <div class="ui-state-cover ui-state-null">
                            <v-img src="/EMPTYv1.png" />
                          </div>
                        </template>
                        <!-- <template v-else-if="index01 === 999">
                          <div class="ui-state-cover ui-empty">
                            <canvas class="test-cramre cam-canvas" :id="`test-cramre${index01}`"></canvas>
                            <div class="ui-state-default-footer">
                              <div class="ui-state-default-point1"></div>
                              <span>Cam-s1-55 A棟CS-01配電盤({{ index01 }})</span>
                            </div>
                          </div>
                        </template>
                        <template v-else-if="index01 === 998">
                          <div class="ui-state-cover ui-empty">
                            <canvas class="test-cramre cam-canvas" :id="`test-cramre${index01}`"></canvas>
                            <div class="ui-state-default-footer">
                              <div class="ui-state-default-point2"></div>
                              <span>Cam-s1-55 A棟CS-01配電盤({{ index01 }})</span>
                            </div>
                          </div>
                        </template>
                        <template v-else>
                          <div class="ui-state-cover ui-empty">
                            <canvas class="test-cramre cam-canvas" :id="`test-cramre${index01}`"></canvas>
                          </div>
                        </template> -->
                      </li>
                    </ul>
                  </v-card>
                </v-col>
                <!-- 右方控制面板 -->
                <v-col cols="3">
                  <v-card class="camera-bg mt-3" style="height: 830px">
                    <div class="menu-top mt-1">
                      <span class="menu-title">主分類</span>
                      <!-- 區域 -->
                      <div class="pl-0 ml-2" style="width: 139px;">
                        <v-select class="custom-select" v-model="e1" :items="areas" dense solo></v-select>
                      </div>
                      <span class="menu-title">次分類</span>
                      <!-- 組別 -->
                      <div class="pl-0 ml-2" style="width: 139px;">
                        <v-select class="custom-select" v-model="e2" :items="groups" dense solo></v-select>
                      </div>
                    </div>
                    <!-- 選單組 -->
                    <div class="custom-g-select">
                      <!-- arrow -->
                      <div style="display: flex">
                        <v-btn class="arrow-custom mr-1" tile @click="controlPage('prev')">
                          <img class="" alt="line" src="/images/Previous.png" width="60%" />
                        </v-btn>
                        <v-btn class="arrow-custom" tile @click="controlPage('next')">
                          <img class="" alt="line" src="/images/next.png" width="60%" />
                        </v-btn>
                      </div>
                      <span class="menu-title">當前分頁</span>
                      <!-- page -->
                      <div class="pl-0">
                        <v-select class="custom-select" v-model="e3" :items="pages" dense solo @change="controlPage(e3)"
                          return-object>
                          <template v-slot:[`selection`]="{ item }">
                            第{{ numberToChinese(item) }}頁
                          </template>
                          <template v-slot:[`item`]="{ item }">
                            第{{ numberToChinese(item) }}頁
                          </template>
                        </v-select>
                      </div>
                      <span class="menu-title">{{ CamPage }}/{{ CamPageTotle }}</span>
                      <div class="menu-top-setting">
                        <!-- <v-checkbox v-model="carousel_checkbox" label="巡檢" class="mr-3 mt-5"></v-checkbox> -->
                        <v-checkbox v-model="autoOpenWindowStatus" label="巡檢" class="mr-3 mt-5"></v-checkbox>
                        <div class="text-center">
                          <v-menu :close-on-content-click="false" offset-y v-model="screenSwitch">
                            <!-- <v-tooltip top> -->
                            <template v-slot:activator="{ on, attrs }">
                              <v-tooltip top>
                                <template v-slot:activator="{ on: tooltip }">
                                  <v-btn class="btu-setting" fab x-small v-bind="attrs" v-on="{ ...tooltip, ...on }">
                                    <img class="" alt="line" src="/images/setting.png" width="70%" />
                                  </v-btn>
                                </template>
                                <span>畫面設定</span>
                              </v-tooltip>
                            </template>
                            <!-- </v-tooltip> -->

                            <v-card class="pa-3">
                              <!-- <div class="setting-screen-cover mb-1">
                                <div class="setting-screen-title">輪播範圍</div>
                                <div class="setting-screen-arrow-left" @click="screenseting(0, 'carouselTime')">
                                  <img class="" alt="" src="/images/mini-arrow.png" />
                                </div>
                                <div class="setting-screen-input">
                                  當前選擇區
                                </div>
                                <div class="setting-screen-arrow-right" @click="screenseting(1, 'carouselTime')">
                                  <img class="" alt="" src="/images/mini-arrow.png" />
                                </div>
                              </div> -->
                              <div class="setting-screen-cover mb-1">
                                <div class="setting-screen-title">巡檢時間</div>
                                <div class="setting-screen-arrow-left" @click="screenseting(0, 'carouselTime')">
                                  <img class="" alt="" src="/images/mini-arrow.png" />
                                </div>
                                <div class="setting-screen-input">
                                  {{ carouselTime }}
                                </div>
                                <div class="setting-screen-arrow-right" @click="screenseting(1, 'carouselTime')">
                                  <img class="" alt="" src="/images/mini-arrow.png" />
                                </div>
                              </div>
                              <div class="setting-screen-cover mb-1">
                                <div class="setting-screen-title">色譜模式</div>
                                <div class="setting-screen-arrow-left" @click="screenseting(0, 'palette')">
                                  <img class="" alt="" src="/images/mini-arrow.png" />
                                </div>
                                <div class="setting-screen-input">
                                  <div class="setting-screen-icon">
                                    <img :src="palette[0]" width="100%" />
                                  </div>
                                  {{ palette[1] }}
                                </div>
                                <div class="setting-screen-arrow-right" @click="screenseting(1, 'palette')">
                                  <img class="" alt="" src="/images/mini-arrow.png" />
                                </div>
                              </div>
                              <!-- <div class="setting-screen-cover mb-1">
                                <div class="setting-screen-title">影像模式</div>
                                <div class="setting-screen-arrow-left" @click="screenseting(0, 'imageMode')">
                                  <img class="" alt="" src="/images/mini-arrow.png" />
                                </div>
                                <div class="setting-screen-input">
                                  <div class="setting-screen-icon">
                                    <img :src="imageMode[0]" width="100%" />
                                  </div>
                                  {{ imageMode[1] }}
                                </div>
                                <div class="setting-screen-arrow-right" @click="screenseting(1, 'imageMode')">
                                  <img class="" alt="" src="/images/mini-arrow.png" />
                                </div>
                              </div> -->
                              <div class="setting-screen-btn">
                                <button @click="screenSwitch = false">返回</button>
                                <button @click="screenSwitch = false">確定</button>
                              </div>
                            </v-card>
                          </v-menu>
                        </div>
                      </div>
                    </div>
                    <!-- 搜尋相機編號 -->
                    <div class="search-cover">
                      <!-- 畫面分格 -->
                      <div class="pl-0 pr-2">
                        <v-select v-model="e4" class="custom-select" :items="splitScreen" dense solo @change="transition">
                          <template v-slot:prepend>
                            <v-fade-transition leave-absolute>
                              <img width="24" height="24" class="transition-img1" src="/images/display.png" alt="" />
                            </v-fade-transition>
                          </template>
                        </v-select>
                      </div>
                      <div class="search-input">
                        <v-text-field rounded class="pa-0 ma-0" label="搜尋 相機編號/監測項目">
                          <template v-slot:prepend>
                            <v-fade-transition leave-absolute>
                              <img width="24" height="24" class="transition-img" src="/images/search.png" alt="" />
                            </v-fade-transition>
                          </template>
                        </v-text-field>
                      </div>
                      <div class="search-explore">
                        <v-tooltip top>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn class="btu-setting" fab x-small v-bind="attrs" v-on="on">
                              <img class="" alt="line" src="/images/explore.png" width="70%" />
                            </v-btn>
                          </template>
                          <span>探索</span>
                        </v-tooltip>
                      </div>
                    </div>
                    <!-- 標籤 -->
                    <div>
                      <v-card class="custom-cards-tags">
                        <v-tabs color="#4f5e62" class="custom-tabs" left @change="CustomTabs">
                          <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                              <v-tab v-bind="attrs" v-on="on"><img class="tab-icon" src="/images/bell.png" />{{
                                tabcontent[0]
                              }}</v-tab>
                            </template>
                            <span>超溫警報</span>
                          </v-tooltip>
                          <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                              <v-tab v-bind="attrs" v-on="on"><img class="tab-icon" src="/images/wifi.png" />{{
                                tabcontent[1]
                              }}</v-tab>
                            </template>
                            <span>連線項目</span>
                          </v-tooltip>
                          <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                              <v-tab v-bind="attrs" v-on="on"><img class="tab-icon" src="/images/wifi-1.png"
                                  style="
                                                                                                                                                        width: 34px !important;
                                                                                                                                                        margin-top: 6px;
                                                                                                                                                      " />{{
                                                                                                                                                        tabcontent[2]
                                                                                                                                                      }}</v-tab>
                            </template>
                            <span>連線歷史</span>
                          </v-tooltip>
                          <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                              <v-tab v-bind="attrs" v-on="on"><img class="tab-icon" src="/images/tabs.png" />{{
                                tabcontent[3]
                              }}</v-tab>
                            </template>
                            <span>書籤</span>
                          </v-tooltip>
                          <!-- 超溫警報 -->
                          <v-tab-item>
                            <div class="Overtemperature-Alert">
                              <div class="pt-2">
                                <strong class="Alert-title">超溫項目警報</strong>
                                <div class="Alert-txt py-3">
                                  <div v-for="(item, index) in overTemperatureAlarm.over" :key="'asc' + index"
                                    class="px-3">
                                    <span class="Alert-txt-alarm px-3">
                                      {{ item.table_alarm_start }} {{ item.camid }} {{ item.table_itemName }}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <strong class="Alert-title">超溫警報通知</strong>
                                <div class="Alert-txt2 py-3">
                                  <div v-for="(item, index) in overTemperatureAlarm.normal" :key="'normal' + index"
                                    class="my-1">
                                    <div class="Alert-background">
                                      <span class="Alert-font px-5">{{ item.table_alarm_start }} {{ item.camid }} {{
                                        item.table_itemName }}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </v-tab-item>
                          <!-- 連線項目 -->
                          <v-tab-item>
                            <div class="mags-cover py-0 px-3">
                              <v-tabs centered class="custom-tabs">
                                <v-tab>
                                  <div class="d-flex mx-5">
                                    <div class="mags-point _8ab284"></div>
                                    連線
                                  </div>
                                </v-tab>
                                <v-tab>
                                  <div class="d-flex mx-5">
                                    <div class="mags-point _de8788"></div>
                                    異常
                                  </div>
                                </v-tab>
                                <v-tab>
                                  <div class="d-flex mx-5">
                                    <div class="mags-point _d7dbdb"></div>
                                    離線
                                  </div>
                                </v-tab>
                                <v-tab-item>
                                  <div class="connect-cover">
                                    <div>
                                      <div class="mt-3">
                                        <strong class="Alert-title">相機</strong>
                                      </div>
                                      <v-data-table :headers="connectHeaders" :items="connectDesserts" disable-pagination
                                        hide-default-footer height="250px" class="" fixed-header>
                                        <template v-slot:[`item.status`]="{ item }">
                                          <div class="connect-icon">
                                            <img :src="item.status" />
                                          </div>
                                        </template>
                                      </v-data-table>
                                    </div>
                                    <div>
                                      <div>
                                        <div class="mt-3">
                                          <strong class="Alert-title">其他裝置</strong>
                                        </div>
                                        <v-data-table :headers="otherDevicesHeaders" :items="otherDevicesDesserts"
                                          disable-pagination hide-default-footer height="240px" class="" fixed-header>
                                          <template v-slot:[`item.status`]="{ item }">
                                            <div class="d-none">{{ item }}</div>
                                            <div class="connect-icon">
                                              <img src="/images/SERVERICON.png" class="pa-1" />
                                            </div>
                                          </template>
                                        </v-data-table>
                                      </div>
                                    </div>
                                  </div>
                                </v-tab-item>
                                <v-tab-item>
                                  <div class="connect-cover">
                                    <div>
                                      <div class="mt-3">
                                        <strong class="Alert-title">相機</strong>
                                      </div>
                                      <v-data-table :headers="connectHeaders" :items="connectDesserts" disable-pagination
                                        hide-default-footer height="250px" class="">
                                        <template v-slot:[`item.status`]="{ item }">
                                          <div class="connect-icon">
                                            <img :src="item.status" />
                                          </div>
                                        </template>
                                      </v-data-table>
                                    </div>
                                    <div>
                                      <div>
                                        <div class="mt-3">
                                          <strong class="Alert-title">其他裝置</strong>
                                        </div>
                                        <v-data-table :headers="otherDevicesHeaders" :items="otherDevicesDesserts"
                                          disable-pagination hide-default-footer height="240px" class="">
                                          <template v-slot:[`item.status`]="{ item }">
                                            <!-- <div class="connect-icon">
                                              <div v-if="item.status === 0" class="status-open"></div>
                                              <div v-else class="status-off"></div>
                                            </div> -->
                                            <div class="d-none">{{ item }}</div>
                                            <div class="connect-icon">
                                              <img src="/images/SERVERICON.png" class="pa-1" />
                                            </div>
                                          </template>
                                        </v-data-table>
                                      </div>
                                    </div>
                                  </div>
                                </v-tab-item>
                                <v-tab-item>
                                  <div class="connect-cover">
                                    <div>
                                      <div class="mt-3">
                                        <strong class="Alert-title">相機</strong>
                                      </div>
                                      <v-data-table :headers="connectHeaders" :items="connectDesserts" disable-pagination
                                        hide-default-footer height="250px" class="">
                                        <template v-slot:[`item.status`]="{ item }">
                                          <div class="connect-icon">
                                            <img :src="item.status" />
                                          </div>
                                        </template>
                                      </v-data-table>
                                    </div>
                                    <div>
                                      <div>
                                        <div class="mt-3">
                                          <strong class="Alert-title">其他裝置</strong>
                                        </div>
                                        <v-data-table :headers="otherDevicesHeaders" :items="otherDevicesDesserts"
                                          disable-pagination hide-default-footer height="240px" class="">
                                          <template v-slot:[`item.status`]="{ item }">
                                            <!-- <div class="connect-icon">
                                              <div v-if="item.status === 0" class="status-open"></div>
                                              <div v-else class="status-off"></div>
                                            </div> -->
                                            <div class="d-none">{{ item }}</div>
                                            <div class="connect-icon">
                                              <img src="/images/SERVERICON.png" class="pa-1" />
                                            </div>
                                          </template>
                                        </v-data-table>
                                      </div>
                                    </div>
                                  </div>
                                </v-tab-item>
                              </v-tabs>
                            </div>
                          </v-tab-item>
                          <!-- 連線歷史 -->
                          <v-tab-item>
                            <div class="mags-cover py-0">
                              <div class="mt-3">
                                <strong class="Alert-title">相機</strong>
                              </div>
                              <div class="Alert-txt2 py-3">
                                <div v-for="iee in 100" :key="iee" class="my-1">
                                  <div class="Alert-background">
                                    <span class="Alert-font px-5">2022/07/27 03:11 Cam-s1-58
                                      {{
                                        iee % 2 == 0 ? '斷線' : '重新連線'
                                      }}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </v-tab-item>
                          <!-- 書籤 -->
                          <v-tab-item>
                            <div>
                              <div class="my-3">
                                <strong class="Alert-title">書籤項目</strong>
                              </div>
                              <v-data-table :headers="tagsHeaders" :items="tagsDesserts" disable-pagination
                                hide-default-footer height="540px" fixed-header class="">
                                <template v-slot:[`item.delete`]="{ item }">
                                  <div class="trash-icon">
                                    <img :src="item.delete" />
                                  </div>
                                </template>
                                <template v-slot:[`item.check`]="{ item }">
                                  <div class="connect-icon">
                                    {{ item.check }}
                                  </div>
                                </template>
                              </v-data-table>
                            </div>
                          </v-tab-item>
                        </v-tabs>
                      </v-card>
                    </div>
                    <!-- end -->
                  </v-card>
                </v-col>
              </v-row>
            </div>
          </v-container>
        </v-tab-item>
        <v-tab-item value="tab-2" style="height: 93.2vh">
          <div v-if="tab === 'tab-2'">
            <MultiScreenstand id="1015" @VideoActive="VideoActive(data)" :camid="focusCAMID" :tab2="tab"
              :camlist="CamList" />
          </div>
          <!-- <v-btn @click="VideoActive('tab-1')">BACK</v-btn> -->
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
  </div>
</template>

<script>


import axios from 'axios'
import MultiScreenstand from '../components/MultiScreen/MultiScreen-stand.vue'
// import KonvaDisplayData from '../components/Index/konva-display-data.vue'
import PixijsDisplayData from '../components/Index/pixijs-display-data.vue'
export default {
  name: 'indexPage',
  components: {
    MultiScreenstand,
    // KonvaDisplayData
    PixijsDisplayData
  },

  head: {
    link: [
      // { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: 'stylesheet', href: '/css/jquery-ui.css' },
      { rel: 'stylesheet', href: '/css/object.css' },
      { rel: 'stylesheet', href: '/css/card3.css' },
      { rel: 'stylesheet', href: 'css/details.css' },
    ],
    // script: [
    // {
    //   hid:'script',
    //   src: '/js/jquery-ui.js',
    //   type: 'text/javascript',
    //   callback: (data)=>{
    //     console.log(this)
    //   }
    // },
    // ],
  },
  // 載入完成外部(第三方)插件，使用callback呼叫local 方法
  metaInfo() {
    return {
      script: [
        {
          hid: 'extscript',
          src:
            // 問號後面是隨機給的亂數，避免瀏覽器暫存.JS，造成metaInfo不起作用
            '/js/jquery-collision.js?' + Math.random().toString(36).substr(2),
          callback: () => {
            // console.log('ok1')
            this.externalLoaded = this.externalLoaded + 1
          },
        },
        {
          hid: 'extscript',
          src: '/js/zoom.js?' + Math.random().toString(36).substr(2),
          callback: () => {
            // console.log('ok2')
            this.externalLoaded = this.externalLoaded + 1
          },
        },
        {
          hid: 'extscript',
          src: '/js/jquery-ui.js?' + Math.random().toString(36).substr(2),
          callback: () => {
            // console.log('ok3')
            this.externalLoaded = this.externalLoaded + 1
          },
        },
        {
          hid: 'extscript',
          body: true,
          src:
            // 問號後面是隨機給的亂數，避免瀏覽器暫存.JS，造成metaInfo不起作用
            '/js/pixi.min.js?' + Math.random().toString(36).substr(2),
          // '/js/pixi.min.js',
          callback: () => {
            console.log("in");
            console.log(window.PIXI);
            this.tab = this.$route.query.tab
            this.focusCAMID = null
            // console.log(this.tab);
            // setTimeout(() =>{
            //   this.tab = 'tab-2'
            // },4000)
            if (this.tab === 'tab-1') {
              // console.log(this.numberToChinese(12))
              this.wsblock = true
              this.openSocket()
              this.opneRoiWS()
              this.connectTOWayWS()
              this.initScript()
            }
          },
        }
        // ,
        // {
        //   hid: 'extscript',
        //   body: true,
        //   src:
        //     // 問號後面是隨機給的亂數，避免瀏覽器暫存.JS，造成metaInfo不起作用
        //     'https://mrdoob.github.io/stats.js/build/stats.min.js?' + Math.random().toString(36).substr(2),
        //   callback: () => {
        //     // this.fps()
        //   },
        // },
        // {
        //   skip: !this.externalLoaded,
        //   innerHTML: `
        //     /* this is only added once external script has been loaded */
        //     /* and e.g. window.$externalVar exists */
        //   `,
        // },
      ],
    }
  },
  data: () => ({
    // olny pixijs data

    // ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
    sendCameraIdtoInt1: null,
    screenSwitch: false,
    focusCamName: null,
    socket: [],
    externalLoaded: 0,
    // tab: null,
    data: [],
    tab: 'tab-1',
    // 放大鏡級數
    attrs: null,
    on: null,
    events: [],
    zoomL: 0,
    zoomin: '',
    zoomout: 'zoom-disabled',
    // sortable: 'sortable4-1',
    // ui_state: 'ui-state-default',
    sortable: 'sortable12',
    ui_state: 'ui-state-default12',
    c_diago: 'custom-dialog dialog-close',
    cam: [],
    depressed: true,
    carousel_checkbox: false,
    functionEvents: true,
    // 畫面設定
    intobtnalarm: false,
    carouselTime: '5分鐘',
    carouselAt: 0,
    palette: ['/left-icons/palette/palette-iron.png', 'Iron'],
    paletteAT: 0,
    imageMode: ['/left-icons/image-mode/image-mode-thermal.png', 'Thermal'],
    imageModeAT: 0,
    // 日曆
    arrayEvents: null,
    date2: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    // 下拉選單
    e1: '',
    areas: [],
    e2: '',
    groups: [],
    e3: '1',
    pages: ['1', '2', '3', '4'],
    e4: 2, // 分隔選單
    menuData: [],
    CamList: [], // 暫存相機列表
    CamPage: 1, // 目前選擇的頁數
    CamPageTotle: 1,
    splitScreen: [
      { text: '均分4分格', value: 0 },
      { text: '4分格', value: 1 },
      { text: '12分格', value: 2 },
      // { text: '24分格', value: 3 },
    ],
    // 標籤文字
    tabcontent: [],
    // 連線項目
    connectHeaders: [
      {
        text: '',
        align: 'start',
        sortable: false,
        value: 'status',
      },
      { text: '編號', value: 'id' },
      { text: '監測項目', value: 'item' },
      { text: '上次更新時間', value: 'update' },
    ],
    connectDesserts: [],
    // 其他裝置
    autoOpenWindowStatus: true,
    otherDevicesHeaders: [
      {
        text: '',
        align: 'start',
        sortable: false,
        value: 'status',
      },
      { text: '編號', value: 'id' },
      { text: '位置', value: 'item' },
      { text: '上次更新時間', value: 'update' },
    ],
    otherDevicesDesserts: [],
    // 書籤項目
    tagsHeaders: [
      {
        text: '',
        // align: 'center',
        sortable: false,
        value: 'delete',
      },
      {
        text: '編號',
        align: 'center',
        value: 'id',
        width: '50px',
        class: 'tagsId',
      },
      { text: '項目', value: 'item' },
      { text: '', value: 'check' },
    ],
    tagsDesserts: [],
    // end
    // dialog table
    diagoTootipCanvas: false,
    InternetLIST: [],
    captureSelect: null,
    thresholdTime: null,
    hysteresis: null,
    conditionSelect: null,
    pulseTime: null,
    conditionItems: null,
    captureItems: null,
    // _______對話框相關_______
    alarmDate: new Date(),
    alarmCalendar: null,
    valueToday: 0,
    valueLastday: 0,
    valueThisWeek: 0,
    valueThisMonth: 0,
    temps: 0,
    reference: [],
    spots: [],
    scopes: [],
    lines: [],
    getRoiInterval: null,
    // 警報設置
    diagoalarmHeaders: [
      { text: '項目', value: 'item', align: 'center' },
      {
        text: '溫度',
        align: 'center',
        // value: 'id',
        width: '50px',
        value: 'temperature',
      },

      // { text: '設定', value: 'setting', align: 'center' },
    ],
    diagoalarmDesserts: [],
    // 警報紀錄
    diagoalarmlogHeaders: [
      { text: '項目', value: 'item', align: 'center' },
      {
        text: '觸發時間',
        align: 'center',
        // value: 'id',
        // width: '50px',
        value: 'temperature',
      },
      { text: '監測溫度', value: 'status', align: 'center' },
      { text: '警報溫度', value: 'date', align: 'center' },
      { text: '持續時間', value: 'location', align: 'center' },
    ],
    diagoalarmlogDesserts: [],
    diagotootipimg: false,
    diagotootipimgbtn: false,
    diagotootipimgzoom: false,
    focusCAMID: null,
    // ▔▔▔▔對話框相關 END▔▔▔▔
    // _______設定警報-對話框相關_______
    dialog: false,
    openid: null,
    opentype: null,
    tpmedata: null,
    checkbox1: false,
    threshold: null,
    dialogdata: null,
    // ▔▔▔▔設定警報-對話框相關 END▔▔▔▔
    ws: null,
    wsListener: {
      close: null,
      message: null
    },
    wsListener2: {
      close: null,
      message: null
    },
    wsListener3: {
      close: null,
      message: null
    },
    reMeida: false,
    wsblock: true,
    wsdata: null,
    // _______偵錯模式_______
    fps1: 0,
    datareques: 0,
    webStatus: 'N/A',
    // _______偵錯模式 end_______
    // 暫存ROI
    allRoiData: [],
    webs1: null,
    konvaGetDataStatus: true,
    roiDataToKonve: [],
    restartDisplay: null,
    restartDisplay1: null,
    alarmCam: [],
    wsTOway: null,
    autoSelectCamINT: null,
    refreshrigthalarmInt: null,
    overTemperatureAlarm: {
      over: [],
      normal: [],
    }
  }),
  watch: {
    focusCAMID(data) {
      if (data !== null) {
        this.wsTOway.send(JSON.stringify({
          // main_item: "camera",
          type: "camera",
          sub_item: "superResolutionStatus",
          action: "set",
          session: Math.random().toString(36).substr(2),
          content: {
            "cam_id": data,
            "status": 0,
            "highTemperatureArea": 0,
            "highTemperatureAreaRange": 0
          }
        }))
      }
    },
    // externalLoaded(data) {
    // console.log(data)
    // if (data === 3) {
    // }
    // },
    tab(data) {
      // console.log("wsx", data)
      if (data === 'tab-2') {
        this.destroyFunction()
        // this.konvaGetDataStatus = false
        // this.wsblock = false
        // // this.ws.close()
        // this.ws = null
        // this.wsTOway.close()
        // this.wsTOway = null
        // this.webs1.close()
        // this.webs1 = null
        // if (this.autoSelectCamINT !== null) {
        //   clearInterval(this.autoSelectCamINT)
        //   this.autoSelectCamINT = null
        // }
        // if (this.getRoiInterval !== null) {
        //   clearInterval(this.getRoiInterval)
        //   this.getRoiInterval = null
        // }
        // if (this.sendCameraIdtoInt1 !== null) {
        //   clearInterval(this.sendCameraIdtoInt1)
        //   this.sendCameraIdtoInt1 = null
        // }
        // setTimeout(() => {

        // }, 3000)
      } else if (data === 'tab-1') {
        this.konvaGetDataStatus = true
        this.reMeida = true
        this.wsblock = true
        this.openSocket()
        this.opneRoiWS()
        this.connectTOWayWS()
        this.initScript()
        if (this.refreshrigthalarmInt !== null) {
          clearInterval(this.refreshrigthalarmInt)
          this.refreshrigthalarmInt = null
        }
        this.refreshrigthalarmInt = setInterval(() => {
          this.refreshrigthalarm()
        }, 5000)
        // if (!this.wsblock) {
        //   this.wsblock = true
        //   this.openSocket()
        // }
      }
    },
  },
  // mounted() { },
  methods: {
    // 右上角FPS測試視窗
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
    connectTOWayWS() {
      if (this.sendCameraIdtoInt1 !== null) {
        clearInterval(this.sendCameraIdtoInt1)
        this.sendCameraIdtoInt1 = null
      }
      if (this.$myPlugin.webSocketconnect03().readyState === 1) {
        this.wsTOway = this.$myPlugin.webSocketconnect03()
        if (this.wsListener3.close !== null) {
          this.wsTOway.removeEventListener("close", this.wsListener3.close)
          this.wsListener3.close = null
        }
        var colseEvent = () => {
          setTimeout(() => {
            this.connectTOWayWS()
          }, 1000)
        }
        this.wsTOway.addEventListener("close", colseEvent)
        this.wsListener3.close = colseEvent
        this.openMassage()
        console.log('開啟雙向WebScoket')
        this.sendCameraIdtoInt1 = setInterval(() => {
          // console.log(this.focusCAMID);
          if (this.focusCAMID !== null) {
            this.wsTOway.send(JSON.stringify({
              // main_item: "camera",
              type: "camera",
              sub_item: "superResolutionStatus",
              action: "set",
              session: Math.random().toString(36).substr(2),
              content: {
                "cam_id": this.focusCAMID,
                "status": 0,
                "highTemperatureArea": 0,
                "highTemperatureAreaRange": 0
              }
            }))
          }
        }, 5000)
      } else if (this.$myPlugin.webSocketconnect03().readyState !== 1 && this.wsblock) {
        setTimeout(() => {
          // clearTimeout(this.restartDisplay)
          this.connectTOWayWS()
          console.log("組件判斷核心socket無法連線，將稍後重新嘗試連線...");
        }, 1000)
        // console.log(this.restartDisplay);
      }
    },
    autoOpenWindow(camid) {
      this.c_diago = 'custom-dialog'
      var focusdiv = document.querySelectorAll('.col-windows-ul')[0]
      // console.log(camid);
      if (camid === undefined) {
        focusdiv = focusdiv.querySelectorAll(`.ui-none`)[0]
      } else {
        focusdiv = focusdiv.querySelectorAll(`.ui-${camid}`)[0]
      }
      // console.log(t);
      var cover = document.querySelectorAll('.cover-bg')[0].getBoundingClientRect() // 宣告渲染畫面
      var position = focusdiv.getBoundingClientRect() // 取得點擊的元素座標
      var dialog = document.querySelectorAll('.custom-dialog')[0] // 宣告互動視窗
      var div = focusdiv.getBoundingClientRect() // 選告元素底下的圖片
      var diagoContnetCover = document.querySelectorAll('.diago-contnet-cover')[0]
      diagoContnetCover.style.maxHeight = cover.height - 74 - 10 + 'px'
      var x = 0
      if (position.left + div.width > cover.width / 2) {
        x = position.left - dialog.getBoundingClientRect().width - 5 // 宣告元素右下角x軸
      } else {
        x = position.left + div.width + 5 // 宣告元素右下角x軸
      }
      if (x < 0) {
        x = 8
      }
      var dialogHeight = dialog.getBoundingClientRect().height / 2
      var y = position.top + div.height / 2 - dialogHeight // 宣告元素右下角y軸
      // 如果計算結果，視窗畫面底部座標大於實際畫面的高度，將會實施以下公式: y = y - (y + 視窗高度 - 實際畫面高度)
      if (y + dialog.getBoundingClientRect().height > cover.height) {
        y = y - (y + dialog.getBoundingClientRect().height - cover.height)
      }
      // 如果計算結果y座標是負的，那會直接把y座標強制設定為0+header(高度)
      if (y < 64) {
        y = 70
      }
      dialog.style.left = x + 'px'
      dialog.style.top = y + 'px'
      // console.log('open window');
      focusdiv = null
      cover = null
      position = null
      dialog = null
      div = null
      diagoContnetCover = null
    },
    openMassage() {
      if (this.autoSelectCamINT !== null) {
        clearInterval(this.autoSelectCamINT)
        this.autoSelectCamINT = null
      }
      if (this.wsListener3.message !== null) {
        this.wsTOway.removeEventListener("message", this.wsListener3.message)
        this.wsListener3.message = null
      }
      var messageEvent = (e) => {
        var data = JSON.parse(e.data)
        if (data.type === 'CamsAlarmStatus') {
          if (this.autoOpenWindowStatus) {
            if (data.camid.length > 0) {
              this.autoOpenWindow(data.camid[0])
              this.alarmlist(this.alarmDate, data.camid[0])
              if (this.getRoiInterval !== null) {
                clearInterval(this.getRoiInterval)
                this.getRoiInterval = null
              }
              this.getRoiList(data.camid[0])
              this.focusCAMID = data.camid[0]
              var findcamname = this.cam.find((item) => item.cam_id === data.camid[0])
              this.focusCamName = findcamname.name
              console.log("sA", data.camid[0])
              this.getRoiInterval = setInterval(() => {
                this.getRoiList(data.camid[0])
                this.alarmlist(this.alarmDate, data.camid[0])
              }, 1000)
            } else {
              this.diagoOff()
            }
          }
        } else if (data.type === 'alarmList') {
          var Date1 = this.alarmDate
          this.alarmCalendar = data.data
          data = data.data
          var lastday = 0
          var today = 0
          var week = 0
          var month = 0
          var alarmlist = []
          data.forEach((index) => {
            // console.log(index.table_alarm_start)
            var tmp = new Date(index.table_alarm_start)
            // 計算昨日警報次數
            var lastCorr = this.Datecorrect('yesterday', Date1)
            var lastdaystart = new Date(lastCorr + ' 00:00:00')
            var lastdaystop = new Date(lastCorr + ' 23:59:59')
            if (tmp >= lastdaystart && tmp <= lastdaystop) {
              lastday = lastday + 1
            }
            // 計算今日警報次數
            var todayCorr = this.Datecorrect('today', Date1)
            var todaystart = new Date(todayCorr + ' 00:00:00')
            var todaystop = new Date(todayCorr + ' 23:59:59')
            if (tmp >= todaystart && tmp <= todaystop) {
              today = today + 1
            }
            // 計算本周警報次數
            var weekCorr = this.Datecorrect('week', Date1)
            var weekstart = new Date(weekCorr[0] + ' 00:00:00')
            var weekstop = new Date(weekCorr[1] + ' 23:59:59')
            if (tmp >= weekstart && tmp <= weekstop) {
              week = week + 1
            }
            // 計算本月警報次數
            var monthCorr = this.Datecorrect('month', Date1)
            var monthstart = new Date(monthCorr[0] + ' 00:00:00')
            var monthstop = new Date(monthCorr[1] + ' 23:59:59')
            if (tmp >= monthstart && tmp <= monthstop) {
              month = month + 1
            }
            // 警報紀錄
            var name = index.table_itemName.match(/^[a-z|A-Z]+/gi)
            var number = index.table_itemName.match(/\d+$/gi)
            // alarmlist.push({
            //   objcet: { name: name[0], number: number[0] },
            //   duration: durationCrr(
            //     index.table_alarm_start,
            //     index.table_alarm_stop
            //   ),
            //   temperature: index.table_max.toFixed(1),
            //   alertTemperature: index.table_alarm_threshold,
            //   time: index.table_alarm_start,
            // })
            var st = null
            if (index.table_alarm_stop === null) {
              st = '警報中'
            } else {
              st = '停止警報'
            }
            alarmlist.push({
              item: { name: name[0], number: number[0] },
              temperature: `${index.table_max.toFixed(1)}°C`,
              status: st,
              date: durationCrr(
                index.table_alarm_start,
                index.table_alarm_stop
              ),
              table_alarm_threshold: index.table_alarm_threshold,
              table_alarm_start: index.table_alarm_start,
            })
            alarmlist.sort(function (a, b) {
              if (a.time < b.time) {
                return 1 // 正數時，後面的數放在前面
              } else {
                return -1 // 負數時，前面的數放在前面
              }
            })
            alarmlist.sort(function (a, b) {
              if (a.date[0] !== '持續中') {
                return 1 // 正數時，後面的數放在前面
              } else {
                return -1 // 負數時，前面的數放在前面
              }
            })
            // 觸發時間為警報存在的時間(s)，開始時間為警報設定的時間
            tmp = null
            lastCorr = null
            lastdaystart = null
            lastdaystop = null
            todayCorr = null
            todaystart = null
            todaystop = null
            weekCorr = null
            weekstart = null
            weekstop = null
            monthCorr = null
            monthstart = null
            monthstop = null
            name = null
            number = null
            st = null
          })
          this.valueToday = today
          this.valueLastday = lastday
          this.valueThisWeek = week
          this.valueThisMonth = month
          // this.temps = alarmlist
          this.diagoalarmlogDesserts = alarmlist
          // console.log(this.temps)
          Date1 = null
          lastday = null
          today = null
          week = null
          month = null
          alarmlist = null
        }

        function durationCrr(start, stop) {
          if (stop !== null) {
            const nowtime1 = new Date(start)
            const startone1 = new Date(stop)
            const time1 = (startone1.getTime() - nowtime1.getTime()) * 0.001
            var duration = getDuration(time1)
            return [null, duration, 0]
          } else {
            const nowtime = new Date()
            const startone = new Date(start)
            const time = (nowtime.getTime() - startone.getTime()) * 0.001
            return ['持續中', getDuration(time.toFixed(0)), 1]
          }
        }
        function getDuration(second) {
          var days = Math.floor(second / 86400)
          var hours = Math.floor((second % 86400) / 3600)
          var minutes = Math.floor(((second % 86400) % 3600) / 60)
          var seconds = Math.floor(((second % 86400) % 3600) % 60)
          var duration = null
          if (second < 60) {
            duration = seconds + '秒'
          } else if (second >= 60 && second < 3600) {
            duration = minutes + '分' + seconds + '秒'
          } else if (second >= 3600 && second < 86400) {
            duration = hours + '時' + minutes + '分'
          } else if (second >= 86400) {
            duration = days + '天' + hours + '時'
          }
          return duration
        }
        data = null
      }
      this.wsTOway.addEventListener("message", messageEvent)
      this.wsListener3.message = messageEvent
      // this.wsTOway.onmessage = (e) => {

      // }
      this.autoSelectCamINT = setInterval(() => {
        var len = this.cam.length
        var arrCam = []
        for (var i = 0; i < len; i++) {
          if (this.cam[i].cam_id !== "") {
            arrCam.push(this.cam[i].cam_id)
          }
        }
        var data = {
          "type": "CamsAlarmStatus",
          "camid": arrCam,
          "session": Math.random().toString(36).substr(2),
        }
        this.wsTOway.send(JSON.stringify(data))
        // console.log(arrCam);
      }, 3000)
    },
    opneRoiWS() {
      if (this.$myPlugin.webSocketconnect02().readyState === 1) {
        this.webs1 = this.$myPlugin.webSocketconnect02()
        var reloaddiv = document.querySelectorAll('.reload')[0]
        reloaddiv.style.opacity = 0
        reloaddiv.style.pointerEvents = 'none'
        console.log('ROI 連接成功')
        if (this.wsListener2.message !== null) {
          this.webs1.removeEventListener("message", this.wsListener2.message)
          this.wsListener2.message = null
        }
        var messageEvent = (event) => {
          this.roiDataToKonve = event
          var arr = JSON.parse(event.data)
          // 判斷超溫值
          var alarmCam1 = []
          Object.keys(arr).forEach((key) => {
            var leng = arr[key].blob.length
            for (var i = 0; i < leng; i++) {
              // console.log(arr[key].blob[i])
              if (arr[key].blob[i].blob_temperature_max >= arr[key].blob[i].blob_threshold && arr[key].blob[i].blob_alarm_status === 1) {
                alarmCam1.push(key)
                break;
              }
            }
            var leng1 = arr[key].spot.length
            for (var i1 = 0; i1 < leng1; i1++) {
              if (arr[key].spot[i1].spot_temperature >= arr[key].spot[i1].spot_threshold && arr[key].spot[i1].spot_alarm_status === 1) {
                alarmCam1.push(key)
                break;
              }
            }
            var leng2 = arr[key].scope.length
            for (var i2 = 0; i2 < leng2; i2++) {
              // console.log(arr[key].blob[i])
              if (arr[key].scope[i2].scope_temperature_max >= arr[key].scope[i2].scope_threshold && arr[key].scope[i2].scope_alarm_status === 1) {
                alarmCam1.push(key)
                break;
              }
            }
            var leng3 = arr[key].line.length
            for (var i3 = 0; i3 < leng3; i3++) {
              // console.log(arr[key].blob[i])
              if (arr[key].line[i3].line_temperature_max >= arr[key].line[i3].line_threshold && arr[key].line[i3].line_alarm_status === 1) {
                alarmCam1.push(key)
                break;
              }
            }
            leng = null
            leng1 = null
            leng2 = null
            leng3 = null
          })
          this.alarmCam = alarmCam1

          // console.log(this.alarmCam , );
          // 判斷超溫值 end
          // arr = { data: arr }
          // arr = { data: arr }
          this.allRoiData = arr
          this.diagoTootipCanvas = true
          arr = null
          alarmCam1 = null

        }
        this.webs1.addEventListener("message", messageEvent)
        this.wsListener2.message = messageEvent
        var colseEvent = () => {
          reloaddiv.style.opacity = 0.6
          reloaddiv.style.pointerEvents = 'auto'
          console.log("組件ROI WS 斷線");
          setTimeout(() => {
            // this.showDisplay()
            this.opneRoiWS()
            // clearTimeout(this.restartDisplay)
          }, 1000)
          // console.log(this.restartDisplay);
        }
        this.webs1.addEventListener("close", colseEvent)
        this.wsListener2.close = colseEvent
      } else if (this.$myPlugin.webSocketconnect02().readyState !== 1 && this.wsblock) {
        setTimeout(() => {
          // clearTimeout(this.restartDisplay)
          this.opneRoiWS()
          reloaddiv.style.opacity = 0.6
          reloaddiv.style.pointerEvents = 'auto'
          console.log("組件ROI WS 斷線，將稍後重新嘗試連線...");
        }, 1000)
        // console.log(this.restartDisplay);
      }
      // this.webs1.onclose = () => {
      //   console.log('ROI 連接斷開')
      //   if (this.wsblock) {
      //     console.log('ROI 連接斷開，3秒後重新建立連接...')
      //     reloaddiv.style.opacity = 0.6
      //     reloaddiv.style.pointerEvents = 'auto'
      //     setTimeout(() => {
      //       console.log('ROI 重新連接中...')
      //       this.opneRoiWS()
      //     }, 3000)
      //   }
      // }
    },
    openSocket() {
      if (this.$myPlugin.webSocketconnect01().readyState === 1) {
        this.ws = this.$myPlugin.webSocketconnect01()
        if (this.wsListener.close !== null) {
          this.ws.removeEventListener("close", this.wsListener.close)
          this.wsListener.close = null
        }
        var colseEvent = () => {
          // console.log("使用addEventListener 偵測到ws斷線");
          setTimeout(() => {
            // this.showDisplay()
            this.openSocket()
            // clearTimeout(this.restartDisplay)
          }, 1000)
          // console.log(this.restartDisplay);
        }
        this.ws.addEventListener("close", colseEvent)
        this.wsListener.close = colseEvent
        this.showDisplay()

      } else {
        this.restartDisplay = setTimeout(() => {
          // clearTimeout(this.restartDisplay)
          this.openSocket()
          // console.log("組件判斷核心socket無法連線，將稍後重新嘗試連線...");
        }, 1000)
        console.log(this.restartDisplay);
      }
    },
    initial() {
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
          var userSetting = data.setting
          this.menuData = data.setting
          Object.keys(list).forEach((key) => {
            this.areas.push(list[key].name_main)
            if (parseInt(key) === parseInt(userSetting.main)) {
              this.e1 = list[key].name_main
              Object.keys(list[key].secondary).forEach((key1) => {
                if (parseInt(key1) === parseInt(userSetting.secondary)) {
                  this.e2 = list[key].secondary[key1]
                }
                this.groups.push(list[key].secondary[key1])
              })
            }
          })
          this.getCameraList()
          data = null
          list = null
          userSetting = null
        })
        .catch((err) => console.log('error from axios', err))
    },
    startGetROI(camid, e, alarm) {
      alarm ? this.intobtnalarm = true : this.intobtnalarm = false
      this.autoOpenWindowStatus = false
      var cover = document.querySelectorAll('.cover-bg')[0].getBoundingClientRect() // 宣告渲染畫面
      var position = e.target.getBoundingClientRect() // 取得點擊的元素座標
      var dialog = document.querySelectorAll('.custom-dialog')[0] // 宣告互動視窗
      var div = e.target.getBoundingClientRect() // 選告元素底下的圖片
      var diagoContnetCover = document.querySelectorAll('.diago-contnet-cover')[0]
      diagoContnetCover.style.maxHeight = cover.height - 74 - 10 + 'px'
      var x = 0
      if (position.left + div.width > cover.width / 2) {
        x = position.left - dialog.getBoundingClientRect().width - 5 // 宣告元素右下角x軸
      } else {
        x = position.left + div.width + 5 // 宣告元素右下角x軸
      }
      if (x < 0) {
        x = 8
      }
      var dialogHeight = dialog.getBoundingClientRect().height / 2
      var y = position.top + div.height / 2 - dialogHeight // 宣告元素右下角y軸
      // 如果計算結果，視窗畫面底部座標大於實際畫面的高度，將會實施以下公式: y = y - (y + 視窗高度 - 實際畫面高度)
      if (y + dialog.getBoundingClientRect().height > cover.height) {
        y = y - (y + dialog.getBoundingClientRect().height - cover.height)
      }
      // 如果計算結果y座標是負的，那會直接把y座標強制設定為0+header(高度)
      if (y < 64) {
        y = 70
      }
      dialog.style.left = x + 'px'
      dialog.style.top = y + 'px'
      try {
        this.c_diago = 'custom-dialog'
        // console.log(camid)
        this.focusCAMID = camid
        if (this.getRoiInterval !== null) {
          clearInterval(this.getRoiInterval)
        }
        this.getRoiList(camid)
        this.alarmlist(this.alarmDate, camid)
        this.getRoiInterval = setInterval(() => {
          // console.log('getROI')
          this.getRoiList(camid)
          this.alarmlist(this.alarmDate, camid)
        }, 1000)
      } catch (error) {
        console.log("物件未載入完成")
        console.log(error)
      }
      cover = null
      position = null
      dialog = null
      div = null
      diagoContnetCover = null
      x = null
      dialogHeight = null
      y = null

    },
    getRoiList(camid) {
      // axios({
      //   method: 'post',
      //   url: 'http://127.0.0.1:5002/api/monitor/object/data',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   data: JSON.stringify([
      //     {
      //       cam_id: camid,
      //     },
      //   ]),
      // })
      //   .then((params) => {
      try {
        var params = this.allRoiData[camid]
        var arr3 = []
        var alarm = 0
        arr3.push({
          item: { number: 'R', name: 'spot' },
          temperature:
            params.reference[0].reference_temperature.toFixed(1),
          setting: 0,
        })
        var spots = params.spot
        spots.forEach((index1) => {
          if (index1.spot_alarm_status === 1) {
            if (index1.spot_temperature >= index1.spot_threshold) {
              alarm = 2
            } else {
              alarm = 1
            }
          } else {
            alarm = 0
          }
          arr3.push({
            item: { number: index1.spot_number, name: 'spot' },
            temperature:
              index1.spot_temperature !== null
                ? index1.spot_temperature.toFixed(1)
                : 'n/a',
            setting: alarm,
          })
        })
        var scopes = params.scope
        scopes.forEach((index2) => {
          if (index2.scope_alarm_status === 1) {
            if (index2.scope_temperature_max >= index2.scope_threshold) {
              alarm = 2
            } else {
              alarm = 1
            }
          } else {
            alarm = 0
          }
          arr3.push({
            item: { number: index2.scope_number, name: 'scope' },
            temperature:
              index2.scope_temperature_max !== null
                ? index2.scope_temperature_max.toFixed(1)
                : 'n/a',
            setting: alarm,
          })
        })
        var lines = params.line
        lines.forEach((index3) => {
          if (index3.line_alarm_status === 1) {
            if (index3.line_temperature_max >= index3.line_threshold) {
              alarm = 2
            } else {
              alarm = 1
            }
          } else {
            alarm = 0
          }
          arr3.push({
            item: { number: index3.line_number, name: 'line' },
            type: 'line',
            temperature:
              index3.line_temperature_max !== null
                ? index3.line_temperature_max.toFixed(1)
                : 'n/a',
            setting: alarm,
          })
        })
        var blob = params.blob
        blob.forEach((index4) => {
          if (index4.blob_alarm_status === 1) {
            if (index4.blob_temperature_max >= index4.blob_threshold) {
              alarm = 2
            } else {
              alarm = 1
            }
          } else {
            alarm = 0
          }
          arr3.push({
            item: { number: index4.blob_number, name: 'blob' },
            temperature:
              index4.blob_temperature_max !== null
                ? index4.blob_temperature_max.toFixed(1)
                : 'n/a',
            setting: alarm,
          })
        })

        this.diagoalarmDesserts = arr3
        params = null
        arr3 = null
        alarm = null
        spots = null
        scopes = null
        lines = null
        blob = null
      } catch (error) {
        console.log("物件錯誤", error)
      }
      // })
      // .catch((error) => console.log('error from axios', error))
    },
    // 設定警報_資料處理
    submitForm() {
      var opendid = this.openid
      var opentype = this.opentype
      var status = this.checkbox1
      var threshold = this.threshold
      var thisSpots = this.tpmedata.spot
      var thislines = this.tpmedata.line
      var thisscpoes = this.tpmedata.scope
      var obj = null
      if (opentype === 'spot') {
        obj = thisSpots.find((o) => o.spot_number === opendid)
        var data = null
        data = {
          cam_id: this.focusCAMID,
          spot_number: parseInt(opendid),
          spot_alarm_status: status,
          spot_position: {
            Y: obj.spot_position.Y,
            X: obj.spot_position.X,
          },
          spot_threshold: threshold,
          spot_status: '0',
        }
        if (status === true) {
          data.spot_alarm_status = 1
        } else {
          data.spot_alarm_status = 0
        }
        // console.log(data)
        axios({
          method: 'post',
          url: `http://localhost:5002/api/monitor/object/change/spot`,
          data,
        })
          .then((response) => {
            this.dialog = false
            data = null
          })
          .catch((error) => console.log('error from axios', error))
      } else if (opentype === 'line') {
        obj = thislines.find((o) => o.line_number === opendid)
        data = {
          cam_id: this.focusCAMID,
          line_number: opendid,
          line_alarm_status: null,
          line_threshold: threshold,
          line_position_point_A: obj.line_position_point_A,
          line_position_point_B: obj.line_position_point_B,
          line_status: '0',
        }
        if (status === true) {
          data.line_alarm_status = 1
        } else {
          data.line_alarm_status = 0
        }
        // console.log(data)
        axios({
          method: 'post',
          url: `http://localhost:5002/api/monitor/object/change/line`,
          data,
        })
          .then((response) => {
            this.dialog = false
            data = null
          })
          .catch((error) => console.log('error from axios', error))
      } else if (opentype === 'scope') {
        obj = thisscpoes.find((o) => o.scope_number === opendid)
        // console.log(obj)
        data = {
          cam_id: this.focusCAMID,
          scope_number: parseInt(opendid),
          scope_alarm_status: null,
          scope_threshold: threshold,
          scope_position_BR: obj.scope_position_point_BR,
          scope_position_LT: obj.scope_position_point_LT,
          scope_status: '0',
        }
        if (status === true) {
          data.scope_alarm_status = 1
        } else {
          data.scope_alarm_status = 0
        }
        // console.log(data)
        axios({
          method: 'post',
          url: `http://localhost:5002/api/monitor/object/change/scope`,
          data,
        })
          .then((response) => {
            this.dialog = false
            data = null
          })
          .catch((error) => console.log('error from axios', error))
      }
      opendid = null
      opentype = null
      status = null
      threshold = null
      thisSpots = null
      thislines = null
      thisscpoes = null
      obj = null
    },
    // 警報視窗_按鈕開關
    alarmSwitch1(e) {
      if (e === 0) {
        this.checkbox1 = false
      } else if (e === 1) {
        this.checkbox1 = true
      }
    },
    // 開啟警報視窗
    opendialog(id, type) {
      // console.log(id, type)
      this.dialog = true
      this.openid = id
      this.opentype = type
      // axios({
      //   method: 'post',
      //   url: 'http://localhost:5002/api/monitor/object/data',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   data: JSON.stringify([
      //     {
      //       cam_id: this.focusCAMID,
      //     },
      //   ]),
      // })
      //   .then((paramse) => {
      //     // console.log(paramse.data)
      //     this.tpmedata = paramse.data
      //     var array = paramse.data
      //     var arr = []
      //     var obj = []
      //     if (type === 'spot') {
      //       arr = array.spot
      //       obj = arr.find((o) => o.spot_number === id)
      //       this.threshold = obj.spot_threshold
      //       if (obj.spot_alarm_status === 0) {
      //         this.checkbox1 = false
      //       } else {
      //         this.checkbox1 = true
      //       }
      //     } else if (type === 'line') {
      //       arr = array.line
      //       obj = arr.find((o) => o.line_number === id)
      //       this.threshold = obj.line_threshold
      //       if (obj.line_alarm_status === 0) {
      //         this.checkbox1 = false
      //       } else {
      //         this.checkbox1 = true
      //       }
      //     } else if (type === 'scope') {
      //       arr = array.scope
      //       obj = arr.find((o) => o.scope_number === id)
      //       this.threshold = obj.scope_threshold
      //       if (obj.scope_alarm_status === 0) {
      //         this.checkbox1 = false
      //       } else {
      //         this.checkbox1 = true
      //       }
      //     }
      //     this.dialogdata = obj
      //   })
      //   .catch((error) => console.log(error))
    },
    // 刷新對話框內容
    alarmlist(Date1, camid) {
      // console.log(Date1)
      var selectMonth = new Date(Date1)
      var selectMonth1 = this.Datecorrect('month', selectMonth)
      // console.log(selectMonth1)
      // this.wsTOway.send(JSON.stringify(
      //   {
      //     type: "alarmList",
      //     session: Math.random().toString(36).substr(2),
      //     cam_id: camid,
      //     table_timeselectStart: selectMonth1[0],
      //     table_timeselectStop: selectMonth1[1],
      //   },
      // ))

      // api
      axios({
        method: 'post',
        url: 'http://localhost:5002/api/alarm/list',
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify([
          {
            // cam_id: this.camid,
            cam_id: this.focusCAMID,
            table_timeselectStart: selectMonth1[0],
            table_timeselectStop: selectMonth1[1],
          },
        ]),
      })
        .then((events) => {
          var Date1 = this.alarmDate
          this.alarmCalendar = events.data
          var data = events.data
          var lastday = 0
          var today = 0
          var week = 0
          var month = 0
          var alarmlist = []
          data.forEach((index) => {
            // console.log(index.table_alarm_start)
            var tmp = new Date(index.table_alarm_start)
            // 計算昨日警報次數
            var lastCorr = this.Datecorrect('yesterday', Date1)
            var lastdaystart = new Date(lastCorr + ' 00:00:00')
            var lastdaystop = new Date(lastCorr + ' 23:59:59')
            if (tmp >= lastdaystart && tmp <= lastdaystop) {
              lastday = lastday + 1
            }
            // 計算今日警報次數
            var todayCorr = this.Datecorrect('today', Date1)
            var todaystart = new Date(todayCorr + ' 00:00:00')
            var todaystop = new Date(todayCorr + ' 23:59:59')
            if (tmp >= todaystart && tmp <= todaystop) {
              today = today + 1
            }
            // 計算本周警報次數
            var weekCorr = this.Datecorrect('week', Date1)
            var weekstart = new Date(weekCorr[0] + ' 00:00:00')
            var weekstop = new Date(weekCorr[1] + ' 23:59:59')
            if (tmp >= weekstart && tmp <= weekstop) {
              week = week + 1
            }
            // 計算本月警報次數
            var monthCorr = this.Datecorrect('month', Date1)
            var monthstart = new Date(monthCorr[0] + ' 00:00:00')
            var monthstop = new Date(monthCorr[1] + ' 23:59:59')
            if (tmp >= monthstart && tmp <= monthstop) {
              month = month + 1
            }
            // 警報紀錄
            var name = index.table_itemName.match(/^[a-z|A-Z]+/gi)
            var number = index.table_itemName.match(/\d+$/gi)
            // alarmlist.push({
            //   objcet: { name: name[0], number: number[0] },
            //   duration: durationCrr(
            //     index.table_alarm_start,
            //     index.table_alarm_stop
            //   ),
            //   temperature: index.table_max.toFixed(1),
            //   alertTemperature: index.table_alarm_threshold,
            //   time: index.table_alarm_start,
            // })
            var st = null
            if (index.table_alarm_stop === null) {
              st = '警報中'
            } else {
              st = '停止警報'
            }
            alarmlist.push({
              item: { name: name[0], number: number[0] },
              temperature: `${index.table_max.toFixed(1)}°C`,
              status: st,
              date: durationCrr(
                index.table_alarm_start,
                index.table_alarm_stop
              ),
              table_alarm_threshold: index.table_alarm_threshold,
              table_alarm_start: index.table_alarm_start,
            })
            alarmlist.sort(function (a, b) {
              if (a.time < b.time) {
                return 1 // 正數時，後面的數放在前面
              } else {
                return -1 // 負數時，前面的數放在前面
              }
            })
            alarmlist.sort(function (a, b) {
              if (a.date[0] !== '持續中') {
                return 1 // 正數時，後面的數放在前面
              } else {
                return -1 // 負數時，前面的數放在前面
              }
            })
            // 觸發時間為警報存在的時間(s)，開始時間為警報設定的時間
            tmp = null
            lastCorr = null
            lastdaystart = null
            lastdaystop = null
            todayCorr = null
            todaystart = null
            todaystop = null
            weekCorr = null
            weekstart = null
            weekstop = null
            monthCorr = null
            monthstart = null
            monthstop = null
            name = null
            number = null
            st = null
          })
          this.valueToday = today
          this.valueLastday = lastday
          this.valueThisWeek = week
          this.valueThisMonth = month
          // this.temps = alarmlist
          this.diagoalarmlogDesserts = alarmlist
          function durationCrr(start, stop) {
            if (stop !== null) {
              const nowtime1 = new Date(start)
              const startone1 = new Date(stop)
              const time1 = (startone1.getTime() - nowtime1.getTime()) * 0.001
              var duration = getDuration(time1)
              return [null, duration, 0]
            } else {
              const nowtime = new Date()
              const startone = new Date(start)
              const time = (nowtime.getTime() - startone.getTime()) * 0.001
              return ['持續中', getDuration(time.toFixed(0)), 1]
            }
          }
          function getDuration(second) {
            var days = Math.floor(second / 86400)
            var hours = Math.floor((second % 86400) / 3600)
            var minutes = Math.floor(((second % 86400) % 3600) / 60)
            var seconds = Math.floor(((second % 86400) % 3600) % 60)
            var duration = null
            if (second < 60) {
              duration = seconds + '秒'
            } else if (second >= 60 && second < 3600) {
              duration = minutes + '分' + seconds + '秒'
            } else if (second >= 3600 && second < 86400) {
              duration = hours + '時' + minutes + '分'
            } else if (second >= 86400) {
              duration = days + '天' + hours + '時'
            }
            return duration
          }
          selectMonth = null
          selectMonth1 = null
          Date1 = null
          data = null
          lastday = null
          today = null
          week = null
          month = null
          alarmlist = null
        }).catch((error) => console.log('error from axios', error))
    },
    // 刷新右側超溫警報
    refreshrigthalarm(Date1, camid) {
      // console.log("CamList", this.CamList);
      var len = this.CamList.length
      var step = 0
      var output = {
        over: [],
        normal: [],
      }
      // api
      var ex = () => {
        var selectMonth = new Date()
        var selectMonth1 = this.Datecorrect('month', selectMonth)
        if (step < len) {
          // console.log("取得", this.CamList[step].cam_id, selectMonth1[0], selectMonth1[1]);
          axios({
            method: 'post',
            url: 'http://localhost:5002/api/alarm/list',
            headers: {
              'Content-Type': 'application/json',
            },
            data: JSON.stringify([
              {
                // cam_id: this.camid,
                // cam_id: this.$route.query.cam,
                cam_id: this.CamList[step].cam_id,
                table_timeselectStart: selectMonth1[0],
                table_timeselectStop: selectMonth1[1],
              },
            ]),
          })
            .then((events) => {
              var data = events.data
              var datalen = data.length
              // var output = {
              //   over: [],
              //   normal: [],
              // }
              for (var i = 0; i < datalen; i++) {
                var arr = {
                  table_alarm_start: data[i].table_alarm_start,
                  camid: this.$route.query.cam,
                  table_itemName: data[i].table_itemName
                }
                if (data[i].table_alarm_stop === null || data[i].table_alarm_stop === "null") {
                  output.over.push(arr)
                } else {
                  output.normal.push(arr)
                }
                arr = null
              }
              // console.log(data);
              selectMonth = null
              selectMonth1 = null
              data = null
              datalen = null
              // output = null
              step++
              ex()
            }).catch((error) => console.log('error from axios', error))
          selectMonth = null
          selectMonth1 = null
        } else {
          // console.log("end s");
          this.overTemperatureAlarm = output
          output = null
          ex = null
          len = null
          step = null
        }
      }
      ex()
    },
    // 第三方程式方法載入
    initScript() {
      this.refreshrigthalarmInt = setInterval(() => {
        this.refreshrigthalarm()
      }, 8000)
      // 排序
      $(function () {
        $('#sortable').sortable({
          placeholder: 'ui-state-highlight',
          cursor: 'grabbing',
          // revert: true
        })
        $('#sortable').disableSelection()
      })
      this.initial()
      // this.tab = 'tab-2'
    },
    // 畫面設定
    screenseting(data, mode) {
      // 輪播
      var tmp = this.carouselAt
      var arr1 = ['5秒', '30秒', '60秒']
      if (mode === 'carouselTime' && data === 1) {
        tmp = tmp + 1
        if (tmp >= arr1.length) {
          tmp = 0
        }
        this.carouselTime = arr1[tmp]
      } else if (mode === 'carouselTime' && data === 0) {
        tmp = tmp - 1
        if (tmp < 0) {
          tmp = arr1.length - 1
        }
        this.carouselTime = arr1[tmp]
      }
      this.carouselAt = tmp
      // 色譜
      var tmp2 = this.paletteAT
      var arr2 = [
        ['/left-icons/palette/palette-iron.png', 'Iron'],
        // ['/left-icons/palette/palette-lava.png', 'Lava'],
        ['/left-icons/palette/palette.png', 'Rainbow'],
        ['/left-icons/palette/palette-gray.png', 'Gray'],
        // ['/left-icons/palette/palette-rainbow-hc.png', 'Rainbow HC'],
        // ['/left-icons/palette/palette-arctic.png', 'Arctiv'],
      ]
      if (mode === 'palette' && data === 1) {
        tmp2 = tmp2 + 1
        if (tmp2 >= arr2.length) {
          tmp2 = 0
        }
        this.palette = arr2[tmp2]
      } else if (mode === 'palette' && data === 0) {
        tmp2 = tmp2 - 1
        if (tmp2 < 0) {
          tmp2 = arr2.length - 1
        }
        this.palette = arr2[tmp2]
      }
      this.paletteAT = tmp2
      // console.log(tmp2)
      // console.log(arr2)
      // 影像
      var tmp3 = this.imageModeAT
      var arr3 = [
        ['/left-icons/image-mode/image-mode-thermal.png', 'Thermal'],
        ['/left-icons/image-mode/image-mode-thermal-msx.png', 'Theraml MSX'],
        [
          '/left-icons/image-mode/image-mode-digital-camera.png',
          'Digital Camera',
        ],
        ['/left-icons/image-mode/image-mode-marco.png', 'Marco'],
        ['/left-icons/image-mode/image-mode-thermal-fsx.png', 'Thermal FSX'],
      ]
      if (mode === 'imageMode' && data === 1) {
        tmp3 = tmp3 + 1
        if (tmp3 >= arr3.length) {
          tmp3 = 0
        }
        this.imageMode = arr3[tmp3]
      } else if (mode === 'imageMode' && data === 0) {
        tmp3 = tmp3 - 1
        if (tmp3 < 0) {
          tmp3 = arr3.length - 1
        }
        this.imageMode = arr3[tmp3]
      }
      this.imageModeAT = tmp3
      // this.carouselTime = ''
      // this.palette = ''
      // this.imageMode = ''
      tmp = null
      arr1 = null
      tmp2 = null
      arr2 = null
      tmp3 = null
      arr3 = null
    },
    // 放大鏡計算器
    zoom(level) {
      var zoom = this.zoomL
      var zoomer = $('.diago-tootip-photo-zoom')

      if (level === 1 && zoom <= 6) {
        this.zoomL = zoom + 1
      } else if (level === 0 && zoom > 0) {
        this.zoomL = zoom - 1
      }
      zoomer.css('background-size', (this.zoomL + 1) * 100 + '%')

      if (this.zoomL < 1) {
        this.zoomin = ''
        this.zoomout = 'zoom-disabled'
      } else if (this.zoomL > 6) {
        this.zoomin = 'zoom-disabled'
        this.zoomout = ''
      } else {
        this.zoomin = ''
        this.zoomout = ''
      }
      zoom = null
      zoomer = null
    },
    // 跳轉到指定監視
    VideoActive(page) {
      this.tab = page
      this.$router.push({
        query: { cam: this.focusCAMID, main: this.$route.query.main, tab: "tab-2", secondary: this.$route.query.secondary }
      }, () => {
        // window.location.reload()
      })
      // this.diagoOff()
    },
    // 測試假資料
    testdata() {
      // 連線裝置 假資料
      var arr = []
      var status01 = [true, false]
      for (var i = 0; i < Math.floor(Math.random() * 1000); i++) {
        arr.push({
          status: '/images/eye-on.png',
          id: `Cam-s1-${i}`,
          item: 'A棟CS-04配電盤',
          alarm: status01[Math.floor(Math.random() * 1)],
          update: '2022/06/06 14:07:08',
        })
      }
      this.connectDesserts = arr

      // 其他裝置 假資料
      var arr1 = []
      for (var j = 0; j < Math.floor(Math.random() * 1000); j++) {
        arr1.push({
          status: '0',
          id: `Cam-s1-${j}`,
          item: 'A棟CS-04配電盤',
          update: '2022/06/06 14:07:08',
        })
      }
      this.otherDevicesDesserts = arr1

      // 書籤 假資料
      var arr2 = []
      for (var z = 0; z < Math.floor(Math.random() * 1000); z++) {
        arr2.push({
          delete: '/images/trash.png',
          id: `${z}`,
          item: `Cam-s1-${z} A棟CS-04配電盤`,
          check: '查看',
        })
      }
      this.tagsDesserts = arr2
      // 警報設置 假資料
      // var arr3 = []
      // for (var zq = 0; zq < Math.floor(Math.random() * 16); zq++) {
      //   arr3.push({
      //     item: `${zq}`,
      //     temperature: `${zq}°C`,
      //     setting: `++`,
      //   })
      // }
      // this.diagoalarmDesserts = arr3
      // 警報紀錄 假資料
      // var arr4 = []
      // var mock = [2, 50]
      // var d = mock[Math.floor(Math.random() * 2)]
      // for (var zq1 = 0; zq1 < d; zq1++) {
      //   arr4.push({
      //     item: `${zq1}`,
      //     temperature: `${zq1}°C`,
      //     status: `已超溫`,
      //     date: '03:03:01',
      //     location: { X: '50.12', Y: '33.54' },
      //   })
      // }
      // // console.log(d)
      // this.diagoalarmlogDesserts = arr4
      // end
      arr = null
      status01 = null
      arr1 = null
      arr2 = null
    },
    // 開啟影像預覽
    openDialogImage() {
      // $('.diago-tootip-img').removeClass('dialog-close')
      this.diagotootipimg = true
    },
    // 關閉影像預覽
    offDialogImage() {
      // $('.diago-tootip-img').addClass('dialog-close')
      this.diagotootipimg = false
      this.diagotootipimgzoom = false
    },
    // 關閉對話窗
    diagoOff() {
      this.c_diago = 'custom-dialog dialog-close'
      this.focusCAMID = null
      // $('.custom-dialog').addClass('dialog-close')

      // $('.diago-tootip-img').addClass('dialog-close')
      this.diagotootipimg = false
      // $('.ui-state-cover-outline').each(function () {
      //   $(this).removeClass('ui-state-default-alarm-outline')
      // })
      // $('.ui-state-normal').each(function () {
      //   $(this).removeClass('ui-state-default-normal-outline')
      // })
      if (this.getRoiInterval !== null) {
        clearInterval(this.getRoiInterval)
      }
    },
    // 相機分頁控制
    controlPage(set) {
      var focusdiv = document.querySelectorAll('.col-windows-ul')[0]
      focusdiv = focusdiv.querySelectorAll(`ul`)[0]
      focusdiv.style.filter = 'blur(5px)'
      setTimeout(() => {
        focusdiv.style.filter = 'blur(0px)'
        focusdiv = null
      }, 400)
      this.focusCAMID = null
      this.c_diago = 'custom-dialog dialog-close'
      if (set === 'prev') {
        if (this.CamPage > 1) {
          this.CamPage = this.CamPage - 1
          this.e3 = this.CamPage
          // this.transition1(this.e4)
          this.transition1(this.e4)
        }
      } else if (set === 'next') {
        if (this.CamPage < this.CamPageTotle) {
          this.CamPage = this.CamPage + 1
          this.e3 = this.CamPage
          // this.transition1(this.e4)
          this.transition1(this.e4)
        }
      } else {
        this.CamPage = set
        // console.log(set)
        // this.transition1(this.e4)
        this.transition1(this.e4)
      }
    },
    // 取得相機列表
    getCameraList() {
      axios({
        method: 'post',
        url: 'http://127.0.0.1:5001/api/monitor/camera/list',
        // url: 'http://127.0.0.1:6189/api/monitor/camera/list',
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify([
          {
            main: this.menuData.main,
            secondary: this.menuData.secondary,
          },
        ]),
      })
        .then((params) => {
          this.CamList = params.data
          if (this.tab === 'tab-1') {
            this.$router.push({ query: { cam: this.CamList[0].cam_id, main: this.menuData.main, tab: 'tab-1', secondary: this.menuData.secondary } })
          }
          // console.log("xx" , this.$route.query.tab);
          this.transition1(2)
          // if (this.$route.query.tab === 'tab-1') {
          //   setTimeout(() => {
          //   //   console.log("xx", this.$router.cam);
          //   }, 3000)
          // }
          this.testdata()
        })
        .catch((err) => console.log(err))
    },
    // 切換分頁
    transition1(p) {
      var page = this.CamPage
      // console.log("xx", page);
      var output = {
        totle: null,
      }
      var start = 0
      var end = 0
      var pagesum = 4
      if (this.e4 === 2) {
        pagesum = 12
      }
      this.CamPageTotle = Math.ceil(this.CamList.length / pagesum)
      this.e3 = 1
      var page1 = []
      var arr = []
      for (var pw = 1; pw <= Math.ceil(p / pagesum); pw++) {
        page1.push(pw)
      }
      this.pages = page1
      end = pagesum * page - 1
      start = end - (pagesum - 1)
      // 溢出判斷
      var overflow = 0
      if (end >= this.CamList.length) {
        end = this.CamList.length - 1
        overflow = (pagesum - (end - start)) - 1
      }
      // end

      for (var i = start; i <= end; i++) {
        arr.push({
          cam_id: this.CamList[i].cam_id,
          name: this.CamList[i].name,
          alarm: true,
          overflow: true
        })
      }
      for (var z = 0; z < overflow; z++) {
        arr.push({
          cam_id: "",
          name: "",
          alarm: false,
          overflow: false
        })
      }
      // if (this.$route.query.tab === 'tab-2') {
      this.cam = arr
      // }
      output.totle = p
      // console.log(start, end, this.CamPageTotle, this.CamList.length, output, overflow, this.cam)
      // this.showDisplay(output)
      page = null
      output = null
      start = null
      end = null
      pagesum = null
      page1 = null
      arr = null
      overflow = null
    },
    // 分格畫面判斷
    transition(data) {
      this.CamPage = 1
      var page = this.CamPage
      this.c_diago = 'custom-dialog dialog-close'
      // $('.custom-dialog').addClass('dialog-close')
      var output = {
        totle: null,
      }
      var start = 0
      var end = 0
      var arr = []
      var page1 = []
      var pw = 1
      var CamListlen = this.CamList.length
      if (data === 0) {
        this.CamPageTotle = Math.ceil(this.CamList.length / 4)
        this.e3 = 1
        page1 = []
        for (pw = 1; pw <= Math.ceil(this.CamList.length / 4); pw++) {
          page1.push(pw)
        }
        this.pages = page1
        $('#sortable').sortable({
          placeholder: 'ui-state-highlight4',
          // revert: true
        })
        this.sortable = 'sortable4'
        this.ui_state = 'ui-state-default4'
        // 均分 4格
        end = 4 * page - 1
        start = end - 3
        for (var i = start; i <= end; i++) {
          if (i >= CamListlen) {
            arr.push({
              cam_id: "",
              name: "",
              alarm: false,
              overflow: false
            })
          } else {
            arr.push({
              cam_id: this.CamList[i].cam_id,
              name: this.CamList[i].name,
              alarm: true,
              overflow: true
            })
          }
        }
        this.cam = arr
        output.totle = 4
        // this.showDisplay(0)
      } else if (data === 1) {
        // console.log('oh ta')
        this.CamPageTotle = Math.ceil(this.CamList.length / 4)
        this.e3 = 1
        page1 = []
        for (pw = 1; pw <= Math.ceil(this.CamList.length / 4); pw++) {
          page1.push(pw)
        }
        this.pages = page1
        $('#sortable').sortable({
          placeholder: 'ui-state-highlight',
          // revert: true
        })
        this.sortable = 'sortable4-1'
        this.ui_state = 'ui-state-default'
        // 4分格
        end = 4 * page - 1
        start = end - 3
        for (var o = start; o <= end; o++) {
          if (o >= CamListlen) {
            arr.push({
              cam_id: "",
              name: "",
              alarm: false,
              overflow: false
            })
          } else {
            arr.push({
              cam_id: this.CamList[o].cam_id,
              name: this.CamList[o].name,
              alarm: true,
              overflow: true
            })
          }
        }
        this.cam = arr
        output.totle = 4
        // this.showDisplay(1)
      } else if (data === 2) {
        this.CamPageTotle = Math.ceil(this.CamList.length / 12)
        this.e3 = 1
        page1 = []
        for (pw = 1; pw <= Math.ceil(this.CamList.length / 12); pw++) {
          page1.push(pw)
        }
        this.pages = page1
        $('#sortable').sortable({
          placeholder: 'ui-state-highlight12',
          // revert: true
        })
        this.sortable = 'sortable12'
        this.ui_state = 'ui-state-default12'
        // 12分格
        end = 12 * page - 1
        start = end - 11
        for (var u = start; u <= end; u++) {
          if (u >= CamListlen) {
            arr.push({
              cam_id: "",
              name: "",
              alarm: false,
              overflow: false
            })
          } else {
            arr.push({
              cam_id: this.CamList[u].cam_id,
              name: this.CamList[u].name,
              alarm: true,
              overflow: true
            })
          }
        }
        this.cam = arr
        output.totle = 12
        // this.showDisplay(2)
        page = null
        output = null
        start = null
        end = null
        arr = null
        page1 = null
        pw = null
        CamListlen = null
      }
      // else if (data === 3) {
      //   $('#sortable').sortable({
      //     placeholder: 'ui-state-highlight100',
      //     // revert: true
      //   })

      //   this.sortable = 'sortable100'
      //   this.ui_state = 'ui-state-default100'
      //   // 12分格
      //   var arr1 = []
      //   for (var z = 1; z <= 24; z++) {
      //     arr1.push(i)
      //   }
      //   this.cam = arr1
      //   output.totle = 24
      //   // this.showDisplay(output)
      // }
    },
    // 載入監視影像
    showDisplay(output) {
      var se = true
      var fps = 0
      var nowdate = null
      var end = null
      var displayTotle = 4
      if (this.e4 === 0) {
        displayTotle = 4
      } else if (this.e4 === 1) {
        displayTotle = 4
      } else if (this.e4 === 2) {
        displayTotle = 12
      }

      var tempimg = null
      var tempimg2 = null
      if (this.wsListener.message !== null) {
        this.ws.removeEventListener("message", this.wsListener.message)
        this.wsListener.message = null
      }
      // webworker load img

      // webworker load ing end
      var messageEvent = (event) => {
        // this.ws.onmessage = (event) => {
        // var t = 0
        this.webStatus = '連線成功'
        var data = JSON.parse(event.data)
        // console.log(data);
        var cameraName = []
        Object.keys(data).forEach(key => {
          cameraName.push(key)
        })
        // streamingVIS
        var blob1 = getBlob(atob(data.cam_currentVIS), 'image/jpg')
        var objectURL1 = URL.createObjectURL(blob1)
        var canvas12 = document.getElementById(`streamingVIS`)
        URL.revokeObjectURL(tempimg)
        canvas12.src = objectURL1
        tempimg = objectURL1
        // streamingIR
        var blob2 = getBlob(atob(data.cam_currentIR), 'image/jpg')
        var objectURL2 = URL.createObjectURL(blob2)
        var canvas13 = document.getElementById(`streamingIR`)
        URL.revokeObjectURL(tempimg2)
        canvas13.src = objectURL2
        tempimg2 = objectURL2
        this.cam.forEach((value, index) => {
          try {
            if (value.overflow) {
              var val = data[value.cam_id]
              const canvas = document.getElementById(`test-cramre${index}`)
              // test
              // loader('data:image/jpeg;base64,' + val).then(img => {
              //     const ctx = canvas.getContext('2d');
              //     ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);
              // });
              // test end
              var img = new Image()
              var ctx = canvas.getContext('2d')
              img.src = 'data:image/jpeg;base64,' + val
              img.onload = function () {
                canvas.width = this.naturalWidth
                canvas.height = this.naturalHeight
                // URL.revokeObjectURL(url)
                ctx.drawImage(img, 0, 0, this.width, this.height)
                img = null
                ctx = null
              }
              var loaders = document.getElementById(`sleleton-loaders-custom${index}`)
              loaders.classList.add('ui-skeleton-loaders-display-none')
              val = null
              loaders = null
            }
          } catch (error) {
            console.log(error)
          }
          // }
          // t = t + 1
        })
        // cameraName.forEach((value, index) => {
        //   if (this.cam[index].cam_id === value) {
        //     console.log(this.cam[index].cam_id ,value)
        //     var val = data[value]
        //     // if (index < displayTotle) {
        //     // if (index === 3) {
        //     // if (index >= start1 && index < end1) {
        //     const canvas = document.getElementById(`test-cramre${index}`)
        //     var img = new Image()
        //     var ctx = canvas.getContext('2d')
        //     img.onload = function () {
        //       canvas.width = this.naturalWidth
        //       canvas.height = this.naturalHeight
        //       // URL.revokeObjectURL(url)
        //       ctx.drawImage(img, 0, 0, this.width, this.height)
        //     }
        //     // img.src = 'data:image/jpeg;base64,' + data[0].img
        //     img.src = 'data:image/jpeg;base64,' + val
        //     // img.src = 'http://localhost:6189/images.jpg?' + val.img
        //     var loaders = document.getElementById(`sleleton-loaders-custom${index}`)
        //     loaders.classList.add('ui-skeleton-loaders-display-none')
        //     // }
        //     // t = t + 1
        //   }
        // })
        var nowTime = new Date()
        nowTime = nowTime.getTime()
        if (se) {
          nowdate = new Date()
          nowdate.setSeconds(nowdate.getSeconds() + 1)
          end = nowdate.getTime()
          se = false
        }
        // console.log(end - nowTime, fps1)
        if (nowTime <= end) {
          fps = fps + 1
        } else {
          this.fps1 = fps
          this.datareques = fps * displayTotle
          se = true
          fps = 0
        }
        data = null
        cameraName = null
        blob1 = null
        objectURL1 = null
        blob2 = null
        objectURL2 = null
        canvas12 = null
        canvas13 = null
        nowTime = null
        // }
      }
      this.ws.addEventListener("message", messageEvent)
      this.wsListener.message = messageEvent
      function getBlob(byteString, mimeString) {
        var ab = new ArrayBuffer(byteString.length)
        var ia = new Uint8Array(ab)
        for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i)
        }
        var blob = new Blob([ab], { type: mimeString })
        return blob
      }
    },
    // 標籤標題隱藏
    CustomTabs(data) {
      if (data === 0) {
        this.tabcontent = ['超溫警報', '', '', '']
      } else if (data === 1) {
        this.tabcontent = ['', '連線項目', '', '']
      } else if (data === 2) {
        this.tabcontent = ['', '', '連線歷史', '']
      } else if (data === 3) {
        this.tabcontent = ['', '', '', '書籤']
      }
    },
    Datecorrect(type, selectDay) {
      var now = null
      if (selectDay != null) {
        now = new Date(selectDay) // 當前日期
      } else {
        now = new Date() // 當前日期
      }
      var nowDayOfWeek = now.getDay() // 今天本週的第幾天
      var nowDay = now.getDate() // 當前日
      var nowMonth = now.getMonth() // 當前月
      var nowYear = now.getYear() // 當前年
      nowYear += nowYear < 2000 ? 1900 : 0
      var lastMonthDate = new Date() // 上月日期
      lastMonthDate.setDate(1)
      lastMonthDate.setMonth(lastMonthDate.getMonth() - 1)
      // 格式化日期：yyyy-MM-dd
      function formatDate(date) {
        var myyear = date.getFullYear()
        var mymonth = date.getMonth() + 1
        var myweekday = date.getDate()
        if (mymonth < 10) {
          mymonth = '0' + mymonth
        }
        if (myweekday < 10) {
          myweekday = '0' + myweekday
        }
        return myyear + '-' + mymonth + '-' + myweekday
      }
      // 本周開始結束計算器
      if (type === 'week') {
        return [getWeekStartDate(), getWeekEndDate()]
      } else if (type === 'today') {
        return formatDate(now)
      } else if (type === 'yesterday') {
        now.setDate(now.getDate() - 1)
        return formatDate(now)
      } else if (type === 'month') {
        return [getMonthStartDate(), getMonthEndDate()]
      }
      function getMonthDays(myMonth) {
        var monthStartDate = new Date(nowYear, myMonth, 1)
        var monthEndDate = new Date(nowYear, myMonth + 1, 1)
        var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24)
        return days
      }
      function getWeekStartDate() {
        var weekStartDate
        if (nowDayOfWeek === 0) {
          weekStartDate = new Date(
            nowYear,
            nowMonth,
            nowDay - nowDayOfWeek + 1 - 7
          )
        } else {
          weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1)
        }
        return formatDate(weekStartDate)
      }
      // 本周end
      function getWeekEndDate() {
        var weekEndDate
        if (nowDayOfWeek === 0) {
          weekEndDate = new Date(
            nowYear,
            nowMonth,
            nowDay + (6 - nowDayOfWeek) + 1 - 7
          )
        } else {
          weekEndDate = new Date(
            nowYear,
            nowMonth,
            nowDay + (6 - nowDayOfWeek) + 1
          )
        }
        return formatDate(weekEndDate)
      }
      function getMonthStartDate() {
        var monthStartDate = new Date(nowYear, nowMonth, 1)
        return formatDate(monthStartDate)
      }
      // 獲得上月停止時候
      function getMonthEndDate() {
        var monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth))
        return formatDate(monthEndDate)
      }
      // 參考:https://www.796t.com/content/1547472435.html
    },
    numberToChinese(num) {
      const changeNum = [
        '零',
        '一',
        '二',
        '三',
        '四',
        '五',
        '六',
        '七',
        '八',
        '九',
      ]
      const unit = ['', '十', '百', '千', '萬']
      num = parseInt(num)
      const getWan = (temp) => {
        const strArr = temp.toString().split('').reverse()
        var newNum = ''
        for (var i = 0; i < strArr.length; i++) {
          newNum =
            (i === 0 && strArr[i] === 0
              ? ''
              : i > 0 && strArr[i] === 0 && strArr[i - 1] === 0
                ? ''
                : changeNum[strArr[i]] + (strArr[i] === 0 ? unit[0] : unit[i])) +
            newNum
        }
        return newNum
      }
      const overWan = Math.floor(num / 10000)
      var noWan = num % 10000
      if (noWan.toString().length < 4) noWan = '0' + noWan
      return overWan ? getWan(overWan) + '萬' + getWan(noWan) : getWan(num)
      // 參考:https://www.tddx.net/post-543.html
    },
    destroyFunction() {
      this.wsblock = false
      if (this.sendCameraIdtoInt1 !== null) {
        clearInterval(this.sendCameraIdtoInt1)
        this.sendCameraIdtoInt1 = null
      }
      if (this.refreshrigthalarmInt !== null) {
        clearInterval(this.refreshrigthalarmInt)
        this.refreshrigthalarmInt = null
      }
      if (this.restartDisplay !== null) {
        clearTimeout(this.restartDisplay)
      }
      if (this.restartDisplay1 !== null) {
        clearTimeout(this.restartDisplay1)
      }
      if (this.wsListener2.close !== null) {
        this.webs1.removeEventListener("close", this.wsListener2.close)
        this.wsListener2.close = null
      }
      if (this.wsListener2.message !== null) {
        this.webs1.removeEventListener("message", this.wsListener2.message)
        this.wsListener2.message = null
      }
      if (this.webs1 !== null) {
        // this.webs1.close()
        this.webs1 = null
      }
      // console.log("asd",this.wsListener);
      if (this.wsListener.close !== null) {
        this.ws.removeEventListener("close", this.wsListener.close)
        this.wsListener.close = null
      }
      if (this.wsListener.message !== null) {
        this.ws.removeEventListener("message", this.wsListener.message)
        this.wsListener.message = null
      }
      if (this.ws !== null) {
        // this.ws.close()
        this.ws = null
      }
      if (this.wsListener3.close !== null) {
        this.wsTOway.removeEventListener("close", this.wsListener3.close)
        this.wsListener3.close = null
      }
      if (this.wsListener3.message !== null) {
        this.wsTOway.removeEventListener("message", this.wsListener3.message)
        this.wsListener3.message = null
      }
      if (this.wsTOway !== null) {
        // this.wsTOway.close()
        this.wsTOway = null
      }
      if (this.autoSelectCamINT !== null) {
        clearInterval(this.autoSelectCamINT)
        this.autoSelectCamINT = null
      }
      if (this.getRoiInterval !== null) {
        clearInterval(this.getRoiInterval)
        this.getRoiInterval = null
        console.log('Destroy:getRoiInterval')
      }
      if (this.socket.length > 0) {
        this.socket.forEach(function (s) {
          s.disconnect()
        })
      }
      if (this.InternetLIST.length > 0) {
        this.InternetLIST.forEach(function (s) {
          clearInterval(s)
        })
      }
      this.cam = []
      // for (var key in this.$data) {
      //   console.log("remove : " + [key]);
      //   this[key] = null;
      // }
    }
  },
  // 脫鉤(nuxt生命週期)
  beforeDestroy() {
    this.destroyFunction()
    for (var key in this.$data) {
      // console.log("remove : " + [key]);
      this[key] = null;
    }
  },
}
</script>

<style>
.v-text-field__slot label {
  font-size: 12px !important;
}

.v-select__selections {
  padding: 0 8px;
}

.connect-cover .text-start {
  padding: 0px 0px !important;
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
  padding: 8px 16px;
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

.camera-bg {
  background: #fff;
  height: 830px;
  padding: 16px;
  border-radius: 3px !important;
}

.cam-canvas {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

/* 對話視窗 */
.diago-contnet-cover {
  height: 100%;
  overflow-y: auto;
}

.custom-dialog {
  width: 488px;
  height: auto;
  position: fixed;
  top: 64px;
  left: 39%;
  background-color: #fff;
  z-index: 99999;
  box-shadow: 0px 0px 8px 4px rgb(108 108 108 / 27%);
  border-radius: 3px;
  transition: all 0.1s;
  opacity: 1;
  /* overflow-y: auto; */
  /* transform: translate(-50%, -50%); */
}

.draggable-bar {
  width: 70px;
  height: 5px;
  position: absolute;
  top: 13px;
  left: 50%;
  background-color: #80898c;
  border-radius: 3px;
  transform: translate(-50%, -50%);
  transition: all 0.3s;
  cursor: move;
}

.draggable-bar:hover {
  width: 100px;
}

#diagoHover {
  cursor: grab;
  /* margin: 0px 0px 11px 0px; */
  /* transition: outline .3s; */
}

#diagoHover:hover {
  outline: 3px #cccccc solid;
}

.dialog-close {
  pointer-events: none;
  opacity: 0 !important;
}

.diago-head {
  display: grid;
  /* grid-template-columns: 10% 86%; */
  grid-template-columns: 10% 77% 12%;
  color: #4f5e62;
}

.diago-point-cover {
  display: flex;
  justify-content: center;
  padding: 7px 0 0 0;
}

.diago-point {
  width: 15px;
  height: 15px;
  background-color: #8ab284;
  border-radius: 15px;
}

.diago-title img {
  width: 30px;
  margin: 0 0 0 9px;
}

.diago-title>div {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.arrow-diago {
  background-color: #fff !important;
  box-shadow: unset !important;
  border: 0px #d7dbdb solid;
  border-radius: 3px;
  width: 42px;
  min-width: 42px !important;
  height: 30px !important;
}

.diago-close {
  margin-top: 10px;
}

.diago-close-icon {
  background-color: #fff !important;
  box-shadow: unset !important;
  border: 0px #d7dbdb solid !important;
  width: 100% !important;
  min-width: 0 !important;
}

.diago-alarm-cover {
  display: grid;
  grid-template-columns: 137px 330px;
  padding: 10px;
}

.diago-border1 {
  border: 1px #d7dbdb solid;
  border-radius: 3px;
  padding: 5px;
  max-height: 276px;
}

.diago-border2 {
  border: 1px #d7dbdb solid;
  border-radius: 3px;
  padding: 5px;
}

.diago-title {
  color: #4f5e62;
  font-weight: bold;
}

.custom-thead {
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 1;
}

.diago-table-title {
  color: #4f5e62;
  font-size: 13px;
  border-bottom: 1px #000000 solid;
}

.diago-alarm-cover1 {
  display: grid;
  grid-template-columns: 113px 354px;
  padding: 10px;
}

.diago-tootip-img {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 69%;
  height: 50%;
  background-color: #fff;
  box-shadow: 0px 0px 8px 4px rgb(108 108 108 / 27%);
  border-radius: 3px;
  transform: translate(-50%, -50%);
  z-index: 999;
  display: flex;
  background-color: #fff;
  opacity: 1;
  transition: all 0.3s;
}

.diago-tootip-img-zoom {
  width: 98%;
  height: 73%;
}

.diago-tootip-img-e {
  width: 50%;
  position: relative;
}

.diago-tootip-btn {
  position: absolute;
  bottom: 13px;
  right: 16px;
  background-color: #fff;
  border-radius: 3px;
  padding: 10px;
  width: 42px;
  height: 42px;
  opacity: 1;
  transition: all 0.3s;
  cursor: pointer;
}

.diago-tootip-btn-close {
  opacity: 0 !important;
}

.diago-tootip-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000000b3;
  z-index: 998;
  opacity: 1;
  transition: all 0.3s;
}

.alert-off-cu {
  width: 28px !important;
  height: 28px !important;
  background-color: #d7dbdb;
}

.diago-tootip-close {
  width: 30px;
}

.diago-tootip-head {
  display: flex;
  align-items: center;
  position: absolute;
  top: -33px;
  background-color: #fff;
  width: 100%;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  box-shadow: 1px -8px 6px 0px rgb(108 108 108 / 27%);
  z-index: 99;
  cursor: all-scroll;
}

.alarm-btn-icon {
  width: 28px !important;
  height: 28px !important;
  background-color: #f2f4f4;
}

.diago-tootip-title {
  font-weight: bold;
  color: #4f5e62;
}

.diago-tootip-photo {
  padding: 10px;
}

.diago-cus>div {
  overflow-y: scroll !important;
  overflow-x: hidden !important;
}

.diago-tootip-photo>img {
  opacity: 0;
}

.diago-tootip-photo-zoom {
  width: 97%;
  height: 97%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  background: url(/images/1657246562560.png) no-repeat center center;
  background-size: 100%;
  transition: background-size 0.5s;
  overflow: hidden;
  cursor: grab;
}

.zoom-cover {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
}

.zoom-cover-btu {
  background-color: #fff0 !important;
  box-shadow: unset !important;
}

.zoom-disabled {
  pointer-events: none;
  opacity: 0.7;
}

.donut-flex {
  display: flex;
  align-items: center;
  justify-content: center;
}

.donut-txt {
  color: #4f5e62;
  font-size: 10px;
}

.reset1 {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  float: right;
}

.reset1>span {
  color: #4f5e62;
  font-size: 8px;
}

.diago-btn-cover {
  display: flex;
  justify-content: flex-end;
}

.diago-btn {
  width: 95px;
  height: 24px;
}

.diago-btn-font {
  letter-spacing: 0px;
  color: #fff;
}

/* 對話視窗 end */
.align-items-c {
  /* display: flex; */
  align-items: center;
}

.cam-grid4 {
  display: grid;
  width: 100%;
  grid-template-columns: 38% 38%;
  justify-content: center;
}

.cam-grid4>div {
  margin-right: 5px;
}

.cam-grid4-olny {
  display: grid;
  grid-template-columns: 338px;
  margin-right: 7px;
  grid-template-rows: 261px 261px 261px;
  align-items: center;
}

.cam-grid12 {
  display: grid;
  width: 100%;
  grid-template-columns: 25% 25% 25% 25%;
  justify-content: center;
}

.cam-grid12>div {
  margin-right: 5px;
}

.cam-only {
  width: 100%;
}

.arrow-custom {
  background-color: #fff !important;
  box-shadow: unset !important;
  border: 1px #d7dbdb solid;
  border-radius: 3px;
  width: 42px;
  min-width: 42px !important;
  height: 43px !important;
}

.menu-title {
  color: #4f5e62;
  text-align: center;
  font-size: 15px;
}

.pixi-cramre {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.menu-top {
  /* display: flex;
  justify-content: space-between;
  align-items: center; */
  display: grid;
  align-items: center;
  grid-template-columns: 57px 150px 64px 150px;
}

.menu-top-setting {
  display: flex;
  align-items: center;
}

.menu-top-setting label {
  font-size: 16px !important;
}

.btu-setting {
  background-color: #fff !important;
  box-shadow: unset !important;
}

.custom-g-select {
  display: grid;
  grid-template-columns: 21.1% 18% 25% 9% 27%;
  align-items: center;
  height: 55px;
}

.custom-g-select>div:first-child {
  margin-left: 0px !important;
}

.custom-g-select>div {
  margin-left: 5px;
}

.custom-select {
  height: 40px;
  border: 1px #d7dbdb solid;
  color: #4f5e62;
  /* flex-direction: row-reverse; */
}

.transition-img1 {
  /* margin: 0px 0px 0px 3px; */
  transform: translate(7px, 0px);
}

.transition-img {
  /* margin: 0px 0px 0px 3px; */
  transform: translate(2px, -2px);
}

.custom-select div {
  font-size: 12px;
}

.custom-select>div>div {
  box-shadow: unset !important;
  padding-right: 3px !important;
  padding-left: 3px !important;
}

.search-cover {
  display: grid;
  grid-template-columns: 158px 221px 41px;
  align-items: center;
}

.search-input {
  border: 1px #d7dbdb solid;
  height: 40px;
  padding: 5px 8px;
  margin: 8px 0px;
  border-radius: 3px;
}

.search-input .v-text-field--rounded>.v-input__control>.v-input__slot {
  /* padding:0px 10px !important; */
  border-left: 1px #d7dbdb solid;
  border-radius: 0px !important;
  padding: 0 0px 0px 5px;
  margin: -2px 0px 0px 0px;
}

.search-input .v-label {
  background-color: #fff;
}

.search-explore {
  display: flex;
  align-items: center;
  justify-content: end;
}

.custom-cards-tags {
  box-shadow: unset !important;
}

.custom-tabs-color {
  color: rgb(155, 18, 18);
}

.custom-tabs>.v-tabs-bar {
  border-bottom: 1px #d7dbdb solid !important;
}

.custom-tabs>.v-tabs-bar div {
  font-weight: 900;
  font-size: 17px;
}

.tab-icon {
  margin-right: 5px;
  width: 25px !important;
}

.custom-tabs .v-tab {
  padding: 5px !important;
  min-width: 0px !important;
  max-width: none !important;
}

.Overtemperature-Alert {
  display: grid;
  grid-template-rows: 182px 407px;
}

.Alert-title {
  font-size: 17px;
  color: #4f5e62;
  letter-spacing: 1.4px;
}

.Alert-txt {
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  height: 83%;
  font-size: 12px;
}

.Alert-txt2 {
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  height: 100%;
}

.Alert-txt-alarm {
  color: #de8788;
  font-size: 12px;
}

.Alert-font {
  color: #4f5e62;
  font-size: 12px;
}

.Alert-background {
  background-color: #f0f2f3;
}

.Alert-background1 {
  background-color: #f7e1e1;
}

.mags-cover {
  height: 585px;
}

._8ab284 {
  background-color: #8ab284;
}

._de8788 {
  background-color: #de8788;
}

._d7dbdb {
  background-color: #d7dbdb;
}

.mags-point {
  width: 12px;
  height: 12px;
  border-radius: 12px;
  margin: 5px 9px 0 0px;
}

.connect-cover {
  display: grid;
  grid-template-rows: 295px 295px;
}

.connect-icon {
  display: flex;
  justify-content: center;
  align-items: center;
}

.connect-cover img {
  width: 30px;
  height: 30px;
}

.status-open {
  width: 10px;
  height: 10px;
  background-color: #8ab284;
  border-radius: 10px;
}

.status-off {
  width: 10px;
  height: 10px;
  background-color: #de8788;
  border-radius: 10px;
}

.tagsId {
  /* width: 50px; */
  /* min-width: 30px; */
  padding: 0px 0px 0px 0px !important;
  margin: 0px 0px 0px 0px !important;
}

.trash-icon {
  display: flex;
  justify-content: center;
  align-items: center;
}

.trash-icon img {
  width: 30px;
  height: 30px;
}

/* 畫面設定 */
.setting-screen-cover {
  display: grid;
  grid-template-columns: 72px 10px 174px 10px;
  align-items: center;
  font-size: 15px;
}

.setting-screen-title {
  color: #4f5e62;
}

.setting-screen-arrow-left,
.setting-screen-arrow-right {
  cursor: pointer;
}

.setting-screen-arrow-left img,
.setting-screen-arrow-right img {
  width: 0.9em;
}

.setting-screen-arrow-right {
  transform: rotateY(180deg);
}

.setting-screen-input {
  border: 1px solid #00000029;
  border-radius: 3px;
  margin: 2px 5px;
  color: #4f5e62;
  text-align: center;
  position: relative;
}

.setting-screen-icon {
  position: absolute;
  width: 12%;
  top: 2px;
  left: 8px;
}

.setting-screen-btn {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 15px;
}

.setting-screen-btn button {
  margin: 2px;
  background-color: #99a1a3;
  padding: 1px 11px;
  color: #fff;
  border-radius: 3px;
  transition: background-color 0.3s;
}

.setting-screen-btn button:hover {
  background-color: #7e8385;
}

.setting-screen-btn button:active {
  background-color: #727677;
}

/* 分隔畫面統整設定 */
.ui-none {
  pointer-events: none;
}

.ui-state-null {
  background-color: #99a1a3;
}

.ui-state-cover {
  width: 100%;
  height: 0;
  position: relative;
  padding-bottom: 75%;
}

.ui-state-default-footer {
  position: absolute;
  background-color: #0000008f;
  /* top: 0; */
  z-index: 1;
  left: 0;
  color: #fff;
  bottom: 0;
  width: 100%;
  padding: 2% 0px;
  display: flex;
  align-items: center;
}

.reload {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(255 255 255);
  z-index: 99;
  opacity: 0;
  transition: all 0.5s;
  pointer-events: none;
}

.ui-state-default-point {
  background-color: #8ab284;
  width: 10px;
  height: 10px;
  border-radius: 10px;
  margin: 0px 10px;
}

.ui-state-default-point1 {
  background-color: #de8788;
  width: 10px;
  height: 10px;
  border-radius: 10px;
  margin: 0px 10px;
}

.ui-state-default-point2 {
  background-color: #e5e7e7;
  width: 10px;
  height: 10px;
  border-radius: 10px;
  margin: 0px 10px;
}

.ui-state-default-alarm {
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 0;
  left: 0;
  background-color: #de8788ad;
  z-index: 2;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.1s;
}

.ui-state-default-alarm>div {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  animation: neon 0.6s infinite alternate;
}

.ui-state-default-alarm>div img {
  width: 8%;
}

@keyframes neon {
  0% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
}

.ui-state-default-alarm-outline {
  outline: 5px rgb(222 135 136) solid;
}

.ui-state-default-normal-outline {
  outline: 5px #99a1a3 solid;
}

.ui-state-default-normal-outline>.ui-state-default-footer {
  background-color: #99a1a3;
}

.ui-state-default-alarm-outline>.ui-state-default-alarm {
  height: 15%;
  top: unset;
  background-color: rgba(222, 135, 136, 0.67843);
  bottom: 0;
}

.ui-state-default-alarm-outline>.ui-state-default-alarm div {
  display: none !important;
}

.ui-state-default-alarm-outline>.ui-state-default-alarm>div {
  justify-content: flex-end;
  font-size: 23px;
  padding: 0 1em 0 0px;
}

.ui-state-default-alarm-outline>.ui-state-default-alarm>div>img {
  width: 7%;
}

.ui-empty {}

/* 可移動排序 (分4格) */
#diagoHover canvas {
  pointer-events: none;
}

#sortable {
  transition: all 0.5s;
}

.sortable4-1 {
  list-style-type: none;
  margin: 16px 3px;
  padding: 0 !important;
  width: 100%;
  height: 100%;
}

.ui-state-highlight {
  width: 334px;
  height: 250px;
  background-color: rgb(83, 144, 223);
  margin: 11px;
}

.ui-state-default {
  position: relative;
  width: 334px;
  height: 250px;
  background-color: rgb(150, 150, 150);
  margin: 0px 0px 11px 0px;
  /* margin: 11px; */
}

.ui-state-default:last-child .ui-state-default-alarm-outline>.ui-state-default-alarm {
  height: 9% !important;
}

.ui-state-highlight:last-child {
  width: 1032px;
  height: 764px;
  z-index: 9;
  transform: translate(339px, -783px);
}

.ui-state-default:last-child {
  width: 1032px;
  height: 775px;
  z-index: 9;
  margin: 0px 0px 11px 4px !important;
  transform: translate(339px, -783px);
}

.ui-state-default-footer>span {
  font-size: 1em;
}

.ui-state-default:last-child .ui-state-default-footer>span {
  font-size: 1.2em;
}

.ui-state-default:last-child .ui-state-default-point {
  width: 24px;
  height: 24px;
  border-radius: 24px;
  margin: 0px 19px;
}

.ui-state-default:last-child .ui-state-default-alarm>div {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 44px;
  width: 100%;
}

.ui-state-default:last-child .ui-state-default-alarm>div img {
  width: 4%;
}

.ui-state-default:last-child .ui-state-default-alarm-outline>.ui-state-default-alarm>div {
  justify-content: flex-end;
  font-size: 40px;
  padding: 0 2em 0 0px;
}

.ui-state-default:last-child .ui-state-default-alarm-outline>.ui-state-default-alarm>div>img {
  width: 4%;
}

/* 可移動排序 (均分4格) */
.sortable4 {
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 100%;
  display: grid;
  grid-template-columns: 534px 534px;
  align-items: center;
  justify-content: center;
}

.ui-state-highlight4 {
  position: relative;
  background-color: rgb(83, 144, 223);
  width: 528px;
  height: 403px;
}

.ui-state-default4 {
  margin: 0px 0px 7px 0px !important;
  position: relative;
  width: 99%;
}

/* .ui-state-default4 > div {
  position: absolute;
  background-color: #fff;
  top: 0;
  z-index: 99;
  left: 0;
} */
/* 可移動排序 (均分12格) */
.sortable12 {
  list-style-type: none;
  margin: 0;
  padding: 12px 0px 0px 0 !important;
  width: 100%;
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  align-items: center;
  justify-content: center;
}

.ui-state-highlight12 {
  position: relative;
  background-color: rgb(83, 144, 223);
  width: 335px;
  height: 258px;
}

.ui-state-default12 {
  margin: 0px 0px 4px 0px;
  position: relative;
  width: 99%;
}

/* .ui-state-default12 > div {
  position: absolute;
  background-color: #fff;
  top: 0;
  z-index: 99;
  left: 0;
} */
/* 可移動排序 (均分24格) */
.sortable100 {
  list-style-type: none;
  margin-top: 34px;
  padding: 0 !important;
  width: 100%;
  display: grid;
  grid-template-columns: 17% 17% 17% 17% 17% 17%;
  align-items: center;
  justify-content: center;
}

.ui-state-highlight100 {
  position: relative;
  background-color: rgb(83, 144, 223);
  width: 228px;
  height: 178px;
}

.ui-state-default100 {
  position: relative;
  width: 99%;
}

/* .ui-state-default100 > div {
  position: absolute;
  background-color: #fff;
  top: 0;
  z-index: 99;
  left: 0;
} */
.busstop {
  font-size: 40px;
}

/* 自訂標籤 */
.custom-tab-items {
  background-color: #fff0 !important;
}

#custom-tab-items {
  background-color: #fff0 !important;
}

/* 自訂載入框架 */
.ui-skeleton-loaders {
  position: absolute;
  top: 0;
  left: 0;
  background: rgb(44, 44, 44);
  /* background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%); */
  background: linear-gradient(102deg, #d7d7d7 11%, #f3f3f3 28%, #d7d7d7 33%);
  background-size: 200% 100%;
  z-index: 1;
  width: 100%;
  height: 100%;
  animation: 1s shine linear infinite;
  pointer-events: none;
  opacity: 1;
  transition: opacity 0.2s;
  transition-delay: 0.5s;
}

.ui-skeleton-loaders-display-none {
  opacity: 0;
  /* display: none; */
}

.ui-skeleton-loaders.loaders-disabled {
  display: none;
}

@keyframes shine {
  to {
    background-position-x: -200%;
  }
}

.v-badge__badge {
  min-width: 18px !important;
  width: 18px !important;
  height: 18px !important;
  display: flex !important;
  align-items: center;
  justify-content: center;
}

/* Track */
.v-data-table__wrapper::-webkit-scrollbar-track {
  margin: 30px 0px 10px 0 !important;
}

.cardtitle {
  line-height: 2.5em;
  font-weight: 900;
  color: #505f62;
}

.cardtitle1 {
  font-weight: 900;
  color: #505f62;
  padding-top: 8px;
}

.cardtitle2 {
  line-height: 2.5em;
  font-weight: 900;
  color: #000;
}

.alarm-dialog-contert {
  border: 1px solid #d7dbdc;
  border-radius: 5px;
  display: grid;
  grid-template-columns: 47% 53%;
}

.alarm-dialog-input {
  width: 90px;
}

.alarm-btn-icon {
  width: 28px;
  height: 28px;
  background-color: #f2f4f4;
}

.right-btn {
  background-color: #f2f4f4;
  width: 2.25em;
  height: 2.25em;
}

.right-btn1 {
  background-color: #f3cccf;
  width: 2.25em;
  height: 2.25em;
}

.custom-tables-bgc {
  background-color: #f3cccf;
}

.consoleMjpg {
  /* display: none; */
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000d9;
  z-index: 9999;
  width: 250px;
  color: #fff;
  padding: 6px;
  pointer-events: none;
}

.consoleMjpg span {
  color: #00ff0d;
}
</style>