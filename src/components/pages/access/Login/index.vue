<template>
  <v-container id="pageLogin" class="login-wrapper elevation-2">
    <v-form id="app" class="form" ref="loginForm" @submit="onLogin">
      <v-container fluid>
        <v-layout column>
          <v-layout row>
            <v-flex>
              <h3 class="title-login title is-3 has-text-right">
                {{ $t("LOGIN.FORM.TITLE") }}
              </h3>
            </v-flex>
            <v-flex shrink>
              <!-- <language-changer /> -->
            </v-flex>
          </v-layout>

          <v-flex>
            <v-text-field
              :label="$t('LOGIN.LABEL.EMAIL')"
              v-model="login.email"
              :placeholder="$t('LOGIN.FORM.EMAILPLACEHOLDER')"
              name="email"
              id="email"
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
          <v-btn dark large color="green" type="submit" :loading="loading > 0">
            {{ $t("LOGIN.FORM.SUBMIT") }}
          </v-btn>
        </v-layout>

        <v-layout row wrap justify-end>
          <a class="button is-text is-small" href="/forgot-password">
            <h6 class="is-4 password">
              {{ $t("LOGIN.FORM.FORGOT_PASSWORD_BTN") }}
            </h6>
          </a>
        </v-layout>
      </v-container>
    </v-form>
  </v-container>
</template>

<script src="./Login.js" />

<style scoped>
.title-login {
  display: flex;
  align-content: center;
  align-items: center;
  height: 100%;
}
.login-wrapper {
  max-width: 500px;
  height: 370px;
  background: #fafafa;
  justify-content: center;
  align-items: center;
  display: flex;
}

.login-wrapper .form {
  width: 100%;
}

@media (max-width: 1024px) {
  .login-wrapper {
    max-width: 70%;
  }
}

@media (max-width: 768px) {
  .login-wrapper {
    width: 750%;
    min-width: 350px;
  }
}
</style>
