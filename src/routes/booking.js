import express from "express";
import booking from "../controllers/booking";
import Auth from "../middlewares/verifyToken";
import {roomStatusValidation} from '../validators/room';
import validatingSchema from "../validators/booking";
import catcher from '../utils/catcher';

const router = express.Router();

router.get("/:room_id/booking", catcher(booking.finishBooking));
router.post("/:room_id/booking", validatingSchema.validatingDate, Auth, catcher(booking.createBooking));
router.get("/:room_id/bookings", Auth, booking.getAllBookings);
router.patch("/booking/:id/:status",Auth, roomStatusValidation, catcher(booking.status));
router.patch("/bookings/:id", validatingSchema.validatingDate, Auth, booking.updateBookings);
router.delete("/booking/:id", Auth, booking.deleteBooking);

export default router;
