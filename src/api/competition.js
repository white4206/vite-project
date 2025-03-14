import service from "../utils/service.js";

const getCompetitions = (params, pagenum) => {
    return service.request({
        url: `/match/matchpage/${pagenum}`,
        method: "get",
        params: params
    });
};
const getCompetitionType = () => {
    return service.request({
        url: `/match/typeList`,
        method: "get",
    });
}
const competitionsDetail = (matchid) => {
    return service.request({
        url: `/match/matchbyid/${matchid}`,
        method: "get",
    });
};
const positionStep = (params) => {
    return service.request({
        url: `/step/positionstep`,
        method: "get",
        params: params,
    });
};
// 查看官方群聊消息
const getChatGroup = (type) => {
    return service.request({
        url: `/info/community/${type}`,
        method: "get",
    });
};
// 返回热度前十的竞赛
const getHotCompetition = () => {
    return service.request({
        url: "/info/calorificValue",
        method: "get"
    })
}
// 获取首页轮播图
const getCompetitionRotation = () => {
    return service.request({
        url: `/info/rotation/2 `,
        method: "get",
    });
};
const getExcellentStudent = () => {
    return service.request({
        url: "/excellentStudent",
        method: "get"
    })
}
export {
    getCompetitions,
    competitionsDetail,
    positionStep,
    getChatGroup,
    getHotCompetition,
    getCompetitionRotation,
    getCompetitionType,
    getExcellentStudent
};
