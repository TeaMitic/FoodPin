const validation = require('../../Helper/validation')
const dtoHelper = require("../../Helper/dtoHelper")
const resHelper = require('../../Helper/responseHelper')
const boardDataProvider = require('../../Persistance/neo4j/DataProvider/boardDataProvider')
const userDataProvider = require('../../Persistance/neo4j/DataProvider/userDataProvider')
const fs = require('fs')
const path = require('path')

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

const getByName = async (boardInfo) => { 
    try {
        //objects validation 
        let validateString = validation.forBoardGet(boardInfo)
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
        let board = await boardDataProvider.getBoardByName(boardName,userID)
        if (!board) {    
            return dtoHelper.createResObject(
                resHelper.NoBoardError(boardName),
                false
            )
        } 
        return dtoHelper.createResObject(board,true)
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
        let board = await boardDataProvider.getBoardByID(boardID)
        if (!board) { 
            return dtoHelper.createResObject(
                resHelper.NoBoardError(boardID),
                false
            )
        }

        let result = await boardDataProvider.updateBoard(boardID,boardInfo) 
        if (result) { 
            return dtoHelper.createResObject({},true)
            
        }
        throw new Error(`Couldn't update board with id:'${boardID}'.`)
    } catch (error) {
        throw error
    }
}


const deleteBoard = async (boardID) => { 
    try {
        //objects validation 
        let validateString = validation.forString(boardID,"boarID")
        if (validateString != 'ok') { 
            return dtoHelper.createResObject(
                resHelper.ValidationError(validateString),
                false
            )
        }  
       
        let board = await boardDataProvider.getBoardByID(boardID)
        if (!board) {
            if (board.name === 'All pins') { 
                return dtoHelper.createResObject("Board 'All pins' cannot be deleted.",false)
            }
            return dtoHelper.createResObject(
                resHelper.NoBoardError(boardName),
                false
            )
        } 
        //deletion
        return await boardDataProvider.deleteBoard(boardID)
    } catch (error) {
        throw error
    }
}

const getBoardsForUserWithImages = async(userID) => { 
    try {
        //user validation
        let user = await userDataProvider.getUserById(userID)
        if (!user) { 
            return dtoHelper.createResObject(
                resHelper.NoUserError(userID),
                false
            )
        }
        let boards = await boardDataProvider.getBoardsForUser(userID)
        boards.forEach(board => { 
            board = attachPinImagesForBoard(board)
        })
        return dtoHelper.createResObject(boards,true)
    } catch (error) {
        throw error
    }
}

const getBoardsForUserNoImages = async(userID) => { 
    try {
        //user validation
        let user = await userDataProvider.getUserById(userID)
        if (!user) { 
            return dtoHelper.createResObject(
                resHelper.NoUserError(userID),
                false
            )
        }
        let boards = await boardDataProvider.getBoardsForUserNoImages(userID)
        return dtoHelper.createResObject(boards,true)
    } catch (error) {
        throw error
    }
}

//#region helper functions 
const attachPinImagesForBoard = (board) => { 
    try {
        let filePath,image
        let pinsIDs = [...board.pins]
        delete board.pins
        board.pins = []
        pinsIDs.forEach(pinID => {
            filePath = path.join(__dirname,'..','..','images','pins',pinID + '.jpg')
            if (fs.existsSync(filePath)) { 
                image= fs.readFileSync(filePath)
                board.pins.push({
                    pinID: pinID,
                    image: image
                })
            } 
        });
        return board
       
    } catch (error) {
        throw error 
    }
   
}
//#endregion
module.exports = { 
    createBoard,
    updateBoard,
    deleteBoard,
    getBoardsForUserWithImages,
    getBoardsForUserNoImages,
    getByName
}