const  syncLogic = require('../../BusinessLogic/SyncLogic/userLogic')
const asyncLogic = require('../../BusinessLogic/AsyncLogic/userLogicAsync')
const resHelper = require('../../Helper/responseHelper')

const  create = async (req,res) => { 
    try {
        let result = await syncLogic.registerUser(req.body)
        if (result.success) { 
            //create queue for notif
            resHelper.OkResponse(result.content,res)
        }
        else { 
            console.log(result)
            resHelper.BadRequestResponse(result.content,res)
        }
    } catch (error) {
        console.log(error);
        resHelper.ErrorResponse(error,res)
    }     
}

const login = async(req,res) => { 
    try {
        let result = await syncLogic.loginUser(req.body)
        if (result.success) { 
            //create queue for notif
            resHelper.OkResponse(result.content,res)
        }
        else { 
            resHelper.BadRequestResponse(result.content,res)
        }
    } catch (error) {
        console.log(error)
        resHelper.ErrorResponse(error,res)
    }
}

const getById = async(req,res) => { 
    try {
        let result = await syncLogic.getUserById(req.params.id)
        if (result.success) { 
            resHelper.OkResponse(result.content,res)
        }
        else { 
            resHelper.BadRequestResponse(result.content,res)
        }
    } catch (error) {
        console.log(error);
        resHelper.ErrorResponse(error,res)
    }
}
const followUser = async(req,res)=>{
    try {
        ids={
            currentUser: req.body.currentUser,
            followedUser: req.body.followedUser
        }
        let result = await syncLogic.followUser(ids)
        if (result.success) { 
            result = await asyncLogic.followAsync(ids)
            resHelper.OkResponse(result.content,res)
        }
        else { 
            resHelper.BadRequestResponse(result.content,res)
        }
    } catch (error) {
        console.log(error);
        resHelper.ErrorResponse(error,res)
    }
}

const sendMessage = async (req,res) => { 
    try {
        //mySql async logic 
        let result = await logic.getUserById(req.params.id)
        if (result.success) { 
            resHelper.OkResponse(result.content,res)
        }
        else { 
            resHelper.BadRequestResponse(result.content,res)
        }
    } catch (error) {
        console.log(error);
        resHelper.ErrorResponse(error,res)
    }
}

module.exports = { 
    create,
    login,
    getById,
    followUser
}