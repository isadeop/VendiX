const express = require('express')
const { cadastrarUsuario, loginUsuario, listarCategorias, detalharUsuario, editarUsuario } = require('./controladores/usuarios')
const validacao = require('./intermediario/validacao')
const schemaCadastroUsuario = require('./schemas/schemaCadastroUsuario')
const schemaLogin = require('./schemas/schemaLogin')
const validarToken = require('./intermediario/autenticacao')
const schemaProduto = require('./schemas/schemaProduto')
const { cadastrarProduto, excluirProduto, detalharProduto, listarProdutos, editarProduto } = require('./controladores/produtos')
const schemaCliente = require('./schemas/schemaCliente')
const { cadastrarCliente, editarCliente, listarCliente, detalharCliente } = require('./controladores/clientes')
const { cadastrarPedido, listarPedidos } = require('./controladores/pedidos')
const schemaPedido = require('./schemas/schemaPedido')
// const { enviarEmail } = require('./controladores/email')


const rotas = express()

rotas.get('/categoria', listarCategorias)
rotas.post('/usuario', validacao(schemaCadastroUsuario), cadastrarUsuario)
rotas.post('/login', validacao(schemaLogin), loginUsuario)

rotas.use(validarToken)

rotas.get('/usuario', detalharUsuario)
rotas.put('/usuario', validacao(schemaCadastroUsuario), editarUsuario)

rotas.post('/produto', validacao(schemaProduto), cadastrarProduto)
rotas.put('/produto/:id', validacao(schemaProduto), editarProduto)
rotas.get('/produto', listarProdutos)
rotas.get('/produto/:id', detalharProduto)
rotas.delete('/produto/:id', excluirProduto)

rotas.post('/cliente', validacao(schemaCliente), cadastrarCliente)
rotas.put('/cliente/:id', validacao(schemaCliente), editarCliente)
rotas.get('/cliente', listarCliente)
rotas.get('/cliente/:id', detalharCliente)

rotas.post('/pedido',validacao(schemaPedido),cadastrarPedido)
rotas.get('/pedido', listarPedidos)

// rotas.post('/email', enviarEmail)


module.exports = rotas