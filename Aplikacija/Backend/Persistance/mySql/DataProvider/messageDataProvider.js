const Message = require('../models/messageModel')
const Follow = require('../models/followModel')
const Like = require('../models/likeModel')
const Comment = require('../models/commentModel')

const createMessage = async () => { 
    try {
        const testMsg = await Message.create({
            receiverID: 'test-receiverID',
            senderID: 'test-senderID',
            text: 'test-text'
        })
        const testFollow = await Follow.create({
            receiverID: 'test-receiverID',
            senderID: 'test-senderID',
        })
        const testLike = await Like.create({
            receiverID: 'test-receiverID',
            senderID: 'test-senderID',
            pinID: 'test-pinID'
        })
        const testComment = await Comment.create({
            receiverID: 'test-receiverID',
            senderID: 'test-senderID',
            pinID: 'test-pinID',
            text: 'test-text'
        })
        return true
    
    } catch (error) {
        throw error    
    }
}

module.exports = {
    createMessage
}

