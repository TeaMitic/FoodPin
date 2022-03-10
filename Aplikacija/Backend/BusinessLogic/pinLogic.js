const dtoHelper = require("../Helper/dtoHelper")
const dataProvider = require('../Persistance/DataProvider/pinDataProvider')
const validation = require('../Helper/validation')

const createPin = async (pinInfo) => { 
    try {
        let validateString = validation.forPin(pinInfo)
        if (validateString != 'ok') { 
            return dtoHelper.createResObject({
                name: "Validation failed",
                text: validateString
            },false)
        }  
        return await dataProvider.createPin(pinInfo)
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
        */
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