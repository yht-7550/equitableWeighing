import dayjs from 'dayjs'
import * as Pinia from 'pinia'
import uviewPlus from 'uview-plus'
import { createSSRApp } from 'vue'
import App from './App.vue'

import 'virtual:uno.css'

import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')

export const createApp: any = () => {
  const app = createSSRApp(App)

  app.use(Pinia.createPinia())
  app.use(uviewPlus)

  return {
    app,
    Pinia,
  }
}
