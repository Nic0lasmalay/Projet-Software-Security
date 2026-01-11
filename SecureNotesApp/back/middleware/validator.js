const Joi = require('joi');

const signupSchema = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string()
        .min(8)
        .pattern(/[a-z]/, 'lowercase')
        .pattern(/[A-Z]/, 'uppercase')
        .pattern(/[0-9]/, 'digit')
        .pattern(/[@$!%*?&]/, 'special')
        .required()
});
module.exports = signupSchema;
