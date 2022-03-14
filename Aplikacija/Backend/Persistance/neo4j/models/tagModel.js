const  neo4j  = require('../config');


neo4j.model('Tag', {
    tagID: { 
        primary: true,
        required: true,
        unique: true,
        type: 'uuid'
    },
    name: {
        type: 'string',
        required: true,
        unique: true
    }
});