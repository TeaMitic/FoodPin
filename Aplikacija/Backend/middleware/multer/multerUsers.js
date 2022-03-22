const multer = require('multer'); 

//config for user profile photos 

const fileStorageEngine = multer.diskStorage({
    destination: (req,file,cb) => { 
        cb(null,'./images/pins')
    },
    filename: (req,file,cb) => { 
        cb(null,Date.now()+ '--' + file.originalname)
    }
})
const upload = multer({storage: fileStorageEngine})

module.exports = upload 