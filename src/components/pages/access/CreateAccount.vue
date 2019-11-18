<template>
  <div class="application-wrapper">
    <v-container class="form-wrapper elevation-2">
      <v-form id="app" class="form" ref="loginForm" @submit="onLogin">
        <v-container fluid>
          <v-layout column>
            <v-layout row>
              <v-flex>
                <h3 class="title-login title is-3 has-text-right">
                  {{ $t("CREATE_ACCOUNT.FORM.TITLE") }}
                </h3>
              </v-flex>
            </v-layout>

            <!-- <v-flex>
              <v-text-field
                :label="$t('CREATE_ACCOUNT.LABEL.NAME')"
                v-model="login.name"
                :placeholder="$t('CREATE_ACCOUNT.FORM.NAMEPLACEHOLDER')"
                name="name"
                id="name"
                :rules="[rules.required]"
              ></v-text-field>
            </v-flex> -->

            <v-flex>
              <v-text-field
                :label="$t('CREATE_ACCOUNT.LABEL.USERNAME')"
                v-model="login.username"
                :placeholder="$t('CREATE_ACCOUNT.FORM.USERNAMEPLACEHOLDER')"
                name="username"
                id="username"
                :rules="[rules.required]"
              ></v-text-field>
            </v-flex>

            <v-flex>
              <v-text-field
                :label="$t('CREATE_ACCOUNT.LABEL.EMAIL')"
                v-model="login.email"
                :placeholder="$t('CREATE_ACCOUNT.FORM.EMAILPLACEHOLDER')"
                name="email"
                id="email"
                :rules="[rules.required, rules.email]"
              ></v-text-field>
            </v-flex>

            <v-flex>
              <v-text-field
                :label="$t('CREATE_ACCOUNT.LABEL.PASSWORD')"
                v-model="login.password"
                :placeholder="$t('CREATE_ACCOUNT.FORM.PASSWORDPLACEHOLDER')"
                name="password"
                id="password"
                type="password"
                :rules="[rules.required]"
              ></v-text-field>

              <v-text-field
                :label="$t('CREATE_ACCOUNT.LABEL.PASSWORD_DUPLICATE')"
                v-model="login.password_dupl"
                :placeholder="$t('CREATE_ACCOUNT.FORM.PASSWORDPLACEHOLDER')"
                name="password"
                id="password"
                type="password"
                :rules="[
                  rules.required,
                  val => val === login.password || $t('GLOBAL_ERROR.PASSWORD'),
                ]"
              ></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row wrap justify-end>
            <v-btn
              dark
              large
              color="green"
              type="submit"
              :loading="loading > 0"
            >
              {{ $t("CREATE_ACCOUNT.FORM.SUBMIT") }}
            </v-btn>
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
        username: "",
        name: "",
      },
      errors: [],
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
          .create(
            context.login.email,
            context.login.password,
            context.login.username
          )
          .then(result => {
            console.log(result);
            context.authService
              .login(context.login.email, context.login.password)
              .then(user => {
                console.log(user);
                if (context.returnUrl && context.returnUrl != "/") {
                  context.$router.push(context.returnUrl);
                } else {
                  context.$router.push("/resume");
                }
              });
          })
          .catch(resp => {
            context.errors = resp.body.errors;
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
}

.title-login {
  display: flex;
  align-content: center;
  align-items: center;
  height: 100%;
}
.form-wrapper {
  max-width: 500px;
  /* height: calc(auto + 30px); */
  background: #fafafa;
  justify-content: center;
  align-items: center;
  display: flex;
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
