import Joi from "joi";

const roomValidation = (req, res, next) => {
  const roomValidationSchema = Joi.object({
    price: Joi.number().min(0).required(),
    details: Joi.string()
  });
  const isValid = roomValidationSchema.validate(req.body);
  if (isValid.error) { return res.status(400).send({ error: isValid.error.details[0].message }); }
  next();
};

export const roomStatusValidation = (req, res, next) => {
  const roomValidationSchema = Joi.object({
    id: Joi.number().min(1).required(),
    status: Joi.string().valid('approve', 'reject').required()
  });
  const isValid = roomValidationSchema.validate(req.params);
  if (isValid.error) { return res.status(400).send({ error: isValid.error.details[0].message }); }
  next();
};

export default roomValidation;
