const knex = require("../conexão");

const cadastrarPedido = async (req, res) => {
  const { cliente_id, observacao, pedido_produtos } = req.body;

  try {
    if (pedido_produtos < 1) {
      return res
        .status(404)
        .json({ mensagem: "pedido precisa ter pelo menos um produto." });
    }
    const clienteExiste = await knex("clientes")
      .where({ id: cliente_id })
      .first();
    if (!clienteExiste) {
      return res.status(404).json({ mensagem: "Cliente não encontrado." });
    }

    for (let produto of pedido_produtos) {
      const produtoEncontrado = await knex("produtos").where({
        id: produto.produto_id,
      });
      if (produtoEncontrado.length === 0) {
        return res
          .status(404)
          .json({ mensagem: "produto solicitado não existe" });
      }
      if (
        produto.quantidade_produto > produtoEncontrado[0].quantidade_estoque
      ) {
        return res
          .status(400)
          .json({ mensagem: "não existe no estoque a quantidade solicitada" });
      }
    }

    for (let produto of pedido_produtos) {
      const [{ valor }] = await knex("produtos").where({
        id: produto.produto_id,
      });
      const pedido = await knex("pedidos")
        .returning("id")
        .insert({
          cliente_id,
          observacao,
          valor_total: valor * produto.quantidade_produto,
        }).returning('*');
      const pedidoProdutos = await knex("pedido_produtos").insert({
        pedido_id: pedido[0].id,
        produto_id: produto.produto_id,
        quantidade_produto: produto.quantidade_produto,
        valor_produto: valor
      });
      return res.status(201).json(pedido);
    }
   
    
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

const listarPedidos = async (req, res) => {
  const { cliente_id } = req.query;

  try {
    const pedidos = await knex("pedidos");
    if (!cliente_id) {
      return res.status(400).json(pedidos);
    }

    const clienteExiste = await knex("pedidos").where({ cliente_id }).first();
    if (!clienteExiste) {
      return res.status(404).json({ mensagem: "Cliente não encontrado." });
    }

    const listarPorCliente = await knex("pedidos").where({ cliente_id });

    return res.status(200).json(listarPorCliente);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};
module.exports = {
  cadastrarPedido,
  listarPedidos,
};
