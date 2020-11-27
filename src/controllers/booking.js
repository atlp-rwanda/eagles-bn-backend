import { Booking as roomBooking } from '../database/models/index';

import { onError, onSuccess } from '../utils/response';

export default class RoomBooking {
  static async createBooking(req, res) {
    try {
      const { check_in_date, check_out_date } = req.body;
      const user_id = req.user.id;
      const booking = await roomBooking.create({
        user_id,
        room_id: req.params.room_id,
        check_in_date,
        check_out_date,
      });
      return onSuccess(res, 200, 'success!!', booking);
    } catch (error) {
      return onError(res, 500, error);
    }
  }

  static async getAllBookings(req, res) {
    const { id: userId } = req.user;
    const { room_id: roomId } = req.params;
    const myBooking = await roomBooking.findAll({
      where: { user_id: userId, room_id: roomId },
    });
    return onSuccess(res, 200, 'success!!', myBooking);
  }

  static async updateBookings(req, res) {
    try {
      const { id: book_id } = req.params;
      const { id: usersId } = req.user;
      const booking = await roomBooking.findOne({
        where: {
          id: book_id,
          user_id: usersId,
        },
      });
      if (!booking) {
        return res.status(404).send({ error: 'booking is not available' });
      }
      const updateBooking = await booking.update({
        check_in_date: req.body.check_in_date || booking.check_in_date,
        check_out_date: req.body.check_out_date || booking.check_out_date,
      });
      return onSuccess(res, 201, 'success!!', updateBooking);
    } catch (error) {
      return onError(res, 500, 'internal server error');
    }
  }

  static async deleteBooking(req, res) {
    const { id: b_id } = req.params;
    const { id } = req.user;
    const booking = await roomBooking.findOne({
      where: { id: b_id, user_id: id },
});
    if (!booking) {
      return res.status(400).send({ error: 'room is not available' });
    }
    await booking.destroy();
    return onSuccess(res, 200, 'Booking Delete!!', booking);
  }
  static async changeBookingStatus(req,res){
    try{
      const  {book_id}  = req.params;
      const  {status}  = req.body;
      const booking = await roomBooking.findOne({
        where: { id: book_id,}
    })
     if(booking.check_in_date < new Date()){
       return onError(res, 400,`Booking ID ${book_id} is expired!` );
      }
      if(booking.paid=='false'){
        return onError(res, 400,`Payment have to first be made!` );
      }
  if(booking.status==status){
    return onSuccess(res, 208,`Booking of ID ${book_id} is Already ${status}!`);
  }
    await booking.update({status});
    return onSuccess(res, 201,`Booking of ID ${book_id} is ${status} !` );
  }
   catch (error) {
    return onError(res, 500, 'internal server error');
  }
  }
}
