const dtoHelper = require('../../../Helper/dtoHelper')
const neo4j = require("../config")

const upload = async (imgInfo, connectorInfo) => { 
    //connectorInfo => userID/pinID, node type is User/Pin, relationship name is HAS_PHOTO (not in arguments)
    try {
        let uuid = new Object()
        if (connectorInfo.userID != undefined) { 
            uuid.key = 'userID'
            uuid.value = connectorInfo.userID
        } 
        else { 
            uuid.key = 'pinID'
            uuid.value = connectorInfo.pinID 
        }

        //image creting 
        let img = dtoHelper.imgToModel(imgInfo)
        let imgDB = await neo4j.model('Image').create(img)
        if (!imgDB) { 
            return null
        }
        img = dtoHelper.imgToJson(imgDB)
        //relationship creating 
        
        let result = await neo4j.writeCypher(`
            MATCH (i:Image {imgID: '${img.imgID}'}),
                  (n: ${connectorInfo.type} {${uuid.key}: '${uuid.value}'})
            CREATE (i)<-[r:HAS_PHOTO]-(n)
            RETURN r
        `)
        if (result.records.length === 0) { 
            // await imgDB.delete() //rollback
            return null
        }
        return img
    } catch (error) {
        throw error   
    }
}

const deleteRef = async (imgInfo) => { 

}

module.exports = { 
    upload,
}