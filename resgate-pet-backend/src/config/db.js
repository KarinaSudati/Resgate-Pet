const { Pool } = require("pg");
require("dotenv").config();

console.log("🔍 Conectando em:", {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
});

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false },
});

pool
  .connect()
  .then(() => console.log("✅ PostgreSQL conectado com sucesso!"))
  .catch((err) => console.error("❌ Erro ao conectar no banco:", err));

module.exports = pool;
