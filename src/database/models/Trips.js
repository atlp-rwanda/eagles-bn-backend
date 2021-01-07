import emitter from '../../utils/EventEmitters';

module.exports = (sequelize, DataTypes) => {
  const Trips = sequelize.define('Trips',
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
        type: DataTypes.TEXT,
        allowNull: true,
        unique: 'Trips_reasons_key',
      },
      accommodation_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: 'Pending',
      },
      passport: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      id_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      marital_status: {
        type: DataTypes.STRING,
        values: ['Divorced', 'Single', 'Married'],
      },
      gender: {
        type: DataTypes.STRING,
        values: ['Male', 'Female', 'Other'],
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'Trips',
      schema: 'public',
      timestamps: true,
      indexes: [
        {
          name: 'Trips_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
        {
          name: 'Trips_reasons_key',
          unique: true,
          fields: [{ name: 'reasons' }],
        },
      ],
    }
  );

  Trips.associate = (models) => {
    models.Trips.belongsTo(models.User, {
      as: 'requester',
      foreignKey: 'requester_id',
    });
    models.Trips.belongsTo(models.User, {
      as: 'managers',
      foreignKey: 'manager_id',
    });
    models.Trips.belongsTo(models.Location, {
      as: 'departure',
      foreignKey: 'from',
    });
    models.Trips.belongsToMany(models.Location, {
      as: 'destinations',
      through: 'to',
    });
    models.Trips.hasMany(models.Comment, {
      foreignKey: 'tripId',
      as: 'Comments',
    });
    Trips.belongsTo(models.Accommodation, {
      foreignKey: 'accommodation_id',
    });
  };
  Trips.afterCreate(({ dataValues }) => emitter.emit('request created', dataValues));
  Trips.afterUpdate(({ dataValues, _changed }) => emitter.emit('request updated', { dataValues, _changed }));

  return Trips;
};
