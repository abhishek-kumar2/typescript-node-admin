import { Joi } from "express-validation";

export const RegisterValidation = Joi.object({
    first_name: Joi.string()
        .min(3)
        .max(15)
        .required(),
    last_name: Joi.string()
        .min(3)
        .max(15)
        .required(),
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string()
        .regex(new RegExp(process.env.PASS_REGEX))
        .required(),
    confirm_password: Joi.string()
        .regex(new RegExp(process.env.PASS_REGEX))
        .required()
});
