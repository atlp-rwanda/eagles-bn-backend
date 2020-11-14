import express from "express";
import rating from "../controllers/rating";
import Auth from "../middlewares/verifyToken";
import resquestor from "../middlewares/rating";
import validatingSchema from "../validators/rating";

const router = express.Router();

router.post("/:accommodation_id/rating", Auth, resquestor.IsRequestor, validatingSchema.validatingRate, rating.CreateRating);
router.get("/:accommodation_id/ratings", Auth, rating.getingRatings);
router.delete("/ratings/:id", Auth, resquestor.IsAdmin, rating.deletingRating);

export default router;
