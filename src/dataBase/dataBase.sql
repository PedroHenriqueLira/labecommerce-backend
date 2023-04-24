-- Active: 1680228171292@@127.0.0.1@3306


CREATE Table users(
id TEXT PRIMARY KEY  NOT NULL UNIQUE,
email TEXT NOT NULL UNIQUE,
password TEXT NOT NULL
);
CREATE TABLE users(
id TEXT PRIMARY KEY NOT NULL UNIQUE,
email TEXT NOT NULL UNIQUE,
password TEXT NOT NULL
);


CREATE TABLE products(
id TEXT PRIMARY KEY NOT NULL UNIQUE,
name TEXT NOT NULL,
price REAL NOT NULL,
category TEXT NOT NULL
);

SELECT * FROM users;
INSERT INTO users (id,name, email, password)
VALUES
("01", "pedro", "pedrohc@hotmail.com","123456"),
("02", "rayane","rayanek@hotmail.com", "654321"),
("03", "beltrano", "beltrano@email.com", "beltrano99");

--Criando uma tabela de produto
CREATE Table products(
id TEXT PRIMARY KEY NOT NULL UNIQUE,
name TEXT NOT NULL,
price REAL NOT NULL,
category TEXT NOT NULL
);

INSERT INTO products (id, name, price, description, "imageUrl")
VALUES
("pr03", "BBs 6MM", 100, "Airsoft","https://www.co2brasil.com.br/image/cache/catalog/produtos/airsoft/bbs/bbs-800x800.jpg"),
("pr04", "M4a4", 2500, "Airsoft","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQijCmWqhdhfgWzYuAlOF-hCdtjfF9sn_G9g&usqp=CAU"),
("pr05", "Tracer", 200, "Eletronicos","https://http2.mlstatic.com/D_NQ_NP_933285-MLB45867955837_052021-O.jpg"),
("pr06", "Magazine", 150, "Acessorios","https://d1bh8ymjsytgwi.cloudfront.net/Custom/Content/Products/36/49/airsoft-magazine-mag17-mid-cap-m16-m4-series-caa-m1.jpg"),
("pr07", "Mascara de proteção", 120, "Equipamento de proteção","https://m.media-amazon.com/images/I/61kdA5JUzcL._AC_SX522_.jpg");

----------------------------------------------------------------Aprofundamento SQL------------------------------------------------------------------
--Get All Users retorna todos os usuários cadastrados
SELECT * FROM users;

--Get All Products retorna todos os produtos cadastrados
SELECT * FROM products;

--Search Product by name, mocke um termo de busca, por exemplo "monitor", retorna o resultado baseado no termo de busca
SELECT * FROM products
WHERE name LIKE "Ma%";

--Create User mocke um novo usuário, insere o item mockado na tabela users
INSERT INTO users (id, name,email, password)
VALUES
("04", "oliveira", "oliveiracg@hotmail.com", "325687");

--Create Product mocke um novo produto, insere o item mockado na tabela products
INSERT INTO products (id, name, price, description, "imageUrl")
VALUES
("pr08", "Ak-47", 3600, "Airsoft", "https://d1qejy7034t4b2.cloudfront.net/Custom/Content/Products/10/46/rifle-de-airsoft-eletrico-aeg-ak47-alfa-%E2%80%93-qgk-s1.jpg");

--Get Products by id mocke uma id, busca baseada no valor mockado
SELECT * FROM products
WHERE id LIKE "pr08";

--Delete User by id mocke uma id, delete a linha baseada no valor mockado
DELETE FROM users
WHERE id = "04";

--Delete Product by id mocke uma id, delete a linha baseada no valor mockado
DELETE FROM products
WHERE id = "pr08";

--Edit User by id mocke valores para editar um user, edite a linha baseada nos valores mockados
UPDATE users 
SET 
    email = "pedrohc3@hotmail.com",
    password = "phc123456"
    WHERE id = "01";

--Edit Product by id mocke valores para editar um product, edite a linha baseada nos valores mockados

UPDATE products
SET 
    name = "luneta 8x",
    price = 500
    WHERE id = "pr05";

--Get All Users retorna o resultado ordenado pela coluna email em ordem crescente
SELECT * FROM users
ORDER BY email ASC;

--Get All Products versão 1
--retorna o resultado ordenado pela coluna price em ordem crescente
--limite o resultado em 20 iniciando pelo primeiro item
SELECT * FROM products
ORDER BY price ASC
LIMIT 20 OFFSET 0;

--Get All Products versão 2
--mocke um intervalo de preços, por exemplo entre 100.00 e 300.00
--retorna os produtos com preços dentro do intervalo mockado em ordem crescente
SELECT * FROM products
WHERE price >= 100 AND price <= 500;


