import Joi from "joi";

function commentValiation(req, res, next) {
  const commentValiationSchema = Joi.object({
    comment: Joi.string().max(150).required(),
  });
  const result = commentValiationSchema.validate(req.body);
  if (result.error) return res.status(400).json({ Message: result.error.details[0].message });
  next();
}
export default commentValiation;
