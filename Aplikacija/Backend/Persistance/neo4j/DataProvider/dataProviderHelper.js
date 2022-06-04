const neo4j = require('../config')

const hasImage = async (imgName) => { 
    try {
        let image = await neo4j.model('Image').first('imgName', imgName)
        return image != null //true if image exists 
        
    } catch (error) {
        throw error
    }
}

module.exports = { 
    hasImage
}