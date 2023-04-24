// import {
//     user,
//     product,
//     purchase,
//     createUser,
//     getAllUsers,
//     createProduct,
//     getAllProducts,
//     getProductById,
//     queryProductsByName,
//     createPurchase,
//     getAllPurchasesFromUserId,
// } from "./dataBase";

import { ProductCategory, TProduct, TPurchase, TUser } from "./type";
//e Response, sempre entre chaves {} 👇🏽
import express, { Request, Response } from "express";
//import do CORS 👇🏽
import cors from "cors";
import { db } from "./dataBase/knex";
import knex from "knex";

// console.table(user);
// console.table(product);
// console.table(purchase);

// //exemplo de chamada: createUser("u03", "beltrano@email.com", "beltrano99")
// console.table(createUser("u03", "beltrano@email.com", "beltrano99"));

// // exemplo de chamada: getAllUsers()
// console.table(getAllUsers());

// // exemplo de chamada: createProduct("i03", "bateria para glock", 200, PRODUCT_CATEGORY.ELECTRONICS)
// console.table(
//     createProduct("i03", "bateria para glock", 200, ProductCategory.ELETRONICS)
// );

// exemplo de chamada: getAllProducts()
// console.table(getAllProducts());

// // exemplo de chamada: getProductById("i04")
// console.table(getProductById("i03"));

// // exemplo de chamada: queryProductsByName("bateria para glock")
// console.table(queryProductsByName("bat"));

// // exemplo de chamada: createPurchase("u03", "i04", 2, 400)
// console.table(createPurchase("u03", "i04", 2, 400));

// // exemplo de chamada: getAllPurchasesFromUserId("u03")
// console.table(getAllPurchasesFromUserId("u03"));


//criação do servidor express 👇🏽
const app = express();
//no formato json 👇🏽
app.use(express.json());
//configuração do middleware que habilita o CORS 👇🏽
app.use(cors());
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});
//Crie um endpoint de teste
app.get("/ping", (req: Request, res: Response) => {
    res.send("Pong!");
});

//Agora crie endpoints para automatizar a manipulação dos dados do arquivo database.ts.
//Get All Users
// não precisa de validação, basta refatorar para o uso do try/catch
// app.get("/users", (req: Request, res: Response) => {
//     try {
//     const user = getAllUsers();
//     res.status(200).send(user);
//     } catch (error) {
//     res.status(500);
//     res.send(error.message);
//     }
// });
//Get All Products
// não precisa de validação, basta refatorar para o uso do try/catch
// app.get("/products", (req: Request, res: Response) => {
//     try {
//     const product = getAllProducts();
//     res.status(200).send(product);
//     } catch (error) {
//     res.status(500);
//     }
// });

//Search Product by name
//query params deve possuir pelo menos um caractere
// app.get("/products/search", (req: Request, res: Response) => {
//     try {
//     const q = req.query.q as string; // forçamos a tipagem aqui*
//     if (!q || q.trim().length < 1) {
//         throw new Error("Query param 'q' deve retornar pelo menos 1 caractere");
//     }
//     const result: TProduct[] = product.filter((product) =>
//     product.name.toLowerCase().includes(q.toLowerCase()));
//     res.status(200).send(result);
//     } catch (error) {
//     res.status(500).send(error.message);
//     }
// });

//Create User
//method HTTP (POST),method HTTP (POST), body: id, email, password  status 201 "Cadastro realizado com sucesso"
//validar o body
//extra:
//não deve ser possível criar mais de uma conta com a mesma id
//não deve ser possível criar mais de uma conta com o mesmo e-mail
// app.post("/users", (req: Request, res: Response) => {
//     try {
//     const id: string = req.body.id;
//     const email: string = req.body.email;
//     const password: string = req.body.password;
//     if (!id || !email || !password) {
//         throw new Error(
//         "O corpo da requição deve conter os cos 'id', 'email' e 'password'"
//         );
//     }
//     const userExist = user.find(
//         (user) => user.id === id || user.email === email
//     );

