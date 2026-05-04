const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// GET - Listar todos os lares
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM lares_temporarios ORDER BY data_cadastro DESC",
    );
    res.json(result.rows);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erro ao buscar lares", detalhe: err.message });
  }
});

// GET - Buscar lar por ID
router.get("/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM lares_temporarios WHERE id = $1",
      [req.params.id],
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Lar não encontrado" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar lar", detalhe: err.message });
  }
});

// POST - Cadastrar lar
router.post("/", async (req, res) => {
  console.log("📦 Dados recebidos:", req.body);
  const { usuario_id, capacidade, especies_aceitas, observacoes, disponivel } =
    req.body;
  try {
    const result = await pool.query(
      `INSERT INTO lares_temporarios (usuario_id, capacidade, especies_aceitas, observacoes, disponivel)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [
        usuario_id,
        capacidade,
        especies_aceitas,
        observacoes,
        disponivel ?? true,
      ],
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.log("❌ Erro SQL:", err.message);
    res
      .status(500)
      .json({ error: "Erro ao cadastrar lar", detalhe: err.message });
  }
});

// PUT - Atualizar lar
router.put("/:id", async (req, res) => {
  const { capacidade, especies_aceitas, observacoes, disponivel } = req.body;
  try {
    const result = await pool.query(
      `UPDATE lares_temporarios SET capacidade = $1, especies_aceitas = $2,
       observacoes = $3, disponivel = $4 WHERE id = $5 RETURNING *`,
      [capacidade, especies_aceitas, observacoes, disponivel, req.params.id],
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Lar não encontrado" });
    res.json(result.rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erro ao atualizar lar", detalhe: err.message });
  }
});

// DELETE - Deletar lar
router.delete("/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM lares_temporarios WHERE id = $1", [
      req.params.id,
    ]);
    res.json({ mensagem: "Lar deletado com sucesso" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erro ao deletar lar", detalhe: err.message });
  }
});

module.exports = router;
