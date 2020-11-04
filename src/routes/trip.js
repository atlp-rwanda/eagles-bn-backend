import { Router } from "express";
import Trip from "../controllers/trip";
import trip from "../middlewares/trip";
import catcher from "../utils/catcher";

const router = Router();

router.get("/", catcher(Trip.getAll));
router.post("/", trip.validate, catcher(Trip.create));
router
  .route("/:tripId")
  .get(catcher(Trip.getOne))
  .patch(trip.validateUpdate, catcher(Trip.update));

export default router;
