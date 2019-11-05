<template>
  <div id="pageList">
    <v-container id="pageLogin" class="login-wrapper elevation-2">
      <v-form id="app" class="form" ref="userForm" @submit.prevent="onSubmit">
        <v-container fluid>
          <v-layout column>
            <v-layout row>
              <v-flex>
                <h3 class="title-login title is-3 has-text-right">
                  {{ $t("USERS.FORM.TITLE") }}
                </h3>
              </v-flex>
            </v-layout>

            <v-flex>
              <v-text-field
                :label="$t('USERS.LABEL.NAME')"
                v-model="data.name"
                :placeholder="$t('USERS.FORM.NAMEPLACEHOLDER')"
                name="name"
                id="name"
                :rules="[rules.required]"
              ></v-text-field>
            </v-flex>

            <v-flex>
              <v-text-field
                :label="$t('USERS.LABEL.EMAIL')"
                v-model="data.email"
                :placeholder="$t('USERS.FORM.EMAILPLACEHOLDER')"
                name="email"
                id="email"
                :rules="[rules.required, rules.email]"
              ></v-text-field>
            </v-flex>

            <v-flex>
              <v-select
                :items="roles"
                v-model="data.role"
                :label="$t('USERS.FORM.ROLE')"
                outlined
              ></v-select>
            </v-flex>
          </v-layout>

          <div v-if="errors.length > 0">
            <v-alert
              v-for="error in errors"
              v-bind:key="error"
              border="top"
              color="red lighten-2"
              dark
              style="display: block"
            >
              {{ error }}
            </v-alert>
          </div>

          <v-layout row wrap justify-end>
            <v-btn dark large color="green" type="submit">
              {{ $t("USERS.FORM.SUBMIT") }}
            </v-btn>
          </v-layout>
        </v-container>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import Material from "vuetify/es5/util/colors";

import ApiClientMixin from "@/mixins/ApiClientMixin";
import ValidationMixin from "@/mixins/ValidationMixin";

export default {
  mixins: [ApiClientMixin, ValidationMixin],
  mounted() {
    const username = this.$route.params.username;

    if (username) {
      this.apiClient.get(`users/${username}`).then(resp => {
        this.data = resp;
      });
    }
  },
  data() {
    return {
      paramsReady: false,
      color: Material,
      data: {
        email: null,
        password: null,
        username: null,
        name: null
      },
      errors: []
    };
  },
  computed: {
    roles: function() {
      return [
        this.validateRole("admin") && {
          value: "admin",
          text: this.$t("GLOBAL.ROLE_ADMIN")
        },
        this.validateRole("manager") && {
          value: "manager",
          text: this.$t("GLOBAL.ROLE_MANAGER")
        },
        this.validateRole("user") && {
          value: "user",
          text: this.$t("GLOBAL.ROLE_USER")
        }
      ];
    }
  },
  methods: {
    onSubmit: function() {
      if (this.$refs.userForm.validate()) {
        const username = this.$route.params.username;

        if (username) {
          this.apiClient
            .put(`users/${this.data.username}`, this.data)
            .then(resp => {
              this.$router.push("/users/list");
            })
            .catch(resp => {
              this.errors = resp.body.errors;
            });
        } else {
          this.apiClient
            .post(`users/`, this.data)
            .then(resp => {
              this.$router.push("/users/list");
            })
            .catch(resp => {
              this.errors = resp.body.errors;
            });
        }
      }
    }
  }
};
</script>

<style scoped>
#area-chart {
  height: 200px;
  width: 100%;
}

.page-name {
  font-size: 2rem;
  font-weight: bold;
  padding: 0 24px;
}
</style>
