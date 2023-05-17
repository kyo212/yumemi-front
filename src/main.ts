import { createApp } from "vue";
import App from "./App.vue";
import VueHighcharts from "vue3-highcharts";
import { createPinia } from "pinia";
import "./style.css";

const app = createApp(App);
const pinia = createPinia();

app.use(VueHighcharts).use(pinia);

app.mount("#app");
