<template>
  <div class="fluid mt-3">
    <div id="DoNotOperate"></div>
    <div class="consoleMjpg2 d-none" id="consoleMjpg2">
      偵錯模式:(SUPER PRO MODEL)<br />
      ROI刷新率(fps):<span id="fps1">{{ roifpstmp }}</span><br />
      總資料傳輸量/秒:<span id="datatotle">-</span><br />
      連項狀況:<span id="datas">-</span>
      <v-btn @click="clearKonva">清除</v-btn>
    </div>
    <v-img class="bgimg" src="bgimg.png" height="93.2vh" />
    <!-- 操作對話窗 -->
    <v-dialog v-model="serverMessageStatus" persistent max-width="320">
      <v-card class="add-area-txt">
        <v-card-title class="text-h5"> {{ serverMessage }} </v-card-title>
        <div class="px-3 mb-2">
          <v-divider></v-divider>
        </div>
        <v-card-text class="pb-0">
          <div class="d-flex align-end">
            <div style="width: 105px">
              元件類別</div>
            <v-select :items="GroupNameitems" v-model="GroupName" label="" dense single-line hide-details></v-select>
          </div>
          <v-radio-group v-model="radioaddarea" class="mt-3 custom-radio">
            <v-radio value="newarea">
              <template v-slot:label>建立新監測區域</template>
            </v-radio>
            <v-radio value="push" disabled>
              <template v-slot:label>
                <div style="width: 137px">加入既有監測區域</div>
                <div style="width: 103px">
                  <v-select v-model="radioSelectarea" :items="radioListarea" label="請選取區域" dense single-line hide-details>
                  </v-select>
                </div>
              </template>
            </v-radio>
          </v-radio-group>
        </v-card-text>
        <v-card-actions class="justify-center">
          <div>
            <v-btn class="add-area-btn" depressed @click="ScopeAdditionConfirmation(0)">
              返回
            </v-btn>
            <v-btn class="add-area-btn" depressed @click="ScopeAdditionConfirmation(1)">
              確定
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- 操作對話窗 end -->
    <!-- 刪除視窗 -->
    <v-dialog v-model="deleteWindows" persistent max-width="320">
      <v-card class="add-area-txt">
        <v-card-text class="pb-0" style="height:150px;">
          <div class="text-center d-flex justify-center
                                                                                               align-center"
            style="height:100%;">
            是否刪除
            xxx
            物件?
          </div>
        </v-card-text>
        <v-card-actions class="justify-center">
          <div>
            <v-btn class="add-area-btn" @click="deleteWindows = false" depressed>
              否
            </v-btn>
            <v-btn color="error" depressed @click="deleteWindows = false">
              刪除
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- ROI Group 視窗 -->
    <div class="ROIGroup pa-3" id="ROIGroup" :class="RoiAlarmWindowStat ? '' : 'RoiAlarmWindowStat'">
      <v-row>
        <v-col cols="6">
          <v-card class="pa-3" :class="RoiAlarmWindowFocus ? 'ROIGroup-alarm-card1' : 'ROIGroup-alarm-card'">
            <div class="ROIGroup-txt">
              <div class="ROIGroup-title">元件</div>
              <div>ID : 20220829001</div>
            </div>
            <div class="ROIGroup-txt">
              <div class="ROIGroup-title">異常原因 : 異常熱源</div>
              <div>監測區域 : 04</div>
            </div>
            <v-img width="280" src="/Mask Group 16.png" class="my-2"></v-img>
            <div class="ROIGroup-txt">
              <div>即時溫度 : 50.0℃</div>
            </div>
            <div class="ROIGroup-txt">
              <div>最高:250.0℃/最低:130.5℃/平均:130.5℃</div>
            </div>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card>
            <div class="ROIGroup-list" id="ROIGroup-list" @scroll="blobMessageScroll">
              <div class="pa-3" v-for="i in 10" :key="i">
                <div class="ROIGroup-txt">
                  <div class="ROIGroup-title">元件</div>
                  <div>ID : 20220829001</div>
                </div>
                <div class="ROIGroup-txt">
                  <div class="ROIGroup-title">異常原因 : 異常熱源</div>
                  <div>監測區域 : 04</div>
                </div>
                <v-img width="280" src="/Mask Group 16.png" class="my-2"></v-img>
                <div class="ROIGroup-txt">
                  <div>即時溫度 : 50.0℃</div>
                </div>
                <div class="ROIGroup-txt">
                  <div>最高:250.0℃/最低:130.5℃/平均:130.5℃</div>
                </div>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <!-- ROI Group 視窗 end-->
    <!-- 詢問是否保留AI ADD ROI 對話窗 -->
    <v-dialog v-model="AiAddRoiMassage" persistent max-width="320">
      <v-card class="add-area-txt">
        <v-card-title class="text-h5"> 系統訊息 </v-card-title>
        <div class="px-3 mb-2">
          <v-divider></v-divider>
        </div>
        <v-card-text class="pb-0">
          <div class="d-flex align-end my-5">
            將對選取物件進行什麼動作?
          </div>
        </v-card-text>
        <v-card-actions class="justify-center">
          <div>
            <v-btn class="add-area-btn" depressed @click="actionScopeClick(0)">
              返回
            </v-btn>
            <v-btn class="add-area-btn" depressed @click="actionScopeClick(1)">
              刪除
            </v-btn>
            <v-btn class="add-area-btn" depressed @click="actionScopeClick(2)">
              保留
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- 操作對話窗 end -->
    <!-- Blob Select Guoup 對話窗 -->
    <v-dialog v-model="selectGroupWindows" persistent max-width="320">
      <v-card class="add-area-txt">
        <v-card-title class="text-h5"> 執行變更元件類別 </v-card-title>
        <div class="px-3 mb-2">
          <v-divider></v-divider>
        </div>
        <v-card-text class="pb-0">
          <div class="d-flex align-end my-2">
            目前該物件類別:{{ tempGuoupName }}
          </div>
          <div class="d-flex align-end mb-3">

            <div style="width: 105px">
              類別選擇</div>
            <v-select :items="GroupNameitems" v-model="GroupName" label="" dense single-line hide-details></v-select>
          </div>
        </v-card-text>
        <v-card-actions class="justify-center">
          <div>
            <v-btn class="add-area-btn" depressed @click="selectGroupClick(0)">
              取消
            </v-btn>
            <v-btn class="add-area-btn" depressed @click="selectGroupClick(1)">
              確定
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- 操作對話窗 end -->
    <!-- 左側浮動按鈕---------------------------------------------------------------------------------------------------- -->
    <div class="box">
      <v-card class="mt-6 drawer" elevation="10" color="#59595b">
        <v-sheet class="arrow" elevation="5" color="#59595b"></v-sheet>
        <!-- 監測工具monitoring tools-------------------------------------------------------------------------------- -->
        <p class="subtitle text-center"><br />監測<br />項目</p>
        <!-- 點spot -->
        <v-tooltip right class="tips">
          <template #activator="{ on, attrs }">
            <v-btn class="left-btn mx-3" elevation="6" icon v-bind="attrs" v-on="on" @click="addspot()">
              <img alt="spot" src="/left-icons/spot.png" width="20em" />
            </v-btn>
            <!-- <v-btn x-small icon class="btn reset" color="#9BA3A5">
                    <v-icon x-small class="icon">mdi-restore</v-icon>
                  </v-btn> -->
          </template>
          <span>點</span>
        </v-tooltip>
        <!-- 線line -->
        <v-tooltip right class="tips">
          <template #activator="{ on, attrs }">
            <v-btn class="left-btn mx-3 mt-3" elevation="6" icon v-bind="attrs" v-on="on" @click="addline()">
              <img alt="line" src="/left-icons/line.png" width="15em" />
            </v-btn>
          </template>
          <span>直線</span>
        </v-tooltip>
        <!-- 曲線spline -->
        <!-- <v-tooltip right class="tips">
          <template #activator="{ on, attrs }">
            <v-btn class="left-btn mx-3 mt-3" elevation="6" icon v-bind="attrs" v-on="on" @click="addspline()">
              <img alt="line" src="/left-icons/spline.png" width="12em" />
            </v-btn>
          </template>
          <span>曲線</span>
        </v-tooltip> -->
        <!-- 矩形rectangle -->
        <v-tooltip right class="tips">
          <template #activator="{ on, attrs }">
            <v-btn class="left-btn mx-3 mt-3" elevation="6" icon v-bind="attrs" v-on="on" @click="addscope()">
              <img alt="rectangle" src="/left-icons/rectangle.png" width="18em" />
            </v-btn>
          </template>
          <span>矩形</span>
        </v-tooltip>
        <!-- 多邊形custom scope -->
        <!-- <v-tooltip right class="tips">
          <template #activator="{ on, attrs }">
            <v-btn id="add" class="left-btn mx-3 mt-3" elevation="6" icon v-bind="attrs" v-on="on"
              @click="addCustomScope()">
              <img alt="custom-scope" src="/left-icons/custom-scope.png" width="18em" />
            </v-btn>
          </template>
          <span>多邊形</span>
        </v-tooltip> -->

        <!-- 曲面多邊形spline scope -->
        <v-tooltip right class="tips">
          <template #activator="{ on, attrs }">
            <v-btn id="add" class="left-btn mx-3 my-3" elevation="6" icon v-bind="attrs" v-on="on"
              @click="blobAddSwitch()">
              <img alt="custom-scope" src="/left-icons/polygon_spline.png" width="16em" />
            </v-btn>
          </template>
          <span>曲面多邊形</span>
        </v-tooltip>
        <v-divider></v-divider>
        <!-- 影像呈現image presentation------------------------------------------------------------------------------ -->
        <p class="subtitle text-center"><br />影像<br />呈現</p>
        <!-- 影像模式image mode -->
        <!-- <v-speed-dial :direction="direction_imageMode" :transition="transition_imageMode">
          <template #activator>
            <v-tooltip right class="tips">
              <template #activator="{ on, attrs }">
                <v-btn v-model="fab_imageMode" elevation="6" class="left-btn mx-3" icon v-bind="attrs" v-on="on">
                  <v-icon v-if="fab_imageMode"> mdi-close </v-icon>
                  <img v-else alt="palette" src="/left-icons/image-mode/image-mode.png" width="21em" />
                </v-btn>
              </template>
              <span>影像模式</span>
            </v-tooltip>
          </template>
          <v-tooltip top class="tips">
            <template #activator="{ on, attrs }">
              <v-btn class="mt-2" elevation="6" x-small dark fab v-bind="attrs" v-on="on">
                <img alt="image-mode-thermal" src="/left-icons/image-mode/image-mode-thermal.png" width="22em" />
              </v-btn>
            </template>
            <span>Thermal</span>
          </v-tooltip>
          <v-tooltip top class="tips">
            <template #activator="{ on, attrs }">
              <v-btn class="mt-2" elevation="6" x-small dark fab v-bind="attrs" v-on="on">
                <img alt="image-mode-thermal-msx" src="/left-icons/image-mode/image-mode-thermal-msx.png" width="22em" />
              </v-btn>
            </template>
            <span>Thermal MSX</span>
          </v-tooltip>
          <v-tooltip top class="tips">
            <template #activator="{ on, attrs }">
              <v-btn class="mt-2" elevation="6" x-small dark fab v-bind="attrs" v-on="on">
                <img alt="image-mode-digital-camera" src="/left-icons/image-mode/image-mode-digital-camera.png"
                  width="22em" />
              </v-btn>
            </template>
            <span>Digital Camera</span>
          </v-tooltip>
          <v-tooltip top class="tips">
            <template #activator="{ on, attrs }">
              <v-btn class="mt-2" elevation="6" x-small dark fab v-bind="attrs" v-on="on">
                <img alt="image-mode-marco" src="/left-icons/image-mode/image-mode-marco.png" width="22em" />
              </v-btn>
            </template>
            <span>Marco</span>
          </v-tooltip>
          <v-tooltip top class="tips">
            <template #activator="{ on, attrs }">
              <v-btn class="mt-2" elevation="6" x-small dark fab v-bind="attrs" v-on="on">
                <img alt="image-mode-thermal-fsx" src="/left-icons/image-mode/image-mode-thermal-fsx.png" width="22em" />
              </v-btn>
            </template>
            <span>Thermal FSX</span>
          </v-tooltip>
        </v-speed-dial> -->
        <!-- 色譜模式palette -->
        <v-speed-dial :direction="direction_palette" :transition="transition_palette">
          <template #activator>
            <v-tooltip right class="tips">
              <template #activator="{ on, attrs }">
                <v-btn v-model="fab_palette" class="left-btn mx-3 my-3" elevation="6" icon v-bind="attrs" v-on="on">
                  <v-icon v-if="fab_palette"> mdi-close </v-icon>
                  <img v-else alt="palette" src="/left-icons/palette/palette.png" width="18em" />
                </v-btn>
              </template>
              <span>色譜模式</span>
            </v-tooltip>
          </template>
          <v-tooltip top class="tips">
            <template #activator="{ on, attrs }">
              <v-btn class="" elevation="6" x-small dark fab v-bind="attrs" v-on="on" @click="chromatographyModeselect('Iron')">
                <img alt="palette-iron" src="/left-icons/palette/palette-iron.png" width="24em" />
              </v-btn>
            </template>
            <span>Iron</span>
          </v-tooltip>
          <!-- <v-tooltip top class="tips">
            <template #activator="{ on, attrs }">
              <v-btn class="" elevation="6" x-small dark fab v-bind="attrs" v-on="on">
                <img alt="palette-lava" src="/left-icons/palette/palette-lava.png" width="24em" />
              </v-btn>
            </template>
            <span>Lava</span>
          </v-tooltip> -->
          <v-tooltip top class="tips">
            <template #activator="{ on, attrs }">
              <v-btn class="" elevation="6" x-small dark fab v-bind="attrs" v-on="on" @click="chromatographyModeselect('Gray')">
                <img alt="palette-gray" src="/left-icons/palette/palette-gray.png" width="24em" />
              </v-btn>
            </template>
            <span>Gray</span>
          </v-tooltip>
          <v-tooltip top class="tips">
            <template #activator="{ on, attrs }">
              <v-btn class="" elevation="6" x-small dark fab v-bind="attrs" v-on="on" @click="chromatographyModeselect('Rainbow')">
                <img alt="palette-rainbow" src="/left-icons/palette/palette-rainbow.png" width="24em" />
              </v-btn>
            </template>
            <span>Rainbow</span>
          </v-tooltip>
          <!-- <v-tooltip top class="tips">
            <template #activator="{ on, attrs }">
              <v-btn class="" elevation="6" x-small dark fab v-bind="attrs" v-on="on">
                <img alt="palette-rainbow-hc" src="/left-icons/palette/palette-rainbow-hc.png" width="24em" />
              </v-btn>
            </template>
            <span>Rainbow HC</span>
          </v-tooltip> -->
          <!-- <v-tooltip top class="tips">
            <template #activator="{ on, attrs }">
              <v-btn class="" elevation="6" x-small dark fab v-bind="attrs" v-on="on">
                <img alt="palette-arctic" src="/left-icons/palette/palette-arctic.png" width="20em" />
              </v-btn>
            </template>
            <span>Arctic</span>
          </v-tooltip> -->
        </v-speed-dial>
        <!-- <v-divider></v-divider> -->

        <!-- 計算工具calibration tools------------------------------------------------------------------------------ -->
        <!-- <p class="subtitle text-center"><br />校正<br />工具</p> -->

        <!-- 計算calibration -->
        <!-- <v-speed-dial :direction="direction_calibration" :transition="transition_calibration">
          <template #activator>
            <v-tooltip right class="tips">
              <template #activator="{ on, attrs }">
                <v-btn v-model="fab_calibration" class="left-btn mx-3" elevation="6" icon v-bind="attrs" v-on="on">
                  <v-icon v-if="fab_calibration"> mdi-close </v-icon>
                  <img v-else alt="palette" src="/left-icons/calibration/calibration.png" width="16em" />
                </v-btn>
              </template>
              <span>校正</span>
            </v-tooltip>
          </template>
          <v-tooltip top class="tips">
            <template #activator="{ on, attrs }">
              <v-btn class="mt-2" elevation="6" x-small dark fab v-bind="attrs" v-on="on">
                <img alt="" src="/left-icons/calibration/calibration-now.png" width="23em" />
              </v-btn>
            </template>
            <span>立即校正</span>
          </v-tooltip>
          <v-tooltip top class="tips">
            <template #activator="{ on, attrs }">
              <v-btn class="mt-2" elevation="6" x-small dark fab v-bind="attrs" v-on="on">
                <img alt="" src="/left-icons/calibration/calibration-auto.png" width="20em" />
              </v-btn>
            </template>
            <span>自動校正</span>
          </v-tooltip>
          <v-tooltip top class="tips">
            <template #activator="{ on, attrs }">
              <v-btn class="mt-2" elevation="6" x-small dark fab v-bind="attrs" v-on="on">
                <img alt="" src="/left-icons/calibration/calibration-10min.png" width="20em" />
              </v-btn>
            </template>
            <span>每10分鐘</span>
          </v-tooltip>
          <v-tooltip top class="tips">
            <template #activator="{ on, attrs }">
              <v-btn class="mt-2" elevation="6" x-small dark fab v-bind="attrs" v-on="on">
                <img alt="" src="/left-icons/calibration/calibration-30min.png" width="20em" />
              </v-btn>
            </template>
            <span>每30分鐘</span>
          </v-tooltip>
          <v-tooltip top class="tips">
            <template #activator="{ on, attrs }">
              <v-btn class="mt-2" elevation="6" x-small dark fab v-bind="attrs" v-on="on">
                <img alt="" src="/left-icons/calibration/calibration-60min.png" width="20em" />
              </v-btn>
            </template>
            <span>每60分鐘</span>
          </v-tooltip>
          <v-tooltip top class="tips">
            <template #activator="{ on, attrs }">
              <v-btn class="mt-2" elevation="6" x-small dark fab v-bind="attrs" v-on="on">
                <img alt="" src="/left-icons/calibration/calibration-manual.png" width="20em" />
              </v-btn>
            </template>
            <span>手動校正</span>
          </v-tooltip>
          <v-tooltip top class="tips">
            <template #activator="{ on, attrs }">
              <v-btn class="mt-2" elevation="6" x-small dark fab v-bind="attrs" v-on="on">
                <img alt="" src="/left-icons/calibration/calibration-stop.png" width="20em" />
              </v-btn>
            </template>
            <span>停止校正</span>
          </v-tooltip>
        </v-speed-dial> -->
        <!-- 照明light -->
        <!-- <v-speed-dial :direction="direction_light" :transition="transition_light">
          <template #activator>
            <v-tooltip right class="tips">
              <template #activator="{ on, attrs }">
                <v-btn v-model="fab_light" class="left-btn mx-3 mt-3" elevation="6" icon v-bind="attrs" v-on="on"
                  @click="light">
                  <v-icon v-if="fab_light"> mdi-close </v-icon>
                  <img v-else id="light_img" alt="palette" src="/left-icons/light/light-off.png" width="14em" />
                </v-btn>
              </template>
              <span>照明</span>
            </v-tooltip>
          </template>
        </v-speed-dial> -->
        <!-- 自動對焦autoFocus -->
        <!-- <v-speed-dial :direction="direction_autofocus" :transition="transition_autofocus">
          <template #activator>
            <v-tooltip right class="tips">
              <template #activator="{ on, attrs }">
                <v-btn v-model="fab_autofocus" class="left-btn mx-3 my-3" elevation="6" icon v-bind="attrs" v-on="on">
                  <v-icon v-if="fab_autofocus"> mdi-close </v-icon>
                  <img v-else alt="palette" src="/left-icons/autofocus/autofocus.png" width="16em" />
                </v-btn>
              </template>
              <span>自動對焦</span>
            </v-tooltip>
          </template>
          <v-tooltip top class="tips">
            <template #activator="{ on, attrs }">
              <v-btn class="" elevation="6" x-small dark fab v-bind="attrs" v-on="on">
                <img alt="palette-iron" src="/left-icons/autofocus/autofocus-focus-further.png" width="18em" />
              </v-btn>
            </template>
            <span>遠景</span>
          </v-tooltip>
          <v-tooltip top class="tips">
            <template #activator="{ on, attrs }">
              <v-btn class="" elevation="6" x-small dark fab v-bind="attrs" v-on="on">
                <img alt="palette-lava" src="/left-icons/autofocus/autofocus-focus-closer.png" width="18em" />
              </v-btn>
            </template>
            <span>近景</span>
          </v-tooltip>
          <v-tooltip top class="tips">
            <template #activator="{ on, attrs }">
              <v-btn class="" elevation="6" x-small dark fab v-bind="attrs" v-on="on">
                <img alt="palette-gray" src="/left-icons/autofocus/autofocus-autofocus.png" width="18em" />
              </v-btn>
            </template>
            <span>自動對焦</span>
          </v-tooltip>
        </v-speed-dial> -->
        <!-- <v-divider></v-divider> -->
        <!-- 影像調整image adjustment ------------------------------------------------------------------------------ -->
        <!-- <p class="subtitle text-center"><br />影像<br />調整</p> -->
        <!-- 全螢幕fullscreen -->
        <!-- <v-tooltip right class="tips">
          <template #activator="{ on, attrs }">
            <v-btn class="left-btn mx-3" elevation="6" icon v-bind="attrs" v-on="on">
              <img class="" alt="spot" src="/left-icons/fullscreen.png" width="19em" />
            </v-btn>
          </template>
          <span>全螢幕</span>
        </v-tooltip> -->
        <!-- 影像快照snapshot -->
        <!-- <v-tooltip right class="tips">
          <template #activator="{ on, attrs }">
            <v-btn class="left-btn mx-3 mt-3" elevation="6" icon v-bind="attrs" v-on="on">
              <img class="" alt="line" src="/left-icons/snapshot.png" width="19em" />
            </v-btn>
          </template>
          <span>影像快照</span>
        </v-tooltip> -->
        <!-- 串流暫停freeze/持續unfreeze -->
        <!-- <v-tooltip right class="tips">
          <template #activator="{ on, attrs }">
            <v-btn class="left-btn mx-3 mt-3" icon v-bind="attrs" elevation="6" v-on="on" @click="freeze">
              <img id="unfreeze" alt="rectangle" src="/left-icons/freeze/unfreeze.png" width="9em" />
            </v-btn>
          </template>
          <span>串流暫停/持續</span>
        </v-tooltip> -->

        <!-- 隱藏/顯示監測項目hide/show overlay -->
        <!-- <v-tooltip right class="tips">
          <template #activator="{ on, attrs }">
            <v-btn class="left-btn mx-3 my-3" elevation="6" icon v-bind="attrs" v-on="on">
              <img class="" alt="rectangle" src="/left-icons/hide-overlay.png" width="18em" />
            </v-btn>
          </template>
          <span>隱藏/顯示監測項目</span>
        </v-tooltip> -->
      </v-card>
    </div>

    <!-- ------------------------------------------------------------------
      ------------------------------------------------------------------
      ------------------------------------------------------------------ -->

    <div class="box-2">
      <!-- 左畫面影像顯示----------------------------------------------------------------------------------------------- -->
      <div class="mr-3">
        <!-- <v-col cols="12" md="7" style="border: 1px solid red"> -->
        <v-card class="mt-3 ml-6" rounded="md" elevation="6">
          <!-- <v-responsive :aspect-ratio="4 / 3"> -->
          <v-card-text>
            <div class="frame-hard">
              <!-- <v-btn class="arrow-diago" rounded tile width="15px" @click="backPage" :to="`/?cam=${$route.query.cam}&main=${$route.query.main}&secondary=${$route.query.secondary}&tab=tab-1`"> -->
              <v-btn class="arrow-diago" rounded tile width="15px" @click="backPage">

                <img class="" alt="line" src="/images/arrow-right.png" width="30%" />
              </v-btn>
              <div class="frame-hard-cam">
                <div class="frame-hard-cam-status"></div>
                相機名稱
              </div>
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <div v-bind="attrs" v-on="on">
                    <v-select v-model="selectList" :items="cameraList" :menu-props="{ bottom: true, offsetY: true }"
                      class="camSelect" label="Solo field" solo dense hide-details @change="updateSelectDate"></v-select>
                  </div>
                </template>
                <span>上次更新時間：2022/05/22 19:30:00</span>
              </v-tooltip>
              <!-- <div>上次更新時間：2022/05/22 19:30:00</div> -->
              <div class="w-100 text-right d-flex justify-end align-center">
                <!-- LIVE -->
                <div class="Live-canvas d-flex align-center mr-2">
                  <div class="Live-points" :style="
                    liveStatus
                      ? 'background: #e37475;'
                      : 'background: #d7dbdb;'
                  "></div>
                  Live
                </div>
                <!-- 畫面物件顯示設定 -->
                <v-menu :close-on-content-click="false" offset-y min-width="350px" nudge-bottom="8px" nudge-left="317px"
                  max-height="300px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-tooltip top>
                      <template v-slot:activator="{ on: tooltip }">
                        <v-btn class="btu-setting mr-2" fab x-small v-bind="attrs" v-on="{ ...tooltip, ...on }"
                          :ripple="false">
                          <img class="" alt="line" src="/images/eye-on.png" width="47px" />
                        </v-btn>
                      </template>
                      <span>畫面物件顯示設定</span>
                    </v-tooltip>
                  </template>

                  <v-card class="pa-3" color="rgb(255 255 255 / 100%)">
                    <div class="d-flex justify-space-between align-center mb-2">
                      <div>手動監測區域顯示</div>
                      <div class="">
                        <div class="switch-field py-0 my-0 px-1">
                          <input id="radio-one-email-notice1" type="radio" name="switch-one1" value="yes"
                            :checked="displayObject1 ? true : false" @click="displayObject1 ? true : false" />
                          <label for="radio-one-email-notice1">ON</label>
                          <input id="radio-two-email-notice1" type="radio" name="switch-one1" value="no"
                            :checked="displayObject1 ? false : true" @click="displayObject1 ? true : false" />
                          <label for="radio-two-email-notice1">OFF</label>
                        </div>
                      </div>
                    </div>
                    <div class="d-flex justify-space-between align-center mb-2">
                      <div>自動監測區域顯示</div>
                      <div class="">
                        <div class="switch-field py-0 my-0 px-1">
                          <input id="radio-one-email-notice2" type="radio" name="switch-one2" value="yes"
                            :checked="displayObject2 ? true : false" @click="displayObject2 ? true : false" />
                          <label for="radio-one-email-notice2">ON</label>
                          <input id="radio-two-email-notice2" type="radio" name="switch-one2" value="no"
                            :checked="displayObject2 ? false : true" @click="displayObject2 ? true : false" />
                          <label for="radio-two-email-notice2">OFF</label>
                        </div>
                      </div>
                    </div>
                    <div class="d-flex justify-space-between align-center mb-2">
                      <div>僅自動監測區域超溫顯示</div>
                      <div class="">
                        <div class="switch-field py-0 my-0 px-1">
                          <input id="radio-one-email-notice3" type="radio" name="switch-one3" value="yes"
                            :checked="displayObject3 ? true : false" @click="displayObject3 ? true : false" />
                          <label for="radio-one-email-notice3">ON</label>
                          <input id="radio-two-email-notice3" type="radio" name="switch-one3" value="no"
                            :checked="displayObject3 ? false : true" @click="displayObject3 ? true : false" />
                          <label for="radio-two-email-notice3">OFF</label>
                        </div>
                      </div>
                    </div>
                    <div class="d-flex justify-space-between align-center">
                      <div>溫標顯示</div>
                      <div class="">
                        <div class="switch-field py-0 my-0 px-1">
                          <input id="radio-one-email-notice4" type="radio" name="switch-one4" value="yes"
                            :checked="displayObject4 ? true : false" @click="displayObject4 ? true : false" />
                          <label for="radio-one-email-notice4">ON</label>
                          <input id="radio-two-email-notice4" type="radio" name="switch-one4" value="no"
                            :checked="displayObject4 ? false : true" @click="displayObject4 ? true : false" />
                          <label for="radio-two-email-notice4">OFF</label>
                        </div>
                      </div>
                    </div>
                    <v-divider class="my-2"></v-divider>
                    <div class="d-flex justify-space-between align-center">
                        <div>高解析影像顯示</div>
                        <div class="">
                          <div class="switch-field py-0 my-0 px-1">
                            <input id="radio-one-email-notice5" type="radio" name="switch-one5" value="yes"
                              :checked="displayObject5 ? true : false" @click="srshwish(true)" />
                            <label for="radio-one-email-notice5">ON</label>
                            <input id="radio-two-email-notice5" type="radio" name="switch-one5" value="no"
                              :checked="displayObject5 ? false : true" @click=" srshwish(false)" />
                            <label for="radio-two-email-notice5">OFF</label>
                          </div>
                        </div>
                      </div>
                  </v-card>
                </v-menu>
                <!-- 影像對照圖 -->
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn class="btu-setting mr-1" fab x-small @click="
                      autoDisplayStatus
                        ? (autoDisplayStatus = false)
                        : (autoDisplayStatus = true)
                    " :ripple="false" v-bind="attrs" v-on="on">
                      <img class="" alt="line" src="/images/photo.png" width="28px" />
                    </v-btn>
                  </template>
                  <span>影像對照圖</span>
                </v-tooltip>
                <div class="Imagecomparison" v-show="autoDisplayStatus">
                  <v-card class="pa-3" color="rgb(255 255 255 / 100%)">
                    <div class="d-flex mb-2 align-center">
                      <div style="visibility: hidden;">自動框選ROI顯示</div>
                      <div style="visibility: hidden;">
                        <div class="switch-field py-0 my-0 px-1">
                          <input id="radio-one-email-noticeRoi" type="radio" name="switch-oneRoi" value="yes"
                            :checked="autoDisplay ? true : false" @click="autoDisplay ? true : false" />
                          <label for="radio-one-email-noticeRoi">ON</label>
                          <input id="radio-two-email-noticeRoi" type="radio" name="switch-oneRoi" value="no"
                            :checked="autoDisplay ? false : true" @click="autoDisplay ? true : false" />
                          <label for="radio-two-email-noticeRoi">OFF</label>
                        </div>
                        <!-- <v-spacer></v-spacer> -->
                      </div>
                      <div class="auto-close">
                        <v-btn class="diago-close-icon" rounded outlined @click="autoDisplayStatus = false">
                          <img class="" alt="line" src="/images/close.png" width="70%" />
                        </v-btn>
                      </div>
                    </div>
                    <div class="Imagecomparison-konva" id="Imagecomparison-konva">
                      <v-stage :config="ImagecomparisonKonva">
                        <v-layer ref="Imagecomparisonlayer">
                          <v-image :config="ImagecomparisonKonvaImageConfig" ref="ImagecomparisonKonva" @mouseenter="
                            (events) => {
                              imagecomparisonImageMove(events, 0)
                            }
                          " @mousemove="
  (events) => {
    imagecomparisonImageMove(events, 1)
  }
