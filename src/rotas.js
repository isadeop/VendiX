const express = require('express')
const { cadastrarUsuario } = require('./controladores/usuarios')
const validarUsuario = require('./intermediario/validarUsuario')

const rotas = express()

rotas.post('/usuario',validarUsuario, cadastrarUsuario)


module.exports = rotas