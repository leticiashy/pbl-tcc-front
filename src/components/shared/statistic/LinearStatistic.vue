<template>
  <v-card>
    <v-card-title>
      <div class="layout row ma-0 justify-space-between pa-0">
        <div>
          <h4>{{ title }}</h4>
        </div>
        <div class="icon">
          <v-icon mini :color="color">{{ icon }}</v-icon>
        </div>
      </div>
    </v-card-title>
    <v-card-text class="pa-1">
      <div>
        <h5 class="sub-progress">{{ subtitle }}</h5>
      </div>
      <hr />
      <div v-for="(item, index) in items" v-bind:key="index">
        <span class="caption">{{ item.subheading }}</span>

        <v-progress-linear
          :value="item.value * 10"
          height="5"
          :color="item.value > 5 ? 'green' : 'red'"
        ></v-progress-linear>

        <hr />
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    icon: String,
    title: String,
    subtitle: String,
    value: Number,
    color: String,
    items: Array
  },
  computed: {
    caption() {
      return this.value + "% " + this.subtitle;
    }
  }
};
</script>
<style scoped>
.sub-progress {
  font-size: 15px;
}
</style>
