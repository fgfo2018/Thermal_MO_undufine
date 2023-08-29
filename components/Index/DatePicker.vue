<template>
  <v-container fluid mt-3>
         
    <!-- ------------------------------------------------------------------
    ------------------------------------------------------------------
    ------------------------------------------------------------------ -->
    <v-row>
      <v-col cols="12" md="1">
        <v-row :column="$vuetify.breakpoint.mdAndDown">
          <!-- 左上畫面顯示----------------------------------------------------------------------------------------------- -->
          <!-- <v-col cols="12" lg="12"> -->
          <v-col cols="12" lg="12" style="border: 1px solid red">
          </v-col>

          <!--左下畫面顯示----------------------------------------------------------------------------------------------- -->
          <!-- <v-col cols="12" lg="12"> -->
          <v-col cols="12" lg="12" style="border: 1px solid red">
            
          </v-col>
        </v-row>
      </v-col>

        <v-col cols="12" md="1">
        <v-row :column="$vuetify.breakpoint.mdAndDown">
          <!-- 右上畫面顯示----------------------------------------------------------------------------------------------- -->
          <!-- <v-col cols="12" lg="12"> -->
          <v-col cols="12" lg="12" style="border: 1px solid red">
            
          </v-col>

          <!--右下畫面顯示----------------------------------------------------------------------------------------------- -->
          <!-- <v-col cols="12" lg="12"> -->
          <v-col cols="12" lg="12" style="border: 1px solid red">
            
          </v-col>
        </v-row>
      </v-col>

            <v-col cols="12" md="2">
        <v-row :column="$vuetify.breakpoint.mdAndDown">
          <!-- 左上畫面顯示----------------------------------------------------------------------------------------------- -->
          <!-- <v-col cols="12" lg="12"> -->
          <v-col cols="12" lg="12" style="border: 1px solid red">

              <v-date-picker
        v-model="dates"
        multiple
      ></v-date-picker>
    </v-col>
    <v-col
      cols="12"
      sm="6"
    >
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="dates"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-combobox
            v-model="dates"
            multiple
            chips
            small-chips
            label="Multiple picker in menu"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-combobox>
        </template>
        <v-date-picker
          v-model="dates"
          multiple
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="menu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.menu.save(dates)"
          >
            OK
          </v-btn>
        </v-date-picker>
        </v-menu>

          </v-col>       
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      dates: ['2018-09-15', '2018-09-20'],
      menu: false,
    }),
  }
</script>
