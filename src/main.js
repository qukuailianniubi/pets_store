import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VCharts from 'v-charts'
import ElementUI from 'element-ui'
import Common from '@/common/index.js'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(VCharts)
Vue.use(ElementUI)

Vue.prototype.common = Common


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
