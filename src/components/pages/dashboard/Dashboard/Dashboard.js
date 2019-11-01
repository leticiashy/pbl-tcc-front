import Material from "vuetify/es5/util/colors";

import ApiClientMixin from "@/mixins/ApiClientMixin";

import SimpleGrid from "@/components/shared/list/SimpleGrid";

import Layout from "@/components/shared/ui/Layout";
import Header from "@/components/shared/ui/Header";
import VWidget from "@/components/shared/ui/VWidget";

import CircleStatistic from "@/components/shared/statistic/CircleStatistic";
import MiniStatistic from "@/components/shared/statistic/MiniStatistic";

export default {
  mixins: [ApiClientMixin],
  components: {
    MiniStatistic,
    Header,
    SimpleGrid,
    Layout,
    VWidget,
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
