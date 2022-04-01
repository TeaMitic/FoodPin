const express = require('express');
const router = express.Router();
const auth = require('../../middleware/authentication')
const pin = require('../controllers/pinController');
const multer = require('../../middleware/multer/multerPins')

let middlewares = [
    auth,
    multer.single('image')
]

router.post('/',auth,pin.create);
router.post('/addImage/:id',middlewares,pin.addImage)
router.put('/like/:id',auth,pin.like)
router.put('/update/:id',auth, pin.update)
router.put('/dislike/:id',auth,pin.dislike)
router.delete('/delete/:id',auth,pin.deletePin)
router.post('/save',auth,pin.savePin)
router.get('/get/:id',auth,pin.getByID)
router.post('/comment',auth,pin.commentPin)

module.exports = router;