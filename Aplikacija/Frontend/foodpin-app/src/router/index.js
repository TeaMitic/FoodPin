import  Vue  from 'vue'
import Router from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import ProfilePage from '../pages/ProfilePage.vue'
import UserPage from '../pages/UserPage.vue'
import EditProfilePage from '../pages/EditProfilePage.vue'
import PinBuilder from '../pages/PinBuilderPage.vue'
import BoardPage from '../pages/BoardPage.vue'
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
            name: 'homepage',
            component: HomePage
        },
        {
            path: '/profile/:username/',
            name: 'profilepage',
            component: ProfilePage,
            beforeEnter(to,from,next) {
                if (checkCookie()) {
                    next()
                }
                else { 
                    next({name: 'homepage'})
                }
            }
        },
        {
            path: '/settings/',
            name: 'settings',
            component: EditProfilePage,
            beforeEnter(to,from,next) { 
                if (checkCookie()) { 
                    next()
                }
                else { 
                    next({name: 'homepage'})
                }
            }

        },
        {
            path: '/UserPage',
            name: 'UserPage',
            component: UserPage
        },
        {
            path: '/pin-builder',
            name: 'pin-builder',
            component: PinBuilder,
            beforeEnter(to,from,next) { 
                if (checkCookie()) { 
                    next()
                }
                else { 
                    next({name: 'homepage'})
                }
            }
        },
        {
            path: '/:username/:name',
            name: 'boardpage',
            component: BoardPage,
            beforeEnter(to,from,next) { 
                if (checkCookie()) { 
                    next()
                }
                else { 
                    next({name: 'homepage'})
                }
            }

        }
        
        

    ],
    mode: 'history'
 });
export default router
