import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import './plugins/element'
import './plugins/avue'
import router from './router'

Vue.config.productionTip = false

// 正常情况下开发使用前端直接代理，但生产环境的时候一样失效所以最好是后台解决cors跨域问题，前端配置基础url即可
const http = axios.create({
  baseURL: process.env.VUE_APP_BASEURL
});
Vue.prototype.$http = http

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
