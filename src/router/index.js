import { createRouter, createWebHashHistory } from "vue-router";
import NotFound from "../components/NotFound/NotFound.vue";

const routes = [
  {
    path: "/login",
    component: () => import("../views/login/index.vue"),
  },
  {
    path: "/home",
    component: () => import("../views/home/index.vue"),
  },
  {
    path: "/competition",
    component: () => import("../views/competition/index.vue"),
    children: [
      {
        path: "totalCompetitions",
        component: () =>
          import("../views/competition/components/TotalCompetitions.vue"),
      },
      {
        path: "details/:Cid",
        component: () => import("../views/competition/components/Details.vue"),
      },
      {
        path: "/competition",
        redirect: "/competition/totalCompetitions",
      },
      {
        path: "/competition/:temp",
        redirect: "/competition/totalCompetitions",
      },
    ],
  },
  {
    path: "/notice",
    component: () => import("../views/notice/index.vue"),
    children: [
      {
        path: ":Nid",
        component: () => import("../views/notice/index.vue"),
      },
    ],
  },
  {
    path: "/user",
    component: () => import("../views/user/index.vue"),
    children: [
      {
        path: "created",
        component: () => import("../views/user/created/index.vue"),
      },
      {
        path: "joined",
        component: () => import("../views/user/joined/index.vue"),
      },
      {
        path: "message",
        component: () => import("../views/user/message/index.vue"),
      },
      {
        path: "information",
        component: () => import("../views/user/information/index.vue"),
      },
      {
        path: "/user",
        redirect: "/user/created",
      },
    ],
  },
  {
    path: "/settings",
    component: () => import("../views/settings/index.vue"),
  },
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFound,
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
router.beforeEach(async (to, from, next) => {
  let isAuthenticated = await localStorage.getItem("loginToken");
  if (to.path !== "/login" && isAuthenticated !== "successful login")
    next({
      path: "/login",
    });
  else next();
});
export default router;
