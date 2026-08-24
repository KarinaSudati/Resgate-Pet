const express = require("express");
const cors = require("cors");

const usuariosRoutes = require("./routes/usuarios");
const petsRoutes = require("./routes/pets");
const laresRoutes = require("./routes/larestemporarios");
const pool = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/usuarios", usuariosRoutes);
app.use("/pets", petsRoutes);
app.use("/lares-temporarios", laresRoutes);

app.get("/", (req, res) => {
  res.json({ status: "Resgate Pet API rodando 🐾" });
});

// Rota para manter o banco de dados (Supabase) e o servidor (Render) acordados
app.get("/ping-db", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "Banco de dados e servidor ativos! 🚀" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao conectar no banco", detalhe: err.message });
  }
});

module.exports = app;
