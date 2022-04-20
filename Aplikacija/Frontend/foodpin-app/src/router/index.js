import  Vue  from 'vue'
import Router from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import LoginPage from '../pages/LoginPage.vue'

Vue.use(Router);

const router = new Router({
    routes:[
        {
            path: '/',
            name: 'HomePage',
            component: HomePage
        },
        {
            path:'/Login',
            name: 'Login',
            component: LoginPage,
            // beforeEnter(to, from, next){
            //     let tip = Vue.$cookies.get("tip")
            //     if(tip === 'Customer'){
            //         next({name: 'Customer'});
            //     }
            //     else if(tip === 'Store'){
            //         next({name: 'Store'})
            //     }
            //     else if(tip === 'Deliverer'){
            //         next({name: 'Deliverer'})
            //     }
            //     else{
            //         next();
            //     }
            // }
        },
        

    ]
 });
export default router