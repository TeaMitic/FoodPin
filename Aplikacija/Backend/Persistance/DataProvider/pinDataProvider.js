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
        //extracting and preparing data 
        let userID = pinInfo.userID
        let pin = dtoHelper.pinToModel(pinInfo.pin)
        let boardName = pinInfo.boardName
        let tags = arrayHelper.unwind(pinInfo.tags)


        //create pin - first 
        let pinDB = await neo4j.model('Pin').create(pin)
        pin = dtoHelper.pinToJson(pinDB)

        //create relationship with tags - second 
        let result = await neo4j.writeCypher(`
                MATCH (p:Pin {pinID: '${pin.pinID}'})
                WITH [${tags}] as tags,p
                FOREACH (tag IN tags | MERGE (t:Tag {name: tag}) <-[:HAS]-(p))
        `)

        //create relationship with chosen board  - third
        result = await neo4j.writeCypher(`
                MATCH (b:Board {name: '${boardName}'}) <-[:HAS_BOARD]- (u:User {userID: '${userID}'}),
                      (p:Pin {pinID: '${pin.pinID}'})
                CREATE (p)-[:BELONGS]->(b)
        `)
        return dtoHelper.createResObject({},true)
    } catch (error) {
        throw error
    }
}

module.exports = { 
    createPin
}