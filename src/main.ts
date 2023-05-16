import { createApp } from "vue";
import App from "./App.vue";
import VueHighcharts from "vue3-highcharts";
import "./style.css";

const app = createApp(App);
app.use(VueHighcharts);

app.mount("#app");
