const resHelper = require('../../Helper/responseHelper');
const boardDataProvider = require('../../Persistance/neo4j/DataProvider/boardDataProvider')
const userDataProvider = require('../../Persistance/neo4j/DataProvider/userDataProvider')
const messageDataProvider = require('../../Persistance/mySql/DataProvider/messageDataProvider')
const followDataProvider = require('../../Persistance/mySql/DataProvider/followDataProvider')
const pinDataProvider = require('../../Persistance/neo4j/DataProvider/pinDataProvider');
const { randomUUID } = require('crypto');
const hellotest = require('../../BusinessLogic/AsyncLogic/pushNotif/pushNotifications');

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

//test done
const getUserById = async (req,res) => { 
    try {
        let user = await userDataProvider.getUserById(req.params.id)
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



const getPic = async (req,res) => { 
    try {
        const fs = require('fs')
        const path = require('path')
        const imgCb = async (err,data) => { 
            if (err) throw err;
            resHelper.OkResponse({
                photo: data
            },res)

        }
        let filePath = path.join(__dirname,'..','..','images','profiles','tea.jpg')
        res.sendFile(filePath)
        // fs.readFile(filePath,imgCb)
        // resHelper.OkResponse({},res)
        // throw Error("NOT IMPLEMENTED")
    } catch (error) {
        console.log(error);
        resHelper.ErrorResponse(error,res)
    }
}

const commentPin = async (req,res) => { 
    try {
        await pinDataProvider.commentPin({
            senderID: '7e72bbfe-8ebf-4956-9e72-a5d8b5cc2913',
            pinID: 'fa72cfe2-778c-4016-b402-3287d16a3cd9',
            createdAt: new Date().toISOString(),
            text: 'Nice food!',
            
        })
        res.status(200).send(randomUUID())
    } catch (error) {
        console.log(error);
        resHelper.ErrorResponse(error,res)
    }
}

const testSockets = (req,res) => { 
    try {
        const hello = require('../../BusinessLogic/AsyncLogic/pushNotif/pushNotifications')
        hello()
        
    } catch (error) {
        console.log(error)
    }
}
module.exports = { 
    getBoardByName,
    connectBoardAndUser,
    getUserById,
    createMessage,
    followUser,
    getPic,
    commentPin,
    testSockets
}