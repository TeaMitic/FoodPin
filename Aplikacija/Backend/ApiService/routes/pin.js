const express = require('express');
const router = express.Router();
const auth = require('../../middleware/authentication')
const pin = require('../controllers/pinController');

router.post('/',auth,pin.create);
router.put('/like/:id',auth,pin.like)
router.put('/update/:id',auth, pin.update)
router.put('/dislike/:id',auth,pin.dislike)

module.exports = router;