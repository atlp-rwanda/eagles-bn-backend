/* jshint indent: 2 */

const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => Locations.init(sequelize, DataTypes);

class Locations extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    super.init({
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      code: {
        type: DataTypes.STRING(255),
        allowNull: false
      }
    }, {
      sequelize,
      tableName: 'Locations',
      schema: 'public',
      timestamps: true,
      indexes: [
        {
          name: "Locations_pkey",
          unique: true,
          fields: [
            { name: "id" },
          ]
        },
      ]
    });
    return Locations;
  }
}
