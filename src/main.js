// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import store from './store/index.js'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import Qs from 'qs'
import Rate from 'vue-tiny-rate'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$axios = axios
Vue.prototype.qs = Qs

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  Rate,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
  let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
  if (userInfo && userInfo.access_token) {
    next()
  } else if (to.path === '/register' || to.path === '/login') {
    next()
  } else {
    next('/login')
  }
})
