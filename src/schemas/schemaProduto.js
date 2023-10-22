const joi = require('joi')

const schemaProduto = joi.object({
    descricao: joi.string().required().messages({
        'any.required': 'O campo descrição é obrigatório!',
        'string.empty': 'O campo descrição é obrigatório!',
    }),

    quantidade_estoque: joi.number().integer().required().messages({
        'number.base': 'O campo quantidade_estoque precisa ter um formato válido (números inteiros).',
        'number.integer': 'O campo quantidade_estoque precisa ter um formato válido (números inteiros).',
        'any.required': 'O campo quantidade_estoque é obrigatório!',
    }),

    valor: joi.number().integer().required().messages({
        'number.base': 'O campo valor precisa ter um formato válido (número inteiro).',
        'number.integer': 'O campo valor precisa ter um formato válido (número inteiro).',
        'any.required': 'O campo valor é obrigatório!',
    }),

    categoria_id: joi.number().integer().required().messages({
        'number.base': 'O campo categoria_id precisa ter um formato válido (números inteiros).',
        'number.integer': 'O campo categoria_id precisa ter um formato válido (números inteiros).',
        'any.required': 'O campo categoria_id é obrigatório!',
    })
})

module.exports = schemaProduto