//     if (userExist) {
//         throw new Error(
//         "Não é possível criar mais de uma conta com o mesmo ID ou Email"
//         );
//     }
     const newUser: TUser = {
         name: "",
         date: 0,
         id: "",
         email: "",
         password: ""
     };
    //  user.push(newUser);
//     res.status(201).send("Cadastro realizado com sucesso");
//     } catch (error) {
//     res.status(500).send(error.message);
//     }
// });

//Exercício 2
//Create Product
//method HTTP (POST),path ("/products"), body: id, name, price, category.status 201 "Produto cadastrado com sucesso"
//validar o body
//não deve ser possível criar mais de um produto com a mesma id
// app.post("/products", (req: Request, res: Response) => {
//     try {
//     const id: string = req.body.id;
//     const name: string = req.body.name;
//     const price: number = req.body.price;
//     const category: string = req.body.category;
//     if (!id || !name || !price || !category) {
//         res.status(422) 
//         throw new Error("Product deve ter 'id', 'nome', 'price' e uma 'catgory'");
//         //res.status(422).send("Product deve ter 'id', 'nome', 'price' e uma 'catgory'")
//         //return 
//     }
//     const productExist = product.find((product) => product.id === id);
//     if (productExist) {
//         res.status(422)
//         throw new Error("Não é possível add um produto com o mesmo 'id'");
//     }
//     const newProduct: TProduct = {
//         id,
//         name,
//         price,
//         description: "",
//         imageUrl: ""
//     };
//     product.push(newProduct);
//     res.status(201).send("Produto cadastrado com sucesso");
//     } catch (error) {
//     res.send(error.message);
//     }
// });
//Exercício 3
//Create Purchase
//method HTTP (POST), path ("/purchases"), body: userId, productId, quantity, totalPrice. status 201 "Compra realizada com sucesso"
//validar o body
// app.post('/purchases', (req: Request, res: Response)=>{
//     try{
//     const userId = req.body.userId as string
//     const productId = req.body.productId as string
//     const quantity = req.body.quantity as number
//     const totalPrice = req.body.totalPrice as number

//     const userExists = user.find((user) => user.id === userId)
//     if(!userExists){
//         throw new Error ("Usuário não cadastrado")
//     }

//     const productExists = product.find((prod) => prod.id === prod.id)
//     if(!productExists){
//         throw new Error ("Produto não cadastrado")
//     }
    // logica para saber o valor dentro do array - testar para ver se funciona
//     const price = product.find((prod)=> prod.id === productId)?.price
//     if(!price){
//         throw new Error ("Preço não encontrado para o produto")        
//     }
//     console.log(price)

//     const calculateTotalPrice = quantity * price;
//     if (totalPrice !== calculateTotalPrice) {
//         throw new Error("o Preço total calculado está incorreto")
//     }

//     const newPurchase: TPurchase = {
//         id: "",
//         totalPrice,
//         buyer_id: "",
//         buyer_name: "",
//         createdAT: 0,
//         paid: false
//     }

//     purchase.push(newPurchase);    
//     res.status(200).send("Compra realizada com sucesso")
// } catch (e) {
//     console.log(e)
//     res.status(404).send(e.message)
// }   
// })
////////////////////////////////////////////////Aprofundamento Express///////////////////////////////////////////////
//Exercicio 01
//Get Products by id
// app.get("/product/:id", (req: Request, res: Response) => {
//     try {
//         const id:string = req.params.id;
//         const productById: TProduct = product.find((prod)=> prod.id === id);  
//         //validar que o produto existe  
//         if (!productById) {
//             throw new Error("Produto não encontrado");
//         }
//         res.status(200).send(productById);
//     } catch (error) {
//         res.status(404).send(error.message);
//     }
// })
//Get User Purchases by User id
// app.get("/user/:id/purchase", (req: Request, res: Response) => {
//     try{
//     const userId: string = req.params.id;
//     const getUserPurchasesByUserId: TPurchase = purchase.find((item) => item.userId === userId);
//     if(getUserPurchasesByUserId.length === 0){
//         throw new Error("Usuário não encontrado");
//     }
//     res.status(200).send(getUserPurchasesByUserId);
// } catch (error) {
//     res.status(404).send(error.message);
// }
// })
// app.get('/users/:id/purchases', (req: Request, res: Response)=>{
//     try {
//         const userId:string = req.params.id;
//         const getUserPurchasesByUserId: TPurchase[] = purchase.filter((purch)=> purch.id === userId);    
//         if (getUserPurchasesByUserId.length === 0) {
//             throw new Error("Usuário não encontrado");
//         }
//         res.status(200).send(getUserPurchasesByUserId);
//     } catch (error) {
//         res.status(404).send(error.message);
//     }
// })


