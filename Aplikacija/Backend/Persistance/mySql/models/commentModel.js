const {DataTypes} = require('sequelize')
const sequelize = require('../config')

const Comment = sequelize.define('Comment', { 
    receiverID: { 
        type: DataTypes.STRING,
        allowNull: false
    },
    senderID: { 
        type: DataTypes.STRING,
        allowNull: false
    },
    pinID: { 
        type: DataTypes.STRING,
        allowNull: false
    },
    text: { 
        type: DataTypes.STRING,
        allowNull: false
    },
    readFlag: { 
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
})
// Comment.sync() //- This creates the table if it doesn't exist (and does nothing if it already exists)
//  Comment.sync({ force: true }) //- This creates the table, dropping it first if it already existed
//  Comment.sync({ alter: true }) //- This checks what is the current state of the table in the database
        // (which columns it has, what are their data types, etc),
        // and then performs the necessary changes in the table to make it match the model.



module.exports = Comment