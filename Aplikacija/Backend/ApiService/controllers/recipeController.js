
// const { model } from '../../config/neo4j-config';
// import recipe from '../../Persistance/neo4j-models/recipeModel';

// const createRecipe = (req,res) => { 
//     model("Recipe").create({
//         picture: req.body.picture,
//         description: req.body.description,
//     }).then(recipe => {
//         recipe.tags = req.body.tags
//         recipe.update({tags: req.body.tags})
//         recipe = console.log(Object.fromEntries(recipe._properties))
        
//        res.send({}).status(200);

//     }).catch(err => { 
//         res.send(err).status(400);
//         console.log(err);
//     });
        
// }

// export default createRecipe;