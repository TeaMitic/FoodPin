const resHelper = require('../../Helper/responseHelper')
const syncLogic = require('../../BusinessLogic/SyncLogic/pinLogic')
const asyncLogic = require('../../BusinessLogic/AsyncLogic/pinLogicAsync')

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
        let result = await syncLogic.addImage(req.file,req.params.id)
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
            result= await asyncLogic.likePin(req.params.id, req.body)
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
            //mysql
            result= await asyncLogic.dislikePin(req.params.id, req.body)
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
            
            //mysql
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

const commentPin = async (req,res) => { 
    try {
        let result = await syncLogic.commentPin(req.body)
        if (result.success) { 
            //in result.content se nalazi receiverID 
            result = await asyncLogic.commentPin({
                senderID: req.body.senderID,
                text: req.body.text,
                receiverID: result.content.receiverID,
                pinID: req.body.pinID
            })
            if (!result.success) return resHelper.ErrorResponse(result.content,res)
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
    addImage,
    commentPin
}
