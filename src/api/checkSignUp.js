import service from "../utils/service.js";

const waitCheck = () => {
  return service.request({
    url: `/teacher/check`,
    method: "get",
  });
};
const teamDetail = (gruopid) => {
  return service.request({
    url: `/user/groupcard/${gruopid}`,
    method: "get",
  });
};
const handleCheck = (signid, params) => {
  return service.request({
    url: `/teacher/check/${signid}`,
    method: "get",
    params: params,
  });
};
export { waitCheck, teamDetail, handleCheck };
