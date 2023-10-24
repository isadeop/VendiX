const knex = require("../conexão")

const cadastrarPedido = async (req,res) => {
    const { cliente_id, observacao, pedido_produtos } = req.body
console.log(pedido_produtos);


}

module.exports = {
    cadastrarPedido
}