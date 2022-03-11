const  neo4j  = require( '../neo4j-config');
const dtoHelper = require('../../Helper/dtoHelper');
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
            let user = dtoHelper.noPasswordUser(userDB)
            return user
        }
        else { 
            console.log("PROVIDER:",userDB)
            return null
        }
    } catch (error) {
        throw error
    }
}

const getUserByUsername = async(username) => { 
    try {
        let userDB = await neo4j.model('User').first('username',username)
        if (!userDB) { 
            return null
        }
        return dtoHelper.userToJson(userDB)
    } catch (error) {
        throw error
    }
}
module.exports = { 
    create,
    login,
    getUserById,
    getUserByUsername
}