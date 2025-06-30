# Desafio MB

## 🛠️ Como Rodar o Projeto

### Pré-requisitos

- Node.js v14+
- npm

### Clonando o Projeto

```bash
# Clone o repositório
git clone [URL_DO_REPOSITORIO]

# Entre na pasta do projeto
cd mb-web-test

# O projeto contém duas pastas principais:
# - frontend/  (Aplicação Vue.js)
# - backend/   (Servidor Node.js/Express)
```

### Instalando e Buildando o Frontend

```bash
# Entre na pasta do frontend
cd frontend

# Instale as dependências
npm install

# Faça o build do projeto
# Isso irá criar a pasta dist dentro de backend/public
npm run build
```

### Instalando e Rodando o Backend

```bash
# Entre na pasta do backend
cd ../backend

# Instale as dependências
npm install

# Inicie o servidor
node server.js
```

Após esses passos:

- O servidor estará rodando em http://localhost:3000
- O frontend buildado será servido automaticamente pelo backend
- Não é necessário rodar o servidor de desenvolvimento do frontend

## ℹ️ Observação para Teste

Foi implementada propositalmente uma diferença na validação de senha entre frontend e backend para demonstrar a importância da validação no lado do servidor:

- **Frontend**: Valida apenas letra maiúscula, número e caractere especial
- **Backend**: Valida letra maiúscula, letra minúscula, número e caractere especial

Isso permite que você teste se o backend está realmente validando os dados, independentemente das validações do frontend. Por exemplo, uma senha como "TESTE@123" passará na validação do frontend mas será rejeitada pelo backend por não conter letra minúscula.
