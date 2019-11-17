<template>
  <v-app>
    <Loading class="app-loader" :active="longLoading > 0 || loading > 0" />
    <router-view />
    <div class="error-wrapper" v-if="errors.length > 0">
      <v-alert
        v-for="(error, index) in errors"
        v-bind:key="error.msg"
        border="top"
        :color="`${error.type === 'error' ? 'red' : 'orange'} lighten-2`"
        class="error-item"
        dark
        style="display: block"
        @click="removeError(index)"
        ><strong>{{ error.msg }}</strong></v-alert
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
      errors: []
    };
  },
  components: {
    Loading
  },
  computed: mapState(["loading", "longLoading"]),
  mounted() {
    Vue.$globalEvent.$on("httpError", error => {
      console.error(">> httpError <<", error);
      if (error) {
        if (error.status) {
          if (error.showException && error.status === 401) {
            this.$router.push("/login");

            if (error.body && error.body.detail) {
              this.addMessage({
                type: "warning",
                msg: error.body.detail
              });
            } else {
              this.addMessage({
                type: "warning",
                msg: this.$t("GLOBAL.HTTP.ACCESS_DENIED_MESSAGE")
              });
            }
          } else if (error.showException && error.status === 403) {
            this.addMessage({
              type: "warning",
              msg: this.$t("GLOBAL.HTTP.ACCESS_DENIED_MESSAGE")
            });
            this.$router.push("/login");
          } else if (error.showException && error.status === 412) {
            this.addMessage({
              type: "warning",
              msg: this.$t("GLOBAL.HTTP.SESSION_EXPIRED_MESSAGE")
            });
            this.$router.push("/login");
          } else if (error.showException && error.status === 409) {
            this.addMessage({
              type: "warning",
              msg: window.getMessage(error)
            });
          } else if (
            error.showException &&
            error.status === 422 &&
            error.body.errors &&
            error.body.errors.length > 0
          ) {
            for (let i = 0; i < error.body.errors.length; i++) {
              this.addMessage({
                type: "error",
                msg: error.body.errors[i]
              });
            }
          } else if (
            error.showException &&
            (error.status >= 404 && error.status < 500)
          ) {
            this.addMessage({
              type: "error",
              msg: window.getMessage(error)
            });
          } else if (error.status === 400 && error.showException) {
            this.addMessage({
              type: "error",
              msg: window.getMessage(error)
            });
          } else if (error.showException) {
            this.addMessage({
              type: "error",
              msg: window.getMessage(error)
            });
          }
        } else {
          this.addMessage({
            type: "error",
            msg: window.getMessage(error)
          });
        }
      }
    });

    setInterval(() => {
      if (this.errors.length) {
        this.errors = this.errors.filter(message => {
          const now = new Date();
          const prev = new Date(message.date);

          return Math.floor((now.getTime() - prev.getTime()) / 1000) <= 7;
        });
      }
    }, 1000);
  },
  methods: {
    removeError: function(index) {
      this.errors = this.errors.filter((message, ind) => {
        return ind !== index;
      });
    },
    addMessage: function(obj) {
      const addDate = new Date();
      this.errors.push(Object.assign({}, obj, { date: addDate.toUTCString() }));
    }
  }
};
</script>

<style scoped>
.error-wrapper {
  position: absolute;
  width: 70vw;
  max-width: 600px;
  right: 0;
  bottom: 0;
  padding: 5px;
  border-radius: 25%;
}

.error-item {
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
