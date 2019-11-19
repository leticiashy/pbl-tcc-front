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
import store from "@/middlewares/store";

import SideLeft from "@/components/shared/ui/SideLeft";
import SideTop from "@/components/shared/ui/SideTop";

export default {
  components: {
    SideLeft,
    SideTop,
  },
  data() {
    return {
      expanded: true,
      rightDrawer: false,
      snackbar: {
        show: false,
        text: "",
        color: "",
      },
    };
  },
  computed: {
    accountItems() {
      return this.itemsNavMenu.reduce((acc, nxt) => {
        if (!nxt.items) {
          return acc.concat(
            Object.assign({}, nxt, {
              text: nxt.title,
              icon: nxt.action,
              path: nxt.path,
            })
          );
        } else {
          return acc.concat(
            nxt.items.map(item => {
              return item && !item.action ? Object.assign({}, nxt, item) : item;
            })
          );
        }
      }, []);
    },
    itemsNavMenu() {
      return [
        {
          path: "/resume",
          title: this.$t("GLOBAL.RESUME"),
          action: "home",
        },

        {
          path: "",
          title: this.$t("GLOBAL.USER_SECTION"),
          action: "list",
          items: [
            this.canShow(["admin"]) && {
              path: "/users/list",
              text: this.$t("GLOBAL.LIST_USER"),
            },
          ],
        },

        {
          path: "",
          title: this.$t("GLOBAL.EVENT_SECTION"),
          action: "description",
          items: [
            this.canShow(["admin", "manager", "user"]) && {
              path: "/events/list",
              text: this.$t("GLOBAL.LIST_EVENT"),
            },
            this.canShow(["admin", "manager"]) && {
              path: "/events/add",
              text: this.$t("GLOBAL.ADD_EVENT"),
              action: "playlist_add",
            },
          ],
        },

        {
          path: "",
          title: this.$t("GLOBAL.ACCOUNT_SECTION"),
          action: "account_circle",
          items: [
            this.canShow(["user"]) && {
              action: "account_circle",
              path: "/users/profile",
              text: this.$t("GLOBAL.PROFILE_USER"),
            },
            this.canShow(["admin", "manager", "user"]) && {
              action: "exit_to_app",
              path: "/login",
              text: this.$t("GLOBAL.LOGOUT"),
              click: () => {
                store.commit("user/LOG_OUT");
                window.getApp.$emit("APP_LOGOUT");
              },
            },
          ],
        },
      ];
    },
  },
  created() {
    window.getApp = this;
  },
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
