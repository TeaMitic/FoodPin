const dtoHelper = require("../../Helper/dtoHelper")
const pinDataProvider = require('../../Persistance/neo4j/DataProvider/pinDataProvider')
const userDataProvider = require('../../Persistance/neo4j/DataProvider/userDataProvider')
const boardDataProvider = require('../../Persistance/neo4j/DataProvider/boardDataProvider')
const validation = require('../../Helper/validation')
const resHelper = require('../../Helper/responseHelper')
const imageHelper = require('../../Helper/imageHelper')
const fs = require('fs')
const path = require('path')
const dataProviderHelper = require('../../Persistance/neo4j/DataProvider/dataProviderHelper')


const createPin = async (pinInfo) => { 
    try {
        // pinInfo = { 
        //     userID: id
        //     boardName: name,
        //     pin: { 
        //         creatorID: required,
        //         title: required,
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
        return dtoHelper.createResObject(pin,true)
    } catch (error) {
        throw error 
    }
}

const getForBoard = async (boardID) => { 
    try {
        
        let board = await boardDataProvider.getBoardByID(boardID)
        if(!board){
            return dtoHelper.createResObject(
                resHelper.NoBoardError(boardID), false
            )
        } 
        
        let pins = await pinDataProvider.getForBoard(boardID)
        pinsImages = []
        pins.forEach(pin => {
            pin.hasImage = true
            pinsImages.push(imageHelper.attachImage(pin))
        });

        return dtoHelper.createResObject(pins,true)
    } catch (error) {
        throw error
    }
}

const   addImage = async(imgFile,pinID) => { 
    try {
        //creates image node and connect with pinID
        
        let pin = await pinDataProvider.getPinById(pinID)
        if(!pin){
            return dtoHelper.createResObject(
                resHelper.NoPinError(pinID), false
            )
        } 
        //add image 
        return await imageHelper.addImage(imgFile,{
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
      
        //TODO Tea refaktorisi kod 
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

        result = await pinDataProvider.connectWithBoards(pinCopy.pinID,boards,info.userID)
        if (!result) { 
            await pinDataProvider.deletePin(pinCopy.pinID) //rollback 
            throw new Error("Couldn't add pin to the board.")
        }

        //helper copyImage
        let filePath, image
        if (pin.hasImage) { 
            filePath = path.join(__dirname,'..','..','images','pins',pin.pinID + '.jpg')
        }
        else{
            throw new Error("Couldn't add image to the saved pin. Pin doesn't have an image")
        } 
        result = await imageHelper.copyImage(filePath, pinCopy.pinID)
        if (!result) { 
            throw new Error("Couldn't add image to the saved pin.")
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

        let filePath, image
        //it is not pin.imgName, it is relationship with image node 
        if (pin.hasImage) { 
            filePath = path.join(__dirname,'..','..','images','pins',pinID + '.jpg')
            image= fs.readFileSync(filePath)
            pin.image = image
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
        let pinsImages = []
        
        for await (let pin of pins){
            // pin.hasImage = await dataProviderHelper.hasImage(pin.pinID) //!not needed 
            pin.hasImage = true
            pinsImages.push(imageHelper.attachImage(pin))
        } 

        return dtoHelper.createResObject(pinsImages,true)
        
    } catch (error) {
        throw error
    }
}

//#region helper functions
const attachImage = (pin) => {
    //loads image from FS and attach it to pin object 
    try {
        let filePath,image
        if (pin.hasImage != undefined  && pin.hasImage) {
            //setting flags to false
            pin.image = null
            pin.hasImage = false
            filePath = path.join(__dirname,'..','..','images','pins',pin.pinID + '.jpg')
            if (fs.existsSync(filePath)) {
                image= fs.readFileSync(filePath)
                //setting flags to true
                pin.image = image
                pin.hasImage = true
            }
            return pin
        }
    } catch (error) {
        throw error
    }
}

//#endregion
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
    getPins,
    getForBoard

}