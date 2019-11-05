<template>
  <div id="pageDashboard">
    <header>
      <div class="page-name">{{ $t("GLOBAL.RESUME_TITLE") }}</div>
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

<script>
import Material from "vuetify/es5/util/colors";

import ApiClientMixin from "@/mixins/ApiClientMixin";

import SimpleGrid from "@/components/shared/list/SimpleGrid";

import CircleStatistic from "@/components/shared/statistic/CircleStatistic";

export default {
  mixins: [ApiClientMixin],
  components: {
    SimpleGrid,
    CircleStatistic
  },
  mounted() {
    setTimeout(() => {
      this.paramsReady = true;
    }, 2000);

    this.apiClient.get("company").then(resp => {
      this.data = resp.data;
    });
  },
  data() {
    return {
      paramsReady: false,
      color: Material,
      data: []
    };
  },
  computed: {
    headers() {
      return [
        {
          sortable: false,
          align: "left",
          text: this.$t("GLOBAL.NAME"),
          value: "name"
        },
        { sortable: false, text: this.$t("GLOBAL.ID"), value: "id" },
        {
          sortable: false,
          text: this.$t("GLOBAL.CREATED_AT"),
          value: "created"
        }
      ];
    },
    trendings() {
      return this.paramsReady
        ? [
            {
              subheading: this.$t("GLOBAL.EMAIL"),
              percent: 15,
              icon: {
                label: "email",
                color: "info"
              },
              linear: {
                value: 15,
                color: "info"
              }
            },
            {
              subheading: this.$t("GLOBAL.TASKS"),
              percent: 90,
              icon: {
                label: "list",
                color: "primary"
              },
              linear: {
                value: 90,
                color: "success"
              }
            },
            {
              subheading: this.$t("GLOBAL.ISSUES"),
              percent: 100,
              icon: {
                label: "bug_report",
                color: "primary"
              },
              linear: {
                value: 100,
                color: "error"
              }
            }
          ]
        : [];
    }
  }
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
