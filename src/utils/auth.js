const tokenKey = "token";
//获取token
const getToken = function () {
  return localStorage.getItem(tokenKey);
};
//设置token
const setToken = function (token) {
  return localStorage.setItem(tokenKey, token);
};
//移出token
const removeToken = function () {
  return localStorage.removeItem(tokenKey);
};

export { setToken, getToken, removeToken };
