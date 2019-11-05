<template>
  <div class="app-layout">
    <!-- sideleft -->
    <side-left class="app--drawer" :items="itemsNavMenu"></side-left>
    <!-- sidetop -->
    <side-top class="app--toolbar" :items="accountItems"></side-top>
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
  computed: {
    accountItems() {
      return [
        {
          icon: "account_circle",
          href: "/users/profile",
          title: this.$t("GLOBAL.PROFILE_USER")
        },
        {
          icon: "exit_to_app",
          href: "/login",
          title: this.$t("GLOBAL.LOGOUT"),
          click: () => {
            store.commit("user/LOG_OUT");
            window.getApp.$emit("APP_LOGOUT");
          }
        }
      ];
    },
    itemsNavMenu() {
      return [
        {
          path: "/resume",
          title: this.$t("GLOBAL.RESUME"),
          action: "ti-home"
        },

        {
          path: "",
          title: this.$t("GLOBAL.USER_SECTION"),
          action: "ti-user",
          items: [
            this.canShow(["admin", "manager"]) && {
              path: "/users/list",
              text: this.$t("GLOBAL.LIST_USER")
            },
            this.canShow(["admin", "manager", "user"]) && {
              path: "/users/profile",
              text: this.$t("GLOBAL.PROFILE_USER")
            }
          ]
        },

        {
          path: "",
          title: this.$t("GLOBAL.EVENT_SECTION"),
          action: "ti-agenda",
          items: [
            this.canShow(["admin", "manager", "user"]) && {
              path: "/events/list",
              text: this.$t("GLOBAL.LIST_EVENT")
            },
            this.canShow(["admin", "manager"]) && {
              path: "/events/add",
              text: this.$t("GLOBAL.ADD_EVENT")
            }
          ]
        }
      ];
    }
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
