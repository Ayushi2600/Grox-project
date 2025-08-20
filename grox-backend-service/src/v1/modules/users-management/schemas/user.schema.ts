import Joi from "joi";

const createUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const updateUserSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().optional(),
  nationality: Joi.string().optional(),
  phoneNumber: Joi.string().optional(),
  countryCode: Joi.string().optional(),
});

export { createUserSchema, updateUserSchema };
