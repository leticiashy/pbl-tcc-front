<template>
  <v-card style="background: rgba(200, 200, 200, .25)">
    <v-card-text>
      <div class="pa-1" v-if="event.inscriptions">
        <strong style="display:flex">{{
          $t("EVENTS.LABEL.INSCRIPTIONS")
        }}</strong>
        <span style="display:flex">
          {{ event.inscriptions.length }}
          <v-icon size="20">
            person outline
          </v-icon>
        </span>
      </div>

      <div v-if="event.description" class="justify-end pa-1">
        <label class="display-2" style="display:flex">{{
          $t("EVENTS.LABEL.DESCRIPTION")
        }}</label>
        <p class="headline display-1 justify-end pa-2">
          {{ event.description }}
        </p>
      </div>

      <div v-if="event.file">
        <label class="headline pa-1" style="display:flex">{{
          $t("EVENTS.LABEL.ADDITIONAL_DATA_INFO")
        }}</label>
        <file-upload v-model="event.file" :blockNew="true" />
      </div>

      <v-layout row wrap justify-end v-if="canShow(['admin', 'manager'])">
        <v-btn
          dark
          large
          color="red"
          v-if="
            canShow(['admin']) ||
              (isOwner(event.user_id) && event.status === 'waiting')
          "
          @click="deleteEvent(event)"
        >
          {{ $t("GLOBAL.DELETE") }}
        </v-btn>

        <v-btn
          dark
          large
          color="blue"
          v-if="
            event.status === 'waiting' &&
              event.inscriptions.length > 0 &&
              (canShow(['admin']) || isOwner(event.user_id))
          "
          @click="startEvent(event)"
        >
          {{ $t("GLOBAL.START_EVENT") }}
        </v-btn>

        <v-btn
          dark
          large
          color="warning"
          v-if="
            event.status === 'started' &&
              (canShow(['admin']) || isOwner(event.user_id))
          "
          @click="finishEvent(event)"
        >
          {{ $t("GLOBAL.FINISH_EVENT") }}
        </v-btn>
      </v-layout>

      <!-- Audit area -->

      <v-layout
        wrap
        column
        v-if="canShow(['admin', 'manager']) && event.status === 'audit'"
      >
        <v-flex>
          <hr style="color: rgba(0, 0, 0, .2); border-radius: 45%" />
        </v-flex>

        <!-- Users area -->

        <v-flex pa-1>
          <label class="headline pa-1" style="display:flex">{{
            $t("EVENTS.LABEL.AUDIT_INFO")
          }}</label>
        </v-flex>

        <v-flex pl-5 pr-5>
          <v-layout row wrap>
            <v-flex
              xs12
              sm6
              md3
              v-for="inscription in auditArray"
              v-bind:key="inscription.user_id"
            >
              <v-checkbox
                v-model="inscription.checkboxActive"
                :label="
                  `${inscription.user.name || inscription.user.username} - ${
                    inscription.user.rate
                  }`
                "
              />
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex>
          <hr style="color: rgba(0, 0, 0, .2); border-radius: 45%" />
        </v-flex>

        <!-- Requisites area -->

        <v-flex pa-1>
          <label class="headline pa-1" style="display:flex">{{
            $t("EVENTS.LABEL.REQUISITES_INFO")
          }}</label>
        </v-flex>

        <v-flex pl-5 pr-5>
          <v-layout row wrap>
            <v-flex
              xs12
              sm6
              md4
              v-for="requisite in requisites"
              v-bind:key="requisite.id"
            >
              <v-checkbox
                v-model="requisite.active"
                :label="`${requisite.name}`"
              />
              {{ requisite.description }}

              <div v-if="requisite.active">
                <v-text-field
                  :label="$t('EVENTS.LABEL.WEIGHT')"
                  v-model="requisite.weight"
                  name="weight"
                  id="weight"
                  type="number"
                ></v-text-field>
              </div>
            </v-flex>

            <v-flex xs12 sm6 md4 class="justify-end">
              <v-text-field
                :label="$t('EVENTS.LABEL.NAME')"
                v-model="requisiteNew.name"
                name="name"
                id="name"
              ></v-text-field>

              <v-text-field
                :label="$t('EVENTS.LABEL.DESCRIPTION')"
                v-model="requisiteNew.description"
                name="description"
                id="description"
              ></v-text-field>

              <v-btn
                dark
                large
                color="green"
                style="float: right"
                @click="addRequisite(requisiteNew)"
              >
                {{ $t("GLOBAL.ADD_REQUISITE") }}
              </v-btn>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex>
          <hr style="color: rgba(0, 0, 0, .2); border-radius: 45%" />
        </v-flex>

        <!-- Users area -->

        <v-flex pa-1>
          <label class="headline pa-1" style="display:flex">{{
            $t("EVENTS.LABEL.DATE_INFO")
          }}</label>
        </v-flex>

        <v-flex pl-5 pr-5>
          <v-menu
            ref="menu"
            v-model="event.endDate"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="date"
                :label="$t('EVENTS.LABEL.END_DATE')"
                prepend-icon="event"
                readonly
                v-on="on"
                :rules="[rules.required]"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" no-title scrollable locale="pt">
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="$refs.menu.save(date)"
                >OK</v-btn
              >
            </v-date-picker>
          </v-menu>
        </v-flex>

        <v-flex pa-1>
          <div class="headline pa-1 justify-end" style="display:flex">
            <v-btn
              dark
              large
              color="green"
              v-if="canShow(['admin']) || isOwner(event.user_id)"
              @click="auditEvent(event)"
            >
              {{ $t("GLOBAL.AUDIT_FINISH") }}
            </v-btn>
          </div>
        </v-flex>
      </v-layout>

      <v-layout row wrap justify-end v-if="canShow(['user'])">
        <v-btn
          dark
          large
          color="warning"
          v-if="
            event.status === 'waiting' && canShow(['user']) && !userIn(event)
          "
          @click="enterEvent(event)"
        >
          {{ $t("GLOBAL.ENTER_EVENT") }}
        </v-btn>

        <v-btn
          dark
          large
          color="red"
          v-else-if="userIn(event)"
          @click="quitEvent(event)"
        >
          {{ $t("GLOBAL.QUIT_EVENT") }}
        </v-btn>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
