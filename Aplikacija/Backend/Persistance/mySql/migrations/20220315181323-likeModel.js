'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable("Like",{
      id: { 
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      receiverID: { 
          type: Sequelize.DataTypes.STRING,
          allowNull: false
      },
      senderID: { 
          type: Sequelize.DataTypes.STRING,
          allowNull: false
      },
      pinID: { 
          type: Sequelize.DataTypes.STRING,
          allowNull: false
      },
      readFlag: { 
          type: Sequelize.DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false
      },
      createdAt: { 
          type: Sequelize.DataTypes.DATE,
          allowNull: false,
      } 
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable("Like")
  }
};
