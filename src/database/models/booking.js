const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      Booking.belongsTo(models.User, {
        as: "user",
        foreignKey: "user_id",
        onDelete: 'CASCADE'
      });
      Booking.belongsTo(models.Room, {
        as: "room",
        foreignKey: "room_id",
        onDelete: 'CASCADE'
      });
    }
  }
  Booking.init({
    user_id: DataTypes.INTEGER,
    room_id: DataTypes.INTEGER,
    check_in_date: DataTypes.DATE,
    check_out_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Booking',
    tableName: 'Bookings'
  });
  return Booking;
}