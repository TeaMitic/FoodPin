const  neo4j  = require('../config/neo4j_config');


neo4j.model('Recipe', {
    recipeID: { 
        type: 'uuid',
        primary: true,
        required: true,
        unique: true
    },
    picture: { 
        type: "string",
    },
    description: { 
        type: "string",
    },
    // tags : { //da necemo mozda da imamo i ove tagove kao pojedinacne objekte
    //     type: Array
    // }
});