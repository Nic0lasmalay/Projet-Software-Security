const Joi = require('joi');

const signupSchema = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string()
        .min(8)
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])'))
        .required()
        .messages({
            'string.pattern.base': 'Le mot de passe doit contenir une majuscule, une minuscule, un chiffre et un caractère spécial.',
            'string.min': 'Le mot de passe doit faire au moins 8 caractères.'
        })
});

module.exports = signupSchema;