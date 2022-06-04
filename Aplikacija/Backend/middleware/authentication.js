const jwt = require('jsonwebtoken')
const resHelper = require('../Helper/responseHelper')

const {verifyToken} = require('./token')
const auth = (req, res, next) =>{
    if(req.headers["authorization"] != "") {
        try{
            let verified = verifyToken(req)
            if (verified) { 
                next();
            }
            else { 
                throw new Error("Unauthorized error.")
            }
        }catch (error){
            console.log(error.message)
            resHelper.UnauthorizedResponse("Error: Unauthorized user.",res)
        }
    }else{
        resHelper.UnauthorizedResponse("Error: Authorization header missing.",res)
    }
}
module.exports = auth