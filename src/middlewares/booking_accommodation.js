import { Accommodation, Booking as roomBooking } from "../database/models";
import { onError } from "../utils/response";

export const bookingAccommodation = async (req, res, next) => {
  const { bookingID } = req.params;
  const { dataValues: booking } = await roomBooking.findByPk(bookingID);
  const { dataValues: accommodation } = await Accommodation.findByPk(booking.accommodation_id);
  if (accommodation.host_id !== req.user.id) return onError(res, 403, "Accommodation forbidden");
  req.booking = booking;
  next();
};
