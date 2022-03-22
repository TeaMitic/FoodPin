const validation = require("../../Helper/validation")
const userDataProvider  = require( '../../Persistance/neo4j/DataProvider/userDataProvider')
const resHelper = require('../../Helper/responseHelper')
const dtoHelper = require('../../Helper/dtoHelper')
const rabbit = require('./rabbit/rabbit')
const followDataProvider = require('../../Persistance/mySql/DataProvider/followDataProvider')

const followAsync = async (followInfo) => { 
    try {
        //obj za follow notif
        //{
        //     content: "follows you"
        //     usernameCurrent
        //     userID followed - queue name
        //}
        let validateString = validation.forString(followInfo.currentUser, "currentUser")
        validateString = validation.forString(followInfo.followedUser, "followedUser")
        if (validateString != 'ok') { 
            return dtoHelper.createResObject({
                name: "Validation failed",
                text: validateString
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
        


        if(!rabbit.send(msg, followedUser.userID)){
            return dtoHelper.createResObject(
                resHelper.NotificationError(followedUser.userID), false
            )
        }
        return dtoHelper.createResObject({},true)


        //fje getUserByID - provera
        //sklopi json message za notif
        //pozovi rabbit send
        
    } catch (error) {
        throw error
    }
}


module.exports={
    followAsync
}