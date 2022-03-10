const validation = require("../Helper/validation")
const dtoHelper = require("../Helper/dtoHelper")
const dataProvider = require('../Persistance/DataProvider/boardDataProvider')
const createBoard = async (boardInfo) => { 
    try {
        let validateString = validation.forBoard(boardInfo)
        if (validateString != 'ok') { 
            return dtoHelper.createResObject({
                name: "Validation failed",
                text: validateString
            },false)
        }  
        return await dataProvider.createBoard(boardInfo)
    } catch (error) {
        throw error
    }
}

module.exports = { 
    createBoard
}