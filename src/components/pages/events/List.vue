<template>
  <div id="pageList">
    <v-container fluid grid-list-lg>
      <v-layout row wrap>
        <v-flex pa-2>
          <action-grid
            :title="$t('GLOBAL.LIST_EVENT')"
            :headers="headers"
            :data="events.data"
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
    ActionGrid
  },
  mounted() {
    this.search();
  },
  data() {
    return {
      paramsReady: false,
      color: Material,
      events: {}
    };
  },
  computed: {
    headers() {
      return [
        {
          sortable: false,
          align: "left",
          text: this.$t("EVENTS.LABEL.NAME"),
          value: "name",
          customTemplate: item => {
            return `<a href="/events/${item.id}/show"><strong> ${item.title} </strong></a>`;
          }
        },
        {
          sortable: false,
          text: this.$t("EVENTS.LABEL.NEED_ADDITIONAL"),
          value: "additionalInfo",
          customTemplate: props => {
            if (props.additionalInfo)
              return "<strong style='color:red'>Sim</strong>";
            return "Não";
          }
        },
        {
          sortable: false,
          text: this.$t("EVENTS.LABEL.STATUS"),
          value: "active",
          customTemplate: props => {
            if (props.active) return "Ativo";
            return "Terminado";
          }
        },
        {
          sortable: false,
          text: this.$t("EVENTS.LABEL.INSCRIPTIONS"),
          value: "inscriptions"
        },
        {
          text: this.$t("EVENTS.LABEL.CREATED_AT"),
          value: "created_at",
          customTemplate: item => {
            return moment(item.created_at)
              .utc()
              .format("DD/MM/YYYY HH:mm");
          }
        },
        {
          value: "id",
          customTemplate: item => {
            return this.validateRole(item.role)
              ? `<a href="/events/${item.id}/edit"> ${this.$t(
                  "GLOBAL.EDIT"
                )} </a>`
              : "";
          },
          click: item => {
            this.$router.push(`/events/${item.id}/edit`);
          }
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
              this.apiClient.delete(`events/${item.id}`).then(this.search);
            }
          }
        }
      ];
    }
  },
  methods: {
    search: function() {
      setTimeout(() => {
        this.events = {
          embedded: {
            href: "/events"
          },
          data: [
            {
              title: "Semana tecnológica 2020",
              active: true,
              inscriptions: Math.floor(Math.random() * 15),
              link: "/event/1"
            },
            {
              title: "Projeto final Redes",
              active: false,
              inscriptions: Math.floor(Math.random() * 15),
              link: "/event/1",
              additionalInfo: true
            },
            {
              title: "Seminário de tecnologia e aprendizado",
              active: true,
              inscriptions: Math.floor(Math.random() * 15),
              link: "/event/1"
            },
            {
              title: "Projeto de matemática",
              active: true,
              inscriptions: Math.floor(Math.random() * 15),
              link: "/event/1"
            },
            {
              title: "Estruturas de dado e análise",
              active: false,
              inscriptions: Math.floor(Math.random() * 15),
              link: "/event/1"
            },
            {
              title: "Problemas práticos",
              active: false,
              inscriptions: Math.floor(Math.random() * 15),
              link: "/event/1"
            },
            {
              title: "Curso de Wordpress",
              active: false,
              inscriptions: Math.floor(Math.random() * 15),
              link: "/event/1"
            }
          ]
        };
      }, 1500);
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
