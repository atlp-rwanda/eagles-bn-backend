import { onError } from '../utils/response';

const Joi = require('joi');

export default class validatingSchema {
  static async validatingDate(req, res, next) {
    const validatingDate = Joi.object({
      check_in_date: Joi.date().iso().min(Date()).required(),
      check_out_date: Joi.date().iso().min(Joi.ref('check_in_date')).required(),
    });
    const { error } = validatingDate.validate(req.body);
    if (error) {
      return onError(res, 400, error.details[0].message.split('"').join(''));
    }
    return next();
  }
}
