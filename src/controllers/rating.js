import { Rating, Trips } from "../database/models/index";
import { onError, onSuccess } from "../utils/response";

export default class AccommodationRating {
  static async CreateRating(req, res) {
    const { service_rate } = req.body;
    const { id: userId } = req.user;
    const trip = await Trips.findOne({
      where: { requester_id: userId, status: "Approved", accommodation_id: req.params.accommodation_id }
    });
    if (!trip) {
      return res.status(404).send({ error: 'Sorry you never been here' });
    }
    const Myrating = await Rating.findOne({
      where: { accommodation_id: req.params.accommodation_id, trip_id: trip.id }
    });
    if (Myrating) { return res.status(409).send({ error: 'we already have your rating' }); }
    const rating = await Rating.create({
      accommodation_id: req.params.accommodation_id,
      trip_id: trip.id,
      service_rate
    });
    return onSuccess(res, 200, 'Thank you for your Rating!!', rating);
  }

  static async getingRatings(req, res) {
    try {
      const result = await Rating.findAll({
        where:
        { accommodation_id: req.params.accommodation_id }
      });
      return onSuccess(res, 200, 'Rating!!', result);
    } catch (error) {
      return onError(res, 500, error);
    }
  }

  static async deletingRating(req, res) {
    const { id: rate_id } = req.params;
    const rating = await Rating.findOne({ where: { id: rate_id } });
    if (!rating) {
      return res.status(404).send({ error: 'rating is not available' });
    }
    await rating.destroy();
    return onSuccess(res, 200, 'Rate Deleted!!', rating);
  }
}
