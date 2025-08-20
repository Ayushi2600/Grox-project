import Joi from "joi";

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
});

export const resetPasswordSchema = Joi.object({
  type: Joi.string().valid("email", "phoneNumber").required(),

  email: Joi.string().email().when("type", {
    is: "email",
    then: Joi.required(),
    otherwise: Joi.forbidden(),
  }),

  phoneNumber: Joi.string()
    .when("type", {
      is: "phoneNumber",
      then: Joi.required(),
      otherwise: Joi.forbidden(),
    }),

  countryCode: Joi.string()
    .when("type", {
      is: "phoneNumber",
      then: Joi.required(),
      otherwise: Joi.forbidden(),
    }),
});

export const validateTokenSchema = Joi.object({
  otp: Joi.string().required(),
});

export const changePasswordSchema = Joi.object({
  token: Joi.string().required(),
  password: Joi.string().min(3).required(),
  verifyPassword: Joi.string().min(3).required(),
});
