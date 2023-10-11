const express = require('express')
const { cadastrarUsuario, loginUsuario, listarCategorias, detalharUsuario } = require('./controladores/usuarios')
const { validarUsuario, emailSenhaPreenchido } = require('./intermediario/validacoes')
const validarToken = require('./intermediario/autenticacao')

const rotas = express()

rotas.get('/categorias', listarCategorias)
rotas.post('/usuario', validarUsuario, cadastrarUsuario)
rotas.post('/login', emailSenhaPreenchido, loginUsuario)

rotas.use(validarToken)

rotas.get('/usuario', detalharUsuario)


module.exports = rotas