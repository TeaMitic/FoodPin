import Vue from 'vue'
import Vuex from 'vuex'
// import router from '../router/index.js'
// import Api from './apiConfig'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        notification: null
    },
    actions: { 
        // async follow({commit}, followInfo) { 
        //     let res = await Api().post('/api/user/follow',followInfo)
            
        // }
    }
})
