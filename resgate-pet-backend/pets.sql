CREATE TABLE pets (
	id  SERIAL PRIMARY KEY,
	usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
	nome_pet VARCHAR(50),
	especie VARCHAR(50) NOT NULL,
	status VARCHAR(20) NOT NULL,
	localizacao TEXT NOT NULL,
	descricao TEXT,
	foto_url TEXT,
	data_postagem TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	
);


SELECT * FROM pets
