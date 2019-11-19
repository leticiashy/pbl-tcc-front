<template>
  <div id="showEvent">
    <v-container fluid grid-list-lg>
      <v-card class="mx-auto">
        <v-card-text>
          <v-layout column wrap>
            <v-flex xs10>
              <p class="display-2 text--primary">
                {{ $t("EVENTS.LABEL.SHOW") }}
              </p>
            </v-flex>

            <v-flex pa-2>
              <event-top :event="event" />

              <event-card :event="event" :refreshFn="search" />
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import Material from "vuetify/es5/util/colors";
import EventCard from "@/components/shared/card/Event";
import EventTop from "@/components/shared/card/EventTop";
import ApiClientMixin from "@/mixins/ApiClientMixin";

export default {
  mixins: [ApiClientMixin],
  components: {
    EventCard,
    EventTop,
  },
  mounted() {
    this.search();
  },
  data() {
    return {
      paramsReady: false,
      ruleShowAll: false,
      color: Material,
      event: {},
      requisites: [],
    };
  },
  methods: {
    search: function() {
      let url = this.$route.params.id
        ? `events/${this.$route.params.id}`
        : "events";
      this.apiClient.get(url).then(resp => {
        this.event = resp;
      });
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
