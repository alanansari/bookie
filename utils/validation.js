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
        name: Joi.string().required().min(2).max(50),
        email: Joi.string().required().trim().email(),
        password: Joi.string().required().min(6),
        otp: Joi.string().required().length(6)
    }),
    createBookSchema: Joi.object({
        title: Joi.string().required().trim().min(1),
        author: Joi.string().required().trim().min(2).max(50),
        summary: Joi.string().required().trim()
    }),
    updateBookSchema: Joi.object({
        title: Joi.string().trim().min(1),
        author: Joi.string().trim().min(1),
        summary: Joi.string().trim()
    })
}
