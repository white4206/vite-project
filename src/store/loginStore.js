import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { getToken, setToken, removeToken } from "../utils/auth";
import { getHeadImg } from "@/api/information.js";

const useLoginStore = defineStore("isLogin", () => {
  const token = ref(getToken());
  const isLogin = ref(false);
  const role = ref("1");

  const avatarUrl = ref();
  const reloadAvatar = () => {
    getHeadImg()
      .then((res) => {
        console.log(res)
        if (res.data.code === 200) {
          if (res.data.data.length === 0)
            avatarUrl.value =
              "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
          else avatarUrl.value = "http://140.143.139.167" + res.data.data;
        }
      })
      .catch((err) => console.log(err));
  };

  const SET_TOKEN = (token) => {
    setToken(token);
  };
  const REMOVE_TOKEN = () => {
    token.value = null;
    removeToken();
  };
  return {
    isLogin,
    role,
    avatarUrl,
    reloadAvatar,
    SET_TOKEN,
    REMOVE_TOKEN,
  };
});
export default useLoginStore;
