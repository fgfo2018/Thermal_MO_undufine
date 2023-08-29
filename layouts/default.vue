<template>
  <div @contextmenu="clickRight">
    <v-app>
      <v-app-bar app color="" style="
                    background: linear-gradient(
                      to right,
                      rgba(89, 89, 91, 1),
                      rgba(5, 26, 31, 1)
                    );
                  " dark>
        <img class="mr-16 logo" alt="logo" src="/logo.png" width="125em" />
        <!-- <v-avatar color="" size="32"></v-avatar> -->
        <v-tabs color="white" v-model="tabValue">
          <template v-for="(item, i) in items">
            <!-- <template v-if=""></template> -->
            <v-tab :key="i" v-if="item.permission && item.title !== '歷史監測'" :to="item.to" router
              :disabled="$route.name === 'index' && item.to === '/'">
              <v-icon small>{{ item.icon }}</v-icon>
              <p>&nbsp;&nbsp;</p>
              {{ item.title }}
            </v-tab>
            <v-tab :key="i" v-else-if="item.permission && item.title === '歷史監測'"
              :to="item.to + '?cam=' + $route.query.cam + '&main=' + $route.query.main + '&secondary=' + $route.query.secondary + '&tab=tab-1'"
              router :disabled="tabDisabled">
              <v-icon small>{{ item.icon }}</v-icon>
              <p>&nbsp;&nbsp;</p>
              {{ item.title }}
            </v-tab>
          </template>
        </v-tabs>
        <!-- <v-btn class="ml-2 mr-3" small depressed @click="openGroupWindow">
          <v-img src="/widgets_FILL0_wght600_GRAD0_opsz40.png" :max-width="23"></v-img>
        </v-btn> -->
        <h4 class="subtitle">{{ $auth.user.name }}</h4>
        <v-btn class="mr-1" small depressed @click="$auth.logout()">
          <v-img src="/Group 3797.png" :max-width="23"></v-img>
        </v-btn>
      </v-app-bar>
      <v-main>
        <nuxt-child>
          <Nuxt />
        </nuxt-child>
      </v-main>
    </v-app>
    <div id="groupwindow-open-icon" class="groupwindow-open-icon" @click="openGroupWindow" @mousedown="tdown"
      @mouseup="tup">
      <v-img src="/images/meun-multiscreen/Group 4287.png"></v-img>
    </div>
    <div id="groupwindow" :style="groupWindow ? '' : 'pointer-events: none;visibility: hidden;'"
      @mouseover="hoverwindow('mouseover')" @mouseout="hoverwindow('mouseout')">
      <div id="move-bar"></div>
      <div class="groupwindow-header d-flex">
        <div class="groupwindow-title">元件類型總覽</div>
        <div class="groupwindow-control"></div>
      </div>
      <div class="groupwindow-content">
        <div v-for="(item, index) in GroupNameitems" :key="index" class="groupwindow-card">
          <div class="groupwindow-icon" :class="item.focusStatus ? 'groupwindow-icon-focus' : ''"
            :id="filtrations(hovergName, item.value) ? 'groupwindow-icon-oy' : ''" @click="moveGroupName('click', item)"
            @mouseover="moveGroupName('mouseover', item)" @mouseout="moveGroupName('mouseout', item)">
            <v-img :src="item.img" max-width="23" class="none1e" ontent-class="none1e1"></v-img>
          </div>
          <div class="groupwindow-btn-list-cover">
            <div class="groupwindow-btn-list">
              <div v-for="(item1, index1) in item.groupid" :key="index1" class="groupwindow-btn"
                :class="item1.focusStatus ? 'groupwindow-btn-focus' : ''"
                :id="filtrations(hovergId, item1.value) && filtrations(hovergName, item.value) ? 'groupwindow-icon-oy' : ''"
                @click="moveGroupId('click', item, item1)" @mouseover="moveGroupId('mouseover', item, item1)"
                @mouseout="moveGroupId('mouseout', item, item1)">
                {{
                  item1.value
                }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      tabValue: 0,
      focusTemp: null,
      tabDisabled: true,
      loader: null,
      loading: false,
      hovergName: null,
      hovergId: null,
      items: [
        {
          icon: 'mdi-tablet',
          title: '即時監控',
          to: '/',
          permission: this.$auth.hasScope('viewer'),
        },
        {
          icon: 'mdi-clipboard-text-clock',
          title: '歷史監測',
          to: 'HistoricalMonitoringPage',
          permission: this.$auth.hasScope('viewer'),
        },
        {
          icon: 'mdi-google-analytics',
          title: '數據蒐集狀況監測',
          to: 'DataScrapingPage',
          permission: this.$auth.hasScope('user'),
        },
        {
          icon: 'mdi-cog',
          title: '設定',
          to: 'SetupPage',
          permission: this.$auth.hasScope('user'),
        },
        {
          icon: 'mdi-floor-plan',
          title: '深度分析',
          to: 'In-depthAnalysis',
          // to: 'DeepLearningPage',
          permission: this.$auth.hasScope('louis'),
        },
        {
          icon: 'mdi-table-arrow-down',
          title: '智慧報表',
          to: '建置中，恕無法訪問 ',
          // to: 'SmartReportsPage',
          permission: this.$auth.hasScope('louis'),
        },
        {
          icon: 'mdi-account-group-outline',
          title: '權限管理',
          // to: '5',
          to: 'PermissionPage',
          permission: this.$auth.hasScope('admin'),
        },
        {
          icon: 'mdi-tablet',
          title: '點溫系統',
          // to: '5',
          to: 'SpotTemperatureSystemPage',
          permission: this.$auth.hasScope('admin'),
        },
        // {
        //   icon: 'mdi-account-group-outline',
        //   title: '多畫面test',
        //   // to: '5',
        //   to: 'ForTesting9-5',
        //   permission: this.$auth.hasScope('louis'),
        // },
        // {
        //   icon: 'mdi-account-group-outline',
        //   title: '多邊形test',
        //   // to: '5',
        //   to: 'ForTesting9-6',
        //   permission: this.$auth.hasScope('louis'),
        // },
        {
          icon: 'mdi-account-group-outline',
          title: 'websocket',
          // to: '5',
          to: 'ForTesting9-websocket',
          permission: this.$auth.hasScope('louis'),
        },
        {
          icon: 'mdi-account-group-outline',
          title: 'konva',
          // to: '5',
          to: 'Demovue_konva',
          permission: this.$auth.hasScope('louis'),
        },
        {
          icon: 'mdi-account-group-outline',
          title: 'Streaming',
          // to: '5',
          to: 'Streaming_canvas',
          permission: this.$auth.hasScope('louis'),
        },
        {
          icon: 'mdi-account-group-outline',
          title: 'pixi',
          // to: '5',
          to: 'TestPixi',
          permission: this.$auth.hasScope('louis'),
        },
        // {
        //   icon: 'mdi-account-group-outline',
        //   title: 'API動態測試(南部)',
        //   // to: '5',
        //   to: 'ForTesting11',
        // },

        {
          icon: 'mdi-account-group-outline',
          title: '設定測試',
          // to: '5',
          to: 'ForTestingR1',
          permission: this.$auth.hasScope('ray'),
        },

        {
          icon: 'mdi-account-group-outline',
          title: 'API動態測試(後端)',
          // to: '5',
          to: 'ForTesting12',
          permission: this.$auth.hasScope('ray'),
        },
        {
          icon: 'mdi-account-group-outline',
          title: 'API靜態測試(後端)',
          // to: '5',
          to: 'ForTesting13',
          permission: this.$auth.hasScope('ray'),
        },
        {
          icon: 'mdi-account-group-outline',
          title: 'line',
          // to: '5',
          to: 'ForTesting9-7',
          permission: this.$auth.hasScope('ray'),
        },
        {
          icon: 'mdi-account-group-outline',
          title: 'lineLouis',
          // to: '5',
          to: 'ForTesting9-6',
          permission: this.$auth.hasScope('ray'),
        },
        {
          icon: 'mdi-account-group-outline',
          title: '單機',
          // to: '5',
          to: 'index_multi2',
          permission: this.$auth.hasScope('ray'),
        },
        // {
        //   icon: 'mdi-chart-bubble',
        //   title: 'Inspire',
        //   to: '/inspire',
        // },
      ],
      cam: null,
      main: null,
      secondary: null,
      groupWindow: false, // 預設false
      GroupNameitems: [],
      GroupName: '',
      int0001: null,
      // focusGroupName: null,
      // focusGroupId: null
      // testW4: null,
    }
  },
  mounted() {
    // var ze = 15
    // setInterval(() => {
    //   console.log(`剩餘${ze}秒，將自動重新啟動`);
    //   if (ze === 0) {
    //     window.open(window.location.href, '_blank');
    //     setTimeout(() => {
    //       window.close()
    //     }, 10)
    //   }
    //   ze--
    // }, 1000)
    var groupWindow = document.getElementById('groupwindow')
    if (this.int0001 !== null) {
      clearInterval(this.int0001)
      this.int0001 = null
    }
    var div = document.getElementById('groupwindow-open-icon')
    var tee = true
    var wwwc = true
    var star = false
    this.int0001 = setInterval(() => {
      this.handleGroup()
      var ed = 0
      if (this.$route.query.tab === 'tab-2' && this.$route.name === 'index' && ed === 1) {
        var loction = document.getElementById('Live-canvas-loction')
        loction = loction.getBoundingClientRect()
        div.style.top = (loction.y - 18) + 'px'
        div.style.left = (loction.x - 65) + 'px'
        if (wwwc) {
          groupWindow.style.top = (div.getBoundingClientRect().y + (div.getBoundingClientRect().height / 2)) + 'px'
          groupWindow.style.left = (div.getBoundingClientRect().x - (groupWindow.getBoundingClientRect().width)) + 'px'
        }
        loction = null
        if (tee) {
          if (this.groupWindow === false) {
            // this.groupWindow = true
          }
        }
        tee = false
        star = true
      } else {
        div.style.top = "90%"
        div.style.left = "95%"
        tee = true
        if (star) {
          this.groupWindow = false
          star = false
        }
      }
    }, 1000)
    console.log(this.int0001);
    // this.GroupNameitems = this.$userMaim.groupList().list
    // this.GroupName = this.$userMaim.groupList().select
    // group window 拖動
    var window1 = document.body
    var divtemppostion = {
      x: 0,
      y: 0
    }
    var templocation = {
      x: 0,
      y: 0
    }
    window1.addEventListener("mousedown", (e) => {
      templocation.x = e.clientX
      templocation.y = e.clientY
    })
    window1.addEventListener("mousemove", (e) => {
      if (this.focusTemp !== null) {
        var nl = {
          x: templocation.x - e.clientX,
          y: templocation.y - e.clientY
        }
        this.focusTemp.style.left = (divtemppostion.x - nl.x) + 'px'
        this.focusTemp.style.top = (divtemppostion.y - nl.y) + 'px' // 限制只能左右移動
      }
    })
    var moveBar = document.getElementById('move-bar')
    moveBar.addEventListener('mousedown', (e) => {
      wwwc = false
      this.focusTemp = groupWindow
      // console.log(groupWindow.getBoundingClientRect());
      divtemppostion.x = groupWindow.getBoundingClientRect().x;
      divtemppostion.y = groupWindow.getBoundingClientRect().y;
    })
    moveBar.addEventListener("mouseup", (e) => {
      this.focusTemp = null
    })
    // end
    if (this.$route.query.cam !== undefined) {
      this.tabDisabled = false;
    } else {
      this.tabDisabled = true;
    }
  },
  methods: {
    hoverwindow(type) {
      if (type === 'mouseover') {
        this.$store.dispatch('myData/incrementAsync', {
          type: 'mouseoverWindwos', params: true
        });
      } else {
        this.$store.dispatch('myData/incrementAsync', {
          type: 'mouseoutWindwos', params: false
        });
      }
    },
    tdown(e) {
      console.log("down");
    },
    tup() {
      console.log("up");
    },
    filtrations(x, y) {
      if (x === null) {
        x = undefined
      }
      if (y === null) {
        y = undefined
      }
      if (x !== undefined && y !== undefined) {
        return (x).toString() === (y).toString()
      } else {
        return false
      }
    },
    handleGroup() {
      if (Object.keys(this.$store.state.myData.params.historicalGroup).length === 0) {
        // console.log("ssssssss", Object.keys(this.$store.state.myData.params.historicalGroup).length);
        if (this.$store.state.myData.params.hover !== undefined) {
          this.hovergName = this.$store.state.myData.params.hover.gName
          this.hovergId = this.$store.state.myData.params.hover.gId
        }
      }
      var cam = this.$route.query.cam
      var params = this.$store.state.myData.params
      var groupList = null
      if (Object.keys(this.$store.state.myData.params.historicalGroup).length === 0) {
        groupList = this.$myPlugin.getRoiGroupList()
        groupList = groupList[cam]
      } else {
        groupList = this.$store.state.myData.params.historicalGroup
      }
      // console.log("群組" ,groupList);
      var arr = []
      Object.keys(groupList).forEach((key) => {
        var find = this.$userMaim.groupList().list.find((item) => (item.value).toString() === (key).toString())
        find.focusStatus = false
        if (params.lockedRoiTable !== undefined) {
          var findGroupName = params.lockedRoiTable.find((item) => (item.group_name).toString() === (key).toString())
          if (findGroupName !== undefined) {
            find.focusStatus = true
          }
          findGroupName = null
        }
        var groupId = []
        var len = groupList[key].length
        for (var i = 0; i < len; i++) {
          var groupIdStatus = false
          if (params.lockedRoiTable !== undefined) {
            var findGroupid = params.lockedRoiTable.find((item) => { return (item.group_name).toString() === (key).toString() && (item.group_id).toString() === (groupList[key][i]).toString() })
            if (findGroupid !== undefined) {
              groupIdStatus = true
            }
            findGroupid = null
          }
          groupId.push({
            value: groupList[key][i],
            focusStatus: groupIdStatus
          })
          groupIdStatus = null
        }
        find.groupid = groupId
        arr.push(find)
        groupId = null
        len = null
        find = null
      })
      this.GroupNameitems = arr
      arr = null
      cam = null
      params = null
      groupList = null
    },
    moveGroupName(type, e) {
      var arr = {
        groupName: undefined,
        groupId: undefined,
        out: false
      }
      arr.groupName = e.value
      if (type === 'click') {
        // console.log(arr);
        this.$store.dispatch('myData/incrementAsync', { type: 'clickWindowsGroup', params: arr });
      } else if (type === 'mouseover') {
        this.$store.dispatch('myData/incrementAsync', { type: 'hoverWindowsGroup', params: arr });
      } else if (type === 'mouseout') {
        arr.out = true
        this.$store.dispatch('myData/incrementAsync', {
          type: 'hoverWindowsGroup', params: arr
        });
      }
      arr = null
      // var router1 = this.$route
      // var params = router1.params
      // params.windowSelect = [e.value, null]
      // setTimeout(() => {
      //   this.$router.push({
      //     query: {
      //       cam: router1.query.cam,
      //       main: router1.query.main,
      //       secondary: router1.query.secondary,
      //       tab: 'tab-2',
      //       push: this.generateRandomString(20)
      //     },
      //     params
      //   })
      // }, 1)
    },
    moveGroupId(type, name, e) {
      var arr = {
        groupName: undefined,
        groupId: undefined,
        out: false
      }
      arr.groupName = name.value
      arr.groupId = e.value
      if (type === 'click') {
        this.$store.dispatch('myData/incrementAsync', { type: 'clickWindowsGroup', params: arr });
      } else if (type === 'mouseover') {
        this.$store.dispatch('myData/incrementAsync', { type: 'hoverWindowsGroup', params: arr });
      } else if (type === 'mouseout') {
        arr.out = true
        this.$store.dispatch('myData/incrementAsync', {
          type: 'hoverWindowsGroup', params: arr
        });
      }
      arr = null
    },
    openGroupWindow(e) {
      this.groupWindow = !this.groupWindow
      // console.log(this.$userMaim.groupList("test"));
      // console.log(this.$route);
      var object = e.currentTarget
      object = object.getBoundingClientRect();
      var groupWindow = document.getElementById('groupwindow')
      var groupWindowClientRect = groupWindow.getBoundingClientRect();
      var ed = 0
      if (this.$route.query.tab === 'tab-2' && this.$route.name === 'index' && ed === 1) {
        groupWindow.style.left = (object.x - groupWindowClientRect.width) + 'px'
        groupWindow.style.top = (object.y + 50) + 'px'
      } else {
        groupWindow.style.left = (object.x - groupWindowClientRect.width) + 'px'
        groupWindow.style.top = (object.y - groupWindowClientRect.height) + 'px'
      }
      object = null
      groupWindow = null
      groupWindowClientRect = null
    },
    clickRight(e) {
      // console.log('clickRight')
      // e.preventDefault()
    },
    // 隨機亂數產生
    generateRandomString(length) {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let randomString = '';
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters[randomIndex];
      }
      return randomString;
    },
  },
  // 登出
  watch: {
    '$route.name': {
      handler(newValue) {
        // console.log('xx1', newValue);
        // 修正tabs不會改變焦點問題
        if (newValue === 'index') {
          this.tabValue = '/'
        } 
        // else if (newValue === 'HistoricalMonitoringPage') {
        //   this.tabValue = 'HistoricalMonitoringPage'
        // }
      }
    },
    // tabValue(to) {
    //   console.log("xx", to);
    // },
    '$store.state.myData.params.hover': {
      handler(newValue) {
        this.handleGroup()
        // console.log("被觸發(default hover)", newValue);
      }
    },
    '$store.state.myData.params.lockedRoiTable': {
      handler(newValue) {
        this.handleGroup()
        // console.log("被觸發(default lockedRoiTable)", newValue);
      }
    },
    $route(to, from) {
      // this.handleGroup()

      // console.log("asd", this.$route.query)
      // console.log('url changed', to.query.cam, from)
      this.cam = to.query.cam
      this.main = to.query.main
      this.secondary = to.query.secondary
      // if (to.query.group !== undefined) {
      //   this.focusGroupName = to.query.group
      // } else {
      //   this.focusGroupName = null
      // }
      // if (to.query.groupid !== undefined) {
      //   this.focusGroupId = to.query.groupid
      // } else {
      //   this.focusGroupId = null
      // }
      if (to.query.cam !== undefined) {
        this.tabDisabled = false;
      } else {
        this.tabDisabled = true;
      }
    },
    loader() {
      var l = this.loader
      this[l] = !this[l]

      var timeout = setTimeout(() => (this[l] = false), 3000)
      console.log(timeout)
      this.loader = null
      timeout = null
      l = null
    },
  },
  beforeDestroy() {
    if (this.int0001 !== null) {
      clearInterval(this.int0001)
      this.int0001 = null
    }
  }
}
</script>
<style scoped>
#groupwindow {
  user-select: none;
  position: fixed;
  top: 90%;
  left: 95%;
  z-index: 99;
  width: 205px;
  min-width: 190px;
  min-height: 100px;
  background-color: rgb(97 104 107 / 61%);
  backdrop-filter: blur(7px);
  border-radius: 5px;
  color: #fff;
  font-size: 14px;
  padding: 12px;
  /* transition: all 0.3s; */
}

