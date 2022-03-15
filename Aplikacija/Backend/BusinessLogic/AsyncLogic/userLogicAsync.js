const validation = require("../../Helper/validation")

const sendMessageAsync = async (messageInfo) => { 
    try {
        let validateString = validation.forMessage(messageInfo)
        if (validateString != 'ok') { 
            return dtoHelper.createResObject({
                name: "Validation failed",
                text: validateString
            },false)
        }
        
    } catch (error) {
        throw error
    }
}