const userDataProvider  = require( '../../Persistance/neo4j/DataProvider/userDataProvider')
const resHelper = require('../../Helper/responseHelper')
const token  = require('../../middleware/token')
const dtoHelper = require('../../Helper/dtoHelper')
const validation = require('../../Helper/validation')
const boardLogic = require('./boardLogic')
const bcrypt = require('bcrypt')


const attachToken = (userInfo) => { 
    try {
        let webToken = token.generateAccessToken(userInfo)
        userInfo = dtoHelper.attachToken(userInfo,webToken)
        
        return userInfo
        
    } catch (error) {
        throw error
    }
}

const registerUser = async (userInfo) => { 
    try {
        //validation
        let validateString = validation.forRegister(userInfo) 
        if (validateString != 'ok') { 
            return dtoHelper.createResObject({
                name: "Validation failed",
                text: validateString
            },false)   
        }
        //user creation
        let user = await userDataProvider.create(userInfo) 
        if (!user) { 
            throw new Error("Couldn't create user account.")
        }
        user = dtoHelper.shortUserToJson(user)
        //creating All pins board - default board 
        let result = await boardLogic.createBoard({
            userID: user.userID,
            boardName: 'All pins',
            public: false
        })
        if (result.success) { 
            return dtoHelper.createResObject(
                attachToken(user),
                true
            ) 
        }
        return result //returnig error object 
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
        let user = await userDataProvider.getUserByUsername(loginInfo.username)
        if (!user) { 
            return dtoHelper.createResObject(
                resHelper.LoginError("username"),
                false
            )
        }
        let correctPass = await bcrypt.compare(loginInfo.password, user.password)
        if (correctPass) { 
            user = dtoHelper.shortUserToJson(user)
            user = attachToken(user)
            return dtoHelper.createResObject(user,true)
        }
        else { 
            return dtoHelper.createResObject(
                resHelper.LoginError("password"),
                false
            )
        }
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
        return await userDataProvider.getUserById(id)
    } catch (error) {
        throw error
    }

}
const followUser= async(ids)=>{
    try {
        let validateString1 = validation.forString(ids.currentUser)
        let validateString2 = validation.forString(ids.followedUser)
        if (validateString1 != 'ok') { 
            return dtoHelper.createResObject({
                name: "Validation failed",
                text: validateString1
            },false)         
        }
        if (validateString2 != 'ok') { 
            return dtoHelper.createResObject({
                name: "Validation failed",
                text: validateString2
            },false)         
        }
        let currentUser = await userDataProvider.getUserById(ids.currentUser)
        let followedUser = await userDataProvider.getUserById(ids.followedUser)
        if(!currentUser){
            return dtoHelper.createResObject(
                resHelper.NoUserError(ids.currentUser), false
            )
        }
        if(!followedUser){
            return dtoHelper.createResObject(
                resHelper.NoUserError(ids.followedUser), false
            )
        }
        return await userDataProvider.followUser(ids)
    } catch (error) {
        throw error
    }
}

module.exports = { 
    registerUser,
    loginUser,
    getUserById,
    followUser
}