CREATE TABLE usuario 
( 
 id serial PRIMARY KEY,  
 nome VARCHAR(50) NOT NULL,
 cpf VARCHAR(30) NOT NULL,  
 email VARCHAR(50) NOT NULL,
 senha VARCHAR(50) NOT NULL,
 endereco varchar(50) Not null,
 dt_nascimento DATE NOT NULL,
 sexo CHAR(10) NOT NULL,
 telefone VARCHAR(30) NOT NULL,  
 tipo VARCHAR(30) 
);


CREATE TABLE itemPedido 
( 
 id SERIAL PRIMARY KEY, 
 quantidade INT,  
 preco_unitario FLOAT NOT NULL,  
 pedidoId int NOT NULL,    
 produtoId INT not null 
);


CREATE TABLE Pedido 
( 
 id SERIAL PRIMARY KEY, 
 quantidade INT,  
 valorTotal FLOAT NOT NULL,
 data_Pedido Date not Null,
 produtoId INT not null,
 usuarioId int not null
);

CREATE TABLE categoria 
( 
 id SERIAL PRIMARY KEY, 
 nome VARCHAR(100) NOT NULL
);


CREATE TABLE produto (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco NUMERIC(10,2),
    categoriaId INTEGER REFERENCES categoria(id),
	usuarioId int not null REFERENCES usuario (id),
    imagem_url VARCHAR(255)
);

ALTER TABLE itempedido ADD FOREIGN KEY(pedidoId) REFERENCES pedido (id)
ALTER TABLE itempedido ADD FOREIGN KEY(produtoId) REFERENCES produto (id)
ALTER TABLE produto ADD FOREIGN KEY(categoriaId) REFERENCES categoria (id)
ALTER TABLE produto ADD FOREIGN KEY(usuarioId) REFERENCES usuario (id)
ALTER TABLE pedido ADD FOREIGN KEY(usuarioId) REFERENCES usuario (id)
ALTER TABLE pedido ADD FOREIGN KEY(produtoId) REFERENCES produto (id)	

alter table usuario Rename Column status to tipo
alter table produto Rename Column descricao to marca

SELECT * FROM usuario ORDER BY id