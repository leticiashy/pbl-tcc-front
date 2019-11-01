<template>
  <div id="pageDashboard">
    <layout></layout>
    <header>
      <div class="page-name">{{ $t("GLOBAL.DASHBOARD") }}</div>
    </header>

    <v-container fluid grid-list-lg>
      <v-layout row wrap>
        <v-flex
          lg4
          sm12
          xs12
          v-for="(item, index) in trendings"
          :key="'c-trending' + index"
        >
          <circle-statistic
            :title="item.subheading"
            :sub-title="item.headline"
            :caption="item.caption"
            :icon="item.icon.label"
            :color="item.linear.color"
            :value="item.linear.value"
          >
          </circle-statistic>
        </v-flex>
        <v-flex lg12 sm12 xs12>
          <simple-grid
            :title="this.$t('GLOBAL.COMPANIES')"
            :headers="headers"
            :data="data"
          />
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script src="./Dashboard.js" />

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
