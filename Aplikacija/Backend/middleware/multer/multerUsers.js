const multer = require('multer'); 
const path = require('path')
//config for user profile photos 

const fileStorageEngine = multer.diskStorage({
    destination: (req,file,cb) => { 
        cb(null,'./images/profiles')
    },
    filename: (req,file,cb) => { 
        try { 
            
            let ext = file.originalname.split('.')
            ext = ext[ext.length - 1]
            let filename = req.params.username + '.' + ext
            file.basename = req.params.username
            file.ext = ext
            cb(null,filename) //no duplicates in file system
        }
        catch(error) { 
            console.log(error)
        }
    }
})
const upload = multer({
    storage: fileStorageEngine,
    fileFilter: function(req,file,cb) { 
        let ext = path.extname(file.originalname)
        if (ext !== '.jpg') { return cb(new Error("Only '.jpg' files are allowed."))}
        cb(null,true)
    },
    limits: { 
        fileSize: 1024 * 1024 * 3 // 3MB max size 
    }

})

module.exports = upload 