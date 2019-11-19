<template>
  <v-app>
    <Loading class="app-loader" :active="longLoading > 0 || loading > 0" />
    <router-view />
    <div class="response-wrapper" v-if="responses.length > 0">
      <v-alert
        v-for="(response, index) in responses"
        v-bind:key="`${response.msg}-${index}`"
        border="top"
        :color="
          `${
            response.type === 'error'
              ? 'red'
              : response.type === 'success'
              ? 'green'
              : 'orange'
          } lighten-2`
        "
        class="response-item"
        dark
        style="display: block"
        @click="removeError(index)"
        ><strong>{{ response.msg }}</strong></v-alert
      >
    </div>
  </v-app>
</template>

<script>
import Vue from "vue";
import Loading from "./components/shared/ui/Loading";
import { mapState } from "vuex";

export default {
  data() {
    return {
      responses: [],
    };
  },
  components: {
    Loading,
  },
  computed: mapState(["loading", "longLoading"]),
  mounted() {
    Vue.$globalEvent.$on("httpResponse", response => {
      console.log(">> httpResponse <<", response);
      if (response) {
        if (response.status) {
          if (
            response.showException &&
            response.status >= 200 &&
            response.status < 300
          ) {
            this.addMessage({
              type: "success",
              msg: this.$t("GLOBAL.HTTP.OPERATION_SUCCESS"),
            });
          } else if (response.showException && response.status === 401) {
            this.$router.push("/login");

            if (response.body && response.body.detail) {
              this.addMessage({
                type: "warning",
                msg: response.body.detail,
              });
            } else {
              this.addMessage({
                type: "warning",
                msg: this.$t("GLOBAL.HTTP.ACCESS_DENIED_MESSAGE"),
              });
            }
          } else if (response.showException && response.status === 403) {
            this.addMessage({
              type: "warning",
              msg: this.$t("GLOBAL.HTTP.ACCESS_DENIED_MESSAGE"),
            });
            this.$router.push("/login");
          } else if (response.showException && response.status === 412) {
            this.addMessage({
              type: "warning",
              msg: this.$t("GLOBAL.HTTP.SESSION_EXPIRED_MESSAGE"),
            });
            this.$router.push("/login");
          } else if (response.showException && response.status === 409) {
            this.addMessage({
              type: "warning",
              msg: window.getMessage(response),
            });
          } else if (
            response.showException &&
            response.status === 422 &&
            response.body.errors &&
            response.body.errors.length > 0
          ) {
            for (let i = 0; i < response.body.errors.length; i++) {
              this.addMessage({
                type: "error",
                msg: response.body.errors[i],
              });
            }
          } else if (
            response.showException &&
            (response.status >= 404 && response.status < 500)
          ) {
            if (response.body.errors && response.body.errors.length > 0) {
              for (let i = 0; i < response.body.errors.length; i++) {
                this.addMessage({
                  type: "error",
                  msg: response.body.errors[i],
                });
              }
            } else {
              this.addMessage({
                type: "error",
                msg: window.getMessage(response),
              });
            }
          } else if (response.status === 400 && response.showException) {
            if (response.body.errors && response.body.errors.length > 0) {
              for (let i = 0; i < response.body.errors.length; i++) {
                this.addMessage({
                  type: "error",
                  msg: response.body.errors[i],
                });
              }
            } else {
              this.addMessage({
                type: "error",
                msg: window.getMessage(response),
              });
            }
          } else if (response.showException) {
            if (response.body.errors && response.body.errors.length > 0) {
              for (let i = 0; i < response.body.errors.length; i++) {
                this.addMessage({
                  type: "error",
                  msg: response.body.errors[i],
                });
              }
            } else {
              this.addMessage({
                type: "error",
                msg: window.getMessage(response),
              });
            }
          }
        } else {
          if (response.body.errors && response.body.errors.length > 0) {
            for (let i = 0; i < response.body.errors.length; i++) {
              this.addMessage({
                type: "error",
                msg: response.body.errors[i],
              });
            }
          } else {
            this.addMessage({
              type: "error",
              msg: window.getMessage(response),
            });
          }
        }
      }
    });

    setInterval(() => {
      if (this.responses.length) {
        this.responses = this.responses.filter(message => {
          const now = new Date();
          const prev = new Date(message.date);

          return Math.floor((now.getTime() - prev.getTime()) / 1000) <= 7;
        });
      }
    }, 1000);
  },
  methods: {
    removeError: function(index) {
      this.responses = this.responses.filter((message, ind) => {
        return ind !== index;
      });
    },
    addMessage: function(obj) {
      const addDate = new Date();
      this.responses.push(
        Object.assign({}, obj, { date: addDate.toUTCString() })
      );
    },
  },
};
</script>

<style>
html {
  position: relative;
  min-height: 100%;
}

.response-wrapper {
  position: absolute;
  width: 70vw;
  max-width: 600px;
  right: 0;
  bottom: 0;
  padding: 5px;
  border-radius: 25%;
}

.response-item {
  animation-duration: 0.7s;
  animation-name: slidein;
}

@keyframes slidein {
  from {
    margin-left: 100%;
    width: 300%;
  }

  to {
    margin-left: 0%;
    width: 100%;
  }
}
</style>
