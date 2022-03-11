const logic = require('../../BusinessLogic/boardLogic')
const resHelper = require('../../Helper/responseHelper')

const create = async (req,res) => { 
    try {
        let result = await logic.createBoard(req.body)
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

const update = async (req,res) => { 
    try {
        let result = await logic.updateBoard(req.body,req.params.id)
        if (result.success) { 
            resHelper.OkResponse(result.content,res)
        }
        else { 
            console.log(result)
            resHelper.BadRequestResponse(result.content,res)
        }
    } catch (error) {
        console.log(error)
        resHelper.ErrorResponse(error,res)

    }
}

const deleteBoard = async (req,res) => { 
    try {
        let result = await logic.deleteBoard(req.body)
        if (result.success) { 
            resHelper.OkResponse(result.content,res)
        }
        else { 
            console.log(result)
            resHelper.BadRequestResponse(result.content,res)
        }
    } catch (error) {
        console.log(error)
        resHelper.ErrorResponse(error,res)

    }
}

module.exports = { 
    create,
    update,
    deleteBoard
}