const Message = require('../models/messageModel')
const sequelize = require('../config/mySql-config')

const createMessage = async (messageInfo) => { 
    try {
        await sequelize.sync()
        // let message = await Message.create(messageInfo) 

        //create function throws error if anything bad happens 
        // return message.toJSON()
    } catch (error) {
        throw error    
    }
}

module.exports = {
    createMessage
}

