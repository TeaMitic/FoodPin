import Vue from 'vue'
import Vuex from 'vuex'
// import router from '../router/index.js'
import Api from './apiConfig'

const cookieTime = "1h"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        notification: null
    },
    actions: { 
        async login({commit}, loginObject) { 
            try { 
                let res = await Api().post('/api/user/login',loginObject)
                let data = res.data
                commit('setID', data.id)
                commit('setUsername', data.username)
                commit('setToken', data.token)
            }
        }
        // async follow({commit}, followInfo) { 
        //     let res = await Api().post('/api/user/follow',followInfo)
            
        // }
    }
})
