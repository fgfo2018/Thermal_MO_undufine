<template lang="html">
    <div>
    <v-img class="bgimg ma-0" src="/bgimg.png" height="100vh" />
    <v-card class="mx-auto card" width="60em" height="35em" elevation="6">
      <v-row no-gutters>
        <v-col cols="12" md="7">
          <v-row :column="$vuetify.breakpoint.mdAndDown">
            <!-- 左區塊----------------------------------------------------------------------------------------------- -->
            <!-- <v-col cols="12" lg="12"> -->
            <v-col cols="12" lg="12">
              <v-card class="left-card">
                <v-responsive :aspect-ratio="1 / 1">
                  <v-img src="logo-login.png" width="25em" class="logo mx-auto"
                /></v-responsive>
              </v-card>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" md="5">
          <v-row :column="$vuetify.breakpoint.mdAndDown">
            <!-- 右區塊----------------------------------------------------------------------------------------------- -->
            <v-col cols="12" lg="12">
              <v-card class="ma-auto right-card1" flat>
                <v-alert  dense outlined v-if="errorMessage" type="error" show>
                  {{ errorMessage }}
                </v-alert>
              </v-card>
            </v-col>

            <v-col cols="12" lg="12">
              <v-card class="ma-auto right-card2"  flat>
                <!-- <v-responsive :aspect-ratio="1 / 1"> -->
                  <v-text-field
                    class="mx-16 input"
                    v-model="username"
                    color="#051a1f"
                    label="username"
                  ></v-text-field>
                  <v-text-field
                    class="mx-16"
                    v-model="password"
                    color="#051a1f"
                    label="Password"
                    type="password"
                  ></v-text-field>
                  <v-btn
                    dark
                    width=""
                    class="btn mx-16 mt-10"
                    color="#051a1f"
                    @click="login"
                  >
                    Login
                  </v-btn>
                  <div class="text mx-16" style="visibility: hidden;">default :
                  <div class="mx-16" style="visibility: hidden;">admin/admin</div>
                  <div class="mx-16" style="visibility: hidden;">user01/0000</div>
                  <div class="mx-16" style="visibility: hidden;">user02/0000</div>
                  <div class="mx-16" style="visibility: hidden;">user03/0000</div>
                  </div>
                  <!-- <br/><br/><br/> -->
                  <div class="text mx-16">
                    If you forgot your password you need to hard reset THERMAL
                    MO device to the default settings. The default login
                    credentials can be found on a label on the calibration
                    certificate.
                  </div>
                <!-- </v-responsive> -->
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
    </div>
</template>

<script>
export default {
  name: 'LoginPage',
  middleware: ['auth'],
  data() {
    return {
      username: '',
      password: '',
      error: null,
    }
  },
  computed: {
    errorMessage() {
      const { error } = this
      if (!error || typeof error === 'string') {
        return error
      }
      let msg = ''
      if (error.message) {
        msg += error.message
      }
      if (error.errors) {
        msg += `(${JSON.stringify(error.errors)
          .replace(/[{}"[\]]/g, '')
          .replace(/:/g, ': ')
          .replace(/,/g, ' ')})`
      }
      return msg
    },
  },
  layout: 'TheSession',
  mounted() {
    // this.loginx = false
    // if (this.$auth.loggedIn) {
    //   this.$router.replace('/')
    // }else{
    //   this.loginx = true
    // }
  },
  methods: {
    login() {
      this.error = null

      return this.$auth
        .loginWith('local', {
          data: {
            username: this.username,
            password: this.password,
          },
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error(err)
          const responseData = err.response?.data
          this.error = responseData?.error ?? responseData
        })
    },
    localRefresh() {
      this.error = null

      return this.$auth
        .loginWith('localRefresh', {
          data: {
            username: this.username,
            password: this.password,
          },
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error(err)
          this.error = err.response?.data
        })
    },
  },
}
</script>

<style scoped>
.bgimg {
  position: absolute;
  z-index: 0;
  left: 0em;
  top: 0em;
}
.btn {
  width: 12em;
}

.text {
  z-index: 9999;
  font-size: 12px;
  text-align: justify;
  -moz-text-align-last: center;
  text-align-last: left;
  color: #828c8f;
}

.card {
  margin-top: 8em;
}
.left-card {
  background: linear-gradient(to right, #59595b, rgba(5, 26, 31, 1));
  border-radius: 5px 0px 0px 5px;
}

.right-card2 {
  border-radius: 0px 0px 5px 0px;
}
.right-card1 {
  border-radius: 0px 5px 0px 0px;
  height: 2.5em;
}

.logo {
  margin-top: 15em;
}

.input {
  margin-top: 5.5em;
}
</style>
