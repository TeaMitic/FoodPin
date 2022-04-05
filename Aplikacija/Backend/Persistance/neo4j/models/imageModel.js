const  neo4j  = require('../config');

neo4j.model('Image', {
    imgID: { 
        type: 'uuid',
        primary: true,
        required: true,
        unique: true
    },
    imgName: { //pin id or username
        type: "string",
        default: "defaultImgName",
        required: true
    },
    imgExt: { //jpg for now 
        type: "string",
        default: ".jpg",
        required: true
    },
    filename: { 
        type: 'string',
        required: true,
        unique: true
    },
    type: {  
        type: 'string',
        required: true,
        default: 'Pin'
    },
    
});