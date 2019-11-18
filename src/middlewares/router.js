import Vue from "vue";
import Router from "vue-router";
import AuthService from "@/services/AuthService";

import Empty from "@/components/master/Empty";
import Internal from "@/components/master/Internal";

import Resume from "@/components/pages/dashboard/Resume";

import Login from "@/components/pages/access/Login";
import CreateAccount from "@/components/pages/access/CreateAccount";

import store from "@/middlewares/store";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  linkActiveClass: "is-active",
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/create-account",
      name: "create-account",
      component: CreateAccount,
    },
    {
      path: "/",
      name: "Internal",
      component: Internal,
      meta: {
        context: ["user", "manager", "admin"],
      },
      children: [
        {
          path: "/resume",
          name: "Resume",
          component: Resume,
        },

        {
          path: "/users",
          name: "User",
          component: Empty,
          children: [
            {
              path: "/users/list",
              name: "UserList",
              component: () => import("@/components/pages/users/List"),
            },
            {
              path: "/users/profile",
              name: "UserProfile",
              component: () => import("@/components/pages/users/Profile"),
            },
            {
              path: "/users/:username/show",
              name: "UserShow",
              component: Empty,
            },
            {
              path: "/users/:username/edit",
              name: "UserEdit",
              component: () => import("@/components/pages/users/Edit"),
            },
          ],
        },

        {
          path: "/events",
          name: "Event",
          component: Empty,
          children: [
            {
              path: "/events/list",
              name: "EventList",
              component: () => import("@/components/pages/events/List"),
            },
            {
              path: "/events/area/:areaName",
              name: "EventByArea",
              component: () => import("@/components/pages/events/ListBy"),
            },
            {
              path: "/events/area/:areaName/files",
              name: "FilesByArea",
              component: () => import("@/components/pages/files/Show"),
            },
            {
              path: "/events/add",
              name: "EventCreate",
              component: () => import("@/components/pages/events/Create"),
            },
            {
              path: "/events/:id",
              name: "EventShow",
              component: () => import("@/components/pages/events/Show"),
            },
            {
              path: "/events/:id/edit",
              name: "EventEdit",
              component: Empty,
            },
          ],
        },
      ],
    },
    {
      path: "*",
      redirect: "/resume",
    },
  ],
});

router.beforeEach((to, from, next) => {
  const authService = new AuthService();

  const meta = to.matched.reduce(
    (acc, nxt) => Object.assign({}, acc, nxt.meta),
    {}
  );

  if (meta.context || meta.permission) {
    let ok = false;
    let notAuthorized = false;

    if (authService.isLoggedIn()) {
      ok = true;
    }

    if (!ok) {
      store.commit("user/REDIRECTED_BY_SYSTEM");

      if (notAuthorized) {
        next({ path: "/login" });
        return;
      } else {
        next({
          path: "/login",
          query: { returnUrl: to.fullPath },
        });
        return;
      }
    }
  }

  next();
});

export default router;
