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

  // Exemplo de validação: se for PF, nome não pode estar vazio
  if (data.tipoCadastro === "PF" && (!data.nome || data.nome.trim() === "")) {
    return res
      .status(400)
      .json({ error: "Nome é obrigatório para Pessoa Física" });
  }
  // Aqui você pode validar outros campos conforme necessário
  return res
    .status(200)
    .json({ success: true, message: "Cadastro recebido com sucesso!" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
