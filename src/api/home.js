import service from "../utils/service.js";
// 获取推荐文章
const getAllPush = () => {
    return service.request({
        url: `/user/allPush`,
        method: "get",
    });
};
// 首页前五条公告通知
const getNotifyUpdates = () => {
    return service.request({
        url: `/info/NotifyUpdates`,
        method: "get",
    });
};
// 获取首页轮播图
const getHomeRotation = () => {
    return service.request({
        url: `/info/rotation/1 `,
        method: "get",
    });
};
// 获取外部竞赛推荐
const getLinkCompetition = () => {
    return service.request({
        url: "/match/otherMatch",
        method: "get"
    })
}
export {getAllPush, getNotifyUpdates, getHomeRotation, getLinkCompetition};
