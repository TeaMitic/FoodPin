const Message = require('../models/messageModel')
const sequelize = require('../config/mySql-config')

//not done

const createMessage = async (messageInfo) => { 
    try {
        await sequelize.sync()
        let message = await Message.create(messageInfo) 

        if(message !=null){
            return true
        }
        return false
        //create function throws error if anything bad happens 
        // return message.toJSON()
    } catch (error) {
        throw error    
    }
}

module.exports = {
    createMessage
}

