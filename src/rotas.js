const express = require('express')
const { cadastrarUsuario, loginUsuario, listarCategorias, detalharUsuario, editarUsuario } = require('./controladores/usuarios')
const validarUsuario = require('./intermediario/validacaoUsuario')
const schemaCadastroUsuario = require('./schemas/schemaCadastroUsuario')
const schemaLogin = require('./schemas/schemaLogin')
const validarToken = require('./intermediario/autenticacao')
const schemaCadastroProduto = require('./schemas/schemaCadastroProduto')
const { cadastrarProduto, excluirProduto, detalharProduto } = require('./controladores/produtos')
const schemaCadastroCliente = require('./schemas/schemaCadastroCliente')
const { cadastrarCliente, editarCliente, listarClientes } = require('./controladores/clientes')

const rotas = express()

rotas.get('/categoria', listarCategorias)
rotas.post('/usuario', validarUsuario(schemaCadastroUsuario), cadastrarUsuario)
rotas.post('/login', validarUsuario(schemaLogin), loginUsuario)

rotas.use(validarToken)

rotas.get('/usuario', detalharUsuario)
rotas.put('/usuario', validarUsuario(schemaCadastroUsuario), editarUsuario)

rotas.post('/produto', validarUsuario(schemaCadastroProduto), cadastrarProduto)
rotas.delete('/produto/:id', excluirProduto)
rotas.get('/produto/:id', detalharProduto)


rotas.post('/cliente', validarUsuario(schemaCadastroCliente), cadastrarCliente)
rotas.put('/cliente/:id', validarUsuario(schemaCadastroCliente), editarCliente)
rotas.get('/cliente', listarClientes)


module.exports = rotas