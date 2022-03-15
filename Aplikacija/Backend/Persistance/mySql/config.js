const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('foodpin_notifications','root','root', { 
    dialect: 'mysql',
    host: 'localhost',
    logging: false
})

sequelize.authenticate()
    .then( () => console.log("Successfully connected to mySql server."))
    .catch( (error) => console.log("Failed to connect to mySql server.",error));

module.exports = sequelize