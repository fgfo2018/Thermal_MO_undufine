<template>
  <!-- // 可能改用swiper去寫 -->

  <div id="app" class="container">
    <div class="row">
      <div class="col-md-12">
        <div
          class="swiper-container"
          style="max-height: 500px; background-color: red"
        >
          <div class="swiper-wrapper timeline">
            <div class="swiper-slide" v-for="n in list1" :key="n">
              <div class="timestamp"></div>
              <div class="status">
                <span>{{ n.null }}</span>

                <v-card
                  class="mb-3"
                  :style="backgroundStyles(n.img)"
                  height="500px"
                >
                  <v-card-title class="py-0 px-2">
                    <v-icon dark small>mdi-bookmark-outline</v-icon>
                    <h6 style="color: white; font-size: 9px">
                      監測項目: {{ n.item }}
                    </h6>
                    <v-spacer />
                    <h6 style="color: white; font-size: 9px">ID: {{ n.id }}</h6>
                    <v-icon small dark>mdi-arrow-right</v-icon>
                  </v-card-title>
                  <v-card-text class="py-0">
                    <!-- <v-img :src="n.img" max-width="15em" class="mx-auto" /> -->
                    <div class="d-flex">
                      <h6 style="font-size: 9px">
                        元件類別: {{ n.element_type }}
                      </h6>
                      <v-spacer />
                      <h6>MAX: {{ n.max }} °C</h6>
                    </div>
                    <div class="d-flex">
                      <h6>元件編號: {{ n.element_number }}</h6>
                      <v-spacer />
                      <h6>MIN: {{ n.min }} °C</h6>
                    </div>

                    <div class="d-flex">
                      <h6>異常原因: {{ n.error_reason }}</h6>
                      <v-spacer />
                      <h6>AVG: {{ n.avg }} °C</h6>
                    </div>

                    <h6>擷取時間: {{ n.capture_time }}</h6>
                  </v-card-text>
                </v-card>
              </div>
            </div>
          </div>
          <!-- Add Pagination -->
          <div class="swiper-pagination"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  components: {},
  data() {
    const data = [
      {
        item: 'A棟CS-01配電盤',
        id: '202208290011',
        img: '../In-deep-img/e1.jpg',
        element_type: '接點',
        element_number: '04',
        error_reason: '自體異常',
        capture_time: '2022/08/29 15:00:00',
        max: 30,
        min: 30,
        avg: 30,
      },
      { dateLabel: 'February 2017', title: 'Planning' },
      { dateLabel: 'March 2017', title: 'Design' },
      { dateLabel: 'April 2017', title: 'Content Writing and Assembly' },
      { dateLabel: 'May 2017', title: 'Coding' },
      { dateLabel: 'June 2017', title: 'Testing, Review & Launch' },
      { dateLabel: 'July 2017', title: 'Maintenance' },
    ]
    return {
      steps: data,

      list1: [
        {
          item: 'A棟CS-01配電盤',
          id: '202208290011',
          img: '../In-deep-img/e1.jpg',
          element_type: '接點',
          element_number: '04',
          error_reason: '自體異常',
          capture_time: '2022/08/29 15:00:00',
          max: 30,
          min: 30,
          avg: 30,
        },
        {
          item: 'A棟CS-01配電盤',
          id: '202208290011',
          img: '../In-deep-img/e1.jpg',
          element_type: '接點',
          element_number: '04',
          error_reason: '自體異常',
          capture_time: '2022/08/29 15:00:00',
          max: 30,
          min: 30,
          avg: 30,
        },
        {
          item: 'A棟CS-01配電盤',
          id: '202208290011',
          img: '../In-deep-img/e1.jpg',
          element_type: '接點',
          element_number: '04',
          error_reason: '自體異常',
          capture_time: '2022/08/29 15:00:00',
          max: 30,
          min: 30,
          avg: 30,
        },
        {
          item: 'A棟CS-01配電盤',
          id: '202208290011',
          img: '../In-deep-img/e1.jpg',
          element_type: '接點',
          element_number: '04',
          error_reason: '自體異常',
          capture_time: '2022/08/29 15:00:00',
          max: 30,
          min: 30,
          avg: 30,
        },
        {
          item: 'A棟CS-01配電盤',
          id: '202208290011',
          img: '../In-deep-img/e1.jpg',
          element_type: '接點',
          element_number: '04',
          error_reason: '自體異常',
          capture_time: '2022/08/29 15:00:00',
          max: 30,
          min: 30,
          avg: 30,
        },
        {
          item: 'A棟CS-01配電盤',
          id: '202208290011',
          img: '../In-deep-img/e1.jpg',
          element_type: '接點',
          element_number: '04',
          error_reason: '自體異常',
          capture_time: '2022/08/29 15:00:00',
          max: 30,
          min: 30,
          avg: 30,
        },
        {
          item: 'A棟CS-01配電盤',
          id: '202208290011',
          img: '../In-deep-img/e1.jpg',
          element_type: '接點',
          element_number: '04',
          error_reason: '自體異常',
          capture_time: '2022/08/29 15:00:00',
          max: 30,
          min: 30,
          avg: 30,
        },
        {
          item: 'A棟CS-01配電盤',
          id: '202208290011',
          img: '../In-deep-img/e1.jpg',
          element_type: '接點',
          element_number: '04',
          error_reason: '自體異常',
          capture_time: '2022/08/29 15:00:00',
          max: 30,
          min: 30,
          avg: 30,
        },
        {
          item: 'A棟CS-01配電盤',
          id: '202208290011',
          img: '../In-deep-img/e1.jpg',
          element_type: '接點',
          element_number: '04',
          error_reason: '自體異常',
          capture_time: '2022/08/29 15:00:00',
          max: 30,
          min: 30,
          avg: 30,
        },
      ],

      swiperOption: {
        autoplay: true, // 可选选项，自动滑动
      },
    }
  },
  methods: {
    backgroundStyles(image) {
      return {
        // any other styles you might need to add on as an example
        'background-image': `url(${image})`,
        'background-repeat': 'no-repeat',
        'background-size': '100px 100px',
      }
    },
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    },
  },
  mounted() {
    this.swiper = new Swiper('.swiper-container', {
      // pagination: '.swiper-pagination',
      slidesPerView: 4,
      paginationClickable: true,
      grabCursor: true,
      nextButton: '.next-slide',
      prevButton: '.prev-slide',
    })

    // 使用vue插件封装过后语法vue-awesome-swiper，使用的是swiper6  则是使用swiper的语法写
    // console.log('直接获取swiper', this.swiper)
  },
}
</script>

