import service from "../utils/service.js";

const changePw = (params) => {
  return service.request({
    url: `/user/password`,
    method: "get",
    params: params,
  });
};
export { changePw };
