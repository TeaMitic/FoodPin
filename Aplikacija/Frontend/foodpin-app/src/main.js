import '@/assets/styles.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import Toasted from 'vue-toasted'
import store from './api-services/data'
import Axios from 'axios'
import VueCookies from 'vue-cookies'
import Validation from '../src/helper/validation'
import {faPlus,faEdit, faTrash, faHeart, faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
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


//url simplefier
Vue.filter('trimWeb', function(value) { 
  if (value) {
    //https://instagram/user123.com/
    return value.replace(/(^\w+:|^)\/\//, '');
    
  }
})

//icons
library.add(faPlus)
library.add(faEdit)
library.add(faTrash)
library.add(faHeart)
library.add(faArrowLeft)

Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
