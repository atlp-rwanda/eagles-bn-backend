const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    static associate(models) {
      Room.belongsTo(models.Accommodation, {
        foreignKey: 'accommodation_id',
      });
      Room.hasMany(models.Booking, {
        as: 'room',
        onDelete: 'cascade',
        foreignKey: 'room_id',
      });
    }
  }
  Room.init(
    {
      price: DataTypes.INTEGER,
      images: DataTypes.ARRAY(DataTypes.STRING),
      accommodation_id: DataTypes.INTEGER,
      available: DataTypes.BOOLEAN,
      details: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Room',
      tableName: 'Rooms',
    }
  );
  return Room;
};
