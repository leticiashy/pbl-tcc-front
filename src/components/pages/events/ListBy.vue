<template>
  <div id="pageListArea">
    <v-container fluid grid-list-lg>
      <v-card class="mx-auto">
        <v-card-text>
          <v-layout column wrap>
            <v-flex xs10>
              <p class="display-2 text--primary">
                {{ $t("EVENTS.LABEL.LIST") }}
              </p>

              <v-btn
                dark
                large
                color="green"
                @click.prevent="navigateToFiles()"
              >
                {{ $t("FILES.LABEL.OPEN_LIBRARY") }}
              </v-btn>
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
                    <event-top :event="event" :navigateFn="navigateToArea" />
                  </template>

                  <event-card :event="event" :refreshFn="search" />
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
      events: {
        data: [],
      },
    };
  },
  methods: {
    search: function() {
      let url = this.$route.params.areaName
        ? `events/area/${this.$route.params.areaName}`
        : "events";

      this.apiClient.get(url).then(resp => {
        this.events.data = resp;
      });
    },
    navigateToArea: function(name) {
      this.events.data = [];
      this.$router.push(`/events/area/${name}`);
      this.search();
    },
    navigateToFiles: function() {
      this.$router.push(`/events/area/${this.$route.params.areaName}/files`);
    },
    areasToList(areas = "") {
      return areas.split(",");
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
