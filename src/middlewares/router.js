import Vue from "vue";
import Router from "vue-router";
import AuthService from "@/services/AuthService";

import External from "@/components/master/External";
import Internal from "@/components/master/Internal";

import Dashboard from "@/components/pages/dashboard/Dashboard";
import Login from "@/components/pages/access/Login";

import store from "@/middlewares/store";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  linkActiveClass: "is-active",
  routes: [
    {
      path: "/",
      name: "external",
      component: External,
      children: [
        {
          path: "/login",
          name: "login",
          component: Login
        },
        {
          path: "/",
          redirect: "/dashboard"
        }
      ]
    },
    {
      path: "/",
      name: "Internal",
      component: Internal,
      meta: {
        context: "company"
      },
      children: [
        {
          path: "/dashboard",
          name: "Dashboard",
          component: Dashboard
        }
      ]
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
