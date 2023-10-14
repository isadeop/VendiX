const knex = require("../conexão");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");


const listarCategorias = async (req, res) => {

  try {


    const query = await knex("categorias")

    return res.status(200).json(query)

  } catch (error) {

    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
}


const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const validarEmail = await knex("usuarios").where({ email });

    if (validarEmail.length > 0) {
      return res
        .status(403)
        .json({
          mensagem: "Já existe usuário cadastrado com o e-mail informado.",
        });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const novoUsuario = await knex("usuarios")
      .insert({ nome, email, senha: senhaCriptografada })
      .returning("*");

    return res.status(201).json(novoUsuario[0]);
  } catch (error) {
    console.error(error.message);
  }
};

const loginUsuario = async (req, res) => {
  const { email, senha } = req.body

  try {
    const usuario = await knex('usuarios').where({ email }).first()

    if (!usuario) {
      return res.status(404).json({ mensagem: "O usuário não pode ser encontrado." })
    }

    const { senha: senhaCadastrada, ...usuarioLogado } = usuario

    const senhaCorreta = await bcrypt.compare(senha, senhaCadastrada)

    if (!senhaCorreta) {
      return res.status(400).json({ mensagem: "Email ou senha inválidos." })
    }

    const token = jwt.sign({ id: usuario.id }, process.env.SENHA_JWT, { expiresIn: '8h' })

    return res.status(200).json({ usuario: usuarioLogado, token })

  } catch (error) {

    console.log(error)
    return res.status(500).json({ mensagem: "Erro interno do servidor" })

  }
}
const detalharUsuario = async (req, res) => {

  return res.status(200).json(req.usuario)

}

const editarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  const { id } = req.usuario

  try {

    if (email !== req.usuario.email) {
      const emailUsuarioExiste = await knex("usuarios").where({ email }).first();

      if (emailUsuarioExiste) {
        return res.status(404).json('Já existe usuário cadastrado com o e-mail informado.')
      }
    }

    const usuarioExiste = await knex('usuarios').where({ id }).first();

    if (!usuarioExiste) {
      return res.status(404).json('Usuario não encontrado');
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const usuarioAtualizado = await knex("usuarios")
      .where({ id })
      .update({ nome, email, senha: senhaCriptografada })
      .returning("*");

    if (!usuarioAtualizado) {
      return res.status(400).json('O usuario não foi atualizado')
    }

    return res.status(201).json('Usuario Atualizado com sucesso');
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ mensagem: "Erro interno do servidor" })
  }
};


module.exports = {
  listarCategorias,
  cadastrarUsuario,
  loginUsuario,
  detalharUsuario,
  editarUsuario
};
