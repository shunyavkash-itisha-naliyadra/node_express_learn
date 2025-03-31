import Joi from 'joi';
export const userSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  userName: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  address: {
    addressLine: Joi.string().max(50).required(),
    state: Joi.string().max(15).required(),
    country: Joi.string().max(20).required(),
    zipCode: Joi.string().max(7).required()
  },
  phone: Joi.string()
    .length(10)
    .pattern(/[6-9]{1}[0-9]{9}/)
    .required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9@]{3,30}$'))
});
