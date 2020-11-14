import { onError } from '../utils/response';

const Joi = require('joi');

export default class validatingSchema {
  static async validatingRate(req, res, next) {
    const validatingRating = Joi.object({
      service_rate: Joi.number().min(1).max(5).required(),
    });
    const { error } = validatingRating.validate(req.body);
    if (error) return onError(res, 400, error.details[0].message.split('"').join(''));
    return next();
  }
}
