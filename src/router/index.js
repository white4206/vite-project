import { createRouter, createWebHashHistory } from "vue-router";
import LoginLayout from "../layout/LoginLayout/LoginLayout.vue";
import Home from "../views/home/Home.vue";
import SystemNotice from "../views/notice/SystemNotice.vue";
import UserCenter from "../views/user/UserCenter.vue";
import CompetitionDetails from "../views/competition/CompetitionDetails.vue";
import NotFound from "../components/NotFound/NotFound.vue";
import Created from "../layout/UserCenterLayout/components/Created.vue";
import Joined from "../layout/UserCenterLayout/components/Joined.vue";
import Message from "../layout/UserCenterLayout/components/Message.vue";
import Information from "../layout/UserCenterLayout/components/Information.vue";
import CompetitionDetailLayout from "../layout/CompetitionDetailsLayout/competitionDetailsLayout.vue";
import Details from "../layout/CompetitionDetailsLayout/components/Details.vue";

const routes = [
  {
    path: "/login",
    component: LoginLayout,
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/notice",
    component: SystemNotice,
  },
  {
    path: "/user",
    component: UserCenter,
    children: [
      {
        path: "created",
        component: Created,
      },
      {
        path: "joined",
        component: Joined,
      },
      {
        path: "message",
        component: Message,
      },
      {
        path: "information",
        component: Information,
      },
      {
        path: "/user",
        redirect: "/user/created",
      },
    ],
  },
  {
    path: "/competition",
    component: CompetitionDetails,
    children: [
      {
        path: "totalCompetitions",
        component: CompetitionDetailLayout,
      },
      {
        path: "details/:Cid",
        component: Details,
      },
      {
        path: "/competition",
        redirect: "/competition/totalCompetitions",
      },
    ],
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
