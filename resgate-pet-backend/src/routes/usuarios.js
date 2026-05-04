const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// GET - Listar todos os usuários
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM usuarios ORDER BY data_criacao DESC",
    );
    res.json(result.rows);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erro ao buscar usuários", detalhe: err.message });
  }
});

// GET - Buscar usuário por ID
router.get("/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM usuarios WHERE id = $1", [
      req.params.id,
    ]);
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Usuário não encontrado" });
    res.json(result.rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erro ao buscar usuário", detalhe: err.message });
  }
});

// POST - Cadastrar usuário
router.post("/", async (req, res) => {
  const { nome, watsapp, email } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO usuarios (nome, watsapp, email) VALUES ($1, $2, $3) RETURNING *",
      [nome, watsapp, email],
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erro ao cadastrar usuário", detalhe: err.message });
  }
});

// PUT - Atualizar usuário
router.put("/:id", async (req, res) => {
  const { nome, watsapp, email } = req.body;
  try {
    const result = await pool.query(
      "UPDATE usuarios SET nome = $1, watsapp = $2, email = $3 WHERE id = $4 RETURNING *",
      [nome, watsapp, email, req.params.id],
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Usuário não encontrado" });
    res.json(result.rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erro ao atualizar usuário", detalhe: err.message });
  }
});

// DELETE - Deletar usuário
router.delete("/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM usuarios WHERE id = $1", [req.params.id]);
    res.json({ mensagem: "Usuário deletado com sucesso" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erro ao deletar usuário", detalhe: err.message });
  }
});

module.exports = router;
