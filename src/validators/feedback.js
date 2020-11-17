import Joi from "joi";

function feedbackValiation(req, res, next) {
  const feedbackValiationSchema = Joi.object({
    feedback: Joi.string().min(3).max(150).required(),
  });
  const result = feedbackValiationSchema.validate(req.body);
  if (result.error) return res.status(400).json({ Message: result.error.details[0].message });
  next();
}
export default feedbackValiation;
