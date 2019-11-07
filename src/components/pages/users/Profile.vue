/* eslint-disable vue/no-side-effects-in-computed-properties */
<template>
  <div id="pageList">
    <v-container id="pageLogin">
      <v-card class="mx-auto" v-if="view === 'show'">
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs10>
              <p class="display-2 text--primary">
                {{ $t("USERS.LABEL.PROFILE") }}
              </p>
            </v-flex>
            <v-flex xs2>
              <v-btn
                class="profile-edit"
                text
                dark
                color="deep-gray accent-4"
                @click="view = 'edit'"
                >{{ $t("USERS.LABEL.PROFILE_EDIT") }}</v-btn
              >
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>

      <v-card class="mx-auto" v-if="view === 'show' && data.grades">
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs12>
              <v-layout row wrap>
                <v-flex md2 sm3 xs12 pa-1>
                  <v-layout row wrap>
                    <v-flex xs12>
                      <v-flex pa-1 sm6>
                        <h3 class="text--primary">
                          {{ $t("USERS.LABEL.NAME") }}:
                        </h3>
                        {{ data.name }}
                      </v-flex>
                      <v-flex pa-1 sm6>
                        <h3 class="text--primary">
                          {{ $t("USERS.LABEL.USERNAME") }}:
                        </h3>
                        {{ data.username }}
                      </v-flex>

                      <v-flex pa-1 sm6>
                        <h3 class="text--primary">
                          {{ $t("USERS.LABEL.EMAIL") }}:
                        </h3>
                        {{ data.email }}
                      </v-flex>
                      <br />
                    </v-flex>
                    <v-flex x12>
                      <linear-statistic
                        title="Notas"
                        :subtitle="`${$t('USERS.LABEL.RATE')}: ${data.rate}`"
                        icon="list"
                        color="primary"
                        :items="data.grades"
                      />
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex md8 sm6 xs12 pa-1>
                  <action-grid
                    title="Desafios abertos"
                    :headers="nonActiveHeaders"
                    :data="globalEvents.data"
                    hide-headers
                    hide-actions
                  />
                </v-flex>
                <v-flex md2 sm3 xs12 pa-1>
                  <action-grid
                    title="Desafios em progresso"
                    :headers="activeHeaders"
                    :data="activeData"
                    hide-headers
                    hide-actions
                  />

                  <br />
                  <br />

                  <action-grid
                    title="Desafios passados"
                    :headers="nonActiveHeaders"
                    :data="nonActiveData"
                    hide-headers
                    hide-actions
                  />
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>

      <v-form
        id="app"
        v-if="view === 'edit'"
        class="form form-wrapper elevation-2"
        ref="userForm"
        @submit.prevent="onSubmit"
      >
        <v-container fluid>
          <v-layout column>
            <v-layout row>
              <v-flex>
                <h3 class="title-login title is-3 has-text-right">
                  {{ $t("USERS.FORM.PROFILE_TITLE") }}
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
              <v-text-field
                :label="$t('USERS.LABEL.PASSWORD')"
                v-model="data.password"
                :placeholder="$t('USERS.FORM.PASSWORDPLACEHOLDER')"
                name="password"
                id="password"
                type="password"
              ></v-text-field>

              <v-text-field
                :label="$t('USERS.LABEL.PASSWORD_DUPLICATE')"
                v-model="data.password_dupl"
                :placeholder="$t('USERS.FORM.PASSWORDPLACEHOLDER')"
                name="password"
                id="password"
                type="password"
                :rules="[
                  val => val === data.password || $t('GLOBAL_ERROR.PASSWORD')
                ]"
              ></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row wrap justify-end>
            <v-btn dark large color="red" @click="view = 'show'">
              {{ $t("USERS.FORM.CANCEL") }}
            </v-btn>

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

import LinearStatistic from "@/components/shared/statistic/LinearStatistic";

import ActionGrid from "@/components/shared/list/ActionGrid";

export default {
  mixins: [ApiClientMixin, ValidationMixin],
  components: {
    LinearStatistic,
    ActionGrid
  },
  mounted() {
    this.getData();
  },
  watch: {
    view: function() {
      this.getData();
    }
  },
  data() {
    return {
      paramsReady: false,
      color: Material,
      globalEvents: {
        data: []
      },
      data: {
        email: null,
        password: null,
        username: null,
        name: null
      },
      errors: [],
      view: "show"
    };
  },
  computed: {
    activeHeaders: function() {
      return [
        {
          name: "title",
          text: "Eventos",
          align: "left",
          sortable: false,
          customTemplate: props => {
            return `<a href="${props.link}">${props.title}</a>`;
          },
          click: props => {
            this.$router.push(props.link);
          }
        }
      ];
    },
    activeData: function() {
      return this.data && this.data.userEvents
        ? this.data.userEvents.filter(x => x.active)
        : [];
    },
    nonActiveHeaders: function() {
      return [
        {
          name: "title",
          text: "Eventos",
          align: "left",
          sortable: false,
          customTemplate: props => {
            return `<a href="${props.link}">${props.title}</a>`;
          },
          click: props => {
            this.$router.push(props.link);
          }
        }
      ];
    },
    nonActiveData: function() {
      return this.data && this.data.userEvents
        ? this.data.userEvents.filter(x => !x.active)
        : [];
    }
  },
  methods: {
    getData: function() {
      const user = this.getUser();

      if (user.username) {
        this.apiClient.get(`users/${user.username}`).then(resp => {
          this.data = resp;
          this.data.rate = 1200;
          this.data.grades = [
            {
              subheading: "Lógica de programação e algoritmos",
              value: 2
            },
            {
              subheading: "Redes",
              value: 7.5
            },
            {
              subheading: "Matemática",
              value: 5
            }
          ];
          this.globalEvents = {
            embedded: {
              href: "/events"
            },
            data: [
              {
                title: "Semana tecnológica 2020",
                active: true,
                link: "/event/1"
              },
              {
                title: "Projeto final Redes",
                active: false,
                link: "/event/1"
              },
              {
                title: "Seminário de tecnologia e aprendizado",
                active: true,
                link: "/event/1"
              },
              {
                title: "Projeto de matemática",
                active: true,
                link: "/event/1"
              },
              {
                title: "Estruturas de dado e análise",
                active: false,
                link: "/event/1"
              },
              {
                title: "Problemas práticos",
                active: false,
                link: "/event/1"
              },
              {
                title: "Curso de Wordpress",
                active: false,
                link: "/event/1"
              }
            ]
          };
          this.data.userEvents = [
            {
              title: "Semana tecnológica 2020",
              active: true,
              link: "/event/1"
            },
            {
              title: "Estruturas de dado e análise",
              active: false,
              link: "/event/1"
            },
            {
              title: "Projeto final Redes",
              active: false,
              link: "/event/1"
            },
            {
              title: "Seminário de tecnologia e aprendizado",
              active: true,
              link: "/event/1"
            },
            {
              title: "Projeto de matemática",
              active: true,
              link: "/event/1"
            }
          ];
        });
      }
    },
    onSubmit: function() {
      if (this.$refs.userForm.validate()) {
        this.apiClient
          .put(`users/${this.data.username}`, this.data)
          .then(() => {
            this.view = "show";
          });
      }
    }
  }
};
</script>

<style scoped>
.profile-edit {
  float: right;
}

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