// //Exercício 002
// //findIndex retorna apenas o valor do index
// //ao contrario do find que retorna {} inteiro
// //splice remove numeros especificos de um []
// //Delete User by id
// // validar que o usuário existe
// app.delete("/user/:id", (req: Request, res: Response) => {
//     try {
//         const id: string = req.params.id;
//         const userIndex: number = user.findIndex((user)=>user.id === id)
//         if(userIndex < 0) {
//             throw new Error("Usuário não encontrado");
//         }
//         user.splice(userIndex, 1)
//         res.status(200).send("Usuário apagado com sucesso");
//     } catch (error) {
//         res.status(404).send(error.message);
//     }
// })
//Delete Product by id
// validar que o produto existe
// app.delete("/product/:id", (req: Request, res: Response) => {
//     try {
//         const id: string = req.params.id;
//         const productIndex: number = product.findIndex((product)=>product.id === id)
//         if(productIndex < 0) {
//             throw new Error("Produto não encontrado");
//         }
//         product.splice(productIndex, 1)
//         res.status(200).send("Produto deletado com sucesso");
//     } catch (error) {
//         res.status(404).send(error.message);
//     }
// })

//Exercício 3
//Edit User by id
// validar que o usuário existe
// validar o body
// app.put("/user/:id", (req: Request, res: Response) => {
//     try {
//         const id: string = req.params.id
//         const editUserById: TUser = user.find((user) => user.id === id);
    
//         if (!editUserById) {
//             throw new Error("Usuário não encontrado")
//         }
    
//         const newEmail = req.body.email as string | undefined
//         const newPassword = req.body.password as string | undefined
    
//         if (!newEmail && !newPassword) {
//             throw new Error("Nenhum campo foi enviado para atualização")
//         }
    
//         if (newEmail) {
//             editUserById.email = newEmail
//         }
    
//         if (newPassword) {
//             editUserById.password = newPassword
//         }
    
//         res.status(200).send("Cadastro atualizado com sucesso")
//         } catch (error) {
//         console.log(error)
//         res.status(404).send(error.message)
//         }
//     })

//Edit Product by id
// validar que o produto existe
// validar o body
// app.put("/product/:id", (req: Request, res: Response) => {
//     try {
//         const id: string = req.params.id;
//         const productIndex: number = product.findIndex((product)=>product.id === id)
//         if(productIndex < 0) {
//             throw new Error("Produto não encontrado");
//         }
//         const newProduct: TProduct = req.body;
//         if(!newProduct.id || !newProduct.name || !newProduct.price || !newProduct.description){
//             throw new Error('Preencha todos os campos do produto!');
//         }
//         product[productIndex] = newProduct;
//         res.status(200).send("Produto atualizado com sucesso");
//     } catch (error) {
//         res.status(404).send(error.message);
//     }
// })
//////////////////////////////Fluxo de dados no Backend////////////////////////////////////////////////////////////////////

//Criando endpoints conexao KNEX
//Get All Users

app.get("/users", async(req: Request, res: Response) =>{

    try {
      const result = await db.raw('SELECT * FROM users;')
      res.status(200).send({result})
    } catch (error: any) {
        res.status(400).send(error.message)
    }
})

//Get All Products
app.get("/products", async(req: Request, res: Response) =>{

  try {
    const result = await db.raw('SELECT * FROM products;')
    res.status(200).send({result})
  } catch (error: any) {
      res.status(400).send(error.message)
  }
})

