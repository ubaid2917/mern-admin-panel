'use strict';
const BaseModel = require('./baseModel');

class SmartCard extends BaseModel {
  static initModel(sequelize, DataTypes) {
      return super.initBase(
        sequelize,
        {
          
          name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notEmpty: true,
            },
          },
          minVisits: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
              min: 0,
              isInt: true,
            },
          },
          discount: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
              min: 0,
              max: 100,
              isFloat: true,
            },
          },
          type: {
            type: DataTypes.ENUM('Silver', 'Gold', 'Platinum', 'Diamond', 'VIP'),
            allowNull: false,
            validate: {
              isIn: [['Silver', 'Gold', 'Platinum', 'Diamond', 'VIP']],
            },
          },
          validity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
              min: 1,
              isInt: true,
            },
          },
          description: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          created: {
            type: DataTypes.DATE,
            allowNull: false,
          },
          updated: {
            type: DataTypes.DATE,
            allowNull: true,
          },
          deleted: {
            type: DataTypes.DATE,
            allowNull: true,
          },
        },
        {
          modelName: 'SmartCard',
          tableName: 'smart_card',
        }
      );
  }

  static associate(models) {
    // define association here
  }
}

module.exports = SmartCard;
