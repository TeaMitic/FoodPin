const  neo4j  = require('../neo4j-config');



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
    imgName: { 
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
        type: 'int',
        default: 0
    }
    
});