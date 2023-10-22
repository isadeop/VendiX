const joi = require('joi')

const schemaCliente = joi.object({
    nome: joi.string().required().messages({
        'any.required': 'O campo nome é obrigatório!',
        'string.empty': 'O campo nome é obrigatório!',
    }),

    email: joi.string().email().required().messages({
        'string.email': 'O campo email precisa ter um formato válido!',
        'any.required': 'O campo email é obrigatório!',
        'string.empty': 'O campo email é obrigatório!',
    }),

    cpf: joi.number().min(11).required().messages({
        'any.required': 'O campo cpf é obrigatório!',
        'string.empty': 'O campo cpf é obrigatório!',
        'string.min': 'O cpf precisa conter 11 caracteres.',
    }),

    rua: joi.string().messages({'string.empty': 'O campo CPF é opcional!'}),
    numero: joi.string().messages({'string.empty': 'O campo número é opcional!'}),
    bairro: joi.string().messages({'string.empty': 'O campo bairro é opcional!'}),
    cidade: joi.string().messages({'string.empty': 'O campo cidade é opcional!'}),
    estado: joi.string().messages({'string.empty': 'O campo estado é opcional!'}),
    cep: joi.string().messages({'string.empty': 'O campo CEP é opcional!'}),
})

module.exports = schemaCliente