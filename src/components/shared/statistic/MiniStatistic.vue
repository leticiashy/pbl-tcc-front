<template>
  <v-card>
    <v-card-text class="pa-0">
      <v-container class="pa-0">
        <div class="layout row ma-0">
          <div class="sm6 xs6 flex">
            <div class="layout column ma-0 justify-center align-center">
              <v-icon size="56px" :color="color">{{ icon }}</v-icon>
            </div>
          </div>
          <div
            class="sm6 xs6 flex text-sm-center py-3 white--text"
            :class="color"
          >
            <div>
              <h4>{{ title }}</h4>
            </div>
            <span class="text-ministatistic">{{ subTitle }}</span>
          </div>
        </div>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    icon: String,
    title: String,
    subTitle: String,
    color: String
  }
};
</script>

<style scoped>
.text-ministatistic {
  font-size: 14px;
  font-weight: bold;
}
</style>
