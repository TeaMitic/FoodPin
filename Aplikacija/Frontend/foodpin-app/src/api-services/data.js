// import router from '@/router'
import Vue from 'vue'
import Vuex from 'vuex'
// import router from '../router/index.js'
import Api from './apiConfig'

const cookieTime = "1h"

Vue.use(Vuex)
const login_register = async (commit,path,userObject) => { 
    try { 
        let res = await Api().post(path,userObject)
        let data = res.data
        commit('setID', data.userID)
        commit('setUsername', data.username)
        commit('setToken', data.token)
        Vue.$cookies.set("id", data.id, cookieTime)
        Vue.$cookies.set("username", data.username,cookieTime)
        Vue.$cookies.set("token", data.token, cookieTime)
        console.log(res.data);
        Vue.toasted.show(`Welcome ${data.username}` , { 
            theme: "bubble",
            position: "bottom-center",
            duration: 2000
        })
        // router.push('/')
    }
    catch(error) { 
        if (error.response.status == 500) { 
            console.log(error)
        }
        else { 
            
            Vue.toasted.show(
                `Error: ${error.response.data.name}<br>
                Text: ${error.response.data.text}`, { 
                theme: "bubble",
                position: "bottom-center",
                duration: 3000,
                allowHtml: true
            })
        }
    }
}
export default new Vuex.Store({
    state: {
        notification: null,
        currentToken: null,
        currentUsername: null,
        currentUserID: null,
    },
    actions: { 
        async login({commit}, loginObject) { 
            await login_register(commit,'/api/user/login',loginObject)
        },
        async register({commit},registerInfo) { 
            await login_register(commit,'/api/user/',registerInfo)
        }
        
    },
    mutations: { 
        setNista() { },
        setToken(state,token) { 
            state.currentToken = token
        },
        setUsername(state, username) {
            state.username = username
        },
        setID(state, userID) { 
            state.userID = userID
        }
    }
})
