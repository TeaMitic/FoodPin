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
const update = async(req, res)=>{
    try {
        let result = await logic.updatePin(req.params.id, req.body)
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
const dislike = async (req,res) => { 
    try {
        let result = await logic.dislikePin(req.params.id)
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

const deletePin = async (req,res) => {
    try {
        let result = await logic.deletePin(req.params.id)
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

const savePin = async (req,res) => { 
    try {
        let result = await logic.savePin(req.body)
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
const  getByID = async(req,res)=>{
    try {
        let result = await logic.getByID(req.params.id)
       // console.log("PIN iz controlera: ")
        if (result.success) { 
            //console.log(result.content)
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
    like,
    update,
    dislike,
    deletePin,
    savePin,
    getByID
}