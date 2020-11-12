import Joi from 'joi';

const tripValidation = (body) => {
  const tripValidationSchema = Joi.object({
    from: Joi.number().min(1).required(),
    to: Joi.array()
      .items(Joi.number())
      .min(1)
      .disallow(Joi.ref('from'))
      .required(),
    location_id: Joi.number().min(1),
    departure_date: Joi.date().required(),
    return_date: Joi.date(),
    reasons: Joi.string().min(8).required(),
    accommodation_id: Joi.number().min(1).required(),
    trip_type: Joi.string().valid('one way trip', 'return trip').required(),
  });
  return tripValidationSchema.validate(body);
};

export const updateValidation = (body) => {
  const tripValidationSchema = Joi.object({
    from: Joi.number().min(1).disallow(Joi.ref('to')),
    to: Joi.array().items(Joi.number()).min(1),
    location_id: Joi.number().min(1),
    departure_date: Joi.date(),
    return_date: Joi.date(),
    reasons: Joi.string().min(8),
    accommodation_id: Joi.number().min(1),
    trip_type: Joi.string().valid('one way trip', 'return trip'),
  });
  return tripValidationSchema.validate(body);
};

export const search = (req, res, next) => {
  const schema = Joi.object({
    requester_id: Joi.string().min(1),
    to: Joi.string().min(1),
    from: Joi.string().min(1),
    departure_date: Joi.date().min(1),
    return_date: Joi.date().min(1),
    trip_type: Joi.string().min(1),
    status: Joi.string().min(1),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    return res
      .status(400)
      .json({ status: 400, error: error.details[0].message });
  }
  next();
};

export default tripValidation;
