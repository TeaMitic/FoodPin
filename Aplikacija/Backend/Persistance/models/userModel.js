const  neo4j  = require('../../config/neo4j_config');


neo4j.model('User', {
    userID: { 
        primary: true,
        required: true,
        unique: true,
        type: 'uuid'
    },
    name: {
        type: 'string',
    },
    surname: {
        type: 'string',
    },
    username: {        
        type: 'string',
        required: true, // Creates an Exists Constraint in Enterprise mode
        unique: true,
    },
    password: {
        type: 'string'
    },
    email: { 
        type: 'string',
        // unique: true
    },
    about: { 
        type: 'string'
    },
    website: { 
        type: 'string'
    }

});