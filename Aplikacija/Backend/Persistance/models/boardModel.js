const  neo4j  = require('../config/neo4j_config');


neo4j.model('Board', {
    boardID: { 
        primary: true,
        required: true,
        unique: true,
        type: 'uuid'
    },
    name: {
        type: 'string',
        default: "Unnamed board"
    }
});