import Material from "vuetify/es5/util/colors";
import FileUpload from "@/components/shared/input/FileUpload";
import ApiClientMixin from "@/mixins/ApiClientMixin";
import ValidationMixin from "@/mixins/ValidationMixin";
import moment from "moment";

export default {
  mixins: [ApiClientMixin, ValidationMixin],
  props: ["event", "refreshFn"],
  components: {
    FileUpload,
  },
  data() {
    return {
      date: moment()
        .add(1, "day")
        .format("YYYY-MM-DD"),
      paramsReady: false,
      ruleShowAll: false,
      color: Material,
      auditArray: [],
      requisites: [],
      requisiteNew: {
        name: "",
        description: "",
      },
    };
  },
  watch: {
    event: {
      immediate: true,
      handler: function() {
        this.auditArray = this.event.inscriptions
          ? this.event.inscriptions.map(user =>
              Object.assign({}, user, { checkboxActive: true })
            )
          : [];

        if (this.requisites.length === 0) {
          this.getRequisites();
        }
      },
    },
  },
  mounted() {
    this.getRequisites();
  },
  methods: {
    getRequisites: function() {
      this.apiClient.get(`requisites/`).then(resp => {
        this.requisites = resp;
      });
    },
    addRequisite: function(requisite) {
      if (requisite.name && requisite.description) {
        this.apiClient.post(`requisites/`, requisite).then(resp => {
          this.requisites.push(
            Object.assign({}, requisite, resp, { active: true })
          );

          this.requisiteNew = {};
        });
      }
    },
    userIn: function(event) {
      const user = this.getUser();

      return event.inscriptions.some(i => {
        return i.user_id === user.id;
      });
    },
    deleteEvent: function(event) {
      if (confirm("Tem certeza que deseja remover?")) {
        this.apiClient.delete(`events/${event.id}`).then(this.refreshFn);
      }
    },
    startEvent: function(event) {
      if (confirm("Tem certeza que deseja iniciar?")) {
        this.apiClient
          .put(
            `events/${event.id}`,
            Object.assign({}, event, { status: "audit" })
          )
          .then(this.refreshFn);
      }
    },
    enterEvent: function(event) {
      if (confirm("Tem certeza que deseja entrar?")) {
        const user = this.getUser();

        this.apiClient
          .post(`inscriptions`, {
            event_id: event.id,
            user_id: user.id,
          })
          .then(this.refreshFn);
      }
    },
    finishEvent: function(event) {
      if (confirm("Tem certeza que deseja terminar?")) {
        this.apiClient
          .put(
            `events/${event.id}`,
            Object.assign({}, event, { active: false })
          )
          .then(this.refreshFn);
      }
    },
    quitEvent: function() {
      const user = this.getUser();

      const inscription = event.inscriptions.find(i => {
        return i.user_id === user.id;
      });

      if (confirm("Tem certeza que deseja sair?") && inscription) {
        this.apiClient
          .delete(`inscriptions/${inscription.id}`)
          .then(this.refreshFn);
      }
    },
    auditEvent: function(event) {
      if (
        confirm(
          "Tem certeza que deseja iniciar o evento, uma vez começado os dados não podem ser modificados?"
        )
      ) {
        this.apiClient
          .put(
            `events/${event.id}`,
            Object.assign({}, event, { endDate: event.endDate }),
            false,
            false,
            false
          )
          .then(() =>
            Promise.all(
              this.auditArray.map(inscription => {
                if (inscription.checkboxActive) {
                  return inscription;
                }

                return this.apiClient.delete(
                  `inscriptions/${inscription.id}`,
                  false,
                  false,
                  false
                );
              })
            )
              .then(() => {
                return Promise.all(
                  this.requisites.map(requisite => {
                    if (!requisite.active) {
                      return requisite;
                    }

                    this.apiClient.post(
                      `/requisites/${requisite.id}/event/${event.id}/`,
                      Object.assign(
                        { weight: requisite.weight || 1 },
                        requisite
                      ),
                      false,
                      false,
                      false
                    );
                  })
                );
              })
              .then(() => {
                return Promise.all([
                  this.apiClient.post(`events/${event.id}/audit-finish`),
                ]);
              })
              .then(this.refreshFn)
          );
      }
    },
  },
};
</script>

<style>
#area-chart {
  height: 200px;
  width: 100%;
}

.page-name {
  font-size: 2rem;
  font-weight: bold;
  padding: 0 24px;
}

.v-expansion-panel__container {
  border: 1px solid rgba(250, 250, 250, 0.8);
}
</style>
