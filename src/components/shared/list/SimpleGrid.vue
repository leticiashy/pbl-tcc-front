<template>
  <v-card v-if="data.length > 0">
    <v-toolbar card dense color="transparent">
      <v-toolbar-title
        ><h4>{{ title }}</h4></v-toolbar-title
      >
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-card-text class="pa-0">
      <template>
        <v-data-table
          :headers="headers"
          :items="data"
          class="elevation-0 table-striped subheading"
        >
          <template slot="items" slot-scope="props">
            <td
              v-for="(header, index) in headers"
              :class="{
                'text-xs-right': header.aling === 'right' || index !== 0,
                'text-xs-left': header.aling === 'left' || index !== 0,
              }"
              v-bind:key="header.value"
              v-html="
                header.customTemplate
                  ? header.customTemplate(props.item)
                  : props.item[header.value]
              "
            ></td>
          </template>
        </v-data-table>
      </template>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    headers: {
      type: Array,
    },
    data: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped>
table.table thead th tr td {
  font-size: 16px;
  -webkit-transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  white-space: nowrap;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  color: #37474f;
}

.datatable thead th.column.sortable.active {
  -webkit-transform: none;
  transform: none;
  font-size: 14px;
}
</style>
