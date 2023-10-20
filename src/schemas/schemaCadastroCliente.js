const joi = require('joi')

const schemaCadastroCliente = joi.object({
    nome: joi.string().required().messages({
        'any.required': 'O campo nome é obrigatório!',
        'string.empty': 'O campo nome é obrigatório!',
    }),

    email: joi.string().email().required().messages({
        'string.email': 'O campo email precisa ter um formato válido!',
        'any.required': 'O campo email é obrigatório!',
        'string.empty': 'O campo email é obrigatório!',
    }),

    cpf: joi.string().min(11).required().messages({
        'any.required': 'O campo cpf é obrigatório!',
        'string.empty': 'O campo cpf é obrigatório!',
        'string.min': 'O cpf precisa conter 11 caracteres .',
    }),

    rua: joi.string() ,
    numero: joi.string() ,
    bairro: joi.string(),
    cidade: joi.string(),
    estado: joi.string(),
    cep: joi.string()
})

module.exports = schemaCadastroCliente