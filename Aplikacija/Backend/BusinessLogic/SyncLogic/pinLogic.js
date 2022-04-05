const dtoHelper = require("../../Helper/dtoHelper")
const pinDataProvider = require('../../Persistance/neo4j/DataProvider/pinDataProvider')
const userDataProvider = require('../../Persistance/neo4j/DataProvider/userDataProvider')
const boardDataProvider = require('../../Persistance/neo4j/DataProvider/boardDataProvider')
const validation = require('../../Helper/validation')
const resHelper = require('../../Helper/responseHelper')
const logicHelper = require('../../Helper/logicHelper')
const fs = require('fs')
const path = require('path')

const createPin = async (pinInfo) => { 
    try {
        // pinInfo = { 
        //     userID: id
        //     boardName: name,
        //     pin: { 
        //         creatorID: required,
        //         title: required,
        //         imgName: required
        //     },
        //     tags: [tag,tag]
        // }
        let validateString = validation.forPin(pinInfo)
        if (validateString != 'ok') { 
            return dtoHelper.createResObject({
                name: "Validation failed",
                text: validateString
            },false)
        }  
        let userID = pinInfo.userID
        let boardName = pinInfo.boardName
        pinInfo.pin.creatorID = userID
        //user validation 
        let user = await userDataProvider.getUserById(userID)
        // console.log(user)
        if (!user) { 
            return dtoHelper.createResObject(
                resHelper.NoUserError(userID),
                false
            )
        }
        //board validation
        let board = await boardDataProvider.getBoardByName(boardName,userID)
        if (!board) {    
            return dtoHelper.createResObject(
                resHelper.NoBoardError(userID,boardName),
                false
            )
        } 
        //pin creation
        let pin = await pinDataProvider.createPin(pinInfo.pin)
        if (!pin) { 
           throw new Error("Couldn't create pin.")
        }
        //connecting with tags  
        let result = await pinDataProvider.connectWithTags(pin.pinID,pinInfo.tags)
        if (!result) { 
            await pinDataProvider.deletePin(pin.pinID) //rollback 
            throw new Error("Couldn't create relations with tags.")
        }
        //connecting with boards (boardName and All pins as a  default board)
        let boards = new Set()
        boards.add('All pins')
        boards.add(boardName)
        result = await pinDataProvider.connectWithBoards(pin.pinID,boards,userID)
        if (!result) { 
            await pinDataProvider.deletePin(pin.pinID) //rollback 
            throw new Error("Couldn't add pin to the board.")
        }
        return dtoHelper.createResObject({},true)
    } catch (error) {
        throw error 
    }
}

const   addImage = async(imgFile,pinID) => { 
    try {
        
        
        let pin = await pinDataProvider.getPinById(pinID)
        if(!pin){
            return dtoHelper.createResObject(
                resHelper.NoPinError(pinID), false
            )
        } 
        console.log(pin)
        throw "error"
        //add image 
        return await logicHelper.addImage(imgFile,{
            pinID: pinID,
            type: 'Pin'
        })
        
    } catch (error) {
        throw error
    }
}

const likePin = async (pinID) => {
    try {
        /*
            Left room for notifying pin's user 
            And 
            For updating some metadata for user who liked the photos for recommendation system
            And 
            For logging data in SQL 
        */

        //Tea refaktorisi kod 
        let validateString = validation.forString(pinID,"pinID")
        if (validateString != 'ok') { 
            return dtoHelper.createResObject({
                name: "Validation failed",
                text: validateString
            },false)
        } 
        let pin = await pinDataProvider.getPinById(pinID)
        if(!pin){
            return dtoHelper.createResObject(
                resHelper.NoPinError(pinID), false
            )
        } 

        return await pinDataProvider.likePin(pinID)
    } catch (error) {
        throw error
    }
}
const updatePin = async(pinID, pin)=>{
    try {
        let validateString = validation.forString(pinID,"pinID")
        if (validateString != 'ok') { 
            return dtoHelper.createResObject({
                name: "Validation failed",
                text: validateString
            },false)
        }  
        let pinDB = await pinDataProvider.getPinById(pinID)
        if(!pinDB){
            return dtoHelper.createResObject(
                resHelper.NoPinError(pinID), false
            )
        } 
        return await pinDataProvider.updatePin(pin, pinID)
        
    } catch (error) {
        throw error
    }

}
const dislikePin = async (pinID) => {
    try {
        
        let validateString = validation.forString(pinID,"pinID")
        if (validateString != 'ok') { 
            return dtoHelper.createResObject({
                name: "Validation failed",
                text: validateString
            },false)
        } 
        let pin = await pinDataProvider.getPinById(pinID)
        if(!pin){
            return dtoHelper.createResObject(
                resHelper.NoPinError(pinID), false
            )
        } 
        return await pinDataProvider.dislikePin(pinID)
    } catch (error) {
        throw error
    }
}

