const express = require("express");
const router = express.Router()
const auth = require('../../middleware/authentication')
const  user = require('../controllers/userController')
const multer = require('../../middleware/multer/multerUsers');

let middlewares = [
    auth,
    multer.single('image')
]

router.get('/get/:id',auth,user.getById)
router.get('/getByUsername/:username',auth,user.getByUsername)
router.post('/',user.create)
router.post('/addImage/:username',middlewares,user.addImage)
router.post('/login',user.login)
router.post('/follow',auth,user.followUser) //auth removed
router.post('/unfollow',auth,user.unfollowUser)
router.put('/update/:id',auth,user.update)
router.post('/sendMsg',auth,user.sendMessage)
router.post('/isFollowing',auth,user.isFollowing)
router.delete('/deleteImage/:id',auth,user.deleteImage)
// router.get('/getFollowings/:id',auth,user.getFollowings)



module.exports = router;