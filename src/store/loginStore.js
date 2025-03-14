import {defineStore} from "pinia";
import {ref} from "vue";
import {setToken, removeToken} from "../utils/auth";
import {getHeadImg} from "@/api/information.js";
import {getCookies, setCookies} from "@/utils/cookie.js";

const useLoginStore = defineStore("isLogin", () => {
    const avatarUrl = ref();
    const reloadAvatar = () => {
        getHeadImg()
            .then((res) => {
                if (res.code === 200) {
                    if (res.data === null)
                        avatarUrl.value =
                            "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
                    else avatarUrl.value = "http://140.143.139.167" + res.data;
                }
            })
            .catch((err) => console.log(err));
    };
    const SET_TOKEN = (token) => {
        setToken(token);
    };
    const REMOVE_TOKEN = () => {
        removeToken();
    };
    const SET_ROLE = (role) => {
        setCookies("role", role, 60 * 60 * 100) // 100小时过期
    }
    const GET_ROLE = () => {
        return getCookies("role")
    }
    return {
        avatarUrl,
        reloadAvatar,
        SET_TOKEN,
        REMOVE_TOKEN,
        SET_ROLE,
        GET_ROLE
    };
});
export default useLoginStore;