const deletePin = async (pinID) => {
    try {
        let validateString = validation.forString(pinID,"pinID")
        if (validateString != 'ok') { 
            return dtoHelper.createResObject({
                name: "Validation failed",
                text: validateString
            },false)
        }  
        let pin = await pinDataProvider.getPinById(pinID)
        if (!pin) { 
            return dtoHelper.createResObject(
                resHelper.NoPinError(pinID),
                false
            )
        }
        let result = await pinDataProvider.deletePin(pinID)
        return dtoHelper.createResObject({},true)
    } catch (error) {
        throw error
    }
}

const  savePin = async (info) => { 
    // info = { 
    //     pinID, //pin to save
    //     userID, //who saves
    //     boardName, //where saves
    // }
    try {
        let validateString = validation.forPinSave(info)
        if (validateString != 'ok') { 
            return dtoHelper.createResObject({
                name: "Validation failed",
                text: validateString
            },false)
        }
        //validation with database 
        let pin = await pinDataProvider.getPinWithTags(info.pinID)
        if (!pin) { 
            return dtoHelper.createResObject(
                resHelper.NoPinError(info.pinID),
                false
            )
        }
        let tags = pin.tags
        delete pin.tags
        let user = await userDataProvider.getUserById(info.userID)
        if (!user) { 
            return dtoHelper.createResObject(
                resHelper.NoUserError(info.userID),
                false
            )
        }
        let board = await boardDataProvider.getBoardByName(info.boardName,info.userID)
        if (!board) {    
            return dtoHelper.createResObject(
                resHelper.NoBoardError(info.userID,info.boardName),
                false
            )
        } 
        delete pin.likes //odradjeno jer je suvisan property za create pin
        
        //pin creation
        let pinCopy = await pinDataProvider.createPin(pin) //pinInfo.pin
        if (!pinCopy) { 
           throw new Error("Couldn't create pin.")
        }
        //connecting with tags  
        let result = await pinDataProvider.connectWithTags(pinCopy.pinID,tags)
        if (!result) { 
            await pinDataProvider.deletePin(pinCopy.pinID) //rollback 
            throw new Error("Couldn't create relations with tags.")
        }
        //connecting with boards (boardName and All pins as a  default board)
        let boards = new Set()
        boards.add( 'All pins')
        boards.add(info.boardName)
        // let boards2 = new Set()
        // boards.forEach(element => { 
        //     boards2.add({name: element})
        // }) 
        // console.log("BOARD:",boards2)
        result = await pinDataProvider.connectWithBoards(pinCopy.pinID,boards,info.userID)
        if (!result) { 
            await pinDataProvider.deletePin(pinCopy.pinID) //rollback 
            throw new Error("Couldn't add pin to the board.")
        }

        /*SQL logging and push notification */
        return dtoHelper.createResObject({},true)

    } catch (error) {
        throw error
    }
}
const getByID =async(pinID)=>{
    try {
        let validateString = validation.forString(pinID, "ID")
        if (validateString != 'ok') { 
            return dtoHelper.createResObject({
                name: "Validation failed",
                text: validateString
            },false)         
        }
        let pin =await pinDataProvider.getPinById(pinID)

        let filePath 
        let image
        if (pin.imgName != undefined ) { 
            filePath = path.join(__dirname,'..','..','images','pins',pin.imgName)
            image= fs.readFileSync(filePath)
            pin.photo = image
        } 

        return dtoHelper.createResObject(pin,true)
        
    } catch (error) {
        throw error
    }
}

const commentPin = async(commentInfo) => { 
    try {
        let validateString = validation.forComment(commentInfo)
        if (validateString != 'ok') {
            return dtoHelper.createResObject({
                name: "Validation failed",
                text: validateString
            },false) 
        }
        let sender = await userDataProvider.getUserById(commentInfo.senderID)
        if (!sender) { 
            return dtoHelper.createResObject(
                resHelper.NoUserError(commentInfo.senderID),false
            )
        }   
        let pin = await pinDataProvider.getPinById(commentInfo.pinID)
        if (!pin) { 
            return dtoHelper.createResObject(
                resHelper.NoPinError(commentInfo.pinID),false
            )
        } 
        commentInfo.createdAt = new Date().toISOString()

        let result = await pinDataProvider.commentPin(commentInfo) 
        return dtoHelper.createResObject({
            receiverID: result[0].userID
        },true) 
    } catch (error) {
        throw error
    }
}  

const getPins=async(skip)=>{
    try {
        let pins= await pinDataProvider.getPins(skip)
        return dtoHelper.createResObject(pins,true)
        
    } catch (error) {
        throw error
    }
}

module.exports = { 
    createPin,
    likePin,
    updatePin,
    dislikePin,
    deletePin,
    savePin,
    getByID,
    addImage,
    commentPin,
    getPins

}