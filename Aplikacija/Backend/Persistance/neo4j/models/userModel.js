const  neo4j  = require('../config');


neo4j.model('User', {
    userID: { 
        primary: true,
        required: true,
        unique: true,
        type: 'uuid'
    },
    name: {
        type: 'string',
        required: true
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
        type: 'string',
        required: true

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
    },
    imgName: { 
        type: "string",
        default: "defaultImgName",
        required: true
    },

});