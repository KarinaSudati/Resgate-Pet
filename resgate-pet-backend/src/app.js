const express = require("express");
const cors = require("cors");

const usuariosRoutes = require("./routes/usuarios");
const petsRoutes = require("./routes/pets");
const laresRoutes = require("./routes/larestemporarios");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/usuarios", usuariosRoutes);
app.use("/pets", petsRoutes);
app.use("/lares-temporarios", laresRoutes);

app.get("/", (req, res) => {
  res.json({ status: "Resgate Pet API rodando 🐾" });
});

module.exports = app;
