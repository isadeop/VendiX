const knex = require("../conexão");
const bcrypt = require("bcrypt");

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const validarEmail = await knex("usuarios").where({ email });

    if (validarEmail) {
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

module.exports = {
  cadastrarUsuario,
};
