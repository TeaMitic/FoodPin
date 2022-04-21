module.exports = { 
    OkResponse(content,res) { 
        try {
            res.status(200).send(content) 
        } catch (error) {
            console.log(error)
            throw error 
        }
    },
    ErrorResponse(error,res) { 
        try {
            res.status(500).send({name: error.name,message: error.message})
        } catch (error) {
            console.log(error)
            throw error 
        }
    },
    BadRequestResponse(content,res) { 
        try {
            res.status(400).send(content)
        } catch (error) {
            console.log(error)
            throw error 
        }
    },
    UnauthorizedResponse(content,res) { 
        try {
            res.status(401).send(content)
        } catch (error) {
            console.log(error)
            throw error 
        }
    },

    
    //message generator - used in logic.js files for creating content for 
    // response messages from this module 
    NoUserError(userID) { 
        return { 
            name: "Client error.",
            text: `User with id: '${userID}' not found in database.`
        }
    },
    NoBoardError(userID,boardName) { 
        return { 
            name: "Client error.",
            text: `Board with name '${boardName}' for user with id: '${userID}' not found in database.`
        }
    },
    AllPinsBoardError() { 
        return { 
            name: "Client error.",
            text: `Board with name 'All pins' cannot be deleted.`
        }
    },
    NoPinError(pinID) { 
        return { 
            name: "Client error.",
            text: `Pin with id: '${pinID}' not found in database.`
        }
    },
    ValidationError(validateString) { 
        return { 
            name: "Validation failed.",
            text: validateString
        }
    },
    ExistingBoardError(boardName) { 
        return { 
            name: "Client error.",
            text: `You already have board with name '${boardName}'.`
        }
    },
    LoginError(property) { 
        return { 
            name: "Login error.",
            text: `Wrong ${property}.`
        }
    },
    NotificationError(userID){
        return{
            name: "Notification error.",
            text: `Notification for user ${userID} was not sent`
        }
    },
    ImageError() { 
        return { 
            name: "Image error.",
            text: "There was some error with creating image."
        }
    }
    

}