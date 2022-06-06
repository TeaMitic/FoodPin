// import router from '@/router'
import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index.js'
import Api from './apiConfig'

const cookieTime = "1h"

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        notification: null,
        currentToken: null,
        currentUsername: null,
        currentUserID: null,
        user: null,
        user_boards: null
    },
    actions: { 
        async login({commit}, loginObject) { 
            await login_register(commit,'/api/user/login',loginObject)
            
        },
        async register({commit},registerInfo) { 
            await login_register(commit,'/api/user/',registerInfo)
        },
        async getUserByUsername({commit},username) { 
            try {
                let res = await Api().get(`/api/user/getByUsername/${username}`,{
                    headers: {
                        'Authorization' : Vue.$cookies.get('token')
                    }
                })
                commit('setUser',res.data)
            } catch (error) {
                if (error.response.status == 500) { 
                    console.log(error)
                }
                else { 
                   toastedErrorMessage(error.response.data)
                }
            }
        },
        async getBoardsForUser({commit},userID) { 
            try {
                let res = await Api().get(`/api/board/for/${userID}`,{
                    headers: {
                        'Authorization' : Vue.$cookies.get('token')
                    }
                })
                commit('setBoardsForUser',res.data)
            } catch (error) {
                if (error.response.status == 500) { 
                    console.log(error)
                }
                else { 
                   toastedErrorMessage(error.response.data)
                }
            }
        }
        
    },
    mutations: { 
        setNista() { },
        setToken(state,token) { 
            state.currentToken = token
        },
        setUsername(state, username) {
            state.currentUsername = username
        },
        setID(state, userID) { 
            state.currentUserID = userID
        },
        setUser(state, user) { 
            state.user = user
        },
        setBoardsForUser(state,boards) { 
            state.user_boards = boards
        }
    },
    getters: { 
        getUser(state) { 
            return state.user
        },
        getBoardsForUser(state) { 
            return state.user_boards
        }
    }
})

//#region helper funcions 
const toastedErrorMessage = (data) => { 
    Vue.toasted.show(
        `Error: ${data.name}<br>
        Text: ${data.text}`, { 
        theme: "bubble",
        position: "bottom-center",
        duration: 3000,
        allowHtml: true
    })
}
const login_register = async (commit,path,userObject) => { 
    try { 
        let res = await Api().post(path,userObject)
        let data = res.data
        commit('setID', data.userID)
        commit('setUsername', data.username)
        commit('setToken', data.token)
        Vue.$cookies.set("userID", data.userID, cookieTime)
        Vue.$cookies.set("username", data.username,cookieTime)
        Vue.$cookies.set("token", data.token, cookieTime)
        Vue.toasted.show(`Welcome ${data.username}` , { 
            theme: "bubble",
            position: "bottom-center",
            duration: 2000
        })
        // router.push(`/Profile/${data.username}`) //!vrati nazad
        router.push('/UserPage')
    }
    catch(error) { 
        if (error.response.status == 500) { 
            console.log(error)
        }
        else { 
            toastedErrorMessage(error.response.data)
        }
    }
}
//#endregion