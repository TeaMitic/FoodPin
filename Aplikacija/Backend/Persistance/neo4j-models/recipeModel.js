const  neo4j  = require('../../config/neo4j-config');


neo4j.model('Recipe', {
    recipeID: { 
        type: 'uuid',
        primary: true,
        required: true,
        unique: true
    },
    pictureName: { 
        type: "string",
        required: true
    },
    title: {  
        type: 'string',
        required: true
    },
    description: { 
        type: 'string'
    },
    instruction: { 
        type: "string",
    },
    ingredients: { 
        type: 'string'
    },
    likes: { 
        type: 'number',
        default: 0
    }
    
});