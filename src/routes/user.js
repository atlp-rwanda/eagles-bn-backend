/* eslint-disable linebreak-style */
import Router from "express";
import authRoutes from "./auth";
import User from "../controllers/user";
import user from "../middlewares/user";
import verifyAccessToken from "../middlewares/verifyToken";

const router = Router();

router.use("/", authRoutes);
router.post("/signup", user.validate, User.userSignUp);
router.put(
  "/email-verification/:token",
  user.verifyToken,
  User.emailVerification
);
router.post("/login", User.login);
router.post("/forgetPassword", User.forgetPassword);
router.post("/logout", verifyAccessToken, User.logout);
router.put("/resetPassword/:token/:email", User.resetPassword);
router.get("/test-auth", user.auth, (req, res) => res.sendStatus(200));

export default router;
