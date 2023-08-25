import service from "../utils/service.js";

const changeInfo = (params) => {
  return service.request({
    url: `/user/information`,
    method: "get",
    params: params,
  });
};
const changeHeadImg = (data) => {
  return service.request({
    url: "/user/upload/headimg",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
const getHeadImg = () => {
  return service.request({
    url: `/user/userheadimg`,
    method: "get",
  });
};
const getInfo = () => {
  return service.request({
    url: `/user/userinformation`,
    method: "get",
  });
};
export { changeInfo, changeHeadImg, getHeadImg, getInfo };
