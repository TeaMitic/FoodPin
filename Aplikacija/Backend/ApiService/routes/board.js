const express = require('express');
const router = express.Router();
const auth = require('../../middleware/authentication')
const board = require('../controllers/boardController');

router.post('/',auth,board.create);

module.exports = router;