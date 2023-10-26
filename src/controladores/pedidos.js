const knex = require("../conexão");
const transportador = require('../arquivos_email/nodemailer')
const compiladorEmail = require('../arquivos_email/compiladorEmail')

const cadastrarPedido = async (req, res) => {
  const { cliente_id, observacao, pedido_produtos } = req.body;

  try {
    if (pedido_produtos < 1) {
      return res.status(404).json({ mensagem: "pedido precisa ter pelo menos um produto." });
    }

    const clienteExiste = await knex("clientes").where({ id: cliente_id }).first();
    if (!clienteExiste) {
      return res.status(404).json({ mensagem: "Cliente não encontrado." });
    }

    for (let produto of pedido_produtos) {
      const produtoEncontrado = await knex("produtos").where({id: produto.produto_id});
      if (produtoEncontrado.length === 0) {
        return res.status(404).json({ mensagem: "produto solicitado não existe" });
      }

      if (produto.quantidade_produto > produtoEncontrado[0].quantidade_estoque) {
        return res.status(400).json({ mensagem: "não existe no estoque a quantidade solicitada" });
        }
    }

    let valor_total = 0
    for(let produto of pedido_produtos ) {
      const [{valor}] = await knex("produtos").where({id: produto.produto_id,});
      valor_total += valor * produto.quantidade_produto
    }

    const pedido = await knex('pedidos').returning('id').insert({cliente_id, observacao, valor_total: valor_total})
    

    for(let produto of pedido_produtos ) {
        const [{valor}] = await knex("produtos").where({id: produto.produto_id});

        const pedidoProdutos = await knex('pedido_produtos').insert({
          pedido_id: pedido[0].id, produto_id: produto.produto_id,
          quantidade_produto: produto.quantidade_produto,
          valor_produto: valor
         }) 
        
      }

      const emailCliente = (await knex('clientes').select('email').where({id:cliente_id})).shift()
      const nomeCliente = (await knex('clientes').select('nome').where({id:cliente_id})).shift()

      const html = await compiladorEmail('./src/arquivos_email/pedido.html', {nomeCliente})
    
      transportador.sendMail({
        from: `${process.env.NAME_EMAIL} <${process.env.USER_EMAIL}>`,
        to: `${nomeCliente.nome} <${emailCliente.email}>`,
        subject: 'Pedido criado com sucesso!',
        html,
      })
    

      return res.status(201).json('O seu pedido foi criado com sucesso! Confira sua caixa de e-mail.');
  
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};


const listarPedidos = async (req, res) => {
  const { cliente_id } = req.query

  try {
    const pedidos = await knex('pedidos')
    if (!cliente_id) {
      return res.status(400).json(pedidos)
    }

    const clienteExiste = await knex('pedidos').where({ cliente_id }).first()
    if (!clienteExiste) {
      return res.status(404).json({ mensagem: 'Cliente não encontrado.' })
    }

    const listarPorCliente = await knex('pedidos').where({ cliente_id })

    return res.status(200).json(listarPorCliente)

  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
  }
}
module.exports = {
  cadastrarPedido,
  listarPedidos
};