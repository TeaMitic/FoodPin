const dtoHelper = require("../Helper/dtoHelper")
const pinDataProvider = require('../Persistance/neo4j/DataProvider/pinDataProvider')
const userDataProvider = require('../Persistance/neo4j/DataProvider/userDataProvider')
const boardDataProvider = require('../Persistance/neo4j/DataProvider/boardDataProvider')
const validation = require('../Helper/validation')
const resHelper = require('../Helper/responseHelper')

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
        return await pinDataProvider.updatePin(pinID, pin)
        
    } catch (error) {
        throw error
    }

}
const dislikePin = async (pinID) => {
    try {
        /*
            Left room for notifying pin's user 
            And 
            For updating some metadata for user who liked the photos for recommendation system
        */
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
        pin.likes = 0
        
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
        let boards2 = new Set()
        boards.forEach(element => { 
            boards2.add({name: element})
        }) 
        console.log("BOARD:",boards2)
        result = await pinDataProvider.connectWithBoards(pinCopy.pinID,boards2,info.userID)
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


module.exports = { 
    createPin,
    likePin,
    updatePin,
    dislikePin,
    deletePin,
    savePin

}