import service from "../utils/service.js";

const getAnalyzeData = (data) => {
    return service.request({
        url: "/competitiveAnalysis",
        method: "GET",
    });
};
const getUserAnalyze = (id) => {
    return service.request({
        url: `http://140.143.139.167:8899/analyze/?id=${id}`,
        method: "GET",
    })
}
export {getAnalyzeData, getUserAnalyze};
