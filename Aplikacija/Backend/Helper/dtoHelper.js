const toJSON = (obj) => { 
    //converts from neode model to json
    return Object.fromEntries(obj._properties)
}

module.exports = {
    userToJson(userModel) {
        return this.toJSON(userModel)
    },
    shortUserToJson(userJson) { 
        return { 
            username: userJson.username,
            userID: userJson.userID
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
            imgName: userJson.imgName != undefined ? userJson.imgName : "defaultImgName"
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
            creatorID: pinJson.creatorID != undefined ? pinJson.creatorID : null,
            imgName: pinJson.imgName != undefined ? pinJson.imgName : null,
            title: pinJson.title != undefined ? pinJson.title : null,
            description: pinJson.description != undefined ? pinJson.description : null,
            instruction: pinJson.instruction != undefined ? pinJson.instruction : null,
            ingredients: pinJson.ingredients != undefined ? pinJson.ingredients : null,
            likes: pinJson.likes.low != undefined ? pinJson.likes.low : 0,
        }
    },
    pinToJson(pinModel) { 
        return  this.toJSON(pinModel)
    },
    boardToModel(boardJson) { 
        return { 
            name: boardJson.boardName != undefined ? boardJson.boardName : null,
            public: boardJson.public != undefined ? boardJson.public : null,
        }
    },
    boardToJson(boardModel) { 
        return  this.toJSON(boardModel)
    },
    fromCypher(cypherResult) { 
        /**
         * ako u cypher query ima return N onda su svi elementi tipa N
         * ako je return P Q onda su elementi u nizu PQ PQ PQ PQ  
         */
        let arr = []
        cypherResult.records.forEach(element => {
            element._fields.forEach(el => { 
                arr.push(el.properties)
            })
        });
        return arr
    },
    imgToModel(imgJson) { 
        return { 
            imgName: imgJson.imgName != undefined ? imgJson.imgName : null,
            imgExt: imgJson.imgExt != undefined ? imgJson.imgExt : null,
            type: imgJson.type != undefined ? imgJson.type : null
        }
    },
    imgToJson(imgModel) { 
        return  this.toJSON(imgModel)
    }


    
}
