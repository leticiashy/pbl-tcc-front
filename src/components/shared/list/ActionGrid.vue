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
          class="elevation-2 mi-dataTable"
          :headers="headers"
          :items="data"
          :pagination.sync="pagination"
          :hide-actions="hideActions"
          :rows-per-page-items="rowsPerPageItems"
          :total-items="serverSide ? totalItems : null"
          :must-sort="!serverSide"
        >
          <template v-slot:headers="props">
            <tr>
              <th
                v-for="(header, index) in headers"
                :key="header.text"
                :class="[
                  'midh-text',
                  index === 0 ? 'first' : '',
                  header.align === 'left' ? 'text-xs-left' : 'text-xs-right',
                  header.sortable !== false ? 'sortable' : '',
                  header.value === pagination.sortBy
                    ? 'active ' + (pagination.direction || '')
                    : ''
                ]"
                @click.prevent="changeSort(header.value, header.sortable)"
              >
                <v-icon
                  v-if="
                    header.sortable !== false &&
                      pagination.direction === 'asc' &&
                      pagination.sortBy === header.value
                  "
                  small
                  >arrow_upward</v-icon
                >
                <v-icon
                  v-else-if="
                    header.sortable !== false &&
                      pagination.direction === 'desc' &&
                      pagination.sortBy === header.value
                  "
                  small
                  >arrow_downward</v-icon
                >
                {{ header.text }}
              </th>
            </tr>
          </template>

          <template v-slot:items="props">
            <tr class="mid-datacell">
              <td
                v-for="(header, index) in headers"
                v-bind:key="index"
                class="midd-text"
                :class="{
                  'text-xs-right': header.aling === 'right' || index !== 0,
                  'text-xs-left': header.aling === 'left' || index !== 0,
                  first: index === 0
                }"
                v-html="
                  header.customTemplate
                    ? header.customTemplate(props.item)
                    : props.item[header.value]
                "
                @click.prevent="header.click ? header.click(props.item) : false"
              ></td>
            </tr>
          </template>
        </v-data-table>
      </template>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "ActionGrid",
  props: {
    title: {
      type: String,
      default: ""
    },
    headers: {
      type: Array,
      default: function() {
        return [];
      }
    },
    data: {
      type: Array,
      default: function() {
        return [];
      }
    },
    rowsPerPageItems: {
      type: Array
    },
    value: {
      type: Object,
      default: function() {
        return {
          sortBy: null,
          direction: null,
          page: 1,
          rowsPerPage: 25
        };
      }
    },
    serverSide: {
      type: Boolean,
      default: false
    },
    hideActions: {
      type: Boolean,
      default: false
    },
    totalItems: {
      type: Number
    }
  },
  watch: {
    pagination: {
      deep: true,
      immediate: true,
      handler: function(newVal, oldVal = {}) {
        if (newVal.page && oldVal.page && newVal.page !== oldVal.page) {
          this.$emit("changePage", newVal.page);
        }

        this.$emit("input", newVal);
      }
    },
    value: {
      deep: true,
      immediate: true,
      handler: function(newVal) {
        this.pagination = newVal;
      }
    }
  },
  data() {
    return {
      pagination: this.value
    };
  },
  methods: {
    changeSort(column, sortable = true) {
      if (!this.serverSide) {
        let pagination = Object.assign({}, this.pagination);

        if (sortable) {
          if (pagination.sortBy === column) {
            pagination.direction =
              pagination.direction === "asc" ? "desc" : "asc";
            pagination.descending = !pagination.descending;
          } else {
            pagination.sortBy = column;
            pagination.direction = "asc";
            pagination.descending = false;
          }
        }

        this.pagination = pagination;
      }

      this.$emit("changeSort", column, sortable, this.pagination);
    }
  }
};
</script>

<style scoped>
.mi-dataTable thead,
.mi-dataTable thead * {
  background: rgba(125, 125, 125, 0.4) !important;
  color: #fafafa !important;
  font-size: 1rem;
}

.mi-dataTable thead bold {
  font-weight: bold !important;
}

.mi-dataTable {
  table-layout: fixed !important;
}

.mid-headercell,
.mid-datacell {
  text-align: left;
}

.midh-text,
.midd-text {
  display: table-cell !important;
}

.midd-text.first,
.midh-text.first {
  width: 100% !important;
}

.midh-text {
  padding: 0 10px 0 24px !important;

  font-weight: bold !important;
}

.midh-text.sortable {
  cursor: pointer !important;
}

.midd-text {
  vertical-align: middle !important;
}
</style>
