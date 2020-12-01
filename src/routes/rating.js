import express from "express";
import rating from "../controllers/rating";
import Auth from "../middlewares/verifyToken";
import resquestor from "../middlewares/rating";
import validatingSchema from "../validators/rating";
import catcher from "../utils/catcher";

const router = express.Router();

router.post("/:accommodation_id/rating", Auth, resquestor.IsRequestor, validatingSchema.validatingRate, catcher(rating.CreateRating));
router.get("/:accommodation_id/ratings", Auth, rating.getingRatings);
router.delete("/ratings/:id", Auth, resquestor.IsAdmin, rating.deletingRating);

export default router;