//Get All Products by name
app.get("/products/search", async(req: Request, res: Response) =>{

try {
    const q = req.query.q
    const sql = `SELECT * FROM products WHERE name LIKE ?;`
    console.log(sql, [`%${q}%`])
    const result = await db.raw(sql, [`%${q}%`])
    console.log(result)
    res.status(200).send(result)
  } catch (error: any) {
    console.log(error.message)
    res.status(400).send(error.message)
  }
})  
//Criando novos endpoints

//CREATE USER
app.post("/users", async (req: Request, res: Response) => {
  try {
      const { id, name, email, password} = req.body;
  if (typeof id !== "string") {
      throw new Error("'id' deve ser do tipo 'string'");
  }
  if (typeof email !== "string") {
      throw new Error("'email' deve ser do tipo 'string'");
  }
  if (typeof password !== "string") {
      throw new Error("'password' deve ser do tipo 'string'");
  }
    const idExist = await db.raw(`SELECT * FROM users WHERE id = ?`, [id]);
  if (idExist.length > 0) {
      throw new Error("Já existe uma conta com esse id");
  }
  const newUser = await db.raw(
      `INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)`,
      [id, name, email, password]
  );
      res.status(200).send({ message: "Cadastro realizado com sucesso!" });
  } catch (error:any) {
      res.status(400).send(error.message);
  }
});
    
app.post("/products", async (req: Request, res: Response) => {
  try {
      const { id, name, price, description, imageUrl } = req.body;
  if (typeof id !== "string") {
      throw new Error("'id' deve ser do tipo 'string'");
  }
  if (typeof name !== "string") {
      throw new Error("'name' deve ser do tipo 'string'");
  }
  if (typeof price !== "number") {
      throw new Error("'price' deve ser do tipo 'number'");
  }
  if (typeof description !== "string") {
      throw new Error("'description' deve ser do tipo 'string'");
  }
      const idExist = await db("products").select("*").where({ id });
  if (idExist.length > 0) {
      throw new Error("Já existe um produto com esse id");
  }
      await db("products").insert({ id, name, price, description, imageUrl });
      res.status(200).send({ message: "Cadastro realizado com sucesso!" });
  } catch (error) {
      res.status(400).send(error.message);
  }
});

  //CREATE PURCHASE
  app.post("/purchases", async (req: Request, res: Response) =>{
    try {
        const { id, buyer, totalPrice, createdAt, paid } = req.body;
        console.log(id, buyer, totalPrice, paid )
    if (!id || typeof id !== "string") {
        res.status(400);
        throw new Error("'id' deve ser do tipo 'string'");
    }
    if (isNaN(totalPrice) ) {
        res.status(400);
        throw new Error("'o preço deve ser no formato de numeros'");
    }
    const idExist = await db.raw(`
      SELECT * FROM purchases WHERE id = "${id}";
    `)
    if (idExist.length) {
        res.status(400);
        throw new Error("Já existe um um produto com esse id");
    }
    const newPuchases = await db.raw(`
    INSERT INTO purchases(id, buyer, totalPrice, paid)
    VALUES ("${id}", "${buyer}", "${totalPrice}", "${paid}");`);
    res.status(201).send({message: "Compra cadastrada com sucesso"});
    } catch (error:any) {
        res.status(400).send(error.message);
    }
});
// Get Products by id
// method HTTP (GET)
// path ("/products/:id")
// response
// status 200
// objeto encontrado do arquivo .db

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const product = await db.raw('SELECT * FROM products WHERE id = ?', id);
      res.status(200).send(product);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  
  // Get User Purchases by User id
  // method HTTP (GET)
  // path ("/users/:id/purchases")
  // response
  // status 200
  // array de compras do user no arquivo .db
  
  app.get("/users/:id/purchases", async (req, res) => {
    const userId = req.params.id;
    try {
      const userPurchases = await db.raw(`
        SELECT *
        FROM purchases
        WHERE buyer = '${userId}'
      `);
      res.status(200).send(userPurchases[0]);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal server error" });
    }
  });
  
  
  ///////////////////////////////////////////////////////////////////////APROFUNDAMENTO EM KNEX/////////////////////////////////////////////////////////////////////
