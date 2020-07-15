import Vue from 'vue'
import App from './App.vue'
import {createRouter} from './router'
import store from './store'

Vue.config.productionTip = false

// 需要每个请求返回一个vue实例
export function createApp(context) {
  const router = new createRouter()
  const app = new Vue({
    router,
    context, // 用于和外面的renderer交互
    store,
    render: h => h(App)
  })

  return {app, router}
}