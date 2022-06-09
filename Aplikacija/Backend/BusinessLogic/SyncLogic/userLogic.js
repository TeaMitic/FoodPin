const userDataProvider  = require( '../../Persistance/neo4j/DataProvider/userDataProvider')
const imageDataProvider  = require( '../../Persistance/neo4j/DataProvider/imageDataProvider')
const resHelper = require('../../Helper/responseHelper')
const token  = require('../../middleware/token')
const dtoHelper = require('../../Helper/dtoHelper')
const validation = require('../../Helper/validation')
const boardLogic = require('./boardLogic')
const bcrypt = require('bcrypt')
const fs = require('fs')
const path = require('path')
const logicHelper = require('../../Helper/imageHelper')



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
        //get user from neo4j db
        let user = await userDataProvider.getUserById(id)
        //get image filename and load image and attach do object
        if (!user) { 
            return dtoHelper.createResObject(
                resHelper.NoUserError(id),false
            )
        }
        
        
        return dtoHelper.createResObject(attachImage(user),true)

        
    } catch (error) {
        throw error
    }

}

const getUserByUsername = async (username) => { 
    try {

        //* treba da se vrati i pratioci
        let validateString = validation.forString(username, "Username")
        if (validateString != 'ok') { 
            return dtoHelper.createResObject({
                name: "Validation failed",
                text: validateString
            },false)         
        }
        let user = await userDataProvider.getUserByUsername(username)
        if(!user){

            return dtoHelper.createResObject(
                resHelper.NoUserError(username), false
            )
        } 
       
        //followers and following
        let followObj =  await userDataProvider.countFollows(user.userID)
        user.followers = followObj.followers
        user.following = followObj.following
        
        return dtoHelper.createResObject(attachImage(user),true)
        
    } catch (error) {
        throw error
    }
}

const followUser= async(ids)=>{
    try {
        let validateString1 = validation.forString(ids.currentUser,"currentUser")
        let validateString2 = validation.forString(ids.followedUser,"followUser")
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

const unfollowUser = async(ids)=>{
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
        return await userDataProvider.unfollowUser(ids)
    } catch (error) {
        throw error
    }
}
const   addImage = async(imgFile,username) => { 
    try {
        let validateString = validation.forString(username, "Username")
        if (validateString != 'ok') { 
            return dtoHelper.createResObject({
                name: "Validation failed",
                text: validateString
            },false)         
        }
        let user = await userDataProvider.getUserByUsername(username)
        if(!user){
            return dtoHelper.createResObject(
                resHelper.NoUserError(user.userID), false
            )
        } 
        //add image 
        return await logicHelper.addImage(imgFile,{
            userID: user.userID,
            type: 'User'
        })
       

    } catch (error) {
        throw error
    }
}

const updateProfile = async (user,userID) => { 
    try {
        let validateString = validation.forString(userID,"UserID")
        if (validateString != 'ok') { 
            return dtoHelper.createResObject({
                name: "Validation failed",
                text: validateString
            },false)         
        }
        //? user validation
        let userDB = await userDataProvider.getUserById(userID)
        if(!userDB){
            return dtoHelper.createResObject(
                resHelper.NoUserError(userID), false
            )
        } 
        let result = await userDataProvider.updateProfile(user,userID)
        return result //? zasto kreiram resObject u provider klasi? 
    } catch (error) {
        throw error
    }
} 

//#region helper functions
const attachToken = (userInfo) => { 
    try {
        let webToken = token.generateAccessToken(userInfo)
        userInfo = dtoHelper.attachToken(userInfo,webToken)
        
        return userInfo
        
    } catch (error) {
        throw error
    }
}

const attachImage = (user) => { 
    try {
        let filePath,image
        if (user.hasImage != undefined  && user.hasImage) { 

            //setting flags to false 
            user.image = null
            user.hasImage = false

            filePath = path.join(__dirname,'..','..','images','profiles',user.username + '.jpg')
            if (fs.existsSync(filePath)) { 
                image= fs.readFileSync(filePath)

                //setting flags to true
                user.image = image
                user.hasImage = true
            }

            return user
        }
    } catch (error) {
        throw error 
    }
   
}
//#endregion helper functions 


module.exports = { 
    registerUser,
    loginUser,
    getUserById,
    followUser,
    unfollowUser,
    addImage,
    updateProfile,
    getUserByUsername
}