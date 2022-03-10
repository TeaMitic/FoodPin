const  logic = require('../../BusinessLogic/userLogic')
const resHelper = require('../../Helper/responseHelper')

const  create = async (req,res) => { 
    try {
        let result = await logic.registerUser(req.body)
        if (result.success) { 
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
        let result = await logic.loginUser(req.body)
        if (result.success) { 
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
    getById
}