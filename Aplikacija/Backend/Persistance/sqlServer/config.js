const {Sequelize} = require('sequelize')
const sequelize = new Sequelize('FoodPin-Notification', 'didi', '0211', {
    host: 'localhost',
    dialect: 'mssql' ,
  });

 
sequelize.authenticate().then(() => { 
    console.log("Connected to SQL Server database.");
}).catch(err => { 
    console.log("Unable to connect to SQL Server database.")
})

module.exports = sequelize;