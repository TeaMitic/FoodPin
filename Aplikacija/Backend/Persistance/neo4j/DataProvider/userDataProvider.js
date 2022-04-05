const  neo4j  = require( '../config');
const dtoHelper = require('../../../Helper/dtoHelper');
const bcrypt = require('bcrypt')

const saltRounds = 10

const  create = async (userInfo) => { 
    try {
        userInfo = dtoHelper.userToModel(userInfo)
        let hashPassword = await bcrypt.hash(userInfo.password, saltRounds)
        let userDB = await neo4j.model("User").create({
            name: userInfo.name,  
            surname: userInfo.surname,
            username: userInfo.username,
            password: hashPassword,
            email: userInfo.email,
            about: userInfo.about,
            website: userInfo.website
        })
        if (!userDB) { 
            return null
        }
        
        user = dtoHelper.userToJson(userDB)
        return user
    } catch (error) {
        throw error
    }
}


const getUserById = async (id) => {
    
    try {
        let userDB = await neo4j.model('User').find(id)
        if (userDB) { 
            let user = dtoHelper.userToJson(userDB)
            return user
        }
        else { 
            return null
        }
    } catch (error) {
        throw error
    }
}

const getUserByUsername = async(username) => { 
    try {
        let userDB = await neo4j.model('User').first('username',username)
        if (userDB) { 
            let user = dtoHelper.userToJson(userDB)
            return user
        }
        return null 
    } catch (error) {
        throw error
    }
}
const followUser= async(ids)=>{ 
    try {
        // let currentDB = await neo4j.model('User').find(ids.currentUser)
        // let followedDB = await neo4j.model('User').find(ids.followedUser)
        // let current = dtoHelper.userToJson(currentDB)
        // let followed = dtoHelper.userToJson(followedDB)
        // if(followedDB){
            let result = await neo4j.writeCypher(`
            MATCH (a:User {userID: '${ids.currentUser}'}), (b:User {userID: '${ids.followedUser}'})
            CREATE (a) -[:FOLLOWS]-> (b)`
            )
            //neo4j.transaction()
            // user = dtoHelper.shortUserToJson(followedDB)
            return dtoHelper.createResObject(ids.followedUser,true)
        // }
        // else { 
        //     return dtoHelper.createResObject({ 
        //         name: "Query error",
        //         text: `User doesn't exist.`
        //     })
        // }
        // //return dtoHelper.userToJson(userDB)
    } catch (error) {
        throw error
    }
}

const unfollowUser = async(ids)=>{
    try {
        let result = await neo4j.writeCypher(`MATCH (a:User {userID: '${ids.currentUser}'})-[r:FOLLOWS]->(b:User {userID: '${ids.followedUser}'})
        DELETE r`)
        return dtoHelper.createResObject(ids.followedUser,true)        
    } catch (error) {
        throw error     
    }
}

const updateProfile = async(user,userID) => { 
    try {
        user = dtoHelper.userToModel(user)
        let userDB = await neo4j.model('User').find(userID)
        await userDB.update({
            name: user.name,
            surname: user.surname,
            username: user.username,
            email: user.email,
            about: user.about,
            website: user.website,
        })
        return dtoHelper.createResObject({},true)
    } catch (error) {
        throw error
    }
}
module.exports = { 
    create,
    getUserById,
    getUserByUsername,
    followUser,
    unfollowUser,
    updateProfile
}