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

const unfollow = async(id)=>{
    try {
        let row= await Follow.destroy({
            where: {
                senderID: id.currentUser,
                receiverID: id.followedUser
            }
        })
        console.log(row);
        return true

    } catch (error) {
        throw error
    }

}

const like= async()=>{
    try {
        
    } catch (error) {
        throw error        
    }
}

const dislike = async()=>{
    try {
        
    } catch (error) {
        throw error
    }
}

module.exports= {
    follow,
    unfollow,
    like,
    dislike
}

