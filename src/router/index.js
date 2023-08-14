import { createRouter, createWebHashHistory } from "vue-router";
import NotFound from "../components/NotFound/index.vue";
import useUserStore from "../store/userStore";

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
        path: "competitions",
        component: () => import("../views/competition/competitions/index.vue"),
      },
      {
        path: "competitions/details/:Cid",
        component: () => import("../views/competition/details/index.vue"),
      },
      {
        path: "checkSignUp",
        component: () => import("../views/competition/checkSignUp/index.vue"),
      },
      {
        path: "checkSignUp/details/:Sid",
        component: () => import("../views/competition/checkDetails/index.vue"),
      },
      {
        path: "/competition",
        redirect: "/competition/competitions",
      },
      // {
      //   path: "/competition/:temp",
      //   redirect: "/competition/competitions",
      // },
    ],
  },
  {
    path: "/notice",
    component: () => import("../views/notice/index.vue"),
    children: [
      {
        path: "notices",
        component: () => import("../views/notice/notices/index.vue"),
      },
      {
        path: "details/:Nid",
        component: () => import("../views/notice/details/index.vue"),
      },
      {
        path: "/notice",
        redirect: "/notice/notices",
      },
    ],
  },
  {
    path: "/user",
    component: () => import("../views/user/index.vue"),
    children: [
      {
        path: "guided",
        component: () => import("../views/user/guided/index.vue"),
      },
      {
        path: "created",
        component: () => import("../views/user/created/index.vue"),
      },
      {
        path: "joined",
        component: () => import("../views/user/joined/index.vue"),
      },
      {
        path: "goldMedal",
        component: () => import("../views/user/goldMedal/index.vue"),
      },
      {
        path: "message",
        component: () => import("../views/user/message/index.vue"),
        children: [
          {
            path: "messageContent/:Mid",
            component: () =>
              import(
                "../views/user/message/components/MessageContent/index.vue"
              ),
          },
        ],
      },
      {
        path: "information",
        component: () => import("../views/user/information/index.vue"),
      },
      {
        path: "/user",
        redirect: "/user/created",
      },
      {
        path: "/user/:pathMatch(.*)*",
        component: NotFound,
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
  const store = useUserStore();
  let isAuthenticated = await localStorage.getItem("loginToken");
  if (to.path !== "/login" && isAuthenticated !== "successful login")
    next({
      path: "/login",
    });
  else if (to.path === "/user/created" && store.isTeacher)
    next({
      path: "/user/guided",
    });
  else next();
});
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});
export default router;
