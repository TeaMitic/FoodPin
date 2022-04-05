const imageDataProvider = require('../Persistance/neo4j/DataProvider/imageDataProvider')
const dtoHelper = require('./dtoHelper')
const resHelper = require('./responseHelper')

const addImage = async (imgFile,connectorInfo) => { 
    let imgObj = { 
        imgName: imgFile.basename,
        imgExt: imgFile.ext,
        filename: imgFile.filename,
        type: connectorInfo.type
    }
    let image = await imageDataProvider.upload(imgObj,connectorInfo)
    if (!image) { 
        return dtoHelper.createResObject(
            resHelper.ImageError(),false
        )
    }
    return dtoHelper.createResObject(image, true)

}

module.exports = { 
    addImage
}