" @mouseleave="
  (events) => {
    imagecomparisonImageMove(events, 2)
  }
" @mousedown="
  (events) => {
    zoomstatus = true
    imagecomparisonImageMove(events, 'start')
  }
" @mouseup="zoomstatus = false" @wheel="(event) =>
  event.evt.deltaY > 0 ? zoomfunction(0) : zoomfunction(1)" />
                          <v-image :config="zoomin" @click="zoomfunction(1)" />
                          <v-image :config="zoomout" @click="zoomfunction(0)" />
                        </v-layer>
                      </v-stage>
                    </div>
                  </v-card>
                </div>
                <!-- 歷史監測區域編輯紀錄 -->
                <v-menu :close-on-content-click="false" offset-y min-width="350px" nudge-bottom="8px" nudge-left="317px">
                  <!-- <v-tooltip top> -->
                  <template v-slot:activator="{ on, attrs }">
                    <v-tooltip top>
                      <template v-slot:activator="{ on: tooltip }">
                        <v-btn class="btu-setting" fab x-small v-bind="attrs" v-on="{ ...tooltip, ...on }"
                          :ripple="false">
                          <img class="" alt="line" src="/images/story-icon.png" width="28px" />
                        </v-btn>
                      </template>
                      <span>歷史監測區域編輯紀錄</span>
                    </v-tooltip>
                  </template>
                  <!-- </v-tooltip> -->

                  <v-card class="px-3" color="rgb(255 255 255 / 100%)">
                    <v-tabs color="#4f5e62" class="custom-tabs1" @change="CustomTabs">
                      <v-tab>
                        <img class="tab-icon1" src="/right-icons/spot2.png" />
                        {{ tabcontent[0] }}
                      </v-tab>
                      <!-- <v-tab>
                        <img class="tab-icon1" src="/right-icons/blob.png" />
                        {{ tabcontent[1] }}
                      </v-tab> -->
                      <v-tab-item>
                        <div class="frame-hard-cam-log">
                          <div class="mt-1 mr-2 px-4 py-1" v-for="ie in 100" :key="ie">
                            2022/07/27 03:01 新增區域 新增區域6
                          </div>
                        </div>
                      </v-tab-item>
                      <v-tab-item>
                        <div class="frame-hard-cam-log">
                          <div class="mt-1 mr-2 px-4 py-1" v-for="ie in 100" :key="ie">
                            2022/07/27 03:01 USER01 新增區域6
                          </div>
                        </div>
                      </v-tab-item>
                    </v-tabs>
                  </v-card>
                </v-menu>
                <!-- 參數設定 -->
                <v-menu :close-on-content-click="false" offset-y min-width="158px" nudge-bottom="8px" nudge-left="155px">
                  <!-- <v-tooltip top> -->
                  <template v-slot:activator="{ on, attrs }">
                    <v-tooltip top>
                      <template v-slot:activator="{ on: tooltip }">
                        <v-btn class="btu-setting ml-1" fab x-small v-bind="attrs" v-on="{ ...tooltip, ...on }"
                          :ripple="false" @click="queryCameraInfo">
                          <img class="" alt="line" src="/images/setting-icon.png" width="27px" />
                        </v-btn>
                      </template>
                      <span>參數設定</span>
                    </v-tooltip>
                  </template>
                  <!-- </v-tooltip> -->

                  <v-card class="pa-3" color="rgb(255 255 255 / 100%)">
                    <div class="frame-hard-setting">
                      <div class="
                                                                                                                        frame-hard-setting-top
                                                                                                                        d-flex
                                                                                                                        justify-space-between
                                                                                                                        mb-2
                                                                                                                      ">
                        <div class="d-flex align-center ml-3 frame-hard-btu">
                          <img class="mr-1" src="images/connect-normal.png" width="20px" />
                          連線ON
                        </div>
                        <div class="d-flex align-center mr-3 frame-hard-btu" @click="
                          frameSettingChange
                            ? (frameSettingChange = false)
                            : (frameSettingChange = true)
                        ">
                          <img class="mr-1" src="images/change-pen.png" width="20px" />
                          編輯

                        </div>
                      </div>
                      <div class="frame-content px-2">
                        <div class="justify-space-between align-center my-1 py-1" v-for="(item, index) in screenSettings"
                          :key="index">
                          <div class="pl-1">{{ item.name }}</div>
                          <div v-if="!item.check" :class="item.name === '環境濕度' ? 'd-flex' : ''" style="width: 55px">
                            <input v-model="item.value" :class="frameSettingChange ? 'ml-1' : 'ml-1 openedit'" type="number" :style="item.name==='環境濕度' ? 'width: 22px':'width: 33px'"
                              :disabled="item.name === '穿透率' ? true : frameSettingChange" />
                              <div v-if="item.name==='環境濕度'">%</div>
                          </div>
                          <div v-else>
                            <v-checkbox :ripple="false" class="ma-0" hide-details dense
                              v-model="TransmissiondispalyStatus" :disabled="frameSettingChange"></v-checkbox>
                          </div>
                        </div>
                        <template v-if="TransmissiondispalyStatus">
                          <div class="justify-space-between align-center my-1 py-1"
                            v-for="(item, index) in Transmissiondispaly" :key="index">
                            <div class="pl-1">{{ item.name }}</div>
                            <div v-if="!item.check" style="width: 55px">
                              <input v-model="item.value" class="ml-1" type="number" style="width: 33px"
                                :disabled="frameSettingChange" />
                            </div>
                            <div v-else>
                              <v-checkbox :ripple="false" class="ma-0" hide-details dense v-model="item.value"
                                :disabled="frameSettingChange"></v-checkbox>
                            </div>
                          </div>
                        </template>
                      </div>
                      <div class="text-center mt-2">
                        <v-btn depressed small @click="queryCameraInfo" :loading="queryCameraInfoloading">refresh</v-btn>
                        <v-btn depressed small @click="sendCameraInfo" :loading="queryCameraInfoloading">SAVE</v-btn>
                      </div>
                    </div>
                  </v-card>
                </v-menu>
              </div>
            </div>
            <div class="frame mt-1">
              <div class="reload1"></div>
              <div id="cover" class="cover">
                <div class="cover1">
                  <div class="d-none" id="rtsp-status"></div>
                  <div class="d-none" id="rtsp-stay"></div>
                  <!-- <img
                    id="image"
                    src="/loadingBG.png"
                  /> -->
                  <div class="testWebScoket" id="">
                    <canvas id="testWebScoket" />
                  </div>
                  <div id="image" @mousemove="movepoint">
                    <v-stage ref="stage" :config="configKonva" @mousedown="handleStageMouseDown"
                      @touchstart="handleStageMouseDown" @click="drawCanvas" @contextmenu="clickRight"
                      @dblclick="dbclickblob">
                      <v-layer ref="layer">
                        <v-group ref="resolution" :config="resolutionConfig">
                  <v-image :config="image1"></v-image>
                </v-group>
                
                        <!-- spline -->
                        <!-- 列表 -->
                        <!-- <v-line v-for="(item, index) in blobItems" :key="'sp' + index" :config="item" @mouseover="
                            (event) => {
                              blobHoverEvent(event)
                              blobEvent(1, index)
                            }
                          " @mouseout="blobEvent(0, index)"></v-line> -->
                        <v-path v-for="(item, index) in blobItems" :key="'sp' + index" :config="item" @mouseover="
                          (event) => {
                            blobHoverEvent(event)
                            blobEvent(1, index)
                            RoisEvent('blob', item.blob_number)
                          }
                        " @mouseout="blobEvent(0, index); RoisEvent('exit')"></v-path>
                        <v-circle v-for="(item, index) in blobnumbers" :key="'s11p' + index" :config="{
                          x: item.x,
                          y: item.y,
                          fill: item.fill,
                          radius: 10
                        }"></v-circle>
                        <v-text v-for="(item, index) in blobnumbers" :key="'s11pqwe' + index" :config="{
                          x: item.x,
                          y: item.y,
                          width: 20,
                          text: item.blob_number,
                          fontSize: 14,
                          fill: 'black',
                          offsetX: 10,
                          offsetY: 6,
                          align: 'center'
                        }" />
                        
                        <!-- spline end -->
                        <!-- 編輯點 -->
                        <v-circle v-for="(item, index) in drageObjects" :key="'revies' + index" :config="item"
                          @dragstart="editpointstart(item.num)" @dragmove="editpointmove"></v-circle>
                        <!-- end -->
                        <v-group v-for="(itemSpots, index) in spots" :key="'spotsK' + index"
                          @dragstart="dragSporId = itemSpots.spot_number" @dragmove="handleDragStart" @dragend="getspot"
                          @mouseover="TransformV('over'); RoisEvent('spot', itemSpots.spot_number)"
                          @mouseout="TransformV('out'), RoisEvent('exit')" :config="{
                            x: itemSpots.spot_position.X,
                            y: itemSpots.spot_position.Y,
                            draggable: true,
                            offsetX: 16.5,
                            offsetY: 16.5,
                          }">
                          <v-circle :config="{
                            radius: 9,
                            fill: '#fff',
                            offsetX: 0,
                            offsetY: 5,
                            stroke: 'black',
                            strokeWidth: 1,
                            shadowBlur: 3,
                          }" />
                          <v-image :config="{
                            image: konvaSpot,
                          }" />
                          <v-text :config="{
                            text: itemSpots.spot_number,
                            fontSize: 14,
                            fill: 'black',
                            offsetX: 4,
                            offsetY: 10,
                          }" />
                        </v-group>
                        <!-- 多邊形-custom scope start--------------------------------------------------------- -->
                        <v-group v-for="(itemCustomScopes, index) in custom_scopes" :key="'custom_scopes' + index"
                          @dragstart="
                            dragCustomScopeId =
                            itemCustomScopes.custom_scope_number
                          " @dragmove="handleDragStart" @dragend="getCustomScope" @mouseover="TransformV('over')"
                          @mouseout="TransformV('out')" :config="{
                            x: itemCustomScopes.custom_scope_position.X,
                            y: itemCustomScopes.custom_scope_position.Y,
                            draggable: true,
                            offsetX: 16.5,
                            offsetY: 16.5,
                          }">
                          <v-group
                            v-for="(
                                                                                                                            pointsOfItemCustomScopes, index
                                                                                                                          ) in itemCustomScopes.custom_scope_position"
                            :key="'point' + index">
                            <v-circle :config="{
                              x: pointsOfItemCustomScopes
                                .custom_scope_position.X,
                              y: pointsOfItemCustomScopes
                                .custom_scope_position.Y,
                              draggable: true,
                              radius: 7,
                              fill: '#051a1fk',
                              stroke: '#fff',
                              strokeWidth: 1,
                            }">
                            </v-circle>
                            <v-circle :config="{
                              radius: 9,
                              fill: '#fff',
                              offsetX: -36,
                              offsetY: 5,
                              stroke: 'black',
                              strokeWidth: 1,
                              shadowBlur: 3,
                            }" />
                            <v-text :config="{
                              text: itemCustomScopes.custom_scope_number,
                              fontSize: 14,
                              fill: 'black',
                              offsetX: -32,
                              offsetY: 10,
                            }" />
                          </v-group>
                        </v-group>
                        <!-- 多邊形-custom scope end--------------------------------------------------------- -->

                        <v-rect v-for="(itemScopes1, index) in dragScopeTempData" :key="'scopeK' + index" :config="{
                          x: itemScopes1.scope_position_point_LT.X,
                          y: itemScopes1.scope_position_point_LT.Y,
                          width: itemScopes1.scope_position_point_BR.X,
                          height: itemScopes1.scope_position_point_BR.Y,
                          stroke: 'black',
                          strokeWidth: 4,
                        }" />
                        <v-rect v-for="(itemScopes, index) in scopes" :key="'scopeH123' + index" :config="{
                          x: itemScopes.scope_position_point_LT.X,
                          y: itemScopes.scope_position_point_LT.Y,
                          width: itemScopes.scope_position_point_BR.X,
                          height: itemScopes.scope_position_point_BR.Y,
                          stroke: itemScopes.approval === 1 ? 'rgba(216,58,59,0.7)' : '#fff',
                          strokeWidth: 2,
                          strokeScaleEnabled: false,
                          draggable: true,
                          name: 'scope' + itemScopes.scope_number,
                        }" @mouseover="TransformV('over'); RoisEvent('scope', itemScopes.scope_number)"
                          @mouseout="TransformV('out'); RoisEvent('exit')" @transformend="handleTransformEnd"
                          @transform="handleTransformMove" @dragmove="handleScopeTransformMove"
                          @dragend="handleTransformEnd" @dragstart="handleScopeClick(itemScopes.scope_number)"
                          @click="handleScopeClick(itemScopes.scope_number)" />
                        <!-- 如果是AI加入，會蓋一層給使用者確認 -->
                        <v-rect v-for="(itemScopes, index) in scopes" :key="'scopeH1245' + index" :config="{
                          x: itemScopes.scope_position_point_LT.X,
                          y: itemScopes.scope_position_point_LT.Y,
                          width: itemScopes.scope_position_point_BR.X,
                          height: itemScopes.scope_position_point_BR.Y,
                          visible: itemScopes.approval === 1 ? true : false
                        }" @mouseover="TransformV('click');" @mouseout="TransformV('out');"
                          @click="focusRoiTempData = itemScopes, AiAddRoiMassage = true;" />
                        <v-circle v-for="(itemScopes, index) in scopes" :key="'scopez' + index" :config="{
                          x: itemScopes.scope_position_point_LT.X,
                          y: itemScopes.scope_position_point_LT.Y,
                          radius: 9,
                          fill: itemScopes.approval === 1 ? 'rgba(216,58,59,0.7)' : '#fff',
                          offsetX: 10,
                          offsetY: 5,
                          stroke: 'black',
                          strokeWidth: 1,
                          shadowBlur: 3,
                        }" />
                        <v-text v-for="(itemScopes, index) in scopes" :key="'scopeasd' + index" :config="{
                          x: itemScopes.scope_position_point_LT.X,
                          y: itemScopes.scope_position_point_LT.Y,
                          text: itemScopes.scope_number,
                          fontSize: 14,
                          fill: 'black',
                          offsetX: 14,
                          offsetY: 10,
                        }" />
                        <!-- line -->
                        <v-group v-for="(itemLines, index) in lines" :key="'lineK' + index">
                          <v-line :config="{
                            points: [
                              itemLines.line_position_point_B.X,
                              itemLines.line_position_point_B.Y,
                              itemLines.line_position_point_A.X,
                              itemLines.line_position_point_A.Y,
                            ],
                            stroke: 'black',
                            strokeWidth: 4,
                          }"></v-line>
                          <v-line :config="{
                            x: 0,
                            y: 0,
                            points: [
                              itemLines.line_position_point_B.X,
                              itemLines.line_position_point_B.Y,
                              itemLines.line_position_point_A.X,
                              itemLines.line_position_point_A.Y,
                            ],
                            stroke: '#fff',
                            strokeWidth: 2,
                          }"></v-line>
                          <v-circle @dragstart="
                            handleLineCircleTransformStart(
                              itemLines.line_number,
                              'A'
                            )
                          " @dragmove="handleLineCircleTransformMove" @dragend="handleLineCircleTransformEnd"
                            @mouseover="TransformV('over'); RoisEvent('line', itemLines.line_number)"
                            @mouseout="TransformV('out'); RoisEvent('exit')" :config="{
                              x: itemLines.line_position_point_A.X,
                              y: itemLines.line_position_point_A.Y,
                              draggable: true,
                              radius: 7,
                              fill: '#051a1fk',
                              stroke: '#fff',
                              strokeWidth: 1,
                            }" />
                          <v-circle @dragstart="
                            handleLineCircleTransformStart(
                              itemLines.line_number,
                              'B'
                            )
                          " @dragmove="handleLineCircleTransformMove" @dragend="handleLineCircleTransformEnd"
                            @mouseover="TransformV('over'); RoisEvent('line', itemLines.line_number)"
                            @mouseout="TransformV('out'); RoisEvent('exit')" :config="{
                              x: itemLines.line_position_point_B.X,
                              y: itemLines.line_position_point_B.Y,
                              draggable: true,
                              radius: 7,
                              fill: '#051a1f',
                              stroke: '#fff',
                              strokeWidth: 1,
                            }" />
                          <v-circle :config="{
                            x: itemLines.line_position_point_B.X,
                            y: itemLines.line_position_point_B.Y,
                            radius: 9,
                            fill: '#fff',
                            offsetX: 20,
                            offsetY: 15,
                            stroke: 'black',
                            strokeWidth: 1,
                            shadowBlur: 3,
                          }" />
                          <v-text :config="{
                            x: itemLines.line_position_point_B.X,
                            y: itemLines.line_position_point_B.Y,
                            text: itemLines.line_number,
                            fontSize: 14,
                            fill: 'black',
                            offsetX: 24,
                            offsetY: 21,
                          }" />
                        </v-group>

                        <v-transformer ref="transformer" @transformstart="transformlimit"  :config="transformerConfig" />
                        <v-rect :config="stopListener"></v-rect>
                        <!-- 暫存用 -->
                          <v-line :config=" blobTempsData "></v-line>
                          <v-line :config=" resolutionline "></v-line>
                          <v-circle :config=" removePoint " ref="circleZindexTop" @mouseover=" circleEvents(1) "
                            @mouseout=" circleEvents(0) "></v-circle>
                            <v-image :config=" resolutionEventCircle " @mouseover=" resolutionEventstart " @mouseout="resolutionEventout" @dragmove=" resolutionEventMove ">
                  </v-image>
                      </v-layer>
                    </v-stage>
                    <v-menu v-model="showMenu" :position-x="MenuX" :position-y="MenuY" absolute offset-y depressed
                      content-class="elevation-0">
                      <div class="showMenuStyle">
                        <div class="mr-1">
                          <v-img src="images/meun-multiscreen/setting.png"></v-img>
                        </div>
                        <v-divider vertical color="#fff" class="py-2 mr-1"></v-divider>
                        <v-tooltip top>
                          <template v-slot:activator="{ on, attrs }">
                            <div class="mr-1 showMenu-btn" v-bind="attrs" v-on="on">
                              <v-img src="images/meun-multiscreen/pen.png"></v-img>
                            </div>
                          </template>
                          <span>編輯</span>
                        </v-tooltip>
                        <v-tooltip top>
                          <template v-slot:activator="{ on, attrs }">
                            <div class="mr-1 showMenu-btn" v-bind="attrs" v-on="on" @click="selectGroupWindows = true">
                              <v-img src="images/meun-multiscreen/edit.png"></v-img>
                            </div>
                          </template>
                          <span>更改類別</span>
                        </v-tooltip>
                        <v-tooltip top>
                          <template v-slot:activator="{ on, attrs }">
                            <div class="showMenu-btn" v-bind="attrs" v-on="on">
                              <v-img src="images/meun-multiscreen/trash.png"></v-img>
                            </div>
                          </template>
                          <span>刪除</span>
                        </v-tooltip>
                      </div>
                      <!-- <v-list>
                          <v-list-item
                            v-for="(item, index) in MouseRightMenu"
                            :key="'ee' + index"
                          >
                            <v-list-item-title>{{ item }}</v-list-item-title>
                          </v-list-item>
                        </v-list> -->
                    </v-menu>
                  </div>
                  <div class="ui-skeleton-loaders" id="sleleton-loaders-custom"></div>
                  <div class="Thermal-bar-w">
                    <div class="text-center">MAX<br />{{ colorbar.max }}°C</div>
                    <div class="text-center">
                      <img :src="thermalimg" />
                    </div>
                    <div class="text-center">MIN<br />{{ colorbar.min }}°C</div>
                  </div>
                  <div :style="{
                    top: this.reference.Y + 'px',
                    left: this.reference.X + 'px',
                  }" id="spot" class="spot">
                    <img src="/images/spot_1.png" />
                    <div class="spot-span">
                      <div>R</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="frame-footer d-none">
              <!-- <v-text-field v-model="temperature" class="subtitle card5content mx-3 text-color" label="一般溫度"
                color="#828c8f"></v-text-field> -->
              <v-text-field v-model="reflected" class="subtitle card5content mx-3 text-color" label="反射溫度"
                color="#828c8f"></v-text-field>

              <v-text-field v-model="atmospheric" class="subtitle card5content mx-3 text-color" label="環境溫度"
                color="#828c8f"></v-text-field>

              <v-text-field v-model="humidity" class="subtitle card5content mx-3 text-color" label="環境濕度"
                color="#828c8f"></v-text-field>

              <v-text-field v-model="distance" class="subtitle card5content mx-3 text-color" label="量測距離"
                color="#828c8f"></v-text-field>

              <v-text-field v-model="emissivity" class="subtitle card5content mx-3 text-color" label="放射率"
                color="#828c8f"></v-text-field>

                <v-text-field v-model=" transmission " class="subtitle card5content mx-3 text-color font-weight-large"
                  label="穿透率" color="#828c8f"></v-text-field>
              <v-btn color="#e6e6e6" class="diago-btn mt-3" max-height="24px" max-width="95px" rounded>
                <span class="diago-btn-font">reset</span>
              </v-btn>
            </div>
          </v-card-text>
          <!-- </v-responsive> -->
        </v-card>
      </div>
      <!--右1畫面顯示----------------------------------------------------------------------------------------------- -->
      <div class="ml-3">
        <v-row :column="$vuetify.breakpoint.mdAndDown">
          <v-col cols="12" lg="5" class="pb-0">
            <v-card class="mt-3" rounded="md" elevation="6">
              <div class="cardtitle1 ml-3">警報設置</div>
              <v-simple-table id="style-3" fixed-header height="265px" class="mx-2" small>
                <template #default>
                  <thead>
                    <tr>
                      <th class="text-center" style="height: 25px">監測項目</th>
                      <th class="text-center" style="height: 25px">監測溫度</th>
                      <th class="text-center" style="height: 25px">設定警報</th>
                      <th class="text-center" style="height: 25px">刪除</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="text-center" style="padding: 0px 13px">
                        <v-badge content="R" overlap color="#828C8F" class="my-0">
                          <v-btn icon class="right-btn"><img class="" alt="" src="/right-icons/spot2.png"
                              width="20em" /></v-btn>
                        </v-badge>
                      </td>
                      <td class="text-center subtitle-right" style="padding: 0px 25px">
                        {{ reference.reference_temperature }}°C
                      </td>
                      <td class="text-center" style="padding: 0px 25px">N/A</td>
                      <td class="text-center" style="padding: 0px 13px">N/A</td>
                    </tr>
                    <!-- spot -->
                    <tr v-for="(item, index) in spots" :key="'C' + index">
                      <td class="text-center" style="padding: 0px 13px">
                        <v-badge :content="item.spot_number" overlap color="#828C8F" class="my-0">
                          <v-btn icon class="right-btn"><img class="" alt="" src="/right-icons/spot2.png"
                              width="20em" /></v-btn>
                        </v-badge>
                      </td>
                      <td class="text-center subtitle-right" style="padding: 0px 25px">
                        {{ item.spot_temperature }}°C
                      </td>
                      <td class="text-center" style="padding: 0px 25px">
                        <!-- 點:警報對話框 -->
                        <v-btn color="" icon :class="
                          item.spot_alarm_status === 1 &&
                            item.spot_temperature >= item.spot_threshold
                            ? 'right-btn1'
                            : 'right-btn'
                        " @click="opendialog(item.spot_number, 'spot')"><img v-if="
  item.spot_alarm_status === 1 &&
  item.spot_temperature < item.spot_threshold
