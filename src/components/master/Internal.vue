<template>
  <v-content style="padding: 64px 0px 0px 0px">
    <layout />
    <v-container>
      <router-view />
    </v-container>
  </v-content>
</template>

<script>
import Layout from "@/components/shared/ui/Layout";

export default {
  components: {
    Layout,
  },
};
</script>

<style scoped>
.content {
  padding: 10px 0px 0px;
}

.v-card {
  -webkit-box-shadow: 0 1px 1px 0 rgba(60, 64, 67, 0.08),
    0 1px 3px 1px rgba(60, 64, 67, 0.16);
  box-shadow: 0 1px 1px 0 rgba(60, 64, 67, 0.08),
    0 1px 3px 1px rgba(60, 64, 67, 0.16);
}

.v-card__actions .v-btn {
  margin: 0 8px;
  min-width: 56px;
}

.v-card__actions .v-btn:first-child {
  margin-left: 0;
}
</style>
