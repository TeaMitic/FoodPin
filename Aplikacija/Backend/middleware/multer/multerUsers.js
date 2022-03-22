const multer = require('multer'); 

//config for user profile photos 

const fileStorageEngine = multer.diskStorage({
    destination: (req,file,cb) => { 
        cb(null,'./images/profiles')
    },
    filename: (req,file,cb) => { 
        cb(null,Date.now()+ '--' + req.params.username)
    }
})
const upload = multer({storage: fileStorageEngine})

module.exports = upload 