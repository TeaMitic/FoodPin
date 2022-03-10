const  neo4j  = require('../neo4j-config');


neo4j.model('Board', {
    boardID: { 
        primary: true,
        required: true,
        unique: true,
        type: 'uuid'
    },
    name: {
        type: 'string',
        default: "All pins"
        
    },
    public: { 
        type: 'boolean',
        default: false
    }
});