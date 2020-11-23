/* eslint-disable linebreak-style */
import { onError } from "../utils/response";
import validation, { updateValidation } from "../validators/trip";
import { roles } from '../helpers/roles';

export default class Trip {
  static async validate(req, res, next) {
    const auth = validation(req.body);
    if (auth.error) {
      return onError(res, 400, auth.error.details[0].message);
    }
    next();
  }

  static validateUpdate(req, res, next) {
    const { error } = updateValidation(req.body);
    if (error) {
      console.log("Validation error: ", error.details);
      return onError(res, 400, error.details[0].message);
    }
    next();
  }

  static isManager(req, res, next) {
    if (req.user.role !== roles.MANAGER) {
      return res.status(403).send({ error: "Not Allowed" });
    }
    next();
  }
}
