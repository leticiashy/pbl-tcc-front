<template>
  <v-card style="background: rgba(200, 200, 200, .5)">
    <v-card-text>
      <div v-if="event.description" class="justify-end pa-1">
        <label class="display-2" style="display:flex">{{
          $t("EVENTS.LABEL.DESCRIPTION")
        }}</label>
        <p class="headline display-1 justify-end pa-2">
          {{ event.description }}
        </p>
      </div>

      <div v-if="event.file">
        <label class="headline justify-end pa-1" style="display:flex">{{
          $t("EVENTS.LABEL.ADDITIONAL_DATA_INFO")
        }}</label>
        <file-upload v-model="event.file" :blockNew="true" />
      </div>

      <v-layout row wrap justify-end v-if="canShow(['admin', 'manager'])">
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

        <v-chip dark color="warning" v-else-if="userIn(event)">
          {{ $t("GLOBAL.USER_IN") }}
        </v-chip>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
import Material from "vuetify/es5/util/colors";
import FileUpload from "@/components/shared/input/FileUpload";
import ApiClientMixin from "@/mixins/ApiClientMixin";

export default {
  mixins: [ApiClientMixin],
  props: ["event"],
  components: {
    FileUpload,
  },
  data() {
    return {
      paramsReady: false,
      ruleShowAll: false,
      color: Material,
    };
  },
  computed: {},
  methods: {
    userIn: function(event) {
      const user = this.getUser();

      return event.inscriptions.some(i => {
        return i.user_id === user.id;
      });
    },
    deleteEvent: function(event) {
      if (confirm("Tem certeza que deseja remover?")) {
        this.apiClient.delete(`events/${event.id}`).then(this.search);
      }
    },
    startEvent: function(event) {
      if (confirm("Tem certeza que deseja iniciar?")) {
        this.apiClient
          .put(
            `events/${event.id}`,
            Object.assign({}, event, { status: "started" })
          )
          .then(this.search);
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
