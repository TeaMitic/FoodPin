const multer = require('multer'); 

//config for user profile photos 

const fileStorageEngine = multer.diskStorage({
    destination: (req,file,cb) => { 
        cb(null,'./images/profiles')
    },
    filename: (req,file,cb) => { 
        let ext = file.originalname.split('.')
        ext = ext[ext.length - 1]
        cb(null,req.params.username + '.' + ext) //no duplicates in file system
    }
})
const upload = multer({storage: fileStorageEngine})

module.exports = upload 