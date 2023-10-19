const knex = require('../conexão')


const cadastrarCliente = async (req, res) => {
  const { nome, email, cpf } = req.body
  try {

    const validarEmail = await knex('clientes').where({ email })
    if (validarEmail.length > 0) {
      return res.status(400).json({mensagem: 'Já existe cliente cadastrado com o e-mail informado.'})
    }

    const validarCpf = await knex('clientes').where({ cpf })
    if (validarCpf.length > 0) {
      return res.status(400).json({mensagem: 'Já existe cliente cadastrado com o CPF informado.'})
    }

    const novoCliente = await knex('clientes').insert({nome, email, cpf}).returning('*')
    console.log(novoCliente)
   
    return res.status(201).json(novoCliente)

  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor.'})
  }
}


module.exports = {
  cadastrarCliente
}

