import { Booking as roomBooking, Accommodation, Rooms } from '../database/models/index';
import { onError, onSuccess } from '../utils/response';

export default class RoomBooking {
  static async createBooking(req, res) {
    try {
      const { check_in_date, check_out_date } = req.body;
      const user_id = req.user.id;
      const { room_id: roomId } = req.params;
      const room = await Rooms.findOne({ where: { id: roomId } });
      if (!room) return onError(res, 404, "no such are available");
      const booking = await roomBooking.create({
        user_id,
        room_id: req.params.room_id,
        accommodation_id: room.accommodation_id,
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
      const updateBooking = await roomBooking.update({
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

  static async BookingsStatus(req, res) {
    try {
      const { id: book_id } = req.params;
      const { status } = req.body;
      const { id: usersId } = req.user;
      const booking = await roomBooking.findOne({ where: { id: book_id } });
      if (!booking) {
        return res.status(404).send({ error: 'booking is not available' });
      }
      // eslint-disable-next-line max-len
      const accommodation = await Accommodation.findOne({ where: { id: booking.accommodation_id } });
      if (!accommodation) {
        return res.status(404).send({ error: 'no such accommodation related to that booking' });
      }
      if (usersId !== accommodation.host_id) return onError(res, 403, "you don't have access to this accommodation");
      if (booking.check_in_date < new Date()) {
        await booking.update({
          status: "Rejected"
        });
        return onError(res, 403, 'Booking is expired');
      } if (booking.status === 'Approved' && booking.check_out_date >= new Date()) {
        return onError(res, 400, 'Booking is taken');
      } if (booking.status === 'Rejected' && booking.check_out_date >= new Date()) {
        return onError(res, 400, 'Booking is Rejected for some reseason');
      }
      if (booking.status === 'Rejected') {
        return onError(res, 400, 'Booking is Rejected');
      }
      const state = await booking.update({
        status
      });
      return onSuccess(res, 201, 'success!!', state);
    } catch (error) {
      return onError(res, 500, 'internal server error');
    }
  }
}
