const  neo4j  = require( '../neo4j-config');
const dtoHelper = require('../../Helper/dtoHelper');
const bcrypt = require('bcrypt')

const saltRounds = 10

const  register = async (userInfo) => { 
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
        //creating All pins board 
        let boardDB = await neo4j.model('Board').create({public: false})
        let board = dtoHelper.boardToJson(boardDB)
        let result = await neo4j.writeCypher(`
            MATCH (u:User {username: '${userInfo.username}'}), (b:Board {boardID: '${board.boardID}'})
            CREATE (u) -[:HAS_BOARD]-> (b)`
        )
            neo4j.transaction()
        user = dtoHelper.shortUserToJson(userDB)
        return dtoHelper.createResObject(user,true)
    } catch (error) {
        throw error
    }
}

const login = async (userInfo) => { 
    try {
        let userDB = await neo4j.first('User', {username: userInfo.username})
        if (userDB == false) { 
            return dtoHelper.createResObject({
                name: "Query error",
                text: `User with username '${userInfo.username}' doesn't exist.`
            },false)
        }
        let user = dtoHelper.userToJson(userDB)
        let result = await bcrypt.compare(userInfo.password, user.password)
        if (result) { 
            user = dtoHelper.shortUserToJson(userDB)
            return dtoHelper.createResObject(user,true)
        }
        else { 
            return dtoHelper.createResObject({ 
                name: "Query error",
                text: `Incorrect password.`
            })
        }
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

module.exports = { 
    register,
    login,
    getUserById
}