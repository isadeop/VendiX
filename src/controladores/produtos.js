const knex = require('../conexão')
const { uploadImagem} = require('../storage_arquivos')

const cadastrarProduto = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body

  try {

    const categoriaExiste = await knex('categorias').where({ id: categoria_id })
    if (categoriaExiste.length === 0) {
      return res.status(404).json({ mensagem: 'Não foi possível realizar o cadastro pois a categoria informada não foi encontrada.' })
    }

    const produtoCadastrado = await knex('produtos').insert({ descricao, quantidade_estoque, valor, categoria_id }).returning('*')
    return res.status(201).json(produtoCadastrado)

  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
  }
}

const editarProduto = async (req, res) => {
  const { id } = req.params
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body

  try {

    const produtoExiste = await knex('produtos').where({ id }).first()
    if (!produtoExiste) {
      return res.status(404).json({ mensagem: 'Produto não encontrado.' })
    }

    const categoriaExiste = await knex('produtos').where({ categoria_id }).first()
    if (!categoriaExiste) {
      return res.status(404).json({ mensagem: 'A categoria do produto não existe.' })
    }

    const produtoAtualizado = await knex('produtos').where({ id })
      .update({ descricao, quantidade_estoque, valor, categoria_id })
      .returning('*')

    return res.status(200).json({ mensagem: 'Produto atualizado com sucesso!' })

  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
  }
}

const listarProdutos = async (req, res) => {
  const { categoria_id } = req.query

  try {
    const produtos = await knex('produtos')

    if (!categoria_id) {
      return res.status(200).json(produtos)
    }

    const listarPorCategoria = await knex('produtos').where({ categoria_id })

    if(listarPorCategoria.length === 0){
      return res.status(404).json({mensagem: 'Categoria não encontrada.'})
    }

    return res.status(200).json(listarPorCategoria)

  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
  }
}

const detalharProduto = async (req, res) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({ mensagem: 'O envio do ID é obrigatório.' })
  }

  try {
    const produtoExiste = await knex('produtos').where({ id }).first()

    if (!produtoExiste) {
      return res.status(404).json({ mensagem: 'Produto não encontrado.' })
    }

    return res.status(200).json(produtoExiste)

  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
  }
}

const excluirProduto = async (req, res) => {
  const { id } = req.params

  try {
    
  if (!id) {
    return res.status(400).json({ mensagem: 'O envio do ID é obrigatório.' })
  }

  const existePedido = await knex('pedido_produtos').where({ produto_id: id })

  if (existePedido.length > 0) {
    return res.status(400).json({ mensagem: 'O produto não pode ser excluído pois existe um pedido aberto.' })
  }

    const produtoExiste = await knex('produtos').where({ id }).first()
    if (!produtoExiste) {
      return res.status(404).json({ mensagem: 'Produto não encontrado.' })
    }

    const excluirArquivo = await knex ('produtos').where({id}).update({produto_imagem : null}).delete()
   
    if(!excluirArquivo){
      return res.status(400).json({ mensagem: 'Não foi possível excluir o arquivo. Tente novamente.' })
    }

    return res.status(200).json({ mensagem: 'O produto foi excluído.' })

  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
  }
}

const cadastrarImagem = async (req, res) => {
  const { file} = req
  const{id} = req.body

  try {
    if(!id){
      return res.status(400).json({mensagem:'O id do produto é obrigatório.'})
    }
    const arquivo = await uploadImagem(
      `imagens/${file.originalname}`,
      file.buffer,
      file.mimetype
    )
  
    const imagem = await knex('produtos').update({ produto_imagem: arquivo.url }).where({ id }).returning('*')
    
    const existeProduto = await knex('produtos').where({id})

    if(existeProduto.length === 0){
      return res.status(404).json({mensagem:'Não existe produto cadastrado com esse id.'})
    }

    return res.status(201).json(imagem)

  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
}

module.exports = {
  cadastrarProduto,
  editarProduto,
  detalharProduto,
  listarProdutos,
  excluirProduto,
  cadastrarImagem
}
