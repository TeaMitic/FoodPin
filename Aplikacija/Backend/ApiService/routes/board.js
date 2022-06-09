const express = require('express');
const router = express.Router();
const auth = require('../../middleware/authentication')
const board = require('../controllers/boardController');

router.get('/for/:userID/withImages',auth,board.getForUserWithImages)
router.get('/for/:userID/noImages',auth,board.getForUserNoImages)
router.post('/',auth,board.create);
router.put('/update/:id',auth,board.update);
router.delete('/delete/',auth,board.deleteBoard);
module.exports = router;