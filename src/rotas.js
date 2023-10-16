const express = require('express')
const { cadastrarUsuario, loginUsuario, listarCategorias, detalharUsuario, editarUsuario } = require('./controladores/usuarios')
const validarUsuario = require('./intermediario/validacaoUsuario')
const schemaCadastro = require('./schemas/schemaCadastro')
const schemaLogin = require('./schemas/schemaLogin')
const validarToken = require('./intermediario/autenticacao')

const rotas = express()

rotas.get('/categoria', listarCategorias)
rotas.post('/usuario', validarUsuario(schemaCadastro), cadastrarUsuario)
rotas.post('/login', validarUsuario(schemaLogin), loginUsuario)

rotas.use(validarToken)

rotas.get('/usuario', detalharUsuario)
rotas.put('/usuario', validarUsuario(schemaCadastro), editarUsuario)



module.exports = rotas