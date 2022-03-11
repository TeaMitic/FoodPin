const express = require('express');
const router = express.Router();
const test = require('../controllers/testController')

router.get('/board/getByName',test.getBoardByName)
router.post('/board/connect',test.connectBoardAndUser)
router.get('/user/get/:id',test.getUserById)

module.exports = router