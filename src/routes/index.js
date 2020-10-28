import express from "express";
const router = express.Router();
import authRoutes from "../routes/auth";
import userRoutes from "../routes/user";
import User from "../controllers/user";
router.use("/", authRoutes);
router.use("/", userRoutes);
router.post("/forgetPassword", User.forgetPassword);
router.put("/resetPassword/:token/:email", User.resetPassword);

export default router;
