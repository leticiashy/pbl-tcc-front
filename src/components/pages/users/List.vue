<template>
  <div id="pageList">
    <v-container fluid grid-list-lg>
      <v-layout row wrap>
        <v-flex pa-2>
          <action-grid
            :title="$t('GLOBAL.LIST_USER')"
            :headers="headers"
            :data="data"
            hide-actions
          />
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Material from "vuetify/es5/util/colors";

import ApiClientMixin from "@/mixins/ApiClientMixin";

import ActionGrid from "@/components/shared/list/ActionGrid";

import moment from "moment";

export default {
  mixins: [ApiClientMixin],
  components: {
    ActionGrid,
  },
  mounted() {
    this.search();
  },
  data() {
    return {
      paramsReady: false,
      color: Material,
      data: [],
    };
  },
  computed: {
    headers() {
      return [
        {
          sortable: false,
          align: "left",
          text: this.$t("USERS.LABEL.NAME"),
          value: "name",
          customTemplate: item => {
            return `<a href="/users/${item.username}/show"><strong> ${item.name} </strong></a>`;
          },
        },
        { sortable: false, text: this.$t("USERS.LABEL.ROLE"), value: "role" },
        {
          text: this.$t("USERS.LABEL.CREATED_AT"),
          value: "created_at",
          customTemplate: item => {
            return moment(item.created_at)
              .utc()
              .format("DD/MM/YYYY HH:mm");
          },
        },
        {
          value: "id",
          customTemplate: item => {
            return this.validateRole(item.role)
              ? `<a href="/users/${item.username}/edit"> ${this.$t(
                  "GLOBAL.EDIT"
                )} </a>`
              : "";
          },
          click: item => {
            this.$router.push(`/users/${item.username}/edit`);
          },
        },
        {
          value: "id",
          customTemplate: item => {
            return this.validateRole(item.role)
              ? `<a href="#"> ${this.$t("GLOBAL.DELETE")} </a>`
              : "";
          },
          click: item => {
            if (confirm("Tem certeza que deseja remover?")) {
              this.apiClient.delete(`users/${item.username}`).then(this.search);
            }
          },
        },
      ];
    },
  },
  methods: {
    search: function() {
      this.apiClient.get("users").then(resp => {
        this.data = resp;
      });
    },
  },
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
