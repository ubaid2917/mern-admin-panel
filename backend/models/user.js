"use strict";
const BaseModel = require("./baseModel"); 
const { DataTypes } = require("sequelize");

class User extends BaseModel {
  static initModel(sequelize) {
    return super.initBase(
      sequelize,
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        phone: DataTypes.STRING,
        country: DataTypes.STRING,
        city: DataTypes.STRING,
        zip: DataTypes.STRING,
        password: DataTypes.STRING,
        role: DataTypes.ENUM("user", "admin", "doctor", "patient"),
        created: DataTypes.DATE,
        updated: DataTypes.DATE,
        deleted: DataTypes.DATE,
      },
      {
        modelName: "User",  
        tableName: "user",  
        defaultScope: {
          where: {
            deleted: null,
          },
          
        },
      }
    );
  }

  static associate(models) {
    User.hasMany(models.Chat, { foreignKey: "firstParticipant", as: "chatsAsFirst" });
    User.hasMany(models.Chat, { foreignKey: "secondParticipant", as: "chatsAsSecond" });
   
  }
}

module.exports = User;
