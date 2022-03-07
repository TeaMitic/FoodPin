const jwt = require('jsonwebtoken')

const {getTokenID} = require('../config/token')
const auth = (req, res, next) =>{
    if(req.headers ["authorization"] != "") {
        try{
            req.body.userID = getTokenID(req)
            next();
        }catch (error){
            res.status(401).send("Error: Unauthorized user.")
        }
    }else{
        res.status(401).send("Error: Authorization header missing.")
    }
}
module.exports = auth