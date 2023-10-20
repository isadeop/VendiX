const knex = require('../conexão')


const cadastrarCliente = async (req, res) => {
  const { nome, email, cpf, rua, numero, bairro, cidade, estado, cep } = req.body
  try {

    const validarEmail = await knex('clientes').where({ email })
    if (validarEmail.length > 0) {
      return res.status(400).json({ mensagem: 'Já existe cliente cadastrado com o e-mail informado.' })
    }

    const validarCpf = await knex('clientes').where({ cpf })
    if (validarCpf.length > 0) {
      return res.status(400).json({ mensagem: 'Já existe cliente cadastrado com o CPF informado.' })
    }

    const novoCliente = await knex('clientes').insert({ nome, email, cpf, rua, numero, bairro, cidade, estado, cep }).returning('*')
    console.log(novoCliente)

    return res.status(201).json(novoCliente)

  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
  }
}

const editarCliente = async (req, res) => {
  const { nome, email, cpf } = req.body
  const { id } = req.params

  try {

    const clienteExiste = await knex('clientes').where({ id }).first()

    if (!clienteExiste) {
      return res.status(404).json({ mensagem: 'Cliente não encontrado.' })
    }

    const validarEmail = await knex('clientes').where({ email })
    if (validarEmail.length > 0) {
      return res.status(400).json({ mensagem: 'Já existe cliente cadastrado com o e-mail informado.' })
    }

    const validarCpf = await knex('clientes').where({ cpf })
    if (validarCpf.length > 0) {
      return res.status(400).json({ mensagem: 'Já existe cliente cadastrado com o CPF informado.' })
    }

    const clienteAtualizado = await knex('clientes').where({ id }).update({ nome, email, cpf }).returning('*')


    if (!clienteAtualizado) {
      return res.status(400).json({ mensagem: 'Os dados do cliente não foram atualizados.' })
    }
    return res.status(200).json({ mensagem: 'Dados do cliente atualizados com sucesso!' })

  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
  }
}

module.exports = {
  cadastrarCliente,
  editarCliente
}

