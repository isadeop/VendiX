const jwt = require('jsonwebtoken')
const knex = require('../conexão')

const validarToken = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ mensagem: 'O usuário não está autenticado!' })
  }

  try {
    const token = authorization.replace('Bearer ', '').trim()

    const { id } = jwt.verify(token, process.env.SENHA_JWT)

    const usuarioAutorizado = await knex("usuarios").where({ id }).first()

    if (!usuarioAutorizado) {
      return res.status(404).json({ mensagem: 'O usuário não está autenticado!' })
    }

    const { senha, ...usuario } = usuarioAutorizado

    req.usuario = usuario

    next()

  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
  }
}
module.exports = validarToken