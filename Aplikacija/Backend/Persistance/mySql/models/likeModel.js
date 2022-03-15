const {DataTypes} = require('sequelize')
const sequelize = require('../config/mySql-config')

const Like = sequelize.define('Like', { 
    id: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
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
    readFlag: { 
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    createdAt: { 
        type: DataTypes.DATE,
        allowNull: false,
    }
})

// Like.sync() //- This creates the table if it doesn't exist (and does nothing if it already exists)
//  Like.sync({ force: true }) //- This creates the table, dropping it first if it already existed
//  Like.sync({ alter: true }) //- This checks what is the current state of the table in the database
        // (which columns it has, what are their data types, etc),
        // and then performs the necessary changes in the table to make it match the model.

module.exports = Like