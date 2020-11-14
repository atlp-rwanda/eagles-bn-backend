import jwt from 'jsonwebtoken';
import passport from 'passport';
import Joi from 'joi';

export default class userValidations {
  static signUpValidation(req, res, next) {
    const userValidationSchema = Joi.object({
      first_name: Joi.string().min(3).max(20).required(),
      last_name: Joi.string().min(3).max(20).required(),
      email: Joi.string().email().required(),
      role: Joi.string().optional(),
      password: Joi.string().min(8).required(),
      confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
    });
    const authError = userValidationSchema.validate(req.body);
    if (authError.error) {
      return res.send({ error: authError.error.details[0].message });
    }
    return next();
  }

  static profileValidate(req, res, next) {
    const auth = Joi.object({
      birth_date: Joi.string().min(3),
      preferred_language: Joi.string().min(3).max(20),
      preferred_currency: Joi.string().min(3).max(20),
      where_you_live: Joi.string().min(3).max(20).required(),
      father_name: Joi.string().min(3).max(20),
      mother_name: Joi.string().min(3).max(20),
      gender: Joi.string().min(3).max(20).required(),
      profile_image: Joi.any(),
      phone_number: Joi.string().min(10).max(14),
      nationality: Joi.string().min(3).max(20).required(),
      marital_status: Joi.string().min(3).max(20).required(),
      role: Joi.string().min(3).max(20),
      manager: Joi.string().min(3).max(20) });
    const authError = auth.validate(req.body);
    if (authError.error) {
      return res.send({ error: authError.error.details[0].message.split('"').join('') });
    } return next();
  }

  static verifyToken(req, res, next) {
    try {
      const { token } = req.params;

      const decodedToken = jwt.verify(
        token,
        process.env.JWT_ACCOUNT_VEIRIFICATION
      );
      req.decoded = decodedToken;
      return next();
    } catch (err) {
      if (err.message === 'jwt malformed' || err.message === 'jwt expired') {
        return res
          .status(400)
          .json({ error: 'You are using Incorrect or Expired Link!' });
      }
      return res.status(500).json({ Error: 'Internal Error!' });
    }
  }

  static auth(req, res, next) {
    return passport.authenticate('jwt', { session: false })(req, res, next);
  }

  static isSuperAdmin(role) {
    return (req, res, next) => {
      if (req.user.role != role) {
        return res.status(403).send({ error: 'Not Allowed' });
      }
      next();
    };
  }

  static IsAllowed(role) {
    return (req, res, next) => {
      if (req.user.role != role) {
        return res.status(403).send({ error: 'Not Allowed' });
      }
      next();
    };
  }
}
