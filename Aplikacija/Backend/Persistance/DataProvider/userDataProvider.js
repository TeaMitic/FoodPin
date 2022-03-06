const  neo4j  = require( '../../config/neo4j-config');
const { userToJson } = require('../../DTOHelper/DTOHelper');
const bcrypt = require('bcrypt')

const saltRounds = 10

const  register = async (userInfo) => { 
    try {
        let hashPassword = await bcrypt.hash(userInfo.password, saltRounds)
        let user = await neo4j.model("User").create({
            name: userInfo.name,  
            surname: userInfo.surname,
            username: userInfo.username,
            password: hashPassword,
            email: userInfo.email,
            about: userInfo.about,
            website: userInfo.website
        })
        user = userToJson(user)
        return user
    } catch (error) {
        throw error
    }
}


module.exports = { 
    register
}