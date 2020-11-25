'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookingTransaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  BookingTransaction.init({
    booking_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    room_id: DataTypes.INTEGER,
    payment_method: DataTypes.STRING,
    reference_id: DataTypes.STRING,
    transaction_id: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'BookingTransaction',
  });
  return BookingTransaction;
};
