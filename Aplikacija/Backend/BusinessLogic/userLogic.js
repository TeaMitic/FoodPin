const  { register } = require( '../Persistance/DataProvider/userDataProvider')
const  token  = require('../config/token')
const registerUser = async (userInfo) => { 
    try {
        let user = await register(userInfo) 
        user = { 
            username: user.username,
            userID: user.userID,
        }
        let webToken = token.generateAccessToken(user)
        return {user,webToken}
        
    } catch (error) {
        throw error
    }
}

module.exports = { 
    registerUser
}