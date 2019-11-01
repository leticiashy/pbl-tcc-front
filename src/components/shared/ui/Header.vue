<template>
  <v-layout row class="app--page-header">
    <div class="page-header-left">
      <h3 class="page-title">
        <slot name="page-name"></slot>
      </h3>
    </div>

    <v-spacer></v-spacer>
    <div class="page-header-right">
      <v-btn icon>
        <v-icon class="text--secondary">refresh</v-icon>
      </v-btn>
    </div>
  </v-layout>
</template>

<style scoped>
.app--page-header {
  padding-left: 5px;
  padding-top: 10px;
}
.page-header-left {
  padding-left: 15px;
}

.page-title {
  font-size: 34px !important;
  font-weight: 400;
  line-height: 40px !important;
  letter-spacing: normal !important;
  font-family: "Roboto", sans-serif !important;

  color: #1867c0 !important;
}

.flags {
  min-width: 30px;
  max-width: 30px;
}
</style>
