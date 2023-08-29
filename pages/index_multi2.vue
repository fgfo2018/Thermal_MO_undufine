<template>
  <div class="fluid mt-3">
    <!-- <div>
      <v-btn @click="$emit('VideoActive', 'tab-1')">BACK</v-btn>
      output:{{ id }}
    </div> -->
    <v-img class="bgimg" src="bgimg.png" height="93.2vh" />

    <!-- 左側浮動按鈕---------------------------------------------------------------------------------------------------- -->
    <div class="box">
      <v-card class="mt-6 drawer" elevation="10" color="#59595b">
        <v-sheet class="arrow" elevation="5" color="#59595b"></v-sheet>
        <!-- 監測工具monitoring tools-------------------------------------------------------------------------------- -->
        <p class="subtitle text-center"><br />監測<br />項目</p>
        <!-- 點spot -->
        <v-tooltip right class="tips">
          <template #activator="{ on, attrs }">
            <v-btn
              class="left-btn mx-3"
              elevation="6"
              icon
              v-bind="attrs"
              v-on="on"
              @click="addspot()"
            >
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
            <v-btn
              class="left-btn mx-3 mt-3"
              elevation="6"
              icon
              v-bind="attrs"
              v-on="on"
              @click="addline()"
            >
              <img alt="line" src="/left-icons/line.png" width="15em" />
            </v-btn>
          </template>
          <span>直線</span>
        </v-tooltip>
        <!-- 矩形rectangle -->
        <v-tooltip right class="tips">
          <template #activator="{ on, attrs }">
            <v-btn
              class="left-btn mx-3 my-3"
              elevation="6"
              icon
              v-bind="attrs"
              v-on="on"
              @click="addscope()"
            >
              <img
                alt="rectangle"
                src="/left-icons/rectangle.png"
                width="18em"
              />
            </v-btn>
          </template>
          <span>矩形</span>
        </v-tooltip>
        <v-divider></v-divider>
        <!-- 影像呈現image presentation------------------------------------------------------------------------------ -->
        <p class="subtitle text-center"><br />影像<br />呈現</p>
        <!-- 影像模式image mode -->
        <v-speed-dial
          :direction="direction_imageMode"
          :transition="transition_imageMode"
        >
          <template #activator>
            <v-tooltip right class="tips">
              <template #activator="{ on, attrs }">
                <v-btn
                  v-model="fab_imageMode"
                  elevation="6"
                  class="left-btn mx-3"
                  icon
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon v-if="fab_imageMode"> mdi-close </v-icon>
                  <img
                    v-else
                    alt="palette"
                    src="/left-icons/image-mode/image-mode.png"
                    width="21em"
                  />
                </v-btn>
              </template>
              <span>影像模式</span>
            </v-tooltip>
          </template>
          <v-tooltip top class="tips">
            <template #activator="{ on, attrs }">
              <v-btn
                class="mt-2"
                elevation="6"
                x-small
                dark
                fab
                v-bind="attrs"
                v-on="on"
              >
                <img
                  alt="image-mode-thermal"
                  src="/left-icons/image-mode/image-mode-thermal.png"
                  width="22em"
                />
              </v-btn>
            </template>
            <span>Thermal</span>
          </v-tooltip>
          <v-tooltip top class="tips">
            <template #activator="{ on, attrs }">
              <v-btn
                class="mt-2"
                elevation="6"
                x-small
                dark
                fab
                v-bind="attrs"
                v-on="on"
              >
                <img
                  alt="image-mode-thermal-msx"
                  src="/left-icons/image-mode/image-mode-thermal-msx.png"
                  width="22em"
                />
              </v-btn>
            </template>
            <span>Thermal MSX</span>
          </v-tooltip>
          <v-tooltip top class="tips">
            <template #activator="{ on, attrs }">
              <v-btn
                class="mt-2"
                elevation="6"
                x-small
                dark
                fab
                v-bind="attrs"
                v-on="on"
              >
                <img
                  alt="image-mode-digital-camera"
                  src="/left-icons/image-mode/image-mode-digital-camera.png"
                  width="22em"
                />
              </v-btn>
            </template>
            <span>Digital Camera</span>
          </v-tooltip>
          <v-tooltip top class="tips">
            <template #activator="{ on, attrs }">
              <v-btn
                class="mt-2"
                elevation="6"
                x-small
                dark
                fab
                v-bind="attrs"
                v-on="on"
              >
                <img
                  alt="image-mode-marco"
                  src="/left-icons/image-mode/image-mode-marco.png"
                  width="22em"
                />
              </v-btn>
            </template>
            <span>Marco</span>
          </v-tooltip>
          <v-tooltip top class="tips">
            <template #activator="{ on, attrs }">
              <v-btn
                class="mt-2"
                elevation="6"
                x-small
                dark
                fab
                v-bind="attrs"
                v-on="on"
              >
                <img
                  alt="image-mode-thermal-fsx"
                  src="/left-icons/image-mode/image-mode-thermal-fsx.png"
                  width="22em"
                />
              </v-btn>
            </template>
            <span>Thermal FSX</span>
          </v-tooltip>
        </v-speed-dial>
        <!-- 色譜模式palette -->
        <v-speed-dial
          :direction="direction_palette"
          :transition="transition_palette"
        >
          <template #activator>
            <v-tooltip right class="tips">
              <template #activator="{ on, attrs }">
                <v-btn
                  v-model="fab_palette"
                  class="left-btn mx-3 my-3"
                  elevation="6"
                  icon
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon v-if="fab_palette"> mdi-close </v-icon>
                  <img
                    v-else
                    alt="palette"
                    src="/left-icons/palette/palette.png"
                    width="18em"
                  />
                </v-btn>
              </template>
              <span>色譜模式</span>
            </v-tooltip>
          </template>
          <v-tooltip top class="tips">
            <template #activator="{ on, attrs }">
              <v-btn
                class=""
                elevation="6"
                x-small
                dark
                fab
                v-bind="attrs"
                v-on="on"
              >
                <img
                  alt="palette-iron"
                  src="/left-icons/palette/palette-iron.png"
                  width="24em"
                />
              </v-btn>
            </template>
            <span>Iron</span>
          </v-tooltip>
          <v-tooltip top class="tips">
            <template #activator="{ on, attrs }">
              <v-btn
                class=""
                elevation="6"
                x-small
                dark
                fab
                v-bind="attrs"
                v-on="on"
              >
                <img
                  alt="palette-lava"
                  src="/left-icons/palette/palette-lava.png"
                  width="24em"
                />
              </v-btn>
            </template>
            <span>Lava</span>
          </v-tooltip>
          <v-tooltip top class="tips">
            <template #activator="{ on, attrs }">
              <v-btn
                class=""
                elevation="6"
                x-small
                dark
                fab
                v-bind="attrs"
                v-on="on"
              >
                <img
                  alt="palette-gray"
                  src="/left-icons/palette/palette-gray.png"
                  width="24em"
                />
              </v-btn>
            </template>
            <span>Gray</span>
          </v-tooltip>
          <v-tooltip top class="tips">
            <template #activator="{ on, attrs }">
              <v-btn
                class=""
                elevation="6"
                x-small
                dark
                fab
                v-bind="attrs"
                v-on="on"
              >
                <img
                  alt="palette-rainbow"
                  src="/left-icons/palette/palette-rainbow.png"
                  width="24em"
                />
              </v-btn>
            </template>
            <span>Rainbow</span>
          </v-tooltip>
          <v-tooltip top class="tips">
            <template #activator="{ on, attrs }">
              <v-btn
                class=""
                elevation="6"
                x-small
                dark
                fab
                v-bind="attrs"
                v-on="on"
              >
                <img
                  alt="palette-rainbow-hc"
                  src="/left-icons/palette/palette-rainbow-hc.png"
                  width="24em"
                />
              </v-btn>
            </template>
            <span>Rainbow HC</span>
          </v-tooltip>
          <v-tooltip top class="tips">
            <template #activator="{ on, attrs }">
              <v-btn
                class=""
                elevation="6"
                x-small
                dark
                fab
                v-bind="attrs"
                v-on="on"
              >
                <img
                  alt="palette-arctic"
                  src="/left-icons/palette/palette-arctic.png"
                  width="20em"
                />
              </v-btn>
            </template>
            <span>Arctic</span>
          </v-tooltip>
        </v-speed-dial>
        <v-divider></v-divider>

        <!-- 計算工具calibration tools------------------------------------------------------------------------------ -->
        <p class="subtitle text-center"><br />校正<br />工具</p>

        <!-- 計算calibration -->
        <v-speed-dial
          :direction="direction_calibration"
          :transition="transition_calibration"
        >
          <template #activator>
            <v-tooltip right class="tips">
              <template #activator="{ on, attrs }">
                <v-btn
                  v-model="fab_calibration"
                  class="left-btn mx-3"
                  elevation="6"
                  icon
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon v-if="fab_calibration"> mdi-close </v-icon>
                  <img
                    v-else
                    alt="palette"
                    src="/left-icons/calibration/calibration.png"
                    width="16em"
                  />
                </v-btn>
              </template>
              <span>校正</span>
            </v-tooltip>
          </template>
          <v-tooltip top class="tips">
            <template #activator="{ on, attrs }">
              <v-btn
                class="mt-2"
                elevation="6"
                x-small
                dark
                fab
                v-bind="attrs"
                v-on="on"
              >
                <img
                  alt=""
                  src="/left-icons/calibration/calibration-now.png"
                  width="23em"
                />
              </v-btn>
            </template>
            <span>立即校正</span>
          </v-tooltip>
          <v-tooltip top class="tips">
            <template #activator="{ on, attrs }">
              <v-btn
                class="mt-2"
                elevation="6"
                x-small
                dark
                fab
                v-bind="attrs"
                v-on="on"
              >
                <img
                  alt=""
                  src="/left-icons/calibration/calibration-auto.png"
                  width="20em"
                />
              </v-btn>
            </template>
            <span>自動校正</span>
          </v-tooltip>
          <v-tooltip top class="tips">
            <template #activator="{ on, attrs }">
              <v-btn
                class="mt-2"
                elevation="6"
                x-small
                dark
                fab
                v-bind="attrs"
                v-on="on"
              >
                <img
                  alt=""
                  src="/left-icons/calibration/calibration-10min.png"
                  width="20em"
                />
              </v-btn>
            </template>
            <span>每10分鐘</span>
          </v-tooltip>
          <v-tooltip top class="tips">
            <template #activator="{ on, attrs }">
              <v-btn
                class="mt-2"
                elevation="6"
                x-small
                dark
                fab
                v-bind="attrs"
                v-on="on"
              >
                <img
                  alt=""
                  src="/left-icons/calibration/calibration-30min.png"
                  width="20em"
                />
              </v-btn>
            </template>
            <span>每30分鐘</span>
          </v-tooltip>
          <v-tooltip top class="tips">
            <template #activator="{ on, attrs }">
              <v-btn
                class="mt-2"
                elevation="6"
                x-small
                dark
                fab
                v-bind="attrs"
                v-on="on"
              >
                <img
                  alt=""
                  src="/left-icons/calibration/calibration-60min.png"
                  width="20em"
                />
              </v-btn>
            </template>
            <span>每60分鐘</span>
          </v-tooltip>
          <v-tooltip top class="tips">
            <template #activator="{ on, attrs }">
              <v-btn
                class="mt-2"
                elevation="6"
                x-small
                dark
                fab
                v-bind="attrs"
                v-on="on"
              >
                <img
                  alt=""
                  src="/left-icons/calibration/calibration-manual.png"
                  width="20em"
                />
              </v-btn>
            </template>
            <span>手動校正</span>
          </v-tooltip>
          <v-tooltip top class="tips">
            <template #activator="{ on, attrs }">
              <v-btn
                class="mt-2"
                elevation="6"
                x-small
                dark
                fab
                v-bind="attrs"
                v-on="on"
              >
                <img
                  alt=""
                  src="/left-icons/calibration/calibration-stop.png"
                  width="20em"
                />
              </v-btn>
            </template>
            <span>停止校正</span>
          </v-tooltip>
        </v-speed-dial>
        <!-- 照明light -->
        <v-speed-dial
          :direction="direction_light"
          :transition="transition_light"
        >
          <template #activator>
            <v-tooltip right class="tips">
              <template #activator="{ on, attrs }">
                <v-btn
                  v-model="fab_light"
                  class="left-btn mx-3 mt-3"
                  elevation="6"
                  icon
                  v-bind="attrs"
                  v-on="on"
                  @click="light"
                >
                  <v-icon v-if="fab_light"> mdi-close </v-icon>
                  <img
                    v-else
                    id="light_img"
                    alt="palette"
                    src="/left-icons/light/light-off.png"
                    width="14em"
                  />
                </v-btn>
              </template>
              <span>照明</span>
            </v-tooltip>
          </template>
        </v-speed-dial>
        <!-- 自動對焦autoFocus -->
        <v-speed-dial
          :direction="direction_autofocus"
          :transition="transition_autofocus"
        >
          <template #activator>
            <v-tooltip right class="tips">
              <template #activator="{ on, attrs }">
                <v-btn
                  v-model="fab_autofocus"
                  class="left-btn mx-3 my-3"
                  elevation="6"
                  icon
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon v-if="fab_autofocus"> mdi-close </v-icon>
                  <img
                    v-else
                    alt="palette"
                    src="/left-icons/autofocus/autofocus.png"
                    width="16em"
                  />
                </v-btn>
              </template>
              <span>自動對焦</span>
            </v-tooltip>
          </template>
          <v-tooltip top class="tips">
            <template #activator="{ on, attrs }">
              <v-btn
                class=""
                elevation="6"
                x-small
                dark
                fab
                v-bind="attrs"
                v-on="on"
              >
                <img
                  alt="palette-iron"
                  src="/left-icons/autofocus/autofocus-focus-further.png"
                  width="18em"
                />
              </v-btn>
            </template>
            <span>遠景</span>
          </v-tooltip>
          <v-tooltip top class="tips">
            <template #activator="{ on, attrs }">
              <v-btn
                class=""
                elevation="6"
                x-small
                dark
                fab
                v-bind="attrs"
                v-on="on"
              >
                <img
                  alt="palette-lava"
                  src="/left-icons/autofocus/autofocus-focus-closer.png"
                  width="18em"
                />
              </v-btn>
            </template>
            <span>近景</span>
          </v-tooltip>
          <v-tooltip top class="tips">
            <template #activator="{ on, attrs }">
              <v-btn
                class=""
                elevation="6"
                x-small
                dark
                fab
                v-bind="attrs"
                v-on="on"
              >
                <img
                  alt="palette-gray"
                  src="/left-icons/autofocus/autofocus-autofocus.png"
                  width="18em"
                />
              </v-btn>
            </template>
            <span>自動對焦</span>
          </v-tooltip>
        </v-speed-dial>
        <v-divider></v-divider>
        <!-- 影像調整image adjustment ------------------------------------------------------------------------------ -->
        <p class="subtitle text-center"><br />影像<br />調整</p>
        <!-- 全螢幕fullscreen -->
        <v-tooltip right class="tips">
          <template #activator="{ on, attrs }">
            <v-btn
              class="left-btn mx-3"
              elevation="6"
              icon
              v-bind="attrs"
              v-on="on"
            >
              <img
                class=""
                alt="spot"
                src="/left-icons/fullscreen.png"
                width="19em"
              />
            </v-btn>
          </template>
          <span>全螢幕</span>
        </v-tooltip>
        <!-- 影像快照snapshot -->
        <v-tooltip right class="tips">
          <template #activator="{ on, attrs }">
            <v-btn
              class="left-btn mx-3 mt-3"
              elevation="6"
              icon
              v-bind="attrs"
              v-on="on"
            >
              <img
                class=""
                alt="line"
                src="/left-icons/snapshot.png"
                width="19em"
              />
            </v-btn>
          </template>
          <span>影像快照</span>
        </v-tooltip>
        <!-- 串流暫停freeze/持續unfreeze -->
        <v-tooltip right class="tips">
          <template #activator="{ on, attrs }">
            <v-btn
              class="left-btn mx-3 mt-3"
              icon
              v-bind="attrs"
              elevation="6"
              v-on="on"
              @click="freeze"
            >
              <img
                id="unfreeze"
                alt="rectangle"
                src="/left-icons/freeze/unfreeze.png"
                width="9em"
              />
            </v-btn>
          </template>
          <span>串流暫停/持續</span>
        </v-tooltip>

        <!-- 隱藏/顯示監測項目hide/show overlay -->
        <v-tooltip right class="tips">
          <template #activator="{ on, attrs }">
            <v-btn
              class="left-btn mx-3 my-3"
              elevation="6"
              icon
              v-bind="attrs"
              v-on="on"
            >
              <img
                class=""
                alt="rectangle"
                src="/left-icons/hide-overlay.png"
                width="18em"
              />
            </v-btn>
          </template>
          <span>隱藏/顯示監測項目</span>
        </v-tooltip>
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
              <v-btn
                class="arrow-diago"
                rounded
                tile
                width="15px"
                @click="$emit('VideoActive', 'tab-1')"
              >
                <img
                  class=""
                  alt="line"
                  src="/images/arrow-right.png"
                  width="30%"
              /></v-btn>
              <div class="frame-hard-cam">
                <div class="frame-hard-cam-status"></div>
                相機名稱
              </div>
              <v-select
                v-model="selectList"
                :items="cameraList"
                :menu-props="{ bottom: true, offsetY: true }"
                class="camSelect"
                label="Solo field"
                solo
                dense
                hide-details
              ></v-select>
              <div>上次更新時間：2022/05/22 19:30:00</div>
            </div>
            <div class="frame mt-1">
              <div id="cover" class="cover">
                <div class="cover1">
                  <div class="d-none" id="rtsp-status"></div>
                  <div class="d-none" id="rtsp-stay"></div>
                  <!-- <img
                  id="image"
                  src="/loadingBG.png"
                /> -->
                  <canvas id="image"></canvas>
                  <div
                    :style="{
                      top: this.reference.Y + 'px',
                      left: this.reference.X + 'px',
                    }"
                    id="spot"
                    class="spot"
                  >
                    <img src="/images/spot_1.png" />
                    <div class="spot-span">
                      <div>R</div>
                    </div>
                  </div>
                  <!-- 點物件 -->
                  <div
                    v-for="(item01, index) in spots"
                    :key="'B' + index"
                    :style="{
                      top: item01.spot_position.Y + 'px',
                      left: item01.spot_position.X + 'px',
                    }"
                    id="spot"
                    class="spot"
                    v-bind:data-name="item01.spot_number"
                  >
                    <img src="/images/spot_1.png" />
                    <div class="spot-span">
                      <div>{{ item01.spot_number }}</div>
                    </div>
                  </div>
                  <!-- 範圍物件 -->
                  <div
                    v-for="(item02, index) in scopes"
                    :key="'A' + index"
                    :style="{
                      top: item02.scope_position_point_LT.Y + 'px',
                      left: item02.scope_position_point_LT.X + 'px',
                      width: item02.scope_position_point_BR.X + 'px',
                      height: item02.scope_position_point_BR.Y + 'px',
                    }"
                    id="scope"
                    class="scope"
                    v-bind:data-name="item02.scope_number"
                  >
                    <div class="scope-span">
                      <div>{{ item02.scope_number }}</div>
                    </div>
                    <!-- <span class="scope-test-xy-TL">X:Y:</span
                  ><span class="scope-test-xy-BR">X:Y:</span> -->
                  </div>
                  <!-- 線物件 -->
                  <div
                    v-for="(item, index) in lines"
                    :key="'point1' + index"
                    :style="{
                      top: item.line_position_point_A.Y + 'px',
                      left: item.line_position_point_A.X + 'px',
                    }"
                    id="pointA"
                    :class="'point-totle ' + 'point' + (index + 1)"
                    v-bind:data-name="item.line_number"
                  >
                    <div class="line-span">
                      <div>{{ item.line_number }}</div>
                    </div>
                  </div>
                  <div
                    v-for="(item, index) in lines"
                    :key="'point2' + index"
                    :style="{
                      top: item.line_position_point_B.Y + 'px',
                      left: item.line_position_point_B.X + 'px',
                    }"
                    id="pointB"
                    :class="
                      'point' + (index + 1) + ' point_hover' + (index + 1)
                    "
                    v-bind:data-name="item.line_number"
                  ></div>
                  <div
                    v-for="(item, index) in lines"
                    :key="'line' + index"
                    :class="'line' + (index + 1)"
                    id="line"
                  ></div>
                </div>
              </div>
            </div>
            <div class="frame-footer">
              <v-text-field
                v-model="temperature"
                class="subtitle card5content mx-3 text-color"
                label="一般溫度"
                color="#828c8f"
              ></v-text-field>

              <v-text-field
                v-model="reflected"
                class="subtitle card5content mx-3 text-color"
                label="反射溫度"
                color="#828c8f"
              ></v-text-field>

              <v-text-field
                v-model="atmospheric"
                class="subtitle card5content mx-3 text-color"
                label="環境溫度"
                color="#828c8f"
              ></v-text-field>

              <v-text-field
                v-model="humidity"
                class="subtitle card5content mx-3 text-color"
                label="環境濕度"
                color="#828c8f"
              ></v-text-field>

              <v-text-field
                v-model="distance"
                class="subtitle card5content mx-3 text-color"
                label="量測距離"
                color="#828c8f"
              ></v-text-field>

              <v-text-field
                v-model="emissivity"
                class="subtitle card5content mx-3 text-color"
                label="放射率"
                color="#828c8f"
              ></v-text-field>

              <v-text-field
                v-model="transmission"
                class="subtitle card5content mx-3 text-color font-weight-large"
                label="穿透率"
                color="#828c8f"
              ></v-text-field>
              <v-btn
                color="#e6e6e6"
                class="diago-btn mt-3"
                max-height="24px"
                max-width="95px"
                rounded
              >
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
              <v-simple-table
                id="style-3"
                fixed-header
                height="265px"
                class="mx-2"
                small
              >
                <template #default>
                  <thead>
                    <tr>
                      <th class="text-center" style="height:25px;">項目</th>
                      <th class="text-center" style="height:25px;">監測溫度</th>
                      <th class="text-center" style="height:25px;">設定警報</th>
                      <th class="text-center" style="height:25px;">刪除</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="text-center" style="padding: 0px 13px">
                        <v-badge
                          content="R"
                          overlap
                          color="#828C8F"
                          class="my-0"
                          bordered
                          ><v-btn icon class="right-btn"
                            ><img
                              class=""
                              alt=""
                              src="/right-icons/spot2.png"
                              width="20em" /></v-btn
                        ></v-badge>
                      </td>
                      <td
                        class="text-center subtitle-right"
                        style="padding: 0px 25px"
                      >
                        {{ reference.reference_temperature }}°C
                      </td>
                      <td class="text-center" style="padding: 0px 25px">N/A</td>
                      <td class="text-center" style="padding: 0px 13px">N/A</td>
                    </tr>
                    <!-- spot -->
                    <tr v-for="(item, index) in spots" :key="'C' + index">
                      <td class="text-center" style="padding: 0px 13px">
                        <v-badge
                          :content="item.spot_number"
                          overlap
                          color="#828C8F"
                          class="my-0"
                          bordered
                          ><v-btn icon class="right-btn"
                            ><img
                              class=""
                              alt=""
                              src="/right-icons/spot2.png"
                              width="20em" /></v-btn
                        ></v-badge>
                      </td>
                      <td
                        class="text-center subtitle-right"
                        style="padding: 0px 25px"
                      >
                        {{ item.spot_temperature }}°C
                      </td>
                      <td class="text-center" style="padding: 0px 25px">
                        <!-- 點:警報對話框 -->
                        <v-btn
                          color=""
                          icon
                          class="right-btn"
                          @click="opendialog(item.spot_number, 'spot')"
                          ><img
                            v-if="
                              item.spot_alarm_status === 1 &&
                              item.spot_temperature <= item.spot_threshold
                            "
                            class=""
                            alt=""
                            src="/right-icons/alert-on.png"
                            width="18em"
                            depressed
                          />
                          <img
                            v-else-if="
                              item.spot_alarm_status === 1 &&
                              item.spot_temperature >= item.spot_threshold
                            "
                            class=""
                            alt=""
                            src="/right-icons/alertOn.png"
                            width="18em"
                            depressed
                          />
                          <img
                            v-else-if="item.spot_alarm_status === 0"
                            class=""
                            alt=""
                            src="/right-icons/alert-off.png"
                            width="18em"
                            depressed
                          />
                        </v-btn>
                      </td>
                      <td class="text-center" style="padding: 0px 13px">
                        <v-btn color="" icon class="right-btn"
                          ><img
                            class=""
                            alt=""
                            src="/right-icons/delete.png"
                            width="18em"
                            @click="deletespot(item.spot_number)"
                        /></v-btn>
                      </td>
                    </tr>
                    <!-- SCOPE -->
                    <tr v-for="(item, index) in scopes" :key="'D' + index">
                      <td class="text-center" style="padding: 0px 13px">
                        <v-badge
                          :content="item.scope_number"
                          overlap
                          color="#828C8F"
                          class="my-0"
                          bordered
                          ><v-btn icon class="right-btn"
                            ><img
                              class="rectangle"
                              alt=""
                              src="/right-icons/rectangle2.png"
                              width="17em" /></v-btn
                        ></v-badge>
                      </td>
                      <td
                        class="text-center subtitle-right"
                        style="padding: 0px 25px"
                      >
                        {{ item.scope_temperature_max }}°C
                      </td>
                      <td class="text-center" style="padding: 0px 25px">
                        <!-- 面:警報對話框 -->
                        <v-btn
                          color=""
                          icon
                          class="right-btn"
                          @click="opendialog(item.scope_number, 'scope')"
                          ><img
                            v-if="
                              item.scope_alarm_status === 1 &&
                              item.scope_temperature_max <= item.scope_threshold
                            "
                            class=""
                            alt=""
                            src="/right-icons/alert-on.png"
                            width="18em"
                            depressed
                          />
                          <img
                            v-if="
                              item.scope_alarm_status === 1 &&
                              item.scope_temperature_max >= item.scope_threshold
                            "
                            class=""
                            alt=""
                            src="/right-icons/alertOn.png"
                            width="18em"
                            depressed
                          />
                          <img
                            v-else-if="item.scope_alarm_status === 0"
                            class=""
                            alt=""
                            src="/right-icons/alert-off.png"
                            width="18em"
                            depressed
                          />
                        </v-btn>
                      </td>
                      <td class="text-center" style="padding: 0px 13px">
                        <v-btn color="" icon class="right-btn"
                          ><img
                            class=""
                            alt="delete"
                            src="/right-icons/delete.png"
                            width="18em"
                            @click="deletescope(item.scope_number)"
                        /></v-btn>
                      </td>
                    </tr>
                    <!-- LINE -->
                    <tr v-for="(item, index) in lines" :key="'H' + index">
                      <td class="text-center" style="padding: 0px 13px">
                        <v-badge
                          :content="item.line_number"
                          overlap
                          color="#828C8F"
                          class="my-0"
                          bordered
                          ><v-btn icon class="right-btn"
                            ><img
                              class=""
                              alt="alert"
                              src="/right-icons/line2.png"
                              width="15em" /></v-btn
                        ></v-badge>
                      </td>
                      <td
                        class="text-center subtitle-right"
                        style="padding: 0px 25px"
                      >
                        {{ item.line_temperature_max }}°C
                      </td>
                      <td class="text-center" style="padding: 0px 25px">
                        <!-- 線:警報對話框 -->
                        <v-btn
                          color=""
                          icon
                          class="right-btn"
                          @click="opendialog(item.line_number, 'line')"
                          ><img
                            v-if="
                              item.line_alarm_status === 1 &&
                              item.line_temperature_max <= item.line_threshold
                            "
                            class=""
                            alt=""
                            src="/right-icons/alert-on.png"
                            width="18em"
                            depressed />
                          <img
                            v-if="
                              item.line_alarm_status === 1 &&
                              item.line_temperature_max >= item.line_threshold
                            "
                            class=""
                            alt=""
                            src="/right-icons/alertOn.png"
                            width="18em"
                            depressed />
                          <img
                            v-else-if="item.line_alarm_status === 0"
                            class=""
                            alt=""
                            src="/right-icons/alert-off.png"
                            width="18em"
                            depressed
                        /></v-btn>
                      </td>
                      <td class="text-center" style="padding: 0px 13px">
                        <v-btn
                          color=""
                          icon
                          class="right-btn"
                          @click="deleteline(item.line_number)"
                          ><img
                            class=""
                            alt="delete"
                            src="/right-icons/delete.png"
                            width="18em"
                        /></v-btn>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card>
          </v-col>
          <!-- 物件警報(共用) -->
          <v-dialog v-model="dialog" persistent max-width="290">
            <form @submit.prevent="submitForm">
              <v-card>
                <h4 class="cardtitle ml-3">設定警報</h4>
                <!-- <v-divider></v-divider> -->
                <v-card-text>
                  <v-select
                    disabled
                    class="subtitle text-color"
                    v-model="conditionSelect"
                    :items="conditionItems"
                    :rules="[(v) => !!v || 'Item is required']"
                    label="條件"
                    required
                  ></v-select>
                  <v-text-field
                    v-model="threshold"
                    class="subtitle text-color qwcegzsd"
                    label="閾值"
                    name="threshold"
                    color="#828c8f"
                    required
                  ></v-text-field>
                  <v-text-field
                    disabled
                    v-model="hysteresis"
                    class="subtitle text-color"
                    label="滯後"
                    color="#828c8f"
                  ></v-text-field>
                  <v-text-field
                    disabled
                    v-model="thresholdTime"
                    class="subtitle text-color"
                    label="閾值時間(毫秒)"
                    color="#828c8f"
                  ></v-text-field>
                  <v-select
                    disabled
                    class="subtitle text-color"
                    v-model="captureSelect"
                    :items="captureItems"
                    :rules="[(v) => !!v || 'Item is required']"
                    label="捕捉"
                    required
                  ></v-select>
                  <v-text-field
                    disabled
                    v-model="pulseTime"
                    class="subtitle text-color"
                    label="脈衝時間(毫秒)"
                    color="#828c8f"
                  ></v-text-field>
                </v-card-text>

                <v-card-actions>
                  <v-switch
                    label=""
                    v-model="checkbox"
                    color="#828c8f"
                  ></v-switch>
                  <v-spacer></v-spacer>

                  <v-btn color="#828C8F" text @click="dialog = false">
                    取消
                  </v-btn>

                  <v-btn color="#828C8F" type="submit" text> 確定 </v-btn>
                </v-card-actions>
              </v-card>
            </form>
          </v-dialog>
          <!--右2畫面顯示----------------------------------------------------------------------------------------------- -->
          <v-col cols="12" lg="7" class="pb-0">
            <!-- <v-col cols="12" lg="6" style="border: 1px solid red"> -->

            <v-card class="mt-3 mr-6" rounded="md" elevation="6">
              <h4 class="cardtitle1 ml-3">警報紀錄</h4>
              <v-simple-table fixed-header height="265px" class="mx-2 table2">
                <template #default>
                  <thead>
                    <tr>
                      <th class="text-center alarmLogth" style="height:25px;">項目</th>
                      <th class="text-center alarmLogth" style="height:25px;">觸發時間</th>
                      <th class="text-center alarmLogth" style="height:25px;">監測溫度</th>
                      <th class="text-center alarmLogth" style="height:25px;">警報溫度</th>
                      <th class="text-center alarmLogth" style="height:25px;">開始時間</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in temps" :key="item.name">
                      <template v-if="item.duration[0] === '持續中'">
                        <td
                          class="text-center"
                          style="
                            padding: 0px 13px;
                            background-color: rgb(232 149 159 / 33%);
                            color: #4c4c4c;
                          "
                        >
                          <v-badge
                            :content="item.objcet.number"
                            overlap
                            color="#828C8F"
                            class="badge my-0"
                            bordered
                          >
                            <v-btn icon class="right-btn">
                              <img
                                v-if="item.objcet.name === 'spot'"
                                class=""
                                alt="alert"
                                src="/right-icons/spot2.png"
                                width="18em"
                              />
                              <img
                                v-if="item.objcet.name === 'scope'"
                                class=""
                                alt="alert"
                                src="/right-icons/rectangle2.png"
                                width="18em"
                              />
                              <img
                                v-if="item.objcet.name === 'line'"
                                class=""
                                alt="alert"
                                src="/right-icons/line2.png"
                                width="18em"
                              />
                            </v-btn>
                          </v-badge>
                        </td>
                        <td
                          class="text-center subtitle-right"
                          style="
                            padding: 0px 13px;
                            background-color: rgb(232 149 159 / 33%);
                            color: #4c4c4c;
                          "
                        >
                          {{ item.duration[1] }}<br />
                          ({{ item.duration[0] }})
                        </td>
                        <td
                          class="text-center subtitle-right"
                          style="
                            padding: 0px 24.7px;
                            background-color: rgb(232 149 159 / 33%);
                            color: #4c4c4c;
                          "
                        >
                          {{ item.temperature }}°C
                        </td>
                        <td
                          class="text-center subtitle-right"
                          style="
                            padding: 0px 24.7px;
                            background-color: rgb(232 149 159 / 33%);
                            color: #4c4c4c;
                          "
                        >
                          {{ item.alertTemperature }}°C
                        </td>
                        <td
                          class="text-center subtitle-right"
                          style="
                            padding: 0px 5px;
                            font-size: 12px;
                            background-color: rgb(232 149 159 / 33%);
                            color: #4c4c4c;
                          "
                        >
                          {{ item.time }}
                        </td>
                      </template>
                      <template v-else>
                        <td class="text-center" style="padding: 0px 13px">
                          <v-badge
                            :content="item.objcet.number"
                            overlap
                            color="#828C8F"
                            class="badge my-0"
                            bordered
                          >
                            <v-btn icon class="right-btn">
                              <img
                                v-if="item.objcet.name === 'spot'"
                                class=""
                                alt="alert"
                                src="/right-icons/spot2.png"
                                width="18em"
                              />
                              <img
                                v-if="item.objcet.name === 'scope'"
                                class=""
                                alt="alert"
                                src="/right-icons/rectangle2.png"
                                width="18em"
                              />
                              <img
                                v-if="item.objcet.name === 'line'"
                                class=""
                                alt="alert"
                                src="/right-icons/line2.png"
                                width="18em"
                              />
                            </v-btn>
                          </v-badge>
                        </td>
                        <td
                          class="text-center subtitle-right"
                          style="padding: 0px 13px"
                        >
                          {{ item.duration }}
                        </td>
                        <td
                          class="text-center subtitle-right"
                          style="padding: 0px 24.7px"
                        >
                          {{ item.temperature }}°C
                        </td>
                        <td
                          class="text-center subtitle-right"
                          style="padding: 0px 24.7px"
                        >
                          {{ item.alertTemperature }}°C
                        </td>
                        <td
                          class="text-center subtitle-right"
                          style="padding: 0px 5px; font-size: 12px"
                        >
                          {{ item.time }}
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
            <!-- <v-col cols="12" lg="12" style="border: 1px solid red"> -->
            <v-card
              class="mr-6"
              style="max-height: 202px"
              rounded="md"
              elevation="6"
            >
              <div class="flash-video-and-log">
                <!-- <v-tooltip left class="tips">
                  <template #activator="{ on, attrs }">
                    <v-btn
                      x-small
                      icon
                      class="btn reset"
                      color="#9BA3A5"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon x-small class="icon">mdi-restore</v-icon>
                    </v-btn>
                  </template>
                  <span>重置</span>
                </v-tooltip> -->
                <div>
                  <div class="flash-image-title">
                    <h4 class="cardtitle mx-3">即時超溫影像紀錄</h4>
                    <span>2022/05/22 15:00:00 - 2022/05/22 15:05:00</span>
                  </div>
                  <div class="flash-image-img mx-3">
                    <div>
                      <img src="loadingBG.png" />
                    </div>
                    <div>
                      <img src="loadingBG.png" />
                    </div>
                  </div>
                </div>
                <!-- 折線圖 -->
                <div>
                  <div
                    ref="FlashImageLog"
                    id="FlashImageLog"
                    style="height: 240px; width: 415px"
                  ></div>
                </div>
              </div>

              <!-- <v-btn icon class="btn reset" color="#9BA3A5"> 
                  <v-icon  class="icon">mdi-cached</v-icon>
                </v-btn> -->
            </v-card>
          </v-col>
          <!--右4畫面顯示(警報次數及歷史)----------------------------------------------------------------------------------------------- -->
          <v-col cols="12" lg="12">
            <!-- <v-col cols="12" lg="6" style="border: 1px solid red"> -->
            <v-card
              class="fill-height mr-6"
              rounded="md"
              elevation="6"
              height="299px"
            >
              <div class="reset">
                <v-icon color="#d8d8d8">mdi-circle-medium</v-icon
                ><span class="subtitle-right">正常&nbsp;&nbsp;</span>
                <v-icon color="#828c8f">mdi-circle-medium</v-icon
                ><span class="subtitle-right"
                  >超溫&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                >
              </div>
              <h4 class="cardtitle ml-3">警報次數及歷史</h4>

              <!-- 圖表1 本日 -->
              <div class="alarm-sum">
                <div class="alarm-charts">
                  <div class="cheats-cover">
                    <v-progress-circular
                      class="donut1 mx-5"
                      :rotate="-90"
                      :size="95"
                      :width="10"
                      :value="valueToday"
                      color="#828c8f"
                      backgroud
                    >
                      <h3>{{ valueToday }}</h3>
                    </v-progress-circular>

                    <v-sheet
                      ><h4 class="chartTitle mr-16">本日</h4>

                      <p class="subtitle-right text-center mr-2">
                        {{
                          Datecorrect('today', this.alarmDate)
                        }}&nbsp;00:00<br />ǀ<br />{{
                          Datecorrect('today', this.alarmDate)
                        }}&nbsp;24:00
                      </p>
                    </v-sheet>
                  </div>
                  <!-- 圖表2 昨日 -->
                  <div class="cheats-cover">
                    <v-progress-circular
                      class="donut1 mx-5"
                      :rotate="-90"
                      :size="95"
                      :width="10"
                      :value="valueLastday"
                      color="#828c8f"
                    >
                      <h3>{{ valueLastday }}</h3>
                    </v-progress-circular>

                    <v-sheet class="gg"
                      ><h4 class="chartTitle mr-16">昨日</h4>
                      <p class="subtitle-right text-center mr-2">
                        {{
                          Datecorrect('yesterday', this.alarmDate)
                        }}&nbsp;00:00<br />ǀ<br />{{
                          Datecorrect('yesterday', this.alarmDate)
                        }}&nbsp;24:00
                      </p>
                    </v-sheet>
                  </div>
                  <!-- 圖表3 本週 -->
                  <div class="cheats-cover">
                    <v-progress-circular
                      class="donut1 mx-5"
                      :rotate="-90"
                      :size="95"
                      :width="10"
                      :value="valueThisWeek"
                      color="#e89595"
                    >
                      <h3>{{ valueThisWeek }}</h3>
                    </v-progress-circular>
                    <v-sheet class="gg"
                      ><h4 class="chartTitle mr-16">本週</h4>
                      <p class="subtitle-right text-center mr-2">
                        {{
                          Datecorrect('week', this.alarmDate)[0]
                        }}&nbsp;00:00<br />ǀ<br />{{
                          Datecorrect('week', this.alarmDate)[1]
                        }}&nbsp;24:00
                      </p>
                    </v-sheet>
                  </div>
                  <!-- 圖表4 本月 -->
                  <div class="cheats-cover">
                    <v-progress-circular
                      class="donut1 mx-5"
                      :rotate="-90"
                      :size="95"
                      :width="10"
                      :value="valueThisMonth"
                      color="#828C8F"
                    >
                      <h3>{{ valueThisMonth }}</h3>
                    </v-progress-circular>

                    <v-sheet
                      ><h4 class="chartTitle mr-16">本月</h4>
                      <p class="subtitle-right text-center mr-2">
                        {{
                          Datecorrect('month', this.alarmDate)[0]
                        }}&nbsp;00:00<br />ǀ<br />{{
                          Datecorrect('month', this.alarmDate)[1]
                        }}&nbsp;24:00
                      </p>
                    </v-sheet>
                  </div>
                </div>
                <div>
                  <!-- 日期 -->
                  <v-date-picker
                    v-model="date2"
                    class="date-picker"
                    :event-color="(date) => (date[9] % 2 ? 'red' : 'yellow')"
                    :events="functionEvents"
                    readonly
                    no-title
                    color="#828c8f"
                    width="17em"
                  ></v-date-picker>
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
import * as echarts from 'echarts'
export default {
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
  props: ['id'],
  data: () => ({
    // 警報溫度對話框設置
    dialog: false,
    showMessages: false,
    switch1: false,
    switch2: true,
    // 防止連續get api
    timeOutRefresh: null,
    loader: null,
    loading: false,
    Interval: 0,
    // 右2
    timer: null,
    time: 20,
    // 切換按鈕
    isActive: false,
    // 相機選單(影像)
    cameraList: ['Cam-s1-59 A棟 CS-02配電盤', 'Cam-s1-59 A棟 CS-02配電盤1'],
    selectList: 'Cam-s1-59 A棟 CS-02配電盤1',
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
    reference: [],
    // 右2假數據顯示(待刪)
    temps: [],

    // 右3顯示
    interval: {},
    valueToday: 0,
    valueLastday: 0,
    valueThisWeek: 0,
    valueThisMonth: 0,

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
  }),

  mounted() {
    // jquery-ui
    var te = [
      [1, 2, 3],
      [4, 5, 6],
    ]
    console.log(te)
    const vm = this

    // use "main" socket defined in nuxt.config.js
    vm.socket = this.$nuxtSocket({
      name: 'main', // select "main" socket from nuxt.config.js - we could also skip this because "main" is the default socket
      channel: '//43ea5351-2412-45ac-ad35-f5686a594c15',
    })
    const img = document.getElementById('image')
    const rtspstatus = document.getElementById('rtsp-status')
    const rtspstay = document.getElementById('rtsp-stay')

    var img1 = new Image()
    var ctx = img.getContext('2d')
    img1.onload = function () {
      img.width = this.naturalWidth
      img.height = this.naturalHeight
      // URL.revokeObjectURL(url)
      ctx.drawImage(img1, 0, 0, this.width, this.height)
    }
    img1.src = '/loadingBG.png'

    var stay = 0
    vm.socket.on('connect', () => {
      // rtspstatus.innerHTML = '伺服器已回應，連線已恢復正常，正在重啟程式!'
      clearInterval(this.timeOutRefresh01)
      vm.socket.on('data', (data) => {
        stay = 0
        rtspstatus.classList.add('d-none')
        img1.onload = function () {
          img.width = this.naturalWidth
          img.height = this.naturalHeight
          // URL.revokeObjectURL(url)
          ctx.drawImage(img1, 0, 0, this.width, this.height)
        }
        img1.src = 'data:image/jpeg;base64,' + data
      })
    })
    this.timeOutRefresh02 = setInterval(() => {
      if (stay < 10) {
        rtspstay.classList.add('d-none')
      } else if (stay >= 10 && stay <= 15) {
        rtspstay.classList.remove('d-none')
        // var tmp = 15
        // tmp = tmp - stay
        // rtspstay.innerHTML = '已偵測影像無回應，' + tmp + '秒後將重新啟動程式'
      } else if (stay >= 16) {
        stay = 0
        vm.socket.disconnect()
      }
      stay++
    }, 1000)

    vm.socket.on('disconnect', (reason) => {
      // rtspstatus.innerHTML = '連線出現錯誤!!!'
      // let count = 0
      this.timeOutRefresh01 = setInterval(() => {
        vm.socket.connect()
        // if (count <= 15) {
        //   var tpa = 15 - count
        //   rtspstatus.innerHTML =
        //     '影像處理伺服器已中斷連線，' + tpa + '秒後嘗試與伺服器連線...'
        // } else if (count > 15 && count <= 20) {
        //   rtspstatus.innerHTML = '正在嘗試與伺服器連線中...'
        // } else if (count > 20 && count < 25) {
        //   rtspstatus.innerHTML = '嘗試與伺服器連線失敗...'
        // } else {
        //   count = 0
        // }
      }, 1000)
      img.src = '/loadingBG.png'
      rtspstatus.classList.remove('d-none')
    })

    // let count = 0
    // this.timeOutRefresh01 = setInterval(() => {
    //   vm.socket.volatile.emit('ping', ++count)
    // }, 1000)
    // console.log(this.timeOutRefresh01)

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
    this.timeOutRefresh = window.setInterval(() => {
      if (this.Interval === 0) {
        this.Interval = 1
        this.Refresh()
      }
    }, 1000)
    // this.alarmDate = '2022-06-04'
    this.alarmlist(this.alarmDate)
    setInterval(() => {
      this.alarmlist(this.alarmDate)
    }, 5000)
    this.flashImageLog()
  },
  // 對話框
  computed: {
    messages() {
      return this.showMessages ? ['已開啟'] : ['未開啟']
    },
  },
  methods: {
    // 即時超溫影像紀錄 折線圖
    flashImageLog() {
      var chartDom = document.getElementById('FlashImageLog')
      var myChart = echarts.init(chartDom)
      const colorPalette = ['#37484C', '#9aa2a4', '#d8dddd', '#E6E8E9']
      var option

      option = {
        xAxis: {
          type: 'category',
          data: ['0', '1', '2', '3', '4', '5', '6'],
        },
        tooltip: {
          axisPointer: {
            type: 'cross',
          },
          // triggerOn: 'click', // 触发方式
          // alwaysShowContent:true,   // 鼠标离开区域不消失
          trigger: 'axis',
        },
        yAxis: {
          type: 'value',
        },
        legend: {
          show: true,
          selectedMode: 'multiple', // 設定顯示單一圖例的圖形，點選可切換
          right: 5,
          top: 5,
          textStyle: {
            color: '#666',
            fontSize: 9,
          },
          itemGap: 10,
          inactiveColor: '#ccc',
        },
        series: [
          {
            name: 'spot',
            data: [500, 732, 801, 134, 1590, 1130, 1020],
            type: 'line',
            smooth: true,
          },
          {
            name: 'line',
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true,
          },
        ],
        color: colorPalette,
      }

      option && myChart.setOption(option)
    },
    // 警報列表
    alarmlist(Date1) {
      var selectMonth = new Date(Date1)
      var selectMonth1 = this.Datecorrect('month', selectMonth)
      axios({
        method: 'post',
        url: 'http://127.0.0.1:5000/api/alarm/list',
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify([
          {
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
          this.temps = alarmlist
        })
        .catch((error) => console.log('error from axios', error))
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
    submitForm() {
      const opendid = this.openid
      const opentype = this.opentype
      const status = this.checkbox
      const threshold = this.threshold
      const thisSpots = this.spots
      const thislines = this.tpmedata.line
      const thisscpoes = this.tpmedata.scope
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

        axios({
          method: 'post',
          url: `http://127.0.0.1:5000/api/monitor/object/change/spot`,
          data,
        })
          .then((response) => {
            this.dialog = false
          })
          .catch((error) => console.log('error from axios', error))
      } else if (opentype === 'line') {
        obj = thislines.find((o) => o.line_number === opendid)
        data = {
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
          url: `http://127.0.0.1:5000/api/monitor/object/change/line`,
          data,
        })
          .then((response) => {
            this.dialog = false
          })
          .catch((error) => console.log('error from axios', error))
      } else if (opentype === 'scope') {
        obj = thisscpoes.find((o) => o.scope_number === opendid)
        // console.log(obj)
        data = {
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
          url: `http://127.0.0.1:5000/api/monitor/object/change/scope`,
          data,
        })
          .then((response) => {
            this.dialog = false
          })
          .catch((error) => console.log('error from axios', error))
      }
    },
    // 開啟警報視窗
    opendialog(id, type) {
      this.dialog = true
      this.openid = id
      this.opentype = type
      this.$axios
        .get('http://127.0.0.1:5000/api/monitor/object/data')
        .then((paramse) => {
          // console.log(paramse.data)
          this.tpmedata = paramse.data
          var array = paramse.data
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
          this.dialogdata = obj
        })
        .catch((error) => console.log(error))
    },
    // outputDialog() {

    // },
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
    // 總呼叫程序
    Refresh() {
      this.$axios
        .get('http://127.0.0.1:5000/api/monitor/object/data')
        .then((params) => {
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
          this.spots = params.data.spot
          this.getspot()
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
          this.scopes = params.data.scope
          // console.log(this.scopes)

          this.scope()
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
          this.lines = params.data.line
          this.line()
          // 取得"線"資料 end
        })
        .catch((error) => console.log('error from axios', error))
    },
    // 定義點物件
    getspot() {
      const data = this.spots
      $('.spot').hover(
        function () {
          $(this).children('.spot-span').addClass('hover')
        },
        function () {
          $(this).children('.spot-span').removeClass('hover')
        }
      )
      $('.spot').draggable({
        containment: 'parent',
        stop(event, ui) {
          const id = $(this).attr('data-name')
          const thisdata = data.find((o) => o.spot_number === id)
          // console.log(data)

          var SpotY =
            ui.position.top / document.getElementById('image').offsetHeight
          var SpotX =
            ui.position.left / document.getElementById('image').offsetWidth
          SpotY = SpotY.toFixed(4)
          SpotX = SpotX.toFixed(4)
          var thisSpotData = {
            spot_number: parseInt($(this).attr('data-name')),
            spot_status: '0',
            spot_position: {
              Y: SpotY,
              X: SpotX,
            },
            spot_alarm_status: thisdata.spot_alarm_status,
            spot_threshold: thisdata.spot_threshold,
          }
          put(thisSpotData)
          // console.log(thisSpotData)
        },
      })
      function put(data) {
        axios({
          method: 'post',
          url: `http://127.0.0.1:5000/api/monitor/object/change/spot`,
          data,
        }).catch((error) => console.log('error from axios', error))
      }
      this.Interval = 0
    },
    // POST 新增點物件
    addspot() {
      // window.clearInterval(this.timeOutRefresh)
      const l = this.loader
      this[l] = !this[l]
      setTimeout(() => (this[l] = false), 3000)
      this.loader = null
      this.$axios
        .get('http://127.0.0.1:5000/api/monitor/object/add/spot')
        .then((response) => {
          this.Interval = 0
        })
        .catch((error) => console.log('error from axios', error))
    },
    // POST 刪除點物件
    deletespot(number) {
      // console.log(number)
      var thisSpotData = {
        spot_number: parseInt(number),
        spot_status: '1',
        spot_position: {
          Y: 0.1,
          X: 0.1,
        },
        spot_alarm_status: 0,
        spot_threshold: 20,
      }
      this.$axios
        .post(
          'http://127.0.0.1:5000/api/monitor/object/change/spot',
          thisSpotData
        )
        .then((response) => {
          this.Interval = 0
        })
        .catch((error) => console.log('error from axios', error))
    },
    // POST 新增範圍
    addscope() {
      this.$axios
        .get('http://127.0.0.1:5000/api/monitor/object/add/scope')
        .then((response) => {
          this.Interval = 0
        })
        .catch((error) => console.log('error from axios', error))
    },
    scope() {
      const data = this.scopes
      $('.scope').hover(
        function () {
          $(this).children('.scope-span').addClass('hover')
        },
        function () {
          $(this).children('.scope-span').removeClass('hover')
        }
      )
      $('.scope')
        .draggable({
          containment: 'parent',
          stop(event, ui) {
            // put(thisSpotData)
            var thisName = $(this).attr('data-name')
            const thisdata = data.find((o) => o.scope_number === thisName)
            var thisSize = {
              width: $(this).width() + 2,
              height: $(this).height() + 2,
            }
            var thisScopeData = calculate(
              ui,
              thisName,
              thisSize,
              thisdata.scope_alarm_status,
              thisdata.scope_threshold
            )
            put(thisScopeData)
          },
        })
        .resizable({
          containment: 'parent',
          handles: 'all',
          minWidth: 50,
          minHeight: 50,
          stop(event, ui) {
            var thisName = $(this).attr('data-name')
            const thisdata = data.find((o) => o.scope_number === thisName)
            var thisSize = {
              width: $(this).width() + 2,
              height: $(this).height() + 2,
            }
            var thisScopeData = calculate(
              ui,
              thisName,
              thisSize,
              thisdata.scope_alarm_status,
              thisdata.scope_threshold
            )
            put(thisScopeData)
          },
        })
      function calculate(ui, thisName, thisSize, status, threshold) {
        var scopeltY =
          ui.position.top / document.getElementById('image').offsetHeight
        var scopeltX =
          ui.position.left / document.getElementById('image').offsetWidth
        var scopeBRY =
          (ui.position.top + thisSize.height) /
          document.getElementById('image').offsetHeight
        var scopeBRX =
          (ui.position.left + thisSize.width) /
          document.getElementById('image').offsetWidth
        // scopeltY = scopeltY.toFixed(4)
        // scopeltX = scopeltX.toFixed(4)
        var thisScopeData = {
          scope_number: thisName,
          scope_status: '0',
          scope_position_LT: {
            Y: scopeltY,
            X: scopeltX,
          },
          scope_position_BR: {
            Y: scopeBRY,
            X: scopeBRX,
          },
          scope_alarm_status: status,
          scope_threshold: threshold,
        }
        // console.log(thisScopeData)

        return thisScopeData
      }
      function put(data) {
        axios({
          method: 'post',
          url: `http://127.0.0.1:5000/api/monitor/object/change/scope`,
          data,
        }).catch((error) => console.log('error from axios', error))
      }
      this.Interval = 0
    },
    // POST 刪除範圍物件
    deletescope(index) {
      var thisScopeData = {
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
      axios({
        method: 'post',
        url: `http://127.0.0.1:5000/api/monitor/object/change/scope`,
        data: thisScopeData,
      }).catch((error) => console.log('error from axios', error))
    },
    // POST 線-主程式
    line() {
      var array = this.lines
      array.forEach(function (line) {
        var pointname = '.point' + line.line_number
        var wrapperpointname = 'point' + line.line_number
        var wrapperlinename = 'line' + line.line_number
        var pointhoverclass = '.point_hover' + line.line_number
        $(pointname).hover(
          function () {
            $(pointhoverclass).children('div').addClass('hover')
          },
          function () {
            $(pointhoverclass).children('div').removeClass('hover')
          }
        )
        wrapper(wrapperpointname, wrapperlinename)
        $(pointname).draggable({
          drag(e, ui) {
            wrapper(wrapperpointname, wrapperlinename)
            $(e.target).addClass('point-hover')
          },
          containment: 'parent',
          stop(event, ui) {
            var thisName = $(this).attr('data-name')
            const thisdata = array.find((o) => o.line_number === thisName)
            $(event.target).removeClass('point-hover')
            var classA = '.point' + $(this).attr('data-name')
            var pointAtop = 0
            var pointAleft = 0
            var pointBtop = 0
            var pointBleft = 0
            $(classA).each(function () {
              if ($(this).attr('id') === 'pointA') {
                pointAtop = $(this).position().top
                pointAleft = $(this).position().left
              }
              if ($(this).attr('id') === 'pointB') {
                pointBtop = $(this).position().top
                pointBleft = $(this).position().left
              }
            })
            pointAtop =
              pointAtop / document.getElementById('image').offsetHeight
            pointAleft =
              pointAleft / document.getElementById('image').offsetWidth
            pointBtop =
              pointBtop / document.getElementById('image').offsetHeight
            pointBleft =
              pointBleft / document.getElementById('image').offsetWidth
            var LineData = {
              line_status: '0',
              line_number: $(this).attr('data-name'),
              line_position_point_A: {
                Y: pointAtop,
                X: pointAleft,
              },
              line_position_point_B: {
                Y: pointBtop,
                X: pointBleft,
              },
              line_alarm_status: thisdata.line_alarm_status,
              line_threshold: thisdata.line_threshold,
            }
            put(LineData)
          },
        })
      })
      function put(data) {
        axios({
          method: 'post',
          url: `http://127.0.0.1:5000/api/monitor/object/change/line`,
          data,
        }).catch((error) => console.log('error from axios', error))
      }
      function wrapper(pointname, linename) {
        const point1 = document.getElementsByClassName(pointname)[0]
        const point2 = document.getElementsByClassName(pointname)[1]
        const line = document.getElementsByClassName(linename)[0]
        var getline = getCoordinate(point1, point2, line)
        line.style.width = getline.width + 'px'
        line.style.left = getline.left + 'px'
        line.style.top = getline.top + 'px'
        line.style.transform = 'rotate(' + getline.angleDeg + 'deg)'
      }

      function getCoordinate(point1, point2) {
        var p1 = {
          x: point1.offsetLeft,
          y: point1.offsetTop,
        }
        var p2 = {
          x: point2.offsetLeft,
          y: point2.offsetTop,
        }
        var a = p1.x - p2.x
        var b = p1.y - p2.y
        var length = Math.sqrt(a * a + b * b)
        var angleDeg = (Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180) / Math.PI
        var pointWidth = point1.clientWidth / 2
        var pointHeight = point1.clientWidth / 2
        var array = []
        array.width = length
        array.left = p1.x + pointWidth
        array.top = p1.y + pointHeight
        array.angleDeg = angleDeg
        return array
      }
    },
    // 線-新增程式
    addline() {
      this.$axios
        .get('http://127.0.0.1:5000/api/monitor/object/add/line')
        .then((response) => {
          this.Interval = 0
        })
        .catch((error) => console.log('error from axios', error))
    },
    // 線-刪除程式
    deleteline(index, id) {
      var LineData = {
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
      axios({
        method: 'post',
        url: `http://127.0.0.1:5000/api/monitor/object/change/line`,
        data: LineData,
      }).catch((error) => console.log('error from axios', error))
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
  },
}
</script>
<style scoped>
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
.alarmLogth {
  padding: 0px 0px 0px 10px !important;
}
/* 左右側畫面grid */
.box-2 {
  display: grid;
  grid-template-columns: 52% 48%;
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
  grid-template-columns: 46px 93px 306px 383px;
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
  pointer-events: none;
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
.alarm-btn-icon{
  width: 28px;
    height: 28px;
    background-color: #f2f4f4;
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
.flash-video-and-log {
  display: grid;
  grid-template-columns: 53% 47%;
}
.flash-image-title {
  display: flex;
  color: #80898c;
  align-items: center;
}
.flash-image-title > span {
  font-size: 15px;
}
.flash-image-img {
  display: grid;
  grid-template-columns: 50% 50%;
}
.flash-image-img > div {
  margin: 0 15px 10px 0px;
}
.flash-image-img img {
  width: 100%;
}
/* .rectangle {
  z-index: 99999;
} */
.bgimg {
  position: absolute;
}
</style>
<style>
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

.scope-span > div {
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

.line-span > div {
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

.spot > img {
  max-width: 100%;
}

.spot-span {
  position: absolute;
  bottom: 70%;
  left: 70%;
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

.spot-span > div {
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
</style>