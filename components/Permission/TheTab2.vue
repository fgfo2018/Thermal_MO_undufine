<template>
  <v-container fluid p-0>
    <v-card-title class="px-0 pt-0 pb-4 mx-4" style="color: #80898C">
      <h5>活動紀錄</h5>
    </v-card-title>
    <div class="d-flex justify-space-between">
      <div class="d-flex">
        <div class="custom-ch1">
          <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" label="搜尋 使用者身分、使用者名稱" outlined hide-details
            dense color="#828c8f" style="
                            color: #828c8f;
                            height: 30px;
                            width: 300px;
                          " class="mx-4"></v-text-field>
        </div>
        <div class="custom-ch">
          <v-text-field v-model="date" label="" readonly v-bind="attrs" hide-details outlined v-on="on" dense
            color="#505f62" style="
                            color: #828c8f;
                            height: 30px;
                            width: 200px;
                          ">
            <v-icon slot="prepend" size="25" v-model="date">
              mdi-calendar
            </v-icon>
          </v-text-field>
        </div>
        <div class="px-3 pt-2">~</div>
        <div class="custom-ch">
          <v-text-field v-model="date" label="" readonly v-bind="attrs" hide-details outlined v-on="on" dense
            color="#505f62" style="
                            color: #828c8f;
                            height: 30px;
                            width: 200px;
                            font-size: 16px;
                          ">
            <v-icon slot="prepend" size="25" dense v-model="date">
              mdi-calendar
            </v-icon>
          </v-text-field>
        </div>
      </div>
      <div class="px-6">
        <Pagination :totle="pageCount" width="850px" @toggle="setPage" pagClass="asdas" class="edit_pagination-end" />
      </div>
    </div>
    <v-data-table :search="search" :headers="headers" :items="items" mobile-breakpoint="800" class="elevation-0 mx-6 pt-4"
      :loading="loading ? '#828c8f' : null" loading-text="資料加載中... 請稍後" style="color: #828c8f" hide-default-footer
      :page.sync="page" @page-count="pageCount = $event" :items-per-page="itemsPerPage"></v-data-table>
  </v-container>
</template>

<script>
import Pagination from '../Pagination/OmitPagination.vue'
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      date: '2023-04-28',
      pageCount: 1,
      page: 1,
      itemsPerPage: 13,
      search: null,
      headers: [
        // { text: 'Id', value: 'id' },
        { text: '#', value: 'id', class: 'my-header-style' },
        { text: '使用者身分', value: 'group', class: 'my-header-style' },
        { text: '使用者名稱', value: 'userid', class: 'my-header-style' },
        { text: '時間', value: 'time', class: 'my-header-style' },
        { text: '事件', value: 'event', class: 'my-header-style' },
      ],
      items: []
    }
  },
  mounted() {
    // this.loadItems()
    var ar = []
    for (var i = 1; i < 1000; i++) {
      ar.push({
        id: i,
        group: 'admin',
        userid: 'admin',
        time: '2023-01-01 00:00:00',
        event: '登入'
      })
    }
    this.items = ar
    this.loading = false
  },
  methods: {
    // 分業
    setPage(data) {
      this.page = data
    }
  }
}
</script>
<style>
.custom-ch input {
  font-size: 14px !important;
}
.custom-ch1 label {
  font-size: 14px !important;
}
</style>
<style scoped>
.edit_pagination-end {
  justify-content: end !important;
}
</style>
