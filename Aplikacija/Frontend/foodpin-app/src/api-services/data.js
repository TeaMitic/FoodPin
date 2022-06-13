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
        user_boards_only: null,
        pin: null,
        pins_homepage: null,
        // user_followings: null,
        isFollowing: false,
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
            await getUser(commit,`/api/user/getByUsername/${username}`)
        },
    //    async getUserByID({commit}, userID) { 
    //         await getUser(commit, `/api/user/get/${userID}`)
    //     }, 
        async getUserById({commit}, userID){
            try {
                let res = await Api().get(`/api/user/get/${userID}`,{
                    headers: {
                        'Authorization' : Vue.$cookies.get('token')
                    }
                })
                commit('setUser', res.data)
                
            } catch (error) {
                if (error.response.status == 500) { 
                    console.log(error)
                }
                else { 
                   toastedErrorMessage(error.response.data)
                }
            }
        },
        async getBoardsForUserWithImages({commit},userID) { 
            try {
                let res = await Api().get(`/api/board/for/${userID}/withImages`,{
                    headers: {
                        'Authorization' : Vue.$cookies.get('token')
                    }
                })
                commit('setBoardsForUser',res.data)
            } catch (error) {
                if (error.response.status == 500) { 
                    console.log("ERROR:",error.response)
                }
                else { 
                   toastedErrorMessage(error.response.data)
                }
            }
        },
        async getBoardsForUserNoImages({commit},userID) { 
            try {
                let res = await Api().get(`/api/board/for/${userID}/noImages`,{
                    headers: {
                        'Authorization' : Vue.$cookies.get('token')
                    }
                })
                commit('setBoardsOnlyForUser',res.data)
            } catch (error) {
                if (error.response.status == 500) { 
                    console.log("ERROR:",error.response)
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
                commit('setPinsForHomepage', res.data)
            } catch (error) {
                if (error.response.status == 500) {
                    console.log("ERROR:",error.response)
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
                    console.log("ERROR:",error.response)
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
            } catch (error) {
                if (error.response.status == 500) { 
                    console.log("ERROR:",error.response)
                }
                else { 
                   toastedErrorMessage(error.response.data)
                }
            }
        },
        async uploadUserImage({commit},obj) { 
            try {
                let imgInfo = obj.imgInfo
                let username = imgInfo.username
                let form = imgInfo.image
                let res = await Api().post(`/api/user/addImage/${username}`,form, {
                    headers: { 
                        'Authorization' : Vue.$cookies.get('token'),
                        'Content-type': 'multipart/form-data'
                    }
                })
                commit('setNista')                
                
                if (res.status == 200) { 
                    toastedOkMessage(obj.toastMessage)
                }
            } catch (error) {
                if (error.response.status == 500) { 
                    console.log("ERROR:",error.response)
                }
                else { 
                   toastedErrorMessage(error.response.data)
                }
            }
        },
        async deleteUserImage({commit},obj) { 
            try {
                let res = await Api().delete(`/api/user/deleteImage/${obj.userID}`, {
                    headers: { 
                        'Authorization' : Vue.$cookies.get('token'),
                    }
                })
                commit('setNista') 
                if (res.status == 200) { 
                    toastedOkMessage(obj.toastMessage)
                }
            } catch (error) {
                if (error.response.status == 500) { 
                    console.log("ERROR:",error.response)
                }
                else { 
                   toastedErrorMessage(error.response.data)
                }
            }
        },
        async savePin({commit}, pin){
            try {
                let res = await Api().post('/api/pin/save', pin, {
                    headers: {
                        'Authorization' : Vue.$cookies.get('token')
                    }
                })
                if(res.status == 200){
                    Vue.toasted.show('Pin is saved', {
                        theme: "bubble",
                        position: "top-center",
                        duration: 2500
                    })
                }
                commit('setNista')
                
            } catch (error) {
                if (error.response.status == 500) { 
                    console.log("ERROR:",error.response)
                }
                else { 
                   toastedErrorMessage(error.response.data)
                }
            }
        },
        // async getFollowings({commit},userID) { 
        //     try {
        //         let res = await Api().get(`/api/user/getFollowings/${userID}`,{
        //             headers: { 
        //                 'Authorization' : Vue.$cookies.get('token')
        //             }
        //         })
        //         commit('setFollowings',res.data)
        //     } catch (error) {
        //         if (error.response.status == 500) { 
        //             console.log("ERROR:",error.response)
        //         }
        //         else { 
        //            toastedErrorMessage(error.response.data)
        //         }
        //     }
        // },
       
        async getPinById({commit}, pinID){
            try {
                let token = Vue.$cookies.get('token')
                console.log("Token",token);
                let res = await Api().get(`/api/pin/get/${pinID}`,{
                    headers: {
                        'Authorization' : Vue.$cookies.get('token')
                    }
                })
                commit('setPin', res.data) 
            } catch (error) {
                if (error.response.status == 500) { 
                    console.log(error)
                }
                else { 
                   toastedErrorMessage(error.response.data)
                }
            }
        },

        async getFollowings({commit},userID) { 
            try {
                let res = await Api().get(`/api/user/getFollowings/${userID}`,{
                    headers: { 
                        'Authorization' : Vue.$cookies.get('token')
                    }
                })
                commit('setFollowings',res.data)
            } catch (error) {
                if (error.response.status == 500) { 
                    console.log(error)
                }
                else { 
                   toastedErrorMessage(error.response.data)
                }
            }
        },
        async likePin({commit},pinID){
            try {
                let token = Vue.$cookies.get('token')
                console.log("Token",token);
                // console.log(pinID);
                await Api().put(`/api/pin/like/${pinID}`,{
                    headers: {
                        'Authorization' : Vue.$cookies.get('token')
                    }
                })
                commit('setNista')
            } catch (error) {
                if (error.response.status == 500) { 
                    console.log(error)
                }
                else { 
                   toastedErrorMessage(error.response.data)
                }
            }
        },
        async updateProfile({commit},obj) { 
            try {
                let res = await Api().put(`/api/user/update/${obj.userInfo.userID}`,obj.userInfo,{
                    headers: { 
                        'Authorization' : Vue.$cookies.get('token')
                    }
                },)
                commit('setNista')
                if (res.status == 200) { 
                    toastedOkMessage(obj.toastMessage)
                }
            } catch (error) {
                if (error.response.status == 500) { 
                    console.log("ERROR:",error.response)
                }
                else { 
                   toastedErrorMessage(error.response.data)
                }
            }
        },
        async isFollowing({commit},followInfo) { 
            try {
                let res = await Api().post('/api/user/isFollowing',followInfo,{
                    headers: { 
                        'Authorization' : Vue.$cookies.get('token')
                    }
                },)
                commit('setIsFollowing',res.data)
            } catch (error) {
                if (error.response.status == 500) { 
                    console.log("ERROR:",error.response)
                }
                else { 
                   toastedErrorMessage(error.response.data)
                }
            }
        },
        async follow({commit}, info){
            try {
                await Api().post('api/user/follow',info, {
                    headers: { 
                        'Authorization' : Vue.$cookies.get('token')
                    }
                })
                commit('setNista')
                
            } catch (error) {
                if (error.response.status == 500) { 
                    console.log(error)
                }
                else { 
                   toastedErrorMessage(error.response.data)
                }
            }
        },
        async unfollow({commit}, info){
            try {
                await Api().post('api/user/unfollow',info, {
                    headers: { 
                        'Authorization' : Vue.$cookies.get('token')
                    }
                })
                commit('setNista')
                
            } catch (error) {
                if (error.response.status == 500) { 
                    console.log(error)
                }
                else { 
                   toastedErrorMessage(error.response.data)
                }
            }
        }
        // async commentPin({commit},pinID, comment){
        //     try {
                
        //     } catch (error) {
        //         if (error.response.status == 500) { 
        //             console.log(error)
        //         }
        //         else { 
        //            toastedErrorMessage(error.response.data)
        //         }
        //     }
        // }
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
        setBoardsOnlyForUser(state,boards) { 
            state.user_boards_only = boards
        },
        setPin(state,pin) { 
            state.pin = pin
        },
        setPinsForHomepage(state, pins){
            state.pins_homepage = pins
        },
        // setFollowings(state,followings) { 
        //     state.user_followings = followings
        // }
        setIsFollowing(state,value) { 
            state.isFollowing = value
        }
    },
    getters: { 
        getUser(state) { 
            return state.user
        },
        getBoardsForUserWithImages(state) { 
            return state.user_boards
        },
        getBoardsForUserNoImages(state) { 
            return state.user_boards_only
        },
        getPin(state) { 
            return state.pin
        },
        getPinsForHomepage(state){
            return state.pins_homepage
        },
        // getFollowings(state) { 
        //     return state.user_followings
        // }
        getIsFollowing(state) { 
            return state.isFollowing
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
const toastedOkMessage = (message) => {
    Vue.toasted.show(`${message}`, { 
        theme: "bubble",
        position: "bottom-center",
        duration: 2000,
        allowHtml: true
    })
}
const getUser = async (commit, path) => { 
    try {
        let res = await Api().get(path,{
            headers: {
                'Authorization' : Vue.$cookies.get('token')
            }
        })
        commit('setUser',res.data)
    } catch (error) {
        if (error.response.status == 500) { 
            console.log("ERROR:",error.response)
        }
        else { 
           toastedErrorMessage(error.response.data)
        }
    }
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
            console.log("ERROR:",error.response)
        }
        else { 
            toastedErrorMessage(error.response.data)
        }
    }
}
//#endregion