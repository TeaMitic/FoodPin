const logic = require('../../BusinessLogic/pinLogic')
const resHelper = require('../../Helper/responseHelper')

const create = async (req,res) => { 
    try {
        let result = await logic.createPin(req.body)
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

const like = async (req,res) => { 
    try {
        let result = await logic.likePin(req.params.id)
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

module.exports = { 
    create,
    like
}