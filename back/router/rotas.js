const express = require("express");
const Produtos = require("../models/produtos");
const User = require("../models/User");
const PDFDocument = require("pdfkit");
const rotas = express.Router();

rotas.use(express.json());
rotas.use(express.urlencoded({ extended: true }));

// Middleware para verificar autenticação
function verificarAutenticacao(req, res, next) {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res.status(401).json({ message: "Acesso negado" });
  }
  User.findOne({ where: { email, senha } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "Acesso negado" });
      }
      req.user = user;
      next();
    })
    .catch((err) =>
      res.status(500).json({ message: "Erro ao autenticar usuário" })
    );
}

// Middleware para verificar acesso de gerente
function acessoGerente(req, res, next) {
  if (req.user.acesso !== "gerente") {
    return res.status(403).json({ message: "Acesso gerente negado" });
  }
  next();
}

// Middleware para verificar acesso de administrador
function acessoAdministrador(req, res, next) {
  if (req.user.acesso !== "administrador" && req.user.acesso !== "gerente") {
    return res.status(403).json({ message: "Acesso administrador negado" });
  }
  next();
}

// Middleware para verificar acesso de caixa
function acessoCaixa(req, res, next) {
  if (
    req.user.acesso !== "caixa" &&
    req.user.acesso !== "administrador" &&
    req.user.acesso !== "gerente"
  ) {
    return res.status(403).json({ message: "Acesso caixa negado" });
  }
  next();
}

// Rota de login
rotas.post("/login", async (req, res) => {
  const { email, senha } = req.body;
  try {
    const user = await User.findOne({ where: { email, senha } });
    if (user) {
      req.user = user;
      res
        .status(200)
        .json({ message: "Login bem-sucedido", acesso: user.acesso });
    } else {
      res.status(401).json({ message: "Usuário ou senha incorretos" });
    }
  } catch (error) {
    res.status(500).send("Erro de autenticação de usuário");
  }
});

// Rota para renderizar uma resposta simples
rotas.get("/cadastro", async (req, res) => {
  try {
    res.send("<h1>Deu certo</h1>");
  } catch (error) {
    res.status(500).send("Erro ao carregar a página");
  }
});

// Rota para criar um novo usuário
rotas.post("/cadastro", async (req, res) => {
  const { nome, email, senha, acesso } = req.body;
  try {
    const novoUsuario = await User.create({ nome, email, senha, acesso });
    res.status(201).json({ message: "Usuário criado com sucesso" });
  } catch (error) {
    console.log("Erro ao criar um usuário", error);
    res.status(500).send("Erro ao criar usuários");
  }
});

// Rota para listar todos os usuários
rotas.get("/api/cadastro", async (req, res) => {
  try {
    const usuarios = await User.findAll();
    res.json(usuarios);
  } catch (error) {
    console.log("Erro ao trazer usuários", error);
    res.status(500).send("Erro ao trazer usuários");
  }
});

// Rota para obter um usuário pelo ID
rotas.get("/cadastro/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await User.findByPk(id);
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ message: "Usuário não encontrado" });
    }
  } catch (error) {
    console.log("Erro ao trazer o usuário", error);
    res.status(500).send("Erro ao trazer o usuário");
  }
});

// Rota de home
rotas.get("/home", async (req, res) => {
  try {
    res.status(200).json({ message: "Bem-vindo à Home" });
  } catch (error) {
    console.log("Erro na rota /home: ", error);
    res.status(500).send("Erro ao chamar a rota");
  }
});

// Rota para acessar a página de produtos
rotas.get("/produtos", async (req, res) => {
  try {
    res.status(200).json({ message: "Bem-vindo à página de produtos" });
  } catch (error) {
    console.log("Erro na rota /produtos: ", error);
    res.status(500).send("Erro ao chamar a rota");
  }
});

// Rota para listar todos os produtos
rotas.get("/api/produtos", async (req, res) => {
  try {
    const produtos = await Produtos.findAll();
    res.json(produtos);
  } catch (error) {
    console.log("Erro na rota /api/produtos: ", error);
    res.status(500).send("Erro ao chamar a rota");
  }
});

// Rota para listar todos os usuários
rotas.get("/api/usuarios", async (req, res) => {
  try {
    const usuarios = await User.findAll();
    res.json(usuarios);
  } catch (error) {
    console.log("Erro na rota /api/usuarios: ", error);
    res.status(500).send("Erro ao chamar a rota");
  }
});

// Rota para criar produtos
rotas.post("/produtos/create", async (req, res) => {
  const { codigo, nome, preco } = req.body;
  try {
    const novoProduto = await Produtos.create({ codigo, nome, preco });
    res
      .status(201)
      .json({ message: "Produto criado com sucesso", produto: novoProduto });
  } catch (error) {
    console.log("Erro ao criar produto", error);
    res.status(500).json({ message: "Erro ao criar produto" });
  }
});

// Rota para excluir produtos
rotas.delete("/produtos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const produto = await Produtos.findByPk(id);
    if (!produto) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    await produto.destroy();
    res.status(200).json({ message: "Produto excluído com sucesso" });
  } catch (error) {
    console.log("Erro ao excluir produto", error);
    res.status(500).json({ message: "Erro ao excluir produto" });
  }
});

// Rota para acessar a página de relatórios
rotas.get("/relatorios", async (req, res) => {
  try {
    res.status(200).json({ message: "Bem-vindo à página de relatórios" });
  } catch (error) {
    console.log("Erro na rota /relatorios: ", error);
    res.status(500).send("Erro ao chamar a rota");
  }
});
rotas.get("/relatorios/produtos", async (req, res) => {
  try {
    const produtos = await Produtos.findAll();
    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Relatorio_Produtos.pdf"
    );

    doc.pipe(res);

    doc.fontSize(20).text("Relatório de Produtos", { align: "center" });
    doc.moveDown();

    produtos.forEach((produto) => {
      doc.fontSize(12).text(`Código: ${produto.codigo}`);
      doc.text(`Nome: ${produto.nome}`);
      doc.text(`Preço: R$ ${produto.preco}`);
      doc.moveDown();
    });

    doc.end();
  } catch (error) {
    console.log("Erro ao gerar relatório de produtos: ", error);
    res.status(500).send("Erro ao gerar relatório de produtos");
  }
});

// Rota para gerar relatório de usuários em PDF
rotas.get("/relatorios/usuarios", async (req, res) => {
  try {
    const usuarios = await User.findAll();
    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Relatorio_Usuarios.pdf"
    );

    doc.pipe(res);

    doc.fontSize(20).text("Relatório de Usuários", { align: "center" });
    doc.moveDown();

    usuarios.forEach((usuario) => {
      doc.fontSize(12).text(`ID: ${usuario.id}`);
      doc.text(`Nome: ${usuario.nome}`);
      doc.text(`Email: ${usuario.email}`);
      doc.text(`Acesso: ${usuario.acesso}`);
      doc.moveDown();
    });

    doc.end();
  } catch (error) {
    console.log("Erro ao gerar relatório de usuários: ", error);
    res.status(500).send("Erro ao gerar relatório de usuários");
  }
});

module.exports = rotas;
