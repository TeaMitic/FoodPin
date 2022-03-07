const  neo4j  = require('../neo4j-config');


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