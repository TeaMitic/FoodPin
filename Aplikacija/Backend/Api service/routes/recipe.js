const express = require('express');
const router = express.Router();

const createRecipe = require('../controllers/recipeController');

router.post('/',createRecipe);

module.exports = router;