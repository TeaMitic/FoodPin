
const jwt = require("jsonwebtoken")


let token_secret = "secretstringzajsonwebtoken"
const generateAccessToken = (user) => { 
    return jwt.sign({ 
        username: user.username, 
        userID: user.userID,
    },
    token_secret, 
    {
        expiresIn: '1800s'
    })
}
const getDecodedToken = (request) =>  { 
    const token = request.headers["authorization"].split(' ')[1];        
    decodedToken = jwt.verify(token,token_secret) 
    return decodedToken
}
const getTokenID = (request) => { 
    return getDecodedToken(request).id
}




module.exports = { 
    generateAccessToken,
    getTokenID,
}

