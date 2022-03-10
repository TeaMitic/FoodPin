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

module.exports = { 
    createBoard
}