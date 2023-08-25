import service from "../utils/service.js";

const teamSignUp = (matchid, data) => {
  return service.request({
    url: `/sign/${matchid}`,
    method: "post",
    data: data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
const cancelSignUp = (signid) => {
  return service.request({
    url: `/sign/deletesign/${signid}`,
    method: "get",
  });
};
const signUpDetail = (groupid) => {
  return service.request({
    url: `/sign/groupsigninfo/${groupid}`,
    method: "get",
  });
};
const reSignUp = (signid, data) => {
  return service.request({
    url: `/sign/resign/${signid}`,
    method: "post",
    data: data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export { teamSignUp, cancelSignUp, signUpDetail, reSignUp };
