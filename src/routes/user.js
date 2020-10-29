import Router from "express";
import User from "../controllers/user";
import user from "../middlewares/user";

const router = Router();

router.post("/signup", user.validate, User.userSignUp);
router.put(
  "/user/email-verification/:token",
  user.verifyToken,
  User.emailVerification
);

export default router;
