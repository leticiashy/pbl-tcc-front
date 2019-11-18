<template>
  <v-container id="pageLogin">
    <v-form
      id="app"
      class="form form-wrapper elevation-2"
      ref="eventForm"
      @submit.prevent="onSubmit"
    >
      <v-container fluid>
        <v-layout column>
          <v-layout row>
            <v-flex>
              <h3 class="title-login title is-3 has-text-right">
                {{ $t("EVENTS.FORM.ADD_TITLE") }}
              </h3>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex pa-1 sm8>
              <v-text-field
                :label="$t('EVENTS.LABEL.NAME')"
                v-model="data.name"
                :placeholder="$t('EVENTS.FORM.NAMEPLACEHOLDER')"
                name="name"
                id="name"
                :rules="[rules.required]"
              ></v-text-field>
            </v-flex>

            <v-flex pa-1 sm4>
              <v-checkbox
                v-model="data.needAdditional"
                class="mx-2"
                :label="$t('EVENTS.LABEL.NEED_ADDITIONAL')"
              />
            </v-flex>
          </v-layout>

          <v-flex>
            <v-layout column justify-end>
              <chip-combobox
                v-model="data.areas"
                :items="areas"
                :label="$t('EVENTS.LABEL.AREAS')"
              />
            </v-layout>
          </v-flex>

          <v-flex>
            <v-layout column>
              <v-text-field
                :label="$t('EVENTS.LABEL.DESCRIPTION')"
                v-model="data.description"
                :placeholder="$t('EVENTS.FORM.DESCRIPTIONPLACEHOLDER')"
                name="description"
                id="description"
                auto-grow
                clearable
                counter
              ></v-text-field>
            </v-layout>
          </v-flex>

          <v-flex>
            <v-layout column justify-end>
              <label class="headline justify-end pa-1" style="display:flex">{{
                $t("EVENTS.LABEL.ADDITIONAL_DATA")
              }}</label>

              <file-upload v-model="data.file" />
            </v-layout>
          </v-flex>
        </v-layout>

        <v-layout row wrap justify-end>
          <v-btn dark large color="red" @click="view = 'show'">
            {{ $t("EVENTS.FORM.CANCEL") }}
          </v-btn>

          <v-btn dark large color="black" type="submit">
            {{ $t("EVENTS.FORM.SUBMIT") }}
          </v-btn>
        </v-layout>
      </v-container>
    </v-form>
  </v-container>
</template>

<script>
import ApiClientMixin from "@/mixins/ApiClientMixin";
import ValidationMixin from "@/mixins/ValidationMixin";

import FileUpload from "@/components/shared/input/FileUpload";
import ChipCombobox from "@/components/shared/input/ChipCombobox";

export default {
  mixins: [ApiClientMixin, ValidationMixin],
  components: {
    FileUpload,
    ChipCombobox,
  },
  data() {
    return {
      data: {},
      areas: [],
    };
  },
  mounted() {
    this.apiClient.get(`areas`).then(response => {
      this.areas = response.data;
    });
  },
  methods: {
    onSubmit: function() {
      if (this.$refs.eventForm.validate()) {
        if (this.data.areas) {
          this.data.areas = Array.isArray(this.data.areas)
            ? this.data.areas.join(",")
            : this.data.areas;
        } else {
          this.data.areas = "";
        }

        this.apiClient.post(`events`, this.data).then(() => {
          this.$router.push("/events/list");
        });
      }
    },
  },
};
</script>

<style></style>
