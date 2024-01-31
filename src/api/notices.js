import service from "../utils/service.js";

const getNotices = (pagenum) => {
  return service.request({
    url: `/info/${pagenum}`,
    method: "get",
  });
};
const getNoticesByType = (pagenum, infoType) => {
  return service.request({
    url: `/info/searchInfoByType/${pagenum}/${infoType}`,
    method: "get",
  });
};
const getDetails = (id) => {
  return service.request({
    url: `/info/search/${id}`,
    method: "get",
  });
};
export { getNotices, getDetails, getNoticesByType };
