import express from "express";
import booking from "../controllers/booking";
import Auth from "../middlewares/verifyToken";
import validatingSchema from "../validators/booking";
import bookingStatusValidation from '../validators/tripStatus'
import book from '../middlewares/booking'
import payment from '../controllers/payment'
const router = express.Router();

router.post("/:room_id/booking", validatingSchema.validatingDate, Auth, booking.createBooking);
router.get("/:room_id/bookings", Auth, booking.getAllBookings);
router.patch("/bookings/:id", validatingSchema.validatingDate, Auth, booking.updateBookings);
router.delete("/booking/:id", Auth, booking.deleteBooking);
router.patch("/booking/:book_id/status",bookingStatusValidation,Auth,book.isAccommodationOwner, booking.changeBookingStatus);
router.post("/booking/:id/payment", Auth,payment.makePayment)
router.get("/verifyPayment",payment.verifyPayment)


export default router;
