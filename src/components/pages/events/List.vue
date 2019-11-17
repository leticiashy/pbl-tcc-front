<template>
  <div id="pageList">
    <v-container fluid grid-list-lg>
      <v-card class="mx-auto">
        <v-card-text>
          <v-layout column wrap>
            <v-flex xs10>
              <p class="display-2 text--primary">
                {{ $t("USERS.LABEL.PROFILE") }}
              </p>
            </v-flex>

            <v-flex pa-2 v-if="events.data.length">
              <v-expansion-panel color="gray" multiple>
                <v-expansion-panel-content
                  v-for="event in events.data"
                  multiple
                  :key="event.id"
                  v-show="event.active || ruleShowAll"
                >
                  <template v-slot:header>
                    <v-layout>
                      <v-flex>
                        <div>
                          Status: {{ event.active ? "Ativo" : "Terminado" }}
                          <v-chip primary v-if="event.areas">
                            {{ event.areas }}
                          </v-chip>
                          <br />
                          <strong class="display-1 pa-2">{{
                            event.name
                          }}</strong>
                        </div>
                      </v-flex>
                      <v-flex shrink pa-2 v-if="event.need_additional">
                        <v-icon size="60" class="pa-2" block color="red"
                          >error</v-icon
                        >
                      </v-flex>
                    </v-layout>
                  </template>

                  <v-card style="background: rgba(200, 200, 200, .5)">
                    <v-card-text>
                      <v-layout
                        row
                        wrap
                        justify-end
                        v-if="canShow(['admin', 'manager'])"
                      >
                        <v-btn
                          dark
                          large
                          color="red"
                          v-if="canShow(['admin']) || isOwner(event.user_id)"
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

                      <div v-if="canShow(['user'])">
                        Admin, manages
                      </div>

                      <div v-if="event.file">
                        <label
                          class="headline justify-end pa-1"
                          style="display:flex"
                          >{{ $t("EVENTS.LABEL.ADDITIONAL_DATA_INFO") }}</label
                        >
                        <file-upload v-model="event.file" :blockNew="true" />
                      </div>
                    </v-card-text>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import Material from "vuetify/es5/util/colors";
import FileUpload from "@/components/shared/input/FileUpload";
import ApiClientMixin from "@/mixins/ApiClientMixin";

import moment from "moment";

export default {
  mixins: [ApiClientMixin],
  components: {
    FileUpload
  },
  mounted() {
    this.search();
  },
  data() {
    return {
      paramsReady: false,
      ruleShowAll: false,
      color: Material,
      events: {
        data: []
      }
    };
  },
  computed: {
    headers() {
      return [
        {
          sortable: false,
          align: "left",
          text: this.$t("EVENTS.LABEL.NAME"),
          value: "name",
          customTemplate: item => {
            return `<strong> ${item.name} </strong>`;
          }
        },
        {
          sortable: false,
          text: this.$t("EVENTS.LABEL.NEED_ADDITIONAL"),
          value: "needAdditional",
          customTemplate: props => {
            if (props.need_additional)
              return "<strong style='color:red'>Sim</strong>";
            return "Não";
          }
        },
        {
          sortable: false,
          text: this.$t("EVENTS.LABEL.STATUS"),
          value: "active",
          customTemplate: props => {
            if (props.active) return "Ativo";
            return "Terminado";
          }
        },
        {
          sortable: false,
          text: this.$t("EVENTS.LABEL.INSCRIPTIONS"),
          value: "inscriptions"
        },
        {
          text: this.$t("EVENTS.LABEL.CREATED_AT"),
          value: "created_at",
          customTemplate: item => {
            return moment(item.created_at)
              .utc()
              .format("DD/MM/YYYY HH:mm");
          }
        },
        {
          value: "id",
          customTemplate: item => {
            return this.validateRole(item.role)
              ? `<a href="/events/${item.id}/edit"> ${this.$t(
                  "GLOBAL.EDIT"
                )} </a>`
              : "";
          },
          click: item => {
            this.$router.push(`/events/${item.id}/edit`);
          }
        },
        {
          value: "id",
          customTemplate: item => {
            return this.validateRole(item.role)
              ? `<a href="#"> ${this.$t("GLOBAL.DELETE")} </a>`
              : "";
          },
          click: item => {
            if (confirm("Tem certeza que deseja remover?")) {
              this.apiClient.delete(`events/${item.id}`).then(this.search);
            }
          }
        }
      ];
    }
  },
  methods: {
    search: function() {
      this.apiClient.get("events").then(resp => {
        this.events.data = resp;
      });
    },
    deleteEvent: function(event) {
      if (confirm("Tem certeza que deseja remover?")) {
        this.apiClient.delete(`events/${event.id}`).then(this.search);
      }
    },
    startEvent: function(event) {
      if (confirm("Tem certeza que deseja iniciar?")) {
        debugger;
        this.apiClient
          .put(
            `events/${event.id}`,
            Object.assign({}, event, { status: "started" })
          )
          .then(this.search);
      }
    },
    finishEvent: function(event) {
      if (confirm("Tem certeza que deseja terminar?")) {
        this.apiClient
          .put(
            `events/${event.id}`,
            Object.assign({}, event, { active: false })
          )
          .then(this.search);
      }
    }
  }
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
