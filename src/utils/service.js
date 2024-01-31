import axios from "axios";
import {getToken} from "@/utils/auth";
import {ElMessage} from "element-plus";
import router from '@/router'

//创建axios实例
const service = axios.create({
    baseURL: "/api",
    timeout: 10000,
});
// 添加请求拦截器
service.interceptors.request.use(
    function (config) {
        // 在发送请求之前做些什么
        config.headers["token"] = getToken("token");
        return config;
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 添加响应拦截器
service.interceptors.response.use(
    function (res) {
        // 2xx 范围内的状态码都会触发该函数。
        // 对响应数据做点什么
        return res.data;
    },
    function (err) {
        let {status} = err.response
        // 超出 2xx 范围的状态码都会触发该函数。
        // 对响应错误做点什么
        if (status === 403 && router.currentRoute.value.fullPath !== "/login") {
            // router.push("/login").then(res => {
            //     ElMessage.error("登录已过期，请重新登录")
            // })
        }
        return Promise.reject(err);
    }
);

export default service;
