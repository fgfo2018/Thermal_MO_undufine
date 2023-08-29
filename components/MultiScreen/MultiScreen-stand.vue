<template>
  <div class="fluid mt-3">
    <div id="DoNotOperate"></div>
    <div class="consoleMjpg2 d-none" id="consoleMjpg2">
      <!-- <div class="consoleMjpg2" id="consoleMjpg2"> -->
      偵錯模式:(SUPER PRO MODEL)<br />
      ROI刷新率(PIXI):<span id="fps1">{{ roifpstmp }}</span><br />
      <!-- 總資料傳輸量/秒:<span id="datatotle">-</span><br /> -->
      <!-- 連項狀況:<span id="datas">-</span> -->
      限制PIXI(FPS)[{{ setFPS }}] : <div class="d-flex">
        <div style="width:100px"><v-text-field v-model="pixijsfps" solo dense flat hide-details height="20" type="number"
            min="10"></v-text-field></div><v-btn @click="setPixiFPS" color="#000">設定</v-btn>
      </div>
      <v-btn to="index2022">切換舊版</v-btn>
    </div>
    <v-img class="bgimg" src="bgimg.png" height="93.2vh" />
    <!-- 操作對話窗 -->
    <v-dialog v-model="serverMessageStatus" persistent max-width="320">
      <v-card class="add-area-txt">
        <v-card-title class="text-h5 f80898C"> {{ serverMessage }} </v-card-title>
        <div class="px-3 mb-2">
          <v-divider></v-divider>
        </div>
        <v-card-text class="pb-0">
          <div class="d-flex align-end">
            <div style="width: 105px">
              元件類別</div>
            <v-select :items="GroupNameitems" v-model="GroupName" label="" dense single-line hide-details
              @change="getGroupID"></v-select>
          </div>
          <div class="d-flex align-end">
            <div style="width: 105px">
              元件群組</div>
            <v-select :items="GroupIditems" v-model="GroupId" label="" dense single-line hide-details></v-select>
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
    <!-- Add/change Roi Group window -->
    <v-dialog v-model="askGroupwindow" persistent max-width="350">
      <v-card class="add-area-txt">
        <v-card-title class="text-h8 px-3 pt-2">
          <div class="d-flex justify-space-between align-center w-100">
            <div class="f80898C">元件群組編輯</div>
            <div>
              <v-btn bottom depressed fab x-small @click="askGroupwindow = false" color="#ffffff00">
                <v-img max-width="20px" src="/images/close.png" />
              </v-btn>
            </div>
          </div>
        </v-card-title>
        <v-card-text class="pb-0" style="height:185px;">
          <div class="d-flex justify-space-between ">
            <div class="askGroupwindow1 pa-3" @click="() => { sendToGroupUpdata('add'); askGroupwindow = false; }">
              <div class="pa-5">
                <v-img src="/images/meun-multiscreen/AddGroup.png" width="100%" />
              </div>
              <span>新建群組並加入</span>
            </div>
            <div class="askGroupwindow1 pa-3" @click="updataBlob(true)">
              <div class="pa-5">
                <v-img src="/images/meun-multiscreen/ChangeGroups.png" width="100%" />
              </div>
              <span>更換至既有群組</span>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="askaddGroupwindow" persistent max-width="350">
      <v-card class="add-area-txt">
        <v-card-title class="text-h8 px-3 pt-2">
          <div class="d-flex justify-space-between align-center w-100">
            <div class="f80898C">元件群組編輯</div>
          </div>
        </v-card-title>
        <v-card-text class="pb-0" style="height:50px;">
          <div>是否加入至 群組 {{ askaddGroupName }} {{ askaddGroupId }}</div>
        </v-card-text>
        <v-card-actions class="justify-center">
          <div>
            <v-btn class="add-area-btn" @click="offdialogGroupChange(false)" depressed>
              否
            </v-btn>
            <v-btn color="add-area-btn" depressed @click="offdialogGroupChange(true)">
              是
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Add/change Roi Group window end -->
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
            <div class="ROIGroup-list" id="ROIGroup-list">
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
            <v-btn class="add-area-btn" depressed @click="actionROIClick(0)">
              返回
            </v-btn>
            <v-btn class="add-area-btn" depressed @click="actionROIClick(1)">
              刪除
            </v-btn>
            <v-btn class="add-area-btn" depressed @click="actionROIClick(2)">
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
            <!-- <v-btn class="add-area-btn" depressed @click="selectGroupClick(0)">
              取消
            </v-btn>
            <v-btn class="add-area-btn" depressed @click="selectGroupClick(1)">
              確定
            </v-btn> -->
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
              <v-btn class="" elevation="6" x-small dark fab v-bind="attrs" v-on="on"
                @click="chromatographyModeselect('Iron')">
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
              <v-btn class="" elevation="6" x-small dark fab v-bind="attrs" v-on="on"
                @click="chromatographyModeselect('Gray')">
                <img alt="palette-gray" src="/left-icons/palette/palette-gray.png" width="24em" />
              </v-btn>
            </template>
            <span>Gray</span>
          </v-tooltip>
          <v-tooltip top class="tips">
            <template #activator="{ on, attrs }">
              <v-btn class="" elevation="6" x-small dark fab v-bind="attrs" v-on="on"
                @click="chromatographyModeselect('Rainbow')">
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
                <div class="Live-canvas d-flex align-center mr-2" id="Live-canvas-loction">
                  <div class="Live-points" :class="liveStatus ? 'Live-points-amine' : ''" :style="liveStatus
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
                    <!-- <div class="d-flex justify-space-between align-center mb-2">
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
                    </div> -->
                    <!-- <div class="d-flex justify-space-between align-center mb-2">
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
                    </div> -->
                    <div class="d-flex justify-space-between align-center">
                      <div>溫標</div>
                      <div class="">
                        <div class="switch-field py-0 my-0 px-1">
                          <input id="radio-one-email-notice4" type="radio" name="switch-one4" value="yes"
                            :checked="displayObject4 ? true : false" @click="displayObject4 = true" />
                          <label for="radio-one-email-notice4">ON</label>
                          <input id="radio-two-email-notice4" type="radio" name="switch-one4" value="no"
                            :checked="displayObject4 ? false : true" @click="displayObject4 = false" />
                          <label for="radio-two-email-notice4">OFF</label>
                        </div>
                      </div>
                    </div>
                    <!-- 超解析影像顯示 -->
                      <div class="d-flex justify-space-between align-center mb-2">
                        <div class="d-flex align-center">
                          <div>超解析影像</div>
                          <!-- <div>
                          <span class="icon-new">N</span>
                        </div> -->
                        </div>
                        <div class="">
                          <div class="switch-field py-0 my-0 px-1">
                            <input id="radio-one-email-notice5" type="radio" name="switch-one5" value="yes"
                              :checked="displayObject5 ? true : false" @click="srshwish(true)" />
                            <label for="radio-one-email-notice5">ON</label>
                            <input id="radio-two-email-notice5" type="radio" name="switch-one5" value="no"
                              :checked="displayObject5 ? false : true" @click="srshwish(false)" />
                            <label for="radio-two-email-notice5">OFF</label>
                          </div>
                        </div>
                      </div>
                    <div class="d-flex justify-space-between align-center mb-2">
                      <div>自動加入ROI</div>
                      <div class="">
                        <div class="switch-field py-0 my-0 px-1">
                          <input id="radio-one-email-notice3" type="radio" name="switch-one3" value="yes"
                            :checked="displayObject3 ? true : false"
                            @click="(e) => { setCustomRangerChange('cameraParams_AutoRoi_Status', 'set', true) }" />
                          <label for="radio-one-email-notice3">ON</label>
                          <input id="radio-two-email-notice3" type="radio" name="switch-one3" value="no"
                            :checked="displayObject3 ? false : true"
                            @click="(e) => { setCustomRangerChange('cameraParams_AutoRoi_Status', 'set', false) }" />
                          <label for="radio-two-email-notice3">OFF</label>
                        </div>
                      </div>

                    </div>
                    <v-divider class="my-2"></v-divider>
                    <!-- <div class="d-flex justify-space-between align-center mb-2">
                      <div class="d-flex align-center">
                        <div>元件群組顯示</div>
                        <div>
                          <span class="icon-new">N</span>
                        </div>
                      </div>
                      <div class="">
                        <div class="switch-field py-0 my-0 px-1">
                          <input id="radio-one-email-notice7" type="radio" name="switch-one7" value="yes"
                            :checked="displayObject7 ? true : false" @click="displayObject7 = true" />
                          <label for="radio-one-email-notice7">ON</label>
                          <input id="radio-two-email-notice7" type="radio" name="switch-one7" value="no"
                            :checked="displayObject7 ? false : true" @click="removeSelectGr" />
                          <label for="radio-two-email-notice7">OFF</label>
                        </div>
                      </div>
                    </div> -->

                    <!-- 高溫區域顯示 -->
                    <div class="d-flex justify-space-between align-center mb-2">
                      <div class="d-flex align-center">
                        <div>高溫區域</div>
                        <!-- <div>
                          <span class="icon-new">N</span>
                        </div> -->
                        <div>
                          <v-menu :close-on-content-click="false" offset-y min-width="350px" nudge-top="30px"
                            nudge-right="225px" max-height="300px">
                            <template v-slot:activator="{ on, attrs }">
                              <v-tooltip top>
                                <template v-slot:activator="{ on: tooltip }">
                                  <v-btn class="btu-setting mr-2" fab x-small v-bind="attrs" v-on="{ ...tooltip, ...on }"
                                    :ripple="false">
                                    <img class="" alt="line" src="/images/setting.png" width="20px" />
                                  </v-btn>
                                </template>
                                <span>畫面物件顯示設定</span>
                              </v-tooltip>
                            </template>
                            <v-card class="pa-3" color="rgb(255 255 255 / 100%)">
                              <div>
                                <div class="d-flex">
                                  <div>
                                    <img class="" alt="line" src="/images/setting.png" width="20px" />
                                  </div>
                                  <div>高溫區域顯示 設定</div>
                                </div>
                                <div class="d-flex align-center">
                                  <div>高溫前 {{ temperatureRanger }} % </div>
                                  <div style="width:30px;">
                                    <v-btn depressed small tile block color="#fff"
                                      @click="settemperatureRanger(0)">-</v-btn>
                                  </div>
                                  <v-slider v-model="temperatureRanger" dense hide-details
                                    @change="temperatureRangerChange"></v-slider>
                                  <div style="width:30px">
                                    <v-btn depressed small tile block color="#fff"
                                      @click="settemperatureRanger(1)">+</v-btn>
                                  </div>
                                </div>
                              </div>
                            </v-card>
                          </v-menu>
                        </div>
                      </div>
                      <div class="">
                        <div class="switch-field py-0 my-0 px-1">
                          <input id="radio-one-email-notice6" type="radio" name="switch-one6" value="yes"
                            :checked="displayObject6 ? true : false" @click="highTemperatureArea(true)" />
                          <label for="radio-one-email-notice6">ON</label>
                          <input id="radio-two-email-notice6" type="radio" name="switch-one6" value="no"
                            :checked="displayObject6 ? false : true" @click="highTemperatureArea(false)" />
                          <label for="radio-two-email-notice6">OFF</label>
                        </div>
                      </div>
                    </div>
                    <!-- 低溫慮波 -->
                    <div class="d-flex justify-space-between align-center mb-2">
                      <div class="d-flex align-center">
                        <div>低溫濾波</div>
                        <!-- <div>
                          <span class="icon-new">N</span>
                        </div> -->
                        <div>
                          <v-menu :close-on-content-click="false" offset-y min-width="350px" nudge-top="30px"
                            nudge-right="225px" max-height="300px">
                            <template v-slot:activator="{ on, attrs }">
                              <v-tooltip top>
                                <template v-slot:activator="{ on: tooltip }">
                                  <v-btn class="btu-setting mr-2" fab x-small v-bind="attrs" v-on="{ ...tooltip, ...on }"
                                    :ripple="false">
                                    <img class="" alt="line" src="/images/setting.png" width="20px" />
                                  </v-btn>
                                </template>
                                <span>設定範圍</span>
                              </v-tooltip>
                            </template>
                            <v-card class="pa-3" color="rgb(255 255 255 / 100%)">
                              <div>
                                <div class="d-flex">
                                  <div>
                                    <img class="" alt="line" src="/images/setting.png" width="20px" />
                                  </div>
                                  <div>低溫濾波顯示 設定</div>
                                </div>
                                <div class="d-flex align-center">
                                  <div> {{ (cameraParamsLowTempFilter / 10).toFixed(1) }} % </div>
                                  <div style="width:30px;">
                                    <v-btn depressed small tile block color="#fff"
                                      @click="setCustomRangerslider('cameraParamsLowTempFilter', 0)">-</v-btn>
                                  </div>
                                  <v-slider v-model="cameraParamsLowTempFilter" dense hide-details
                                    @change="(e) => { setCustomRangerChange('cameraParamsLowTempFilter', 'set', e) }"
                                    min="10" max="350" @input="allsilderSt = true"></v-slider>
                                  <div style="width:30px">
                                    <v-btn depressed small tile block color="#fff"
                                      @click="setCustomRangerslider('cameraParamsLowTempFilter', 1)">+</v-btn>
                                  </div>
                                </div>
                              </div>
                            </v-card>
                          </v-menu>
                        </div>
                      </div>
                      <div class="">
                        <div class="switch-field py-0 my-0 px-1">
                          <input id="radio-one-email-notice8" type="radio" name="switch-one8" value="yes"
                            :checked="displayObject8 ? true : false"
                            @click="setCustomRangerChange('cameraParamsLowTempFilter', 'swh', true)" />
                          <label for="radio-one-email-notice8">ON</label>
                          <input id="radio-two-email-notice8" type="radio" name="switch-one8" value="no"
                            :checked="displayObject8 ? false : true"
                            @click="setCustomRangerChange('cameraParamsLowTempFilter', 'swh', false)" />
                          <label for="radio-two-email-notice8">OFF</label>
                        </div>
                      </div>
                    </div>
                    <!-- 影像均衡化 -->
                    <div class="d-flex justify-space-between align-center">
                      <div class="d-flex align-center">
                        <div>影像均衡化</div>
                        <!-- <div>
                          <span class="icon-new">N</span>
                        </div> -->
                        <div>
                          <v-menu :close-on-content-click="false" offset-y min-width="350px" nudge-top="30px"
                            nudge-right="225px" max-height="300px">
                            <template v-slot:activator="{ on, attrs }">
                              <v-tooltip top>
                                <template v-slot:activator="{ on: tooltip }">
                                  <v-btn class="btu-setting mr-2" fab x-small v-bind="attrs" v-on="{ ...tooltip, ...on }"
                                    :ripple="false">
                                    <img class="" alt="line" src="/images/setting.png" width="20px" />
                                  </v-btn>
                                </template>
                                <span>影像均衡化設定</span>
                              </v-tooltip>
                            </template>
                            <v-card class="pa-3" color="rgb(255 255 255 / 100%)">
                              <div>
                                <div class="d-flex">
                                  <div>
                                    <img class="" alt="line" src="/images/setting.png" width="20px" />
                                  </div>
                                  <div>影像均衡化 設定</div>
                                </div>
                                <div class="d-flex align-center">
                                  <div>{{ ClipLimit / 10 }} % </div>
                                  <div style="width:30px;">
                                    <v-btn depressed small tile block color="#fff"
                                      @click="setCustomRangerslider('cameraParams_Clip_limit', 0)">-</v-btn>
                                  </div>
                                  <v-slider v-model="ClipLimit" dense hide-details
                                    @change="(e) => { setCustomRangerChange('cameraParams_Clip_limit', 'set', e) }"
                                    min="10" max="100" @input="allsilderSt = true"></v-slider>
                                  <div style="width:30px">
                                    <v-btn depressed small tile block color="#fff"
                                      @click="setCustomRangerslider('cameraParams_Clip_limit', 1)">+</v-btn>
                                  </div>
                                </div>
                              </div>
                            </v-card>
                          </v-menu>
                        </div>
                      </div>
                      <div class="">
                        <div class="switch-field py-0 my-0 px-1">
                          <input id="radio-one-email-notice9" type="radio" name="switch-one9" value="yes"
                            :checked="displayObject9 ? true : false"
                            @click="setCustomRangerChange('cameraParams_Clip_limit', 'swh', true)" />
                          <label for="radio-one-email-notice9">ON</label>
                          <input id="radio-two-email-notice9" type="radio" name="switch-one9" value="no"
                            :checked="displayObject9 ? false : true"
                            @click="setCustomRangerChange('cameraParams_Clip_limit', 'swh', false)" />
                          <label for="radio-two-email-notice9">OFF</label>
                        </div>
                      </div>
                    </div>
                  </v-card>
                </v-menu>
                <!-- 影像對照圖 -->
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn class="btu-setting mr-1" fab x-small @click="autoDisplayStatus
                      ? (autoDisplayStatus = false)
                      : (autoDisplayStatus = true)
                      " :ripple="false" v-bind="attrs" v-on="on">
                      <img class="" alt="line" src="/images/photo.png" width="28px" />
                    </v-btn>
                  </template>
                  <span>影像對照圖</span>
                </v-tooltip>
                <div class="Imagecomparison" v-show="autoDisplayStatus || munisplayStatus">
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
                        <v-btn class="diago-close-icon" rounded outlined
                          @click="() => { autoDisplayStatus = false; munisplayStatus = false }">
                          <img class="" alt="line" src="/images/close.png" width="70%" />
                        </v-btn>
                      </div>
                    </div>
                    <div class="Imagecomparison-konva" id="Imagecomparison-konva">
                      <v-stage :config="ImagecomparisonKonva">
                        <v-layer ref="Imagecomparisonlayer">
                          <v-image :config="ImagecomparisonKonvaImageConfig" ref="ImagecomparisonKonva" @mouseenter="(events) => {
                            imagecomparisonImageMove(events, 0)
                          }
                            " @mousemove="(events) => {
    imagecomparisonImageMove(events, 1)
  }
    " @mouseleave="(events) => {
    imagecomparisonImageMove(events, 2)
  }
    " @mousedown="(events) => {
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
                      <div
                        class="
                                                                                                                        frame-hard-setting-top
                                                                                                                        d-flex
                                                                                                                        justify-space-between
                                                                                                                        mb-2
                                                                                                                      ">
                        <div class="d-flex align-center ml-3 frame-hard-btu">
                          <img class="mr-1" src="images/connect-normal.png" width="20px" />
                          連線ON
                        </div>
                        <div class="d-flex align-center mr-3 frame-hard-btu" @click="frameSettingChange
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
                            <input v-model="item.value" :class="frameSettingChange ? 'ml-1' : 'ml-1 openedit'"
                              type="number" :style="item.name === '環境濕度' ? 'width: 22px' : 'width: 33px'"
                              :disabled="item.name === '穿透率' ? true : frameSettingChange" />
                            <div v-if="item.name === '環境濕度'">%</div>
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
                  <!-- <div id="image" @mousemove="movepoint"> -->
                  <div id="image">
                    <div id="goBackForGroup" @click="offdialogGroupChange(false)" v-if="blobGroupsaveSelectMask !== null">
                      <v-img src="/images/Group 4057.png" />
                    </div>
                    <!-- 畫面顯示 原konva -->
                    <!-- 20230525 add pixijs -->
                    <canvas id="pixijsRoicanvas"></canvas>
                    <!-- 20230525 add pixijs ===end -->
                    <v-menu v-model="showMenu" :position-x="MenuX" :position-y="MenuY" absolute offset-y depressed
                      content-class="elevation-0">
                      <div class="showMenuStyle">
                        <div class="mr-1">
                          <v-img src="images/meun-multiscreen/setting.png"></v-img>
                        </div>
                        <v-divider vertical color="#fff" class="py-2 mr-1"></v-divider>
                        <v-tooltip top>
                          <template v-slot:activator="{ on, attrs }">
                            <div class="mr-1 showMenu-btn" v-bind="attrs" v-on="on" @click="askGroupwindow = true">
                              <v-img src="images/meun-multiscreen/changeGroup.png"></v-img>
                            </div>
                          </template>
                          <span>群組編輯</span>
                        </v-tooltip>
                        <v-tooltip top>
                          <template v-slot:activator="{ on, attrs }">
                            <div class="mr-1 showMenu-btn" v-bind="attrs" v-on="on">
                              <v-img src="images/meun-multiscreen/pen.png"></v-img>
                            </div>
                          </template>
                          <span>編輯</span>
                        </v-tooltip>
                        <!-- <v-tooltip top>
                          <template v-slot:activator="{ on, attrs }">
                            <div class="mr-1 showMenu-btn" v-bind="attrs" v-on="on" @click="selectGroupWindows = true">
                              <v-img src="images/meun-multiscreen/edit.png"></v-img>
                            </div>
                          </template>
                          <span>更改類別</span>
                        </v-tooltip> -->
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
                  <div class="Thermal-bar-w" :style="!displayObject4 ? 'display:none;' : ''">
                    <form @submit.prevent="setColorbarTemp">
                      <div class="text-center">
                        <!-- <v-btn elevation="1" type="submit" name="maxAuto" x-small dark>Auto</v-btn> -->
                        <v-btn elevation="1" name="maxAuto" x-small dark @click="setColorbarTemp('MaxBtn')"
                          :disabled="ColorMaxAuto">Auto</v-btn>
                        <br />
                        <input type="number" v-model="colorbar.max" name="maxTemp" @focus="focusColorMax = true"
                          @blur="focusColorMax = false" @change="(e) => { setColorbarTemp('inputMax', e) }" />°C
                        <!-- <v-text-field color="#fff" type="number" :value="colorbar.max"></v-text-field>°C -->
                      </div>
                      <div class="text-center">
                        <img :src="thermalimg" />
                      </div>
                      <div class="text-center">
                        <input type="number" name="minTemp" v-model="colorbar.min" @focus="focusColorMin = true"
                          @blur="focusColorMin = false" @change="(e) => { setColorbarTemp('inputMin', e) }" />°C<br />
                        <v-btn elevation="1" x-small dark name="minAuto" @click="setColorbarTemp('MinBtn')"
                          :disabled="ColorMinAuto">Auto</v-btn>
                      </div>
                    </form>
                  </div>
                  <!-- <div :style="{
                    top: this.reference.Y + 'px',
                    left: this.reference.X + 'px',
                  }" id="spot" class="spot">
                    <img src="/images/spot_1.png" />
                    <div class="spot-span">
                      <div>R</div>
                    </div>
                  </div> -->
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

              <v-text-field v-model="transmission" class="subtitle card5content mx-3 text-color font-weight-large"
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
                    <tr v-if="lockedRoiTable.length === 0">
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
                    <template v-if="lockedRoiTable.length === 0">
                      <tr v-for="(item, index) in pixispot" :key="'C' + index"
                        :class="item.data.spot_alarm_status === 1 && item.data.spot_temperature >= item.data.spot_threshold ? 'alarmee' : ''">
                        <td class="text-center" style="padding: 0px 13px">
                          <v-badge :content="item.data.spot_number" overlap color="#828C8F" class="my-0">
                            <v-btn icon class="right-btn"><img class="" alt="" src="/right-icons/spot2.png"
                                width="20em" /></v-btn>
                          </v-badge>
                        </td>
                        <td class="text-center subtitle-right" style="padding: 0px 25px">
                          {{ item.data.spot_temperature }}°C
                        </td>
                        <td class="text-center" style="padding: 0px 25px">
                          <!-- 點:警報對話框 -->
                          <v-btn color="" icon :class="item.data.spot_alarm_status === 1 &&
                            item.data.spot_temperature >= item.data.spot_threshold
                            ? 'right-btn1'
                            : 'right-btn'
                            " @click="opendialog(item.data.spot_number, 'spot')"><img v-if="item.data.spot_alarm_status === 1 &&
    item.data.spot_temperature < item.data.spot_threshold
    " class="" alt="" src="/right-icons/alert-on.png" width="18em" depressed />
                            <img v-else-if="item.data.spot_alarm_status === 1 &&
                              item.data.spot_temperature >= item.data.spot_threshold
                              " class="" alt="" src="/right-icons/alert-fff.png" width="18em" depressed />
                            <img v-else-if="item.data.spot_alarm_status === 0" class="" alt=""
                              src="/right-icons/alert-off.png" width="18em" depressed />
                          </v-btn>
                        </td>
                        <td class="text-center" style="padding: 0px 13px">
                          <v-btn color="" icon class="right-btn"><img class="" alt="" src="/right-icons/delete.png"
                              width="18em" @click="deletespot(item.data.spot_number)" /></v-btn>
                        </td>
                      </tr>
                    </template>
                    <!-- SCOPE -->
                    <template v-if="lockedRoiTable.length === 0">
                      <tr v-for="(item, index) in pixiscope" :key="'D' + index" :class="item.data.scope_alarm_status === 1 &&
                        item.data.scope_temperature_max >= item.data.scope_threshold ? 'alarmee' : ''">
                        <td class="text-center" style="padding: 0px 13px">
                          <v-badge :content="item.data.scope_number" overlap color="#828C8F" class="my-0">
                            <v-btn icon class="right-btn"><img class="rectangle" alt="" src="/right-icons/rectangle2.png"
                                width="17em" /></v-btn>
                          </v-badge>
                        </td>
                        <td class="text-center subtitle-right" style="padding: 0px 25px">
                          {{ item.data.scope_temperature_max }}°C
                        </td>
                        <td class="text-center" style="padding: 0px 25px">
                          <!-- 面:警報對話框 -->
                          <v-btn color="" icon :class="item.data.scope_alarm_status === 1 &&
                            item.data.scope_temperature_max >= item.data.scope_threshold
                            ? 'right-btn1'
                            : 'right-btn'
                            " @click="opendialog(item.data.scope_number, 'scope')"><img v-if="item.data.scope_alarm_status === 1 &&
    item.data.scope_temperature_max < item.data.scope_threshold
    " class="" alt="" src="/right-icons/alert-on.png" width="18em" depressed />
                            <img v-if="item.data.scope_alarm_status === 1 &&
                              item.data.scope_temperature_max >= item.data.scope_threshold
                              " class="" alt="" src="/right-icons/alert-fff.png" width="18em" depressed />
                            <img v-else-if="item.data.scope_alarm_status === 0" class="" alt=""
                              src="/right-icons/alert-off.png" width="18em" depressed />
                          </v-btn>
                        </td>
                        <td class="text-center" style="padding: 0px 13px">
                          <v-btn color="" icon class="right-btn"><img class="" alt="delete" src="/right-icons/delete.png"
                              width="18em" @click="deletescope(item.data.scope_number)" /></v-btn>
                        </td>
                      </tr>
                    </template>
                    <!-- LINE -->
                    <template v-if="lockedRoiTable.length === 0">
                      <tr v-for="(item, index) in pixiline" :key="'H' + index" :class="item.data.line_alarm_status === 1 &&
                        item.data.line_temperature_max >= item.data.line_threshold ? 'alarmee' : ''">
                        <td class="text-center" style="padding: 0px 13px">
                          <v-badge :content="item.data.line_number" overlap color="#828C8F" class="my-0">
                            <v-btn icon class="right-btn"><img class="" alt="alert" src="/right-icons/line2.png"
                                width="15em" /></v-btn>
                          </v-badge>
                        </td>
                        <td class="text-center subtitle-right" style="padding: 0px 25px">
                          {{ item.data.line_temperature_max }}°C
                        </td>
                        <td class="text-center" style="padding: 0px 25px">
                          <!-- 線:警報對話框 -->
                          <v-btn color="" icon :class="item.data.line_alarm_status === 1 &&
                            item.data.line_temperature_max >= item.data.line_threshold
                            ? 'right-btn1'
                            : 'right-btn'
                            " @click="opendialog(item.data.line_number, 'line')"><img v-if="item.data.line_alarm_status === 1 &&
    item.data.line_temperature_max < item.data.line_threshold
    " class="" alt="" src="/right-icons/alert-on.png" width="18em" depressed />
                            <img v-if="item.data.line_alarm_status === 1 &&
                              item.data.line_temperature_max >= item.data.line_threshold
                              " class="" alt="" src="/right-icons/alert-fff.png" width="18em" depressed />
                            <img v-else-if="item.data.line_alarm_status === 0" class="" alt=""
                              src="/right-icons/alert-off.png" width="18em" depressed />
                          </v-btn>
                        </td>
                        <td class="text-center" style="padding: 0px 13px">
                          <v-btn color="" icon class="right-btn" @click="deleteline(item.data.line_number)"><img class=""
                              alt="delete" src="/right-icons/delete.png" width="18em" /></v-btn>
                        </td>
                      </tr>
                    </template>
                    <template>
                      <!-- <tr v-if="item.associated === 0" :key="'p' + index"> -->
                      <tr v-for="(item, index) in pixiJsRoiBlobData" :key="'p' + index" :class="item.info.blob_alarm_status === 1 &&
                        item.info.blob_temperature_max >= item.info.blob_threshold ? 'alarmee' : ''">
                        <template v-if="filtrationRoi(item) || lockedRoiTable.length === 0">
                          <td class="text-center" style="padding: 0px 13px">
                            <v-badge :content="item.info.blob_number" overlap color="#828C8F" bordered>
                              <v-btn icon class="right-btn"><img class="" alt="" src="/right-icons/blob.png"
                                  width="20em" />
                              </v-btn>
                            </v-badge>
                          </td>
                          <td class="text-center subtitle-right" style="padding: 0px 25px">
                            {{ item.info.blob_temperature_max.toFixed(1) }}°C
                          </td>
                          <td class="text-center" style="padding: 0px 25px">
                            <!-- 多邊形:警報對話框 -->
                            <v-btn color="" icon :class="item.info.blob_alarm_status === 1 &&
                              item.info.blob_temperature_max >= item.info.blob_threshold
                              ? 'right-btn1'
                              : 'right-btn'
                              " @click="opendialog(item.info.blob_number, 'custom-blob')"><img v-if="item.info.blob_alarm_status === 1 &&
    item.info.blob_temperature_max < item.info.blob_threshold
    " class="" alt="" src="/right-icons/alert-on.png" width="18em" depressed />
                              <img v-if="item.info.blob_alarm_status === 1 &&
                                item.info.blob_temperature_max >= item.info.blob_threshold
                                " class="" alt="" src="/right-icons/alert-fff.png" width="18em" depressed />
                              <img v-else-if="item.info.blob_alarm_status === 0" class="" alt=""
                                src="/right-icons/alert-off.png" width="18em" depressed />
                            </v-btn>
                          </td>
                          <td class="text-center" style="padding: 0px 13px">
                            <v-btn color="" icon class="right-btn"><img class="" alt="" src="/right-icons/delete.png"
                                width="18em"
                                @click="deleteCustomblob(item.info.blob_number, item.info.points, item.info.group_name)" />
                            </v-btn>
                            <!-- 20230525 暫時更換 -->
                            <!-- <v-btn color="" icon class="right-btn"><img class="" alt="" src="/right-icons/delete.png"
                              width="18em" />
                          </v-btn> -->
                          </td>
                        </template>
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
                      <template v-if="filtrationRoi1(item) || lockedRoiTable.length === 0">
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
                    color="#545454" width="17em"></v-date-picker>
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

