/* eslint-disable linebreak-style */
import Joi from "joi";

function tripStatusValidation(req, res, next) {
  const tripStatusValidationSchema = Joi.object({
    status: Joi.string().valid("rejected", "approved")
  });
  const data = tripStatusValidationSchema.validate(req.body);
  if (data.error) {
    const response = data.error.details[0].message;
    return res.status(400).send({ error: response });
  }
  next();
}
export default tripStatusValidation;
