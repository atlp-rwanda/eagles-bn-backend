/* eslint-disable linebreak-style */
import express from "express";
import userRoutes from "./user";
import tripRoutes from "./trip";
import auth from "../middlewares/verifyToken";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/trips", auth, tripRoutes);

export default router;
