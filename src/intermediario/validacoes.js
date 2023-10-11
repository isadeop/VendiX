const validarUsuario = async (req, res, next) => {
  const { nome, email, senha } = req.body;

  if (!nome) {
    return res.status(400).json({ mensagem: "O campo nome é obrigatório" });
  }

  if (!email) {
    return res.status(400).json({ mensagem: "O campo email é obrigatório" });
  }

  if (!senha) {
    return res.status(400).json({ mensagem: "O campo senha é obrigatório" });
  }

  next();
};

const emailSenhaPreenchido = async (req, res, next) => {
  const { email, senha } = req.body

  if (!email || !senha) {
    return res.status(400).json({ mensagem: "Os campos email e senha são obrigatórios para a realização do login." })
  }
  next()
}


module.exports = {
  validarUsuario,
  emailSenhaPreenchido
}
