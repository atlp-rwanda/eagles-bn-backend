import express from "express";
import booking from "../controllers/booking";
import status from "../controllers/booking_status";
import Auth from "../middlewares/verifyToken";
import validatingSchema from "../validators/booking";
import { bookingAccommodation } from "../middlewares/booking_accommodation";

const router = express.Router();

router.post("/:room_id/booking", validatingSchema.validatingDate, Auth, booking.createBooking);
router.get("/:room_id/bookings", Auth, booking.getAllBookings);
router.patch("/bookings/:id", validatingSchema.validatingDate, Auth, booking.updateBookings);
router.delete("/booking/:id", Auth, booking.deleteBooking);
router.post("/bookings/:bookingID/:status", Auth, bookingAccommodation, status.changeStatus);

export default router;
