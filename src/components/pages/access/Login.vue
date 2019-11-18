<template>
  <div class="application-wrapper">
    <v-container class="form-wrapper elevation-2">
      <v-form id="app" class="form" ref="loginForm" @submit="onLogin">
        <v-container fluid>
          <v-layout column>
            <v-layout row>
              <v-flex>
                <h3 class="title-login title is-3 has-text-right">
                  {{ $t("LOGIN.FORM.TITLE") }}
                </h3>
              </v-flex>
            </v-layout>

            <v-flex>
              <v-text-field
                :label="$t('LOGIN.LABEL.EMAIL')"
                v-model="login.email"
                :placeholder="$t('LOGIN.FORM.EMAILPLACEHOLDER')"
                name="email"
                id="email"
                type="email"
                :rules="[rules.required, rules.email]"
              ></v-text-field>
            </v-flex>

            <v-flex>
              <v-text-field
                :label="$t('LOGIN.LABEL.PASSWORD')"
                v-model="login.password"
                :placeholder="$t('LOGIN.FORM.PASSWORDPLACEHOLDER')"
                name="password"
                id="password"
                type="password"
                :rules="[rules.required]"
              ></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row wrap justify-end>
            <v-btn
              dark
              large
              color="black"
              type="submit"
              :loading="loading > 0"
            >
              {{ $t("LOGIN.FORM.SUBMIT") }}
            </v-btn>
          </v-layout>

          <v-layout row justify-end>
            <v-flex pa-1>
              <a
                class="button is-text is-small align-right"
                href="/create-account"
              >
                <h6 class="is-4 password">
                  {{ $t("LOGIN.FORM.CREATE_ACCOUNT_BTN") }}
                </h6>
              </a>
            </v-flex>
            <v-flex shrink pa-1>
              <a class="button is-text is-small" href="/forgot-password">
                <h6 class="is-4 password">
                  {{ $t("LOGIN.FORM.FORGOT_PASSWORD_BTN") }}
                </h6>
              </a>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import AuthService from "@/services/AuthService";
import ValidationMixin from "@/mixins/ValidationMixin";
import { mapState } from "vuex";

export default {
  name: "Login",
  mixins: [ValidationMixin],
  components: {},
  data() {
    return {
      login: {
        email: "",
        password: "",
      },
      returnUrl: this.$route.query.returnUrl || "/",
      authService: new AuthService(),
    };
  },
  mounted() {
    this.authService.logout();
  },
  computed: mapState(["loading"]),
  methods: {
    onLogin: function(evt) {
      evt.preventDefault();
      const context = this;

      if (this.$refs.loginForm.validate()) {
        context.authService
          .login(context.login.email, context.login.password)
          .then(() => {
            if (context.returnUrl && context.returnUrl != "/") {
              context.$router.push(context.returnUrl);
            } else {
              context.$router.push("/resume");
            }
          });
      }
    },
  },
};
</script>

<style scoped>
.application-wrapper {
  width: 100%;
  height: 100%;
  display: flex;

  /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#fafafa+70,7db9e8+80 */
  background: rgb(250, 250, 250); /* Old browsers */
  background: -moz-linear-gradient(
    -45deg,
    rgba(250, 250, 250, 1) 55%,
    rgb(0, 17, 20) 90%
  ); /* FF3.6-15 */
  background: -webkit-linear-gradient(
    -45deg,
    rgba(250, 250, 250, 1) 55%,
    rgba(0, 17, 20, 1) 90%
  ); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(
    135deg,
    rgba(250, 250, 250, 1) 55%,
    rgba(0, 17, 20, 1) 90%
  ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#fafafa', endColorstr='#7db9e8',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
}

.title-login {
  display: flex;
  align-content: center;
  align-items: center;
  height: 100%;
}
.form-wrapper {
  max-width: 500px;
  height: 370px;
  background: rgba(255, 255, 255, 0.15);
  justify-content: center;
  align-items: center;
  display: flex;
}

@media (max-width: 600px) {
  .form-wrapper {
    align-content: flex-start;
    align-items: flex-start;
    max-width: 100vw !important;
    height: 100vh !important;
  }
}

.form-wrapper .form {
  width: 100%;
}

.align-right {
  display: flex;
  justify-content: end;
  align-content: flex-end;
  align-items: flex-end;
}

@media (max-width: 1024px) {
  .form-wrapper {
    max-width: 70%;
  }
}

@media (max-width: 768px) {
  .form-wrapper {
    width: 750%;
    min-width: 350px;
  }
}
</style>
