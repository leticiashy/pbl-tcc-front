<template>
  <v-combobox
    multiple
    v-model="select"
    :label="label"
    append-icon
    chips
    deletable-chips
    :items="items"
    class="tag-input"
    :search-input.sync="search"
    @input="updateTags"
  >
  </v-combobox>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
    },
    value: {
      type: Array,
    },
    label: {
      type: String,
    },
  },
  data() {
    return {
      select: this.value || [],
      search: "",
    };
  },
  watch: {
    select: {
      immediate: true,
      handler: function(value) {
        this.$emit("input", value);
      },
    },
  },
  methods: {
    updateTags() {
      this.search = "";
      console.log(this.select);
    },
  },
};
</script>

<style>
.tag-input span.chip {
  background-color: #1976d2;
  color: #fff;
  font-size: 1em;
}

.tag-input span.v-chip {
  background-color: #1976d2;
  color: #fff;
  font-size: 1em;
  padding-left: 7px;
}

.tag-input span.v-chip::before {
  content: "label";
  font-family: "Material Icons";
  font-weight: normal;
  font-style: normal;
  font-size: 20px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: "liga";
  -webkit-font-smoothing: antialiased;
}
</style>
