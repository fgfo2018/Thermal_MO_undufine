<template>
  <v-row class="mr-2">
    <v-col cols="3" class="px-1 mx-0">
      <!-- <h3>Draggable 1</h3> -->
      <draggable
        v-bind="dragOptions"
        class="list-group"
        :list="list1"
        group="people"
        @change="log"
      >
        <div class="list-group-item" v-for="n in list1" :key="n.name">
          <v-card class="mb-3" max-width="19em">
            <v-card-title class="py-0 px-2">
              <v-icon small>mdi-bookmark-outline</v-icon>
              <h6 style="font-size: 9px">監測項目: {{ n.item }}</h6>
              <v-spacer />
              <h6 style="font-size: 9px">ID: {{ n.id }}</h6>
              <v-icon small>mdi-arrow-right</v-icon>
            </v-card-title>
            <v-card-text class="py-0">
              <v-img :src="n.img" max-width="15em" class="mx-auto" />
              <div class="d-flex">
                <h6 style="font-size: 9px">元件類別: {{ n.element_type }}</h6>
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
      </draggable>
    </v-col>

    <v-col cols="3" class="px-1 mx-0">
      <!-- <h3>Draggable 2</h3> -->
      <draggable
        v-bind="dragOptions"
        class="list-group"
        :list="list2"
        group="people"
        @change="log"
      >
        <div class="list-group-item" v-for="n in list2" :key="n.name">
          <v-card class="mb-3"  max-width="19em">
            <v-card-title class="py-0 px-2">
              <v-icon small>mdi-bookmark-outline</v-icon>
              <h6 style="font-size: 9px">監測項目: {{ n.item }}</h6>
              <v-spacer />
              <h6 style="font-size: 9px">ID: {{ n.id }}</h6>
              <v-icon small>mdi-arrow-right</v-icon>
            </v-card-title>
            <v-card-text class="py-0">
              <v-img :src="n.img" max-width="15em" class="mx-auto" />
              <div class="d-flex">
                <h6 style="font-size: 9px">元件類別: {{ n.element_type }}</h6>
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
      </draggable>
    </v-col>

    <v-col cols="3" class="px-1 mx-0">
      <!-- <h3>Draggable 3</h3> -->
      <draggable
        v-bind="dragOptions"
        class="list-group"
        :list="list3"
        group="people"
        @change="log"
      >
        <div class="list-group-item" v-for="n in list3" :key="n.name">
          <v-card class="mb-3"  max-width="19em">
            <v-card-title class="py-0 px-2">
              <v-icon small>mdi-bookmark-outline</v-icon>
              <h6 style="font-size: 9px">監測項目: {{ n.item }}</h6>
              <v-spacer />
              <h6 style="font-size: 9px">ID: {{ n.id }}</h6>
              <v-icon small>mdi-arrow-right</v-icon>
            </v-card-title>
            <v-card-text class="py-0">
              <v-img :src="n.img" max-width="15em" class="mx-auto" />
              <div class="d-flex">
                <h6 style="font-size: 9px">元件類別: {{ n.element_type }}</h6>
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
      </draggable>
    </v-col>

    <v-col cols="3" class="px-1 mx-0">
      <!-- <h3>Draggable 4</h3> -->
      <draggable
        v-bind="dragOptions"
        class="list-group"
        :list="list4"
        group="people"
        @change="log"
      >
        <div class="list-group-item" v-for="n in list4" :key="n.name">
          <v-card class="mb-3"  max-width="19em">
            <v-card-title class="py-0 px-2">
              <v-icon small>mdi-bookmark-outline</v-icon>
              <h6 style="font-size: 9px">監測項目: {{ n.item }}</h6>
              <v-spacer />
              <h6 style="font-size: 9px">ID: {{ n.id }}</h6>
              <v-icon small>mdi-arrow-right</v-icon>
            </v-card-title>
            <v-card-text class="py-0">
              <v-img :src="n.img" max-width="15em" class="mx-auto" />
              <div class="d-flex">
                <h6 style="font-size: 9px">元件類別: {{ n.element_type }}</h6>
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
      </draggable>
    </v-col>
    <rawDisplayer class="col-3" :value="list1" title="List 1" />
    <rawDisplayer class="col-3" :value="list2" title="List 2" />
    <rawDisplayer class="col-3" :value="list3" title="List 3" />
    <rawDisplayer class="col-3" :value="list4" title="List 4" />
  </v-row>
</template>
<script>
export default {
  name: 'two-lists',
  display: 'Four Lists',
  order: 1,
  components: {},
  data() {
    return {
      list1: [
        {
          item: 'A棟CS-01配電盤',
          id: '202208290011',
          img: '../In-deep-img/e2.jpg',
          element_type: '接點',
          element_number: '04',
          error_reason: '自體異常',
          capture_time: '2022/08/29 15:00:00',
          max: 30,
          min: 30,
          avg: 30,
        },
        {
          item: 'N/A',
          id: 'N/A',
          img: '../In-deep-img/null.jpg',
          element_type: 'N/A',
          element_number: 'N/A',
          error_reason: 'N/A',
          capture_time: 'N/A',
          max: 'N/A',
          min: 'N/A',
          avg: 'N/A',
        },
      ],
      list2: [
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
          item: 'N/A',
          id: 'N/A',
          img: '../In-deep-img/null.jpg',
          element_type: 'N/A',
          element_number: 'N/A',
          error_reason: 'N/A',
          capture_time: 'N/A',
          max: 'N/A',
          min: 'N/A',
          avg: 'N/A',
        },
      ],
      list3: [
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
          item: 'N/A',
          id: 'N/A',
          img: '../In-deep-img/null.jpg',
          element_type: 'N/A',
          element_number: 'N/A',
          error_reason: 'N/A',
          capture_time: 'N/A',
          max: 'N/A',
          min: 'N/A',
          avg: 'N/A',
        },
      ],
      list4: [
        {
          item: 'N/A',
          id: 'N/A',
          img: '../In-deep-img/null.jpg',
          element_type: 'N/A',
          element_number: 'N/A',
          error_reason: 'N/A',
          capture_time: 'N/A',
          max: 'N/A',
          min: 'N/A',
          avg: 'N/A',
        },
        {
          item: 'N/A',
          id: 'N/A',
          img: '../In-deep-img/null.jpg',
          element_type: 'N/A',
          element_number: 'N/A',
          error_reason: 'N/A',
          capture_time: 'N/A',
          max: 'N/A',
          min: 'N/A',
          avg: 'N/A',
        },
      ],
    }
  },
  methods: {
    add() {
      this.list.push({ name: 'Juan' })
    },
    replace() {
      this.list = [{ name: 'Edgard' }]
    },
    clone(el) {
      return {
        name: el.name + ' cloned',
      }
    },
    log(evt) {
      window.console.log(evt)
    },
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
      }
    },
  },
}
</script>
<style>
.button {
  margin-top: 35px;
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
</style>
