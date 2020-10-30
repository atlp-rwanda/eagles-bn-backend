/* eslint-disable linebreak-style */
import express from "express";
import authRoutes from "./auth";
import userRoutes from "./user";
import User from "../controllers/user";
import user from "../middlewares/user";

const router = express.Router();

router.use("/", authRoutes);
router.use("/", userRoutes);
router.post("/forgetPassword", User.forgetPassword);
router.put("/resetPassword/:token/:email", User.resetPassword);
router.post("/login", User.login);
router.get("/test-auth", user.auth, (req, res) => res.sendStatus(200));

export default router;
