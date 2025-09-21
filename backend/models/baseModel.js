const { Model, DataTypes } = require("sequelize");

class BaseModel extends Model {
  static initBase(sequelize, attributes, options = {}) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        ...attributes,
        created: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
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
        sequelize,
        ...options,
        timestamps: false, 
      }
    );
  }
}

module.exports = BaseModel;