----------------------------------------------------------------RElações em SQL I----------------------------------------------------------------------------------------------------------------
--nome da tabela: purchases
--colunas da tabela:
--id (TEXT, PK, único e obrigatório)
--total_price (REAL e obrigatório)
--paid (INTEGER e obrigatório)
--delivered_at (TEXT e opcional)
--buyer_id (TEXT, obrigatório e FK = referencia a coluna id da tabela users)


CREATE TABLE purchases(
    id TEXT PRIMARY KEY NOT NULL UNIQUE,
    total_price REAL NOT NULL,
    paid INTEGER NOT NULL,
    delivered_at TEXT,
    buyer_id TEXT NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users(id)
);

SELECT * FROM purchases;

DROP TABLE purchases;


--a) Crie dois pedidos para cada usuário cadastrado

INSERT INTO purchases (id, total_price, paid,delivered_at, buyer_id)
VALUES
("c01", 2500, false ,0 , "01"),
("c02", 100, false , 0 , "01"),
("c03", 200, false , 0 , "02"),
("c04", 150, false ,0 , "02"),
("c05", 120, false , 0 , "03"),
("c06", 100, false , 0 , "03");

SELECT*FROM purchases
INNER JOIN users
ON purchases.buyer_id = users.id;



--b) Edite o status da data de entrega de um pedido



UPDATE purchases
SET delivered_at = datetime('now', 'localtime')
WHERE id = 'c01';


--Crie a query de consulta utilizando junção para simular um endpoint de histórico de compras de um determinado usuário.
--Mocke um valor para a id do comprador, ela deve ser uma das que foram utilizadas no exercício 2.

SELECT 
purchases.id,
purchases.total_price,
purchases.paid,
purchases.delivered_at,
users.id 
FROM purchases
INNER JOIN users
ON purchases.buyer_id = users.id;


----------------------------------------------------------------RElações em SQL II----------------------------------------------------------------------------------------------------------------


--Criação da tabela de relações
--nome da tabela: purchases_products
--colunas da tabela:
--purchase_id (TEXT e obrigatório, não deve ser único)
--product_id (TEXT e obrigatório, não deve ser único)
--quantity (INTEGER e obrigatório, não deve ser único)
CREATE TABLE purchases_products(
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id)
    REFERENCES purchases (id),
    FOREIGN KEY (product_id) 
    REFERENCES products (id)
);
INSERT INTO purchases_products (purchase_id, product_id, quantity )
VALUES
("c01","pr03", "1");

SELECT * FROM purchases_products;
 DROP TABLE purchases_products;
--EXERCICIO 3

SELECT purchases_products.*, purchases.*, products.*
FROM purchases_products
INNER JOIN purchases ON purchases_products.purchase_id = purchases.id
INNER JOIN products ON purchases_products.product_id = products.id;

--Recriando a tabela users
CREATE Table users(
id TEXT PRIMARY KEY NOT NULL UNIQUE,
name TEXT NOT NULL,
email TEXT NOT NULL UNIQUE,
password TEXT NOT NULL,
createdAt TEXT NOT NULL DEFAULT (DATETIME())
);


SELECT * FROM users;
DROP TABLE users;
--Recriando a tabela de Products
CREATE Table products(
id TEXT PRIMARY KEY NOT NULL UNIQUE,
name TEXT NOT NULL UNIQUE,
price REAL NOT NULL,
description TEXT NOT NULL,
imageUrl TEXT NOT NULL
);
DROP TABLE products;
--Recriando a tabela Purchases
CREATE TABLE purchases(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer TEXT NOT NULL,
    totalPrice REAL NOT NULL,
    createdAt TEXT NOT NULL DEFAULT (datetime()),
    paid INTEGER NOT NULL DEFAULT '0',
    FOREIGN KEY (buyer) REFERENCES users(id)
);

INSERT INTO purchases (id,buyer ,totalPrice,createdAt, paid)
VALUES
("c02","01" , 2500, datetime('now', 'localtime') ,1 ),
("c03", "01",100, datetime('now', 'localtime') , 0),
("c04", "02",200, datetime('now', 'localtime') , 1 ),
("c05", "02",150, datetime('now', 'localtime') ,0 ),
("c06","03", 120, datetime('now', 'localtime') , 1 ),
("c07", "03",100, datetime('now', 'localtime') , 0);
SELECT * FROM purchases;

DROP TABLE purchases;

CREATE TABLE purchases_products(
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL DEFAULT '1',
    FOREIGN KEY (purchase_id) 
    REFERENCES purchases(id),
    FOREIGN KEY (product_id) 
    REFERENCES products(id)
);
SELECT *FROM purchases_products;
DROP TABLE purchases_products;


INSERT INTO purchases_products (purchase_id, product_id, quantity )
VALUES
("c02","pr03", 10),
("c02","pr02", 1);