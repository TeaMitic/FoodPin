const express = require("express");
const router = express.Router()
const auth = require('../../middleware/authentication')
const  user = require('../controllers/userController')

router.post('/',user.create)
router.post('/login',user.login)
router.get('/get/:id',auth,user.getById)
router.post('/follow',auth,user.followUser)
module.exports = router;