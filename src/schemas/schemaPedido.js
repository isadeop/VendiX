const joi = require('joi')

const schemaPedido = joi.object({
    cliente_id: joi.number().required().messages({
        'any.required': 'O campo cliente_id é obrigatório!',
        'number.base': 'O campo cliente_id é obrigatório!',
    }),
    observacao: joi.string().messages({
        'string.empty': 'O campo observação é opcional e deve ter formato de texto!',
    }),
    pedido_produtos: joi.required().messages({
        'any.required': 'O campo pedido_produtos é obrigatório!',
    }),
})

module.exports = schemaPedido