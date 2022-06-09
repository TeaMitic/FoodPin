// import router from '@/router'
import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index.js'
import Api from './apiConfig'

const cookieTime = "24h"

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        notification: null,
        currentToken: null,
        currentUsername: null,
        currentUserID: null,
        user: null,
        user_boards: null,
        pin: null,
        pins_homepage: null
    },
    actions: { 
        async login({commit}, loginObject) { 
            await login_register(commit,'/api/user/login',loginObject)
            
        },
        async register({commit},registerInfo) { 
            await login_register(commit,'/api/user/',registerInfo)
        },
        logout({commit}){
            commit('setNista')
            Vue.$cookies.remove('token')
            Vue.$cookies.remove('userID')
            Vue.$cookies.remove('username')
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
        },
        async createBoard({commit},board) { 
            try {
                await Api().post('/api/board',board,{
                    headers: {
                        'Authorization' : Vue.$cookies.get('token')
                    }
                })
                commit('setNista')
                Vue.toasted.show(
                    `Board created`, { 
                    theme: "bubble",
                    position: "bottom-center",
                    duration: 3000,
                    allowHtml: true
                })
            } catch (error) {
                toastedErrorMessage(error.response.data)
            }
        },
        async getPinsForHomepage({commit}, skip){
            try {
                let res = await Api().get(`/api/pin/getWithSkip/${skip}`, {
                    headers: {
                        'Authorization' : Vue.$cookies.get('token')
                    }
                })
                console.log(res.data)
                commit('setPinsForHomepage', res.data)
            } catch (error) {
                if (error.response.status == 500) {
                    console.log(error)
                }
                else {
                   toastedErrorMessage(error.response.data)
                }
            }
        },
        async createPin({commit},pinInfo) { 
            try {
                let res = await Api().post('/api/pin/',pinInfo, {
                    headers: { 
                        'Authorization' : Vue.$cookies.get('token')
                    }
                })
                commit('setPin',res.data)
            } catch (error) {
                if (error.response.status == 500) { 
                    console.log(error)
                }
                else { 
                   toastedErrorMessage(error.response.data)
                }
            }
        },
        async uploadPinImage({commit},imgInfo) { 
            try {
                let pinID = imgInfo.pinID
                let form = imgInfo.image
                await Api().post(`/api/pin/addImage/${pinID}`,form, {
                    headers: { 
                        'Authorization' : Vue.$cookies.get('token'),
                        'Content-type': 'multipart/form-data'
                    }
                })
                commit('setNista')
                console.log(res.data)
                commit('setPinsForHomepage', res.data)
                
            } catch (error) {
                if (error.response.status == 500) { 
                    console.log(error)
                }
                else { 
                   toastedErrorMessage(error.response.data)
                }
            }
        },
        async savePin({commit}, pin){
            try {
                console.log(pin);
                commit('setNista')
                let res = await Api().post('/api/pin/save', pin, {
                    headers: {
                        'Authorization' : Vue.$cookies.get('token')
                    }
                })
                // console.log(res.status);
                if(res.status == 200){
                    Vue.toasted.show('Pin is saved', {
                        theme: "bubble",
                        position: "top-center",
                        duration: 2500
                      })
                }
                
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
        },
        setPin(state,pin) { 
            state.pin = pin
        },
        setPinsForHomepage(state, pins){
            state.pins_homepage = pins
        }
    },
    getters: { 
        getUser(state) { 
            return state.user
        },
        getBoardsForUser(state) { 
            return state.user_boards
        },
        getPin(state) { 
            return state.pin
        },
        getPinsForHomepage(state){
            return state.pins_homepage
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
        router.push('/userpage')
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