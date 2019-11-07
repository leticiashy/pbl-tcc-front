import Vue from "vue";
import Router from "vue-router";
import AuthService from "@/services/AuthService";

import Empty from "@/components/master/Empty";
import Internal from "@/components/master/Internal";

import Resume from "@/components/pages/dashboard/Resume";

import UserList from "@/components/pages/users/List";
import UserEdit from "@/components/pages/users/Edit";
import UserProfile from "@/components/pages/users/Profile";

import EventList from "@/components/pages/events/List";

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
      component: Login
    },
    {
      path: "/create-account",
      name: "create-account",
      component: CreateAccount
    },
    {
      path: "/",
      name: "Internal",
      component: Internal,
      meta: {
        context: ["user", "manager", "admin"]
      },
      children: [
        {
          path: "/resume",
          name: "Resume",
          component: Resume
        },

        {
          path: "/users",
          name: "User",
          component: Empty,
          children: [
            {
              path: "/users/list",
              name: "UserList",
              component: UserList
            },
            {
              path: "/users/profile",
              name: "UserProfile",
              component: UserProfile
            },
            {
              path: "/users/:username/show",
              name: "UserShow",
              component: Empty
            },
            {
              path: "/users/:username/edit",
              name: "UserEdit",
              component: UserEdit
            }
          ]
        },

        {
          path: "/events",
          name: "Event",
          component: Empty,
          children: [
            {
              path: "/events/list",
              name: "EventList",
              component: EventList
            },
            {
              path: "/events/add",
              name: "EventAdd",
              component: Empty
            },
            {
              path: "/events/:id/show",
              name: "EventShow",
              component: Empty
            },
            {
              path: "/events/:id/edit",
              name: "EventEdit",
              component: Empty
            }
          ]
        }
      ]
    },
    {
      path: "*",
      redirect: "/resume"
    }
  ]
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
          query: { returnUrl: to.fullPath }
        });
        return;
      }
    }
  }

  next();
});

export default router;
