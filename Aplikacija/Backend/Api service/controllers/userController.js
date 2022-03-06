
const  neo4j  = require('../../config/neo4j_config');
const user = require('../../Persistance/models/userModel');

const createUser = (req,res) => { 
    let body = req.body
    neo4j.model("User").create({
        name: body.name,  
        surname: body.surname,
        username: body.username,
        password: body.password,
        email: body.email,
        about: body.about,
        website: body.website
    }).then(user => {
        user = Object.fromEntries(user._properties)
       res.send(user).status(200);

    }).catch(err => { 
        res.send(err).status(400);
        console.log(err);
    });
        
}

module.exports = createUser;