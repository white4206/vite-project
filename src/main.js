import {createApp} from "vue";
import ElementPlus from "element-plus";
import "./style.css";
import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "./router";
import {createPinia} from "pinia";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import {vue3ScrollSeamless} from "vue3-scroll-seamless";

const pinia = createPinia();
const app = createApp(App);

app.use(ElementPlus, {
    locale: zhCn,
});
app.use(router); //注册路由
app.use(pinia);

app.component('vue3ScrollSeamless', vue3ScrollSeamless)
    .mount("#app"); //挂载节点
