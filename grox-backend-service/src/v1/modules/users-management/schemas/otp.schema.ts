import Joi from "joi";

const verifyOTPSchema = Joi.object({
  type: Joi.string().uppercase().valid("EMAIL", "PHONE").required(),
  code: Joi.string().required(),
});

const verifyUserIdSchema = Joi.object({
  userId: Joi.number().positive().required(),
});

const regenerateOTPSchema = Joi.object({
  email: Joi.string().email().required(),
  type: Joi.string().uppercase().valid("EMAIL", "PHONE").required(),
});

export { verifyOTPSchema, verifyUserIdSchema, regenerateOTPSchema };
