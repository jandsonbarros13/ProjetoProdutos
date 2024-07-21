// index.js
const express = require("express");
const cors = require("cors");
const rotas = require("./router/rotas");
const sequelize = require("./db");

const app = express();
const porta = 3000;

// Middleware para habilitar CORS e parsing de JSON
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Usar rotas
app.use("/", rotas);

// Iniciar o servidor
app.listen(porta, async () => {
  try {
    await sequelize.sync(); // Sincronizar o banco de dados
    console.log(`Servidor está rodando na porta ${porta}`);
  } catch (error) {
    console.error("Não foi possível sincronizar o banco de dados:", error);
  }
});
