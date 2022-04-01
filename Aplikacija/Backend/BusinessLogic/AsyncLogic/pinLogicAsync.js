const validation = require("../../Helper/validation")
const pinDataProvider  = require( '../../Persistance/neo4j/DataProvider/pinDataProvider')
const resHelper = require('../../Helper/responseHelper')
const dtoHelper = require('../../Helper/dtoHelper')
const likeDataProvider = require('../../Persistance/mySql/DataProvider/likeDataProvider')




const likePin = async(pinID, likeInfo)=>{
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

        return dtoHelper.createResObject({},true)

        

    } catch (error) {
        throw error
    }
}

module.exports={
    likePin
}