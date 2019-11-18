<template>
  <div id="showFiles">
    <v-container fluid grid-list-lg>
      <v-card class="mx-auto">
        <v-card-text>
          <v-layout column wrap>
            <v-flex xs10>
              <p class="display-2 text--primary">
                {{
                  $t("FILES.LABEL.LIST").replace(
                    "$areaName",
                    $route.params.areaName
                  )
                }}
              </p>
            </v-flex>

            <v-flex pa-2 v-if="files.length">
              <file-upload v-model="files" :blockNew="true" />
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import Material from "vuetify/es5/util/colors";
import ApiClientMixin from "@/mixins/ApiClientMixin";
import FileUpload from "@/components/shared/input/FileUpload";

export default {
  mixins: [ApiClientMixin],
  components: {
    FileUpload,
  },
  mounted() {
    this.search();
  },
  data() {
    return {
      paramsReady: false,
      ruleShowAll: false,
      color: Material,
      files: [],
      events: {
        data: [],
      },
    };
  },
  methods: {
    search: function() {
      let url = this.$route.params.areaName
        ? `events/area/${this.$route.params.areaName}`
        : "events";

      this.apiClient.get(url).then(resp => {
        this.files = [];

        for (let i = 0; i < resp.length; i++) {
          let event = resp[i];

          if (event.file) {
            this.files.push(event.file);
          }
        }
      });
    },
    navigateToArea: function(name) {
      this.events.data = [];
      this.$router.push(`/events/area/${name}`);
      this.search();
    },
    areasToList(areas = "") {
      return areas.split(",");
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
