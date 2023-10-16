const joi = require('joi')

const schemaLogin = joi.object({

    email: joi.required().messages({
        'any.required': 'O campo email e senha são obrigatórios para realizar o login!'
    }),

    senha: joi.string().min(6).required().messages({
        'any.required': 'O campo email e senha são obrigatórios para realizar o login!'
    })
})

module.exports = schemaLogin