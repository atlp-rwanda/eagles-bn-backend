import { Router } from 'express';
import Trip from '../controllers/trip';
import trip from '../middlewares/trip';
import catcher from '../utils/catcher';
import comment from '../controllers/comment';
import commentValidation from '../validators/comment';
import * as validation from '../validators/trip';
import verifyAccessToken from '../middlewares/verifyToken';
// eslint-disable-next-line import/no-named-as-default,import/no-named-as-default-member
import tripRemember from '../middlewares/trip-remember';
import user from '../validators/user';
import { roles } from '../helpers/roles';
import tripStatusValidation from '../validators/tripStatus'
const router = Router();

router.get('/', catcher(Trip.getAll));
router.get('/search', catcher(validation.search), catcher(Trip.search));

router.post("/", verifyAccessToken, tripRemember, trip.validate, catcher(Trip.create));
router.get("/remember/latest", verifyAccessToken, user.IsAllowed(roles.REQUESTER), catcher(Trip.LatestRemember));
router.patch("/status/:tripId", tripStatusValidation, trip.isManager, catcher(Trip.update));
router
    .route('/:tripId')
    .get(catcher(Trip.getOne))
    .patch(trip.validateUpdate, catcher(Trip.update));

// Comment routes
router.post('/:id/comment', commentValidation, catcher(comment.createComment));
router.get('/:id/comments/:tripId', comment.getAllComments);
router.delete('/:tripId/comments/:id', catcher(comment.deleteComment));

export default router;