const jwt = require('jsonwebtoken')
const resHelper = require('../Helper/responseHelper')

const {getTokenID} = require('../config/token')
const auth = (req, res, next) =>{
    if(req.headers ["authorization"] != "") {
        try{
            req.body.userID = getTokenID(req)
            next();
        }catch (error){
            resHelper.UnauthorizedResponse("Error: Unauthorized user.",res)
        }
    }else{
        resHelper.UnauthorizedResponse("Error: Authorization header missing.",res)
    }
}
module.exports = auth