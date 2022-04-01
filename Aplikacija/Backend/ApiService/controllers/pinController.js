const syncLogic = require('../../BusinesssyncLogic/SyncLogic/pinLogic')
const resHelper = require('../../Helper/responseHelper')

const create = async (req,res) => { 
    try {
        let result = await syncLogic.createPin(req.body)
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

const addImage = async (req,res) => { 
    try {
        let result = await syncLogic.addImage(req.file.filename,req.params.id)
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
        let result = await syncLogic.likePin(req.params.id)
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
        let result = await syncLogic.updatePin(req.params.id, req.body)
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
        let result = await syncLogic.dislikePin(req.params.id)
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
        let result = await syncLogic.deletePin(req.params.id)
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
        let result = await syncLogic.savePin(req.body)
        if (result.success) { 
            
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
        let result = await syncLogic.getByID(req.params.id)
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
    getByID,
    addImage
}
