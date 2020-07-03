import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import Bus from './assets/bus'

Vue.config.productionTip = false
// 事件总线
//Vue.prototype.$bus = new Vue()
Vue.prototype.$bus = new Bus()

new Vue({
  render: h => h(App),
}).$mount('#app')
