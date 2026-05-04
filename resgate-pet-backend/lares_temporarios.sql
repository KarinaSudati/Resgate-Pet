CREATE TABLE lares_temporarios (
	id SERIAL PRIMARY KEY,
	usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
	capacidade INTEGER NOT NULL, 
	especies_aceitas VARCHAR(100),
	observacoes TEXT,
	disponivel BOOLEAN DEFAULT TRUE,
	data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM lares_temporarios

