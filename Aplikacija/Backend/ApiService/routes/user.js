const express = require("express");
const router = express.Router()
const auth = require('../../middleware/authentication')
const  user = require('../controllers/userController')

router.post('/',user.createUser)
router.post('/login',user.login)
router.get('/get/:id',auth,user.getById)
module.exports = router;