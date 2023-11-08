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
    }),
    createBookSchema: Joi.object({
        title: Joi.string().required().trim(),
        author: Joi.string().required().trim(),
        summary: Joi.string().required().trim()
    }),
    updateBookSchema: Joi.object({
        title: Joi.string().trim(),
        author: Joi.string().trim(),
        summary: Joi.string().trim()
    }),
}
