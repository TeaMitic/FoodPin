const express = require("express");
const router = express.Router()
const auth = require('../../middleware/authentication')
const  user = require('../controllers/userController')
const multer = require('../../middleware/multer/multerUsers');

let middlewares = [
    auth,
    multer.single('image')
]

router.post('/',user.create)
router.post('/addImage/:username',middlewares,user.addImage)
router.post('/login',user.login)
router.get('/get/:id',auth,user.getById)
router.post('/follow',auth,user.followUser) //auth removed
router.post('/unfollow',auth,user.unfollowUser)
router.put('/update/:id',auth,user.update)
router.post('/sendMsg',auth,user.sendMessage)



module.exports = router;