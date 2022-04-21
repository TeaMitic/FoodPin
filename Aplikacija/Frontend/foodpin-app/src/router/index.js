import  Vue  from 'vue'
import Router from 'vue-router'
import HomePage from '../pages/HomePage.vue'

Vue.use(Router);

const router = new Router({
    routes:[
        {
            path: '/',
            name: 'HomePage',
            component: HomePage
        },
        
        

    ]
 });
export default router
