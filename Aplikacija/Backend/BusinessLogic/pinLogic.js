const dtoHelper = require("../Helper/dtoHelper")
const pinDataProvider = require('../Persistance/DataProvider/pinDataProvider')
const userDataProvider = require('../Persistance/DataProvider/userDataProvider')
const boardDataProvider = require('../Persistance/DataProvider/boardDataProvider')
const validation = require('../Helper/validation')

const createPin = async (pinInfo) => { 
    try {
        // pinInfo = { 
        //     userID: id
        //     boardName: name,
        //     pin: { 
        //         pinInfo
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
        return await dataProvider.likePin(pinID)
    } catch (error) {
        throw error
    }
 }

module.exports = { 
    createPin,
    likePin
}