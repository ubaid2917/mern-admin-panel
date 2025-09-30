'use strict';
const BaseModel = require('./baseModel');
const { DataTypes } = require("sequelize");

class Doctor extends BaseModel {
  static initModel(sequelize) {
    return super.initBase(
      sequelize,
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        phone: {
          type: DataTypes.STRING,
        },
        qualification: {
          type: DataTypes.STRING,
        },
        dob: {
          type: DataTypes.STRING,
        },
        gender: {
          type: DataTypes.ENUM("male", "female"),
        },
        appointmentCharges: {
          type: DataTypes.INTEGER,
        },
      },
      {
        modelName: 'Doctor',
        tableName: 'doctors',
        freezeTableName: true,
         paranoid: true, 
      }
    );
  }

  static associate(models) {
    // define association here
  }
}

module.exports = Doctor;
