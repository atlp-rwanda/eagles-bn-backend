import express from "express";
import booking from "../controllers/booking";
import Auth from "../middlewares/verifyToken";
import validatingSchema from "../validators/booking";
import catcher from "../utils/catcher";

const router = express.Router();

router.post("/booking/payment/response", catcher(booking.paymentResponse));
router.get("/booking/transaction/:reference_id/verify", catcher(booking.paymentVerify));
router.post("/:room_id/booking", validatingSchema.validatingDate, Auth, booking.createBooking);
router.get("/:room_id/bookings", Auth, booking.getAllBookings);
// router.get("/rooms/:room_id/bookings/:booking_id", Auth, booking.getSingleBooking);
router.patch("/bookings/:id", validatingSchema.validatingDate, Auth, booking.updateBookings);
router.delete("/booking/:id", Auth, booking.deleteBooking);


export default router;
