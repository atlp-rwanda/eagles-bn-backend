/* eslint-disable linebreak-style */
import userValidation from "../validators/user";

export default class User {
  static validate(req, res, next) {
    const auth = userValidation(req.body);
    if (auth.error) {
      return res.send({ error: auth.error.details[0].message });
    }
    next();
  }
}
