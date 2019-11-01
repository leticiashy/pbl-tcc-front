<template>
  <div class="app-layout">
    <!-- sideleft -->
    <side-left class="app--drawer"></side-left>
    <!-- sidetop -->
    <side-top class="app--toolbar"></side-top>
    <!-- content -->
  </div>
</template>
<script>
import SideLeft from "@/components/shared/ui/SideLeft";
import SideTop from "@/components/shared/ui/SideTop";

export default {
  components: {
    SideLeft,
    SideTop
  },
  data() {
    return {
      expanded: true,
      rightDrawer: false,
      snackbar: {
        show: false,
        text: "",
        color: ""
      }
    };
  },

  created() {
    window.getApp = this;
  }
};
</script>

<style scoped>
.setting-fab {
  top: 50% !important;
  right: 0;
  border-radius: 0;
}
.page-wrapper {
  min-height: calc(100vh - 50px - 50px - 81px);
}
</style>
