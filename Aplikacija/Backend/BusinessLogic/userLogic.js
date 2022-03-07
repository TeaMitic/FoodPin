const   dataProvider  = require( '../Persistance/DataProvider/userDataProvider')
const  token  = require('../config/token')
const dtoHelper = require('../Helper/dtoHelper')
const validation = require('../Helper/validation')

const login_register = async(userInfo,func) => { 
    try {
        let result = await func(userInfo) 
        if (result.successful) { 
            let webToken = token.generateAccessToken(result.content)
            result.content = dtoHelper.attachToken(result.content,webToken)
        }
        return result
        
    } catch (error) {
        throw error
    }
}

const registerUser = async (userInfo) => { 
    try {
        let validateString = validation.login(userInfo) //same information are sent
        if (validateString != 'ok') { 
            return dtoHelper.createResObject({
                name: "Validation Failed",
                text: validateString
            },false)   
        }

        return login_register(userInfo,dataProvider.register)
    } catch (error) {
        throw error
    }
} 

const loginUser = async(loginInfo) => { 
    try {
        let validateString = validation.login(loginInfo)
        if (validateString != 'ok') { 
            return dtoHelper.createResObject({
                name: "Validation Failed",
                text: validateString
            },false)   
        }

        return login_register(loginInfo,dataProvider.login)
    } catch (error) {
        throw error
    }
}

module.exports = { 
    registerUser,
    loginUser
}