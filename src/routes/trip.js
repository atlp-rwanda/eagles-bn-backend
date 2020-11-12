import { Router } from 'express';
import Trip from '../controllers/trip';
import trip from '../middlewares/trip';
import catcher from '../utils/catcher';
import comment from '../controllers/comment';
import commentValidation from '../validators/comment';
import * as validation from '../validators/trip';

const router = Router();

router.get('/', catcher(Trip.getAll));
router.get('/search', catcher(validation.search), catcher(Trip.search));
router.post('/', trip.validate, catcher(Trip.create));
router
  .route('/:tripId')
  .get(catcher(Trip.getOne))
  .patch(trip.validateUpdate, catcher(Trip.update));

// Comment routes
router.post('/:id/comment', commentValidation, catcher(comment.createComment));
router.get('/:id/comments/:tripId', comment.getAllComments);
router.delete('/:tripId/comments/:id', catcher(comment.deleteComment));

export default router;
