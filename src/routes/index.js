/* eslint-disable linebreak-style */
import express from "express";
import userRoutes from "./user";
import tripRoutes from "./trip";
import auth from "../middlewares/verifyToken";
import accomodationRoutes from './accomodation';
import roomRoutes from './room';
import comment from "../controllers/comment";
import commentValidation from "../validators/comment";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/trips", auth, tripRoutes);
router.use("/accommodations", accomodationRoutes);
router.use("/accommodation", roomRoutes);

// Comments Routes

router.post(
  "/trips/:id/comment",
  auth,
  commentValidation,
  comment.createComment
);
router.get("/trips/:id/comments/:tripId", auth, comment.getAllComments);
router.delete("/trips/:tripId/comments/:id", auth, comment.deleteComment);

export default router;
