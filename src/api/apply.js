import service from "../utils/service.js";

const applyAward = (data) => {
    return service.request({
        url: `/application/applicationAwards`,
        method: "post",
        data: data,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};
const getApplyRecordList = () => {
    return service.request({
        url: `/application/applicationRecord`,
        method: "get",
    });
}
export {applyAward, getApplyRecordList};
