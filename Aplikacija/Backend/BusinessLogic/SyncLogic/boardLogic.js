const validation = require('../../Helper/validation')
const dtoHelper = require("../../Helper/dtoHelper")
const resHelper = require('../../Helper/responseHelper')
const boardDataProvider = require('../../Persistance/neo4j/DataProvider/boardDataProvider')
const userDataProvider = require('../../Persistance/neo4j/DataProvider/userDataProvider')

const createBoard = async (boardInfo) => { 
    try {
        //object validation
        let validateString = validation.forBoard(boardInfo)
        if (validateString != 'ok') { 
            return dtoHelper.createResObject(
                resHelper.ValidationError(validateString),
                false
            )
        }  
        //existing board validation 
        let board = await boardDataProvider.getBoardByName(boardInfo.boardName,boardInfo.userID)
        if (board) { 
            return dtoHelper.createResObject(
                resHelper.ExistingBoardError(boardInfo.boardName),
                false
            )
        }
        //user validation 
        let user = await userDataProvider.getUserById(boardInfo.userID)
        if (!user) { 
            return dtoHelper.createResObject(
                resHelper.NoUserError(boardInfo.userID),
                false
            )
        }
        //connecting board with user
        board = await boardDataProvider.createBoard(boardInfo)
        let result = await boardDataProvider.connectWithUser(board.boardID, user.userID)
        if (result) { 
            return dtoHelper.createResObject({},true)
        } 
        else { 
            throw new Error(`Couldn't create relationship between board: '${boardInfo.boardName}' and user id: '${user.userID}'.`)
        }

    } catch (error) {
        throw error
    }
}

const updateBoard = async (boardInfo,boardID) => { 
    try {
        //body validation 
        let validateString = validation.forBoardUpdate(boardInfo,boardID)
        if (validateString != 'ok') { 
            return dtoHelper.createResObject(
                resHelper.ValidationError(validateString),
                false
            )
        }
        let userID = boardInfo.userID
        let boardName = boardInfo.boardName
        //user validation  
        let user = await userDataProvider.getUserById(userID)
        if (!user) { 
            return dtoHelper.createResObject(
                resHelper.NoUserError(userID),
                false
            )
        }
        //board validation 
        let board = await boardDataProvider.getBoardByName(boardName,userID)
        if (board) { 
            return dtoHelper.createResObject(
                resHelper.ExistingBoardError(userID,boardName),
                false
            )
        }

        let result = await boardDataProvider.updateBoard(boardID,boardInfo) 
        if (result) { 
            dtoHelper.createResObject({},true)
        }
        throw new Error(`Couldn't update board with id:'${boardID}'.`)
    } catch (error) {
        throw error
    }
}


const deleteBoard = async (boardInfo) => { 
    try {
        //objects validation 
        let validateString = validation.forBoardDelete(boardInfo)
        if (validateString != 'ok') { 
            return dtoHelper.createResObject(
                resHelper.ValidationError(validateString),
                false
            )
        }  
        let boardName = boardInfo.boardName
        let userID  = boardInfo.userID
        //user validation
        let user = await userDataProvider.getUserById(userID)
        if (!user) { 
            return dtoHelper.createResObject(
                resHelper.NoUserError(userID),
                false
            )
        }
        //board validation
        if (boardName == 'All pins') { 
            return dtoHelper.createResObject(
                resHelper.AllPinsBoardError(userID,boardName),
                false
            )
        }
        let board = await boardDataProvider.getBoardByName(boardName,userID)
        if (!board) {    
            return dtoHelper.createResObject(
                resHelper.NoBoardError(userID,boardName),
                false
            )
        } 
        //deletion
        return await boardDataProvider.deleteBoard(userID,boardName)
    } catch (error) {
        throw error
    }
}
module.exports = { 
    createBoard,
    updateBoard,
    deleteBoard
}