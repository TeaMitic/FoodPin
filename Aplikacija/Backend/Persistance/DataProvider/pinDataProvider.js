const dtoHelper = require('../../Helper/dtoHelper')
const neo4j = require('../neo4j-config')
const arrayHelper = require('../../Helper/arrayHelper')

const createPin = async (pinInfo) => { 
    try {
        

        let pin = dtoHelper.pinToModel(pinInfo)
        
        
        //create pin - first 
        let pinDB = await neo4j.model('Pin').create(pin)
        if (!pinDB) { 
            return null
        }
        pin = dtoHelper.pinToJson(pinDB)
        return pin
    } catch (error) {
        throw error
    }
}

const connectWithBoards = async (pinID,boards,userID) => { 
    try {
        
        boards = arrayHelper.unwindSet(boards)
        let result = await neo4j.writeCypher(`
                MATCH (b:Board) <-[:HAS_BOARD]- (u:User {userID: '${userID}'}),
                (p:Pin {pinID: '${pinID}'})
                WHERE b.name in [${boards}]
                WITH  b, p
                CREATE (p)-[r:BELONGS]->(b)
                RETURN p,r,b
        `)
        if (result.records.length === 0) { 
            return null
        }
        let connection = dtoHelper.fromCypher(result)
        return connection
    } catch (error) {
        throw error
    }    
    
}

const connectWithTags = async (pinID,tags) => { 
    let tags = arrayHelper.unwind(pinInfo.tags)
    let result = await neo4j.writeCypher(`
            MATCH (p:Pin {pinID: '${pinID}'})
            WITH [${tags}] as tags,p
            FOREACH (tag IN tags | 
                MERGE  (t:Tag {name: tag})
                CREATE (t) <-[:HAS]-(p))
            RETURN p,tags
    `)
    if (result.records.length === 0) { 
        return null
    }
    let connection = dtoHelper.fromCypher(result)
    console.log(connection)
    return connection
}

const deletePin = async (pinID) => { 
    try {
        let result = await neo4j.writeCypher(`
            MATCH (p:Pin {pinID: '${pinID}'})
            DETACH DELETE p
        `)
        return true
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
module.exports = { 
    createPin,
    likePin,
    connectWithTags,
    deletePin,
    connectWithBoards
}