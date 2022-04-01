const resHelper = require('../../Helper/responseHelper');
const boardDataProvider = require('../../Persistance/neo4j/DataProvider/boardDataProvider')
const userDataProvider = require('../../Persistance/neo4j/DataProvider/userDataProvider')
const messageDataProvider = require('../../Persistance/mySql/DataProvider/messageDataProvider')
const followDataProvider = require('../../Persistance/mySql/DataProvider/followDataProvider')
const redisClient = require('../../BusinessLogic/AsyncLogic/pushNotif/redis-config')

const createMessage = async (req,res) => { 
    try {
        let result = await messageDataProvider.createMessage({})
    } catch (error) {
        console.log(error);
        resHelper.ErrorResponse(error,res) 
    }
}

//test done
const getBoardByName = async (req,res) => { 
    try {
        let board = await boardDataProvider.getBoardByName(req.body.name,req.body.userID)
        resHelper.OkResponse(board,res)
        
    } catch (error) {
        console.log(error);
        resHelper.ErrorResponse(error,res)
    }
}

//test done
const connectBoardAndUser = async (req,res) => { 
    try {
        let connection = await boardDataProvider.connectWithUser(req.body.boardID,req.body.userID)
        console.log(connection)
    } catch (error) {
        console.log(error);
        resHelper.ErrorResponse(error,res)
    }
}

const getUserById = async (req,res) => { 
    try {
        let user = await userDataProvider.getUserById(req.params.id)
        console.log("CONTROLLER:",user)
    } catch (error) {
        console.log(error);
        resHelper.ErrorResponse(error,res)
    }
}

const followUser = async (req, res)=>{
    try {
        let msg={
            receiverID: req.body.followedUser,
            senderID: req.body.currentUser
        }
        let fUser = await followDataProvider.follow(msg)
        
    } catch (error) {
        console.log(error);
        resHelper.ErrorResponse(error,res)
    }
}

const testWs = async (req,res) => { 
    try {
       redisClient.publish('app:notif', JSON.stringify({
           userID: "15",
       }))
       console.log();
       resHelper.OkResponse({},res)
        
    } catch (error) {
        console.log(error);
        resHelper.ErrorResponse(error,res)
    }
}

module.exports = { 
    getBoardByName,
    connectBoardAndUser,
    getUserById,
    createMessage,
    followUser,
    testWs
}