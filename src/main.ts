import dayjs from "dayjs";
import * as Pinia from "pinia";
import { createSSRApp } from "vue";
import App from "./App.vue";

import "dayjs/locale/zh-cn";
import "./assets/css/tailwind.css";

dayjs.locale("zh-cn");

export const createApp: any = () => {
  const app = createSSRApp(App);
  app.use(Pinia.createPinia());

  return {
    app,
    Pinia,
  };
};
