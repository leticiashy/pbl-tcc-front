<template>
  <div id="pageDashboard" v-if="paramsReady">
    <v-container fluid grid-list-lg>
      <v-layout row wrap>
        <v-flex sm2 justify-end class="hidden-xs-only">
          <linear-statistic
            v-if="canShow(['user'])"
            title="Participação por área"
            :subtitle="`${$t('USERS.LABEL.RATE')}: ${userData.rate}`"
            color="primary"
            :items="userData.grades"
          />

          <router-link to="/users/profile" class="justify-end">
            Ver perfil completo >>
          </router-link>
        </v-flex>

        <v-flex sm8 xs12>
          <action-grid
            title="Desafios em aberto"
            :headers="dataHeaders"
            :data="allEvent"
            hide-headers
            hide-actions
          />

          <br />

          <action-grid
            v-if="userData.eventsIn && userData.eventsIn.length > 0"
            title="Eventos que está participando"
            :headers="dataHeaders"
            :data="userData.eventsIn"
            hide-headers
            hide-actions
          />

          <action-grid
            v-if="userData.events && userData.events.length > 0"
            title="Monitore seus eventos"
            :headers="dataHeaders"
            :data="userData.events"
            hide-headers
            hide-actions
          />
        </v-flex>

        <v-flex sm2 class="hidden-xs-only">
          <h2 class="headline">Referência rápida:</h2>

          <a
            v-for="area in areasAll"
            :href="`events/area/${area}`"
            v-bind:key="area"
            style="display: block"
            >- {{ area }}</a
          >
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Material from "vuetify/es5/util/colors";

import ApiClientMixin from "@/mixins/ApiClientMixin";

import ActionGrid from "@/components/shared/list/ActionGrid";
import LinearStatistic from "@/components/shared/statistic/LinearStatistic";

import UserService from "@/services/UserService";

export default {
  mixins: [ApiClientMixin],
  components: {
    ActionGrid,
    LinearStatistic,
  },
  mounted() {
    const $context = this;

    Promise.all([
      $context.apiClient.get(`events`),
      $context.apiClient.get(`areas`),
      UserService.getData(),
    ]).then(([eventsAll, areasAll, userData]) => {
      this.allEvent = eventsAll;
      this.areasAll = areasAll.data;
      this.userData = userData;

      this.paramsReady = true;

      // this.areasUser = userData.grades;
    });
  },
  data() {
    return {
      color: Material,
      paramsReady: false,
      allEvent: [],
      areasAll: [],
      userData: [],
      areasUser: {},
    };
  },
  computed: {
    dataHeaders: function() {
      return [
        {
          name: "name",
          text: "Eventos",
          align: "left",
          sortable: false,
          customTemplate: props => {
            return `<a href="/events/${props.id}">${props.name}</a>`;
          },
          click: props => {
            this.$router.push(`/events/${props.id}`);
          },
        },
      ];
    },
  },
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
