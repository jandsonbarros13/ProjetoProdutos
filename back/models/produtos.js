// models/produtos.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Produtos = sequelize.define("Produtos", {
  codigo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = Produtos;
