const dtoHelper = require("../../Helper/dtoHelper")
const neo4j = require("../neo4j-config")

const createBoard = async (boardInfo) => { 
    try {
        // boardInfo = { 
        //     userID: string,
        //     boardName: string,
        //     public: bool
        // }
        let board = dtoHelper.boardToModel(boardInfo)
        //existing board constraint 
        let result = await neo4j.writeCypher(`
            MATCH (u:User {userID: '${boardInfo.userID}'}), (b:Board {name: '${board.name}'})
            RETURN b
        `)
        if (result.records.length != 0) { 
            return dtoHelper.createResObject({
                name: "Client error",
                text: `Board with name '${board.name}' already exists.`
            },false)
        }
        let boardDB = await neo4j.model('Board').create(board)
        board = dtoHelper.boardToJson(boardDB)
        result = await neo4j.writeCypher(`
            MATCH (u:User {userID: '${boardInfo.userID}'}), (b:Board {boardID: '${board.boardID}'})
            CREATE (u) -[:HAS_BOARD]->(b)
        `)
        return dtoHelper.createResObject({},true)
    } catch (error) {
        throw error 
    }
}

const updateBoard = async (boardInfo, boardID) => { 
    try {
        let board = dtoHelper.boardToModel(boardInfo)
        let userID = boardInfo.userID
        let userDB = await neo4j.model('User').find(userID)
        if (!userDB) {
            return dtoHelper.createResObject({
                name: "Client error",
                text: `User with id: '${userID}' doesn't exist in database.`
            },false)
        }
        let boardDB = await neo4j.model('Board').find(boardID)
        if (!boardDB) {
            return dtoHelper.createResObject({
                name: "Client error",
                text: `Board with id: '${boardID}' doesn't exist in database.`
            },false)
        }
        await boardDB.update({
            public: board.public,
            name: board.name
        })
        return dtoHelper.createResObject({},true)
    } catch (error) {
        throw error
    }
}

module.exports = { 
    createBoard,
    updateBoard
}