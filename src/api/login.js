import service from "../utils/service.js";
//登录接口封装
const login = (data) => {
  //   return new Promise((resolve, reject) => {
  //     service
  //       .request({
  //         url: "/user/tologin",
  //         method: "post",
  //         data: data,
  //       })
  //       .then((res) => {
  //         resolve(res);
  //       })
  //       .catch((err) => {
  //         reject(err);
  //       });
  //   });
  return service.request({
    url: "/user/tologin",
    method: "post",
    data: data,
  });
};
const logout = () => {
  return service.request({
    url: "/user/logout",
    method: "get",
  });
};
export { login, logout };
