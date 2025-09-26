"use strict";
const { DataTypes } = require("sequelize");
const BaseModel = require("./baseModel");

class Appointment extends BaseModel {
  static initModel(sequelize) {
    return super.initBase(
      sequelize,
      {
        name: DataTypes.STRING,
        fatherName: DataTypes.STRING,
        phone: DataTypes.STRING,
        gender: DataTypes.ENUM("male", "female"),
        dob: DataTypes.DATE,
        bloodGroup: DataTypes.ENUM(
          "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"
        ),
        martialStatus: DataTypes.ENUM("married", "single"),
        pic: DataTypes.STRING,
        address: DataTypes.STRING, 
        isDead: {
          type:  DataTypes.BOOLEAN,
          defaultValue: false
        }
       ,
      },
      {
        modelName: "Appointment", 
        tableName: "appointments",  
      }
    );
  }

  static associate(models) {
     // relationship here 
  }
}

module.exports = Appointment;
