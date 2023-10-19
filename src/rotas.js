const express = require('express')
const { cadastrarUsuario, loginUsuario, listarCategorias, detalharUsuario, editarUsuario } = require('./controladores/usuarios')
const validarUsuario = require('./intermediario/validacaoUsuario')
const schemaCadastroUsuario = require('./schemas/schemaCadastroUsuario')
const schemaLogin = require('./schemas/schemaLogin')
const validarToken = require('./intermediario/autenticacao')
const schemaCadastroProduto = require('./schemas/schemaCadastroProduto')
const { cadastrarProduto } = require('./controladores/produtos')

const rotas = express()

rotas.get('/categoria', listarCategorias)
rotas.post('/usuario', validarUsuario(schemaCadastroUsuario), cadastrarUsuario)
rotas.post('/login', validarUsuario(schemaLogin), loginUsuario)

rotas.use(validarToken)

rotas.get('/usuario', detalharUsuario)
rotas.put('/usuario', validarUsuario(schemaCadastroUsuario), editarUsuario)

rotas.post('/produto', validarUsuario(schemaCadastroProduto), cadastrarProduto)




module.exports = rotas