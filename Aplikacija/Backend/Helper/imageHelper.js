const imageDataProvider = require('../Persistance/neo4j/DataProvider/imageDataProvider')
const dtoHelper = require('./dtoHelper')
const resHelper = require('./responseHelper')
const fs = require('fs')
const path = require('path')

const addImage = async (imgFile,connectorInfo) => { 
    //crates neo4j iamge node and connect with its owner
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
const attachImage = (pin) => {
    //loads image from FS and attach it to pin object 
    try {
        let filePath,image
        if (pin.hasImage != undefined  && pin.hasImage) {
            //setting flags to false
            pin.image = null
            pin.hasImage = false
            filePath = path.join(__dirname,'..','images','pins',pin.pinID + '.jpg')
            if (fs.existsSync(filePath)) {
                image= fs.readFileSync(filePath)
                //setting flags to true
                pin.image = image
                pin.hasImage = true
            }
            // console.log(pin)
            return pin
        }
    } catch (error) {
        throw error
    }
}

const copyImage = async(imgFilePath, pinCopyID) => {
    try {
        let copyFilePath = path.join(__dirname,'..','images','pins',pinCopyID + '.jpg')
        fs.copyFile(imgFilePath, copyFilePath, (err) => {
            if (err) {
                console.log("Error Found:", err);
            }
            else {
                console.log("Image copied");              
            }
        });  
        let connectorInfo = {
            pinID: pinCopyID,
            type: 'Pin'
        }
        //! found bug 
        /*posto addImage prihvata fajl objekat 
          taj fajl ima atribute basename i ext a ne imgName i imgExt
          lose prepisivanje */
        let imgObj = { 
            basename: pinCopyID,
            ext: 'jpg',
            filename: pinCopyID + '.jpg',
            type: 'Pin'
        }
        let result = await addImage(imgObj, connectorInfo)
        console.log(result.success);
        return  result.success

    } catch (error) {
        throw error
    }
}


module.exports = { 
    addImage,
    attachImage,
    copyImage
}