// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/base.css'
import App from './App'
import router from './router'
import moment from 'moment'
import HttpServer from '@/plugins/http.js'

Vue.use(ElementUI)
Vue.use(HttpServer)

Vue.config.productionTip = false

Vue.filter('fmtDate', (value) => {
  return moment(value).format('YYYY-MM-DD')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
