const Follow = require('../models/followModel')
const sequelize = require('../config/mySql-config')

const follow = async(msg)=>{
    try {
        let message = await Follow.create(msg)
        console.log(message.toJSON())
        return true
        
    } catch (error) {
        throw error
    }
}

const unfollow = async(msg)=>{

}

module.exports= {
    follow
}

