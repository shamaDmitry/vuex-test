import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import toastr from './plugins/vueToastification'
import moment from 'moment'
import Axios from 'axios'

Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

Vue.prototype.$moment = moment
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  toastr,
  render: h => h(App)
}).$mount('#app')
