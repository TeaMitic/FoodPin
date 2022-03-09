
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
const verifyToken = (request) =>  { 

    const token = request.headers["authorization"]; 
    try { 
        let decodedToken = jwt.verify(token,token_secret) 
        return true
    }
    catch(error) { 
        return false
    }
}





module.exports = { 
    generateAccessToken,
    verifyToken
    // getTokenID,
}

