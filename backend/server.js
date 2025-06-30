const express = require("express");
const path = require("path");
const { validateRegistration } = require("./validators/registration");

const app = express();
const PORT = 3000;

// Middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

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

  // Valida os dados
  const validation = validateRegistration(data);

  if (!validation.isValid) {
    return res.status(400).json({
      error: validation.errors.join("; "),
    });
  }

  return res
    .status(200)
    .json({ success: true, message: "Cadastro recebido com sucesso!" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
