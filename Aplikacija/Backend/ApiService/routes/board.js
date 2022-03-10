const express = require('express');
const router = express.Router();
const auth = require('../../middleware/authentication')
const board = require('../controllers/boardController');

router.post('/',auth,board.create);
router.put('/update/:id',auth,board.update)
module.exports = router;