const express = require('express')
const { cadastrarUsuario, loginUsuario } = require('./controladores/usuarios')
const { validarUsuario, emailSenhaPreenchido } = require('./intermediario/validacoes')

const rotas = express()

rotas.post('/usuario', validarUsuario, cadastrarUsuario)
rotas.post('/login', emailSenhaPreenchido, loginUsuario)


module.exports = rotas