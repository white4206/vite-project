import {createRouter, createWebHashHistory} from "vue-router";
import NotFound from "../components/NotFound/index.vue";
import useLoginStore from "../store/loginStore";
import {getToken} from "@/utils/auth.js";

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
                component: () => import("../views/competition/competition/index.vue"),
            },
            {
                path: "competitions/details/:Cid",
                component: () => import("../views/competition/details/index.vue"),
            },
            {
                path: "/competition",
                redirect: "/competition/competitions",
            },
            // {
            //   path: "/competition/:temp",
            //   redirect: "/competition/competition",
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
        path: "/analyze",
        component: () => import("../views/analyze/index.vue")
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
                path: "message",
                component: () => import("../views/user/message/index.vue"),
                children: [
                    {
                        path: "messageContent/:Mid",
                        component: () =>
                            import("../views/user/message/components/InviteMessage.vue"),
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
        path: "/apply",
        component: () => import("@/views/apply/index.vue")
    },
    {
        path: "/settings",
        component: () => import("../views/settings/index.vue"),
    },
    {
        path: "/help",
        component: () => import("../views/help/index.vue")
    },
    {
        path: "/",
        redirect: "/home",
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
    const store = useLoginStore();
    let isAuthenticated = getToken("token")
    if (to.path !== "/login" && !isAuthenticated)
        next({
            path: "/login",
        });
    else if (to.path === "/user/created" && store.GET_ROLE() === "2")
        next({
            path: "/user/guided",
        });
    else next();
});
router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
});
export default router;
