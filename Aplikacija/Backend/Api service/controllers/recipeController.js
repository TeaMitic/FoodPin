
const  neo4j  = require('../../Persistance/config/neo4j_config');
const recipe = require('../../Persistance/models/recipeModel');

const createRecipe = (req,res) => { 
    neo4j.model("Recipe").create({
        picture: req.body.picture,
        description: req.body.description,
    }).then(recipe => {
        recipe.tags = req.body.tags
        recipe.update({tags: req.body.tags})
        recipe = console.log(Object.fromEntries(recipe._properties))
        
       res.send({}).status(200);

    }).catch(err => { 
        res.send(err).status(400);
        console.log(err);
    });
        
}

module.exports = createRecipe;