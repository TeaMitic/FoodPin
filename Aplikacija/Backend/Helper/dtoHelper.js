module.exports = {
    userToJson(userModel) {
        return Object.fromEntries(userModel._properties)
    },
    shortUserToJson(userModel) { 
        let object = this.userToJson(userModel)
        return { 
            username: object.username,
            userID: object.userID
        }
    },
    attachToken(object, token) { 
        object.token = token
        return object
    },
    userToModel(userJson) { 
        return { 
            name: userJson.name != undefined ? userJson.name : null,
            surname: userJson.surname != undefined ? userJson.surname : null,
            username: userJson.username != undefined ? userJson.username : null,
            password: userJson.password != undefined ? userJson.password : null,
            email: userJson.email != undefined ? userJson.email : null,
            about: userJson.about != undefined ? userJson.about : null,
            website: userJson.website != undefined ? userJson.website : null,
        }
    },
    createResObject(content,success) { 
        return {
            successful: success,   
            content: content
        }
    }

    
}
