const Follow = require('../models/followModel')
const sequelize = require('../config/mySql-config')

const follow = async(msg)=>{
    try {
        let message = await Follow.create(msg)
        console.log(message.toJSON())
        
    } catch (error) {
        throw error
    }
}

module.exports= {
    follow
}

