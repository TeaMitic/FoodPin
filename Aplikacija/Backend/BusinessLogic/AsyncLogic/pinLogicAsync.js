const validation = require("../../Helper/validation")
const pinDataProvider  = require( '../../Persistance/neo4j/DataProvider/pinDataProvider')
const resHelper = require('../../Helper/responseHelper')
const dtoHelper = require('../../Helper/dtoHelper')
const likeDataProvider = require('../../Persistance/mySql/DataProvider/likeDataProvider')
const commentDataProvider = require('../../Persistance/mySql/DataProvider/commentDataProvider')
const pushNotif = require('./pushNotif/pushNotifications')

const likePin = async(pinID, likeInfo)=>{
    // Info:{
    //     pinID,
    //     senderID,
    //     receiverID,
    //     * senderUsername new prop
    // }
    try {
        // TODO validation for likeInfo needed
        let validateString = validation.forString(pinID, "pinID")
        if (validateString != 'ok') { 
            return dtoHelper.createResObject({
                name: "Validation failed",
                text: validateString
            },false)
        }
        let pin= await pinDataProvider.getPinById(pinID)
        if(!pin){
            return dtoHelper.createResObject(
                resHelper.NoPinError(pinID), false
            )
        }

        let info ={
            pinID: pinID,
            senderID: likeInfo.senderID,
            receiverID: likeInfo.receiverID
        }

        let result = await likeDataProvider.like(info)

        if(!result){
            return dtoHelper.createResObject('Like not saved in sql db', false)
        }
        //notify client 
        pushNotif.like({
            emitterUsername: likeInfo.senderUsername,
            receiverID: likeInfo.receiverID,
            pinID: likeInfo.pinID
        })
        
        return dtoHelper.createResObject({},true)

        

    } catch (error) {
        throw error
    }
}
const dislikePin = async(pinID, likeInfo)=>{
    // Info:{
    //     pinID,
    //     senderID,
    //     receiverID
    // }
    try {
        let validateString = validation.forString(pinID, "pinID")
        if (validateString != 'ok') { 
            return dtoHelper.createResObject({
                name: "Validation failed",
                text: validateString
            },false)
        }
        let validate = validation.forUserNotification(likeInfo)
        if (validate != 'ok') { 
            return dtoHelper.createResObject({
                name: "Validation failed",
                text: validate
            },false)
        }

        let senderID = await userDataProvider.getUserById(likeInfo.senderID)
        let receiverID = await userDataProvider.getUserById(likeInfo.receiverID)
        if(!senderID){
            return dtoHelper.createResObject(
                resHelper.NoUserError(likeInfo.senderID), false
            )
        }
        if(!receiverID){
            return dtoHelper.createResObject(
                resHelper.NoUserError(likeInfo.receiverID), false
            )
        }

        let pin= await pinDataProvider.getPinById(pinID)
        if(!pin){
            return dtoHelper.createResObject(
                resHelper.NoPinError(pinID), false
            )
        }

        let info ={
            pinID: pinID,
            senderID: likeInfo.senderID,
            receiverID: likeInfo.receiverID
        }

        let result = await likeDataProvider.dislike(info)

        if(!result){
            return dtoHelper.createResObject('Like not saved in sql db', false)
        }

        return dtoHelper.createResObject({},true)

        

    } catch (error) {
        throw error
    }
}

const commentPin = async (commentInfo) => { 
    try {
        //validation not needed, already done in sync logic
        let result = await commentDataProvider.comment(commentInfo)
        if (!result) { 
            return dtoHelper.createResObject("Comment not saved in sql db",false)
        }

        //emit push notif 
        return dtoHelper.createResObject({},true)


    } catch (error) {
        throw error
    }
}

module.exports={
    commentPin,
    likePin,
    dislikePin
}