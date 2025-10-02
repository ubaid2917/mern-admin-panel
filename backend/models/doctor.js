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
        dailyPatient: {
          type: DataTypes.INTEGER,
        },
        departmentId: {
          type: DataTypes.UUID,
          allowNull:false,
        },
       
      },
      {
        modelName: 'Doctor',
        tableName: 'doctors',
        freezeTableName: true,
        paranoid: true, 
        defaultScope: {
          where: {
            deleted: null,
          },
        },
      }
    );
  }

  static associate(models) {
    // define association here
    Doctor.belongsTo(models.Department, { foreignKey: 'departmentId' , as: 'department' });
  }
}

module.exports = Doctor;