" class="" alt="" src="/right-icons/alert-on.png" width="18em" depressed />
                          <img v-else-if="
                            item.spot_alarm_status === 1 &&
                            item.spot_temperature >= item.spot_threshold
                          " class="" alt="" src="/right-icons/alert-fff.png" width="18em" depressed />
                          <img v-else-if="item.spot_alarm_status === 0" class="" alt="" src="/right-icons/alert-off.png"
                            width="18em" depressed />
                        </v-btn>
                      </td>
                      <td class="text-center" style="padding: 0px 13px">
                        <v-btn color="" icon class="right-btn"><img class="" alt="" src="/right-icons/delete.png"
                            width="18em" @click="deletespot(item.spot_number)" /></v-btn>
                      </td>
                    </tr>
                    <!-- SCOPE -->
                    <tr v-for="(item, index) in scopes" :key="'D' + index">
                      <td class="text-center" style="padding: 0px 13px">
                        <v-badge :content="item.scope_number" overlap color="#828C8F" class="my-0">
                          <v-btn icon class="right-btn"><img class="rectangle" alt="" src="/right-icons/rectangle2.png"
                              width="17em" /></v-btn>
                        </v-badge>
                      </td>
                      <td class="text-center subtitle-right" style="padding: 0px 25px">
                        {{ item.scope_temperature_max }}°C
                      </td>
                      <td class="text-center" style="padding: 0px 25px">
                        <!-- 面:警報對話框 -->
                        <v-btn color="" icon :class="
                          item.scope_alarm_status === 1 &&
                            item.scope_temperature_max >= item.scope_threshold
                            ? 'right-btn1'
                            : 'right-btn'
                        " @click="opendialog(item.scope_number, 'scope')"><img v-if="
  item.scope_alarm_status === 1 &&
  item.scope_temperature_max < item.scope_threshold
" class="" alt="" src="/right-icons/alert-on.png" width="18em" depressed />
                          <img v-if="
                            item.scope_alarm_status === 1 &&
                            item.scope_temperature_max >= item.scope_threshold
                          " class="" alt="" src="/right-icons/alert-fff.png" width="18em" depressed />
                          <img v-else-if="item.scope_alarm_status === 0" class="" alt="" src="/right-icons/alert-off.png"
                            width="18em" depressed />
                        </v-btn>
                      </td>
                      <td class="text-center" style="padding: 0px 13px">
                        <v-btn color="" icon class="right-btn"><img class="" alt="delete" src="/right-icons/delete.png"
                            width="18em" @click="deletescope(item.scope_number)" /></v-btn>
                      </td>
                    </tr>
                    <!-- LINE -->
                    <tr v-for="(item, index) in lines" :key="'H' + index">
                      <td class="text-center" style="padding: 0px 13px">
                        <v-badge :content="item.line_number" overlap color="#828C8F" class="my-0">
                          <v-btn icon class="right-btn"><img class="" alt="alert" src="/right-icons/line2.png"
                              width="15em" /></v-btn>
                        </v-badge>
                      </td>
                      <td class="text-center subtitle-right" style="padding: 0px 25px">
                        {{ item.line_temperature_max }}°C
                      </td>
                      <td class="text-center" style="padding: 0px 25px">
                        <!-- 線:警報對話框 -->
                        <v-btn color="" icon :class="
                          item.line_alarm_status === 1 &&
                            item.line_temperature_max >= item.line_threshold
                            ? 'right-btn1'
                            : 'right-btn'
                        " @click="opendialog(item.line_number, 'line')"><img v-if="
  item.line_alarm_status === 1 &&
  item.line_temperature_max < item.line_threshold
" class="" alt="" src="/right-icons/alert-on.png" width="18em" depressed />
                          <img v-if="
                            item.line_alarm_status === 1 &&
                            item.line_temperature_max >= item.line_threshold
                          " class="" alt="" src="/right-icons/alert-fff.png" width="18em" depressed />
                          <img v-else-if="item.line_alarm_status === 0" class="" alt="" src="/right-icons/alert-off.png"
                            width="18em" depressed />
                        </v-btn>
                      </td>
                      <td class="text-center" style="padding: 0px 13px">
                        <v-btn color="" icon class="right-btn" @click="deleteline(item.line_number)"><img class=""
                            alt="delete" src="/right-icons/delete.png" width="18em" /></v-btn>
                      </td>
                    </tr>
                    <!-- custom scope -->
                    <tr v-for="(item, index) in custom_scopes" :key="'p' + index">
                      <td class="text-center" style="padding: 0px 13px">
                        <v-badge :content="item.custom_scope_number" overlap color="#828C8F" class="my-4" bordered>
                          <v-btn icon class="right-btn"><img class="" alt="" src="/right-icons/custom-scope.png"
                              width="20em" /></v-btn>
                        </v-badge>
                      </td>
                      <td class="text-center subtitle-right" style="padding: 0px 25px">
                        {{ item.custom_scope_temperature }}°C
                      </td>
                      <td class="text-center" style="padding: 0px 25px">
                        <!-- 多邊形:警報對話框 -->
                        <v-btn color="" icon class="right-btn" @click="
                          opendialog(item.custom_scope_number, 'custom-scope')
                        "><img v-if="item.custom_scope_alarm_status === 1" class="" alt=""
                            src="/right-icons/alert-on.png" width="18em" depressed />
                          <img v-else-if="item.custom_scope_alarm_status === 0" class="" alt=""
                            src="/right-icons/alert-off.png" width="18em" depressed />
                        </v-btn>
                      </td>
                      <td class="text-center" style="padding: 0px 13px">
                        <v-btn color="" icon class="right-btn"><img class="" alt="" src="/right-icons/delete.png"
                            width="18em" @click="
                              deleteCustomScope(item.custom_scope_number)
                            " /></v-btn>
                      </td>
                    </tr>
                    <!-- custom blob -->
                    <template v-for="(item, index) in blobItems">
                      <tr v-if="item.associated === 0" :key="'p' + index">
                        <td class="text-center" style="padding: 0px 13px">
                          <v-badge :content="item.blob_number" overlap color="#828C8F" bordered>
                            <v-btn icon class="right-btn"><img class="" alt="" src="/right-icons/blob.png" width="20em" />
                            </v-btn>
                          </v-badge>
                        </td>
                        <td class="text-center subtitle-right" style="padding: 0px 25px">
                          {{ item.blob_temperature_max }}°C
                        </td>
                        <td class="text-center" style="padding: 0px 25px">
                          <!-- 多邊形:警報對話框 -->
                          <v-btn color="" icon :class="
                            item.blob_alarm_status === 1 &&
                              item.blob_temperature_max >= item.blob_threshold
                              ? 'right-btn1'
                              : 'right-btn'
                          " @click="opendialog(item.blob_number, 'custom-blob')"><img v-if="
  item.blob_alarm_status === 1 &&
  item.blob_temperature_max < item.blob_threshold
" class="" alt="" src="/right-icons/alert-on.png" width="18em" depressed />
                            <img v-if="
                              item.blob_alarm_status === 1 &&
                              item.blob_temperature_max >= item.blob_threshold
                            " class="" alt="" src="/right-icons/alert-fff.png" width="18em" depressed />
                            <img v-else-if="item.blob_alarm_status === 0" class="" alt="" src="/right-icons/alert-off.png"
                              width="18em" depressed />
                          </v-btn>
                        </td>
                        <td class="text-center" style="padding: 0px 13px">
                          <v-btn color="" icon class="right-btn"><img class="" alt="" src="/right-icons/delete.png"
                              width="18em" @click="deleteCustomblob(item.blob_number, item.points, item.group_name)" />
                          </v-btn>
                        </td>
                      </tr>
                    </template>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card>
          </v-col>
          <!-- 物件警報(共用) -->
          <v-dialog v-model="dialog" persistent max-width="290">
            <form @submit.prevent="submitForm">
              <v-card>
                <!-- <v-divider></v-divider> -->
                <v-card-text class="pb-2">
                  <div class="d-flex justify-space-between align-center mb-3">
                    <h4 class="cardtitle2">設定警報</h4>
                    <div class="">
                      <div class="switch-field py-0 my-0 px-1">
                        <input id="radio-one-email-notice" type="radio" name="switch-one" value="yes"
                          :checked="checkbox ? true : false" @click="alarmSwitch(1)" />
                        <label for="radio-one-email-notice">ON</label>
                        <input id="radio-two-email-notice" type="radio" name="switch-one" value="no"
                          :checked="checkbox ? false : true" @click="alarmSwitch(0)" />
                        <label for="radio-two-email-notice">OFF</label>
                      </div>
                      <!-- <v-spacer></v-spacer> -->
                    </div>
                  </div>
                  <div class="alarm-dialog-contert pa-3">
                    <div>條件</div>
                    <div class="alarm-dialog-input">
                      <v-select disabled class="subtitle text-color" v-model="conditionSelect" :items="conditionItems"
                        :rules="[(v) => !!v || 'Item is required']" required full-width outlined dense hide-details
                        height="20"></v-select>
                    </div>
                    <div>閾值</div>
                    <div class="alarm-dialog-input">
                      <v-text-field v-model="threshold" class="subtitle text-color qwcegzsd" name="threshold"
                        color="#828c8f" outlined required full-width dense hide-details></v-text-field>
                    </div>
                    <div>滯後</div>
                    <div class="alarm-dialog-input">
                      <v-text-field disabled v-model="hysteresis" class="subtitle text-color" color="#828c8f" outlined
                        dense full-width hide-details></v-text-field>
                    </div>
                    <div>閾值時間</div>
                    <div class="alarm-dialog-input">
                      <v-text-field disabled v-model="thresholdTime" class="subtitle text-color" label="" color="#828c8f"
                        outlined dense hide-details full-width></v-text-field>
                    </div>
                    <div>捕捉</div>
                    <div class="alarm-dialog-input">
                      <v-select disabled class="subtitle text-color" v-model="captureSelect" :items="captureItems"
                        :rules="[(v) => !!v || 'Item is required']" label="" outlined required dense hide-details
                        full-width></v-select>
                    </div>
                    <div>脈衝時間</div>
                    <div class="alarm-dialog-input">
                      <v-text-field disabled v-model="pulseTime" class="subtitle text-color" label="" color="#828c8f"
                        outlined dense hide-details full-width></v-text-field>
                    </div>
                    <!-- <div>發報通知</div>
                    <div>
                      <div class="d-flex">
                        <v-checkbox :ripple="false" class="ma-0" hide-details dense disabled></v-checkbox>電子信件通知
                      </div>
                      <div class="d-flex">
                        <v-checkbox :ripple="false" class="ma-0" hide-details dense disabled></v-checkbox>LINE 通知
                      </div>
                    </div> -->
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
          <!--右2畫面顯示----------------------------------------------------------------------------------------------- -->
          <v-col cols="12" lg="7" class="pb-0">
            <!-- <v-col cols="12" lg="6" style="border: 1px solid red"> -->

            <v-card class="mt-3 mr-6" rounded="md" elevation="6" id="tableEvent1">
              <h4 class="cardtitle1 ml-3">警報紀錄</h4>
              <v-simple-table fixed-header height="265px" class="mx-2 table2">
                <template #default>
                  <thead>
                    <tr>
                      <th class="text-center alarmLogth px-0" style="height: 25px">
                        監測項目
                      </th>
                      <th class="text-center alarmLogth px-0" style="height: 25px">
                        觸發時間
                      </th>
                      <th class="text-center alarmLogth px-0" style="height: 25px">
                        監測溫度
                      </th>
                      <th class="text-center alarmLogth px-0" style="height: 25px">
                        警報溫度
                      </th>
                      <th class="text-center alarmLogth px-0" style="height: 25px">
                        持續時間
                      </th>
                      <th class="text-center alarmLogth px-0" style="height: 25px"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <div class="no-data-message" :class="temps.length > 0 ? 'd-none' : ' '">目前沒有警報
                    </div>
                    <tr v-for="item in temps" :key="item.name" @click="tableEvent(item)"
                      class="cursor-pointer tableEvent">
                      <template v-if="item.duration[0] === '持續中'">
                        <!-- 監測項目(ICON) -->
                        <td class="text-center px-0"
                          style="
                                                                                                                          padding: 0px 13px;
                                                                                                                          background-color: rgb(232 149 159 / 33%);
                                                                                                                          color: #4c4c4c;
                                                                                                                        ">
                          <v-badge :content="item.objcet.number" overlap color="#828C8F" class="badge my-0">
                            <v-btn icon class="right-btn">
                              <img v-if="item.objcet.name === 'spot'" class="" alt="alert" src="/right-icons/spot2.png"
                                width="18em" />
                              <img v-if="item.objcet.name === 'scope'" class="" alt="alert"
                                src="/right-icons/rectangle2.png" width="18em" />
                              <img v-if="item.objcet.name === 'line'" class="" alt="alert" src="/right-icons/line2.png"
                                width="18em" />
                              <img v-if="item.objcet.name === 'blob'" class="" alt="alert" src="/right-icons/blob.png"
                                width="18em" />
                            </v-btn>
                          </v-badge>
                        </td>
                        <!-- 觸發時間 -->
                        <td class="text-center px-0 subtitle-right"
                          style="
                                                                                                                          padding: 0px 5px;
                                                                                                                          font-size: 12px;
                                                                                                                          background-color: rgb(232 149 159 / 33%);
                                                                                                                          color: #4c4c4c;
                                                                                                                        ">
                          {{ item.time.slice(-14) }}
                        </td>
                        <!-- 監測溫度 -->
                        <td class="text-center px-0 subtitle-right"
                          style="
                                                                                                                          padding: 0px 24.7px;
                                                                                                                          background-color: rgb(232 149 159 / 33%);
                                                                                                                          color: #4c4c4c;
                                                                                                                        ">
                          {{ item.temperature }}°C
                        </td>
                        <!-- 警報溫度 -->
                        <td class="text-center px-0 subtitle-right"
                          style="
                                                                                                                          padding: 0px 24.7px;
                                                                                                                          background-color: rgb(232 149 159 / 33%);
                                                                                                                          color: #4c4c4c;
                                                                                                                        ">
                          {{ item.alertTemperature }}°C
                        </td>
                        <!-- 持續時間 -->
                        <td class="text-center px-0 subtitle-right"
                          style="
                                                                                                                          padding: 0px 13px;
                                                                                                                          background-color: rgb(232 149 159 / 33%);
                                                                                                                          color: #4c4c4c;
                                                                                                                        ">
                          {{ item.duration[1] }}<br />
                          <!-- ({{ item.duration[0] }}) -->
                        </td>
                        <!-- 詳細 -->
                        <td class="text-center px-0 subtitle-right"
                          style="
                                                                                                                          padding: 0px 13px;
                                                                                                                          background-color: rgb(232 149 159 / 33%);
                                                                                                                          color: #4c4c4c;
                                                                                                                        ">
                          <v-menu left :close-on-content-click="false" nudge-left="35">
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn depressed color="#F7DCDF" fab x-small :ripple="false" v-bind="attrs" v-on="on">
                                <img src="/images/Component98–90.png" width="22" />
                              </v-btn>
                            </template>

                            <div class="tooltipforalarm px-2 py-0">
                              <div class="mr-2"><span>元件類別</span>:線材</div>
                              <div><span class="">異常原因</span>:超溫</div>
                              <div>
                                <v-btn depressed color="#fff" fab x-small to="/In-depthAnalysis">
                                  <img src="/images/arrow-right2.png" width="18" />
                                </v-btn>
                              </div>
                            </div>
                          </v-menu>
                        </td>
                      </template>
                      <template v-else>
                        <!-- 監測項目(ICON) -->
                        <td class="text-center" style="padding: 0px 13px"
                          :style="focusROI.type === item.objcet.name && focusROI.id === item.objcet.number ? 'background: #eeeeee !important;' : ''">
                          <v-badge :content="item.objcet.number" overlap color="#828C8F" class="badge my-0">
                            <v-btn icon class="right-btn">
                              <img v-if="item.objcet.name === 'spot'" class="" alt="alert" src="/right-icons/spot2.png"
                                width="18em" />
                              <img v-if="item.objcet.name === 'scope'" class="" alt="alert"
                                src="/right-icons/rectangle2.png" width="18em" />
                              <img v-if="item.objcet.name === 'line'" class="" alt="alert" src="/right-icons/line2.png"
                                width="18em" />
                              <img v-if="item.objcet.name === 'blob'" class="" alt="alert" src="/right-icons/blob.png"
                                width="18em" />
                            </v-btn>
                          </v-badge>
                        </td>
                        <!-- 觸發時間 -->
                        <td class="text-center subtitle-right" style="padding: 0px 5px; font-size: 12px"
                          :style="focusROI.type === item.objcet.name && focusROI.id === item.objcet.number ? 'background: #eeeeee !important;' : ''">
                          {{ item.time.slice(-14) }}
                        </td>
                        <!-- 監測溫度 'background: rgb(232 149 159 / 28%) !important;' -->
                        <td class="text-center subtitle-right" style="padding: 0px 24.7px"
                          :style="focusROI.type === item.objcet.name && focusROI.id === item.objcet.number ? 'background: #eeeeee !important;' : ''">
                          {{ item.temperature }}°C
                        </td>
                        <!-- 警報溫度 -->
                        <td class="text-center subtitle-right" style="padding: 0px 24.7px"
                          :style="focusROI.type === item.objcet.name && focusROI.id === item.objcet.number ? 'background: #eeeeee !important;' : ''">
                          {{ item.alertTemperature }}°C
                        </td>
                        <!-- 持續時間 -->
                        <td class="text-center subtitle-right" style="padding: 0px 13px"
                          :style="focusROI.type === item.objcet.name && focusROI.id === item.objcet.number ? 'background: #eeeeee !important;' : ''">
                          {{ item.duration }}
                        </td>
                        <!-- 詳細 -->
                        <td class="text-center subtitle-right"
                          :style="focusROI.type === item.objcet.name && focusROI.id === item.objcet.number ? 'background: #eeeeee !important;' : ''">
                          <v-menu left :close-on-content-click="false" nudge-left="35">
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn depressed color="#fff" fab x-small :ripple="false" v-bind="attrs" v-on="on">
                                <img src="/images/Component98–90.png" width="22" />
                              </v-btn>
                            </template>

                            <div class="tooltipforalarm px-2 py-0">
                              <div class="mr-2"><span>元件類別</span>:線材</div>
                              <div><span class="">異常原因</span>:none</div>
                              <div>
                                <v-btn depressed color="#fff" fab x-small to="/In-depthAnalysis">
                                  <img src="/images/arrow-right2.png" width="18" />
                                </v-btn>
                              </div>
                            </div>
                          </v-menu>
                        </td>
                      </template>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card>
          </v-col>
          <!--右3畫面顯示(及時超溫影像紀錄)----------------------------------------------------------------------------------------------- -->
          <v-col cols="12" lg="12" class="pb-0">
            <EchartsAlarm :echartsItem="echartsData" :camid="camid" />
          </v-col>
          <!--右4畫面顯示(警報次數及歷史)----------------------------------------------------------------------------------------------- -->
          <v-col cols="12" lg="12">
            <!-- <v-col cols="12" lg="6" style="border: 1px solid red"> -->
            <v-card class="fill-height mr-6" rounded="md" elevation="6" height="299px">
              <div class="reset">
                <v-icon color="#d8d8d8">mdi-circle-medium</v-icon><span class="subtitle-right">正常&nbsp;&nbsp;</span>
                <v-icon color="#828c8f">mdi-circle-medium</v-icon><span
                  class="subtitle-right">超溫&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              </div>
              <h4 class="cardtitle ml-3">警報次數及歷史</h4>

              <!-- 圖表1 本日 -->
              <div class="alarm-sum">
                <div class="alarm-charts">
                  <div class="cheats-cover">
                    <v-progress-circular class="donut1 mx-5" :rotate="-90" :size="95" :width="10" :value="valueToday"
                      color="#828c8f" backgroud>
                      <h3>{{ valueToday }}</h3>
                    </v-progress-circular>

                    <v-sheet>
                      <div style="width: 98px">
                        <h4 class="chartTitle text-left">本日</h4>

                        <div class="subtitle-right text-center">
                          {{ Datecorrect('today', this.alarmDate) }}
                          00:00<br />ǀ<br />{{
                            Datecorrect('today', this.alarmDate)
                          }}
                          24:00
                        </div>
                      </div>
                    </v-sheet>
                  </div>
                  <!-- 圖表2 昨日 -->
                  <div class="cheats-cover">
                    <v-progress-circular class="donut1 mx-5" :rotate="-90" :size="95" :width="10" :value="valueLastday"
                      color="#828c8f">
                      <h3>{{ valueLastday }}</h3>
                    </v-progress-circular>

                    <v-sheet class="gg">
                      <div style="width: 98px">
                        <h4 class="chartTitle text-left">昨日</h4>
                        <div class="subtitle-right text-center">
                          {{
                            Datecorrect('yesterday', this.alarmDate)
                          }}&nbsp;00:00<br />ǀ<br />{{
  Datecorrect('yesterday', this.alarmDate)
}}&nbsp;24:00
                        </div>
                      </div>
                    </v-sheet>
                  </div>
                  <!-- 圖表3 本週 -->
                  <div class="cheats-cover">
                    <v-progress-circular class="donut1 mx-5" :rotate="-90" :size="95" :width="10" :value="valueThisWeek"
                      color="#828c8f">
                      <h3>{{ valueThisWeek }}</h3>
                    </v-progress-circular>
                    <v-sheet class="gg">
                      <div style="width: 98px">
                        <h4 class="chartTitle text-left">本週</h4>
                        <div class="subtitle-right text-center">
                          {{
                            Datecorrect('week', this.alarmDate)[0]
                          }}&nbsp;00:00<br />ǀ<br />{{
  Datecorrect('week', this.alarmDate)[1]
}}&nbsp;24:00
                        </div>
                      </div>
                    </v-sheet>
                  </div>
                  <!-- 圖表4 本月 -->
                  <div class="cheats-cover">
                    <v-progress-circular class="donut1 mx-5" :rotate="-90" :size="95" :width="10" :value="valueThisMonth"
                      color="#828C8F">
                      <h3>{{ valueThisMonth }}</h3>
                    </v-progress-circular>

                    <v-sheet>
                      <div style="width: 98px">
                        <h4 class="chartTitle text-left">本月</h4>
                        <div class="subtitle-right text-center">
                          {{
                            Datecorrect('month', this.alarmDate)[0]
                          }}&nbsp;00:00<br />ǀ<br />{{
  Datecorrect('month', this.alarmDate)[1]
}}&nbsp;24:00
                        </div>
                      </div>
                    </v-sheet>
                  </div>
                </div>
                <div>
                  <!-- 日期 -->
                  <v-date-picker v-model="date2" class="date-picker"
                    :event-color="(date) => (date[9] % 2 ? 'red' : 'yellow')" :events="functionEvents" readonly no-title
                    color="#828c8f" width="17em"></v-date-picker>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios'
