import { createApp } from "vue";
import "./style.css";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import useLoginStore from "@/store/loginStore";

const pinia = createPinia();
const app = createApp(App);

app.use(ElementPlus, {
  locale: zhCn,
});
app.use(router); //注册路由
app.use(pinia);

//刷新移出token
const store = useLoginStore();
window.onload = () => {
  store.REMOVE_TOKEN();
};

app.mount("#app"); //挂载节点
