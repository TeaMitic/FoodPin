import '@/assets/styles.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import Toasted from 'vue-toasted'
import store from './api-services/data'
import Axios from 'axios'
import VueCookies from 'vue-cookies'
import Validation from '../src/helper/validation'
import ('bootstrap')

const pluginValidation = { 
  install() {
    Vue.helpers = Validation,
    Vue.prototype.$helpers = Validation
  }
}
Vue.use(pluginValidation)

Vue.config.productionTip = false

Axios.defaults.baseURL = process.env.API_ENDPOINT;

// Vue.component('AppSpinner', AppSpinner);
Vue.use(VueCookies);
Vue.use(Toasted);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
