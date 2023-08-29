<template>
  <div class="mini-pagination" :class="pag_class" :style="`width:${width}`">
    <!-- <button :class="prev" @click="pagination('first', '0')">
      <span>第一頁</span>
    </button> -->

    <v-btn :class="prev" @click="pagination('first', '0')" icon x-small>
      <v-icon>mdi-chevron-double-left</v-icon>
    </v-btn>

    <v-btn :class="prev" @click="pagination('Prev', '0')" icon x-small>
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
    <v-btn
    text icon x-small
      v-for="(z, index) in page"
      :key="index"
      class="mini-pagination-btn-number"
      :class="[
        z[1] === 1
          ? 'ustom-pagination-btn-foucs'
          : z[1] === 2
          ? 'pageomit'
          : '',
      ]"
      @click="pagination('setPage', z)"
    >
      <span>{{ z[0] }}</span>
    </v-btn>
    <v-btn :class="next" @click="pagination('next', '0')" icon x-small>
      <v-icon>mdi-chevron-right</v-icon>
    </v-btn>
    <v-btn @click="pagination('last', '0')" :class="next" icon x-small>
      <v-icon>mdi-chevron-double-right</v-icon>
    </v-btn>
    <!-- <button @click="pagination('last', '0')" :class="next">
      <span>最後一頁</span>
    </button> -->
  </div>
</template>

<script>
export default {
  props: ['totle', 'width', 'pag_class'],

  data: () => ({
    // 分頁
    // pagaTotle: 20,
    page: [],
    npage: 1,
    thistotle: 0,
    prev: '', // 上一頁的class
    next: '', // 下一頁的class
    serinv: null,
  }),
  watch: {
    npage(data) {
      this.pageSet(data)
    },
  },
  mounted() {
    if (this.serinv !== null) {
      clearInterval(this.serinv)
    }
    this.serinv = setInterval(() => {
      this.thistotle = this.totle
      this.pagination('setPage', [this.npage])
    }, 1000)
    this.pagination('setPage', [this.npage]) // 初始化選擇第一頁
  },
  methods: {
    refreshComponent() {
      console.log('asdasd')
    },
    pageSet(data) {
      this.$emit('toggle', data)
    },
    // 分頁控制
    pagination(type, data) {
      var totle = this.thistotle // 總數量 這邊由母頁面傳入
      var setpage = 1
      var tmp = this.npage
      if (type === 'setPage') {
        setpage = data[0]
      } else if (type === 'first') {
        setpage = 1
      } else if (type === 'Prev') {
        setpage = tmp - 1
      } else if (type === 'next') {
        setpage = tmp + 1
      } else if (type === 'last') {
        setpage = totle
      }
      this.npage = setpage
      if (setpage === 1) {
        this.prev = 'mini-pagination-btn-disable'
      } else {
        this.prev = ''
      }
      if (setpage === totle) {
        this.next = 'mini-pagination-btn-disable'
      } else {
        this.next = ''
      }
      // this.page  // 當前分頁
      // var view = 5
      // this.$emit('setpage', setpage)

      var arr = []
      var te = true
      var te1 = true
      for (var i = 1; i <= totle; i++) {
        var tmp1 = 0
        var tmp2 = 0
        if (setpage <= 2) {
          tmp1 = Math.abs(setpage - 3)
        }
        if (totle - setpage - 2 < 0) {
          tmp2 = Math.abs(totle - setpage - 2)
        }
        // if (i > setpage - (3 + tmp2) && i < setpage + (3 + tmp1)) {
        if (setpage > 3 && te === true && totle > 5) {
          arr.push([1, 0])
          if (totle > 6) {
            arr.push(['...', 2])
          }
          te = false
        }
        if (i > setpage - (3 + tmp2) && i < setpage + (3 + tmp1)) {
          // if (i > setpage - 3 && i < setpage + 3) {
          // console.log(i)

          if (i === setpage) {
            arr.push([i, 1])
          } else {
            arr.push([i, 0])
          }
        }
      }
      if (setpage < totle - 2 && te1 === true && totle > 5) {
        if (totle > 6) {
          arr.push(['...', 2])
        }
        arr.push([totle, 0])
        te1 = false
      }
      this.page = arr
      // console.log(type, setpage)
    },
  },
}
</script>

<style>
.mini-pagination {
  /* display: grid;
  padding: 0 0 0 4px;
  grid-template-columns: 60px 60px 40px 40px 40px 40px 40px 60px 69px; */
  display: flex;
  justify-content: center;
}
.mini-pagination span {
  user-select: none;
  pointer-events: none;
}
.mini-pagination > button {
  color: #4f5e62;
  outline: 1px rgba(0, 0, 0, 0.12) solid;
  font-size: 9px;
  margin: 0px 3px;
  text-align: center;
  padding: 4px 5.5px;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s;
  width:20px;
    height:20px;

}
.mini-pagination > button:hover {
  background-color: #dadada;
}
.mini-pagination > button:active {
  background-color: #aaaaaa;
}
.mini-pagination > button.mini-pagination-btn-disable {
  cursor: no-drop;
  background-color: unset !important;
  pointer-events: none;
  opacity: 0.5;
}
.ustom-pagination-btn-foucs {
  background-color: #f0f2f3;
  color: #4f5e62;
  outline: 1px #4f5e62 solid !important;
  pointer-events: none;
}
.mini-pagination-btn-number {
  padding: 8px 0px !important;
  width: 38px;
}
.pageomit {
  outline: unset !important;
  font-size: 19px !important;
  font-weight: 600;
  pointer-events: none;
}
</style>
