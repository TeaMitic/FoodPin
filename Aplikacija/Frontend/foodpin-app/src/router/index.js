import  Vue  from 'vue'
import Router from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import ProfilePage from '../pages/ProfilePage.vue'

Vue.use(Router);

function checkCookie() { 
    let userID = Vue.$cookies.get('userID')
    let username = Vue.$cookies.get('username')
    let token = Vue.$cookies.get('token')
    
    if (userID == null) return false
    if (username == null) return false
    if (token == null) return false
    return true
}

const router = new Router({
    routes:[
        {
            path: '/',
            name: 'HomePage',
            component: HomePage
        },
        {
            path: '/Profile/:username/',
            name: 'ProfilePage',
            component: ProfilePage,
            beforeEnter(to,from,next) {
                if (checkCookie()) {
                    next()
                }
                else { 
                    next({name: 'HomePage'})
                }
            }
        }
        

    ]
 });
export default router
