const dataProvider  = require( '../Persistance/DataProvider/userDataProvider')
const token  = require('../middleware/token')
const dtoHelper = require('../Helper/dtoHelper')
const validation = require('../Helper/validation')

const login_register = async(userInfo,func) => { 
    try {
        let result = await func(userInfo) 
        if (result.success) { 
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
        let validateString = validation.forRegister(userInfo) //same information are sent
        if (validateString != 'ok') { 
            return dtoHelper.createResObject({
                name: "Validation failed",
                text: validateString
            },false)   
        }

        return await login_register(userInfo,dataProvider.register)
    } catch (error) {
        throw error
    }
} 

const loginUser = async(loginInfo) => { 
    try {
        let validateString = validation.forLogin(loginInfo)
        if (validateString != 'ok') { 
            return dtoHelper.createResObject({
                name: "Validation failed",
                text: validateString
            },false)   
        }

        return await login_register(loginInfo,dataProvider.login)
    } catch (error) {
        throw error
    }
}

const getUserById = async(id) => { 
    try {
        let validateString = validation.forString(id, "ID")
        if (validateString != 'ok') { 
            return dtoHelper.createResObject({
                name: "Validation failed",
                text: validateString
            },false)         
        }
        return await dataProvider.getUserById(id)
    } catch (error) {
        throw error
    }

}

module.exports = { 
    registerUser,
    loginUser,
    getUserById
}