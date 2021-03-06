const  neo4j  = require('../config');



neo4j.model('Pin', {
    pinID: { 
        type: 'uuid',
        primary: true,
        required: true,
        unique: true
    },
    creatorID: { 
        type: 'string',
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
        type: 'int',
        default: 0
    }
    
});