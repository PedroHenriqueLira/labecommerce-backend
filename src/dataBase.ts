// import { ProductCategory, TProduct, TPurchase, TUser } from "./type";

// export const user: TUser[] = [
//     {
//         id: "u01",
//         email: "pedrohc@hotmail.com",
//         password: "123456",
//     },
//     {
//         id: "u02",
//         email: "rayanek@hotmail.com",
//         password: "654321",
//     },
//     ];

// export const product: TProduct[] = [
//         {
//             id: "i01",
//             name: "Pistola Airsoft",
//             price: 2.0,
//             category: ProductCategory.AIRSOFT,
//         },
//         {
//             id: "i02",
//             name: "red dot",
//             price: 1.1,
//             category: ProductCategory.ACESSORIOS,
//         },
//         ];
// export const purchase: TPurchase[] = [
//             {
//                 userId: "u01",
//                 productId: "i03",
//                 quantity: 2,
//                 totalPrice: 4.0,
//             },
//             {
//                 userId: "u02",
//                 productId: "i04",
//                 quantity: 10,
//                 totalPrice: 11.000,
//             },
//             ];

// // createUser (cria uma nova pessoa na lista de users)
// // input: três parâmetros (id, email e password)
// // output: frase de sucesso ("Cadastro realizado com sucesso")
// export function createUser(id:string, email:string, password:string):string{
//     user.push({id, email, password})
//     return "Cadastro realizado com sucesso"
// }

// // getAllUsers (busca todas as pessoas da lista de users)
// // input: nenhum
// // output: lista atualizada de users
// export function getAllUsers():TUser[]{
//     return user
// }

// // createProduct (cria um novo produto na lista de products)
// // input: quatro parâmetros (id, name, price e category)
// // output: frase de sucesso ("Produto criado com sucesso")
// export function createProduct(id:string, name:string, price:number, category:string):string{
//     product.push({id, name, price, category})
//         return "Produto adicionado com sucesso"  
//     }

// // getAllProducts (busca todos os produtos da lista de products)
// // input: nenhum
// // output: lista atualizada de products
// export function getAllProducts():TProduct[]{
//     return product
// }

// // getProductById (busca por produtos baseado em um id da lista de products)
// // input: um parâmetro (idToSearch)
// // output: o produto encontrado ou undefined
// export function getProductById(idToSearch:string):TProduct | undefined{
//     return product.find((prod)=>prod.id === idToSearch)
// }

// // Product
// // queryProductsByName (busca por produtos baseado em um nome da lista de products)
// // input: um parâmetro (q)
// // q é a abreviação de query (termo de busca/consulta)
// // output: lista de produtos com nomes que contenham o termo de busca
// // extra: o resultado da busca deve ser case insensitive
// export function queryProductsByName(q:string):TProduct[]{
//     return product.filter((prod)=>prod.name.toLowerCase().includes(q.toLowerCase()))
// }

// // Purchase
// // createPurchase (cria uma nova compra na lista de purchases)
// // input: quatro parâmetros (userId, productId, quantity e totalPrice)
// // output: frase de sucesso ("Compra realizada com sucesso")
// export function createPurchase(userId:string, productId:string, quantity:number, totalPrice:number):string{
//     purchase.push({userId, productId, quantity, totalPrice})
//     return "Compra realizada com sucesso"
// }

// // getAllPurchasesFromUserId (busca todas as compras feitas baseado no id do usuário)
// // input: userIdToSearch
// // output: lista atualizada de compras nas quais o userId delas são do userIdToSearch
// export function getAllPurchasesFromUserId(userIdToSearch:string):TPurchase[] {
//     return purchase.filter((purchase)=> purchase.userId === userIdToSearch)
// }