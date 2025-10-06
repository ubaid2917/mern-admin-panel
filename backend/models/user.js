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
    // relationships here
  }
}

module.exports = User;
