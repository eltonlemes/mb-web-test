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
