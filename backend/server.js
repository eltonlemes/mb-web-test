const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json()); // Para receber JSON no body

app.get("/registration", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/registration", async (req, res) => {
  const data = req.body;
  if (!data) {
    return res.status(400).json({ error: "Dados não enviados" });
  }

  // Simula processamento de 5 segundos
  await new Promise((resolve) => setTimeout(resolve, 5000));

  // Funções de validação
  function isEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  function isCPF(cpf) {
    return /^\d{11}$/.test(cpf);
  }
  function isCNPJ(cnpj) {
    return /^\d{14}$/.test(cnpj);
  }
  function isDate(date) {
    return /^\d{4}-\d{2}-\d{2}$/.test(date);
  }
  function isTelefone(tel) {
    return /^\d{10,}$/.test(tel);
  }

  // Validação comum
  if (!data.email || !isEmail(data.email)) {
    return res.status(400).json({ error: "E-mail inválido ou não informado" });
  }
  if (!data.senha || data.senha.length < 6) {
    return res
      .status(400)
      .json({ error: "Senha deve ter pelo menos 6 caracteres" });
  }
  if (!data.tipoCadastro || !["PF", "PJ"].includes(data.tipoCadastro)) {
    return res.status(400).json({ error: "Tipo de cadastro inválido" });
  }

  if (data.tipoCadastro === "PF") {
    if (!data.nome || data.nome.trim().length < 3) {
      return res.status(400).json({
        error: "Nome é obrigatório e deve ter pelo menos 3 caracteres",
      });
    }
    if (!data.cpf || !isCPF(data.cpf)) {
      return res
        .status(400)
        .json({ error: "CPF inválido ou não informado (apenas números)" });
    }
    if (!data.dataNascimento || !isDate(data.dataNascimento)) {
      return res.status(400).json({
        error: "Data de nascimento inválida ou não informada (YYYY-MM-DD)",
      });
    }
    if (!data.telefone || !isTelefone(data.telefone)) {
      return res.status(400).json({
        error: "Telefone inválido ou não informado (mínimo 10 dígitos)",
      });
    }
  } else if (data.tipoCadastro === "PJ") {
    if (!data.razaoSocial || data.razaoSocial.trim().length < 3) {
      return res.status(400).json({
        error: "Razão social é obrigatória e deve ter pelo menos 3 caracteres",
      });
    }
    if (!data.cnpj || !isCNPJ(data.cnpj)) {
      return res
        .status(400)
        .json({ error: "CNPJ inválido ou não informado (apenas números)" });
    }
    if (!data.dataAbertura || !isDate(data.dataAbertura)) {
      return res.status(400).json({
        error: "Data de abertura inválida ou não informada (YYYY-MM-DD)",
      });
    }
    if (!data.telefonePJ || !isTelefone(data.telefonePJ)) {
      return res.status(400).json({
        error: "Telefone inválido ou não informado (mínimo 10 dígitos)",
      });
    }
  }

  return res
    .status(200)
    .json({ success: true, message: "Cadastro recebido com sucesso!" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
