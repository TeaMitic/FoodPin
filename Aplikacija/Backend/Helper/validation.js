module.exports = { 
    login(object) { 
        if (object.username == undefined) return "Username field empty"
        if (object.username == null || object.username == "") return "Username cannot be empty string"
        if (object.password == undefined) return "Password field empty"
        if (object.password == null || object.password == "") return "Password cannot be empty string"
        return "ok"
    },
    
}