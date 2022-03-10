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
    noPasswordUser(userModel) { 
        let user = this.userToJson(userModel)
        delete user.password 
        return user
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
    attachToken(object, token) { 
        object.token = token
        return object
    },
    createResObject(content,success) { 
        return {
            success: success,   
            content: content
        }
    },
    pinToModel(pinJson) { 
        return { 
            imgName: pinJson.imgName != undefined ? pinJson.imgName : null,
            title: pinJson.title != undefined ? pinJson.title : null,
            description: pinJson.description != undefined ? pinJson.description : null,
            instruction: pinJson.instruction != undefined ? pinJson.instruction : null,
            ingredients: pinJson.ingredients != undefined ? pinJson.ingredients : null,
            likes: pinJson.likes != undefined ? pinJson.likes : null,
        }
    },
    pinToJson(pinModel) { 
        return  Object.fromEntries(pinModel._properties)
    }


    
}
