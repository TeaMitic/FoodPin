const  {registerUser} = require('../../BusinessLogic/userLogic');

const  createUser = async (req,res) => { 
    try {
        let result = await registerUser(req.body)
        res.status(200).send(result);

    } catch (error) {
        console.log(error);
        res.status(500).send(error);

    }     
}

module.exports = { 
    createUser
}