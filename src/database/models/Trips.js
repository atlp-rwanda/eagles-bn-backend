/* jshint indent: 2 */

const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => Trips.init(sequelize, DataTypes);

class Trips extends Sequelize.Model {
  static associate(models) {
    models.Trips.belongsTo(models.User, {
      as: "requester",
      foreignKey: "requester_id",
    });
    models.Trips.belongsTo(models.User, {
      as: "manager",
      foreignKey: "manager_id",
    });
    models.Trips.belongsTo(models.Location, {
      as: "departure",
      foreignKey: "from",
    });
    models.Trips.belongsToMany(models.Location, {
      as: "destinations",
      through: "to",
    });
    models.Trips.hasMany(models.Comment, {
      foreignKey: "tripId",
    });
  }

  static init(sequelize, DataTypes) {
    super.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        requester_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        manager_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        location_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        name: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        trip_type: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        from: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        to: {
          type: DataTypes.ARRAY(DataTypes.INTEGER),
          allowNull: true,
        },
        departure_date: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        return_date: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        reasons: {
          type: DataTypes.STRING(255),
          allowNull: true,
          unique: "Trips_reasons_key",
        },
        accommodation_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        status: {
          type: DataTypes.STRING(255),
          allowNull: true,
          defaultValue: "Pending",
        },
        passport: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        id_number: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        marital_status: {
          type: Sequelize.STRING,
          values: [
            'Divorced',
            'Single',
            'Married',
          ],
        },
        gender: {
          type: Sequelize.STRING,
          values: [
            'Male',
            'Female',
            'Other',
          ],
        },
        email: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        phone: {
          type: Sequelize.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "Trips",
        schema: "public",
        timestamps: true,
        indexes: [
          {
            name: "Trips_pkey",
            unique: true,
            fields: [{ name: "id" }],
          },
          {
            name: "Trips_reasons_key",
            unique: true,
            fields: [{ name: "reasons" }],
          },
        ],
      }
    );
    return Trips;
  }
}
