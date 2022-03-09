module.exports = { 
    forLogin(object) { 
        if (object.username == undefined) return "Username field empty"
        if (object.username == null || object.username == "") return "Username cannot null or be empty string"
        if (object.password == undefined) return "Password field empty"
        if (object.password == null || object.password == "") return "Password cannot null or be empty string"
        return "ok"
    },
    forRegister(object) { 
        let validateString = login(object) 
        if (validateString != 'ok') return validateString
        if (object.name == undefined) return "Name field empty"
        if (object.name == null || object.name == "") return "Name cannot be null or empty string"
        return 'ok'
    },
    forString(word) { 
        if (word == null || word == "") return "Value cannot be null or empty string"
        return "ok" 
    }

    
}