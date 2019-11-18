<template>
  <v-layout>
    <v-flex>
      <div>
        {{
          $t(event.active ? "EVENTS.LABEL.ACTIVE" : "EVENTS.LABEL.NON_ACTIVE")
        }}
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
      <v-icon size="60" class="pa-2" block color="red">error</v-icon>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ["event", "navigateFn"],
  methods: {
    navigateToArea: function(name) {
      if (this.navigateFn) {
        this.navigateFn(name);
      } else {
        this.$router.push(`/events/area/${name}`);
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
