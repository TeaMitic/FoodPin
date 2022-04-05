const express = require('express');
const router = express.Router();
const test = require('../controllers/testController');

router.get('/board/getByName',test.getBoardByName)
router.post('/board/connect',test.connectBoardAndUser)
router.get('/user/get/:id',test.getUserById)
router.post('/message',test.createMessage)
router.post('/follow',test.followUser)
router.get('/getPic',test.getPic)
router.post('/comment',test.commentPin)
router.get('/socket/hello',test.testSockets)
module.exports = router
