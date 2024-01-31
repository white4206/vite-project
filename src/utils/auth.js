import {getCookies, setCookies, removeCookies} from "@/utils/cookie.js";

const tokenKey = "token";
//获取token
const getToken = function () {
    return getCookies(tokenKey);
};
//设置token
const setToken = function (token) {
    return setCookies(tokenKey, token, 60 * 60 * 100);
};
//移出token
const removeToken = function () {
    return removeCookies(tokenKey);
};

export {setToken, getToken, removeToken};
