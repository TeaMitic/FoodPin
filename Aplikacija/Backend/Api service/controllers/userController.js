
const  neo4j  = require('../../Persistance/config/neo4j_config');
const user = require('../../Persistance/models/userModel');

const createUser = (req,res) => { 
    neo4j.model("User").create({
        name: req.body.name,  
        surname: req.body.surname,
        username: req.body.username,
        password: req.body.password
    }).then(user => {
        user = Object.fromEntries(user._properties)
       res.send(user).status(200);

    }).catch(err => { 
        res.send(err).status(400);
        console.log(err);
    });
        
}

module.exports = createUser;