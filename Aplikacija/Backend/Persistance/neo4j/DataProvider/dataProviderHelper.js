const neo4j = require('../config')

const hasImage = async (imgName) => { 
    try {
        //checks img in DB not in FS 
        let image = await neo4j.model('Image').first('imgName', imgName)
        if (image) { 
            return true
            //returns object if image exists else returns false 
        }
        return false 
        
    } catch (error) {
        throw error
    }
}

module.exports = { 
    hasImage
}