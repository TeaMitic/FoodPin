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
        // let userDB = await neo4j.model('User').find(id)
        // if (userDB) { 
        //     let user = dtoHelper.noPasswordUser(userDB)
        //     return dtoHelper.createResObject(user,true)
        // }
        // else { 
        //     return dtoHelper.createResObject({ 
        //         name: "Query error",
        //         text: `User doesn't exist.`
        //     })
        // }
    } catch (error) {
        throw error
    }
}
const followUser= async(ids)=>{ 
    try {
        let currentDB = await neo4j.model('User').find(ids.currentUser)
        let followedDB = await neo4j.model('User').find(ids.followedUser)
        let current = dtoHelper.userToJson(currentDB)
        let followed = dtoHelper.userToJson(followedDB)
        // console.log(currentDB)
        // console.log(followedDB)
        if(followedDB){
            let result = await neo4j.writeCypher(`
            MATCH (a:User {username: '${current.username}'}), (b:User {username: '${followed.username}'})
            CREATE (a) -[:FOLLOWS]-> (b)`
            )
            // console.log(result)
            neo4j.transaction()
            user = dtoHelper.shortUserToJson(followedDB)
            return dtoHelper.createResObject(user,true)
        }
        else { 
            return dtoHelper.createResObject({ 
                name: "Query error",
                text: `User doesn't exist.`
            })
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
    getUserByUsername,
    followUser
}