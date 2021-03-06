const Like = require('../models/likeModel')
const sequelize = require('../config/mySql-config')

const like= async(likeInfo)=>{
    try {
        let msg = await Like.create(likeInfo)
        console.log(msg);
        if(!msg){
            return false
        }
        return true

        
    } catch (error) {
        throw error        
    }
}

const dislike = async(info)=>{
    try {
        let row = await Like.destroy({
            where: {
                pinID: info.pinID,
                senderID: info.senderID,
                receiverID: info.receiverID
            }
        })
        return true
        
    } catch (error) {
        throw error
    }
}

module.exports={
    like, 
    dislike
}