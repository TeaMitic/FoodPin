
const  neo4j  = require('../config/neo4j_config');
const user = require('../models/userModel')

// console.log(neo4j);
const createUser = (req,res) => {    
    neo4j.model("User").create({
        name: 'Adam',  
        surname: 'Sandler',
        username: 'ASandler',
        
    
    }).then(user => {
       res.send(user).status(200)

    }).catch(err => res.send(err).status(400))
}

module.exports = createUser