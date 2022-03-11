const dtoHelper = require('../../Helper/dtoHelper')
const neo4j = require('../neo4j-config')
const arrayHelper = require('../../Helper/arrayHelper')

const createPin = async (pinInfo) => { 
    try {
        // pinInfo = { 
        //     userID: id
        //     boardName: name,
        //     pin: { 
        //         pinInfo
        //     },
        //     tags: [tag,tag]
        // }

        let userID = pinInfo.userID
        let pin = dtoHelper.pinToModel(pinInfo.pin)
        let boardName = pinInfo.boardName
        
        
        //create pin - first 
        let pinDB = await neo4j.model('Pin').create(pin)
        pin = dtoHelper.pinToJson(pinDB)
        
        //create relationship with tags - second 
        let tags = arrayHelper.unwind(pinInfo.tags)
        let result = await neo4j.writeCypher(`
                MATCH (p:Pin {pinID: '${pin.pinID}'})
                WITH [${tags}] as tags,p
                FOREACH (tag IN tags | 
                    MERGE  (t:Tag {name: tag})
                    CREATE (t) <-[:HAS]-(p))
        `)


        // validation wheter wanted board exist in db can be avoided because we will show only existing boards

        //create relationship with chosen board  - third
        let boards = new Set()
        boards.add('All pins')
        boards.add(boardName)
        boards = arrayHelper.unwindSet(boards)
        result = await neo4j.writeCypher(`
                MATCH (b:Board) <-[:HAS_BOARD]- (u:User {userID: '${userID}'}),
                (p:Pin {pinID: '${pin.pinID}'})
                WHERE b.name in [${boards}]
                WITH  b, p
                CREATE (p)-[:BELONGS]->(b)
        `)
        return dtoHelper.createResObject({},true)
    } catch (error) {
        throw error
    }
}


const likePin = async (pinID) => { 
    try {
        let pinDB = await neo4j.model('Pin').find(pinID)
        if (!pinDB) { 
            return dtoHelper.createResObject({
                name: "Client error",
                text: `Pin with id: '${pinID}' doesn't exist in database.`
            },false)
        }
        let pin = dtoHelper.pinToJson(pinDB) 
        await pinDB.update({
            likes:  +pin.likes + 1
        })
        return dtoHelper.createResObject({},true)
    } catch (error) {
        throw error
    }
}
const updatePin= async(pinID, pin)=>{
    try {
        let pinDB = await neo4j.model('Pin').find(pinID)
        if (!pinDB) { 
            return dtoHelper.createResObject({
                name: "Client error",
                text: `Pin with id: '${pinID}' doesn't exist in database.`
            },false)
        }
        await pinDB.update({
            imgName: pin.imgName,
            title: pin.title,
            description: pin.description,
            instruction: pin.instruction,
            ingredients: pin.ingredients
        })
        return dtoHelper.createResObject({},true)
        
    } catch (error) {
        throw error
    }
}
const dislikePin = async(pinID)=>{
    try {
        let pinDB = await neo4j.model('Pin').find(pinID)
        if (!pinDB) { 
            return dtoHelper.createResObject({
                name: "Client error",
                text: `Pin with id: '${pinID}' doesn't exist in database.`
            },false)
        }
        let pin = dtoHelper.pinToJson(pinDB) 
        await pinDB.update({
            likes:  +pin.likes - 1
        })
        return dtoHelper.createResObject({},true)
        
    } catch (error) {
        throw error
    }
}

module.exports = { 
    createPin,
    likePin,
    dislikePin,
    updatePin
}