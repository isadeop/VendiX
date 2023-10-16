const knex = require('../conexão')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const listarCategorias = async (req, res) => {
  try {
    const query = await knex('categorias')
    return res.status(200).json(query)

  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
  }
}


const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body
  try {
    const validarEmail = await knex('usuarios').where({ email })

    if (validarEmail.length > 0) {
      return res.status(400).json({mensagem: 'Já existe usuário cadastrado com o e-mail informado.'})
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10)
    const novoUsuario = await knex('usuarios').insert({nome, email, senha: senhaCriptografada}).returning(['nome','email'])

    return res.status(201).json(novoUsuario)

  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor.'})
  }
}

const loginUsuario = async (req, res) => {
  const { email, senha } = req.body

  try {
    const usuario = await knex('usuarios').where({ email }).first()

    if (!usuario) {
      return res.status(404).json({ mensagem: 'O usuário não pode ser encontrado.' })
    }

    const { senha: senhaCadastrada, ...usuarioLogado } = usuario
    const senhaCorreta = await bcrypt.compare(senha, senhaCadastrada)

    if (!senhaCorreta) {
      return res.status(401).json({ mensagem: 'Email ou senha inválidos.' })
    }

    const chaveSecreta = process.env.SENHA_JWT
    const token = jwt.sign({ id: usuario.id }, chaveSecreta, { expiresIn: '8h' })

    return res.status(200).json({ usuario: usuarioLogado, token })

  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor.'})
  }
}

const detalharUsuario = async (req, res) => {
  return res.status(200).json(req.usuario)
}

const editarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body
  const { id } = req.usuario

  try {
    const usuarioExiste = await knex('usuarios').where({ id }).first()

    if (!usuarioExiste) {
      return res.status(404).json({ mensagem:'Usuario não encontrado.'})
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10)

    if (email !== req.usuario.email) {
      const emailUsuarioExiste = await knex('usuarios').where({ email }).first()

      if (emailUsuarioExiste) {
        return res.status(400).json({ mensagem:'Já existe usuário cadastrado com o e-mail informado.'})
      }
    }

    const usuarioAtualizado = await knex('usuarios').where({ id }).update({ nome, email, senha: senhaCriptografada }).returning('*')

    if (!usuarioAtualizado) {
      return res.status(400).json({ mensagem:'O usuario não foi atualizado.'})
    }
    return res.status(200).json({ mensagem:'Usuario Atualizado com sucesso!'})

  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor.'})
  }
}


module.exports = {
  listarCategorias,
  cadastrarUsuario,
  loginUsuario,
  detalharUsuario,
  editarUsuario
}
