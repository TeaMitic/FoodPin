module.exports = { 
    forLogin(object) { 
        if (object.username == undefined) return "Username field not found."
        if (object.username == null || object.username == "") return "Username cannot null or be empty string."
        if (object.password == undefined) return "Password field not found."
        if (object.password == null || object.password == "") return "Password cannot null or be empty string."
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
        if (object.pin.imgName == undefined) return "Image name field not found."
        if (object.pin.imgName == null || object.pin.imgName == "") return "Image name cannot null or be empty string."
        if (object.pin.title == undefined) return "Title field not found."
        if (object.pin.title == null || object.pin.title == "") return "Title cannot null or be empty string."
        if (object.userID == undefined) return "UserID field not found."
        if (object.userID == null || object.userID == "") return "UserID  cannot null or be empty string."
        if (object.boardName == undefined) return "Board name field not found."
        if (object.boardName == null || object.boardName == "") return "Board name  cannot null or be empty string."
        if (object.tags == undefined) return "Tags field not found."
        if (object.tags.length == 0) return "Tags field cannot be empty."
        return "ok"
    },
    forBoard(object) { 
        if (object.userID == undefined) return "UserID field not found."
        if (object.userID == null || object.userID == "") return "UserID  cannot null or be empty string."
       
        return "ok"
    }

    
}