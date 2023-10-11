require('dotenv').config()
const knex = require("../conexão");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


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

    return res.json({ usuarioLogado, token })

  } catch (error) {
    console.log(error)

    return res.status(500).json({ mensagem: "Erro interno do servidor" })
  }
}

module.exports = {
  cadastrarUsuario,
  loginUsuario
};
