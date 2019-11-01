<template>
  <v-app>
    <Loading class="app-loader" :active="longLoading > 0 || loading > 0" />
    <router-view />
  </v-app>
</template>

<script>
import Loading from "./components/shared/ui/Loading";
import { mapState } from "vuex";

export default {
  components: {
    Loading
  },
  computed: mapState(["loading", "longLoading"])
};
</script>
