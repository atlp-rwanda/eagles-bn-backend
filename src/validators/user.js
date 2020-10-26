import Joi from 'joi';

const userValidation=(body)=>{
    const userValidationSchema=Joi.object({
        first_name:Joi.string().min(3).max(20).required(),
        last_name:Joi.string().min(3).max(20).required(),
        email: Joi.string().email().required(),
        password: Joi.string().alphanum().min(8).required().strict(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required().strict()
    });
    return userValidationSchema.validate(body);
}
export default userValidation;
