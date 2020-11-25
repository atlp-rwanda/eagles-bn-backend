import {
  Booking as roomBooking, User, Room, BookingTransaction
} from "../database/models/index";
import { onError, onSuccess } from "../utils/response";
import { paymentRequest } from "../helpers/payment";

export default class RoomBooking {
  static async createBooking(req, res) {
    try {
      const { check_in_date, check_out_date, redirect_url } = req.body;
      const { id: user_id } = req.user;
      const { room_id } = req.params;
      const { dataValues: user } = await User.findByPk(user_id);
      const { dataValues: room } = await Room.findByPk(room_id);
      const { dataValues: booking } = await roomBooking.create({
        user_id,
        room_id,
        check_in_date,
        check_out_date
      });
      const tx_ref = `Barefoot-${(Math.random() * 100000000000000000)}`;
      const { data } = await paymentRequest(
        room.price,
        redirect_url,
        `${user.first_name} ${user.last_name}`,
        user.phone_number,
        user.email,
        tx_ref
      );
      await BookingTransaction.create({
        booking_id: booking.id,
        user_id: user.id,
        room_id: room.id,
        reference_id: tx_ref
      });
      return onSuccess(res, 200, "success!!", {
        ...booking,
        payment_redirect_url: data.link
      });
    } catch (error) {
      return onError(res, 500, error);
    }
  }

  static async getAllBookings(req, res) {
    const { id: userId } = req.user;
    const { room_id: roomId } = req.params;
    const myBooking = await roomBooking.findAll({
      where: {
        user_id: userId,
        room_id: roomId
      }
    });
    return onSuccess(res, 200, "success!!", myBooking);
  }

  static async updateBookings(req, res) {
    try {
      const { id: book_id } = req.params;
      const { id: usersId } = req.user;
      const booking = await roomBooking.findOne({
        where: {
          id: book_id,
          user_id: usersId
        }
      });
      if (!booking) {
        return res.status(404)
          .send({ error: "booking is not available" });
      }
      const updateBooking = await booking.update({
        check_in_date: req.body.check_in_date || booking.check_in_date,
        check_out_date: req.body.check_out_date || booking.check_out_date
      });
      return onSuccess(res, 201, "success!!", updateBooking);
    } catch (error) {
      return onError(res, 500, "internal server error");
    }
  }

  static async deleteBooking(req, res) {
    const { id: b_id } = req.params;
    const { id } = req.user;
    const booking = await roomBooking.findOne({
      where: {
        id: b_id,
        user_id: id
      }
    });
    if (!booking) {
      return res.status(400)
        .send({ error: "room is not available" });
    }
    await booking.destroy();
    return onSuccess(res, 200, "Booking Delete!!", booking);
  }

  static async paymentResponse(req, res) {
    const { data } = req.body;
    if (data.status === "successful") {
      await BookingTransaction.update({
        payment_method: data.payment_type,
        transaction_id: data.id,
        status: true
      },
      { where: { reference_id: data.tx_ref } }
      );
      return onSuccess(res, 200, "Payment Success", null);
    }
    return onError(res, 400, "Payment Error");
  }

  static async paymentVerify(req, res) {
    const { reference_id } = req.params;
    const transaction = await BookingTransaction.findOne({ where: { reference_id } });
    if (!transaction) return onError(res, 404, "Transaction not found");
    if (transaction.dataValues.status) return onSuccess(res, 200, "Transaction Succeed", { status: true });
    return onSuccess(res, 200, "Transaction not succeed", { status: false });
  }
}
