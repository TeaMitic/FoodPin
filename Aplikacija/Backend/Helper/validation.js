module.exports = { 
    forLogin(object) { 
        if (object.username == undefined) return "Username field not found."
        if (object.username == null || object.username == "") return "Username cannot be null or  empty string."
        if (object.password == undefined) return "Password field not found."
        if (object.password == null || object.password == "") return "Password cannot be null or  empty string."
        return "ok"
    },
    forRegister(object) { 
        let validateString = this.forLogin(object) 
        if (validateString != 'ok') return validateString
        if (object.name == undefined) return "Name field not found."
        if (object.name == null || object.name == "") return "Name cannot be null or empty string."
        return 'ok'
    },
    forString(word, label) { 
        if (word == null || word == "") return `Value of '${label}' cannot be null or empty string.`
        return "ok" 
    },
    forPin(object) { 
        if (object.pin == undefined) "Pin object not found."
        if (object.pin.title == undefined) return "Title field not found."
        if (object.pin.title == null || object.pin.title == "") return "Title cannot be null or  empty string."
        if (object.userID == undefined) return "UserID field not found."
        if (object.userID == null || object.userID == "") return "UserID cannot be null or  empty string."
        // if (object.creatorID == undefined) return "CreatorID field not found."
        // if (object.creatorID == null || object.creatorID == "") return "CreatorID cannot be null or  empty string."
        if (object.boardName == undefined) return "Board name field not found."
        if (object.boardName == null || object.boardName == "") return "Board name cannot be null or  empty string."
        if (object.tags == undefined) return "Tags field not found."
        if (object.tags.length == 0) return "Tags field cannot be empty."
        return "ok"
    },
    forPinSave(object) { 
        if (object.pinID == undefined) return "PinID field not found."
        if (object.pinID == null || object.pinID == "") "PinID cannot be null or empty string."
        if (object.userID == undefined) return "UserID field not found."
        if (object.userID == null || object.userID == "") return "UserID cannot be null or  empty string."
        if (object.boardName == undefined) return "Board name field not found."
        if (object.boardName == null || object.boardName == "") return "Board name cannot be null or  empty string." 
        return 'ok'
    },
    forBoard(object) { 
        if (object.userID == undefined) return "UserID field not found."
        if (object.userID == null || object.userID == "") return "UserID  cannot be null or  empty string."
       
        return "ok"
    },
    forBoardUpdate(object,boardID) { 
        let validateString = this.forBoard(object)
        if (validateString != 'ok') return validateString
        validateString = this.forString(boardID,"boardID")
        if (validateString != 'ok') return validateString
        if (object.boardName == undefined) return "Board name field not found."
        if (object.boardName == null || object.boardName == "") return "Board name be cannot null or  empty string."
        if (object.public == undefined) return "Public board field not found."
        if (object.public == null) return "Public board cannot be null."
        return 'ok'
    },
    forBoardGet(object) { 
        let validateString = this.forBoard(object)
        if (validateString != 'ok') return validateString
        if (object.boardName == undefined) return "Board name field not found."
        if (object.boardName == null || object.boardName == "") return "Board name be cannot null or  empty string."
        return 'ok'
    },
    forBoardDelete(object)  { 
        if (object.userID == undefined) return "UserID field not found."
        let validateString = this.forString(object.userID,"userID")
        if (validateString != 'ok') return validateString
        if (object.boardName == undefined) return "BoardName field not found."
        validateString = this.forString(object.boardName,"boardName")
        if (validateString != 'ok') return validateString
        return 'ok'
    },
    forMessage(object) { 
        //not done good 
        if (object.receiverID == undefined) return "ReceiverID field not found."
        let validateString = this.forString(object.receiverID, "receiverID")
        if (object.senderID == undefined) return "SenderID field not found."
        validateString = this.forString(object.senderID, "senderID")
        if (object.text == undefined) return "Text field not found."
        validateString = this.forString(object.text, "text")
        return 'ok'
    },
    forPinNotification(object) { 
        if (object.senderID == undefined) return "SenderID field not found."
        let validateString = this.forString(object.senderID,"senderID")
        if (validateString != 'ok') return validateString

        if (object.pinID == undefined) return "PinID field not found."
        validateString = this.forString(object.pinID, "pinID")
        if (validateString != 'ok') return validateString
        return 'ok'
    },
    forUserNotification(object) { 
        if (object.senderID == undefined) return "SenderID field not found."
        let validateString = this.forString(object.senderID,"senderID")
        if (validateString != 'ok') return validateString

        if (object.receiverID == undefined) return "ReceiverID field not found."
        validateString = this.forString(object.receiverID,"receiverID")
        if (validateString != 'ok') return validateString
        return 'ok'
    },
    forComment(object) { 
        if (object.text == undefined) return "Text field not found."
        let validateString = this.forString(object.text,"comment")
        if (validateString != 'ok') return validateString

        validateString = this.forPinNotification(object)
        if (validateString != 'ok') return validateString

        return 'ok'
    },


    
}