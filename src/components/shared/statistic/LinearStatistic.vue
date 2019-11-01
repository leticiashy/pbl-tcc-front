<template>
  <v-card>
    <v-card-title>
      <div class="layout row ma-0 justify-space-between pb-1">
        <div>
          <h4>{{ title }}</h4>
        </div>
        <div class="icon">
          <v-icon mini :color="color">{{ icon }}</v-icon>
        </div>
      </div>
    </v-card-title>
    <v-card-text class="pt-3">
      <h5 class="sub-progress">{{ subTitle }}</h5>
      <v-progress-linear
        :value="value"
        height="5"
        :color="color"
      ></v-progress-linear>
      <span class="caption">{{ caption }}</span>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    icon: String,
    title: String,
    subTitle: String,
    value: Number,
    color: String
  },
  computed: {
    caption() {
      return this.value + "% " + this.subTitle;
    }
  }
};
</script>
<style scoped>
.sub-progress {
  font-size: 15px;
}
</style>
