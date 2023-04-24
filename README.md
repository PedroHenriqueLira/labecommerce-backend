<h1  align="center">Projeto-LabeCommerce</h1>

Este projeto consiste em uma API de comércio eletrônico desenvolvida em NodeJS e TypeScript, utilizando Express, Knex e SQLite como principais ferramentas. Com ele, é possível realizar diversas funcionalidades, como cadastrar e buscar usuários, cadastrar, buscar e editar produtos, cadastrar compras e buscar informações sobre compras específicas.

A base de dados é gerenciada pelo Knex, que utiliza o SQLite como banco de dados. Além disso, o projeto conta com uma documentação clara e objetiva, que descreve as funcionalidades disponíveis e como utilizá-las, facilitando assim o desenvolvimento e a integração com outras aplicações.

Funcionalidades
A coleção LabeCommerce no Postman é uma coleção de endpoints de API para gerenciar uma plataforma de comércio eletrônico. Ela oferece uma gama completa de endpoints para gerenciar usuários, produtos e compras, permitindo que desenvolvedores e outras partes interessadas interajam com a plataforma por meio de chamadas de API bem definidas.

Segue abaixo uma lista com as principais funcionalidades da coleção LabeCommerce:

**`Get All Users:`** retorna todos os usuários cadastrados no sistema;
**`Create User`**: cria um novo usuário na plataforma;
**`Create Product:`** permite criar um novo produto na plataforma;
**`Get all products 1:`** retorna todos os produtos disponíveis na plataforma;
**`Get all products 2:`** (search product by name): retorna todos os produtos que correspondem ao nome do produto especificado;
**`Edit product by id:`** permite atualizar as informações de um produto existente com base no ID do produto;
Create Purchase: permite criar uma nova compra de um ou mais produtos;
Delete purchase by id: permite excluir uma compra existente com base no ID da compra;
**`Get Purchase by id:`** retorna informações sobre uma compra existente com base no ID da compra especificada.
A documentação completa está disponível neste link.
https://documenter.getpostman.com/view/26465389/2s93Y5Neez

Tecnologias utilizadas
O projeto foi construído utilizando as seguintes tecnologias:

NodeJS: plataforma de desenvolvimento de software para construir aplicativos escaláveis em JavaScript;
TypeScript: superset do JavaScript que adiciona tipos estáticos opcionais à linguagem;
Express: framework de aplicativo para NodeJS que fornece uma camada abstrata para lidar com as solicitações HTTP;
SQL e SQLite: linguagens de consulta estruturada e um banco de dados relacional embutido, respectivamente, usados para gerenciar a persistência de dados do projeto;
Knex: biblioteca de construção de consultas SQL para NodeJS que suporta vários bancos de dados;
Postman: ambiente de desenvolvimento de API que permite testar APIs e criar solicitações HTTP.
Instalação
Para instalar o projeto e suas dependências, siga as seguintes etapas:

Faça o download do NodeJS em https://nodejs.org/en/download/ e instale-o seguindo as instruções do instalador;
Abra o terminal ou prompt de comando e digite o comando npm install -g typescript. Isso instalará o TypeScript globalmente em sua máquina;
Crie uma pasta para o projeto e abra o terminal

**Criação do projeto**: crie uma pasta para o projeto e abra o terminal ou prompt de comando na pasta criada. Em seguida, digite o comando `npm init -y`. Isso criará um arquivo package.json padrão na pasta do projeto.

  

**Instalação do Express e SQLite**: digite o comando `npm install express sqlite3 @types/express @types/sqlite3` no terminal ou prompt de comando na pasta do projeto.

  

**Instalação do Knex**: digite o comando `npm install knex @types/knex sqlite3` no terminal ou prompt de comando na pasta do projeto.  

**Configuração do Knex**: crie um arquivo knexfile.js na raiz do projeto com as configurações do banco de dados. Em seguida, crie um arquivo database.ts na pasta src com as configurações do Knex para acessar o banco de dados.  

**Instalação do Postman**: faça o download e instale o Postman em https://www.postman.com/downloads/.
