import service from "../utils/service.js";

const getQuestionType = () => {
    return service.request({
        url: `/assist/questionType`,
        method: "get",
    });
};
const getAnswerByType = (type) => {
    return service.request({
        url: `/assist/returnAskByType/${type}`,
        method: "get",
    });
};
const askQuestion = (params) => {
    return service.request({
        url: `/assist/userQuestion`,
        method: "get",
        params: params
    });
};
export {getQuestionType, getAnswerByType, askQuestion};
