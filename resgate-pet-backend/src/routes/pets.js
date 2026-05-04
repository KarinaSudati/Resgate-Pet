const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// GET - Listar todos os pets
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM pets ORDER BY data_postagem DESC",
    );
    res.json(result.rows);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erro ao buscar pets", detalhe: err.message });
  }
});

// GET - Buscar pet por ID
router.get("/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM pets WHERE id = $1", [
      req.params.id,
    ]);
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Pet não encontrado" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar pet", detalhe: err.message });
  }
});

// POST - Cadastrar pet
router.post("/", async (req, res) => {
  const {
    usuario_id,
    nome_pet,
    especie,
    status,
    localizacao,
    descricao,
    foto_url,
  } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO pets (usuario_id, nome_pet, especie, status, localizacao, descricao, foto_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [usuario_id, nome_pet, especie, status, localizacao, descricao, foto_url],
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erro ao cadastrar pet", detalhe: err.message });
  }
});

// PUT - Atualizar pet
router.put("/:id", async (req, res) => {
  const { nome_pet, especie, status, localizacao, descricao, foto_url } =
    req.body;
  try {
    const result = await pool.query(
      `UPDATE pets SET nome_pet = $1, especie = $2, status = $3,
       localizacao = $4, descricao = $5, foto_url = $6 WHERE id = $7 RETURNING *`,
      [
        nome_pet,
        especie,
        status,
        localizacao,
        descricao,
        foto_url,
        req.params.id,
      ],
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Pet não encontrado" });
    res.json(result.rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erro ao atualizar pet", detalhe: err.message });
  }
});

// DELETE - Deletar pet
router.delete("/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM pets WHERE id = $1", [req.params.id]);
    res.json({ mensagem: "Pet deletado com sucesso" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erro ao deletar pet", detalhe: err.message });
  }
});

module.exports = router;
