import { Op } from 'sequelize';
import models, { Booking as roomBooking } from '../database/models/index';
import { onError, onSuccess } from '../utils/response';
import payment from "../helpers/payment";
import { verifyLink } from '../helpers/auth';

export default class RoomBooking {
  static async createBooking(req, res) {
    const { check_in_date, check_out_date, email, phone, fullname } = req.body;
    const user_id = req.user.id;
    const user = await models.User.findOne({where: { id: user_id }});
    const room = await models.Room.findOne({where: { id: req.params.room_id }});
    if (!room.available) return onError(res, 409, 'Room already taken!');
    const response = await payment({
      email: user.email || email,
      phonenumber: user.phone_number || phone,
      name: `${user.first_name} ${user.last_name}` || fullname
    }, { 
      user_id, 
      room_id: req.params.room_id, 
      accommodation_id: room.accommodation_id, 
      check_in_date, 
      check_out_date 
    }, room.price);
    // if(response.status !== 'success') return onError(res, 422, 'Payment failed', response);

    return onSuccess(res, 200, 'Please complete your payment!', response);
  }

  static async finishBooking(req, res) {
    const data = verifyLink(req.query.token);
    const created = await roomBooking.create(data);
    const booking = await roomBooking.findOne({where: {id: created.id }, include: [
      {model: models.User, as: 'user', attributes: ['first_name', 'last_name', 'email', 'phone_number']}, 
      {model: models.Room, as: 'room', attributes: ['price', 'details', 'images']}, 
      {model: models.Accommodation, as: 'accommodation', attributes: ['name', 'description', 'images']}
    ]});
    await models.Room.update({ available: false }, {where: {id: data.room_id}})
    return onSuccess(res, 201, 'Booking successfully created!', booking);
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
      return res.status(400).send({ error: 'Booking is not available' });
    }
    await booking.destroy();
    return onSuccess(res, 200, 'Booking Delete!!', null);
  }

  static async status(req, res) {
    const { status, id } = req.params;
    const booking = await roomBooking.findOne({ 
      where: { id: req.params.id, [Op.not]: { user_id: req.user.id } }, 
      include: [
        { model: models.Accommodation, as: 'accommodation' }, 
        { model: models.Room, as: 'room' }
      ] 
    });
    if(!booking) return onError(res, 404, `No booking to match id: ${id}`);
    if(booking.accommodation.host_id !== req.user.id) 
      return onError(res, 403, 'Cannot update booking status in accommodation which is not yours!');

    const checkIn = booking.check_in_date;
    const today = new Date(Date.now());
    if ((today-checkIn) > 1e3) return onError(res, 400, 'Booking has expired!');
    if (
      (booking.status === 'reject' && status === 'reject') 
      || (booking.status === 'approve' && status === 'approve')
    )
      return onError(res, 409, `Already ${booking.status}!`);
    await booking.update({ status });

    res.status(200).json({
      message: 'Room status updated successfully!',
      data: booking,
    });
  }
}
