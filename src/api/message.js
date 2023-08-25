import service from "../utils/service.js";

const inviteMessage = (api) => {
  return service.request({
    url: `/${api}/invited`,
    method: "get",
  });
};
const userInfo = (params) => {
  return service.request({
    url: "/user/card",
    method: "get",
    params: params,
  });
};
const handleInvite = (params, id) => {
  return service.request({
    url: `/group/invited/${id}`,
    method: "get",
    params: params,
  });
};
export { inviteMessage, userInfo, handleInvite };
