const dtoHelper = require('../../../Helper/dtoHelper')
const neo4j = require("../config")

const createBoard = async (boardInfo) => { 
    try {
        // boardInfo = { 
        //     boardName: string,
        //     public: bool
        // }
        let board = dtoHelper.boardToModel(boardInfo)
        
        let boardDB = await neo4j.model('Board').create(board)
        board = dtoHelper.boardToJson(boardDB)
        
        return board
    } catch (error) {
        throw error 
    }
}

const updateBoard = async (boardID,boardInfo) => { 
    try {
        let result = await neo4j.writeCypher(`
            MATCH (b:Board {boardID: '${boardID}'})
            SET b.public = ${boardInfo.public},
                b.name = '${boardInfo.boardName}'
            return b
        `)
        if (result.records.length == 0) { 
            return null
        }
        return true
        
    } catch (error) {
        throw error
    }
}

const deleteBoard = async (userID,boardName) => { 
    try {
        
        let result = await neo4j.writeCypher(`
            MATCH (b:Board {name: '${boardName}'}) <-[:HAS_BOARD]- (u:User {userID: '${userID}'}) 
            DETACH DELETE b
        `)
        return dtoHelper.createResObject({},true)
    } catch (error) {
        throw error
    }
}

const getBoardByName = async (name,userID) => { 
    try {
        let result = await neo4j.readCypher(`
            MATCH (b:Board {name: '${name}'}) <-[:HAS_BOARD]- (u:User {userID: '${userID}'}) 
            RETURN  b
        `)

        if (result.records.length == 0) { 
            return null
        }

        let board = dtoHelper.fromCypher(result)
        
        return board
    } catch (error) {
        throw  error      
    }
}

const getBoardByID = async (boardID) => { 
    try {
        let boardDB = await neo4j.model('Board').find(boardID)
        if (!boardDB) { 
            return null
        }
        let board = dtoHelper.boardToJson(boardDB)
        return board
    } catch (error) {
        throw  error      
    }
}
const connectWithUser = async (boardID,userID) => { 
    try {
        let result = await neo4j.writeCypher(`
            MATCH (u:User {userID: '${userID}'}), (b:Board {boardID: '${boardID}'})
            CREATE (u) -[r:HAS_BOARD]->(b) RETURN r
        `)
        if (result.records.length == 0) { 
            return null
        }
        let connection = dtoHelper.fromCypher(result)
        return connection
        
    } catch (error) {
        throw error

    }
}

const getBoardsForUser = async (userID) => { 
    try {
        //getting boards with first few pins  
        let result = await neo4j.readCypher(`
            MATCH (b:Board) <-[:HAS_BOARD]- (u:User {userID: '${userID}'}) 
            RETURN  b ORDER BY b.name
        `)
        //user always has 'All pins' board
        if (result.records.length == 0) { 
            return null
        }
        let boards = dtoHelper.fromCypher(result)
        for await (let b of boards) { 
            result = await neo4j.readCypher(`
            MATCH (b:Board {boardID: "${b.boardID}"}) <-[:BELONGS]- (p:Pin)
            RETURN p limit 3`)
            
            let pins = dtoHelper.fromCypher(result)
            let pinsIDs = []
            //only ID is neccessary for reading images from fs
            pins.forEach(pin => { 
                pinsIDs.push(pin.pinID)
            })
            b.pins = [...pinsIDs]
        }
        return boards
    } catch (error) {
        throw error
    }
}

module.exports = { 
    createBoard,
    updateBoard,
    deleteBoard,
    getBoardByName,
    connectWithUser,
    getBoardByID,
    getBoardsForUser
}