// import Konva from 'konva'
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
    // olny pixijs data.
    lockedRoiTable: [],
    // focusGroupName: null,
    // focusGroupId: null,
    focusColorMax: false,
    focusColorMin: false,
    ColorMaxAuto: false,
    ColorMinAuto: false,
    PIXI: null,
    setPixiFPSInt: null,
    setFPS: '-',
    pixijsfps: 1,
    appPixi: null, // Pixijs 宣告
    pixiWebWorker: null, // 處理blob 路徑的webworker
    pixiwidth: 0, // pixi 寬度
    pixiheight: 0, // pixi 高度
    pixireference: [], // pixi reference物件資料
    pixispot: [], // pixi spot物件資料
    pixiline: [], // pixi line物件資料
    pixiscope: [], // pixi scope物件資料
    lineWidth: 1, // blol邊框粗細
    pixiblob: [], // pixi blob物件資料(未處理)
    pixiSuperResolution: {
      btn: null,
      line: null,
      streaming: null,
      mask: null
    },
    pixiJsRoiBlobData: [], // pixi blob物件資料(已處理)
    revisionObject: [], // 調整點物件 (適用 scope & blob)
    bgimg: null,
    overbase64img: null,
    dragTarget: null,
    dragTarget2: null,
    dragTargettemp: { x: 0, y: 0 },
    newSpotLocation: { x: 0, y: 0 },
    newLineLocation: { x: 0, y: 0 },
    oldlinetemp: [],
    mousesaveLocation: { x: 0, y: 0 },
    intiRevisionScopeData: null,
    tempScopeData: null,
    tempScopePosition: {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    },
    tempSetScopenumber: null,
    stopListener: null, // 透明遮罩避免編輯blob時會移動到其他物件
    mouseSideScopeStatus: false,
    saveonDragStart: null, // 暫存revisionTransformerMove 函數，做刪除監聽用
    saveonDragStart2: null, // 暫存revisionTransformerMove 函數，做刪除監聽用
    saveFouceTempRevision: null, // 暫存revisionTransformerMove 函數，做刪除監聽用
    saveonCanvasMove: null, // 暫存saveonCanvasMove 函數，做刪除監聽用
    actionROIClickType: null,
    askGroupwindow: false,
    askaddGroupwindow: false,
    askaddGroupName: null,
    askaddGroupId: null,
    logrightRoiData: null, // 記錄點到ROI
    waitingToJoin: false,
    blobGroupSelectMask: null,
    blobGroupsaveSelectMask: null,
    munisplayStatus: false,
    focusmode: false,
    focusGroupmode: false,
    // ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
    allsilderSt: false,
    temperatureRanger: 95, // 高溫範圍(%)
    cameraParamsLowTempFilter: 10,
    ClipLimit: 10,
    sendCameraIdtoInt: null,
    image1: {
      image: null,
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
      width: 39,
      height: 39,
      image: null,
      // radius: 10,
      // fill: 'red',
      visible: false,
      draggable: true
    },
    resolutionline: {
      points: [0, 0, 0, 2000],
      x: 0,
      y: 0,
      offsetY: 0,
      offsetX: 0,
      stroke: '#fff',
      strokeWidth: 3,
      height: 1000,
      visible: false,
    },
    tempRactData: null,
    animationPoint: [],
    AiAddRoiMassage: false,
    focusRoiTempData: {}, // 暫存AI 自動加入的ROI資訊(該物件被點擊後儲存)
    selectGroupWindows: false,
    saveBlobTemp: null,
    saveBlobTempString: null,
    tempGuoupName: null,
    ws3: null, // 呼叫ROI
    ws4: null, // 雙向WS
    wkstreaming: null,
    NuxtSetting: null,
    // 即時畫面右上設定
    screenSettings: [
      // { name: '一般溫度', value: 0.95, check: false },
      { name: '反射溫度', value: null, check: false },
      { name: '環境溫度', value: null, check: false },
      { name: '環境濕度', value: null, check: false },
      { name: '量測距離', value: null, check: false },
      { name: '放射率', value: null, check: false },
      { name: '穿透率', value: null, check: false },
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
    wsblock: true,
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
    thermalimg: '/images/colorbar_greyscale.png',
    // 右4顯示
    arrayEvents: null,
    date2: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),

    // 右5設定
    emissivity: null,
    transmission: null,
    reflected: null,
    distance: null,
    atmospheric: null,
    humidity: null,
    temperature: null,

    alarmDate: new Date(),
    alarmCalendar: [],
    frameSettingChange: true,
    alarmlistInterval: null,
    // konva 相關
    // configKonva: {
    //   width: 640,
    //   height: 480,
    // },
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
    transformerConfig: {
      rotateEnabled: false, strokeScaleEnabled: false,
    },
    chromatographyMode: 'Gray',
    chromatographyModestatus: 1,
    // Konva-blob transform
    blobStatusAdd: false,
    blobItems: [],
    blobTempItems: [], // 站存原始blob資料
    blobTempsData: null, // 暫存線
    AddTempPoints: [],
    blobPoints: 0,
    moveRemovePoint: false, // 判斷滑鼠是否在刪除點上
    removePoint: null, // 刪除點
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
    // GroupNameitems: ['FUSE', 'CT', 'WIRE'], // 選取群組用
    // GroupName: 'FUSE', // 選取群組
    GroupNameitems: [], // 選取群組用 設定請至 plugubs>main.js
    GroupName: '', // 選取群組 設定請至 plugubs>main.js'
    GroupIditems: [],
    GroupId: 'add',
    // end
    detailed: false,
    liveStatus: true, // live 狀態
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
    displayObject4: true,
    displayObject5: false,
    displayObject6: false,
    displayObject7: true,
    displayObject7temp: true,
    displayObject8: false,
    displayObject9: false,
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
    colorbar: {
      max: 0,
      min: 0
    },
    queryCameraInfoloading: false,
    resolutionWs4: null,
    wsListener1: {
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
    wsListener4: {
      close: null,
      message: null
    },
  }),
  mounted() {
    // this.PIXI = window.PIXI
    // console.log("start", this.PIXI);
    // test
    // this.$store.commit('myData/increment1');
    // this.$store.dispatch('myData/incrementAsync');
    console.log("掛載單機畫面");
    // 刷新左上角相機列表
    var display = () => {
      // 判斷image 長寬不等於0才執行初始化
      // 未找出二次渲染造成image 等於0的原因
      // 暫時增加這個判斷式 2023/06/27-有時間再修即可
      if (document.getElementById('image').clientWidth !== 0) {
        this.startDisplay()
      } else {
        console.log("畫布未加載完成");
        setTimeout(() => {
          display()
        }, 100)
      }
    }
    display()
  },
  created() {
    this.GroupNameitems = this.$userMaim.groupList().list
    this.GroupName = this.$userMaim.groupList().select
  },
  // 對話框
  computed: {
    messages() {
      return this.showMessages ? ['已開啟'] : ['未開啟']
    },
    // counter() {
    //   return this.$store.state.myData.counter;
    // },
  },
  watch: {
    '$store.state.myData.params.tooltipFocus': {
      handler(newValue) {
        var oldData = this.pixiblob
        // var oldDataLen = this.pixiblob.length
        var groupName = newValue.groupName
        var groupId = newValue.groupId
        var findName = []
        if (groupId !== undefined) {
          findName = oldData.filter((item) => item.group_name === groupName && (item.group_id).toString() === (groupId).toString())
        } else {
          findName = oldData.filter((item) => item.group_name === groupName)
        }
        this.lockedRoiTable = findName
        this.$store.dispatch('myData/incrementAsync', { type: 'Locked', params: findName });
        oldData = null
        groupName = null
        groupId = null
        findName = null
        // console.log(findName);
        // console.log("被觸發(multiscreen)", newValue);
      }
    },
    '$store.state.myData.params.tooltipHover': {
      handler(newValue) {
        var oldData = this.pixiblob
        // var oldDataLen = this.pixiblob.length
        var groupName = newValue.groupName
        var groupId = newValue.groupId
        var findName = []
        var output = {}
        output.currentTarget = {}
        output.currentTarget.custom = {}
        output.currentTarget.custom.data = {}
        // console.log("被觸發(multiscreen)", groupName, groupId);
        if (groupName !== undefined && groupId !== undefined) {
          findName = oldData.filter((item) => item.group_name === groupName && (item.group_id).toString() === (groupId).toString())
          output.currentTarget.custom.data = findName[0]
          if (!newValue.out) {
            this.focusGroupmode = true
            this.ObjectChangedMouseover(output, findName[0])
          } else {
            this.focusGroupmode = false
            this.ObjectChangedMouseout(output, findName[0])
          }
        } else if (groupName !== undefined && groupId === undefined) {
          findName = oldData.filter((item) => item.group_name === groupName)
          output.currentTarget.custom.data = findName[0]
          console.log("name", output);
          if (!newValue.out) {
            this.ObjectChangedMouseover(output, findName[0])
          } else {
            this.ObjectChangedMouseout(output, findName[0])
          }
          this.focusGroupmode = false
        }
        oldData = null
        groupName = null
        groupId = null
        output = null
        findName = null
      }
    },
    $route(to, from) {
      this.showCamList()
    },

    lockedRoiTable(data) {
      // console.log(data);
      if (data.length > 0 && this.blobGroupSelectMask === null) {
        var PIXI = window.PIXI
        var mask = new PIXI.Graphics();
        mask.interactive = true;
        mask.name = 'groupSelect'
        mask.beginFill('rgba(0,0,0,0.05)');
        mask.drawRect(0, 0, document.getElementById('image').offsetWidth + 200, document.getElementById('image').offsetHeight + 200);
        mask.endFill();
        mask.on('mousedown', () => {
          // console.log('test');
          this.blobGroupSelectMask.destroy()
          this.blobGroupSelectMask = null
          this.munisplayStatus = false
          // var router1 = this.$route.query
          this.focusGroupmode = false
          this.focusmode = false
          this.lockedRoiTable = []
          this.$store.dispatch('myData/incrementAsync', { type: 'Locked', params: this.lockedRoiTable });
          // console.log("remove select", this.lockedRoiTable, this.focusGroupmode, this.focusmode);
          // setTimeout(() => {
          //   this.$router.push({
          //     query: {
          //       cam: router1.cam,
          //       main: router1.main,
          //       secondary: router1.secondary,
          //       tab: 'tab-2',
          //       push: this.generateRandomString(20)
          //     },
          //     params: {
          //       lockedRoiTable: this.lockedRoiTable
          //     }
          //   })
          // }, 1)
        })
        this.appPixi.stage.addChild(mask);
        this.blobGroupSelectMask = mask
        mask = null
        PIXI = null
      }
    },
    displayObject5(data) {
      this.resolutionEventCircle.visible = data
      this.resolutionConfig.visible = data
      this.resolutionline.visible = data
      // console.log(data);
    },
    // displayObject7() {
    // 群組顯示變更，將會更新一次所有ROI
    // this.runBlob(this.pixiblob)
    // }
  },
  methods: {
    // ttt(e){
    //   console.log("test111");
    // },
    // setColorbarTemp(e) {
    //   console.log("test", e);
    // },
    setCustomRangerChange(mod, type, data) {
      var output
      if (mod === 'cameraParamsLowTempFilter') {
        output = {
          type: "cameraParams_Low_temp_filter",
          method: "modify",
          session: Math.random().toString(36).substr(2),
          cam_id: this.$route.query.cam,
          params: { status: this.displayObject8 ? "1" : "0", level: this.cameraParamsLowTempFilter / 10 }
        }
        if (type === "set") {
          output.params.level = data / 10
        } else if (type === "swh") {
          this.allsilderSt = true
          output.params.status = data ? "1" : "0"
          this.displayObject8 = data
        }
      } else if (mod === 'cameraParams_Clip_limit') {
        output = {
          type: "cameraParams_Clip_limit",
          method: "modify",
          session: Math.random().toString(36).substr(2),
          cam_id: this.$route.query.cam,
          params: { status: this.displayObject9 ? "1" : "0", level: this.ClipLimit / 10 }
        }
        if (type === "set") {
          output.params.level = data / 10
        } else if (type === "swh") {
          this.allsilderSt = true
          output.params.status = data ? "1" : "0"
          this.displayObject9 = data
        }
      } else if (mod === 'cameraParams_AutoRoi_Status') {
        this.allsilderSt = true
        output = {
          type: "cameraParams_AutoRoi_Status",
          method: "modify",
          cam_id: this.$route.query.cam,
          session: Math.random().toString(36).substr(2),
          params: { "status": data ? "1" : "0" }
        }
      }
      this.ws4.send(JSON.stringify(output))
      // console.log("s");
      output = null
    },
    setCustomRangerslider(mod, data) {
      this.allsilderSt = true
      var output
      if (mod === 'cameraParamsLowTempFilter') {
        if (data === 0) {
          this.cameraParamsLowTempFilter--
        } else if (data === 1) {
          this.cameraParamsLowTempFilter++
        }
        output = {
          type: "cameraParams_Low_temp_filter",
          method: "modify",
          session: Math.random().toString(36).substr(2),
          cam_id: this.$route.query.cam,
          params: { status: this.displayObject8 ? "1" : "0", level: this.cameraParamsLowTempFilter / 10 }
        }
      } else if (mod === 'cameraParams_Clip_limit') {
        if (data === 0) {
          this.ClipLimit--
        } else if (data === 1) {
          this.ClipLimit++
        }
        output = {
          type: "cameraParams_Clip_limit",
          method: "modify",
          session: Math.random().toString(36).substr(2),
          cam_id: this.$route.query.cam,
          params: { status: this.displayObject9 ? "1" : "0", level: this.ClipLimit / 10 }
        }
      }
      this.ws4.send(JSON.stringify(output))
      output = null
    },
    setColorbarTemp(type, data) {
      var output = {
        type: "cameraParams_Colobar",
        method: "modify",
        cam_id: this.$route.query.cam,
        session: Math.random().toString(36).substr(2),
        params: {
          temperature_limit_High: { mode: this.ColorMaxAuto ? "auto" : "manual", temperature: convertToFloatWithOneDecimal(this.colorbar.max) },
          temperature_limit_Low: { mode: this.ColorMinAuto ? "auto" : "manual", temperature: convertToFloatWithOneDecimal(this.colorbar.min) }
        }
      }
      if (type === 'inputMax') {
        output.params.temperature_limit_High.mode = "manual"
      } else if (type === 'inputMin') {
        output.params.temperature_limit_Low.mode = "manual"
      } else if (type === 'MaxBtn') {
        output.params.temperature_limit_High.mode = "auto"
      } else if (type === 'MinBtn') {
        output.params.temperature_limit_Low.mode = "auto"
      }
      function convertToFloatWithOneDecimal(value) {
        const floatValue = parseFloat(value);
        const result = floatValue.toFixed(1);
        return parseFloat(result);
      }
      this.ws4.send(JSON.stringify(output))
      output = null
    },
    filtrationRoi(data) {
      // alarm setting
      var check = this.lockedRoiTable.find((item) => (item.blob_number).toString() === (data.info.blob_number).toString())
      return check !== undefined
    },
    filtrationRoi1(data) {
      // console.log("object", data, this.lockedRoiTable);
      return data.objcet.name === 'blob' && this.lockedRoiTable.find((item) => (item.blob_number).toString() === (data.objcet.number).toString()) !== undefined
    },
    removeSelectGr() {
      this.displayObject7 = false
      if (this.blobGroupSelectMask !== null) {
        this.blobGroupSelectMask.destroy()
        this.blobGroupSelectMask = null
      }
      this.lockedRoiTable = []
      this.$store.dispatch('myData/incrementAsync', { type: 'Locked', params: this.lockedRoiTable });
    },
    startDisplay() {
      this.queryCameraInfoloading = true
      this.showCamList()
      // const tabe = this.tab2
      document.onkeydown = function (event) {
        var id = document.getElementById('consoleMjpg2')
        var e = event || window.event
        // console.log(e.keyCode, tabe)
        if (e && e.keyCode === 192 && this.tab2 === 'tab-2') {
          if (id.classList.contains('d-none')) {
            id.classList.remove('d-none')
          } else {
            id.classList.add('d-none')
          }
        }
      }
      // console.log(Konva)
      this.openStreaming()
      // 定時呼叫api
      this.alarmlist(this.alarmDate)
      this.alarmlistInterval = setInterval(() => {
        this.alarmlist(this.alarmDate)
      }, 5000)

      // 對照圖程式
      this.imagecomparison()
      this.initpixi() // 初始化pixijs
      this.Refresh()
      this.autoDisplayStatus = false
      this.pixiWebWorker = new Worker('/worker/workerpixpjs.js');
      this.pixiWebWorker.addEventListener('message', (e) => {
        var data = e.data
        if (data.type === 'splineCurrent') {
          // (backup)20230714 spline 函數移交至後端計算
          if (!this.waitingToJoin) {
            this.runBlob(data.parameter)
          }
          // console.log(data.parameter);
          // (backup)20230714 spline 函數移交至後端計算 end
        } else if (data.type === 'splineCurrentOnly') {
          // console.log(Array.from(data.parameter));
          this.drawTempBlob(Array.from(data.parameter))
        }
        // console.log(data);
        data = null
      }, false);
    },
    // olny pixijs function
    // pixijs 初始化
    initpixi() {
      // console.log(id);
      var PIXI = window.PIXI
      // PIXI.settings.PREFER_ENV = PIXI.ENV.WEBGL;
      // 获取 canvas 元素
      var canvas = document.getElementById('pixijsRoicanvas');
      // const div = document.getElementById("test");
      // 创建 PixiJS 应用程序
      var canvasWidth = document.getElementById('image').clientWidth
      var canvasHeight = document.getElementById('image').clientHeight
      this.pixiwidth = canvasWidth
      this.pixiheight = canvasHeight
      var app = new PIXI.Application({
        view: canvas,
        width: this.pixiwidth,
        height: this.pixiheight,
        backgroundColor: 0x00000000, // 透明背景
        transparent: true, // 告诉渲染器使用透明背景
        backgroundAlpha: 0,
        antialias: true,
        autoDensity: true,
        powerPreference: 'high-performance',
        resolution: 1.5 // 分辨率設定
      });
      this.appPixi = app
      this.animation(app) // 執行動畫
      app.stage.interactive = true;
      app.stage.hitArea = app.screen;
      canvas.addEventListener('contextmenu', (event) => {
        event.preventDefault(); // 關閉默認右鍵選單
        // console.log('click right mouse btn');
      });
      app.stage.on('pointerdown', this.onCanvasDown);
      // app.stage.on('pointermove', this.onCanvasMove);
      app.stage.on('pointerup', (e) => {
        this.onDragEnd(e)
        this.revisionTransformerEnd(e)
      });
      app.stage.on('pointerupoutside', this.onDragEnd);
      // 創建pixijs背景串流
      var bg = PIXI.Sprite.from('/EMPTYv1.png');
      bg.name = 'bgimg'
      bg.width = canvasWidth
      bg.height = canvasHeight
      app.stage.addChild(bg);
      this.bgimg = bg
      this.initSuperResolution() // 初始化SuperResolution 物件
      // this.openResolutionStreaming()
      canvas = null
      canvasWidth = null
      canvasHeight = null
      app = null
      bg = null
      PIXI = null
    },
    initSuperResolution() {
      var PIXI = window.PIXI
      var sprite = PIXI.Sprite.from('/Union12arrow.png');
      sprite.name = 'superResolutionBtn'
      sprite.x = this.appPixi.screen.width / 2;
      sprite.y = this.appPixi.screen.height / 2;
      sprite.position.x += -19.5
      sprite.position.y += -19.5
      sprite.interactive = true;
      sprite.cursor = 'e-resize';
      this.appPixi.stage.addChild(sprite);
      sprite.on('pointerdown', (e) => { this.onDragStart(e, 'superResolutionBtn') });
      var streaming = new PIXI.Sprite();
      streaming.width = this.appPixi.screen.width
      streaming.height = this.appPixi.screen.height
      streaming.x = 0
      streaming.y = 0
      streaming.name = 'super1Resolution'
      this.appPixi.stage.addChild(streaming);
      var line = new PIXI.Graphics();
      line.x = this.appPixi.screen.width / 2;
      line.name = 'super1Resolution'
      line.beginFill(0xFFFFFF);
      line.lineStyle(3, 0xFFFFFF, 1);
      line.moveTo(0, 0);
      line.lineTo(0, 1000);
      line.closePath();
      line.endFill();
      this.appPixi.stage.addChild(line);
      this.pixiSuperResolution.btn = sprite;
      this.pixiSuperResolution.line = line;
      this.pixiSuperResolution.streaming = streaming;
      var thing = new PIXI.Graphics();
      thing.name = 'super1Resolution'
      this.appPixi.stage.addChild(thing);
      // thing.x = this.appPixi.screen.width / 2;
      // thing.y = this.appPixi.screen.height / 2;
      thing.beginFill(0x000000, 1);
      thing.drawRect(0, 0, this.appPixi.screen.width / 2, this.appPixi.screen.height);
      thing.endFill();
      // thing.lineStyle(0);
      streaming.mask = thing
      this.pixiSuperResolution.mask = thing
      sprite.visible = false;
      line.visible = false;
      streaming.visible = false;
      thing.visible = false;
      PIXI = null
      sprite = null
      streaming = null
      line = null
      thing = null
    },
    superResolutionEvent(position) {
      this.pixiSuperResolution.btn.x = position.x;
      this.pixiSuperResolution.line.x = position.x + 19.5;
      this.pixiSuperResolution.mask.width = position.x + 19.5;
    },
    // ROI 方法
    // Reference function
    runReference(data) {
      var newData = {
        data: null,
        pixi: null
      }
      if (this.pixireference.length > 0) {
        if (JSON.stringify(data[0].reference_position) === JSON.stringify(this.pixireference[0].data[0].reference_position)) {
          // console.log('no change');
          newData.data = data
          newData.pixi = this.pixireference[0].pixi
        } else {
          this.pixireference[0].pixi.destroy()
          newData.data = data
          newData.pixi = this.addpoint({ x: data[0].reference_position.X, y: data[0].reference_position.y }, 'R', 'reference', false)
          // console.log('change');
        }
      } else {
        newData.data = data
        newData.pixi = this.addpoint({ x: data[0].reference_position.X, y: data[0].reference_position.y }, 'R', 'reference', false)
      }
      newData.data[0].reference_temperature = this.roundDown(newData.data[0].reference_temperature, 1)
      // console.log(newData);
      this.pixireference = [newData]
      this.reference = data[0]
      newData = null
      // console.log(data[0]);
    },
    // Spot function
    runSpot(data) {
      // console.log("runstop" ,data);
      var len = data.length
      var oldData = this.pixispot
      var oldDataLen = this.pixispot.length
      try {
        for (var z = 0; z < oldDataLen; z++) {
          var selectRoi1 = data.find((item) => item.spot_number.toString() === oldData[z].data.spot_number.toString())
          if (selectRoi1 === undefined) {
            oldData[z].pixi.destroy()
            oldData = oldData.filter(obj => obj.data.spot_number !== oldData[z].data.spot_number);
          }
          // console.log(selectRoi1);
          selectRoi1 = null
        }
      } catch (error) {
        console.log("Spot function", error);
      }
      // console.log(len);
      for (var x = 0; x < len; x++) {
        var spotfindIndex = oldData.findIndex((item) => item.data.spot_number.toString() === data[x].spot_number.toString())
        data[x].spot_temperature = this.roundDown(data[x].spot_temperature, 1)
        if (spotfindIndex !== -1) {
          var newAlarm = data[x].spot_alarm_status === 1 && data[x].spot_temperature >= data[x].spot_threshold
          var oldAlarm = oldData[spotfindIndex].data.spot_alarm_status === 1 && oldData[spotfindIndex].data.spot_temperature >= oldData[spotfindIndex].data.spot_threshold
          // console.log(newAlarm , oldAlarm);
          if (
            JSON.stringify(data[x].spot_position) === JSON.stringify(oldData[spotfindIndex].data.spot_position)
            && newAlarm === oldAlarm
          ) {
            // console.log("no change", data[x].spot_number);
            // console.log('no change', oldData[spotfindIndex]);
            oldData[spotfindIndex].data = data[x]
          } else {
            // console.log('change', oldData[spotfindIndex]);
            // console.log("change", data[x].spot_number);
            oldData[spotfindIndex].pixi.destroy()
            oldData[spotfindIndex].data = data[x]
            oldData[spotfindIndex].pixi = this.addpoint({ x: data[x].spot_position.X, y: data[x].spot_position.Y }, data[x], 'spot', true)
          }
          newAlarm = null
          oldAlarm = null
        } else {
          var temppixijsdata = this.addpoint({ x: data[x].spot_position.X, y: data[x].spot_position.Y }, data[x], 'spot', true)
          // console.log('add spot', temppixijsdata);
          oldData.push({
            data: data[x],
            pixi: temppixijsdata
          })
          temppixijsdata = null
        }
        spotfindIndex = null
      }
      this.pixispot = oldData
      len = null
      oldData = null
      oldDataLen = null
    },
    runLine(data) {
      var len = data.length
      var oldData = this.pixiline
      var oldDataLen = this.pixiline.length
      try {
        for (var z1 = 0; z1 < oldDataLen; z1++) {
          var selectRoi1 = data.find((item) => JSON.stringify(item.line_number) === JSON.stringify(oldData[z1].data.line_number))
          if (selectRoi1 === undefined) {
            oldData[z1].pixi.destroy()
            oldData = oldData.filter(obj => obj.data.line_number !== oldData[z1].data.line_number);
          }
          selectRoi1 = null
          // console.log(selectRoi1);
        }
      } catch (error) {
        console.log("runLine function", error);
      }
      // var oldDataLen = this.line.length
      for (var x = 0; x < len; x++) {
        data[x].line_temperature_max = this.roundDown(data[x].line_temperature_max, 1)
        var linefindIndex = oldData.findIndex((item) => item.data.line_number.toString() === data[x].line_number.toString())
        if (linefindIndex !== -1) {
          var newAlarm = data[x].line_alarm_status === 1 && data[x].line_temperature_max >= data[x].line_threshold
          var oldAlarm = oldData[linefindIndex].data.line_alarm_status === 1 && oldData[linefindIndex].data.line_temperature_max >= oldData[linefindIndex].data.line_threshold
          if (
            JSON.stringify(data[x].line_position_point_A) === JSON.stringify(oldData[linefindIndex].data.line_position_point_A) && JSON.stringify(data[x].line_position_point_B) === JSON.stringify(oldData[linefindIndex].data.line_position_point_B)
            && newAlarm === oldAlarm
          ) {
            // console.log("no change");
            oldData[linefindIndex].data = data[x]
          } else {
            // console.log('change');
            oldData[linefindIndex].pixi.destroy()
            oldData[linefindIndex].data = data[x]
            oldData[linefindIndex].pixi = this.pixiaddLine(data[x], 'line')
          }
          newAlarm = null
          oldAlarm = null
        } else {
          // console.log("add");
          // console.log(data[x]);
          oldData.push({
            data: data[x],
            pixi: this.pixiaddLine(data[x], 'line')
          })
        }
        linefindIndex = null
      }
      this.pixiline = oldData
      len = null
      oldData = null
      oldDataLen = null
    },
    runScope(data) {
      // console.log(data);
      var len = data.length
      var oldData = this.pixiscope
      var oldDataLen = this.pixiscope.length
      try {
        for (var z1 = 0; z1 < oldDataLen; z1++) {
          var selectRoi1 = data.find((item) => JSON.stringify(item.scope_number) === JSON.stringify(oldData[z1].data.scope_number))
          if (selectRoi1 === undefined) {
            oldData[z1].pixi.destroy()
            oldData = oldData.filter(obj => obj.data.scope_number !== oldData[z1].data.scope_number);
          }
          selectRoi1 = null
          // console.log(selectRoi1);
        }
      } catch (error) {
        console.log(error);
      }
      for (var x = 0; x < len; x++) {
        data[x].scope_temperature_max = this.roundDown(data[x].scope_temperature_max, 1)
        var scopefindIndex = oldData.findIndex((item) => item.data.scope_number.toString() === data[x].scope_number.toString())
        if (scopefindIndex !== -1) {
          // 超溫判斷
          var newAlarm = data[x].scope_alarm_status === 1 && data[x].scope_temperature_max >= data[x].scope_threshold
          var oldAlarm = oldData[scopefindIndex].data.scope_alarm_status === 1 && oldData[scopefindIndex].data.scope_temperature_max >= oldData[scopefindIndex].data.scope_threshold
          // console.log(data[x].scope_threshold, data[x].scope_temperature_max, data[x].scope_threshold);
          // console.log(newAlarm, oldAlarm);
          if (
            JSON.stringify(data[x].scope_position_point_LT) === JSON.stringify(oldData[scopefindIndex].data.scope_position_point_LT)
            && JSON.stringify(data[x].scope_position_point_BR) === JSON.stringify(oldData[scopefindIndex].data.scope_position_point_BR)
            && JSON.stringify(data[x].approval) === JSON.stringify(oldData[scopefindIndex].data.approval)
            && newAlarm === oldAlarm
          ) {
            // console.log("no change");
            oldData[scopefindIndex].data = data[x]
          } else {
            // console.log('change');
            oldData[scopefindIndex].pixi.destroy()
            oldData[scopefindIndex].data = data[x]
            oldData[scopefindIndex].pixi = this.pixiaddScope(data[x], 'scope')
          }
          newAlarm = null
          oldAlarm = null
        } else {
          // console.log("add");
          oldData.push({
            data: data[x],
            pixi: this.pixiaddScope(data[x], 'scope')
          })
        }
        scopefindIndex = null
      }
      this.pixiscope = oldData
      len = null
      oldData = null
      oldDataLen = null
    },
    // _____Blob function
    runBlob(data) {
      // console.log(":ss", data);
      var oldData = this.pixiblob
      var oldDataLen = this.pixiblob.length
      var newDataLen = data.length
      var pixiBlob = this.pixiJsRoiBlobData
      // 以下判斷ROI 是否遭到刪除
      try {
        for (var z = 0; z < oldDataLen; z++) {
          var selectRoi1 = data.find((item) => JSON.stringify(item.blob_number) === JSON.stringify(oldData[z].blob_number))
          if (selectRoi1 === undefined) {
            var pixiBlobfind = pixiBlob.findIndex((item) => item.info.blob_number === oldData[z].blob_number)
            var pixilen = pixiBlob[pixiBlobfind].pixi.length
            var pixibglen = pixiBlob[pixiBlobfind].pixibg.length
            var markerlen = pixiBlob[pixiBlobfind].marker.length
            for (var o = 0; o < pixilen; o++) {
              pixiBlob[pixiBlobfind].pixi[o].destroy()
            }
            for (var as1 = 0; as1 < markerlen; as1++) {
              pixiBlob[pixiBlobfind].marker[as1].destroy()
            }
            for (var as2 = 0; as2 < pixibglen; as2++) {
              pixiBlob[pixiBlobfind].pixibg[as2].destroy()
            }
            // pixiBlob[pixiBlobfind].pixi = []
            pixiBlob = pixiBlob.filter(obj => obj.info.blob_number !== oldData[z].blob_number);
            pixiBlobfind = null
            pixilen = null
            markerlen = null
            pixibglen = null
          }
          selectRoi1 = null
        }
      } catch (error) {
        console.log('判斷ROI 是否遭到刪除', error);
      }
      // 判斷
      for (var i = 0; i < newDataLen; i++) {
        data[i].blob_temperature_max = this.roundDown(data[i].blob_temperature_max, 1)
        // console.log(data[i]);
        var selectRoi = oldData.find((item) => JSON.stringify(item.blob_number) === JSON.stringify(data[i].blob_number))
        if (selectRoi !== undefined) {
          // todo Roi還存在
          if (JSON.stringify(selectRoi.points) === JSON.stringify(data[i].points)
            && selectRoi.alarmStatus === data[i].alarmStatus
            && selectRoi.approval === data[i].approval
            && selectRoi.group_name === data[i].group_name
            && selectRoi.group_id === data[i].group_id
            && this.displayObject7temp === this.displayObject7
          ) {
            // console.log('無變化');
            // ROI無變化
            var pixiBlobfind12 = pixiBlob.findIndex((item) => JSON.stringify(item.info.blob_number) === JSON.stringify(data[i].blob_number))
            pixiBlob[pixiBlobfind12].info = data[i]
            // console.log(data[i].blob_number, '無變化');
            pixiBlobfind12 = null
          } else {
            console.log('更新blob');
            // ROI有變化
            var olddata = pixiBlob.find((item) => JSON.stringify(item.info.blob_number) === JSON.stringify(data[i].blob_number))
            var oldpixilen = olddata.pixi.length
            for (var deletepixi = 0; deletepixi < oldpixilen; deletepixi++) {
              olddata.pixi[deletepixi].destroy()
              olddata.pixibg[deletepixi].destroy()
              olddata.marker[deletepixi].destroy()
            }
            var newpole = data[i].points.length
            var newpodata = []
            var newpodatabg1 = []
            var newmarkerdata = []
            for (var addi = 0; addi < newpole; addi++) {
              newpodatabg1.push(this.ObjectChangedbg([data[i].spline[addi], data[i].alarmStatus])) // 20230731 add spline bg
              newpodata.push(this.ObjectChanged([data[i].spline[addi], data[i].alarmStatus], true, data[i]))
              newmarkerdata.push(this.markerPointObjcet(data[i].markerPoint[addi], data[i].blob_number, data[i].alarmStatus, data[i]))
            }
            var pixiBlobfind1 = pixiBlob.findIndex((item) => JSON.stringify(item.info.blob_number) === JSON.stringify(data[i].blob_number))
            pixiBlob[pixiBlobfind1].info = data[i]
            pixiBlob[pixiBlobfind1].pixi = newpodata
            pixiBlob[pixiBlobfind1].pixibg = newpodatabg1
            pixiBlob[pixiBlobfind1].marker = newmarkerdata
            olddata = null
            oldpixilen = null
            newpole = null
            newpodata = null
            newpodatabg1 = null
            newmarkerdata = null
            pixiBlobfind1 = null
          }
        } else {
          // Roi增加
          console.log('新增blob');
          var points = []
          var newpodatabg = []
          var marker = []
          var pointslen = data[i].points.length
          for (var j = 0; j < pointslen; j++) {
            // points.push(this.ObjectChanged(data[i].points[j], true))
            newpodatabg.push(this.ObjectChangedbg([data[i].spline[j], data[i].alarmStatus])) // 20230731 add spline bg
            points.push(this.ObjectChanged([data[i].spline[j], data[i].alarmStatus], true, data[i]))
            marker.push(this.markerPointObjcet(data[i].markerPoint[j], data[i].blob_number, data[i].alarmStatus, data[i]))
            // console.log(data[i]);
          }

          pixiBlob.push({
            info: data[i],
            pixi: points,
            pixibg: newpodatabg,
            marker
          })
          points = null
          marker = null
          newpodatabg = null
          pointslen = null
          // console.log(data[i].blob_number, ' 新增');
        }
        selectRoi = null
      }
      // console.log(pixiBlob);
      this.pixiJsRoiBlobData = pixiBlob
      this.pixiblob = data
      this.displayObject7temp = this.displayObject7
      oldData = null
      oldDataLen = null
      newDataLen = null
      pixiBlob = null
    },
    // 手動更新BLOB
    updataBlob(status) {
      this.waitingToJoin = status
      var PIXI = window.PIXI
      if (status) {
        if (this.blobGroupsaveSelectMask !== null) {
          this.blobGroupsaveSelectMask.destroy()
          this.blobGroupsaveSelectMask = null
        }
        var mask = new PIXI.Graphics();
        mask.interactive = true;
        mask.name = 'groupSelect'
        mask.beginFill('rgba(0,0,0,0.3)');
        mask.drawRect(0, 0, document.getElementById('image').offsetWidth + 200, document.getElementById('image').offsetHeight + 200);
        mask.endFill();
        this.appPixi.stage.addChild(mask);
        this.blobGroupsaveSelectMask = mask
        mask = null
      } else {
        this.blobGroupsaveSelectMask.destroy()
        this.blobGroupsaveSelectMask = null
      }
      var data = this.pixiblob
      // console.log("xxxxxx1", data);
      var pixiBlob = this.pixiJsRoiBlobData
      var pixiBloblen = pixiBlob.length
      // console.log(pixiBlob,pixiBloblen);
      for (var i = 0; i < pixiBloblen; i++) {
        // console.log(pixiBlob[i].pixi);
        for (var j = 0; j < pixiBlob[i].pixi.length; j++) {
          pixiBlob[i].pixi[j].destroy()
          pixiBlob[i].marker[j].destroy()
        }
      }
      this.pixiblob = []
      this.pixiJsRoiBlobData = []
      // this.pixiJsRoiBlobData
      // console.log("asdascascasc",this.pixiblob, this.pixiJsRoiBlobData);
      // this.pixiJsRoiBlobData = []
      this.runBlob(data)
      this.askGroupwindow = false
      // var router1 = this.$route.query
      // 初始化選取群組模式
      this.$store.dispatch('myData/incrementAsync', { type: 'Locked', params: [] });
      // setTimeout(() => {
      //   this.$router.push({
      //     query: {
      //       cam: router1.cam,
      //       main: router1.main,
      //       secondary: router1.secondary,
      //       tab: 'tab-2',
      //       push: this.generateRandomString(20)
      //     },
      //     params: {
      //       lockedRoiTable: []
      //     }
      //   })
      // }, 1)
      data = null
      pixiBlob = null
      pixiBloblen = null
      PIXI = null
      // router1 = null
      // console.log("更新");
    },
    // blob 準備新增
    blobAddSwitch() {
      // console.log('開始繪製blob');
      var onCanvasMove = (event) => {
        // console.log("偵測畫布滑鼠移動", this.blobStatusAdd, this.removePoint);
        if (this.blobStatusAdd) {
          if (this.removePoint !== null) {
            // console.log(event.global);
            // console.log(this.AddTempPoints);
            var map1 = null
            if (this.moveRemovePoint) {
              map1 = this.AddTempPoints
            } else {
              map1 = this.AddTempPoints.concat(event.global.x, event.global.y)
            }
            // map1.push(event.global.x, event.global.y)
            this.pixiWebWorker.postMessage({
              type: 'splineCurrentOnly',
              data: [map1, this.moveRemovePoint]
            })
            // console.log(map1);
            map1 = null
          }
        }
      }
      this.appPixi.stage.on('pointermove', onCanvasMove);
      this.saveonCanvasMove = onCanvasMove
      this.blobStatusAdd = true
      this.blobTempsData = null
      document.body.style.cursor = 'crosshair'
      this.dragObjectStatus = false
      // 新增遮罩
      var PIXI = window.PIXI
      var mask = new PIXI.Graphics();
      mask.name = 'mask'
      mask.beginFill('rgba(0,0,0,0.01)');
      mask.drawRect(0, 0, document.getElementById('image').offsetWidth + 200, document.getElementById('image').offsetHeight + 200);
      mask.endFill();
      this.appPixi.stage.addChild(mask);
      this.stopListener = mask
      mask = null
      PIXI = null
    },
    drawTempBlob(data) {
      // console.log('繪製blob', this.blobTempsData);
      // console.log(data);
      var PIXI = window.PIXI
      if (this.blobTempsData === null) {
        var spline1 = new PIXI.Graphics();
        this.appPixi.stage.addChild(spline1);
        spline1.name = 'other'
        spline1.lineStyle(1, 'rgb(255 199 82 / 0%)', 1);
        var polygon = new PIXI.Polygon(data, false);
        polygon.closeStroke = true;
        spline1.drawPolygon(polygon);
        // spline1.endFill();
        this.blobTempsData = spline1
        spline1 = null
        polygon = null
      } else {
        this.blobTempsData.clear()
        // const spline2 = new PIXI.Graphics();
        // this.appPixi.stage.addChild(spline2);
        // spline2.name = 'other'
        this.blobTempsData.lineStyle(1, 'rgb(255 199 82 / 0%)', 1);
        var polygon1 = new PIXI.Polygon(data, false);
        polygon1.closeStroke = true;
        this.blobTempsData.drawPolygon(polygon1);
        polygon1 = null
        // this.blobTempsData = spline2
        // spline2.endFill();
      }
      PIXI = null
    },
    markerPointObjcet(data, number, alarm, roidata) {
      var color = ['rgb(255 244 195 / 0%)', 'rgb(255 244 195 / 50%)']
      if (this.displayObject7) {
        // 如果元件群組顯示開啟
        var find = this.GroupNameitems.find((item) => item.value === roidata.group_name)
        if (find !== undefined) {
          color = [find.customColor[0], find.customColor[1]]
        }
      }
      // console.log("s" , data, number, alarm);
      var PIXI = window.PIXI
      const container = new PIXI.Container();
      this.appPixi.stage.addChild(container);
      container.name = 'blob'
      var graphics = new PIXI.Graphics();
      graphics.lineStyle(1, "rgb(0,0,0)", 1);
      if (roidata.approval === 0) {
        if (alarm) {
          graphics.beginFill(0xDE3249, 0.8);
        } else {
          graphics.beginFill(color[0], 1);
        }
      } else {
        graphics.beginFill("#FF8D41", 1);
      }
      graphics.drawCircle(data.x - 11, data.y - 11, 10);
      graphics.endFill();
      container.addChild(graphics);
      var style = new PIXI.TextStyle({
        fontSize: 15,
        align: 'center',
      });
      var basicText = new PIXI.Text(number, style);
      basicText.pivot.set(basicText.width / 2, basicText.height / 2);
      if (parseInt(number) < 10) {
        basicText.x = data.x - (basicText.width / 2) - 6;
        basicText.y = data.y - (basicText.height / 2) - 2;
      } else {
        basicText.x = data.x - (basicText.width / 2) - 2.5;
        basicText.y = data.y - (basicText.height / 2) - 2;
      }
      container.addChild(basicText);
      color = null
      PIXI = null
      graphics = null
      style = null
      basicText = null
      return container
    },
    ObjectChanged(data, type, roidata) {
      // blob 物件創建方法
      // type = true : 新增 | 修改
      // 宣告pixi
      var PIXI = window.PIXI
      var lineWidth = this.lineWidth
      var color = ['rgb(255 244 195 / 0%)', 'rgb(255 244 195 / 50%)']
      if (this.displayObject7) {
        // 如果元件群組顯示開啟
        var find = this.GroupNameitems.find((item) => item.value === roidata.group_name)
        if (find !== undefined) {
          color = [find.customColor[0], find.customColor[1]]
        }
        find = null
      }
      // const container = new PIXI.Container();
      // this.appPixi.stage.addChild(container);
      var pointData = type === true ? data[0] : data.info
      var alarm = type === true ? data[1] : data.alarm
      // var texture = PIXI.Texture.from(this.fillBackground(color[0], color[1]));
      if (type) {
        var spline1 = new PIXI.Graphics();
        this.appPixi.stage.addChild(spline1);
        spline1.name = 'blob'
        // 儲存自訂參數
        spline1.custom = {
          data: roidata,
          hover: 0
        }
        // 儲存自訂參數 end 
        if (roidata.approval === 0 && this.waitingToJoin) {
          if ((this.logrightRoiData.data.group_name).toString() === (roidata.group_name).toString() && (this.logrightRoiData.data.group_id).toString() === (roidata.group_id).toString()) {
            spline1.interactive = false;
            spline1.cursor = 'no-drop';
          } else {
            spline1.interactive = true;
            spline1.cursor = 'pointer';
          }
        } else {
          spline1.interactive = true;
          spline1.cursor = 'pointer';
        }
        if (roidata.approval === 0) {
          // 已存在的ROI
          if (!this.waitingToJoin) {
            // 非更改群組狀態
            if (alarm) {
              spline1.lineStyle(lineWidth, 0xDE3249, 1);
              spline1.beginFill(0xDE3249, 0.5)
            } else {
              spline1.lineStyle(lineWidth, '#fff', 1); // color[0]
              spline1.beginFill('rgb(255 255 255 / 0%)', 0.001)
              // spline1.beginTextureFill({ texture })
              // spline1.beginTextureFill({ color: 'rgb(255,199,82)'})
            }
          } else {
            // 更改群組狀態
            console.log("更改群組狀態");
            // console.log((this.logrightRoiData.data.group_id).toString(), (roidata.group_id).toString());
            if ((this.logrightRoiData.data.group_name).toString() === (roidata.group_name).toString() && (this.logrightRoiData.data.group_id).toString() === (roidata.group_id).toString()) {
              spline1.lineStyle(lineWidth, color[0], 1);
              spline1.beginFill('rgb(255 255 255 / 0%)', 0.001)
            } else if ((this.logrightRoiData.data.group_name).toString() === (roidata.group_name).toString() && (this.logrightRoiData.data.group_id).toString() !== (roidata.group_id).toString()) {
              spline1.lineStyle(lineWidth, color[0], 0.5);
              spline1.beginFill('rgb(255 255 255 / 0%)', 0.001)
            } else {
              spline1.lineStyle(lineWidth, "#FFFF00", 1);
              spline1.beginFill('rgb(255 255 255 / 0%)', 0.001)
            }
          }
        } else {
          // 待加入的ROI(由AI加入)
          spline1.lineStyle(lineWidth, "#FF8D41", 1);
          spline1.beginFill("#FF8D41", 0.5)
        }
        var polygon0 = new PIXI.Polygon(Array.from(pointData));
        spline1.drawShape(polygon0);
        // spline1.drawPolygon(Array.from(pointData));
        spline1.closePath();
        spline1.endFill();
        if (roidata.approval === 0) {
          spline1.on('rightclick', (e) => {
            // console.log("rightclick blob", e.currentTarget.custom);
            this.showMenu = true
            var clickLoction = e.client
            this.MenuX = clickLoction.x
            this.MenuY = clickLoction.y
            this.logrightRoiData = {
              type: 'blob',
              data: e.currentTarget.custom.data
            }
            clickLoction = null
          })
          spline1.on('mousedown', (e) => {
            // console.log("left click blob", e);
            if (this.waitingToJoin) {
              var selectRoi = e.currentTarget.custom.data
              // this.logaddGroupRoiData = selectRoi
              this.askaddGroupName = selectRoi.group_name
              this.askaddGroupId = selectRoi.group_id
              this.askaddGroupwindow = true
              selectRoi = null
              // 進入ROI選取模式
            } else {
              if (alarm) {
                this.munisplayStatus = true
              } else {
                this.munisplayStatus = false
              }
              this.onDragStart(e, 'blob')
              // -判斷是否初始點選ROI
              // -是=先點亮該群組所有ROI
              // -否=加入/刪除點選的ROI
              var blobdata = e.currentTarget.custom.data
              var blob12len = this.pixiJsRoiBlobData.length
              var arr = []
              if (this.lockedRoiTable.length > 0 && !this.focusmode && !this.focusGroupmode) {
                // 非初始
                var findnum = this.lockedRoiTable.find((item) => (item.blob_number).toString() === (blobdata.blob_number).toString())
                if (findnum === undefined) {
                  this.lockedRoiTable.push(blobdata)
                } else {
                  console.log("群組>id>focus>多選 mode", this.lockedRoiTable, this.focusGroupmode, this.focusmode);
                  var temp = this.lockedRoiTable.filter((item) => (item.blob_number).toString() !== (blobdata.blob_number).toString())
                  this.lockedRoiTable = temp
                  temp = null
                }
                findnum = null
              } else if (this.lockedRoiTable.length > 0 && this.focusGroupmode && !this.focusmode) {
                // console.log("群組>id mode", this.lockedRoiTable, this.focusGroupmode, this.focusmode);
                arr = []
                for (var j = 0; j < blob12len; j++) {
                  var roidata1 = this.pixiJsRoiBlobData[j].info
                  if ((blobdata.group_name).toString() === (roidata1.group_name).toString() && (blobdata.group_id).toString() === (roidata1.group_id).toString()) {
                    arr.push(roidata1)
                  }
                  roidata1 = null
                }
                this.lockedRoiTable = arr
                this.focusmode = true
                this.focusGroupmode = false
              } else if (this.lockedRoiTable.length > 0 && !this.focusGroupmode && this.focusmode) {
                // console.log("群組>id>focus mode", this.lockedRoiTable, this.focusGroupmode, this.focusmode);
                arr = []
                for (var z = 0; z < blob12len; z++) {
                  var roidata2 = this.pixiJsRoiBlobData[z].info
                  if ((blobdata.group_name).toString() === (roidata2.group_name).toString() && (blobdata.group_id).toString() === (roidata2.group_id).toString() && (blobdata.blob_number).toString() === (roidata2.blob_number).toString()) {
                    arr.push(roidata2)
                  }
                  roidata2 = null
                }
                this.lockedRoiTable = arr
                this.focusmode = false
              } else {
                // console.log("群組mode", this.lockedRoiTable, this.focusGroupmode, this.focusmode);
                // this.focusmode = true
                this.focusGroupmode = true
                // 初始
                for (var i = 0; i < blob12len; i++) {
                  var roidata = this.pixiJsRoiBlobData[i].info
                  if (blobdata.group_name === roidata.group_name) {
                    arr.push(roidata)
                  }
                  roidata = null
                }
                this.lockedRoiTable = arr
              }
              this.$store.dispatch('myData/incrementAsync', { type: 'Locked', params: this.lockedRoiTable });
              blobdata = null
              blob12len = null
              arr = null
            }
          });
          spline1.on('mouseover', (e) => {
            if (!this.$store.state.myData.params.hoverWindowStatus) {
              // var router1 = this.$route.query
              this.$store.dispatch('myData/incrementAsync', {
                type: 'hover', params: {
                  hover: {
                    gName: e.currentTarget.custom.data.group_name,
                    gId: e.currentTarget.custom.data.group_id
                  }
                }
              });
              this.ObjectChangedMouseover(e, roidata)
            }
          })
          spline1.on('mouseout', (e) => {
            if (!this.$store.state.myData.params.hoverWindowStatus) {
              // var router1 = this.$route.query
              this.$store.dispatch('myData/incrementAsync', {
                type: 'hover', params: {
                  hover: {}
                }
              });
              this.ObjectChangedMouseout(e, roidata)
            }
          })
        } else {
          spline1.on('mousedown', (e) => {
            this.AiAddRoiMassage = true
            this.actionROIClickType = "blob"
            this.focusRoiTempData = roidata
          })
        }
        PIXI = null
        color = null
        pointData = null
        alarm = null
        polygon0 = null
        return spline1
      } else {
        // 20230602 這邊好像無用
        console.log('檢查是否無作用');
        data.pixi.clear()
        data.pixi.custom.test = '123'
        if (alarm) {
          data.pixi.lineStyle(1, 0xDE3249, 1);
          data.pixi.beginFill(0xDE3249, 0.5)
        } else {
          data.pixi.lineStyle(1, 'rgb(255 199 82 / 0%)', 1);
          data.pixi.beginFill('rgb(255 255 255 / 100%)', 1)
          // data.pixi.beginTextureFill({ texture })
        }
        data.pixi.drawPolygon(Array.from(pointData));
        data.pixi.closePath();
        data.pixi.endFill();
        PIXI = null
        color = null
        pointData = null
        alarm = null
        return true
      }
    },
    ObjectChangedbg(data) {
      // console.log("add 背景");
      var PIXI = window.PIXI
      var pointData = data[0]
      var spline1 = new PIXI.Graphics();
      this.appPixi.stage.addChild(spline1);
      spline1.lineStyle(2, "#101C2D", 0.8);
      spline1.beginFill("#00000000", 0.001)
      spline1.name = 'blob'
      var polygon0 = new PIXI.Polygon(Array.from(pointData));
      spline1.drawShape(polygon0);
      spline1.closePath();
      spline1.endFill();
      PIXI = null
      pointData = null
      polygon0 = null
      return spline1
    },
    ObjectChangedMouseover(e, roidata) {
      var color = ['rgb(255 244 195 / 0%)', 'rgb(255 244 195 / 50%)']
      if (this.displayObject7) {
        // 如果元件群組顯示開啟
        var find = this.GroupNameitems.find((item) => item.value === roidata.group_name)
        if (find !== undefined) {
          color = [find.customColor[0], find.customColor[1]]
        }
        find = null
      }
      var PIXI = window.PIXI
      var childrenlen = this.pixiJsRoiBlobData.length
      var childrendata = this.pixiJsRoiBlobData
      for (var i = 0; i < childrenlen; i++) {
        var pixi = childrendata[i].pixi[0]
        // console.log(pixi);
        if (e.currentTarget.custom.data.group_name === pixi.custom.data.group_name && !this.displayObject5 && pixi.custom.data.approval === 0) {
          pixi.clear()
          if (pixi.custom.data.blob_alarm_status === 1 && pixi.custom.data.blob_temperature_max >= pixi.custom.data.blob_threshold) {
            pixi.lineStyle(1, 'rgb(216,58,59)', 1);
            if (e.currentTarget.custom.data.blob_number === pixi.custom.data.blob_number) {
              pixi.beginFill('rgba(216,58,59)', 0.6)
            } else {
              pixi.beginFill('rgba(216,58,59)', 0.4)
            }
          } else {
            pixi.lineStyle(1, color[0], 1); // '#fff'
            if (!this.focusGroupmode && e.currentTarget.custom.data.blob_number === pixi.custom.data.blob_number) {
              pixi.beginFill(color[0], 0.6)
            } else if (!this.focusGroupmode && e.currentTarget.custom.data.blob_number !== pixi.custom.data.blob_number) {
              pixi.beginFill(color[0], 0.4)
            } else if (this.focusGroupmode && e.currentTarget.custom.data.blob_number === pixi.custom.data.blob_number) {
              pixi.beginFill(color[0], 0.6)
            } else if (this.focusGroupmode && e.currentTarget.custom.data.blob_number !== pixi.custom.data.blob_number && (e.currentTarget.custom.data.group_id).toString() === (pixi.custom.data.group_id).toString()) {
              pixi.beginFill(color[0], 0.4)
            } else {
              pixi.lineStyle(1, '#fff', 1); // '#fff'
              pixi.beginFill('#fff', 0.001)
            }
          }
          var polygon1 = new PIXI.Polygon(Array.from(pixi.custom.data.spline[0]));
          // pixi.drawPolygon(Array.from(pixi.custom.data.spline[0]));
          pixi.drawShape(polygon1);
          pixi.closePath();
          pixi.endFill();
          // console.log(this.pixiJsRoiBlobData[i]);
          this.pixiJsRoiBlobData[i].pixi[0].custom.hover = 1
          polygon1 = null
        }
        // pixi.custom.hover = 1
        pixi = null
      }
      childrenlen = null
      childrendata = null
      find = null
      color = null
      PIXI = null
    },
    ObjectChangedMouseout(e, roidata) {
      var PIXI = window.PIXI
      var color = ['rgb(255 244 195 / 0%)', 'rgb(255 244 195 / 50%)']
      if (this.displayObject7) {
        // 如果元件群組顯示開啟
        var find = this.GroupNameitems.find((item) => item.value === roidata.group_name)
        if (find !== undefined) {
          color = [find.customColor[0], find.customColor[1]]
        }
        find = null
      }
      var childrenlen = this.pixiJsRoiBlobData.length
      var childrendata = this.pixiJsRoiBlobData
      for (var i = 0; i < childrenlen; i++) {
        var pixi = childrendata[i].pixi[0]
        if (e.currentTarget.custom.data.group_name === pixi.custom.data.group_name && pixi.custom.data.approval === 0) {
          pixi.clear()
          if (!this.waitingToJoin) {
            if (pixi.custom.data.blob_alarm_status === 1 && pixi.custom.data.blob_temperature_max >= pixi.custom.data.blob_threshold) {
              pixi.lineStyle(1, 'rgb(216,58,59)', 1);
              pixi.beginFill('rgba(216,58,59)', 1)
            } else {
              pixi.lineStyle(1, '#fff', 1); // color[0]
              pixi.beginFill('rgb(255 255 255 / 0%)', 0.001)
              // pixi.beginTextureFill({ texture })
            }
          } else if (this.waitingToJoin && (this.logrightRoiData.data.group_name).toString() === (pixi.custom.data.group_name).toString() && (this.logrightRoiData.data.group_id).toString() === (pixi.custom.data.group_id).toString()) {
            pixi.lineStyle(1, color[0], 1);
            pixi.beginFill('rgb(255 255 255 / 0%)', 0.001)
          } else {
            pixi.lineStyle(1, "#FFFF00", 1);
            pixi.beginFill('rgb(255 255 255 / 0%)', 0.001)
          }
          var polygon2 = new PIXI.Polygon(Array.from(pixi.custom.data.spline[0]));
          // pixi.drawPolygon(Array.from(pixi.custom.data.spline[0]));
          pixi.drawShape(polygon2);
          pixi.closePath();
          pixi.endFill();
          polygon2 = null
        }
        this.pixiJsRoiBlobData[i].pixi[0].custom.hover = 0
        // pixi.custom.hover = 0
        pixi = null
      }
      childrenlen = null
      childrendata = null
      color = null
      PIXI = null
    },
    openROIcheckWindow(type) {
      // 判斷新增、編輯彈跳視窗
      if (type === 'add') {
        this.serverMessageStatus = true
        this.serverMessage = '新增'
        this.getGroupID()
      }
      else if (type === 'edit') {
        // 這邊先註解，等到要寫編輯後開啟
        this.serverMessageStatus = true
        this.serverMessage = '編輯'
      }
    },
    getGroupID() {
      var groupList = this.$myPlugin.getRoiGroupList()
      groupList = groupList.cam_00_00001 // 暫時只讀取cam01
      var arr = [{ value: 'add', text: "新增至新群組" }]
      // Object.keys(groupList).forEach((key) => {
      var find = this.$userMaim.groupList().list.find((item) => item.value === this.GroupName)
      if (find !== undefined) {
        if (groupList[this.GroupName] !== undefined) {
          for (var i = 0; i < groupList[this.GroupName].length; i++) {
            arr.push({
              value: groupList[this.GroupName][i],
              text: groupList[this.GroupName][i]
            })
          }
        }
      }
      this.GroupIditems = arr
      arr = null
      groupList = null
      find = null
    },
    ScopeAdditionConfirmation(e) {
      // 確認是否新增範圍?
      if (e === 1) {
        // this.blobTempsData.group_name = this.GroupName
        // 判斷是否新增為新區域
        if (this.radioaddarea === 'newarea') {
          this.createblob()
        }
        // else {
        //   this.pushblob()
        // }
      } else {
        // 移除暫存物件
        this.blobTempsData.destroy()
        this.removePoint.destroy()
        this.stopListener.destroy()
        this.stopListener = null
        this.blobTempsData = null
        this.removePoint = null
        this.blobStatusAdd = false
        this.moveRemovePoint = false
        this.AddTempPoints = []
        document.body.style.cursor = 'auto'
        this.dragObjectStatus = true
      }
      this.serverMessageStatus = false
      // this.stopListener.visible = false
    },
    createblob() {
      var newpoint = this.AddTempPoints
      var newpointlen = newpoint.length
      for (var i = 0; i < newpointlen; i++) {
        if (i % 2) {
          newpoint[i] = newpoint[i] / document.getElementById('image').offsetHeight
        } else {
          newpoint[i] = newpoint[i] / document.getElementById('image').offsetWidth
        }
      }
      // console.log(newpoint);
      var reqdata = {
        // cam_id: this.camid,
        type: "roiAddBlob",
        cam_id: this.$route.query.cam,
        session: Math.random().toString(36).substr(2),
        points: newpoint,
        // tension: 0.5,
        group_name: this.GroupName,
        group_id: this.GroupId
      }
      this.ws4.send(JSON.stringify(reqdata))
      // 移除暫存物件
      this.blobTempsData.destroy()
      this.removePoint.destroy()
      this.stopListener.destroy()
      this.stopListener = null
      this.blobTempsData = null
      this.removePoint = null
      this.blobStatusAdd = false
      this.moveRemovePoint = false
      this.AddTempPoints = []
      document.body.style.cursor = 'auto'
      this.dragObjectStatus = true
      this.appPixi.stage.off('pointermove', this.saveonCanvasMove);
      newpoint = null
      newpointlen = null
      reqdata = null
    },
    deleteCustomblob(e, points1, group) {
      // console.log(e, points1, group)
      var arr = {
        type: 'roiChangeBlob',
        cam_id: this.$route.query.cam,
        session: Math.random().toString(36).substr(2),
        blob_number: parseInt(e),
        blob_status: "1",
        points: points1,
        // tension: 0.5,
        blob_alarm_status: 0,
        blob_threshold: 100,
        group_name: group,
        group_id: ""
      }
      this.ws4.send(JSON.stringify(arr))
      arr = null
      // axios({
      //   method: 'post',
      //   url: `http://localhost:5002/api/monitor/object/change/blob`,
      //   // url: `http://127.0.0.1:6189/api/monitor/object/change/blob`,
      //   data: arr,
      // }).catch((error) => console.log('error from axios', error))
    },
    pushScope() {
      // console.log('送出scope 更新資料');
      var scopePositionLT = {
        Y: this.tempScopePosition.y / this.pixiheight,
        X: this.tempScopePosition.x / this.pixiwidth,
      }
      var scopePositionBR = {
        Y: (this.tempScopePosition.y + this.tempScopePosition.height) / this.pixiheight,
        X: (this.tempScopePosition.x + this.tempScopePosition.width) / this.pixiwidth,
      }
      var InputScopeData = {
        type: 'roiChangeScope',
        cam_id: this.$route.query.cam,
        session: Math.random().toString(36).substr(2),
        scope_number: this.tempScopeData.scope_number,
        scope_status: '0',
        scope_position_LT: scopePositionLT,
        scope_position_BR: scopePositionBR,
        scope_alarm_status: this.tempScopeData.scope_alarm_status,
        scope_threshold: this.tempScopeData.scope_threshold,
      }
      this.pixiscope[this.tempSetScopenumber].data.scope_position_point_LT = scopePositionLT
      this.pixiscope[this.tempSetScopenumber].data.scope_position_point_BR = scopePositionBR
      this.ws4.send(JSON.stringify(InputScopeData))
      // this.intiRevisionScopeData = null
      this.tempScopePosition = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      }
      scopePositionLT = null
      scopePositionBR = null
      InputScopeData = null
      // this.dragObjectStatus = true
    },
    pushSpot() {
      var findindex1 = this.pixispot.findIndex((item) => item.pixi.custom.number === this.tempSetScopenumber)
      var newPosition = {
        x: this.newSpotLocation.x / this.pixiwidth,
        y: this.newSpotLocation.y / this.pixiheight
      }
      this.pixispot[findindex1].spot_position = newPosition
      // console.log(this.newSpotLocation , this.tempSetScopenumber);
      var thisSpotData = {
        // cam_id: idc,
        type: 'roiChangeSpot',
        cam_id: this.$route.query.cam,
        session: Math.random().toString(36).substr(2),
        spot_number: parseInt(this.tempSetScopenumber),
        spot_status: '0',
        spot_position: {
          Y: newPosition.y,
          X: newPosition.x,
        },
        spot_alarm_status: this.pixispot[findindex1].data.spot_alarm_status,
        spot_threshold: this.pixispot[findindex1].data.spot_threshold,
      }
      // console.log(thisSpotData);
      this.ws4.send(JSON.stringify(thisSpotData))
      this.tempSetScopenumber = null
      this.newSpotLocation = { x: 0, y: 0 }
      findindex1 = null
      newPosition = null
      thisSpotData = null
    },
    pushline(type) {
      var findindex = this.oldlinetemp.findIndex((item) => item.line_number === this.tempSetScopenumber)
      var data = this.oldlinetemp[findindex]
      var LineData = {
        type: "roiChangeLine",
        cam_id: this.$route.query.cam,
        session: Math.random().toString(36).substr(2),
        line_status: '0',
        line_number: this.tempSetScopenumber,
        line_position_point_A: {
          X: type === "lineA" ? this.newLineLocation.x / this.pixiwidth : data.line_position_point_A.X,
          Y: type === "lineA" ? this.newLineLocation.y / this.pixiheight : data.line_position_point_A.Y
        },
        line_position_point_B: {
          X: type === "lineB" ? this.newLineLocation.x / this.pixiwidth : data.line_position_point_B.X,
          Y: type === "lineB" ? this.newLineLocation.y / this.pixiheight : data.line_position_point_B.Y
        },
        line_alarm_status: data.line_alarm_status,
        line_threshold: data.line_threshold,
      }
      this.ws4.send(JSON.stringify(LineData))
      findindex = null
      data = null
      LineData = null
    },
    // -----Blob function end
    // 創建物件分類
    // add point object
    addpoint(data, roidata, name, dragging) {
      var imgurl = '/images/spot_1.png'
      var alarm = false
      var color = '#ffffff'
      var number = 'R'
      if (name === 'spot') {
        number = roidata.spot_number
      }
      if (roidata.spot_alarm_status === 1 && roidata.spot_temperature >= roidata.spot_threshold) {
        imgurl = '/images/spot_1_red.png'
        color = '#B82E40'
        alarm = true
      }
      // console.log(imgurl, roidata.spot_threshold, roidata.spot_temperature, roidata.spot_threshold);
      var PIXI = window.PIXI
      var group = new PIXI.Container();
      this.appPixi.stage.addChild(group);
      group.x = data.x * this.pixiwidth;
      group.y = data.y * this.pixiheight;
      group.name = name
      if (name === 'spot') {
        group.custom = {
          number
        }
      }
      group.interactive = dragging;
      group.cursor = dragging ? 'pointer' : 'auto';
      var newSprite = PIXI.Sprite.from(imgurl);
      group.addChild(newSprite);
      newSprite.x = -16.5
      newSprite.y = -16.5
      var graphics = new PIXI.Graphics();
      if (!alarm) {
        graphics.lineStyle(1, "rgb(0,0,0)", 1);
      }
      graphics.beginFill(color, 1);
      graphics.drawCircle(-20, -20, 10);
      graphics.endFill();
      group.addChild(graphics);
      var style = new PIXI.TextStyle({
        fontSize: 16,
      });
      var basicText = new PIXI.Text(number, style);
      if (parseInt(number) < 10 || number === 'R') {
        basicText.x = -25.5;
        basicText.y = -28.5;
      } else {
        basicText.x = -29.5;
        basicText.y = -28.5;
      }
      group.addChild(basicText);
      group.on('pointerdown', (e) => { this.onDragStart(e, 'spot') });
      imgurl = null
      alarm = null
      color = null
      number = null
      PIXI = null
      newSprite = null
      graphics = null
      style = null
      basicText = null
      return group
    },
    pixiaddLine(data, name) {
      var color = '#ffffff'
      var color1 = "rgb(5,26,31)"
      var alarm = false
      if (data.line_alarm_status === 1 && data.line_temperature_max >= data.line_threshold) {
        color = '#B82E40'
        color1 = '#B82E40'
        alarm = true
      }
      // console.log(data, number, name);
      var PIXI = window.PIXI
      var group = new PIXI.Container();
      group.name = name
      group.custom = { number: data.line_number }
      this.appPixi.stage.addChild(group);
      var line1 = new PIXI.Graphics();
      line1.name = "line1"
      line1.lineStyle(3, 0x000000); // 設定邊框為黑色，寬度為 2 像素
      line1.moveTo(data.line_position_point_A.X * this.pixiwidth, data.line_position_point_A.Y * this.pixiheight); // 移動到起始點
      line1.lineTo(data.line_position_point_B.X * this.pixiwidth, data.line_position_point_B.Y * this.pixiheight); // 繪製直線
      group.addChild(line1);
      var line2 = new PIXI.Graphics();
      line2.name = "line2"
      line2.lineStyle(1, color); // 設定邊框為黑色，寬度為 2 像素
      line2.moveTo(data.line_position_point_A.X * this.pixiwidth, data.line_position_point_A.Y * this.pixiheight); // 移動到起始點
      line2.lineTo(data.line_position_point_B.X * this.pixiwidth, data.line_position_point_B.Y * this.pixiheight); // 繪製直線
      group.addChild(line2);
      // 點一
      var graphics1 = new PIXI.Graphics();
      graphics1.name = "line_A"
      graphics1.x = data.line_position_point_A.X * this.pixiwidth
      graphics1.y = data.line_position_point_A.Y * this.pixiheight
      graphics1.interactive = true;
      graphics1.cursor = 'pointer';
      if (!alarm) {
        graphics1.lineStyle(1, "rgb(255,255,255)", 1);
      }
      graphics1.beginFill(color1, 1);
      graphics1.drawCircle(0, 0, 8);
      graphics1.endFill();
      graphics1.on('pointerdown', (e) => { this.onDragStart(e, 'line_A') });
      group.addChild(graphics1);
      // 點二
      var graphics2 = new PIXI.Graphics();
      graphics2.x = data.line_position_point_B.X * this.pixiwidth
      graphics2.y = data.line_position_point_B.Y * this.pixiheight
      graphics2.name = "line_B"
      graphics2.interactive = true;
      graphics2.cursor = 'pointer';
      if (!alarm) {
        graphics2.lineStyle(1, "rgb(255,255,255)", 1);
      }
      graphics2.beginFill(color1, 1);
      graphics2.drawCircle(0, 0, 8);
      graphics2.endFill();
      group.addChild(graphics2);
      graphics2.on('pointerdown', (e) => { this.onDragStart(e, 'line_B') });
      var num = new PIXI.Graphics();
      num.name = "circle"
      num.x = data.line_position_point_B.X * this.pixiwidth - 15
      num.y = data.line_position_point_B.Y * this.pixiheight - 15
      if (!alarm) {
        num.lineStyle(1, "rgb(5,26,31)", 1);
      }
      num.beginFill(color, 1);
      num.drawCircle(0, 0, 10);
      num.endFill();
      group.addChild(num);
      var style = new PIXI.TextStyle({
        fontSize: 16,
      });
      var basicText = new PIXI.Text(data.line_number, style);
      basicText.name = "text"
      if (parseInt(data.line_number) < 10) {
        basicText.x = data.line_position_point_B.X * this.pixiwidth - 19.5;
        basicText.y = data.line_position_point_B.Y * this.pixiheight - 24.5;
      } else {
        basicText.x = data.line_position_point_B.X * this.pixiwidth - 23.5;
        basicText.y = data.line_position_point_B.Y * this.pixiheight - 24.5;
      }
      group.addChild(basicText);
      color = null
      color1 = null
      alarm = null
      PIXI = null
      line1 = null
      line2 = null
      graphics1 = null
      graphics2 = null
      num = null
      style = null
      basicText = null
      return group
    },
    pixiUpdateLine(position, point) {
      // console.log(this.pixiline , this.tempSetScopenumber);
      var findindex = this.pixiline.findIndex((item) => item.pixi.custom.number === this.tempSetScopenumber)
      var len = this.dragTarget.parent.children.length
      var oldData = this.dragTarget
      var data = this.pixiline[findindex].data
      var color = '#ffffff'
      if (data.line_alarm_status === 1 && data.line_temperature_max >= data.line_threshold) {
        color = '#B82E40'
      }
      for (var i = 0; i < len; i++) {
        var pixi = oldData.parent.children[i]
        if (point === pixi.name) {
          pixi.x = position.x;
          pixi.y = position.y;
        }
        if (point === "line_B") {
          if (pixi.name === "circle") {
            pixi.x = position.x - 15
            pixi.y = position.y - 15
          } else if (pixi.name === "text") {
            pixi.x = position.x - 19.5
            pixi.y = position.y - 24.5
          }
        }
        if (pixi.name === "line1") {
          pixi.clear()
          pixi.lineStyle(3, 0x000000); // 設定邊框為黑色，寬度為 2 像素
          if (point === "line_A") {
            pixi.moveTo(position.x, position.y); // 移動到起始點
            pixi.lineTo(data.line_position_point_B.X * this.pixiwidth, data.line_position_point_B.Y * this.pixiheight); // 繪製直線
          } else {
            pixi.moveTo(data.line_position_point_A.X * this.pixiwidth, data.line_position_point_A.Y * this.pixiheight); // 移動到起始
            pixi.lineTo(position.x, position.y); // 繪製直線
          }
        } else if (pixi.name === "line2") {
          pixi.clear()
          pixi.lineStyle(1, color); // 設定邊框為白色，寬度為 2 像素
          if (point === "line_A") {
            pixi.moveTo(position.x, position.y); // 移動到起始點
            pixi.lineTo(data.line_position_point_B.X * this.pixiwidth, data.line_position_point_B.Y * this.pixiheight); // 繪製直線
          } else {
            pixi.moveTo(data.line_position_point_A.X * this.pixiwidth, data.line_position_point_A.Y * this.pixiheight); // 移動到起始
            pixi.lineTo(position.x, position.y); // 繪製直線
          }
        }
        pixi = null
      }
      findindex = null
      len = null
      oldData = null
      data = null
      color = null
    },
    pixiaddScope(data, name, change) {
      // console.log(data, name);
      var alarm = data.scope_alarm_status === 1 && data.scope_temperature_max >= data.scope_threshold
      var color = '#ffffff'
      if (data.approval === 1) {
        color = '#FF8D41'
      } else if (data.approval === 0 && alarm) {
        color = '#B82E40'
      }
      var pixiwidth = this.pixiwidth
      var pixiheight = this.pixiheight
      if (change !== undefined) {
        pixiwidth = 1
        pixiheight = 1
      }
      var PIXI = window.PIXI
      var group = new PIXI.Container();
      group.name = name
      group.custom = {
        number: data.scope_number,
        data
      }
      this.appPixi.stage.addChild(group);
      group.interactive = true;
      if (data.approval === 0) {
        group.cursor = 'move';
      } else {
        group.cursor = 'pointer';
      }
      group.x = data.scope_position_point_LT.X * pixiwidth
      group.y = data.scope_position_point_LT.Y * pixiheight
      var rect = new PIXI.Graphics();
      rect.name = 'rect1'
      rect.beginFill(0x000000, 0);
      rect.lineStyle(2, "rgb(0,0,0)", 1);
      var width = data.scope_position_point_BR.X * pixiwidth - data.scope_position_point_LT.X * pixiwidth
      var height = data.scope_position_point_BR.Y * pixiheight - data.scope_position_point_LT.Y * pixiheight
      rect.drawRect(0, 0, width, height);
      rect.endFill();
      group.addChild(rect);
      var rect2 = new PIXI.Graphics();
      rect2.name = 'rect2'
      if (data.approval === 0 && alarm) {
        rect2.beginFill('#B82E40', 0.7);
      } else {
        rect2.beginFill(0x000000, 0);
      }

      rect2.lineStyle(1, color, 1);
      rect2.drawRect(0, 0, width, height);
      rect2.endFill();
      group.addChild(rect2);
      var num = new PIXI.Graphics();
      num.name = 'num'
      if (!alarm) {
        num.lineStyle(1, "rgb(5,26,31)", 1);
      }
      num.beginFill(color, 1);
      num.drawCircle(-13, -13, 10);
      num.endFill();
      group.addChild(num);
      var style = new PIXI.TextStyle({
        fontSize: 16,
      });
      var basicText = new PIXI.Text(data.scope_number, style);
      basicText.name = 'basicText'
      if (parseInt(data.scope_number) < 10) {
        basicText.x = -17.5;
        basicText.y = -22.5;
      } else {
        basicText.x = -21.5;
        basicText.y = -22.5;
      }
      group.addChild(basicText);
      var mock1rect2 = new PIXI.Graphics();
      mock1rect2.name = 'mock1rect2'
      mock1rect2.beginFill(0x000000, 1);
      mock1rect2.lineStyle(2, "rgb(255,255,255)", 1);
      mock1rect2.drawRect(0, 0, width, height);
      mock1rect2.endFill();
      mock1rect2.alpha = 0
      group.addChild(mock1rect2);
      if (data.approval === 0) {
        group.on('pointerdown', (e) => {
          this.onDragStart(e, 'scope')
        });
        group.on('pointerover', (e) => {
          // console.log("in side scope");
          this.mouseSideScopeStatus = true
        });
        group.on('pointerout', (e) => {
          // console.log("out side scope");
          this.mouseSideScopeStatus = false
        });
      } else {
        group.on('pointerdown', (e) => {
          this.AiAddRoiMassage = true
          this.actionROIClickType = "scope"
          this.focusRoiTempData = data
        });
      }
      alarm = null
      color = null
      pixiwidth = null
      pixiheight = null
      PIXI = null
      rect = null
      width = null
      height = null
      rect2 = null
      num = null
      style = null
      basicText = null
      mock1rect2 = null
      return group
    },
    pixiUpdateScope(pixiObject, data) {
      // console.log(pixiObject, data);
      var alarm = pixiObject.custom.data.scope_alarm_status === 1 && pixiObject.custom.data.scope_temperature_max >= pixiObject.custom.data.scope_threshold
      var color = '#ffffff'
      if (alarm) {
        color = '#B82E40'
      }
      var len = pixiObject.children.length
      var group = pixiObject.children
      pixiObject.x = data.x
      pixiObject.y = data.y
      for (var i = 0; i < len; i++) {
        // console.log(group[i].name);
        if (group[i].name === 'rect1') {
          group[i].clear()
          group[i].beginFill(0x000000, 0);
          group[i].lineStyle(2, "rgb(0,0,0)", 1);
          group[i].drawRect(0, 0, data.width, data.height);
          group[i].endFill();
        } else if (group[i].name === 'rect2') {
          group[i].clear()
          if (pixiObject.custom.data.approval === 0 && alarm) {
            group[i].beginFill('#B82E40', 0.7);
          } else {
            group[i].beginFill(0x000000, 0);
          }
          group[i].lineStyle(1, color, 1);
          group[i].drawRect(0, 0, data.width, data.height);
          group[i].endFill();
        } else if (group[i].name === 'mock1rect2') {
          group[i].clear()
          group[i].name = 'mock1rect2'
          group[i].beginFill(0x000000, 1);
          group[i].lineStyle(1, "rgb(255,255,255)", 1);
          group[i].drawRect(0, 0, data.width, data.height);
          group[i].endFill();
          group[i].alpha = 0
        }
      }
      len = null
      group = null
      alarm = null
      color = null
    },
    actionROIClick(status) {
      var InputScopeData = {}
      if (this.actionROIClickType === "scope") {
        InputScopeData = {
          // cam_id: this.camid,
          type: 'roiChangeScope',
          cam_id: this.$route.query.cam,
          session: Math.random().toString(36).substr(2),
          scope_number: this.focusRoiTempData.scope_number,
          scope_status: '0',
          scope_position_LT: {
            Y: this.focusRoiTempData.scope_position_point_LT.Y,
            X: this.focusRoiTempData.scope_position_point_LT.X,
          },
          scope_position_BR: {
            Y: this.focusRoiTempData.scope_position_point_BR.Y,
            X: this.focusRoiTempData.scope_position_point_BR.X
          },
          scope_alarm_status: this.focusRoiTempData.scope_alarm_status,
          scope_threshold: this.focusRoiTempData.scope_threshold,
        }
      } else if (this.actionROIClickType === "blob") {
        InputScopeData = {
          type: 'roiChangeBlob',
          cam_id: this.$route.query.cam,
          session: Math.random().toString(36).substr(2),
          blob_number: parseInt(this.focusRoiTempData.blob_number),
          blob_status: "0",
          points: this.focusRoiTempData.points,
          // tension: 0.5,
          blob_alarm_status: this.focusRoiTempData.blob_alarm_status,
          blob_threshold: this.focusRoiTempData.blob_threshold,
          group_name: this.focusRoiTempData.group_name,
          group_id: "01"
        }
      }
      // console.log(InputScopeData,this.focusRoiTempData)
      if (status === 0) {
        // 返回
        this.AiAddRoiMassage = false
      } else if (status === 1) {
        // 刪除
        if (this.actionROIClickType === "scope") {
          InputScopeData.scope_status = '1'
        } else if (this.actionROIClickType === "blob") {
          InputScopeData.blob_status = '1'
        }
        this.ws4.send(JSON.stringify(InputScopeData))
        this.AiAddRoiMassage = false
      } else if (status === 2) {
        // 保留
        this.ws4.send(JSON.stringify(InputScopeData))
        this.AiAddRoiMassage = false
      }
      InputScopeData = null
    },
    setPixiFPS() {
      this.appPixi.ticker.maxFPS = parseInt(this.pixijsfps)
      this.setFPS = this.appPixi.ticker.maxFPS
    },
    // other function
    animation() {
      var count = 0;
      // this.appPixi.ticker.maxFPS = 75;
      if (this.setPixiFPSInt !== null) {
        clearInterval(this.setPixiFPSInt)
        this.setPixiFPSInt = null
      }
      this.setPixiFPSInt = setInterval(() => {
        // console.log(this.appPixi.ticker.FPS);
        this.roifpstmp = this.appPixi.ticker.FPS.toFixed(1)
      }, 100)
      // setTimeout(() => {
      //   var setFps = 30
      //   console.log('FPS:調整為:' + setFps);
      //   this.appPixi.ticker.maxFPS = setFps
      // }, 5000)
      this.appPixi.ticker.add((frame) => {
        var lockedRoiTable = []
        if (this.$store.state.myData.params.lockedRoiTable !== undefined) {
          lockedRoiTable = this.$store.state.myData.params.lockedRoiTable
          // lockedRoiTable = this.lockedRoiTable
        }
        // console.log(this.appPixi.ticker.FPS);
        var roiDataName = { bgimg: [], super1Resolution: [], reference: [], groupSelect: [], blob: [], scope: [], line: [], spot: [], mask: [], other: [], superResolutionBtn: [], removePoint: [], Revision: [] }
        var sortRoi = ['bgimg', 'reference', 'groupSelect', 'blob', 'scope', 'line', 'spot', 'super1Resolution', 'mask', 'other', 'superResolutionBtn', 'removePoint', 'Revision'] // 由左至右 左邊最下層
        var childrenlen = this.appPixi.stage.children.length
        var childrendata = this.appPixi.stage.children
        var sortRoilength = sortRoi.length
        for (var i1 = 0; i1 < childrenlen; i1++) {
          for (var z1 = 0; z1 < sortRoilength; z1++) {
            var str = childrendata[i1].name
            if (str.search(sortRoi[z1]) !== -1) {
              roiDataName[sortRoi[z1]].push(childrendata[i1])
            }
            str = null
          }
        }
        var totlen = 0
        for (var roisum = 0; roisum < sortRoilength; roisum++) {
          var len1 = roiDataName[sortRoi[roisum]].length
          for (var z2 = 0; z2 < len1; z2++) {
            this.appPixi.stage.setChildIndex(roiDataName[sortRoi[roisum]][z2], totlen)
            totlen++
          }
          len1 = null
        }
        var te = Math.abs(Math.sin(((count * 20) * 2 * Math.PI) / 3000) / 4) + 0.2
        // scope 閃爍
        var scopelen = this.pixiscope.length
        // console.log(scopelen, this.pixiscope);
        for (var s = 0; s < scopelen; s++) {
          var scopedata = this.pixiscope[s]
          var di = scopedata.pixi.children.find((item) => item.name === 'rect2')
          var di1 = scopedata.pixi.children.find((item) => item.name === 'rect1')
          if (scopedata.data.scope_alarm_status === 1 && scopedata.data.scope_threshold <= scopedata.data.scope_temperature_max) {
            // scopedata.pixi.alpha = te
            di.alpha = te
            di1.alpha = te
          } else {
            di.alpha = 1
            di1.alpha = 1
          }
          scopedata = null
          di = null
          di1 = null
        }
        scopelen = null
        // scope 閃爍 end
        // blob 閃爍
        var blob12len = this.pixiJsRoiBlobData.length
        for (var i = 0; i < blob12len; i++) {
          var roidata = this.pixiJsRoiBlobData[i].info
          var pixilen = this.pixiJsRoiBlobData[i].pixi.length
          if (roidata.blob_alarm_status === 1 && roidata.blob_threshold <= roidata.blob_temperature_max) {
            for (var u = 0; u < pixilen; u++) {
              if (this.waitingToJoin || this.pixiJsRoiBlobData[i].pixi[u].custom.hover === 1) {
                this.pixiJsRoiBlobData[i].pixi[u].alpha = 1;
                this.pixiJsRoiBlobData[i].pixibg[u].alpha = 1;
              } else {
                this.pixiJsRoiBlobData[i].pixi[u].alpha = te;
                this.pixiJsRoiBlobData[i].pixibg[u].alpha = te;
              }
            }
          } else {
            // 鎖定ROI邏輯
            // console.log(lockedRoiTable);
            var find001 = lockedRoiTable.find((item) => (item.blob_number).toString() === (roidata.blob_number).toString())
            for (var z = 0; z < pixilen; z++) {
              if (lockedRoiTable.length > 0) {
                if (find001 !== undefined) {
                  this.pixiJsRoiBlobData[i].pixi[z].alpha = 1;
                  this.pixiJsRoiBlobData[i].marker[z].alpha = 1
                  this.pixiJsRoiBlobData[i].pixibg[z].alpha = 1;
                } else {
                  this.pixiJsRoiBlobData[i].pixi[z].alpha = 0.3;
                  this.pixiJsRoiBlobData[i].marker[z].alpha = 0.3
                  this.pixiJsRoiBlobData[i].pixibg[z].alpha = 0.3;
                }
              } else {
                this.pixiJsRoiBlobData[i].pixi[z].alpha = 1;
                this.pixiJsRoiBlobData[i].pixibg[z].alpha = 1;
                this.pixiJsRoiBlobData[i].marker[z].alpha = 1
              }
            }
            find001 = null
          }
          roidata = null
          pixilen = null
        }
        // blob 閃爍 end
        count += 0.1 + frame;
        lockedRoiTable = null
        blob12len = null
        te = null
        roiDataName = null
        sortRoi = null
        childrenlen = null
        sortRoilength = null
        totlen = null
        childrendata = null
        if (count > 9999999) {
          count = 0
        }
        // routeQuery = null
        // console.log(this.pixiJsRoiBlobData[7].pixi[0].custom.hover);
      });
    },
    // 偵測整個畫布範圍-滑鼠按下
    onCanvasDown(event) {
      // console.log("點擊畫布", event.currentTarget);
      // console.log(event.global);
      var PIXI = window.PIXI
      var app = this.appPixi
      if (!this.mouseSideScopeStatus) {
        // 如果滑鼠不再Scope範圍，會把調整物件刪掉
        if (this.revisionObject.length > 0) {
          for (var z = 0; z < this.revisionObject.length; z++) {
            this.revisionObject[z].destroy()
          }
          this.revisionObject = []
          this.intiRevisionScopeData = null
        }
      }
      if (this.blobStatusAdd && !this.moveRemovePoint) {
        // console.log("start draw blob");
        // this.blobStatusAdd = false
        // document.body.style.cursor = 'auto'
        if (this.removePoint === null) {
          var graphics = new PIXI.Graphics();
          graphics.name = 'removePoint'
          graphics.interactive = true;
          graphics.cursor = 'pointer';
          graphics.lineStyle(2, "#fff", 1);
          graphics.beginFill("#000");
          graphics.drawRect(event.global.x - 10, event.global.y - 10, 20, 20);
          graphics.endFill();
          app.stage.addChild(graphics);
          this.removePoint = graphics
          this.AddTempPoints.push(event.global.x, event.global.y)
          graphics.on('pointermove', (e) => {
            // console.log("move remove point");
            this.moveRemovePoint = true
          })
          graphics.on('pointerout', (e) => {
            // console.log("move out point");
            this.moveRemovePoint = false
          })
          graphics.on('pointerdown', (e) => {
            // console.log("move out point");
            this.moveRemovePoint = true
            this.blobStatusAdd = false
            this.openROIcheckWindow('add')
            document.body.style.cursor = 'auto'
          })
          graphics = null
          // console.log("初始", this.AddTempPoints);
        } else {
          this.AddTempPoints.push(event.global.x, event.global.y)
          // console.log("新增點", this.AddTempPoints);
        }
      }
      app = null
      PIXI = null
    },

    // 偵測單一物件範圍-滑鼠按下
    onDragStart(e, objcetName) {
      // 偵測單一物件範圍-滑鼠按下移動
      const onDragMove = (event, objcetName) => {
        // console.log('test');
        var x1 = 0
        var y1 = 0
        var nl = { x: 0, y: 0 }
        if (this.dragTarget && objcetName === 'spot') {
          x1 = this.mousesaveLocation.x - event.global.x
          y1 = this.mousesaveLocation.y - event.global.y
          nl = { x: this.dragTargettemp.x - x1, y: this.dragTargettemp.y - y1 }
          this.dragTarget.x = nl.x
          this.dragTarget.y = nl.y
          this.newSpotLocation = nl
          // this.pixiUpdate(this.dragTarget, nl)
          // console.log(this.dragTarget.custom.number);
          // this.dragTarget.parent.toLocal(nl, null, this.dragTarget.position);
        } else if (this.dragTarget && objcetName === 'scope') {
          var findindex1 = this.pixiscope.findIndex((item) => item.pixi.custom.number === this.dragTarget.custom.number)
          var newPosition = {
            x: 0,
            y: 0,
            width: 0,
            height: 0
          }
          var x = this.pixiscope[findindex1].data.scope_position_point_LT.X * this.pixiwidth
          var y = this.pixiscope[findindex1].data.scope_position_point_LT.Y * this.pixiheight
          var width = this.pixiscope[findindex1].data.scope_position_point_BR.X * this.pixiwidth - this.pixiscope[findindex1].data.scope_position_point_LT.X * this.pixiwidth
          var height = this.pixiscope[findindex1].data.scope_position_point_BR.Y * this.pixiheight - this.pixiscope[findindex1].data.scope_position_point_LT.Y * this.pixiheight
          x1 = this.mousesaveLocation.x - event.global.x
          y1 = this.mousesaveLocation.y - event.global.y
          newPosition.x = x - x1
          newPosition.y = y - y1
          newPosition.width = width
          newPosition.height = height
          this.tempScopePosition = newPosition
          this.pixiUpdateScope(this.dragTarget2, newPosition) // 更新scope
          this.ChangeRevisionbject(newPosition) // 更新調整框
          this.intiRevisionScopeData = newPosition
          findindex1 = null
          newPosition = null
          x = null
          y = null
          height = null
          width = null
        } else if (this.dragTarget && objcetName === 'line_A' || this.dragTarget && objcetName === 'line_B') {
          x1 = this.mousesaveLocation.x - event.global.x
          y1 = this.mousesaveLocation.y - event.global.y
          nl = { x: this.dragTargettemp.x - x1, y: this.dragTargettemp.y - y1 }
          this.newLineLocation = nl
          this.pixiUpdateLine(nl, objcetName)
        } else if (this.dragTarget && objcetName === 'superResolutionBtn') {
          x1 = this.mousesaveLocation.x - event.global.x
          y1 = this.mousesaveLocation.y - event.global.y
          nl = { x: this.dragTargettemp.x - x1, y: this.dragTargettemp.y - y1 }
          this.superResolutionEvent(nl);
        }
        x1 = null
        y1 = null
        nl = null
      }
      // console.log("mousedown", e, objcetName);
      if (objcetName !== 'blob') { // blob 比較特殊，所以直接先判斷是不是點擊blob
        if (objcetName === 'scope') {
          var findindex = this.pixiscope.findIndex((item) => item.pixi.custom.number === e.currentTarget.custom.number)
          // console.log(this.pixiscope , e.currentTarget , findindex);
          this.intiRevisionScopeData = null
          this.tempSetScopenumber = findindex
          this.tempScopeData = this.pixiscope[findindex].data
          this.dragTarget2 = e.currentTarget
          this.createRevisionObject(findindex, objcetName)
          findindex = null
        } else if (objcetName === 'spot') {
          this.tempSetScopenumber = e.currentTarget.custom.number
        } else if (objcetName === 'line_A' || objcetName === 'line_B') {
          this.tempSetScopenumber = e.currentTarget.parent.custom.number
        }
        // else {
        e.currentTarget.alpha = 0.5;
        this.dragTarget = e.currentTarget;
        this.dragTarget2 = e.currentTarget
        this.mousesaveLocation = {
          x: e.global.x,
          y: e.global.y
        }
        this.dragTargettemp = {
          x: e.currentTarget.position.x,
          y: e.currentTarget.position.y
        }
        // console.log(this.dragTarget.position);
        this.appPixi.stage.on('pointermove', (e1) => {
          onDragMove(e1, objcetName)
        });
        this.saveonDragStart2 = onDragMove(e, objcetName)
        // }
      } else {
        // 此區域是點擊blob後的行為
        // 準備做blob 編輯方法
        // var router1 = this.$route.query
        // var blobdata = e.currentTarget.custom.data
        // router1.group = blobdata.group_name
        // this.$router.push({
        //   query: {
        //     cam: router1.cam,
        //     main: router1.main,
        //     secondary: router1.secondary,
        //     tab: router1.tab,
        //     group: router1.group
        //   }
        // })
        // console.log("click blob", blobdata, router1);
      }
    },
    // 偵測單一物件範圍-滑鼠釋放
    onDragEnd() {
      // console.log("mouseup");
      if (this.dragTarget) {
        if (this.saveonDragStart2 !== null) {
          this.appPixi.stage.off('pointermove', this.saveonDragStart2);
          this.saveonDragStart2 = null
        }
        if (this.dragTarget.name === 'scope') {
          // console.log('送出');                 
          this.pushScope()
        } else if (this.dragTarget.name === 'spot') {
          // console.log('push spot', this.tempSetScopenumber);
          this.pushSpot()
        } else if (this.dragTarget.name === 'line_A') {
          this.pushline('lineA')
        } else if (this.dragTarget.name === 'line_B') {
          this.pushline('lineB')
        }
        this.dragTarget.alpha = 1;
        this.dragTarget = null;
      }
    },
    createRevisionObject(e, objcetName) {
      // console.log('創建調整點');
      var PIXI = window.PIXI
      if (objcetName === 'scope') {
        // 先清除暫存
        if (this.revisionObject.length > 0) {
          for (var z = 0; z < this.revisionObject.length; z++) {
            this.revisionObject[z].destroy()
          }
          this.revisionObject = []
        }
        var object = this.pixiscope[e].data
        var x = object.scope_position_point_LT.X * this.pixiwidth
        var y = object.scope_position_point_LT.Y * this.pixiheight
        var width = object.scope_position_point_BR.X * this.pixiwidth - object.scope_position_point_LT.X * this.pixiwidth
        var height = object.scope_position_point_BR.Y * this.pixiheight - object.scope_position_point_LT.Y * this.pixiheight
        // console.log('scope', x, y, width, height);
        var anchors = ['top-left', 'top', 'top-right', 'left', 'right', 'bottom-left', 'bottom', 'bottom-right']
        var anchorslen = anchors.length
        for (var i = 0; i < anchorslen; i++) {
          var tempX = 0
          var tempY = 0
          var rect = new PIXI.Graphics();
          rect.name = 'Revision'
          rect.custom = anchors[i]
          rect.interactive = true;
          if (anchors[i] === 'top-left') {
            rect.cursor = 'nw-resize';
            tempX = x
            tempY = y
            rect.on('pointerdown', (e1) => {
              this.revisionTransformerStart(e1, 'top-left', e)
            });
          } else if (anchors[i] === 'top') {
            rect.cursor = 'n-resize';
            tempX = x + (width / 2)
            tempY = y
            rect.on('pointerdown', (e1) => {
              this.revisionTransformerStart(e1, 'top', e)
            });
          } else if (anchors[i] === 'top-right') {
            rect.cursor = 'ne-resize';
            tempX = width + x
            tempY = y
            rect.on('pointerdown', (e1) => {
              this.revisionTransformerStart(e1, 'top-right', e)
            });
          } else if (anchors[i] === 'left') {
            rect.cursor = 'w-resize';
            tempX = x
            tempY = y + (height / 2)
            rect.on('pointerdown', (e1) => {
              this.revisionTransformerStart(e1, 'left', e)
            });
          } else if (anchors[i] === 'right') {
            rect.cursor = 'w-resize';
            tempX = x + width
            tempY = y + (height / 2)
            rect.on('pointerdown', (e1) => {
              this.revisionTransformerStart(e1, 'right', e)
            });
          } else if (anchors[i] === 'bottom-left') {
            rect.cursor = 'ne-resize';
            tempX = x
            tempY = y + height
            rect.on('pointerdown', (e1) => {
              this.revisionTransformerStart(e1, 'bottom-left', e)
            });
          } else if (anchors[i] === 'bottom') {
            rect.cursor = 'n-resize';
            tempX = x + (width / 2)
            tempY = y + height
            rect.on('pointerdown', (e1) => {
              this.revisionTransformerStart(e1, 'bottom', e)
            });
          } else if (anchors[i] === 'bottom-right') {
            rect.cursor = 'nw-resize';
            tempX = width + x
            tempY = height + y
            rect.on('pointerdown', (e1) => {
              this.revisionTransformerStart(e1, 'bottom-right', e)
            });
          }
          // if (anchors[i] === 'all') {
          //   rect.x = tempX
          //   rect.y = tempY
          //   rect.beginFill("rgb(255,255,255)", 0.01);
          //   rect.drawRect(0, 0, width, height);
          // } else {
          rect.x = tempX - 7
          rect.y = tempY - 7
          rect.beginFill("rgb(255,255,255)", 1);
          rect.lineStyle(2, "#72C7F7", 1);
          rect.drawRect(0, 0, 15, 15);
          // }
          rect.endFill();
          this.appPixi.stage.addChild(rect);
          this.revisionObject.push(rect)
          rect.on('pointerover', (e) => {
            // console.log("in side scope");
            this.mouseSideScopeStatus = true
          });
          rect.on('pointerout', (e) => {
            // console.log("out side scope");
            this.mouseSideScopeStatus = false
          });
          tempX = null
          tempY = null
          rect = null
        }
        object = null
        x = null
        y = null
        width = null
        height = null
        anchors = null
        anchorslen = null
      }
      PIXI = null
    },
    ChangeRevisionbject(position) {
      var anchors = ['top-left', 'top', 'top-right', 'left', 'right', 'bottom-left', 'bottom', 'bottom-right']
      var anchorslen = anchors.length
      for (var i = 0; i < anchorslen; i++) {
        this.revisionObject[i].clear()
        if (this.revisionObject[i].custom === 'top-left') {
          this.revisionObject[i].x = position.x - 7
          this.revisionObject[i].y = position.y - 7
        } else if (this.revisionObject[i].custom === 'top') {
          this.revisionObject[i].x = position.x + (position.width / 2) - 7
          this.revisionObject[i].y = position.y - 7
        } else if (this.revisionObject[i].custom === 'top-right') {
          this.revisionObject[i].x = position.width + position.x - 7
          this.revisionObject[i].y = position.y - 7
        } else if (this.revisionObject[i].custom === 'left') {
          this.revisionObject[i].x = position.x - 7
          this.revisionObject[i].y = position.y + (position.height / 2) - 7
        } else if (this.revisionObject[i].custom === 'right') {
          this.revisionObject[i].x = position.x + position.width - 7
          this.revisionObject[i].y = position.y + (position.height / 2) - 7
        } else if (this.revisionObject[i].custom === 'bottom-left') {
          this.revisionObject[i].x = position.x - 7
          this.revisionObject[i].y = position.y + position.height - 7
        } else if (this.revisionObject[i].custom === 'bottom') {
          this.revisionObject[i].x = position.x + (position.width / 2) - 7
          this.revisionObject[i].y = position.y + position.height - 7
        } else if (this.revisionObject[i].custom === 'bottom-right') {
          this.revisionObject[i].x = position.width + position.x - 7
          this.revisionObject[i].y = position.height + position.y - 7
        }
        this.revisionObject[i].beginFill("rgb(255,255,255)", 1);
        this.revisionObject[i].lineStyle(2, "#72C7F7", 1);
        this.revisionObject[i].drawRect(0, 0, 15, 15);
        this.revisionObject[i].endFill();
      }
      anchors = null
      anchorslen = null
    },
    revisionTransformerStart(e, type, num) {
      // console.log('點擊調整點');
      // console.log(number);
      // console.log(e.currentTarget.position);
      // var tempcurr = e.currentTarget.position
      var ObjectX = 0
      var ObjectY = 0
      var width = 0
      var height = 0
      if (this.intiRevisionScopeData === null) {
        var newObject = this.pixiscope[num].data
        ObjectX = newObject.scope_position_point_LT.X * this.pixiwidth
        ObjectY = newObject.scope_position_point_LT.Y * this.pixiheight
        width = newObject.scope_position_point_BR.X * this.pixiwidth - ObjectX
        height = newObject.scope_position_point_BR.Y * this.pixiheight - ObjectY
      } else {
        ObjectX = this.intiRevisionScopeData.x
        ObjectY = this.intiRevisionScopeData.y
        width = this.intiRevisionScopeData.width
        height = this.intiRevisionScopeData.height
      }
      const revisionTransformerMove = (event) => {
        // this.dragObjectStatus = false
        var x1 = this.mousesaveLocation.x - event.global.x
        var y1 = this.mousesaveLocation.y - event.global.y
        // var nl = { x: this.dragTargettemp.x - x1, y: this.dragTargettemp.y - y1 }
        // this.saveFouceTempRevision.x = nl.x
        // console.log('move2', x1, y1, nl);
        // console.log(ObjectX, ObjectY, width, height);
        var newPosition = {
          x: 0,
          y: 0,
          width: 0,
          height: 0
        }
        var positions = {
          'top-left': { x: ObjectX - x1, y: ObjectY - y1, width: width - -x1, height: height - -y1 },
          'top': { x: ObjectX, y: ObjectY - y1, width, height: height - -y1 },
          'top-right': { x: ObjectX, y: ObjectY - y1, width: width - x1, height: height - -y1 },
          'left': { x: ObjectX - x1, y: ObjectY, width: width - -x1, height },
          'right': { x: ObjectX, y: ObjectY, width: width - x1, height },
          'bottom-left': { x: ObjectX - x1, y: ObjectY, width: width - -x1, height: height - y1 },
          'bottom': { x: ObjectX, y: ObjectY, width, height: height - y1 },
          'bottom-right': { x: ObjectX, y: ObjectY, width: width - x1, height: height - y1 },
          'all': { x: ObjectX - x1, y: ObjectY - y1, width, height }
        };
        newPosition = positions[type];
        // 限制調整範圍
        var limitX = 50;
        var limitY = 50;

        if (type !== 'all') {
          newPosition.width = newPosition.width < limitX ? limitX : newPosition.width;
          newPosition.x = newPosition.x > width + ObjectX - limitX ? width + ObjectX - limitX : newPosition.x;
          newPosition.height = newPosition.height < limitY ? limitY : newPosition.height;
          newPosition.y = newPosition.y > height + ObjectY - limitY ? height + ObjectY - limitY : newPosition.y;
        }
        this.tempScopePosition = newPosition
        // console.log(newPosition);
        this.pixiUpdateScope(this.dragTarget2, newPosition) // 更新scope
        this.ChangeRevisionbject(newPosition) // 更新調整框
        this.intiRevisionScopeData = newPosition
        newPosition = null
        x1 = null
        y1 = null
        positions = null
        limitX = null
        limitY = null
        // this.pushScope()
      }
      this.saveFouceTempRevision = e.currentTarget
      // e.currentTarget.alpha = 0.5;
      this.mousesaveLocation = {
        x: e.global.x,
        y: e.global.y
      }
      this.dragTargettemp = {
        x: e.currentTarget.position.x,
        y: e.currentTarget.position.y
      }
      this.appPixi.stage.on('pointermove', (e1) => {
        revisionTransformerMove(e1)
      });
      this.saveonDragStart = revisionTransformerMove(e) // 讓使用的函數暫存，後續刪除監聽
    },
    revisionTransformerEnd(e1) {
      if (this.saveonDragStart !== null) {
        this.pushScope()
        this.appPixi.stage.off('pointermove', this.saveonDragStart);
        this.saveonDragStart = null
        // console.log('remove pointerOut');
      }
    },
    // ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
    // 總呼叫程序
    Refresh() {
      this.opneRoiWS1()
      this.twoWayWs()
    },
    opneRoiWS1() {
      if (this.wsListener2.message !== null) {
        this.ws3.removeEventListener("message", this.wsListener2.message)
        this.wsListener2.message = null
      }
      var reloaddiv = document.querySelectorAll('.reload1')[0]
      if (this.$myPlugin.webSocketconnect02().readyState === 1) {
        this.ws3 = this.$myPlugin.webSocketconnect02()
        if (this.wsListener2.close !== null) {
          this.ws3.removeEventListener("close", this.wsListener2.close)
          this.wsListener2.close = null
        }
        reloaddiv.style.opacity = 0
        reloaddiv.style.pointerEvents = 'none'
        console.log('web socket3 is open')
        var colseEvent = () => {
          setTimeout(() => {
            this.connectTOWayWS()
          }, 1000)
        }
        this.ws3.addEventListener("close", colseEvent)
        this.wsListener2.close = colseEvent
        var messageEvent = (event) => {
          // if (this.tab2 === 'tab-2') {
          var params = JSON.parse(event.data)
          params = params[this.$route.query.cam]
          // console.log("xxx",params, params.cameraInfo.Low_temp_filter.level);
          if (!this.allsilderSt) {
            this.cameraParamsLowTempFilter = params.cameraInfo.Low_temp_filter.level * 10
            this.displayObject8 = params.cameraInfo.Low_temp_filter.status === "1"
            this.ClipLimit = params.cameraInfo.Clip_limit.level * 10
            this.displayObject9 = params.cameraInfo.Clip_limit.status === "1"
            if (params.cameraInfo.AutoRoi_Status !== undefined) {
              this.displayObject3 = params.cameraInfo.AutoRoi_Status.status === "1"
            }
          }
          if (!this.focusColorMax) {
            this.colorbar.max = params.cameraInfo.colorBar.max.temperature.toFixed(1)
          }
          if (!this.focusColorMin) {
            this.colorbar.min = params.cameraInfo.colorBar.min.temperature.toFixed(1)
          }
          if (params.cameraInfo.colorBar.max.mode === "auto") {
            this.ColorMaxAuto = true
          } else {
            this.ColorMaxAuto = false
          }
          if (params.cameraInfo.colorBar.min.mode === "auto") {
            this.ColorMinAuto = true
          } else {
            this.ColorMinAuto = false
          }
          this.temp1scope = JSON.stringify(params.scope)
          this.saveBlobTempString = JSON.stringify(params.blob)
          this.allRoiData = params
          // if (this.dragObjectStatus && this.buffer) {
          if (this.dragObjectStatus) {
            // console.log(this.$route.query.cam);
            // 20230525 Roi data to pixijs
            // console.log(params.reference);
            this.runReference(params.reference)
            this.runSpot(params.spot)
            this.runLine(params.line)
            this.oldlinetemp = params.line
            if (this.revisionObject.length === 0) {
              this.runScope(params.scope)
            }
            // (backup) 20230714 spline 轉移至後端運算
            var postdata = params.blob
            // console.log("get blob", postdata);
            this.pixiWebWorker.postMessage({
              type: 'splineCurrent',
              data: [postdata, this.pixiheight, this.pixiwidth]
            })
            postdata = null
            // 20230525 Roi data to pixijs
            // (backup) 20230714 spline 轉移至後端運算 end
            params = { data: params }
            // this.buffer = false
            // this.handleRoi(params)
          }
          params = null
          // }
        }
        this.ws3.addEventListener("message", messageEvent)
        this.wsListener2.message = messageEvent
      } else if (this.$myPlugin.webSocketconnect02().readyState !== 1 && this.wsblock) {
        setTimeout(() => {
          // clearTimeout(this.restartDisplay)
          reloaddiv.style.opacity = 0.6
          reloaddiv.style.pointerEvents = 'auto'
          setTimeout(() => {
            console.log('ROI 重新連接中...')
            this.opneRoiWS1()
          }, 3000)
          console.log("組件判斷核心socket無法連線，將稍後重新嘗試連線...");
        }, 1000)
      }

      // this.ws3.onopen = () => {
      //   reloaddiv.style.opacity = 0
      //   reloaddiv.style.pointerEvents = 'none'
      //   console.log('web socket3 is open')
      // }
      // this.ws3.onmessage = (event) => {}
      // this.ws3.onclose = () => {
      //   if (this.wsblock) {
      //     console.log('ROI 連接斷開...')
      //     reloaddiv.style.opacity = 0.6
      //     reloaddiv.style.pointerEvents = 'auto'
      //     setTimeout(() => {
      //       console.log('ROI 重新連接中...')
      //       this.opneRoiWS1()
      //     }, 3000)
      //   }
      // }
    },
    twoWayWs() {
      if (this.wsListener3.message !== null) {
        this.ws4.removeEventListener("message", this.wsListener3.message)
        this.wsListener3.message = null
      }
      var Date1 = this.alarmDate
      if (this.$myPlugin.webSocketconnect03().readyState === 1) {
        this.ws4 = this.$myPlugin.webSocketconnect03()
        if (this.wsListener3.close !== null) {
          this.ws4.removeEventListener("close", this.wsListener3.close)
          this.wsListener3.close = null
        }
        var colseEvent = () => {
          setTimeout(() => {
            this.twoWayWs()
          }, 1000)
        }
        this.ws4.addEventListener("close", colseEvent)
        this.wsListener3.close = colseEvent
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
            "status": st,
            "highTemperatureArea": this.displayObject6 ? 1 : 0,
            "highTemperatureAreaRange": this.temperatureRanger
          }
        }))
        var messageEvent = (e) => {
          var data = JSON.parse(e.data)
          // console.log(data);
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
            lastday = null
            today = null
            week = null
            month = null
            alarmlist = null
          } else if (data.type === 'cameraParams') {
            // console.log('camera update');
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
            info = null
          }
          data = null

        }
        this.ws4.addEventListener("message", messageEvent)
        this.wsListener3.message = messageEvent
      } else if (this.$myPlugin.webSocketconnect03().readyState !== 1 && this.wsblock) {
        console.log('雙向連接斷開...')
        setTimeout(() => {
          console.log('雙向重新連接中...')
          this.twoWayWs()
        }, 3000)
      }
      // this.ws4.onopen = () => {

      // this.queryCameraInfo()
      // }
      // this.ws4.onclose = () => {
      //   if (this.wsblock) {

      //   }
      // }
      // this.ws4.onmessage = (e) => {}
      // 秒 轉 分、時、天，並且隱藏時間未到的單位
      function durationCrr(start, stop) {
        if (stop !== null) {
          var nowtime1 = new Date(start)
          var startone1 = new Date(stop)
          var time1 = (startone1.getTime() - nowtime1.getTime()) * 0.001
          var duration = getDuration(time1)
          nowtime1 = null
          startone1 = null
          time1 = null
          return duration
        } else {
          var nowtime = new Date()
          var startone = new Date(start)
          var time = (nowtime.getTime() - startone.getTime()) * 0.001
          nowtime = null
          startone = null
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
        days = null
        hours = null
        minutes = null
        seconds = null
        return duration
      }
    },
    // 高溫區域顯示開關
    highTemperatureArea(data) {
      if (data) {
        this.displayObject6 = true
      } else {
        this.displayObject6 = false
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
          "highTemperatureArea": this.displayObject6 ? 1 : 0,
          "highTemperatureAreaRange": this.temperatureRanger
        }
      }))
      st = null
    },
    // 超解析度開關
    srshwish(data) {
      if (data) {
        this.displayObject5 = true
      } else {
        this.displayObject5 = false
      }
      this.pixiSuperResolution.btn.visible = data;
      this.pixiSuperResolution.line.visible = data;
      this.pixiSuperResolution.streaming.visible = data;
      this.pixiSuperResolution.mask.visible = data;
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
          "highTemperatureArea": this.displayObject6 ? 1 : 0,
          "highTemperatureAreaRange": this.temperatureRanger
        }
      }))
      st = null
    },
    chromatographyModeselect(data) {
      // 切換模式
      if (data === 'Gray') {
        this.thermalimg = '/images/colorbar_greyscale.png'
      } else if (data === 'Rainbow') {
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
          "status": st,
          "highTemperatureArea": this.displayObject6 ? 1 : 0,
          "highTemperatureAreaRange": this.temperatureRanger
        }
      }))
      st = null
    },
    openResolutionStreaming() {
      // 20230704 --- 暫時停用，SuperResolution 轉移至ws1 8701 底下
      const PIXI = window.PIXI
      var secondTextureTemp = []
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
            "status": st,
            "highTemperatureArea": this.displayObject6 ? 1 : 0,
            "highTemperatureAreaRange": this.temperatureRanger
          }
        }))
      }, 5000)
      if (this.wsListener4.message !== null) {
        this.resolutionWs4.removeEventListener("message", this.wsListener4.message)
        this.wsListener4.message = null
      }
      var tempimg = []
      if (this.$myPlugin.webSocketconnect04().readyState === 1) {
        this.resolutionWs4 = this.$myPlugin.webSocketconnect04()
        this.liveStatus = true
        if (this.wsListener4.close !== null) {
          this.resolutionWs4.removeEventListener("close", this.wsListener4.close)
          this.wsListener4.close = null
        }
        var colseEvent = () => {
          setTimeout(() => {
            this.openResolutionStreaming()
          }, 1000)
        }
        this.resolutionWs4.addEventListener("close", colseEvent)
        this.wsListener4.close = colseEvent
        console.log('resolutionWs4 串流連線成功')
        var messageEvent = (event) => {
          // console.log(JSON.parse(event.data));
          try {
            // console.log("resolutionWs4 testing");
            var data = JSON.parse(event.data)
            // console.log(data);
            var blob1 = getBlob(atob(data.base64), 'image/jpg')
            var objectURL1 = URL.createObjectURL(blob1)
            // const canvas12 = document.getElementById(`streamingVIS`)
            const image123 = new window.Image()
            // this.ImagecomparisonKonvaImageConfig.image = objectURL1
            image123.src = objectURL1
            image123.onload = () => {
              // set image only when it is loaded
              // console.log("resolutionWs4 testing" , image123);
              if (secondTextureTemp.length > 0) {
                for (var x = 0; x < secondTextureTemp.length; x++) {
                  secondTextureTemp[x].destroy({
                    texture: true, // 將 texture 移除
                    baseTexture: true // 將 baseTexture 移除
                  });
                }
              }
              var secondTexture = PIXI.Texture.from(image123);
              // secondTexture.width = 100
              // secondTexture.height = 100
              this.pixiSuperResolution.streaming.texture = secondTexture
              secondTextureTemp.push(secondTexture)
              // this.pixiSuperResolution.streaming = streaming;
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
            console.log("error resolution")
          }

        }
        this.resolutionWs4.addEventListener("message", messageEvent)
        this.wsListener4.message = messageEvent
      } else if (this.$myPlugin.webSocketconnect04().readyState !== 1 && this.wsblock) {
        this.liveStatus = false
        console.log('resolutionWs4 串流斷線')
        setTimeout(() => {
          console.log('resolutionWs4 串流重新連接中...')
          this.openResolutionStreaming()
        }, 3000)
      }
      // resolutionWs4
      // this.resolutionWs4 = new WebSocket('ws://localhost:8704')
      // this.resolutionWs4.onopen = () => { }
      // this.resolutionWs4.onclose = () => { }
      // this.resolutionWs4.onmessage = (event) => { }
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
      var secondTextureTemp = []
      var tempimg = []
      var tempimg2 = []
      var tempimg3 = []
      var tmeppixijs = []
      this.wkstreaming = new Worker('/worker/webscoket-streaming.js')
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
            "status": st,
            "highTemperatureArea": this.displayObject6 ? 1 : 0,
            "highTemperatureAreaRange": this.temperatureRanger
          }
        }))
        st = null
      }, 5000)
      var loaders = document.getElementById(`sleleton-loaders-custom`)
      loaders.classList.add('ui-skeleton-loaders-display-none') // 自訂載入會降低配備不好的電腦效能 20230615
      var openwebsocket01 = () => {
        if (this.$myPlugin.webSocketconnect01().readyState === 1) {
          this.ws1 = this.$myPlugin.webSocketconnect01()
          if (this.wsListener1.close !== null) {
            this.ws1.removeEventListener("close", this.wsListener1.close)
            this.wsListener1.close = null
          }
          var colseEvent = () => {
            setTimeout(() => {
              openwebsocket01()
            }, 1000)
          }
          this.ws1.addEventListener("close", colseEvent)
          this.wsListener1.close = colseEvent
          this.wkstreaming.postMessage({ type: 'open', content: '' });
          var messageEvent = (event) => {
            this.wkstreaming.postMessage({ type: 'connection', content: event.data });
          }
          this.ws1.addEventListener("message", messageEvent)
          this.wsListener1.message = messageEvent
        } else if (this.$myPlugin.webSocketconnect01().readyState !== 1 && this.wsblock) {
          setTimeout(() => {
            openwebsocket01()
          }, 1000)
        }
      }
      openwebsocket01()
      // 20230529 add : webworker
      this.wkstreaming.addEventListener('message', (event) => {
        try {
          // console.log('streaming test');
          // eslint-disable-next-line require-await
          var streaming = (e) => {
            // var streaming = async (e) => {
            this.webStatus = '連線成功'
            var data = event.data.params
            var blob1 = data.cam_currentVIS
            var objectURL1 = URL.createObjectURL(blob1)
            var image123 = new window.Image()
            image123.src = objectURL1
            image123.onload = () => {
              // set image only when it is loaded
              this.ImagecomparisonKonvaImageConfig.image = image123
              var tempimglen = tempimg.length
              for (var i = 0; i < tempimglen; i++) {
                URL.revokeObjectURL(tempimg[i])
              }
              tempimglen = null
              tempimg = []
              image123 = null
            }
            // canvas12.src = objectURL1
            tempimg.push(objectURL1)
            objectURL1 = null
            // SR
            var blob2 = data.cam_currentSR
            var objectURL2 = URL.createObjectURL(blob2)
            var image32 = new window.Image()
            image32.src = objectURL2
            image32.onload = () => {
              if (secondTextureTemp.length > 0) {
                for (var x = 0; x < secondTextureTemp.length; x++) {
                  secondTextureTemp[x].destroy({
                    texture: true, // 將 texture 移除
                    baseTexture: true // 將 baseTexture 移除
                  });
                }
              }
              var secondTexture = PIXI.Texture.from(image32);
              // secondTexture.width = 100
              // secondTexture.height = 100
              this.pixiSuperResolution.streaming.texture = secondTexture
              secondTextureTemp.push(secondTexture)
              // set image only when it is loaded
              // this.image1.image = image32
              var tempimglen1 = tempimg2.length
              for (var as2 = 0; as2 < tempimglen1; as2++) {
                URL.revokeObjectURL(tempimg2[as2])
              }
              tempimglen1 = null
              secondTexture = null
              tempimg2 = []
              image32 = null
            }
            tempimg2.push(objectURL2)
            objectURL2 = null
            var blob = null
            if (this.chromatographyMode === 'Gray') {
              this.chromatographyModestatus = 1
              blob = data[this.$route.query.cam]
            } else if (this.chromatographyMode === 'Rainbow') {
              this.chromatographyModestatus = 2
              blob = data.cam_currentIR
            } else if (this.chromatographyMode === 'Iron') {
              this.chromatographyModestatus = 3
              blob = data.cam_currentIRON
            }
            var objectURL = URL.createObjectURL(blob)
            blob = null
            var img = new Image()
            const PIXI = window.PIXI
            img.onload = () => {
              var tempimg3len = tempimg3.length
              for (var asx = 0; asx < tempimg3len; asx++) {
                URL.revokeObjectURL(tempimg3[asx])
              }
              tempimg3len = null
              tempimg3 = []
              var secondTexture = PIXI.Texture.from(img);
              this.bgimg.texture = secondTexture
              var tmeppixijslen = tmeppixijs.length
              for (var i = 0; i < tmeppixijslen; i++) {
                tmeppixijs[i].destroy({
                  texture: true, // 將 texture 移除
                  baseTexture: true // 將 baseTexture 移除
                });
              }
              tmeppixijs.push(secondTexture)
              secondTexture = null
              tmeppixijslen = null
              this.wkstreaming.postMessage({ type: 'open', content: '' });
              img = null
            }
            img.onerror = () => {
              // console.log('img error');
              this.wkstreaming.postMessage({ type: 'open', content: '' });
            }
            img.src = objectURL
            this.overbase64img = img
            tempimg3.push(objectURL)
            data = null
            blob1 = null
            blob2 = null
          }
          streaming()
        } catch (error) {
          console.log(error)
          // wk.postMessage({ type: 'send', session: event.data.session });
        }
      })
    },
    updateSelectDate(event) {
      this.srshwish(false)
      this.displayObject1 = false
      this.displayObject2 = false
      this.displayObject3 = false
      this.displayObject4 = true
      this.displayObject5 = false
      this.displayObject6 = false
      this.displayObject7 = true
      var parameter = this.$route.query
      parameter.cam = event
      // this.$route.query.cam = event
      this.$router.push({ query: parameter }, () => {
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
            "highTemperatureArea": this.displayObject6 ? 1 : 0,
            "highTemperatureAreaRange": this.temperatureRanger
          }
        }))
        // console.log('updata rs');
        st = null
      })
      parameter = null
      // var data = this.pixiblob
      // this.pixiblob = []
      // this.pixiJsRoiBlobData = []
      // this.runBlob(data)
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
          camAll = null
        })
        .catch((err) => console.log(err))
    },
    // 表格event
    tableEvent(data) {
      if (this.echartsData !== data) {
        this.echartsData = data
        document.getElementById('DoNotOperate').style.display = "unset";
      }
    },
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
      var image = new window.Image()
      var image2 = new window.Image()
      var image3 = new window.Image()
      image.src = '/images/Group 2453.png'
      image.onload = () => {
        // set image only when it is loaded
        this.ImagecomparisonKonvaImageConfig.image = image
        image = null
      }

      image2.src = '/images/zoom-in.png'
      image2.onload = () => {
        // set image only when it is loaded
        this.zoomin.image = image2
        image2 = null
      }

      image3.src = '/images/zoom-out.png'
      image3.onload = () => {
        // set image only when it is loaded
        this.zoomout.image = image3
        image3 = null
      }
      this.zoomin.x = canvasWidth * 0.89
      this.zoomout.x = canvasWidth * 0.94
      canvasWidth = null
      canvasHeight = null
    },
    zoomfunction(e, w) {
      var transformerNode = this.$refs.ImagecomparisonKonva.getNode()
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
      transformerNode = null
      PW = null
      PH = null
      NodeX = null
      NodeY = null
      NodeWidth = null
      NodeHeight = null
      displayCenter = null
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
      zoomLvl = null
      parent = null
      pos = null
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
      // console.log("send", params);
      this.ws4.send(
        JSON.stringify(params)
      )
      this.frameSettingChange = true
      params = null
    },
    // 返回主畫面，通知主頁面
    backPage() {
      this.$router.push({ query: { cam: this.$route.query.cam, main: this.$route.query.main, secondary: this.$route.query.secondary, tab: 'tab-1' } }, () => {
        // window.location.reload()
      })
      this.ws4.send(JSON.stringify({
        // main_item: "camera",
        type: "camera",
        sub_item: "superResolutionStatus",
        action: "set",
        session: Math.random().toString(36).substr(2),
        content: {
          "cam_id": this.$route.query.cam,
          "status": 0,
          "highTemperatureArea": 0,
          "highTemperatureAreaRange": this.temperatureRanger
        }
      }))
      // window.location.reload()
      // console.log('清除INT')
      // clearInterval(this.timeOutRefresh)
      // clearInterval(this.alarmlistInterval)
      this.$emit('VideoActive', 'tab-1')
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
            tmp = null
            lastCorr = null
            lastdaystart = null
            lastdaystop = null
            weekCorr = null
            weekstart = null
            weekstop = null
            monthCorr = null
            monthstart = null
            monthstop = null
            name = null
            number = null
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
              var nowtime1 = new Date(start)
              var startone1 = new Date(stop)
              var time1 = (startone1.getTime() - nowtime1.getTime()) * 0.001
              var duration = getDuration(time1)
              nowtime1 = null
              startone1 = null
              time1 = null
              return duration
            } else {
              var nowtime = new Date()
              var startone = new Date(start)
              var time = (nowtime.getTime() - startone.getTime()) * 0.001
              nowtime = null
              startone = null
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
            days = null
            hours = null
            minutes = null
            seconds = null
            return duration
          }
          data = null
          lastday = null
          today = null
          week = null
          month = null
          alarmlist = null
        })
        .catch((error) => console.log('error from axios', error))
      selectMonth = null
      selectMonth1 = null
    },
    sendToGroupUpdata(type) {
      var thisblob = this.pixiblob
      var obj = thisblob.find((o) => (o.blob_number).toString() === (this.logrightRoiData.data.blob_number).toString())
      var newName = obj.group_name
      var newGroup = ''
      if (type === 'add') {
        newGroup = 'add'
      } else if (type === 'change') {
        newGroup = this.askaddGroupId
        newName = this.askaddGroupName
      }
      var data = {
        // cam_id: idc,
        type: 'roiChangeBlob',
        cam_id: this.$route.query.cam,
        session: Math.random().toString(36).substr(2),
        blob_number: parseInt(obj.blob_number),
        blob_alarm_status: obj.blob_alarm_status,
        blob_threshold: obj.blob_threshold,
        points: obj.points,
        blob_status: '0',
        group_name: newName,
        group_id: (newGroup).toString()
      }
      this.ws4.send(JSON.stringify(data))
      newGroup = null
      thisblob = null
      obj = null
      data = null
      newName = null
    },
    submitForm() {
      var opendid = this.openid
      var opentype = this.opentype
      var status = this.checkbox
      var threshold = this.threshold
      var thisSpots = this.tpmedata.spot
      var thislines = this.tpmedata.line
      var thisscpoes = JSON.parse(this.temp1scope)
      var thisblob = this.tpmedata.blob
      var obj = null
      var data = null
      if (opentype === 'spot') {
        obj = thisSpots.find((o) => parseInt(o.spot_number) === parseInt(opendid))
        // var SpotY =
        //   obj.spot_position.Y / document.getElementById('image').offsetHeight
        // var SpotX =
        //   obj.spot_position.X / document.getElementById('image').offsetWidth
        // SpotY = SpotY.toFixed(4)
        // SpotX = SpotX.toFixed(4)
        data = {
          type: "roiChangeSpot",
          cam_id: this.$route.query.cam,
          session: Math.random().toString(36).substr(2),
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
        this.ws4.send(JSON.stringify(data))
        data = null
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
        obj = thislines.find((o) => parseInt(o.line_number) === parseInt(opendid))
        // console.log(this.threshold);
        data = {
          type: "roiChangeLine",
          cam_id: this.$route.query.cam,
          session: Math.random().toString(36).substr(2),
          line_number: opendid,
          line_alarm_status: obj.line_alarm_status,
          line_threshold: this.threshold,
          line_position_point_A: {
            X: obj.line_position_point_A.X,
            Y: obj.line_position_point_A.Y
          },
          line_position_point_B: {
            X: obj.line_position_point_B.X,
            Y: obj.line_position_point_B.Y
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
        obj = thisscpoes.find((o) => parseInt(o.scope_number) === parseInt(opendid))
        // console.log(obj)
        // obj = obj.data
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
          group_name: obj.group_name,
          group_id: obj.group_id
        }
        if (status === true) {
          data.blob_alarm_status = 1
        } else {
          data.blob_alarm_status = 0
        }
        // console.log(data);
        this.ws4.send(JSON.stringify(data))
        this.dialog = false
      }
      opendid = null
      opentype = null
      status = null
      threshold = null
      thisSpots = null
      thislines = null
      thisscpoes = null
      thisblob = null
      obj = null
      data = null
    },
    // 開啟群組編輯
    offdialogGroupChange(type) {
      if (type) {
        this.sendToGroupUpdata('change')
        // console.log("ok", this.logrightRoiData, this.askaddGroupName, this.askaddGroupId);
      }
      this.askGroupwindow = false
      this.askaddGroupwindow = false
      this.askaddGroupName = null
      this.askaddGroupId = null
      this.logrightRoiData = null // 記錄點到ROI
      this.logaddGroupRoiData = null // 紀錄將要加入群組的ROI
      this.updataBlob(false)
      // this.askGroupwindow = true
      // var roitempdata = this.logrightRoiData
      // console.log("開啟視窗", roitempdata);
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
      this.Interval = 0
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
      thisSpotData = null
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
      add = null
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
      thisScopeData = null
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
      add = null
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
      LineData = null
      // axios({
      //   method: 'post',
      //   url: `http://localhost:5002/api/monitor/object/change/line`,
      //   data: LineData,
      // }).catch((error) => console.log('error from axios', error))
    },
    settemperatureRanger(data) {
      if (data === 0) {
        this.temperatureRanger--
      } else if (data === 1) {
        this.temperatureRanger++
      }
    },
    temperatureRangerChange(data) {
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
          "highTemperatureArea": this.displayObject6 ? 1 : 0,
          "highTemperatureAreaRange": data
        }
      }))
      st = null
    },
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
      cal = null
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
    // 隨機亂數產生
    generateRandomString(length) {
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let randomString = '';
      for (let i = 0; i < length; i++) {
        var randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters[randomIndex];
        randomIndex = null
      }
      characters = null
      return randomString;
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
    roundDown(num, decimal) {
      return Math.floor((num + Number.EPSILON) * Math.pow(10, decimal)) / Math.pow(10, decimal);
    },
    destroyFunction() {
      this.lockedRoiTable = []
      this.$store.dispatch('myData/incrementAsync', { type: 'Locked', params: this.lockedRoiTable });
      // console.log("page 2 is Destroy" ,this.$data);
      this.wsblock = false
      if (this.wsListener1.close !== null) {
        this.ws1.removeEventListener("close", this.wsListener1.close)
        this.wsListener1.close = null
      }
      if (this.wsListener1.message !== null) {
        this.ws1.removeEventListener("message", this.wsListener1.message)
        this.wsListener1.message = null
      }
      if (this.ws1 !== null) {
        // this.ws1.close()
        this.ws1 = null
      }
      if (this.wsListener2.close !== null) {
        this.ws3.removeEventListener("close", this.wsListener2.close)
        this.wsListener2.close = null
      }
      if (this.wsListener2.message !== null) {
        this.ws3.removeEventListener("message", this.wsListener2.message)
        this.wsListener2.message = null
      }
      if (this.ws3 !== null) {
        // this.ws3.close()
        this.ws3 = null
      }
      if (this.anim1 !== null) {
        this.anim1.stop()
      }
      if (this.wsListener3.close !== null) {
        this.ws4.removeEventListener("close", this.wsListener3.close)
        this.wsListener3.close = null
      }
      if (this.wsListener3.message !== null) {
        this.ws4.removeEventListener("message", this.wsListener3.message)
        this.wsListener3.message = null
      }
      if (this.ws4 !== null) {
        // this.ws4.close()
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
      if (this.pixiWebWorker !== null) {
        this.pixiWebWorker.terminate();
        this.pixiWebWorker = null
      }
      // 刪除pixijs 
      if (this.setPixiFPSInt !== null) {
        clearInterval(this.setPixiFPSInt)
        this.setPixiFPSInt = null
      }
      this.appPixi.stop()
      this.appPixi.stage.removeChildren()
      for (var i = 0; i < this.appPixi.stage.children.length; i++) {
        this.appPixi.stage.children[i].destroy();
      }
      console.log(this.appPixi.stage.children.length);
      console.log("remove pixijs", this.appPixi.stage.children);
      this.appPixi.destroy();
      // var canvas = document.getElementById('pixijsRoicanvas');
      // console.log(canvas);
      // document.body.removeChild(canvas);
      // canvas = null
      this.appPixi = null
      if (this.wkstreaming !== null) {
        this.wkstreaming.terminate();
        this.wkstreaming = null
      }
      // var datalen = this.$data.length
      for (var key in this.$data) {
        // console.log("remove : " + [key]);
        this[key] = null;
      }
      // clearInterval(this.roifpsInterval)

      // clearInterval(this.timeOutRefresh)
      // // 多邊形 start---------------------------------------------------------------------
      // clearInterval(this.timeOutRefresh1)
      // // 多邊形 end---------------------------------------------------------------------

      // clearInterval(this.alarmlistInterval)

    }
  },
  beforeDestroy() {
    this.destroyFunction()
  },
}
</script>
<style scoped>
#goBackForGroup {
  position: absolute;
  bottom: 15px;
  right: 14px;
  background: #99a1a36b;
  padding: 5px 13px;
  border: 1px #fff solid;
  border-radius: 4px;
  cursor: pointer;
}

