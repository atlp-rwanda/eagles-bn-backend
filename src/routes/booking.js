import express from "express";
import booking from "../controllers/booking";
import Auth from "../middlewares/verifyToken";
import validatingSchema from "../validators/booking";
import useRole from "../middlewares/booking";

const router = express.Router();

router.post("/:room_id/booking", validatingSchema.validatingDate, Auth, booking.createBooking);
router.get("/:room_id/bookings", Auth, useRole.IsManager, booking.getAllBookings);
// router.get("/rooms/:room_id/bookings/:booking_id", Auth, booking.getSingleBooking);
router.patch("/bookings/:id", validatingSchema.validatingDate, Auth, useRole.IsManager, booking.updateBookings);
router.put("/bookings/:id", validatingSchema.validatingState, Auth, useRole.IsManager, booking.BookingsStatus);
router.delete("/booking/:id", Auth, booking.deleteBooking);

export default router;
