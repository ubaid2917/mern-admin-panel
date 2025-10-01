'use strict';
const BaseModel = require('./baseModel');
const { DataTypes } = require("sequelize");
class Department extends BaseModel {
  static initModel(sequelize) {
    return super.initBase(
      sequelize,
      {
        name: DataTypes.STRING,
        description: DataTypes.STRING
      },
      {
        modelName: 'Department',
        tableName: 'departments',
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
  }
}

module.exports = Department;
