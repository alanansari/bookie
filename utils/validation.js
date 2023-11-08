const Joi = require("joi");

module.exports = {
    loginSchema : Joi.object({
        email: Joi.string().required().trim(),
        password: Joi.string().required()
    }),
    emailSchema : Joi.object({
        email: Joi.string().required().trim().email()
    }),
    signupSchema : Joi.object({
        name: Joi.string().required().min(3).max(30),
        email: Joi.string().required().trim().email(),
        password: Joi.string().required(),
        otp: Joi.string().required().length(6)
    })
}
