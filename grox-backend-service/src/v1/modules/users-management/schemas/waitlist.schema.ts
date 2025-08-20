import Joi from "joi";

export const addToWaitlistSchema = Joi.object({
  firstName: Joi.string().min(2).optional(),
  lastName: Joi.string().min(2).optional(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().min(10).max(15).optional(),
  countryCode: Joi.string().min(1).max(4).optional(),
  nationality: Joi.string().min(2).optional(),
  country: Joi.string().min(2).optional(),
});
