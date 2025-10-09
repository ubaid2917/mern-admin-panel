'use strict';
const BaseModel = require('./baseModel'); 
const { DataTypes } = require('sequelize');

class PatientCard extends BaseModel {
  static initModel(sequelize) {
    return super.initBase(
      sequelize,
      {
        cardId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        patientId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        isExpired: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
          allowNull: false,
        },
        expiredAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        discount: {
          type: DataTypes.FLOAT,
          allowNull: false,
          defaultValue: 0,
        }
      },
      {
        modelName: 'PatientCard',
        tableName: 'patient_card',
      }
    );
  }

  static associate(models) {
    //  Associations
    this.belongsTo(models.SmartCard, {
      foreignKey: 'cardId',
      as: 'card'
    });

    this.belongsTo(models.Patient, {
      foreignKey: 'patientId',
      as: 'patient'
    });
  }
}

module.exports = PatientCard;