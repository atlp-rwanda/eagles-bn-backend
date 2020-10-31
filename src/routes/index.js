/* eslint-disable linebreak-style */
import express from "express";
import userRoutes from "./user";
import tripRoutes from "./trip";
import auth from "../middlewares/verifyToken";
import accomodationRoutes from './accomodation';
import roomRoutes from './room';

const router = express.Router();

router.use("/user", userRoutes);
router.use("/trips", auth, tripRoutes);
router.use("/accommodations", accomodationRoutes);
router.use("/accommodation", roomRoutes);

export default router;
