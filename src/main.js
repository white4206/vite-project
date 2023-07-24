import { createApp } from "vue";
import "./style.css";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

const pinia = createPinia();
const app = createApp(App);

app.use(ElementPlus);
app.use(router); //注册路由
app.use(pinia);
app.mount("#app"); //挂载节点
