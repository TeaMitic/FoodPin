const dtoHelper = require('../../../Helper/dtoHelper')
const neo4j = require('../config')
const arrayHelper = require('../../../Helper/arrayHelper')
const { randomUUID } = require('crypto');
const dataProviderHelper = require('./dataProviderHelper')

const createPin = async (pinInfo) => { 
    try {
        let pin = dtoHelper.pinToModel(pinInfo)

        delete pin.pinID
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
        let boards2 = new Set()
        boards.forEach(element => { 
            boards2.add({name: element})
        }) 
        boards2 = arrayHelper.unwindSet(boards2)
        let result = await neo4j.writeCypher(`
                MATCH (b:Board) <-[:HAS_BOARD]- (u:User {userID: '${userID}'}),
                (p:Pin {pinID: '${pinID}'})
                WHERE b.name in [${boards2}]
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
    
    tags = arrayHelper.unwind(tags)
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
    return connection
}

const deletePin = async (pinID) => { 
    try {
        let result = await neo4j.writeCypher(`
            MATCH (p:Pin {pinID: '${pinID}'}) -[r:HAS]->(t:Tag)
            DETACH DELETE  p
            WITH t
            WHERE NOT  (t)--()
            DELETE t
        `)
        return true
    } catch (error) {
        throw error
    }
}

const getForBoard = async (boardID) => { 
    try {
        let result = await neo4j.readCypher(`
        MATCH (p:Pin)-[:BELONGS]->(b:Board {boardID: '${boardID}'})
        RETURN p`)
        if (result.records.length === 0) { 
            return []
        }
        let pins = dtoHelper.fromCypher(result) 
        return pins
    } catch (error) {
        throw error
    }
}

const likePin = async (pinID) => { 
    try {
        let result = await neo4j.writeCypher(`
            MATCH (p:Pin {pinID: '${pinID}'}) SET p.likes = p.likes+1
        `)
        // let pinDB = await neo4j.model('Pin').find(pinID)
        // if (!pinDB) { 
        //     return dtoHelper.createResObject({
        //         name: "Client error",
        //         text: `Pin with id: '${pinID}' doesn't exist in database.`
        //     },false)
        // }
        // let pin = dtoHelper.pinToJson(pinDB) 
        // await pinDB.update({
        //     likes:  +pin.likes + 1
        // })
        return dtoHelper.createResObject({},true)
    } catch (error) {
        throw error
    }
}
const updatePin= async(pin,pinID)=>{
    try {
        //dto helper 
        let pinDB = await neo4j.model('Pin').find(pinID)
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
        // let pinDB = await neo4j.model('Pin').find(pinID)
        // if (!pinDB) { 
        //     return dtoHelper.createResObject({
        //         name: "Client error",
        //         text: `Pin with id: '${pinID}' doesn't exist in database.`
        //     },false)
        // }
        // let pin = dtoHelper.pinToJson(pinDB) 
        // await pinDB.update({
        //     likes:  +pin.likes - 1
        // })
        let result = await neo4j.writeCypher(`
            MATCH (p:Pin {pinID: '${pinID}'}) SET p.likes = p.likes-1
        `)
        return dtoHelper.createResObject({},true)
        
    } catch (error) {
        throw error
    }
}

const getPinById = async (pinID) => { 
    try {
        let pinDB = await neo4j.model('Pin').find(pinID)
        //let pinDB= await neo4j.readCypher(`MATCH (p:PIN {pinID: '${pinID}'}) return p`)
        if (pinDB) { 
            let pinJson = dtoHelper.pinToJson(pinDB) 
            let pin = dtoHelper.pinToModel(pinJson)
            pin.hasImage = await dataProviderHelper.hasImage(pinID) //!not needed 
            return pin
        }
        return null
    } catch (error) {
        throw error
    }
}


const getPinWithTags = async (pinID) =>  { 
    let pin = await getPinById(pinID)
    if (!pin) { 
        return null
    }
    let result = await neo4j.readCypher(`
        MATCH (p:Pin {pinID: '${pinID}'}) -[:HAS]-> (t:Tag) 
        RETURN t
    `)
    if (result.records.length === 0) { 
        return null
    }
    tags = dtoHelper.fromCypher(result)
    pin.tags = tags
    return pin
}

const commentPin = async (commentInfo) => { 
    try {
        let senderID = commentInfo.senderID
        let pinId = commentInfo.pinID
        let createdAt = commentInfo.createdAt
        let text = commentInfo.text

        let result = await neo4j.writeCypher(`
            MATCH (u:User {userID: '${senderID}'}),
                  (p:Pin {pinID: '${pinId}'})-[:BELONGS]->(b:Board)<-[:HAS_BOARD]-(q:User)
            WITH DISTINCT p,u,q
            CREATE (u)-[r:COMMENT {
                createdAt: '${createdAt}',
                text: '${text}',
                uuid: '${randomUUID()}' 
            }]->(p)
            RETURN q
        `)
        if (result.records.length === 0) { 
            return null
        }
        return dtoHelper.fromCypher(result) //vracam receiver-a da ga prosledim u async logiku 
    } catch (error) {
        throw error
    }
}

const getPins = async(skip)=>{
    try {
        let result = await neo4j.readCypher(
            `MATCH (p:Pin) RETURN p 
            ORDER BY p.title 
            SKIP ${skip}
            LIMIT 12
            `
        )
        if (result == null) { 
            return null
        }
        let results=dtoHelper.fromCypher(result)
        
        
        return results
        
    } catch (error) {
        throw error
    }
}
module.exports = { 
    createPin,
    likePin,
    connectWithTags,
    deletePin,
    connectWithBoards,
    dislikePin,
    updatePin,
    getPinById,
    getPinWithTags,
    commentPin,
    getPins,
    getForBoard
}