const express = require('express');
const router = express.Router();
const auth = require('../../middleware/authentication')
const pin = require('../controllers/pinController');

router.post('/',auth,pin.create);

module.exports = router;