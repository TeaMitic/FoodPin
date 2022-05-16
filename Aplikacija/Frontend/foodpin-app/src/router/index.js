import  Vue  from 'vue'
import Router from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import UserPage from '../pages/UserPage.vue'

Vue.use(Router);

const router = new Router({
    routes:[
        {
            path: '/',
            name: 'HomePage',
            component: HomePage
        },
        {
            path: '/UserPage',
            name: 'UserPage',
            component: UserPage
        }
        
        

    ]
 });
export default router