// import { data } from 'browserslist'
// import { GPU }  from ('gpu.js')

import Konva from 'konva'
import EchartsAlarm from './Echarts-alarm.vue'
export default {
  components: {
    EchartsAlarm,
  },
  name: 'IndexPage',
  head: {
    title: '即時監控',
    link: [
      // { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      // { rel: 'stylesheet', href: '/css/jquery-ui.css' },
      // { rel: 'stylesheet', href: '/css/object.css' },
      // { rel: 'stylesheet', href: '/css/card3.css' },
      // { rel: 'stylesheet', href: 'css/details.css' },
    ],
    script: [
      // {
      //   src: '/js/jquery-ui.js',
      //   type: 'text/javascript',
      // },
      // {
      //   src: '/js/jquery-collision.js',
      //   type: 'text/javascript',
      // },
      // {
      //   src: '/js/object.js',
      //   type: 'text/javascript',
      // },
    ],
  },
  // 接收父元素資料
  props: ['id', 'camid', 'tab2', 'camlist'],
  data: () => ({
    sendCameraIdtoInt:null,
    image1: {
      // x: 500,
      // y: 100,
      // width: 640,
      // height: 480,
      image: null,
      // draggable: true
    },
    resolutionConfig: {
      x: 0,
      y: 0,
      visible: false,
    },
    resolutionEventCircle: {
      x: 0,
      y: 0,
      offsetY: 0,
      offsetX: 0,
      width:39,
      height:39,
      image:null,
      // radius: 10,
      // fill: 'red',
      visible:false,
      draggable: true
    },
    resolutionline:{
      points: [0,0,0,2000],
      x:0,
      y:0,
      offsetY: 0,
      offsetX: 0,
      stroke:'#fff',
      strokeWidth: 3,
      height:1000,
      visible: false,
    },
    stopListener:{
      x:0,
      y:0,
      width:1000,
      height:1000,
      visible: false,
    },
    tempRactData:null,
    animationPoint: [],
    AiAddRoiMassage: false,
    focusRoiTempData: {},
    selectGroupWindows: false,
    saveBlobTemp: null,
    saveBlobTempString: null,
    tempGuoupName: null,
    ws3: null, // 呼叫ROI
    ws4: null, // 雙向WS
    NuxtSetting: null,
    // 即時畫面右上設定
    screenSettings: [
      // { name: '一般溫度', value: 0.95, check: false },
      { name: '反射溫度', value: 20.0, check: false },
      { name: '環境溫度', value: 20.0, check: false },
      { name: '環境濕度', value: 0.9, check: false },
      { name: '量測距離', value: 20.0, check: false },
      { name: '放射率', value: 20.0, check: false },
      { name: '穿透率', value: 20.0, check: false },
      // { name: '放射率', value: false, check: true },

      // { name: 'External IR Window', value: false, check: true },
    ],
    Transmissiondispaly: [
      { name: 'Transmission', value: 0.95, check: false },
      { name: 'Temperature', value: 20.0, check: false },
    ],
    TransmissiondispalyStatus: false,
    // 警報溫度對話框設置
    dialog: false,
    showMessages: false,
    switch1: false,
    switch2: true,
    // 防止連續get api
    timeOutRefresh: null,
    timeOutRefresh1: null,

    loader: null,
    loading: false,
    Interval: 0,
    // 右2
    timer: null,
    time: 20,
    wsblock:true,
    // 切換按鈕
    isActive: false,
    // 相機選單(影像)
    cameraList: [],
    selectList: '',
    // 左側隱藏按鈕動作設定
    direction_imageMode: 'right',
    fab_imageMode: false,
    transition_imageMode: 'scale-transition',

    direction_palette: 'right',
    fab_palette: false,
    transition_palette: 'scale-transition',

    direction_calibration: 'right',
    fab_calibration: false,
    transition_calibration: 'scale-transition',

    direction_light: 'right',
    fab_light: false,
    transition_light: 'scale-transition',

    direction_autofocus: 'right',
    fab_autofocus: false,
    transition_autofocus: 'scale-transition',

    // 對話框
    conditionSelect: '以上',
    conditionItems: ['以下', '以上'],
    checkbox: false,
    threshold: ``,
    hysteresis: ``,
    thresholdTime: ``,
    captureSelect: '無',
    captureItems: ['無', '照片', '影片'],
    // capture: 15,
    pulseTime: 0,
    openid: null, // 紀錄開啟什麼id
    opentype: null, // 紀錄開啟的原件
    dialogdata: [],
    dialogarr: [], // 紀錄原始物件
    tpmedata: null,
    // 右1點線面_宣告變數陣列
    spots: [],
    scopes: [],
    lines: [],
    list: [],
    custom_scopes: [],
    reference: [],
    // 多邊形
    wrapper: 'wrapper',
    pointShow: false,
    custom_scope_points: [],
    // 右2假數據顯示(待刪)
    temps: [],

    // 右3顯示
    interval: {},
    valueToday: 0,
    valueLastday: 0,
    valueThisWeek: 0,
    valueThisMonth: 0,
    thermalimg:'/images/colorbar_greyscale.png',
    // 右4顯示
    arrayEvents: null,
    date2: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),

    // 右5設定
    emissivity: 0.95,
    transmission: 1.0,
    reflected: `${20}°C`,
    distance: `${1.0}m`,
    atmospheric: `${20}°C`,
    humidity: `${50}%`,
    temperature: `${20}°C`,

    alarmDate: new Date(),
    alarmCalendar: [],
    frameSettingChange: true,
    alarmlistInterval: null,
    // konva 相關
    configKonva: {
      width: 640,
      height: 480,
    },
    canvasKonva: {
      width: 0,
      height: 0,
    },
    Konvaimage: null,
    konvaSpot: null,
    dragSporId: null,
    dragLineId: null,
    dragScopeId: null,
    dragCustomScopeId: null,
    dragScopeTempData: [],
    dragObjectStatus: true,
    selectedShapeName: null,
    transformerConfig: { rotateEnabled: false ,strokeScaleEnabled: false,
    },
    chromatographyMode:'Gray',
    chromatographyModestatus:1,
    // Konva-blob transform
    blobStatusAdd: false,
    blobItems: [],
    blobTempItems: [], // 站存原始blob資料
    blobTempsData: {
      points: [],
      stroke: '#D83A3B',
      strokeWidth: 8,
      lineJoin: 'round',
      tension: 0.5,
      group_name: '',
    },
    AddTempPoints: [],
    blobPoints: 0,
    removePoint: {
      x: 50,
      y: 50,
      radius: 10,
      fill: 'red',
      name: 'removePoint',
      status: true,
      visible: false,
    },
    showMenu: false,
    MenuStatus: false,
    MenuX: 0,
    MenuY: 0,
    recordChangeblob: null, // 保存被觸發的blob
    drageObjects: [], // 保存編輯點
    blobObjectsFocus: false, // 判斷物件有沒有被點取
    recordIsMovingPoinst: 0,
    serverMessageStatus: false, // 系統訊息
    serverMessage: '',
    GroupNameitems: ['wire', 'joint', 'componemt'], // 選取群組用
    GroupName: 'wire', // 選取群組
    // end
    detailed: false,
    liveStatus: false, // live 狀態
    tab1: 'tab-2',
    tabcontent: ['手動偵測區域', ''],
    // 影像對照圖
    ImagecomparisonKonva: {},
    ImagecomparisonKonvaImageConfig: {
      width: 0,
      height: 0,
      image: null,
      scale: 1,
    },
    // 影像放大相關
    zoomLvl: 1,
    zoomstatus: false,
    logZoomPostion: [0, 0, 0, 0],
    zoomin: {
      x: 540,
      y: 20,
      width: 30,
      height: 30,
      image: null,
    },
    zoomout: {
      x: 580,
      y: 20,
      width: 30,
      height: 30,
      image: null,
    },
    autoDisplay: false,
    autoDisplayStatus: true,
    displayObject1: false,
    displayObject2: false,
    displayObject3: false,
    displayObject4: false,
    displayObject5: false,
    RoiAlarmWindowStat: false,
    RoiAlarmWindowFocus: false,
    shortLogBlobGroup: null,
    temperatureChange: [
      ['rgba(216,58,59,0)',
        'rgba(216,58,59,0.4)'],
      ['rgb(255 199 82 / 0%)',
        'rgb(255 199 82 / 50%)'],
      ['rgba(216,58,59,0.4)',
        'rgba(216,58,59,0)'],
      ['rgb(255 199 82 / 60%)',
        'rgb(255 199 82 / 0%)'],
      ['rgb(255 199 82 / 30%)',
        'rgb(255 199 82 / 0%)']],
    blobnumbers: [],
    radioaddarea: 'newarea',
    radioSelectarea: null,
    radioListarea: [],
    focusBlolbNumber: null,
    // 刪除function
    deleteWindows: false,
    focusROI: {
      type: null,
      id: null
    },
    echartsData: null,
    echartsDataST: true,
    ws1: null,
    buffer: true,
    roifpstmp: 0,
    roifps: 0,
    allRoiData: null,
    bufferByWorker: true,
    bufferByWorkerAnimation: true,
    workerBuffer: true,
    anim1: null,
    tempETarget: null,
    temp1scope: null,
    colorbar:{
      max:0,
      min:0
    },
    queryCameraInfoloading:false.valueOf,
    resolutionWs4:null
  }),
  created() {
    // this.NuxtSetting = axios({
    //   method: 'get',
    //   url: "/getSetting",
    // }).then((params) => {
    //   var config = params.data
    //   // console.log(config)
    //   this.NuxtSetting = config
    // }).catch((err) => console.error(err))
  },
  mounted() {
    setTimeout(()=>{
      var layer = this.$refs.layer.getNode()
      var test = layer.find('.scope1')
      console.log('got test', test);
    },3000)
    // 刷新左上角相機列表
    this.queryCameraInfoloading = true
    this.showCamList()
    // this.roifpsInterval = setInterval(() => {
    //   this.roifpstmp = this.roifps
    //   this.roifps = 0
    // }, 1000)
    
    // console.log("auth")
    // test nuxt api
    // console.log(this.NuxtSetting)
    // var webs = new WebSocket('ws://localhost:6780/server1')
    // webs.onopen = () => {
    //   console.log('ope')
    // }
    // webs.onclose = () => {
    //   console.log('close')
    // }
    // var tet = 0
    // setInterval(() => {
    //   webs.send(tet)
    //   tet += 1
    // },100)
    // 
    const tabe = this.tab2
    document.onkeydown = function (event) {
      var id = document.getElementById('consoleMjpg2')
      var e = event || window.event
      // console.log(e.keyCode, tabe)
      if (e && e.keyCode === 192 && tabe === 'tab-2') {
        if (id.classList.contains('d-none')) {
          id.classList.remove('d-none')
        } else {
          id.classList.add('d-none')
        }
      }
    }
    console.log(Konva)
    var canvasWidth = document.getElementById('image').clientWidth
    var canvasHeight = document.getElementById('image').clientHeight
    this.canvasKonva = {
      width: canvasWidth,
      height: canvasHeight,
    }
    this.configKonva = {
      width: canvasWidth,
      height: canvasHeight,
    }
    // console.log(this.camid)
    // this.ws = new WebSocket('ws://localhost:8777')
    // this.ws1 = new WebSocket(this.$config.webSocket)
    // this.ws1 = new WebSocket('ws://localhost:8701')
    this.openStreaming()

    const SpotsImage = new window.Image()
    SpotsImage.src = '/images/spot_1.png'
    SpotsImage.onload = () => {
      this.konvaSpot = SpotsImage
    }

    // 右3圓餅顯示
    this.interval = setInterval(() => {
      if (this.valueToday > 100) {
        return (this.valueToday = 0)
      }
      // this.valueToday += 1
    }, 1000)
    // 右3圓餅顯示
    this.arrayEvents = [...Array(6)].map(() => {
      const day = Math.floor(Math.random() * 30)
      const d = new Date()
      d.setDate(day)
      return d.toISOString().substr(0, 10)
    })
    // 右2假資料

    this.temps.duration = setInterval(this.countdown, 1000)

    // 定時呼叫api
    // this.Refresh()
    this.timeOutRefresh = setInterval(() => {
      if (this.Interval === 0) {
        this.Interval = 1
      }
    }, 1000)
    this.Refresh()
    // 多邊形-定時呼叫api start--------------------------------------- -------
    // this.timeOutRefresh1 = setInterval(() => {
    //   if (this.Interval === 0) {
    //     this.Interval = 1
    //   }
    // }, 1000)
    // this.Refresh1()
    // 多邊形-呼叫api end---------------------------------------------------

    // this.alarmDate = '2022-06-04'
    this.alarmlist(this.alarmDate)
    this.alarmlistInterval = setInterval(() => {
      this.alarmlist(this.alarmDate)
    }, 5000)

    // 對照圖程式
    this.imagecomparison()
    this.autoDisplayStatus = false
    this.konvaAnimation() // 執行konva動畫
    // 給blob上編號
    // setInterval(() => {
    //   this.BlobCalculateNumber()
    // })

    // temp
    const resolution2 = new window.Image()
    resolution2.src = '/EMPTYv1-fill.png'
    resolution2.onload = () => {
      this.image1.width = canvasWidth
      this.image1.height = canvasHeight
      // set image only when it is loaded
      this.image1.image = resolution2
      var resolutiongroup = this.$refs.resolution.getNode()
      resolutiongroup.clip({
        x: 0,
        y: 0,
        width: canvasWidth / 2,
        height: canvasHeight
      })
    }
    const resolution3 = new window.Image()
    resolution3.src = '/Union12arrow.png'
    resolution3.onload = () => {
      this.resolutionEventCircle.image = resolution3
    }
    this.resolutionEventCircle.offsetX = -canvasWidth / 2 + (39 / 2)
    this.resolutionEventCircle.offsetY = -canvasHeight / 2 + (39 / 2)
    this.resolutionline.x = canvasWidth / 2
    // this.openResolutionStreaming()
  },
  // 對話框
  computed: {
    messages() {
      return this.showMessages ? ['已開啟'] : ['未開啟']
    },
  },
  watch: {
    $route(to, from) {
      this.showCamList()
    },
    displayObject5(data){
      this.resolutionEventCircle.visible = data
      this.resolutionConfig.visible = data
      this.resolutionline.visible = data
      // console.log(data);
    }
  },
  methods: {
    srshwish(data){
      if(data) {
        this.displayObject5 = true
      }else{
        this.displayObject5 = false
      }
      var st = 0
      if (this.displayObject5) {
        if (this.chromatographyModestatus === 1) {
          st = 1
        } else if (this.chromatographyModestatus === 2) {
          st = 2
        } else if (this.chromatographyModestatus === 3) {
          st = 3
        }
      } else {
        st = 0
      }
      this.ws4.send(JSON.stringify({
        // main_item: "camera",
        type: "camera",
        sub_item: "superResolutionStatus",
        action: "set",
        session: Math.random().toString(36).substr(2),
        content: {
          "cam_id": this.$route.query.cam,
          "status": st,
          "highTemperatureArea" : 0
        }
      }))
    },
    resolutionEventstart(){
      document.body.style.cursor = 'e-resize'
      var box1 = document.querySelectorAll('.box')[0]
      box1.style.pointerEvents = 'none'
    },
    resolutionEventout(){
      document.body.style.cursor = 'default'
      var box1 = document.querySelectorAll('.box')[0]
      box1.style.pointerEvents = 'auto'
    },
    resolutionEventMove(e){
      var canvasWidth = document.getElementById('image').clientWidth
      var canvasHeight = document.getElementById('image').clientHeight
      e.target.y(0)
      if (e.target.x() < -(canvasWidth / 2) + 1) {
        e.target.x(-(canvasWidth / 2) + 1)
      }
      console.log(-(canvasWidth / 2),e.target.x());
      if (e.target.x() > (canvasWidth / 2)) {
        e.target.x(((canvasWidth / 2)))
      }
      var resolutiongroup = this.$refs.resolution.getNode()
      resolutiongroup.clip({
        x: 0,
        y: 0,
        width: (canvasWidth / 2) + e.target.x(),
        height: canvasHeight
      })
      this.resolutionline.x = (canvasWidth / 2) + e.target.x()
      // console.log(e.target.x());
    },
    chromatographyModeselect(data){
      if(data === 'Gray'){
        this.thermalimg = '/images/colorbar_greyscale.png'
      } else if(data === 'Rainbow'){
       this.thermalimg = '/images/rainbow_bar1.png'
      } else if (data === 'Iron') {
        this.thermalimg = '/images/iron_bar.png'
      }
      this.chromatographyMode = data
      var st = 0
      if (this.displayObject5) {
        if (data === 'Gray') {
          st = 1
        } else if (data === 'Rainbow') {
          st = 2
        } else if (data === 'Iron') {
          st = 3
        }
      } else {
        st = 0
      }
      this.ws4.send(JSON.stringify({
        // main_item: "camera",
        type: "camera",
        sub_item: "superResolutionStatus",
        action: "set",
        session: Math.random().toString(36).substr(2),
        content: {
          "cam_id": this.$route.query.cam,
          "status": st // "off" = 關閉 super resolution ; "on" = 開啟 super resolution
        }
      }))
    },
    openResolutionStreaming() {
      // 定時呼叫目前位置給後端
      if(this.sendCameraIdtoInt !== null) {
        clearInterval(this.sendCameraIdtoInt)
        this.sendCameraIdtoInt = null
      }
      this.sendCameraIdtoInt = setInterval(()=>{
        var st = 0
        if(this.displayObject5){
          if(this.chromatographyModestatus === 1) {
            st = 1
          }else if (this.chromatographyModestatus === 2) {
            st = 2
          } else if (this.chromatographyModestatus === 3) {
            st = 3
          }
        }else{
          st = 0
        }
        this.ws4.send(JSON.stringify({
          // main_item: "camera",
          type: "camera",
          sub_item: "superResolutionStatus",
          action: "set",
          session: Math.random().toString(36).substr(2),
          content: {
            "cam_id": this.$route.query.cam,
            "status": st // "off" = 關閉 super resolution ; "on" = 開啟 super resolution
          }
        }))
      },5000)
      // resolutionWs4
      this.resolutionWs4 = new WebSocket('ws://localhost:8704')
      this.resolutionWs4.onopen = () => {
        this.liveStatus = true
        console.log('resolutionWs4 串流連線成功')
        var loaders = document.getElementById(`sleleton-loaders-custom`)
        loaders.classList.add('ui-skeleton-loaders-display-none')
      }
      this.resolutionWs4.onclose = () => {
        this.liveStatus = false
        console.log('resolutionWs4 串流斷線')
        setTimeout(() => {
          console.log('resolutionWs4 串流重新連接中...')
          this.openResolutionStreaming()
        }, 3000)
      }
      var tempimg = []
      this.resolutionWs4.onmessage = (event) => {
        try {
          var data = JSON.parse(event.data)
          var blob1 = getBlob(atob(data.base64), 'image/jpg')
          var objectURL1 = URL.createObjectURL(blob1)
          // const canvas12 = document.getElementById(`streamingVIS`)
          const image123 = new window.Image()
          // this.ImagecomparisonKonvaImageConfig.image = objectURL1
          image123.src = objectURL1
          image123.onload = () => {
            // set image only when it is loaded
            this.image1.image = image123
            var tempimglen = tempimg.length
            for (var i = 0; i < tempimglen; i++) {
              URL.revokeObjectURL(tempimg[i])
            }
            tempimglen = null
            tempimg = []
            // URL.revokeObjectURL(tempimg)
          }
          // canvas12.src = objectURL1
          tempimg.push(objectURL1)
        } catch (error) {
          console.log(error)
        }
      }
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
    openStreaming() {
      // 定時呼叫目前位置給後端
      if (this.sendCameraIdtoInt !== null) {
        clearInterval(this.sendCameraIdtoInt)
        this.sendCameraIdtoInt = null
      }
      this.sendCameraIdtoInt = setInterval(() => {
        var st = 0
        if (this.displayObject5) {
          if (this.chromatographyModestatus === 1) {
            st = 1
          } else if (this.chromatographyModestatus === 2) {
            st = 2
          } else if (this.chromatographyModestatus === 3) {
            st = 3
          }
        } else {
          st = 0
        }
        this.ws4.send(JSON.stringify({
          // main_item: "camera",
          type: "camera",
          sub_item: "superResolutionStatus",
          action: "set",
          session: Math.random().toString(36).substr(2),
          content: {
            "cam_id": this.$route.query.cam,
            "status": st // "off" = 關閉 super resolution ; "on" = 開啟 super resolution
          }
        }))
      }, 5000)
      // resolutionWs4
      this.ws1 = new WebSocket(this.$config.webSocket)
      this.ws1.onopen = () => {
        this.liveStatus = true
        console.log('tab-1 串流連線成功')
        var loaders = document.getElementById(`sleleton-loaders-custom`)
        loaders.classList.add('ui-skeleton-loaders-display-none')
      }
      this.ws1.onclose = () => {
        this.liveStatus = false
        console.log('tab-1 串流斷線')
        if(this.wsblock){
        setTimeout(() => {
          console.log('tab-1 串流重新連接中...')
          this.openStreaming()
        }, 3000)
        }
      }
      let prevObjectURL = null
      var tempimg = []
      var tempimg2 = []
      this.ws1.onmessage = (event) => {
        try {
          this.webStatus = '連線成功'
          var data = JSON.parse(event.data)

          var blob1 = getBlob(atob(data.cam_currentVIS), 'image/jpg')
          var objectURL1 = URL.createObjectURL(blob1)
          // const canvas12 = document.getElementById(`streamingVIS`)
          const image123 = new window.Image()
          // this.ImagecomparisonKonvaImageConfig.image = objectURL1
          image123.src = objectURL1
          image123.onload = () => {
            // set image only when it is loaded
            this.ImagecomparisonKonvaImageConfig.image = image123
            var tempimglen = tempimg.length
            for (var i = 0; i < tempimglen; i++){
              URL.revokeObjectURL(tempimg[i])
            }
            tempimglen = null
            tempimg = []
            // URL.revokeObjectURL(tempimg)
          }
          // canvas12.src = objectURL1
          tempimg.push(objectURL1)
          // SR
          var blob2 = getBlob(atob(data.cam_currentSR), 'image/jpg')
          var objectURL2 = URL.createObjectURL(blob2)
          // const canvas12 = document.getElementById(`streamingVIS`)
          const image32 = new window.Image()
          // this.ImagecomparisonKonvaImageConfig.image = objectURL1
          image32.src = objectURL2
          image32.onload = () => {
            // set image only when it is loaded
            this.image1.image = image32
            var tempimglen1 = tempimg2.length
            for (var as2 = 0; as2 < tempimglen1; as2++) {
              URL.revokeObjectURL(tempimg2[as2])
            }
            tempimglen1 = null
            tempimg2 = []
            // URL.revokeObjectURL(tempimg)
          }
          // canvas12.src = objectURL1
          tempimg2.push(objectURL2)
          // console.log(this.camid, data[this.camid])
          // var cameraName = []
          // Object.keys(data).forEach(key => {
          //   cameraName.push(key)
          // })
          // console.log('images is updated')
          // var data = JSON.parse(event.data)
          var blob = null
          if(this.chromatographyMode === 'Gray'){
            this.chromatographyModestatus = 1
            blob = getBlob(atob(data[this.$route.query.cam]), 'image/jpg')
          }else if(this.chromatographyMode === 'Rainbow'){
            this.chromatographyModestatus = 2
            // console.log("asd" , data.cam_currentIR);
            // blob = getBlob(atob(data[this.$route.query.cam]), 'image/jpg')
            blob = getBlob(atob(data.cam_currentIR), 'image/jpg')
          } else if (this.chromatographyMode === 'Iron') {
            this.chromatographyModestatus = 3
            blob = getBlob(atob(data.cam_currentIRON), 'image/jpg')
          }
          
          var objectURL = URL.createObjectURL(blob)
          // ____old____
          // const image = new window.Image()
          // image.src = objectURL
          // image.onload = () => {
          //   image.width = canvasWidth
          //   image.height = canvasHeight
          //   this.Konvaimage = image
          // }
          // URL.revokeObjectURL(prevObjectURL)
          // prevObjectURL = objectURL
          // _______NEW_______
          const canvas = document.getElementById(`testWebScoket`)
          var img = new Image()
          // img.src = 'data:image/jpeg;base64,' + data[0].img
          var ctx = canvas.getContext('2d')
          img.onload = function () {
            canvas.width = this.naturalWidth
            canvas.height = this.naturalHeight
            // URL.revokeObjectURL(url)
            ctx.drawImage(img, 0, 0, this.width, this.height)
          }
          img.src = objectURL
          URL.revokeObjectURL(prevObjectURL)
          prevObjectURL = objectURL
        } catch (error) {
          console.log(error)
        }
      }
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
    updateSelectDate(event) {
      console.log(event)
      // this.$route.query.cam = event
      this.$router.push({ query: { cam: event, main: this.$route.query.main, secondary: this.$route.query.secondary, tab: 'tab-1' } },()=>{
        var st = 0
        if (this.displayObject5) {
          if (this.chromatographyModestatus === 1) {
            st = 1
          } else if (this.chromatographyModestatus === 2) {
            st = 2
          } else if (this.chromatographyModestatus === 3) {
            st = 3
          }
        } else {
          st = 0
        }
        this.ws4.send(JSON.stringify({
          // main_item: "camera",
          type: "camera",
          sub_item: "superResolutionStatus",
          action: "set",
          session: Math.random().toString(36).substr(2),
          content: {
            "cam_id": this.$route.query.cam,
            "status": st // "off" = 關閉 super resolution ; "on" = 開啟 super resolution
          }
        }))
        console.log('updata rs');
      })
    },
    showCamList() {
      var camAll = []
      axios({
        method: 'post',
        url: 'http://127.0.0.1:5001/api/monitor/camera/list',
        // url: 'http://127.0.0.1:6189/api/monitor/camera/list',
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify([
          {
            main: this.$route.query.main,
            secondary: this.$route.query.secondary,
          },
        ]),
      })
        .then((params) => {
          params.data.forEach((value) => {
            camAll.push({
              text: value.name,
              value: value.cam_id
            })
          })
          this.cameraList = camAll
          this.selectList = this.$route.query.cam
        })
        .catch((err) => console.log(err))
    },
    // 表格event
    tableEvent(data) {
      if (this.echartsData !== data) {
        this.echartsData = data
        document.getElementById('DoNotOperate').style.display = "unset";
      }
      // document.getElementById('tableEvent1').style.cursor = "wait";
      // document.querySelectorAll('.tableEvent').forEach((div) => {
      //   div.style.pointerEvents = "none";
      // })
      // document.querySelectorAll('.flash-video-and-log').forEach((div) => {
      //   div.style.opacity = ".3";
      //   div.style.pointerEvents = "none";
      // })
    },
    // ROI被觸發
    RoisEvent(type, id) {
      this.focusROI = {
        type,
        id
      }
      if (type === 'exit') {
        this.focusROI = {
          type: null,
          id: null
        }
      }
    },
    // 對照圖程式
    imagecomparison() {
      var canvasWidth = document.getElementById(
        'Imagecomparison-konva'
      ).clientWidth
      var canvasHeight = document.getElementById(
        'Imagecomparison-konva'
      ).clientHeight
      this.ImagecomparisonKonva = {
        width: canvasWidth,
        height: canvasHeight,
      }
      this.ImagecomparisonKonvaImageConfig.width = canvasWidth
      this.ImagecomparisonKonvaImageConfig.height = canvasHeight
      const image = new window.Image()
      const image2 = new window.Image()
      const image3 = new window.Image()
      image.src = '/images/Group 2453.png'
      image.onload = () => {
        // set image only when it is loaded
        this.ImagecomparisonKonvaImageConfig.image = image
      }

      image2.src = '/images/zoom-in.png'
      image2.onload = () => {
        // set image only when it is loaded
        this.zoomin.image = image2
      }

      image3.src = '/images/zoom-out.png'
      image3.onload = () => {
        // set image only when it is loaded
        this.zoomout.image = image3
      }
      this.zoomin.x = canvasWidth * 0.89
      this.zoomout.x = canvasWidth * 0.94
    },
    zoomfunction(e, w) {
      const transformerNode = this.$refs.ImagecomparisonKonva.getNode()
      var PW = transformerNode.getParent().width() / 2
      var PH = transformerNode.getParent().height() / 2
      var NodeX = Math.abs(transformerNode.x())
      var NodeY = Math.abs(transformerNode.y())
      var NodeWidth = transformerNode.width() * this.zoomLvl
      var NodeHeight = transformerNode.height() * this.zoomLvl
      var displayCenter = {
        x: NodeX / (NodeWidth + PW),
        y: NodeY / (NodeHeight + PH)
      }
      if (e === 0) {
        if (this.zoomLvl > 1) {
          this.zoomLvl -= 1
        }
        transformerNode.to({
          x: 0,
          y: 0,
          scaleY: this.zoomLvl, scaleX: this.zoomLvl
        })
      } else if (e === 1) {
        if (this.zoomLvl < 4) {
          this.zoomLvl += 1
          transformerNode.to({
            x: -(displayCenter.x * ((transformerNode.width() * this.zoomLvl) + PW)),
            y: -(displayCenter.y * ((transformerNode.height() * this.zoomLvl) + PH)),
            scaleY: this.zoomLvl,
            scaleX: this.zoomLvl
          })
        }
      }
    },
    imagecomparisonImageMove(e, st) {
      // console.log(e)
      var zoomLvl = this.zoomLvl // 放大級數
      var parent = e.target.getParent() // 取得點選元件的父元素
      var pos = parent.getStage().getPointerPosition() // 取得父元素的position
      if (st === 'start') {
        this.logZoomPostion[0] = pos.x
        this.logZoomPostion[1] = pos.y
        this.logZoomPostion[2] = e.target.x()
        this.logZoomPostion[3] = e.target.y()
      }
      if (st === 0) {
        e.target.scale({
          x: zoomLvl,
          y: zoomLvl,
        })
      } else if (st === 1) {
        if (this.zoomstatus && zoomLvl > 1) {
          e.target.x(this.logZoomPostion[2] - (this.logZoomPostion[0] - pos.x))
          e.target.y(this.logZoomPostion[3] - (this.logZoomPostion[1] - pos.y))
          if (e.target.x() > 0) {
            e.target.x(0)
          } else if (e.target.x() < -(parent.getStage().width() * (zoomLvl - 1))) {
            e.target.x(-(parent.getStage().width() * (zoomLvl - 1)))
          }

          if (e.target.y() > 0) {
            e.target.y(0)
          } else if (e.target.y() < -(parent.getStage().height() * (zoomLvl - 1))) {
            e.target.y(-(parent.getStage().height() * (zoomLvl - 1)))
          }
        }
      } else if (st === 2) {
        this.zoomstatus = false
      }
    },
    // 總呼叫程序
    Refresh() {
      this.opneRoiWS1()
      this.twoWayWs()
    },
    queryCameraInfo() {
      this.queryCameraInfoloading = true
      this.ws4.send(
        JSON.stringify({
          cam_id: this.$route.query.cam,
          session: Math.random().toString(36).substr(2),
          type: "cameraParams",
          method: "query",
          params: {}
        })
      )
    },
    sendCameraInfo() {
      this.queryCameraInfoloading = true
      var params = {
        type: "cameraParams",
        cam_id: this.$route.query.cam,
        session: Math.random().toString(36).substr(2),
        method: "modify",
        params: {
          AtmosphericTemperature: this.screenSettings[1].value,
          ObjectDistance: this.screenSettings[3].value,
          ObjectEmissivity: this.screenSettings[4].value,
          ReflectedTemperature: this.screenSettings[0].value,
          RelativeHumidity: this.screenSettings[2].value,
          Transmittance: this.screenSettings[5].value
        }
      }
      console.log("send" ,params);
       this.ws4.send(
        JSON.stringify(params)
        )
        this.frameSettingChange = true
    },
    twoWayWs() {
      var Date1 = this.alarmDate
      this.ws4 = new WebSocket('ws://localhost:8703')
      this.ws4.onopen = () => {
        console.log('成功建立雙向連接')
        var st = 0
        if (this.displayObject5) {
          if (this.chromatographyModestatus === 1) {
            st = 1
          } else if (this.chromatographyModestatus === 2) {
            st = 2
          } else if (this.chromatographyModestatus === 3) {
            st = 3
          }
        } else {
          st = 0
        }
        this.ws4.send(JSON.stringify({
          // main_item: "camera",
          type: "camera",
          sub_item: "superResolutionStatus",
          action: "set",
          session: Math.random().toString(36).substr(2),
          content: {
            "cam_id": this.$route.query.cam,
            "status": st // "off" = 關閉 super resolution ; "on" = 開啟 super resolution
          }
        }))
        // this.queryCameraInfo()
      }
      this.ws4.onclose = () => {
        console.log('雙向連接斷開...')
        if (this.wsblock) {
        setTimeout(() => {
          console.log('雙向重新連接中...')
          this.twoWayWs()
        }, 3000)
        }
      }
      this.ws4.onmessage = (e) => {
        var data = JSON.parse(e.data)
        console.log(data);
        if (data.type === 'alarmList') {
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
            alarmlist.push({
              objcet: { name: name[0], number: number[0] },
              duration: durationCrr(
                index.table_alarm_start,
                index.table_alarm_stop
              ),
              temperature: index.table_max.toFixed(1),
              alertTemperature: index.table_alarm_threshold,
              time: index.table_alarm_start,
              endTime: index.table_alarm_stop
            })
            alarmlist.sort(function (a, b) {
              if (a.time < b.time) {
                return 1 // 正數時，後面的數放在前面
              } else {
                return -1 // 負數時，前面的數放在前面
              }
            })
            alarmlist.sort(function (a, b) {
              if (a.duration[0] !== '持續中') {
                return 1 // 正數時，後面的數放在前面
              } else {
                return -1 // 負數時，前面的數放在前面
              }
            })
            // 觸發時間為警報存在的時間(s)，開始時間為警報設定的時間
          })
          this.valueToday = today
          this.valueLastday = lastday
          this.valueThisWeek = week
          this.valueThisMonth = month
          if (alarmlist.length > 0) {
            if (this.echartsDataST) {
              this.echartsData = alarmlist[0]
              this.echartsDataST = false
            }
          }
          this.temps = alarmlist
        }else if(data.type === 'cameraParams'){
          console.log('camera update');
          var info = data.params
          this.screenSettings = [
            // { name: '一般溫度', value: 0.95, check: false },
            { name: '反射溫度', value: info.ReflectedTemperature, check: false },
            { name: '環境溫度', value: info.AtmosphericTemperature, check: false },
            { name: '環境濕度', value: info.RelativeHumidity, check: false }, // %
            { name: '量測距離', value: info.ObjectDistance, check: false },
            { name: '放射率', value: info.ObjectEmissivity, check: false },
            { name: '穿透率', value: info.Transmittance, check: false },
            // { name: '放射率', value: false, check: true },
            // { name: 'External IR Window', value: false, check: true }
          ]
          this.queryCameraInfoloading = false
        }
      }
      // 秒 轉 分、時、天，並且隱藏時間未到的單位
      function durationCrr(start, stop) {
        if (stop !== null) {
          const nowtime1 = new Date(start)
          const startone1 = new Date(stop)
          const time1 = (startone1.getTime() - nowtime1.getTime()) * 0.001
          var duration = getDuration(time1)
          return duration
        } else {
          const nowtime = new Date()
          const startone = new Date(start)
          const time = (nowtime.getTime() - startone.getTime()) * 0.001
          return ['持續中', getDuration(time.toFixed(0))]
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
          duration = hours + '時' + minutes + '分' + seconds + '秒'
        } else if (second >= 86400) {
          duration =
            days + '天' + hours + '時' + minutes + '分' + seconds + '秒'
        }
        return duration
      }
    },
    opneRoiWS1() {
      var reloaddiv = document.querySelectorAll('.reload1')[0]
      this.ws3 = new WebSocket('ws://localhost:8702')
      // this.ws3 = new WebSocket('ws://localhost:6188/server1')
      this.ws3.onopen = () => {
        reloaddiv.style.opacity = 0
        reloaddiv.style.pointerEvents = 'none'
        console.log('web socket3 is open')
      }
      this.ws3.onmessage = (event) => {
        if (this.tab2 === 'tab-2') {
          var params = JSON.parse(event.data)
          // params = params[this.camid]
          params = params[this.$route.query.cam]
          // console.log(params);
          this.colorbar.max = params.cameraInfo.colorBar.max.toFixed(1)
          this.colorbar.min = params.cameraInfo.colorBar.min.toFixed(1)
          
          // console.log("asd",JSON.stringify(params.scope))
          this.temp1scope = JSON.stringify(params.scope)
          this.saveBlobTempString = JSON.stringify(params.blob)
          this.allRoiData = params
          params = { data: params }
          if (this.dragObjectStatus && this.buffer) {
            // if (this.dragObjectStatus && this.buffer) {
            // console.log(this.tab2)
            this.buffer = false
            this.handleRoi(params)
          }
        }
      }
      this.ws3.onclose = () => {
        if (this.wsblock) {
        console.log('ROI 連接斷開...')
        reloaddiv.style.opacity = 0.6
        reloaddiv.style.pointerEvents = 'auto'
        setTimeout(() => {
          console.log('ROI 重新連接中...')
          this.opneRoiWS1()
        }, 3000)
      }
      }
    },
    handleRoi(params) {
      // console.log('ttttt')
      // axios({
      //   method: 'post',
      //   url: 'http://127.0.0.1:5002/api/monitor/object/data',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   data: JSON.stringify([
      //     {
      //       cam_id: this.camid,
      //     },
      //   ]),
      // })
      //   .then((params) => {
      // 參考點
      var reference = params.data.reference[0]
      var sumtmp = ''
      if (reference.reference_temperature != null) {
        sumtmp = reference.reference_temperature.toFixed(1)
      }
      var referenceArr = {
        reference_temperature: sumtmp,
        X:
          reference.reference_position.X *
          document.getElementById('image').offsetWidth,
        Y:
          reference.reference_position.y *
          document.getElementById('image').offsetHeight,
      }
      this.reference = referenceArr
      // 取得"點"資料
      var array = params.data.spot
      // console.log(params.data.spot)
      array.forEach(function (index) {
        // console.log(index.position.Y)
        if (index.spot_temperature != null) {
          index.spot_temperature = index.spot_temperature.toFixed(1)
        }
        index.spot_position.X =
          index.spot_position.X *
          document.getElementById('image').offsetWidth
        index.spot_position.Y =
          index.spot_position.Y *
          document.getElementById('image').offsetHeight
      })
      if (this.dragObjectStatus) {
        this.spots = params.data.spot
      }
      // 取得"點"資料 end
      // 取得"範圍"資料
      var scopes = params.data.scope
      scopes.forEach(function (index) {
        if (index.scope_temperature_max != null) {
          index.scope_temperature_max =
            index.scope_temperature_max.toFixed(1)
        }
        index.scope_position_point_BR.X =
          document.getElementById('image').offsetWidth *
          (index.scope_position_point_BR.X -
            index.scope_position_point_LT.X)
        index.scope_position_point_BR.Y =
          document.getElementById('image').offsetHeight *
          (index.scope_position_point_BR.Y -
            index.scope_position_point_LT.Y)

        index.scope_position_point_LT.X =
          index.scope_position_point_LT.X *
          document.getElementById('image').offsetWidth
        index.scope_position_point_LT.Y =
          index.scope_position_point_LT.Y *
          document.getElementById('image').offsetHeight
      })
      if (this.dragObjectStatus) {
        this.scopes = params.data.scope
        this.dragScopeTempData = params.data.scope
        if (this.tempETarget !== null) {
          this.tempETarget.target.scaleY(1)
          this.tempETarget.target.scaleX(1)
          this.tempETarget = null
        }
      }
      // 取得"範圍"資料 end
      // 取得"線"資料
      var lines = params.data.line
      lines.forEach(function (index) {
        if (index.line_temperature_max != null) {
          index.line_temperature_max = index.line_temperature_max.toFixed(1)
        }
        index.line_position_point_A.X =
          index.line_position_point_A.X *
          document.getElementById('image').offsetWidth
        index.line_position_point_A.Y =
          index.line_position_point_A.Y *
          document.getElementById('image').offsetHeight
        index.line_position_point_B.X =
          index.line_position_point_B.X *
          document.getElementById('image').offsetWidth
        index.line_position_point_B.Y =
          index.line_position_point_B.Y *
          document.getElementById('image').offsetHeight
      })
      if (this.dragObjectStatus) {
        this.lines = params.data.line
      }
      // 取得"線"資料 end
      // 取得"blob"資料'
      try {
        // ---- 2023-01-31
        var blob = params.data.blob

        // add web worker function
        // console.log('run worker')
        if (this.bufferByWorker) {
          this.bufferByWorker = false
          var worker = new Worker('/worker/object.js');
          worker.postMessage(
            {
              data: blob,
              height: document.getElementById('image').offsetHeight,
              width: document.getElementById('image').offsetWidth
            });
          worker.addEventListener('message', (e) => {
            // this.test = e.data[0][0]
            // console.log('Worker said: ', e.data);
            this.blobItems = e.data
            this.bufferByWorker = true
            worker.terminate()
          }, false);
        }
        // web worker function end

        // var arrblob = []
        var blobnumber = []
        // var blob = params.data.blob
        this.blobTempItems = params.data.blob
        // var savedblob = blob.filter((item, index, array) => {
        //   return item.blob_number === this.recordChangeblob;
        // });
        // if (savedblob.length > 0) {
        //   var ar1 = this.currentIndex(savedblob)
        //   ar1.forEach((item) => {
        //     arrblob.push(item)
        //   })
        // }
        // // arrblob.push(savedblob)
        blob.forEach((index) => {
          blobnumber.push(index.blob_number)
          // if (index.blob_number !== this.recordChangeblob) {
          // var ar = this.currentIndex(index)
          // ar.forEach((item) => {
          //   arrblob.push(item)
          // })
          // }
        })
        // this.blobItems = arrblob
        // // console.log(this.blobItems)
        this.radioListarea = blobnumber

        // this.BlobCalculateNumber()
      } catch {
        console.log('er')
      }
      // this.blobItems = arrblob
      // 取得"blob"資料 end
      // this.Interval = 0
      // })
      // .catch((error) => console.log('error from axios', error))
      this.buffer = true
      this.roifps += 1
    },
    // 刪除總程序
    deleteFunction() {
      console.log('123')
    },
    clearKonva() {
      console.log('清除')
      const transformerNode = this.$refs.transformer.getNode()
      const stage = transformerNode.getStage()
      // const selectedNode = stage.findOne('.bimage')
      stage.destroy()
      this.ws1.close()
      this.ws1 = null
    },
    // +++++++++++++ Konva Roi Function START+++++++++++++
    // 指定移動到某區塊將滑鼠風格改變
    TransformV(e) {
      if (e === 'over') {
        document.body.style.cursor = 'move'
      } else if (e === 'out') {
        document.body.style.cursor = 'default'
      } else if (e === 'click') {
        document.body.style.cursor = 'pointer'
      }
    },
    // 避免kovan元素超出邊界
    handleDragStart(e) {
      const x = e.target.x()
      const y = e.target.y()
      const canvasKonva = this.canvasKonva
      if (x <= 0) {
        e.target.x(0)
      } else if (x >= canvasKonva.width) {
        e.target.x(canvasKonva.width)
      }

      if (y <= 0) {
        e.target.y(0)
      } else if (y >= canvasKonva.height) {
        e.target.y(canvasKonva.height)
      }
    },
    // ____Konva line function____
    // 開始移動執行
    handleLineCircleTransformStart(number, type) {
      this.dragLineId = [number, type]
      // console.log(number)
      this.dragObjectStatus = false
    },
    // 正在移動時執行
    handleLineCircleTransformMove(e) {
      const lineData = this.lines
      const data = lineData.find((e) => e.line_number === this.dragLineId[0])
      // console.log(data)
      const x = e.target.x()
      const y = e.target.y()
      const canvasKonva = this.canvasKonva
      if (x <= 0) {
        e.target.x(0)
      } else if (x >= canvasKonva.width) {
        e.target.x(canvasKonva.width)
      }

      if (y <= 0) {
        e.target.y(0)
      } else if (y >= canvasKonva.height) {
        e.target.y(canvasKonva.height)
      }
      if (this.dragLineId[1] === 'A') {
        data.line_position_point_A.X = e.target.x()
        data.line_position_point_A.Y = e.target.y()
      } else if (this.dragLineId[1] === 'B') {
        data.line_position_point_B.X = e.target.x()
        data.line_position_point_B.Y = e.target.y()
      }
      // console.log(x, y)
    },
    // 結束移動時執行
    handleLineCircleTransformEnd(e) {
      const lineData = this.lines
      const data = lineData.find((e) => e.line_number === this.dragLineId[0])
      var PAX = data.line_position_point_A.X
      var PAY = data.line_position_point_A.Y
      var PBX = data.line_position_point_B.X
      var PBY = data.line_position_point_B.Y
      const idc = this.$route.query.cam
      var LineData = {
        type: "roiChangeLine",
        cam_id: idc,
        session: Math.random().toString(36).substr(2),
        line_status: '0',
        line_number: data.line_number,
        line_position_point_A: {
          Y: PAY / document.getElementById('image').offsetHeight,
          X: PAX / document.getElementById('image').offsetWidth,
        },
        line_position_point_B: {
          Y: PBY / document.getElementById('image').offsetHeight,
          X: PBX / document.getElementById('image').offsetWidth,
        },
        line_alarm_status: data.line_alarm_status,
        line_threshold: data.line_threshold,
      }
      var put = (data1) => {
        this.ws4.send(JSON.stringify(data1))
        // axios({
        //   method: 'post',
        //   // url: `http://${window.location.hostname}:5002/api/monitor/object/change/line`,
        //   url: `http://localhost:5002/api/monitor/object/change/line`,
        //   data,
        // }).catch((error) => console.log('error from axios', error))
      }
      put(LineData)
      this.dragObjectStatus = true
      // this.Refresh()
    },

    // ____Konva scope function____
    actionScopeClick(status) {
      var InputScopeData = {
        // cam_id: this.camid,
        type: 'roiChangeScope',
        cam_id: this.$route.query.cam,
        session: Math.random().toString(36).substr(2),
        scope_number: this.focusRoiTempData.scope_number,
        scope_status: '0',
        scope_position_LT: {
          Y: this.focusRoiTempData.scope_position_point_LT.Y / document.getElementById('image').offsetHeight,
          X: this.focusRoiTempData.scope_position_point_LT.X / document.getElementById('image').offsetWidth,
        },
        scope_position_BR: {
          Y: (this.focusRoiTempData.scope_position_point_BR.Y + this.focusRoiTempData.scope_position_point_LT.Y) /
            document.getElementById('image').offsetHeight,
          X: (this.focusRoiTempData.scope_position_point_BR.X + this.focusRoiTempData.scope_position_point_LT.X) /
            document.getElementById('image').offsetWidth,
        },
        scope_alarm_status: this.focusRoiTempData.scope_alarm_status,
        scope_threshold: this.focusRoiTempData.scope_threshold,
      }
      // console.log(Scopedata, InputScopeData)
      if (status === 0) {
        // 返回
        this.AiAddRoiMassage = false
      } else if (status === 1) {
        // 刪除
        InputScopeData.scope_status = '1'
        this.ws4.send(JSON.stringify(InputScopeData))
        this.AiAddRoiMassage = false
      } else if (status === 2) {
        // 保留
        this.ws4.send(JSON.stringify(InputScopeData))
        this.AiAddRoiMassage = false
      }


    },
    // 正在移動時執行
    handleScopeClick(id) {
      // console.log(id)
      this.dragScopeId = id
    },
    // 邊界被改變中
    handleScopeTransformMove(e) {
      const id = this.dragScopeId
      const data = this.dragScopeTempData
      this.dragObjectStatus = false
      var newArray = data.filter((item) => item.scope_number !== id)
      this.dragScopeTempData = newArray
      this.transformlimit(e)
      const x = e.target.x()
      const y = e.target.y()
      const canvasKonva = this.canvasKonva
      if (x < 0) {
        e.target.x(5)
      } else if (
        x + e.target.width() * Math.abs(e.target.scaleX()) >
        canvasKonva.width
      ) {
        e.target.x(
          canvasKonva.width - e.target.width() * Math.abs(e.target.scaleX()) - 5
        )
      }
      if (y <= 0) {
        e.target.y(5)
      } else if (
        y + e.target.height() * e.target.scaleY() >=
        canvasKonva.height
      ) {
        e.target.y(
          canvasKonva.height - e.target.height() * e.target.scaleY() - 5
        )
      }
      // console.log(
      //   e.target.x(),
      //   e.target.y(),
      //   e.target.children[0].width() * Math.abs(e.target.scaleX()),
      //   e.target.children[0].height() * Math.abs(e.target.scaleY()),
      //   e.target.scaleX(),
      //   e.target.scaleY()
      // )
    },
    // 調整框事件
    handleTransformMove(e) {
      const id = this.dragScopeId
      const data = this.dragScopeTempData
      this.dragObjectStatus = false
      var newArray = data.filter((item) => item.scope_number !== id)
      this.dragScopeTempData = newArray
      this.tempRactData = e
      
      // Scopedata = null
      // Scopedata.scope_position_point_LT.X = e.target.x()
      // Scopedata.scope_position_point_LT.Y = e.target.y()
      // Scopedata.scope_position_point_BR.X =
      //   e.target.width() * e.target.scaleX()
      // Scopedata.scope_position_point_BR.Y =
      //   e.target.height() * e.target.scaleY()
      // Scopedata.scope_position_point_LT.X = 0
      // Scopedata.scope_position_point_LT.Y = 0
      // Scopedata.scope_position_point_BR.X = 0
      // Scopedata.scope_position_point_BR.Y = 0
      // console.log(
      //   e.target.x(),
      //   e.target.y(),
      //   e.target.width() * Math.abs(e.target.scaleX()),
      //   e.target.height() * Math.abs(e.target.scaleY()),
      //   e.target.scaleX(),
      //   e.target.scaleY()
      // )
    },
    // 結束移動時執行
    handleTransformEnd(e) {
      const id = this.dragScopeId
      const data = this.scopes
      const Scopedata = data.find((o) => o.scope_number === id)
      // var newArray = data.filter((item) => item.scope_number !== id)
      // this.scopes = newArray
      // console.log(newArray)

      var scopeltY =
        e.target.y() / document.getElementById('image').offsetHeight
      var scopeltX = e.target.x() / document.getElementById('image').offsetWidth
      var scopeBRY =
        (e.target.y() + e.target.height() * e.target.scaleY()) /
        document.getElementById('image').offsetHeight
      var scopeBRX =
        (e.target.x() + e.target.width() * e.target.scaleX()) /
        document.getElementById('image').offsetWidth
      // e.target.scaleY(1)
      // e.target.scaleX(1)
      this.tempETarget = e
      var InputScopeData = {
        // cam_id: this.camid,
        type: 'roiChangeScope',
        cam_id: this.$route.query.cam,
        session: Math.random().toString(36).substr(2),
        scope_number: id,
        scope_status: '0',
        scope_position_LT: {
          Y: scopeltY,
          X: scopeltX,
        },
        scope_position_BR: {
          Y: scopeBRY,
          X: scopeBRX,
        },
        scope_alarm_status: Scopedata.scope_alarm_status,
        scope_threshold: Scopedata.scope_threshold,
      }
      console.log(InputScopeData);
      this.ws4.send(JSON.stringify(InputScopeData))
      // axios({
      //   method: 'post',
      //   url: `http://localhost:5002/api/monitor/object/change/scope`,
      //   data: InputScopeData,
      // })
      //   .then(() => {
      this.dragObjectStatus = true

      //   })
      //   .catch((error) => console.log('error from axios', error))
      // this.dragObjectStatus = true
      // console.log(
      //   InputScopeData,
      //   e.target.x(),
      //   e.target.y(),
      //   e.target.width() * e.target.scaleX(),
      //   e.target.height() * e.target.scaleY()
      // )
    },
    // resize 範圍限制
    // transformlimit1(e){
    //   console.log(e.target.width() * e.target.scaleX());
    //   var width = e.target.width() * e.target.scaleX()
    //   if (width < 50) {
    //     e.target.stopTransform();
    //   }
    // },
    transformlimit(e) {
      // 參考:https://konvajs.org/docs/sandbox/Limited_Drag_And_Resize.html
      function getCorner(pivotX, pivotY, diffX, diffY, angle) {
        const distance = Math.sqrt(diffX * diffX + diffY * diffY)

        /// find angle from pivot to corner
        angle += Math.atan2(diffY, diffX)

        /// get new x and y and round it off to integer
        const x = pivotX + distance * Math.cos(angle)
        const y = pivotY + distance * Math.sin(angle)

        return { x, y }
      }
      function getClientRect(rotatedBox) {
        const { x, y, width, height } = rotatedBox
        const rad = rotatedBox.rotation

        const p1 = getCorner(x, y, 0, 0, rad)
        const p2 = getCorner(x, y, width, 0, rad)
        const p3 = getCorner(x, y, width, height, rad)
        const p4 = getCorner(x, y, 0, height, rad)
        const minX = Math.min(p1.x, p2.x, p3.x, p4.x)
        const minY = Math.min(p1.y, p2.y, p3.y, p4.y)
        const maxX = Math.max(p1.x, p2.x, p3.x, p4.x)
        const maxY = Math.max(p1.y, p2.y, p3.y, p4.y)

        return {
          x: minX,
          y: minY,
          width: maxX - minX,
          height: maxY - minY,
        }
      }
      const canvasKonva = this.canvasKonva
      // const transformerNode = this.$refs.transformer.getNode()
      // const stage = transformerNode.getStage()
      // console.log(stage.width(), stage.height())
      // console.log(Konva.Util.getRandomColor())
      this.transformerConfig = {
        rotateEnabled: false,
        keepRatio: false,
        
        boundBoxFunc: (oldBox, newBox) => {
          // console.log(canvasKonva);
          const box = getClientRect(newBox)
          const transformerNode = this.$refs.transformer.getNode()
          const isOut =
            box.x < 0 ||
            box.y < 0 ||
            box.x + box.width > canvasKonva.width ||
            box.y + box.height > canvasKonva.height
          // if new bounding box is out of visible viewport, let's just skip transforming
          // this logic can be improved by still allow some transforming if we have small available space

          // const min 為scope最少選取範圍 自訂新增
          // const min = newBox.width < 50 || newBox.height < 50
          if (isOut) {
            return oldBox
          }
          if (box.width < (canvasKonva.width * (1/120)) || box.height < (canvasKonva.height * (1 / 120))){
            transformerNode.stopTransform()
            setTimeout(() => {
              this.handleTransformEnd(this.tempRactData)
              this.dragObjectStatus = true
            },100)
            // return oldBox
            return oldBox
          }
          return newBox
        },
      }
      // console.log(
      //   e.target.x(),
      //   e.target.y(),
      //   e.target.children[0].width() * e.target.scaleX(),
      //   e.target.children[0].height() * e.target.scaleY()
      // )
    },
    // 產生resize物件
    handleStageMouseDown(e) {
      // clicked on stage - clear selection
      if (e.target === e.target.getStage()) {
        this.selectedShapeName = ''
        this.updateTransformer()
        return
      }

      // clicked on transformer - do nothing
      const clickedOnTransformer =
        e.target.getParent().className === 'Transformer'
      if (clickedOnTransformer) {
        return
      }

      // find clicked rect by its name
      var name = e.target.name()

      // const name = e.target.parent.attrs.name
      // console.log(e.target.parent.attrs.name)
      // const rect = this.scopes.find((r) => r.scope_number === name)
      // console.log(name)
      // if (name === 'removePoint') {
      if (name === 'removePoint' || name === 'blob' || name === 'blobFind') {
        name = ''
      }

      // if(name !== 'spline'){
      //   this.splineObjectsFocus = false
      // }
      const rect = true

      if (rect) {
        this.selectedShapeName = name
      } else {
        this.selectedShapeName = ''
      }
      this.updateTransformer()
    },
    // 更新 resize物件
    updateTransformer() {
      // here we need to manually attach or detach Transformer node
      const transformerNode = this.$refs.transformer.getNode()
      const stage = transformerNode.getStage()
      const { selectedShapeName } = this

      const selectedNode = stage.findOne('.' + selectedShapeName)
      // do nothing if selected node is already attached
      if (selectedNode === transformerNode.node()) {
        return
      }

      if (selectedNode) {
        // attach to another node
        transformerNode.nodes([selectedNode])
      } else {
        // remove transformer
        transformerNode.nodes([])
      }
    },
    // scope function END
    // ___________Konva blob function___________
    // 暫時獨立拉出來取資料，等待後臺開發
    // blob add switch
    blobAddSwitch() {
      this.blobStatusAdd = true
      document.body.style.cursor = 'crosshair'
      this.dragObjectStatus = false
     this.stopListener.visible = true
      // stage.off('mousedown touchstart mousemove touchmove mouseup touchend');
    },
    // konva 動畫
    konvaAnimation() {
      var stage = this.$refs.stage.getNode()
      // var index1 = 0
      var e = true
      var anim = new Konva.Animation((frame) => {
        if (e) {
          e = false
          // 限制禎率
          var delay = Math.min(1000, (1000 / 6) - frame.timeDiff)
          // var delay = Math.min(1000, (1000 / 60) - frame.timeDiff) // 20230609 test
          setTimeout(() => {
            try {
              // var path = stage.find('.blobFind')
              // var data = []
              // var tmpPoint = []
              // path.forEach((value, index) => {
              //   // Blob background fill 
              //   var co2 = Math.abs(Math.sin((frame.time * 2 * Math.PI) / 3000) / 4) + 0.2 // 貝茲曲線函數
              //   var roiNumber = parseFloat(value.attrs.blob_number)
              //   var roiTemperatureMax = parseFloat(value.attrs.blob_temperature_max)
              //   var roiAlarmStatus = parseInt(value.attrs.blob_alarm_status)
              //   var roigroupname = value.attrs.group_name
              //   var roiThreshold = parseFloat(value.attrs.blob_threshold)
              //   if (this.focusBlolbNumber !== null) {
              //     var focusBlolbNumber = parseInt(this.blobItems[parseInt(this.focusBlolbNumber)].blob_number)
              //   }
              //   if (roiAlarmStatus === 1 && roiTemperatureMax >= roiThreshold) { // 超溫
              //     if (focusBlolbNumber === roiNumber) {
              //       value.fill(`rgba(216,58,59,0.7)`)
              //     } else {
              //       value.fill(`rgba(216,58,59,${co2})`)
              //     }
              //     value.fillPatternImage('')
              //     value.stroke('rgb(216,58,59)')
              //   } else { // 沒超溫
              //     // 選取相同區域
              //     if (focusBlolbNumber === roiNumber) {
              //       value.fillPatternImage(this.fillBackground(
              //         this.temperatureChange[3][0],
              //         this.temperatureChange[3][1]
              //       ))
              //     } else {
              //       value.fillPatternImage(this.fillBackground(
              //         this.temperatureChange[1][0],
              //         this.temperatureChange[1][1]
              //       ))
              //       if (this.shortLogBlobGroup === roigroupname) {
              //         value.fillPatternImage(this.fillBackground(
              //           this.temperatureChange[4][0],
              //           this.temperatureChange[4][1]
              //         ))
              //       }
              //     }

              //     value.fill('')
              //     value.stroke('rgb(255 199 82)')
              //   }
              //   // Blob background fill end
              //   // Add number to blob
              //   var SelfRect = value.getSelfRect()

              //   data.push({
              //     path: value.dataArray,
              //     SelfRect,
              //     blob_alarm_status: value.attrs.blob_alarm_status,
              //     blob_temperature_max: value.attrs.blob_temperature_max,
              //     blob_threshold: value.attrs.blob_threshold,
              //     blob_number: value.attrs.blob_number
              //   })
              //   tmpPoint.push(value.attrs.points)
              // })
              // var workerStatus = JSON.stringify(this.animationPoint) !== JSON.stringify(tmpPoint)
              // if (this.bufferByWorkerAnimation && workerStatus) {
              //   console.log("update worker")
              //   this.bufferByWorkerAnimation = false
              //   var worker = new Worker('/worker/animation.js');
              //   worker.postMessage(data);
              //   worker.addEventListener('message', (e) => {
              //     this.blobnumbers = e.data
              //     this.bufferByWorkerAnimation = true
              //     worker.terminate()
              //   }, false);
              //   this.animationPoint = tmpPoint
              //   tmpPoint = null
              // }
              run(frame)
            } catch (e) {
              console.log('konvaAnimation function is not working')
            }
            e = true
          }, delay);
        }
        // index1 += 1
      }, stage);
      anim.start();
      this.anim1 = anim
      async function run(frame) {
        const r = await test(frame);
        return r
      }
      var test = (frame) => {
        try {


          var stage = this.$refs.stage.getNode()
          var path = stage.find('.blobFind')
          var st = true
          var points = []
          // var SelfRect = []
          path.forEach((value, index) => {
            // var point = value.toObject()
            points.push(value.attrs.points)
          })
          var srtingPath = JSON.stringify(points)
          this.saveBlob === srtingPath ? st = false : st = true
          // st = true
          // console.log("updata roi")
          path.forEach((value, index) => {
            // Blob background fill 
            var co2 = Math.abs(Math.sin((frame.time * 2 * Math.PI) / 3000) / 4) + 0.2 // 貝茲曲線函數
            var roiNumber = parseFloat(value.attrs.blob_number)
            var roiTemperatureMax = parseFloat(value.attrs.blob_temperature_max)
            var roiAlarmStatus = parseInt(value.attrs.blob_alarm_status)
            var roigroupname = value.attrs.group_name
            var roiThreshold = parseFloat(value.attrs.blob_threshold)
            if (this.focusBlolbNumber !== null) {
              var focusBlolbNumber = parseInt(this.blobItems[parseInt(this.focusBlolbNumber)].blob_number)
            }
            if (roiAlarmStatus === 1 && roiTemperatureMax >= roiThreshold) { // 超溫
              if (focusBlolbNumber === roiNumber) {
                value.fill(`rgba(216,58,59,0.7)`)
              } else {
                value.fill(`rgba(216,58,59,${co2})`)
              }
              value.fillPatternImage('')
              value.stroke('rgb(216,58,59)')
            } else { // 沒超溫
              // 選取相同區域
              if (focusBlolbNumber === roiNumber) {
                value.fillPatternImage(this.fillBackground(
                  this.temperatureChange[3][0],
                  this.temperatureChange[3][1]
                ))
              } else {
                value.fillPatternImage(this.fillBackground(
                  this.temperatureChange[1][0],
                  this.temperatureChange[1][1]
                ))
                if (this.shortLogBlobGroup === roigroupname) {
                  value.fillPatternImage(this.fillBackground(
                    this.temperatureChange[4][0],
                    this.temperatureChange[4][1]
                  ))
                }
              }

              value.fill('')
              value.stroke('rgb(255 199 82)')
            }
            // var co2 = Math.abs(Math.sin((frame.time * 2 * Math.PI) / 3000) / 4) + 0.2
            // var roiNumber = parseFloat(value.attrs.blob_number)
            // var roiTemperatureMax = parseFloat(value.attrs.blob_temperature_max)
            // var roiAlarmStatus = parseInt(value.attrs.blob_alarm_status)
            // var roiThreshold = parseFloat(value.attrs.blob_threshold)
            // var focusBlolbNumber = null
            // if (roiAlarmStatus === 1 && roiTemperatureMax >= roiThreshold) { // 超溫
            //   if (focusBlolbNumber === roiNumber) {
            //     value.fill(`rgba(216,58,59,0.7)`)
            //   } else {
            //     value.fill(`rgba(216,58,59,${co2})`)
            //   }
            //   value.fillPatternImage('')
            //   value.stroke('rgb(216,58,59)')
            // } else { // 沒超溫
            //   if (focusBlolbNumber === roiNumber) {
            //     value.fillPatternImage(this.fillBackground(
            //       this.temperatureChange[3][0],
            //       this.temperatureChange[3][1]
            //     ))
            //   } else {
            //     value.fillPatternImage(this.fillBackground(
            //       this.temperatureChange[1][0],
            //       this.temperatureChange[1][1]
            //     ))
            //   }
            //   value.fill('')
            //   value.stroke('rgb(255 199 82)')
            // }
            // if (st) {
            //     var tmp = value.getSelfRect()
            //     SelfRect.push(tmp)
            // }
          })
          if (st) {
            // console.log(path)
            if (this.workerBuffer) {
              var worker = new Worker('/worker/animation.js');
              worker.postMessage([JSON.stringify(path)]);
              worker.addEventListener('message', (e) => {
                this.blobnumbers = e.data
                this.workerBuffer = true;
                worker.terminate()
              }, false);
            }
          }
          return true
        } catch (error) {
          console.log(error)
        }
      }
    },
    currentIndex(index) {
      // 沒有被focus的元件則根據alarm狀態來判斷顏色
      var associated = 0 // associated = 用來判斷該blob是不是同一個元件
      var ar = []
      index.points.forEach((e1) => {
        var pr = []
        e1.forEach((val, index1) => {
          if (index1 % 2) {
            pr.push((document.getElementById('image').offsetHeight * val))
          } else {
            pr.push((document.getElementById('image').offsetWidth * val))
          }
        })
        // console.log(this.shortLogBlobGroup)
        // fille = this.fillBackground(
        //   this.temperatureChange[0][0],
        //   this.temperatureChange[0][1]
        // )
        // var fille = null
        var stroke1 = null
        // var fillcolor = null
        // 判斷元件有沒有超溫
        if (index.blob_alarm_status === 1 && index.blob_temperature_max >= index.blob_threshold) {
          //   fille = null
          //   fillcolor = 'rgba(216,58,59,0.2)'
          stroke1 = 'rgba(216,58,59,1)'
        } else {
          //   fille = this.fillBackground(
          //     this.temperatureChange[1][0],
          //     this.temperatureChange[1][1]
          //   )
          //   fillcolor = null
          stroke1 = 'rgb(255 199 82)'
        }
        var path = this.splineFunction(pr, 0.5, 25, true)
        var TempPath = []
        var a = null
        path.forEach((va, ie) => {
          if (ie % 2 === 0) {
            a = {
              x: 0,
              y: 0
            }
            a.x = va
          } else {
            a.y = va
            TempPath.push(a)
          }
        })
        var svgPath = "M" + TempPath[0].x + " " + TempPath[0].y;
        for (var z = 1; z < TempPath.length; z = z + 1) {
          svgPath = svgPath + " L" + TempPath[z].x + " " + TempPath[z].y;
        }
        // console.log(svgPath)
        ar.push({
          points: pr,
          data: svgPath,
          stroke: stroke1,
          strokeWidth: 1,
          lineJoin: 'round',
          tension: index.tension,
          name: 'blobFind',
          // fill:fillcolor,
          // fillPatternImage: fille,
          closed: true,
          fillPatternRotation: -20,
          /*
           * line segments with a length of 33px
           * with a gap of 10px
           */
          // dash: [33, 10],
          // lineCap: 'round',
          group_name: index.group_name,
          blob_number: index.blob_number,
          blob_alarm_status: index.blob_alarm_status,
          blob_temperature_max: parseFloat(index.blob_temperature_max).toFixed(1),
          blob_threshold: index.blob_threshold,
          associated
        })
        associated += 1
      })
      return ar
    },
    movepoint(e) {
      if (this.AddTempPoints.length > 0) {
        this.blobTempsData.points[this.blobPoints] = e.layerX
        this.blobTempsData.points[this.blobPoints + 1] = e.layerY
        this.blobTempsData.tension = 0.49999
        setTimeout(() => {
          this.blobTempsData.tension = 0.5
        }, 1)
      }
    },
    drawCanvas(e) {
      if (e.target.name() !== 'blobFind' || this.RoiAlarmWindowFocus) {
        // console.log('click canvas')
        this.RoiAlarmWindowFocus = false
        this.RoiAlarmWindowStat = false
        this.recordChangeblob = null
        this.focusBlolbNumber = null
      }
      if (e.evt.which === 1 && this.blobStatusAdd) {
        if (this.removePoint.status) {
          this.removePoint.x = e.evt.layerX
          this.removePoint.y = e.evt.layerY
          this.removePoint.status = false
          this.removePoint.visible = true
        }
        if (
          e.target.name() === 'draw' ||
          e.target.name() === 'blob' ||
          e.target.name() === ''
        ) {
          this.AddTempPoints.push(e.evt.layerX)
          this.AddTempPoints.push(e.evt.layerY)
          this.blobTempsData = {
            points: this.AddTempPoints,
            stroke: '#fff',
            strokeWidth: 3,
            lineJoin: 'round',
            fillPatternImage: this.fillBackground(
              this.temperatureChange[1][0],
              this.temperatureChange[1][1]
            ),
            closed: false,
            tension: 0.49999,
            name: 'blob',
          }
          this.blobPoints += 2
          setTimeout(() => {
            this.blobTempsData.tension = 0.5
          }, 1)
        } else if (e.target.name() === 'removePoint') {
          // this.addspline()
          this.openROIcheckWindow('add')

        }
      }
    },
    // 判斷新增、編輯彈跳視窗
    openROIcheckWindow(type) {
      if (type === 'add') {
        this.serverMessageStatus = true
        this.serverMessage = '新增'
      }
      else if (type === 'edit') {
        // 這邊先註解，等到要寫編輯後開啟

        this.serverMessageStatus = true
        this.serverMessage = '編輯'
      }
    },
    // 確認是否新增範圍?
    ScopeAdditionConfirmation(e) {
      if (e === 1) {
        this.blobTempsData.group_name = this.GroupName
        // 判斷是否新增為新區域
        if (this.radioaddarea === 'newarea') {
          this.addblob()
          // this.serverMessageStatus = false
        } else {
          this.pushblob()
        }
        this.serverMessageStatus = false

      } else {
        this.blobTempsData.points = []
        this.blobStatusAdd = false
        document.body.style.cursor = 'default'
        this.serverMessageStatus = false
        this.AddTempPoints = []
        this.blobPoints = 0
        this.removePoint.status = true
        this.removePoint.visible = false
      }
      this.stopListener.visible = false
    },
    pushblob() {
      var selectAera = parseInt(this.radioSelectarea)
      var blobitem = this.blobTempItems
      var foucsAera = blobitem.findIndex((e) => parseInt(e.blob_number) === selectAera)
      this.blobTempsData.closed = true
      this.blobTempsData.points.pop()
      this.blobTempsData.points.pop()
      var pr = []
      this.blobTempsData.points.forEach((e, index) => {
        if (index % 2) {
          pr.push((e / document.getElementById('image').offsetHeight))
        } else {
          pr.push((e / document.getElementById('image').offsetWidth))
        }
      })
      blobitem[foucsAera].points.push(pr)
      // console.log(foucsAera)
      // console.log(blobitem)
      // 
      var data = {
        // cam_id: this.camid,
        type: 'roiChangeBlob',
        cam_id: this.$route.query.cam,
        session: Math.random().toString(36).substr(2),
        blob_number: parseInt(selectAera),
        blob_alarm_status: blobitem[foucsAera].blob_alarm_status,
        blob_threshold: blobitem[foucsAera].blob_threshold,
        points: blobitem[foucsAera].points,
        blob_status: '0',
        group_name: blobitem[foucsAera].group_name
      }
      // console.log(data)
      this.ws4.send(JSON.stringify(data))
      // axios({
      //   method: 'post',
      //   url: `http://localhost:5002/api/monitor/object/change/blob`,
      //   // url: `http://127.0.0.1:6189/api/monitor/object/change/blob`,
      //   data,
      // })
      //   .then((response) => {
      this.blobTempsData.points = []
      this.blobStatusAdd = false
      document.body.style.cursor = 'default'
      this.dragObjectStatus = true
      // })
      // .catch((error) => console.log('error from axios', error))
      // 
      this.AddTempPoints = []
      this.blobPoints = 0
      this.removePoint.status = true
      this.removePoint.visible = false
    },
    addblob() {
      this.blobTempsData.closed = true
      this.blobTempsData.points.pop()
      this.blobTempsData.points.pop()
      var pr = []
      this.blobTempsData.points.forEach((e, index) => {
        if (index % 2) {
          pr.push((e / document.getElementById('image').offsetHeight))
        } else {
          pr.push((e / document.getElementById('image').offsetWidth))
        }
      })
      var reqdata = {
        // cam_id: this.camid,
        type: "roiAddBlob",
        cam_id: this.$route.query.cam,
        session: Math.random().toString(36).substr(2),
        points: pr,
        // tension: 0.5,
        group_name: this.GroupName
      }
      this.ws4.send(JSON.stringify(reqdata))
      setTimeout(() => {
        this.blobTempsData.points = []
        this.dragObjectStatus = true
      }, 10)
      this.blobStatusAdd = false
      document.body.style.cursor = 'default'
      // axios({
      //   method: 'post',
      //   url: `http://localhost:5002/api/monitor/object/add/blob`,
      //   // url: `http://127.0.0.1:6189/api/monitor/object/add/blob`,
      //   data: reqdata,
      // })
      //   .then((event) => {
      //     setTimeout(() => {
      //       this.blobTempsData.points = []
      //       this.dragObjectStatus = true
      //     }, 500)
      //     this.blobStatusAdd = false
      //     document.body.style.cursor = 'default'
      //   })
      //   .catch((error) => console.log('error from axios', error))
      // console.log(this.splineTempsData)
      this.AddTempPoints = []
      this.blobPoints = 0
      this.removePoint.status = true
      this.removePoint.visible = false
    },
    circleEvents(e) {
      // console.log(e)
      if (e === 1) {
        document.body.style.cursor = 'pointer'
      } else if (e === 0 && this.blobStatusAdd) {
        document.body.style.cursor = 'crosshair'
      } else {
        document.body.style.cursor = 'default'
      }
    },
    clickRight(e) {
      e.evt.preventDefault()
      // console.log(e.target.getClassName())
      this.MenuX = e.evt.clientX
      this.MenuY = e.evt.clientY
      if (e.target.getClassName() === 'Path') {
        this.saveBlobTemp = e.target
        console.log(this.saveBlobTemp)
        this.tempGuoupName = e.target.attrs.group_name
        this.showMenu = true
      } else {
        this.showMenu = false
      }
      // if (this.MenuStatus) {
      // this.showMenu = true
      // }
    },
    dbclickblob(e) {
      var name = e.target.name()
      if (name === 'blobFind') {
        // console.log('dbclick')
        this.RoiAlarmWindowFocus = true
        // this.selectblob(e)
      } else {
        console.log('fine')
      }
    },
    blobEvent(e, key) { // 滑鼠滑入元件
      if (e === 0) {
        if (!this.blobObjectsFocus) {
          if (!this.RoiAlarmWindowFocus) {
            this.shortLogBlobGroup = null
            this.recordChangeblob = null
            this.RoiAlarmWindowStat = false
            this.focusBlolbNumber = null
          }
          this.MenuStatus = false // 判斷滑鼠右鍵選單能不能給開
        }
        // console.log('out side')
      } else {
        this.MenuStatus = true
        this.shortLogBlobGroup = this.blobItems[key].group_name
        if (this.blobItems[key].blob_alarm_status === 1 && this.blobItems[key].blob_temperature_max >= this.blobItems[key].blob_threshold) {
          this.RoiAlarmWindowStat = true
        }
        this.recordChangeblob = this.blobItems[key].blob_number
        this.focusBlolbNumber = key
        // console.log('in side')
      }
      // console.log('in side', this.shortLogBlobGroup)
    },
    blobHoverEvent(e) {
      if (!this.RoiAlarmWindowFocus) {
        // var Parent = e.target.getParent()
        var Layer = e.target.getSelfRect() // 取得元件在畫布上的絕對位置
        var imageID = document.getElementById('image')
        var imageIDoffset = imageID.getBoundingClientRect();
        var messageWindow = document.getElementById('ROIGroup')
        var messageWindowIDoffset = messageWindow.getBoundingClientRect();
        var currentLeft = (Layer.x + imageIDoffset.x + (Layer.width / 2)) - (messageWindowIDoffset.width / 2)
        var currentTop = (Layer.y + imageIDoffset.y) - messageWindowIDoffset.height - 10
        if (currentLeft < 0) {
          currentLeft = 10
        }
        if (currentTop < 0) {
          currentTop = (Layer.y + imageIDoffset.y) + Layer.height
        }
        messageWindow.style.left = currentLeft + 'px'
        messageWindow.style.top = currentTop + 'px'
        // console.log(currentLeft, currentTop)
      }
    },
    selectGroupClick(e) {
      if (e === 0) {

        this.selectGroupWindows = false
      } else if (e === 1) {
        var blob = JSON.parse(this.saveBlobTempString)
        var findblob = blob.find((item) => item.blob_number === this.saveBlobTemp.attrs.blob_number)
        var arr = {
          type: 'roiChangeBlob',
          cam_id: this.$route.query.cam,
          session: Math.random().toString(36).substr(2),
          blob_number: parseInt(findblob.blob_number),
          blob_status: "0",
          points: findblob.points,
          // tension: 0.5,
          blob_alarm_status: findblob.blob_alarm_status,
          blob_threshold: findblob.blob_threshold,
          group_name: this.GroupName,
        }
        // console.log(arr)
        this.ws4.send(JSON.stringify(arr))
        this.selectGroupWindows = false

      }
    },
    blobMessageScroll(e) {
      console.log(e)
    },
    editpointstart(e) {
      this.recordIsMovingPoinst = e
      console.log(e)
    },
    editpointmove(e) {
      var key = this.blobItems.findIndex(
        (index) => index.blob_number === this.recordChangeblob
      )
      // var data = this.splineItems[key]
      this.blobItems[key].points[this.recordIsMovingPoinst - 1] = e.target.x()
      this.blobItems[key].points[this.recordIsMovingPoinst] = e.target.y()
      this.blobItems[key].tension = 0.49999
      setTimeout(() => {
        this.blobItems[key].tension = 0.5
      }, 1)
      // console.log(e.target.x(), e.target.y())
    },
    selectblob(e) {
      this.drageObjects = []
      var key = this.blobItems.findIndex(
        (index) => index.blob_number === this.recordChangeblob
      )
      var data = this.blobItems[key]
      // var points = []
      var tpm = {
        x: 0,
        y: 0,
      }
      data.points.forEach((val, index1) => {
        if (index1 % 2) {
          tpm.y = val
          // points.push(tpm)
          this.drageObjects.push({
            x: tpm.x,
            y: tpm.y,
            radius: 10,
            fill: 'red',
            num: index1,
            draggable: true,
          })
          tpm = {
            x: 0,
            y: 0,
          }
          // console.log(tpm)
        } else {
          tpm.x = val
        }
      })

      // console.log(points)

      // e.target.fillPatternImage(this.fillBackground(
      //     'rgba(247,200,223,0.5)',
      //     'rgb(255 0 0 / 43%)'
      //   ))
      // console.log(e.target.fillPatternImage(this.fillBackground(
      //     'rgba(247,200,223,0.5)',
      //     'rgb(255 0 0 / 43%)'
      //   )))
    },
    deleteCustomblob(e, points1, group) {
      // console.log(e)
      var arr = {
        type: 'roiChangeBlob',
        cam_id: this.$route.query.cam,
        session: Math.random().toString(36).substr(2),
        blob_number: parseInt(e),
        blob_status: "1",
        points: [points1],
        // tension: 0.5,
        blob_alarm_status: 0,
        blob_threshold: 100,
        group_name: group,
      }
      this.ws4.send(JSON.stringify(arr))
      // axios({
      //   method: 'post',
      //   url: `http://localhost:5002/api/monitor/object/change/blob`,
      //   // url: `http://127.0.0.1:6189/api/monitor/object/change/blob`,
      //   data: arr,
      // }).catch((error) => console.log('error from axios', error))
    },
    // ____Konva Spline function end____
    // +++++++++++++ Konva Roi Function END+++++++++++++

    // 返回主畫面，通知主頁面
    backPage() {
      this.$router.push({ query: { cam: this.$route.query.cam, main: this.$route.query.main, secondary: this.$route.query.secondary, tab: 'tab-1' } }, () => {
        window.location.reload()
      })
      window.location.reload()
      // console.log('清除INT')
      // clearInterval(this.timeOutRefresh)
      // clearInterval(this.alarmlistInterval)
      // this.$emit('VideoActive', 'tab-1')
    },
    // 設定警報開關
    alarmSwitch(e) {
      if (e === 0) {
        this.checkbox = false
      } else if (e === 1) {
        this.checkbox = true
      }
    },

    // 警報列表
    alarmlist(Date1) {
      var selectMonth = new Date(Date1)
      var selectMonth1 = this.Datecorrect('month', selectMonth)
      // try {
      //   this.ws4.send(JSON.stringify(
      //     {
      //       type: "alarmList",
      //       session: Math.random().toString(36).substr(2),
      //       cam_id: this.$route.query.cam,
      //       table_timeselectStart: selectMonth1[0],
      //       table_timeselectStop: selectMonth1[1],
      //     },
      //   ))
      // } catch (error) {
      //   console.log('alarmlist websocket 錯誤');
      // }
      axios({
        method: 'post',
        url: 'http://localhost:5002/api/alarm/list',
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify([
          {
            // cam_id: this.camid,
            cam_id: this.$route.query.cam,
            table_timeselectStart: selectMonth1[0],
            table_timeselectStop: selectMonth1[1],
          },
        ]),
      })
        .then((events) => {
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
            alarmlist.push({
              objcet: { name: name[0], number: number[0] },
              duration: durationCrr(
                index.table_alarm_start,
                index.table_alarm_stop
              ),
              temperature: index.table_max.toFixed(1),
              alertTemperature: index.table_alarm_threshold,
              time: index.table_alarm_start,
              endTime: index.table_alarm_stop
            })
            alarmlist.sort(function (a, b) {
              if (a.time < b.time) {
                return 1 // 正數時，後面的數放在前面
              } else {
                return -1 // 負數時，前面的數放在前面
              }
            })
            alarmlist.sort(function (a, b) {
              if (a.duration[0] !== '持續中') {
                return 1 // 正數時，後面的數放在前面
              } else {
                return -1 // 負數時，前面的數放在前面
              }
            })
            // 觸發時間為警報存在的時間(s)，開始時間為警報設定的時間
          })
          this.valueToday = today
          this.valueLastday = lastday
          this.valueThisWeek = week
          this.valueThisMonth = month
          if (alarmlist.length > 0) {
            if (this.echartsDataST) {
              this.echartsData = alarmlist[0]
              this.echartsDataST = false
            }
          }
          this.temps = alarmlist
          function durationCrr(start, stop) {
            if (stop !== null) {
              const nowtime1 = new Date(start)
              const startone1 = new Date(stop)
              const time1 = (startone1.getTime() - nowtime1.getTime()) * 0.001
              var duration = getDuration(time1)
              return duration
            } else {
              const nowtime = new Date()
              const startone = new Date(start)
              const time = (nowtime.getTime() - startone.getTime()) * 0.001
              return ['持續中', getDuration(time.toFixed(0))]
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
              duration = hours + '時' + minutes + '分' + seconds + '秒'
            } else if (second >= 86400) {
              duration =
                days + '天' + hours + '時' + minutes + '分' + seconds + '秒'
            }
            return duration
          }
        })
        .catch((error) => console.log('error from axios', error))

    },
    submitForm() {
      const opendid = this.openid
      const opentype = this.opentype
      const status = this.checkbox
      const threshold = this.threshold
      const thisSpots = this.spots
      const thislines = this.tpmedata.line
      const thisscpoes = JSON.parse(this.temp1scope)
      const thisblob = this.tpmedata.blob
      // const idc = this.camid
      var obj = null
      if (opentype === 'spot') {
        obj = thisSpots.find((o) => o.spot_number === opendid)
        var SpotY =
          obj.spot_position.Y / document.getElementById('image').offsetHeight
        var SpotX =
          obj.spot_position.X / document.getElementById('image').offsetWidth
        SpotY = SpotY.toFixed(4)
        SpotX = SpotX.toFixed(4)
        var data = null
        data = {
          type: "roiChangeSpot",
          cam_id: this.$route.query.cam,
          session: Math.random().toString(36).substr(2),
          spot_number: parseInt(opendid),
          spot_alarm_status: status,
          spot_position: {
            Y: SpotY,
            X: SpotX,
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
        this.ws4.send(JSON.stringify(data))
        // axios({
        //   method: 'post',
        //   url: `http://localhost:5002/api/monitor/object/change/spot`,
        //   data,
        // })
        //   .then((response) => {
        this.dialog = false
        // })
        // .catch((error) => console.log('error from axios', error))
      } else if (opentype === 'line') {
        obj = thislines.find((o) => o.line_number === opendid)
        console.log(this.threshold);
        data = {
          type: "roiChangeLine",
          cam_id: this.$route.query.cam,
          session: Math.random().toString(36).substr(2),
          line_number: opendid,
          line_alarm_status: obj.line_alarm_status,
          line_threshold: this.threshold,
          line_position_point_A: {
            X: obj.line_position_point_A.X / document.getElementById('image').offsetWidth,
            Y: obj.line_position_point_A.Y / document.getElementById('image').offsetHeight
          },
          line_position_point_B: {
            X: obj.line_position_point_B.X / document.getElementById('image').offsetWidth,
            Y: obj.line_position_point_B.Y / document.getElementById('image').offsetHeight
          },
          line_status: '0',
        }
        if (status === true) {
          data.line_alarm_status = 1
        } else {
          data.line_alarm_status = 0
        }
        // console.log(data)
        this.ws4.send(JSON.stringify(data))
        // axios({
        //   method: 'post',
        //   url: `http://localhost:5002/api/monitor/object/change/line`,
        //   data,
        // })
        //   .then((response) => {
        this.dialog = false
        // })
        // .catch((error) => console.log('error from axios', error))
      } else if (opentype === 'scope') {
        obj = thisscpoes.find((o) => o.scope_number === opendid)
        console.log(obj)
        data = {
          // cam_id: idc,
          type: 'roiChangeScope',
          cam_id: this.$route.query.cam,
          session: Math.random().toString(36).substr(2),
          scope_number: parseInt(opendid),
          scope_alarm_status: null,
          scope_threshold: threshold,
          scope_position_BR: {
            X: obj.scope_position_point_BR.X,
            Y: obj.scope_position_point_BR.Y
          },
          scope_position_LT: {
            X: obj.scope_position_point_LT.X,
            Y: obj.scope_position_point_LT.Y
          },
          scope_status: '0',
        }
        if (status === true) {
          data.scope_alarm_status = 1
        } else {
          data.scope_alarm_status = 0
        }
        // console.log(data)
        this.ws4.send(JSON.stringify(data))
        // axios({
        //   method: 'post',
        //   url: `http://localhost:5002/api/monitor/object/change/scope`,
        //   data,
        // })
        //   .then((response) => {
        this.dialog = false
        //   })
        //   .catch((error) => console.log('error from axios', error))
      } else if (opentype === 'custom-blob') {
        obj = thisblob.find((o) => o.blob_number === opendid)
        // console.log(thisblob)
        data = {
          // cam_id: idc,
          type: 'roiChangeBlob',
          cam_id: this.$route.query.cam,
          session: Math.random().toString(36).substr(2),
          blob_number: parseInt(opendid),
          blob_alarm_status: null,
          blob_threshold: threshold,
          points: obj.points,
          blob_status: '0',
          group_name: obj.group_name
        }
        if (status === true) {
          data.blob_alarm_status = 1
        } else {
          data.blob_alarm_status = 0
        }
        this.ws4.send(JSON.stringify(data))
        this.dialog = false
        // axios({
        //   method: 'post',
        //   url: `http://localhost:5002/api/monitor/object/change/blob`,
        //   // url: `http://127.0.0.1:6189/api/monitor/object/change/blob`,
        //   data,
        // })
        //   .then((response) => {
        //     this.dialog = false
        //     // console.log(response.data)
        //   })
        //   .catch((error) => console.log('error from axios', error))
      }
    },
    // 開啟警報視窗
    opendialog(id, type) {
      this.dialog = true
      this.openid = id
      this.opentype = type
      if (type === 'custom-blob') {
        // 測試blob功能
        // axios({
        //   method: 'get',
        //   url: 'http://127.0.0.1:5002/api/monitor/object/data',
        //   // url: `http://127.0.0.1:6189/api/monitor/object/data`,
        // })
        //   .then((paramse) => {
        // this is api function
        // this.tpmedata = paramse.data
        // var array = paramse.data
        // this is api function end
        this.tpmedata = this.allRoiData
        var array1 = this.allRoiData
        var arr1 = []
        var obj1 = []
        if (type === 'custom-blob') {
          arr1 = array1.blob
          obj1 = arr1.find((o) => o.blob_number === id)
          this.threshold = obj1.blob_threshold
          if (obj1.blob_alarm_status === 0) {
            this.checkbox = false
          } else {
            this.checkbox = true
          }
        }
        this.dialogdata = obj1
        // }
        // )
      } else {
        // axios({
        //   method: 'post',
        //   url: 'http://127.0.0.1:5002/api/monitor/object/data',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   data: JSON.stringify([
        //     {
        //       cam_id: this.camid,
        //     },
        //   ]),
        // })
        //   .then((paramse) => {
        // console.log(paramse.data)
        // this.tpmedata = paramse.data
        // var array = paramse.data
        this.tpmedata = this.allRoiData
        var array = this.allRoiData
        var arr = []
        var obj = []
        if (type === 'spot') {
          arr = array.spot
          obj = arr.find((o) => o.spot_number === id)
          this.threshold = obj.spot_threshold
          if (obj.spot_alarm_status === 0) {
            this.checkbox = false
          } else {
            this.checkbox = true
          }
        } else if (type === 'line') {
          arr = array.line
          obj = arr.find((o) => o.line_number === id)
          this.threshold = obj.line_threshold
          if (obj.line_alarm_status === 0) {
            this.checkbox = false
          } else {
            this.checkbox = true
          }
        } else if (type === 'scope') {
          arr = array.scope
          obj = arr.find((o) => o.scope_number === id)
          this.threshold = obj.scope_threshold
          if (obj.scope_alarm_status === 0) {
            this.checkbox = false
          } else {
            this.checkbox = true
          }
        }
        // 測試blob
        else if (type === 'custom-blob') {
          console.log('test')
        }
        this.dialogdata = obj
        // })
        // .catch((error) => console.log(error))
      }

    },
    // 右2
    countdown() {
      this.temps.duration++
    },

    // 左側燈泡
    light() {
      if (document.getElementById('light_on')) {
        document.getElementById('light_on').src =
          '/left-icons/light/light-off.png'
        document.getElementById('light_on').setAttribute('id', 'light_img')
      } else {
        document.getElementById('light_img').src =
          '/left-icons/light/light-on.png'
        document.getElementById('light_img').setAttribute('id', 'light_on')
      }
    },
    // 左側暫停
    freeze() {
      if (document.getElementById('freeze')) {
        document.getElementById('freeze').src =
          '/left-icons/freeze/unfreeze.png'
        document.getElementById('freeze').setAttribute('id', 'unfreeze')
      } else {
        document.getElementById('unfreeze').src =
          '/left-icons/freeze/freeze.png'
        document.getElementById('unfreeze').setAttribute('id', 'freeze')
      }
    },

    // 單獨給多邊形的總呼叫程序
    Refresh1() {
      this.$axios
        .get('http://192.168.0.182:8080/api/monitor/object/data')
        .then((params) => {
          //   // 取得"多邊形"資料
          this.custom_scopes = params.data.custom_scope
          // console.log(this.custom_scopes);
          this.customScope()
          //   // 取得"多邊形"資料 end
        })
      // .catch((error) => console.log("error from axios", error));
    },
    // 修改點位置
    getspot(e) {
      // console.log(e, this.dragSporId)
      const data = this.spots
      // const idc = this.camid
      const id = this.dragSporId
      const thisdata = data.find((o) => o.spot_number === id)
      // console.log(thisdata)
      var SpotY = e.target.y() / document.getElementById('image').offsetHeight
      var SpotX = e.target.x() / document.getElementById('image').offsetWidth
      SpotY = SpotY.toFixed(4)
      SpotX = SpotX.toFixed(4)
      var thisSpotData = {
        // cam_id: idc,
        type: 'roiChangeSpot',
        cam_id: this.$route.query.cam,
        session: Math.random().toString(36).substr(2),
        spot_number: parseInt(id),
        spot_status: '0',
        spot_position: {
          Y: SpotY,
          X: SpotX,
        },
        spot_alarm_status: thisdata.spot_alarm_status,
        spot_threshold: thisdata.spot_threshold,
      }
      this.ws4.send(JSON.stringify(thisSpotData))
      // axios({
      //   method: 'post',
      //   url: `http://localhost:5002/api/monitor/object/change/spot`,
      //   data: thisSpotData,
      // }).catch((error) => console.log('error from axios', error))
    },
    // POST 新增點物件
    addspot() {
      // window.clearInterval(this.timeOutRefresh)
      const l = this.loader
      this[l] = !this[l]
      setTimeout(() => (this[l] = false), 3000)
      this.loader = null
      this.ws4.send(JSON.stringify(
        {
          type: "roiAddSpot",
          cam_id: this.$route.query.cam,
          session: Math.random().toString(36).substr(2)
        },
      ),)
      // axios({
      //   method: 'post',
      //   url: 'http://localhost:5002/api/monitor/object/add/spot',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   data: JSON.stringify(
      //     {
      //       // cam_id: this.camid,
      //       cam_id: this.$route.query.cam,
      //     },
      //   ),
      // })
      //   .then((response) => {
      this.Interval = 0
      //   })
      //   .catch((error) => console.log('error from axios', error))
    },
    // POST 刪除點物件
    deletespot(number) {
      // console.log(number)
      var thisSpotData = {
        type: "roiChangeSpot",
        cam_id: this.$route.query.cam,
        session: Math.random().toString(36).substr(2),
        spot_number: parseInt(number),
        spot_status: '1',
        spot_position: {
          Y: 0.1,
          X: 0.1,
        },
        spot_alarm_status: 0,
        spot_threshold: 20,
      }

      this.ws4.send(JSON.stringify(thisSpotData))
      // this.$axios
      //   .post(
      //     'http://localhost:5002/api/monitor/object/change/spot',
      //     thisSpotData
      //   )
      //   .then((response) => {
      this.Interval = 0
      // })
      // .catch((error) => console.log('error from axios', error))
    },
    // POST 新增範圍
    addscope() {
      var add = JSON.stringify(
        {
          "type": "roiAddScope",
          "cam_id": this.$route.query.cam,
          "session": Math.random().toString(36).substr(2)
        },
      )
      this.ws4.send(add)
      // axios({
      //   method: 'post',
      //   url: 'http://localhost:5002/api/monitor/object/add/scope',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   data: JSON.stringify(
      //     {
      //       "type": "roiAddScope",
      //       "cam_id": this.$route.query.cam,
      //       "session": Math.random().toString(36).substr(2)
      //     },
      //   ),
      // })
      //   .then((response) => {
      this.Interval = 0
      // })
      // .catch((error) => console.log('error from axios', error))
    },
    // POST 刪除範圍物件
    deletescope(index) {
      var thisScopeData = {
        // cam_id: this.camid,
        type: 'roiChangeScope',
        cam_id: this.$route.query.cam,
        session: Math.random().toString(36).substr(2),
        scope_number: index,
        scope_status: '1',
        scope_position_LT: {
          Y: 0.01,
          X: 0.01,
        },
        scope_position_BR: {
          Y: 0.001,
          X: 0.011,
        },
        scope_alarm_status: 0,
        scope_threshold: 0,
      }
      // console.log(thisScopeData)
      this.ws4.send(JSON.stringify(thisScopeData))
      // axios({
      //   method: 'post',
      //   url: `http://localhost:5002/api/monitor/object/change/scope`,
      //   data: thisScopeData,
      // }).catch((error) => console.log('error from axios', error))
    },

    // 線-新增程式
    addline() {
      var add = JSON.stringify({
        type: "roiAddLine",
        cam_id: this.$route.query.cam,
        session: Math.random().toString(36).substr(2),
      })
      this.ws4.send(add)

      // axios({
      //   method: 'post',
      //   url: 'http://localhost:5002/api/monitor/object/add/line',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   data: JSON.stringify(
      //     {
      //       // cam_id: this.camid,
      //       cam_id: this.$route.query.cam,
      //     },
      //   ),
      // })
      //   .then((response) => {
      this.Interval = 0
      // })?
      // .catch((error) => console.log('error from axios', error))
    },
    // 線-刪除程式
    deleteline(index, id) {
      var LineData = {
        type: "roiChangeLine",
        cam_id: this.$route.query.cam,
        session: Math.random().toString(36).substr(2),
        line_status: '1',
        line_number: index,
        line_position_point_A: {
          Y: 0.07837,
          X: 0.04254,
        },
        line_position_point_B: {
          Y: 0.078352,
          X: 0.07832,
        },
        line_alarm_status: 0,
        line_threshold: 0,
      }
      this.ws4.send(JSON.stringify(LineData))
      // axios({
      //   method: 'post',
      //   url: `http://localhost:5002/api/monitor/object/change/line`,
      //   data: LineData,
      // }).catch((error) => console.log('error from axios', error))
    },

    // 定義多邊形物件 start------------------------------------------------------------
    customScope() {
      // const id = this.dragCustomScopeId
      // const thisarraycs = data.find((o) => o.custom_scope_number === id)
      // console.log(thisarraycs)

      var arraycs = this.custom_scopes
      arraycs.forEach((cs) => {
        var wrapperpointname = 'custom_scope_' + cs.custom_scope_number
        // var wrapperlinename = "csline" + cs.custom_scope_number;
        var scopeLength = document.querySelectorAll(
          '.' + wrapperpointname
        ).length
        console.log(document.getElementsByClassName(wrapperpointname))
        for (var i = 0; i < scopeLength; i++) {
          var start = i
          if (i === scopeLength - 1) {
            var end = 0
          } else {
            end = i + 1
          }
          console.log(`第${i}次，從${start}連結到${end}`)

          // wrapper12(start, end, start, cs.custom_scope_number)
        }
      })
      // 舊多邊形畫線
      // function wrapper12(point01, point02, line01, number) {
      //   const point1 = document.getElementsByClassName(
      //     'custom_scope_' + number
      //   )[point01]
      //   const point2 = document.getElementsByClassName(
      //     'custom_scope_' + number
      //   )[point02]
      //   const line = document.getElementsByClassName(
      //     'custom_scope_line_' + number
      //   )[line01]
      //   // Find the points based off the elements left and top
      //   var p1 = { x: point1.offsetLeft, y: point1.offsetTop }
      //   var p2 = { x: point2.offsetLeft, y: point2.offsetTop }
      //   // console.log(p1, p2);
      //   console.log('this' + point1)

      //   // Get distance between the points for length of line 取得兩點之間線的長度
      //   var a = p1.x - p2.x
      //   var b = p1.y - p2.y
      //   // console.log(a, b);

      //   var length = Math.sqrt(a * a + b * b) // 開根號

      //   // Get angle between points 兩點之間的角度
      //   var angleDeg = (Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180) / Math.PI // 弧度值

      //   // Get distance from edge of point to center 點邊緣到點中心的距離
      //   var pointWidth = point1.clientWidth / 2
      //   var pointHeight = point1.clientWidth / 2

      //   // Set line distance and position 線的長度及位置
      //   // Add width/height from above so the line starts in the middle instead of the top-left corner 從上方添加寬度/高度，使線條從中間而不是左上角開始
      //   line.style.width = length + 'px'
      //   line.style.left = p1.x + pointWidth + 'px'
      //   line.style.top = p1.y + pointHeight + 'px'

      //   // Rotate line to match angle between points  讓線對上兩點連接距離的角度
      //   line.style.transform = 'rotate(' + angleDeg + 'deg)'
      // }
      // ---------------------------------
      // var arraycs = [];
      // arraycs.width = length1;
      // arraycs.left = p01.x + pointWidth1;
      // arraycs.top = p01.y + pointHeight1;
      // arraycs.angleDeg = angleDeg1;
      // return arraycs;
    },
    // 定義多邊形物件 end--------------------------------------------------------------------------

    // 多邊形-新增程式 start-----------------------------------------------------------------------
    addCustomScope() {
      this.pointShow = true
      console.log('add')

      // this.wrapper = 'wrapper crosshair'
      // var totle = 0
      // this.$nextTick(function () {
      // $('.crosshair').css('cursor', 'crosshair') // 鼠標樣式變成十字
      // $('.crosshair').on('click', (event) => {
      // var point = null
      // 【主程式】新增點
      // if (totle === 0) {
      //   console.log('本次新增的點序列為0') // 第1次新增的點
      //   point = `<div
      //   class="custom-point tmep-point
      //   point-first"
      //   data-id="${totle}"
      //   id="point${totle}"
      //   style="
      //   left: ${event.offsetX - 10}px;
      //   top: ${event.offsetY - 10}px;
      //   ">
      //   </div>`
      // } else {
      //   console.log('本次新增的點序列為' + `${totle}`) // 第1次以後新增的點
      //   point = `<div
      //   class="custom-point tmep-point"
      //   data-id="${totle}"
      //   id="point${totle}"
      //   style="
      //   left: ${event.offsetX - 10}px;
      //   top: ${event.offsetY - 10}px;
      //   ">
      //   </div>`
      // }
      // $('.crosshair').append(point)

      // 【主程式】搭配副程式，判斷上一點、下一點，並新增線
      // var last = totle - 1
      // if (totle >= 1) {
      //   $('.crosshair').append(`<div class="line tmep-line"></div>`)
      //   this.wrapper1(last, totle, last)
      // }

      // 【主程式】連接原點
      // $('.custom-point').on('click', (event) => {
      //   if (totle > 2) {
      //     $('.crosshair').append(`<div class="line tmep-line"></div>`) // 畫布增加線
      //     var last = totle - 1 // 抓上一點
      //     this.wrapper1(last, 0, last) // 連接原點
      //     console.log('連接原點')
      //     // event.stopPropagation()
      //     $('.crosshair').unbind('click') // 取消點擊
      //     this.pointShow = false // ADD鍵恢復成可按
      //     $('.crosshair').css('cursor', 'context-menu') // 鼠標樣式從十字返回正常

      //     const point = document.getElementsByClassName('tmep-point')

      //     this.custom_scopes = []
      //     for (var h = 0; h < point.length; h++) {
      //       var tempPoint = point[h]
      //       this.custom_scopes.push({
      //         x: tempPoint.offsetLeft,
      //         y: tempPoint.offsetTop,
      //       })
      //     }

      // $('.custom-point').removeClass('tmep-point')
      // $('.line').removeClass('tmep-line')
      // console.log(this.custom_scopes);
      this.$axios({
        url: 'http://192.168.0.182:8080/api/monitor/object/add/custom_scope',
        method: 'post',
        data: this.custom_scopes,
      }).then((req) => {
        console.log(req)
      })
      // $('.custom-point').removeClass('custom-point') // 清除temporary點
      // $('.line').removeClass('line') // 清除temporary線
      //   }
      // })

      // 【modify】移動原點
      // $('.point-first').draggable({
      //   drag: (event, ui) => {
      //     var last = totle - 1
      //     for (var i = 0; i <= last; i++) {
      //       if (i === 1) {
      //         this.wrapper1(last, 0, last)
      //       } else if (i > 1) {
      //         this.wrapper1(last, 0, last)
      //       }
      //     }
      //   },
      //   containment: '.crosshair',
      // })
      // $('.custom-point').draggable({
      //   drag: (event, ui) => {
      //     var tmp = totle - 1
      //     for (var i = 0; i <= tmp; i++) {
      //       if (i === 1) {
      //         this.wrapper1(0, 1, 0)
      //       } else if (i > 1) {
      //         this.wrapper1(tmp, 0, tmp)
      //         this.wrapper1(i - 1, i, i - 1)
      //       }
      //     }
      //   },
      //   containment: '.crosshair',
      // })
      // console.log(totle)
      // totle = totle + 1
      // })
      // })
    },
    // 多邊形-新增程式 end-----------------------------------------------------------------------
    // POST 刪除多邊形物件
    deleteCustomScope(number) {
      console.log(number)
      var thisCustomScopeData = {
        custom_scope_number: parseInt(number),
        status: '1',
        custom_scope_position: {
          y: '',
          x: '',
        },
      }
      this.$axios
        .post(
          'http://192.168.0.182:8080/api/monitor/object/change/custom_scope',
          thisCustomScopeData
        )
        .then((response) => {
          this.Interval = 0
        })
        .catch((error) => console.log('error from axios', error))
    },

    // 舊多邊形畫線 start【副程式】判斷上一點、下一點，並新增線----------------------------------
    // wrapper1(point01, point02, line01) {
    //   const point1 = document.getElementsByClassName('tmep-point')[point01]
    //   const point2 = document.getElementsByClassName('tmep-point')[point02]
    //   const line = document.getElementsByClassName('tmep-line')[line01]

    //   // Find the points based off the elements left and top
    //   var p1 = { x: point1.offsetLeft, y: point1.offsetTop }
    //   var p2 = { x: point2.offsetLeft, y: point2.offsetTop }
    //   // console.log(p1, p2);

    //   // Get distance between the points for length of line 取得兩點之間線的長度
    //   var a = p1.x - p2.x
    //   var b = p1.y - p2.y
    //   // console.log(a, b);

    //   var length = Math.sqrt(a * a + b * b) // 開根號

    //   // Get angle between points 兩點之間的角度
    //   var angleDeg = (Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180) / Math.PI // 弧度值

    //   // Get distance from edge of point to center 點邊緣到點中心的距離
    //   var pointWidth = point1.clientWidth / 2
    //   var pointHeight = point1.clientWidth / 2

    //   // Set line distance and position 線的長度及位置
    //   // Add width/height from above so the line starts in the middle instead of the top-left corner 從上方添加寬度/高度，使線條從中間而不是左上角開始
    //   line.style.width = length + 'px'
    //   line.style.left = p1.x + pointWidth + 'px'
    //   line.style.top = p1.y + pointHeight + 'px'

    //   // Rotate line to match angle between points  讓線對上兩點連接距離的角度
    //   line.style.transform = 'rotate(' + angleDeg + 'deg)'
    // },
    // 舊多邊形畫線 end---------------------------------------------------------------------

    // 右4日期
    functionEvents(date) {
      // console.log(this.alarmCalendar)
      var cal = this.alarmCalendar
      var dateStart = new Date(date + ' 00:00:00')
      var dateStop = new Date(date + ' 23:59:59')
      var status = false
      cal.forEach((index) => {
        var indexTime = new Date(index.table_alarm_start)
        if (indexTime >= dateStart && indexTime <= dateStop) {
          // console.log(date.split('-'))
          status = true
        }
      })
      var today = new Date()
      if (today > dateStart) {
        if (status) {
          return ['#828C8F']
        } else {
          return ['#d8d8d8']
        }
      } else {
        return false
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
    // 斜線方法
    fillBackground(fillStyle, strokeStyle) {
      var p = document.createElement('canvas')
      p.width = 32
      p.height = 16
      var pctx = p.getContext('2d')

      var x0 = 36
      var x1 = -4
      var y0 = -2
      var y1 = 18
      var offset = 32

      pctx.beginPath()
      pctx.rect(-2, -2, 34, 18)
      pctx.fillStyle = fillStyle
      pctx.fill()

      pctx.strokeStyle = strokeStyle
      pctx.lineWidth = 1
      pctx.beginPath()
      pctx.moveTo(x0, y0)
      pctx.lineTo(x1, y1)
      pctx.moveTo(x0 - offset, y0)
      pctx.lineTo(x1 - offset, y1)
      pctx.moveTo(x0 + offset, y0)
      pctx.lineTo(x1 + offset, y1)
      pctx.stroke()
      return p
    },
    CustomTabs(data) {
      if (data === 0) {
        // this.tabcontent = ['手動偵測區域', '']
        this.tabcontent = ['手動偵測區域']
      } 
      // else if (data === 1) {
      //   this.tabcontent = ['', '自動偵測區域']
      // }
    },
    // spline Function
    splineFunction(points, tension, numOfSeg, close) {
      tension = typeof tension === 'number' ? tension : 0.5
      // numOfSeg = typeof numOfSeg === 'number' ? numOfSeg : 25
      numOfSeg = 70

      var pts // for cloning point array
      var i = 1
      var l = points.length
      var rPos = 0
      var rLen = (l - 2) * numOfSeg + 2 + (close ? 2 * numOfSeg : 0)
      var res = new Float32Array(rLen)
      var cache = new Float32Array((numOfSeg + 2) * 4)
      var cachePtr = 4
      var st, st2, st3, st23, st32, parse

      pts = points.slice(0)
      if (close) {
        pts.unshift(points[l - 1]) // insert end point as first point
        pts.unshift(points[l - 2])
        pts.push(points[0], points[1]) // first point as last point
      } else {
        pts.unshift(points[1]) // copy 1. point and insert at beginning
        pts.unshift(points[0])
        pts.push(points[l - 2], points[l - 1]) // duplicate end-points
      }
      // cache inner-loop calculations as they are based on t alone
      cache[0] = 1 // 1,0,0,0
      for (; i < numOfSeg; i++) {
        st = i / numOfSeg
        st2 = st * st
        st3 = st2 * st
        st23 = st3 * 2
        st32 = st2 * 3
        cache[cachePtr++] = st23 - st32 + 1 // c1
        cache[cachePtr++] = st32 - st23 // c2
        cache[cachePtr++] = st3 - 2 * st2 + st // c3
        cache[cachePtr++] = st3 - st2 // c4
      }
      cache[++cachePtr] = 1 // 0,1,0,0

      parse = function (pts, cache, l) {
        var i = 2
        var t, pt1, pt2, pt3, pt4, t1x, t1y, t2x, t2y, c, c1, c2, c3, c4

        for (i; i < l; i += 2) {
          pt1 = pts[i]
          pt2 = pts[i + 1]
          pt3 = pts[i + 2]
          pt4 = pts[i + 3]
          t1x = (pt3 - pts[i - 2]) * tension
          t1y = (pt4 - pts[i - 1]) * tension
          t2x = (pts[i + 4] - pt1) * tension
          t2y = (pts[i + 5] - pt2) * tension
          for (t = 0; t < numOfSeg; t++) {
            // t * 4;
            c = t << 2 // jshint ignore: line
            c1 = cache[c]
            c2 = cache[c + 1]
            c3 = cache[c + 2]
            c4 = cache[c + 3]

            res[rPos++] = c1 * pt1 + c2 * pt3 + c3 * t1x + c4 * t2x
            res[rPos++] = c1 * pt2 + c2 * pt4 + c3 * t1y + c4 * t2y
          }
        }
      }

      // calc. points
      parse(pts, cache, l)

      if (close) {
        // l = points.length;
        pts = []
        pts.push(points[l - 4], points[l - 3], points[l - 2], points[l - 1]) // second last and last
        pts.push(points[0], points[1], points[2], points[3]) // first and second
        parse(pts, cache, 4)
      }
      // add last point
      l = close ? 0 : points.length - 2
      res[rPos++] = points[l]
      res[rPos] = points[l + 1]

      return res
    },
  },
  beforeDestroy() {
    
    this.wsblock = false
    this.ws1.close()
    this.ws1 = null
    this.ws3.close()
    this.ws3 = null
    if (this.anim1 !== null) {
      this.anim1.stop()
    }
    if(this.ws4 !== null) {
      this.ws4.close()
      this.ws4 = null
    }
    console.log("ws3 is beforeDestroy")
    if (this.sendCameraIdtoInt !== null) {
      clearInterval(this.sendCameraIdtoInt)
      this.sendCameraIdtoInt = null
      console.log('Destroy:sendCameraIdtoInt', this.sendCameraIdtoInt);
    }
    if (this.interval !== null) {
      clearInterval(this.interval)
      this.interval = null
      console.log('Destroy:interval')
    }
    if (this.temps.duration !== null) {
      clearInterval(this.temps.duration)
      this.temps.duration = null
      console.log('Destroy:duration')
    }
    if (this.timeOutRefresh !== null) {
      clearInterval(this.timeOutRefresh)
      this.timeOutRefresh = null
      console.log('Destroy:timeOutRefresh')
    }
    if (this.timeOutRefresh1 !== null) {
      clearInterval(this.timeOutRefresh1)
      this.timeOutRefresh1 = null
      console.log('Destroy:timeOutRefresh1')
    }
    if (this.alarmlistInterval !== null) {
      clearInterval(this.alarmlistInterval)
      this.alarmlistInterval = null
      console.log('Destroy:alarmlistInterval')
    }
    // clearInterval(this.roifpsInterval)

    // clearInterval(this.timeOutRefresh)
    // // 多邊形 start---------------------------------------------------------------------
    // clearInterval(this.timeOutRefresh1)
    // // 多邊形 end---------------------------------------------------------------------

    // clearInterval(this.alarmlistInterval)
  },
}
</script>
<style scoped>
.openedit{
      border: 1px solid #d9d9d9 !important;
    border-radius: 5px !important;
}
.ROIGroup-alarm-card {
  background-color: #FCF5F5;
  border: 1px solid #F3C2C3;
}

.ROIGroup-alarm-card1 {
  /* background-color: #ffd3d3;
  border: 1px solid #D83A3B; */
  background-color: #F7E1E1;
  border: 1px solid #D83A3B;
}

.ROIGroup {
  position: fixed;
  top: 0;
  left: 0;
  /* width: 50px; */
  /* height: 50px; */
  background-color: #fff;
  z-index: 999999;
  transition: all 0.1s;
  box-shadow: 0px 0px 9px 2px rgb(0 0 0 / 46%);
  border-radius: 3px;
  color: #4F5E62;
  opacity: 1;

}

.RoiAlarmWindowStat {
  opacity: 0;
  pointer-events: none;
}

.ROIGroup-txt {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px
}

.ROIGroup-title {
  font-weight: bold;
}

.ROIGroup-list {
  max-height: 337px;
  overflow-y: scroll;
}

.auto-close {
  position: absolute;
  top: 7px;
  right: 0;
}

.Imagecomparison {
  position: fixed;
  top: 10%;
  right: 7%;
  width: 706px;
  z-index: 20;
}

.Imagecomparison-konva {
  background-color: rgb(110, 110, 110);
  width: 100%;
  height: 0;
  padding-bottom: 75%;
}

.Live-canvas {
  border: 2px #d7dbdb solid;
  padding: 0px 9px;
  border-radius: 6px;
}

.Live-points {
  width: 9px;
  height: 9px;
  border-radius: 9px;
  margin-right: 9px;
}

/* 影像物件選單 */
.showMenuStyle {
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  padding: 4px 14px;
  border-radius: 29px;

}

.showMenuStyle>div {
  width: 35px;
  padding: 3px;
}

.showMenuStyle>.showMenu-btn {
  cursor: pointer;
}

.showMenuStyle>.showMenu-btn:hover {
  background: rgb(255 255 255 / 30%);
  border-radius: 6px;
}

.showMenuStyle img {
  width: 100%;
}

.custom-menu>div {}

/* 左側浮動按鈕 */
.drawer {
  /* position: fixed;
  width: 3.6em;
  left: -3.599em;
  height: 500px;
  transition: all 0.5s;
  border-radius: 0px 10px 10px 0px;
  z-index: 99999; */
  /* background-color: #031316; */
  /* color: rgba(89, 89, 91, 1); */
  position: fixed;
    width: 3.6em;
    /* left: 101px; */
    left: -3.599em;
    top: 50%;
    height: 418px;
    transition: all 0.5s;
    border-radius: 0px 10px 10px 0px;
    z-index: 99999;
    /* background-color: #031316; */
    color: rgba(89, 89, 91, 1);
    transform: translate(0px, -50%);
}

.box {
  background-color: #fff;
}

.box:hover .drawer {
  left: 0;
}

.alarmLogth {
  padding: 0px 0px 0px 0px !important;
}

/* 左右側畫面grid */
.box-2 {
  display: grid;
  grid-template-columns: 55.3% 44.7%;
}

/* 影像串流 */
.diago-btn-font {
  color: #80898c;
}

.frame-hard {
  /* display: flex; */
  align-items: center;
  font-size: 17px;
  color: #80898c;
  display: grid;
  grid-template-columns: 42px 93px 307px 547px;
}

.frame {
  width: 100%;
  /* margin-left: 2.1em; */
  /* margin-top: 2em; */
  /* padding: 1em; */
}

.frame-footer {
  height: 49px;
  display: flex;
  justify-content: center;
}

.cover {
  /* position: relative;
  max-width: 100%;
  width: 100%;
  display: inline-block;
  isolation: isolate; */
  position: relative;
  max-width: 100%;
  width: 100%;
  display: inline-block;
  isolation: isolate;
  height: 0;
  padding-bottom: 74.8%;
}

.cover1 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

#image {
  width: 100%;
  height: 100%;
  /* width: 70.5em; */
  /* pointer-events: none; */
  /* margin-left: 2.1em; */
  /* margin-top: 2em; */
  isolation: isolate;
}

.frame-hard-cam {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  /* width: 106px; */
  justify-content: space-between;
}

.frame-hard-cam-status {
  width: 15px;
  height: 15px;
  border-radius: 15px;
  background-color: #8ab284;
}

.frame-hard-cam-log {
  max-height: 268px;
  overflow-y: scroll;
}

.frame-hard-cam-log>div {
  background-color: #f0f2f3;
  font-size: 14px;
  color: #4f5e62;
}

.frame-hard-setting div {
  font-size: 14px;
}

.frame-hard-btu {
  cursor: pointer;
}

.frame-content {
  border: 1px solid #d7dbdc;
  border-radius: 8px;
}

.frame-content>div {
  border-bottom: 1px solid #d7dbdc;
  display: grid;
  grid-template-columns: 110px 35px;
}

.frame-content>div:last-child {
  border-bottom: 0px solid #d7dbdc;
}

.frame-content input::-webkit-outer-spin-button,
.frame-content input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.arrow {
  height: 23px;
  width: 100px;
  position: absolute;
  margin-left: 1.16em;
  /* margin-top: 25.5em; */
  top:50%;
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

.card5content {
  width: 3em;
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

.reload1 {
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

.chartTitle {
  color: #545454;
}

.date-picker {
  float: right;
  margin-top: -31px;
  background-color: #fff0 !important;
}

.card5 {
  display: flex;
  /* 水平置中 */
  justify-content: center;
  /* 垂直置中 */
  align-content: center;
  flex-wrap: wrap;
}

.btn {
  background-color: #f2f4f4;
}

.reset {
  float: right;
  /* margin-top: 0.5em; */
  /* margin-right: 0.5em; */
  position: absolute;
  top: 0;
  right: 0;
  margin: 0 !important;
  z-index: 9;
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

.text-color>>>.v-text-field__slot input {
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

.right-btn1 {
  background-color: #f3cccf;
  width: 2.25em;
  height: 2.25em;
}

.alarm-sum {
  display: grid;
  grid-template-columns: 56% 44%;
  justify-items: center;
  align-items: center;
}

.alarm-charts {
  display: grid;
  grid-template-columns: 50% 50%;
  height: 235px;
}

.cheats-cover {
  display: flex;
  align-items: center;
  height: 100px;
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

.tooltipforalarm {
  color: #4F5E62 !important;
  background-color: #fff;
  display: flex;
  align-items: center;
  align-content: center;
  font-size: 14px;
}

.tooltipforalarm span {
  font-weight: bold;
}
</style>
<style>
.cursor-pointer td{
  padding: 0px !important;
}
.add-area-btn {
  background: #99A1A3 !important;
  color: #fff !important;
}

.add-area-txt * {
  font-size: 16px !important;
}

.custom-radio .v-radio {
  height: 20px !important;
}

.custom-radio .v-radio>* {
  height: 20px !important;
}

.camSelect div {
  box-shadow: unset !important;
  font-size: 17px;
  color: #80898c;
}

.date-picker th {
  padding: 0px 0px !important;
}
</style>
<style>
.scope {
  width: 150px;
  height: 150px;
  /* padding: 0.5em; */
  outline: 1px solid #000;
  border: 1px solid rgb(255, 255, 255);
  box-shadow: inset 0px 0px 2px 1px rgb(0 0 0);
  position: absolute;
  /* top: 0; */
  /* left: 0; */
  cursor: grab;
  z-index: 1;
}

#rtsp-status {
  /* color: rgb(255, 0, 0);
  font-size: 1.5em;
  font-weight: 900; */
  position: absolute;
  right: 5px;
  bottom: 10px;
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background-color: red;
  z-index: 999;
}

.scope-span {
  position: absolute;
  left: 100%;
  color: #000;
  background-color: #fff;
  border: 1px solid #000;
  bottom: 100%;
  border-radius: 4px;
  padding: 0px 4px;
  box-shadow: 1px 1px 5px #4c4c4c;
  pointer-events: none;
  transition: 0.3s;
  width: 17px;
  height: 17px;
  text-align: center;
  border-radius: 20px;
}

.scope-span>div {
  position: absolute;
  top: 53%;
  left: 46%;
  transform: translate(-50%, -50%);
}

.scope-span.hover {
  font-size: 18px;
  width: 25px;
  height: 25px;
  border-radius: 25px;
}

.scope-test-xy-TL {
  position: absolute;
  top: 0;
  width: 100%;
  font-size: 16px;
  font-weight: 700;
  z-index: 100;
  color: rgb(255, 255, 255);
}

.scope-test-xy-BR {
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: right;
  font-size: 16px;
  font-weight: 700;
  color: rgb(255, 255, 255);
}

.wrapper {
  width: 100%;
  height: 180px;
  position: relative;
  border: 1px solid #aaa;
  background-color: #eee;
}

#pointA {
  width: 15px;
  height: 15px;
  position: absolute;
  background-color: #051a1f;
  border: 0.5px solid rgb(255, 255, 255);
  /* box-shadow: 1px 1px 5px #4c4c4c; */
  cursor: pointer;
  border-radius: 20px;
  z-index: 2;
}

#pointB {
  width: 15px;
  height: 15px;
  position: absolute;
  background-color: #051a1f;
  border: 0.5px solid rgb(255, 255, 255);
  /* box-shadow: 1px 1px 5px #4c4c4c; */
  cursor: pointer;
  border-radius: 20px;
  z-index: 2;
}

.line-span {
  position: absolute;
  bottom: 100%;
  left: 100%;
  color: #000;
  background-color: #fff;
  border-radius: 4px;
  padding: 0px 4px;
  box-shadow: 1px 1px 5px #4c4c4c;
  pointer-events: none;
  width: 17px;
  height: 17px;
  text-align: center;
  font-size: 6px;
  border-radius: 20px;
  border: 1px solid #000;
  transition: 0.3s;
  line-height: 1.5;
}

.line-span>div {
  position: absolute;
  top: 53%;
  left: 46%;
  transform: translate(-50%, -50%);
}

.line-span.hover {
  font-size: 18px;
  width: 25px;
  height: 25px;
  border-radius: 25px;
}

#line {
  position: absolute;
  height: 2px;
  outline: 1px solid #000;
  border: 1px solid rgb(255, 255, 255);
  /* border: 0.1px solid rgb(0, 0, 0); */
  /* box-shadow: 1px 1px 5px #4c4c4c; */
  transform-origin: left;
  pointer-events: none;
  z-index: 2;
}

.spot {
  /* top: 295px; */
  /* left: 225px; */
  position: absolute;
  cursor: grab;
  width: 50px;
  z-index: 2;
}

.spot>img {
  max-width: 100%;
}

.spot-span {
  position: absolute;
  bottom: 79%;
  left: -28%;
  color: #000;
  background-color: #fff;
  border-radius: 4px;
  padding: 0px 4px;
  box-shadow: 1px 1px 5px #4c4c4c;
  pointer-events: none;
  width: 17px;
  height: 17px;
  text-align: center;
  font-size: 6px;
  border-radius: 20px;
  border: 1px solid #000;
  transition: 0.3s;
  line-height: 1.5;
}

.spot-span>div {
  position: absolute;
  top: 53%;
  left: 46%;
  transform: translate(-50%, -50%);
}

.spot-span.hover {
  font-size: 18px;
  width: 25px;
  height: 25px;
  border-radius: 25px;
}

.tooltip_content {
  width: 100px;
  height: 100px;
  border-radius: 5px;
  background-color: rgb(224, 231, 120);
}

.point-hover {
  background-color: #37484c !important;
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
  z-index: 1;
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

.Thermal-bar-w {
  position: absolute;
  top: 50%;
  right: 16px;
  z-index: 3;
  transform: translate(0, -50%);
  color: #fff;
  pointer-events: none;
}

.Thermal-bar-w img {
  max-height: 400px;
}
</style>
<style>
.v-badge__badge {
  min-width: 18px !important;
  width: 18px !important;
  height: 18px !important;
  display: flex !important;
  align-items: center;
  justify-content: center;
}

.btu-setting::before {
  display: none;
}
</style>
<style>
.alarm-dialog-input input {
  padding: 0 !important;
}

.alarm-dialog-input .v-text-field__slot,
.alarm-dialog-input .v-select__slot {
  margin: -2px 0px 0px 0px !important;
}

.alarm-dialog-input div,
.alarm-dialog-input fieldset,
.alarm-dialog-input input {
  max-height: 35px !important;
}

#image,
#image>canvas {
  width: 100%;
  height: 100%;
}

.consoleMjpg2 {
  /* display: none; */
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000d9;
  z-index: 9999;
  width: 250px;
  color: #fff;
  padding: 6px;
  /* pointer-events: none; */
}

.consoleMjpg2 span {
  color: #00ff0d;
}

.testWebScoket {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.testWebScoket>canvas {
  width: 100%;
  height: 100%;
}

#image {
  z-index: 3;
  position: relative;
}

.custom-tabs1>.v-tabs-bar {
  border-bottom: 1px #d7dbdb solid !important;
}

.custom-tabs1>.v-tabs-bar div {
  font-weight: 900;
  font-size: 14px;
}

.tab-icon1 {
  margin-right: 5px;
  width: 20px !important;
}

.custom-tabs1 .v-tab {
  padding: 5px !important;
  min-width: 0px !important;
  max-width: none !important;
  cursor: pointer
}

.cursor-pointer {
  cursor: pointer
}

#DoNotOperate {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999999;
  cursor: wait;
  display: none;
}

.no-data-message {
  position: absolute;
  width: 100%;
  text-align: center;
  color: rgba(0, 0, 0, 0.6);
}
</style>
