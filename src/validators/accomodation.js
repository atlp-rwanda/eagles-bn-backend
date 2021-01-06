import Joi from "joi";

const accommodationValidation = (body) => {

  if (body.services && body.amenities) {
    if (!Array.isArray(body.services)) body.services = JSON.parse(body.services);
    if (!Array.isArray(body.amenities)) body.amenities = JSON.parse(body.amenities);
  }
  const accommodationValidationSchema = Joi.object({
    name: Joi.string().min(3).required(),
    description: Joi.string().min(3).required(),
    location_id: Joi.number().required(),
    lat: Joi.string().required(),
    long: Joi.string().required(),
    services: Joi.array().required(),
    amenities: Joi.array().required(),
  });
  return accommodationValidationSchema.validate(body);
};
export default accommodationValidation;
