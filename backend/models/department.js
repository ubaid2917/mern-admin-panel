'use strict';
const BaseModel = require('./baseModel');

class Department extends BaseModel {
  static initModel(sequelize, DataTypes) {
    return super.initBase(
      sequelize,
      {
        name: DataTypes.STRING,
        description: DataTypes.STRING
      },
      {
        modelName: 'Department',
        tableName: 'departments'
      }
    );
  }

  static associate(models) {
    // define association here
  }
}

module.exports = Department;
