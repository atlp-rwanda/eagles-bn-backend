import express from "express";
import booking from "../controllers/booking";
import Auth from "../middlewares/verifyToken";
import validatingSchema from "../validators/booking";

const router = express.Router();

router.post("/:room_id/booking", validatingSchema.validatingDate, Auth, booking.createBooking);
router.get("/:room_id/bookings", Auth, booking.getAllBookings);
// router.get("/rooms/:room_id/bookings/:booking_id", Auth, booking.getSingleBooking);
router.patch("/bookings/:id", validatingSchema.validatingDate, Auth, booking.updateBookings);
router.delete("/booking/:id", Auth, booking.deleteBooking);

export default router;
