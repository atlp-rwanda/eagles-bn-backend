import { Booking, Trips, Accommodation } from "../database/models/index";
import { onSuccess } from '../utils/response';

export default class Dashboard {
  static async requesterDashboard(req, res) {
    const userID = 5;
    const trips = await Trips.count({ where: { requester_id: userID } });
    const accommodations = await Accommodation.count();
    const bookings = await Booking.count({ where: { user_id: userID } });
    // const pendingBookings = await Booking.count({ where: { user_id: userID, status:1 } });
    const pendingBookings = bookings - 1;
    return onSuccess(res, 200, "User dashboard", {
      trips, accommodations, bookings, pendingBookings
    });
  }
}
