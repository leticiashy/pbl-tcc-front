<template>
  <div id="pageList">
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
              <v-layout>
                <v-flex>
                  <div>
                    Status: {{ event.active ? "Ativo" : "Terminado" }}
                    <v-chip
                      primary
                      v-for="area in areasToList"
                      v-bind:key="area"
                      @click="navigateToArea(area)"
                    >
                      {{ area }}
                    </v-chip>
                    <br />
                    <strong class="display-1 pa-2">{{ event.name }}</strong>
                  </div>
                </v-flex>
                <v-flex shrink pa-2 v-if="event.need_additional">
                  <v-icon size="60" class="pa-2" block color="red"
                    >error</v-icon
                  >
                </v-flex>
              </v-layout>

              <event-card :event="event" />
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
import ApiClientMixin from "@/mixins/ApiClientMixin";

export default {
  mixins: [ApiClientMixin],
  components: {
    EventCard,
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
    };
  },
  computed: {
    areasToList() {
      return this.event.areas && this.event.areas.split(",");
    },
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
    navigateToArea: function(name) {
      this.$router.push(`/events/area/${name}`);
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
