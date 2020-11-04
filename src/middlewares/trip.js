import { onError } from "../utils/response";
import validation, { updateValidation } from "../validators/trip";

export default class Trip {
  static validate(req, res, next) {
    const auth = validation(req.body);
    if (auth.error) {
      return onError(res, 400, auth.error.details[0].message);
    }
    next();
  }

  static validateUpdate(req, res, next) {
    const { error } = updateValidation(req.body);
    if (error) {
      return onError(res, 400, error.details[0].message);
    }
    next();
  }
}