<style scoped lang="scss">
body {
  background: #e8eeff;
}
#app {
  // padding: 50px 0;
}
.timeline {
  margin: 50px 0;
  list-style-type: none;
  display: flex;
  padding: 0;
  text-align: center;
}
.timeline li {
  transition: all 200ms ease-in;
}
.timestamp {
  width: 250px;
  margin-bottom: 20px;
  padding: 0px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 100;
}
.status {
  padding: 0px 40px;
  display: flex;
  justify-content: center;
  border-top: 4px solid #414141;
  position: relative;
  transition: all 200ms ease-in;
}

.status span {
  font-weight: 600;
  padding-top: 20px;
}
.status span:before {
  content: '';
  width: 10px;
  height: 10px;
  background-color: #e8eeff;
  border-radius: 25px;
  border: 4px solid #2e2e2e;
  position: absolute;
  top: -11px;
  left: 42%;
  transition: all 200ms ease-in;
}
.swiper-control {
  text-align: right;
}

.swiper-container {
  width: 100%;
  height: 1000px;
  margin: 50px 0;
  overflow: hidden;
  padding: 0 20px 30px 20px;
}
.swiper-slide {
  width: 200px;
  text-align: center;
  font-size: 18px;
}
.swiper-slide:nth-child(2n) {
  width: 40%;
}
.swiper-slide:nth-child(3n) {
  width: 20%;
}
</style>