#move-bar {
  cursor: move;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 30px;
}

.groupwindow-card {
  display: flex;
  margin-top: 8px;
}

.groupwindow-content {
  /* margin-top: 8px; */
  display: flex;
  flex-wrap: wrap;
}

.groupwindow-btn-list-cover {
  width: 146px;
  overflow-y: hidden;
}

.none1e {
  pointer-events: none;
}

.groupwindow-btn-list {
  display: flex;
  margin-left: 0.35em;
  width: fit-content;
}

.groupwindow-open-icon {
  position: fixed;
  top: 90%;
  left: 95%;
  z-index: 999;
  cursor: pointer;
  transition: all 0.3s;
  width: 49px;
}

.groupwindow-open-icon:hover {
  transform: scale(1.3);
}



.groupwindow-icon {
  opacity: 0.3;
  cursor: pointer;
  width: 40px;
  height: 40px;
  background: #fff;
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.groupwindow-icon:hover {
  opacity: 0.5;
}



.groupwindow-btn {
  opacity: 0.3;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 40px;
  border: 1px #fff solid;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.35em;
}

.groupwindow-btn:hover {
  opacity: 0.5;
}

.groupwindow-btn-focus {
  /* background: rgba(25, 249, 249, 0.2) */
  opacity: 1 !important;
}

#groupwindow-icon-oy {
  opacity: 0.5;
}

.groupwindow-icon-focus {
  /* background: rgb(25, 249, 249); */
  opacity: 1 !important;
}
</style>
<style>
.groupwindow-open-icon div {
  background-size: 120% !important;
}
</style>