//refatorando de raw para query builder
//Get All Users
app.get("/users", async(req: Request, res: Response) =>{
    try {
        const result = await db.select("*").from("users")
        res.status(200).send({result})
    } catch (error: any) {
        res.status(400).send(error.message)
    }
    })
//Get All Products
app.get("/products", async(req: Request, res: Response) =>{
    try {
        const result = await db.select("*").from("products")
        res.status(200).send({result})
    } catch (error: any) {
        res.status(400).send(error.message)
    }
    })
//Get All Products by name
app.get("/products/search", async(req: Request, res: Response) =>{
    try {
        const q = req.query.name
        const result = await db.select("*").from("products").where("name", "LIKE", `%${q}%`)
        res.status(200).send({result})
    } catch (error: any) {
        res.status(400).send(error.message)
    }
    })
  
// Crie o seguinte endpoint com query builder:
// Get Purchase by id
// app.get("/purchases/:id", async(req:Request, res:Response)=>{
//     try {
//         const id = req.params.id
//         const purchase = await db("purchases").where({id}).first();
//         const buyer = await db("users").where({id : purchase.buyer}).first();
//         const infoPurchaseUser = {
//         purchaseId: purchase.id,
//         totalPrice: purchase.totalPrice,
//         createdAt: purchase.createdAt,
//         paid: purchase.paid,
//         buyerId:buyer.id,
//         emailBuyer:buyer.email,
//         nameBuyer: buyer.name
//     }
//         res.status(200).send(infoPurchaseUser);
//     } catch (error: any) {
//         res.status(400).send(error.message)
        
//     }
// })

//Refatore o endpoint criado no exercício anterior para que o resultado bem sucedido também 
//retorne a lista de produtos que tem relação com a compra pesquisada.
app.get("/purchases/:id", async(req: Request, res: Response) => {
    try {
        const id = req.params.id;
        console.log(`Buscando informações da compra ${id}`);
        // Busca a compra pelo ID
        const purchase = await db("purchases").where({id}).first();
        if (!purchase) {
          return res.status(404).send("Compra não encontrada");
        }
        // Busca o comprador pelo ID da compra
        const buyer = await db("users").where({id: purchase.buyer}).first();
        if (!buyer) {
          return res.status(404).send("Comprador não encontrado");
        }
        // Busca os produtos da compra
        const products = await db("products")
          .join("purchases_products", "purchases_products.product_id", "products.id")
          .where("purchases_products.purchase_id", id);
        console.log(`Produtos encontrados: ${JSON.stringify(products)}`);
        // Cria o objeto com as informações da compra e do comprador
        const infoPurchaseUser = {
          purchase_id: purchase.id,
          totalPrice: purchase.totalPrice,
          createdAt: purchase.createdAt,
          paid: purchase.paid,
          buyerId: buyer.id,
          emailBuyer: buyer.email,
          nameBuyer: buyer.name,
          products: products
        };
        res.status(200).send(infoPurchaseUser);
      } catch (error: any) {
        console.log(error.message);
        res.status(400).send(error.message);
      }})
      app.put("/products/:id", async (req: Request, res: Response) => {
        try {
          const { id } = req.params;
          const { name, price, description, imageUrl } = req.body;
          const updatedProduct = await db("products")
            .where({ id })
            .update({ name, price, description, imageUrl });
          if (updatedProduct === 0) {
            return res.status(404).send("Produto não encontrado");
          }
          res.status(200).json({ message: "Produto atualizado com sucesso" });
        } catch (error) {
          console.log(error.message);
          res.status(400).send(error.message);
        }
      });

      app.delete('/purchases/:id', async (req, res) => {
        const { id } = req.params;
      
        try {
          const result = await db('purchases')
            .where({ id })
            .del();
      
          if (result === 1) {
            res.status(200).send({ message: 'Pedido cancelado com sucesso' });
          } else {
            res.status(404).send({ error: 'Compra não encontrada' });
          }
        } catch (error) {
          res.status(500).send({ error: 'Erro ao excluir compra' });
        }
      });