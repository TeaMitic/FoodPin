const Comment = require('../models/commentModel')
const sequelize = require('sequelize')

const comment = async (commentInfo) => { 
    try {
        let comment = await Comment.create(commentInfo)
        console.log(comment)
        if (!comment) { 
            return false
        }
        return true
    } catch (error) {
        throw error
    }
}


module.exports = { 
    comment
}