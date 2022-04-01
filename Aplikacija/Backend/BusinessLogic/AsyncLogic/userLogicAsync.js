const validation = require("../../Helper/validation")
const userDataProvider  = require( '../../Persistance/neo4j/DataProvider/userDataProvider')
const resHelper = require('../../Helper/responseHelper')
const dtoHelper = require('../../Helper/dtoHelper')
const followDataProvider = require('../../Persistance/mySql/DataProvider/followDataProvider')

const followAsync = async (followInfo) => { 
    try {
        //obj za follow notif
        //{
        //     content: "follows you"
        //     usernameCurrent
        //     userID followed - queue name
        //}
        let obj={
            senderID: ids.currentUser,
            receiverID: ids.followedUser
        } 
        let validate = validation.forUserNotification(obj)
        if (validate != 'ok') { 
            return dtoHelper.createResObject({
                name: "Validation failed",
                text: validate
            },false)
        }

        let currentUser = await userDataProvider.getUserById(followInfo.currentUser)
        let followedUser = await userDataProvider.getUserById(followInfo.followedUser)
        if(!currentUser){
            return dtoHelper.createResObject(
                resHelper.NoUserError(followInfo.currentUser), false
            )
        }
        if(!followedUser){
            return dtoHelper.createResObject(
                resHelper.NoUserError(followInfo.followedUser), false
            )
        }
        let msg ={
            content: "has started following you.",
            usernameCurrent: currentUser.username,
        }
        //msg treba da se zapamti u mysql
        //ovo je poruka koja se salje u mysql
        let fMSG={
            receiverID: followedUser.userID,
            senderID: currentUser.userID
        }

        let result = await followDataProvider.follow(fMSG)

        
        // if(!rabbit.send(msg, followedUser.userID)){
        //     return dtoHelper.createResObject(
        //         resHelper.NotificationError(followedUser.userID), false
        //     )
        // }
        return dtoHelper.createResObject({},true)


        //fje getUserByID - provera
        //sklopi json message za notif
        //pozovi rabbit send
        
    } catch (error) {
        throw error
    }
}
const unfollowAsync=async(ids)=>{
    try {       
        let obj={
            senderID: ids.currentUser,
            receiverID: ids.followedUser
        } 
        let validate = validation.forNotification(obj)
        if (validate != 'ok') { 
            return dtoHelper.createResObject({
                name: "Validation failed",
                text: validate
            },false)
        }
        let currentUser = await userDataProvider.getUserById(ids.currentUser)
        if(!currentUser){
            return dtoHelper.createResObject(
                resHelper.NoUserError(ids.currentUser), false
            )
        }
        let followedUser = await userDataProvider.getUserById(ids.followedUser)
        if(!followedUser){
            return dtoHelper.createResObject(
                resHelper.NoUserError(ids.followedUser), false
            )
        }
    
        let result = await followDataProvider.unfollow(ids)
        if(result){
            return dtoHelper.createResObject({},true)
        }
        else{
            return dtoHelper.createResObject({},false)
        }
        
    } catch (error) {
        throw error
    }

}







module.exports={
    followAsync,
    unfollowAsync,
    
}