.icon-new {
  border-radius: 2px;
  background-color: #99A1A3;
  width: 14px;
  font-size: 10px;
  height: 15px;
  color: #fff;
  display: block;
  margin: 0px 0px 18px 2px;
  text-indent: 2.5px;
  line-height: 1.4;
}

.openedit {
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

.Live-points-amine {
  animation: blinking 1s infinite;
}

@keyframes blinking {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.3;
  }

  /* 中間顏色 */
  100% {
    opacity: 1;
  }

  /* 結束顏色，回到起始顏色 */
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
  z-index: 99;
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
  user-select: none;
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
  top: 50%;
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
  /* margin-top: -31px; */
  margin-top: 0px;
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

.w-100 {
  width: 100%;
}

.askGroupwindow1 {
  cursor: pointer;
  /* border: 1px #99A1A3 solid; */
  outline: 1px #99A1A3 solid;
  width: 146px;
  border-radius: 5px;
}

.askGroupwindow1:hover {
  /* border: 2px #99A1A3 solid; */
  outline: 2px #99A1A3 solid;
}

.f80898C {
  color: #80898C;
}
</style>
<style>
.date-picker .v-picker__body {
  background-color: #fff0 !important;
}

.date-picker .v-date-picker-header__value * {
  color: #545454 !important;
}

.alarmee:hover {
  background: rgba(232, 149, 159, 0.33) !important;
}

.cursor-pointer td {
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
  /* opacity: 0; */
  display: none;
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
  z-index: 99;
  transform: translate(0, -50%);
  color: #fff;
  cursor: pointer;
  pointer-events: auto;
}

.Thermal-bar-w input {
  width: 38px;
  color: #fff;
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
  /* z-index: 98; */
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
