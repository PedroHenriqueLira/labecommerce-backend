"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const knex_1 = require("./dataBase/knex");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});
app.get("/ping", (req, res) => {
    res.send("Pong!");
});
const newUser = {
    name: "",
    date: 0,
    id: "",
    email: "",
    password: ""
};
app.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield knex_1.db.raw('SELECT * FROM users;');
        res.status(200).send({ result });
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}));
app.get("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield knex_1.db.raw('SELECT * FROM products;');
        res.status(200).send({ result });
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}));
app.get("/products/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const q = req.query.q;
        const sql = `SELECT * FROM products WHERE name LIKE ?;`;
        console.log(sql, [`%${q}%`]);
        const result = yield knex_1.db.raw(sql, [`%${q}%`]);
        console.log(result);
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error.message);
        res.status(400).send(error.message);
    }
}));
app.post("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, email, password, createdAt } = req.body;
        if (typeof id !== "string") {
            throw new Error("'id' deve ser do tipo 'string'");
        }
        if (typeof email !== "string") {
            throw new Error("'email' deve ser do tipo 'string'");
        }
        if (typeof password !== "string") {
            throw new Error("'password' deve ser do tipo 'string'");
        }
        const idExist = yield knex_1.db.raw(`SELECT * FROM users WHERE id = ?`, [id]);
        if (idExist.length > 0) {
            throw new Error("Já existe uma conta com esse id");
        }
        const newUser = yield knex_1.db.raw(`INSERT INTO users (id, name, email, password, createdAt) VALUES (?, ?, ?, ?, ?)`, [id, name, email, password, createdAt]);
        res.status(200).send({ message: "Cadastro realizado com sucesso!" });
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}));
app.post("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const idExist = yield (0, knex_1.db)("products").select("*").where({ id });
        if (idExist.length > 0) {
            throw new Error("Já existe um produto com esse id");
        }
        yield (0, knex_1.db)("products").insert({ id, name, price, description, imageUrl });
        res.status(200).send({ message: "Cadastro realizado com sucesso!" });
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}));
app.post("/purchases", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, buyer, totalPrice, createdAt, paid } = req.body;
        console.log(id, buyer, totalPrice, paid);
        if (!id || typeof id !== "string") {
            res.status(400);
            throw new Error("'id' deve ser do tipo 'string'");
        }
        if (isNaN(totalPrice)) {
            res.status(400);
            throw new Error("'o preço deve ser no formato de numeros'");
        }
        const idExist = yield knex_1.db.raw(`
      SELECT * FROM purchases WHERE id = "${id}";
    `);
        if (idExist.length) {
            res.status(400);
            throw new Error("Já existe um um produto com esse id");
        }
        const newPuchases = yield knex_1.db.raw(`
    INSERT INTO purchases(id, buyer, totalPrice, paid)
    VALUES ("${id}", "${buyer}", "${totalPrice}", "${paid}");`);
        res.status(201).send({ message: "Compra cadastrada com sucesso" });
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}));
app.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield knex_1.db.select("*").from("users");
        res.status(200).send({ result });
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}));
app.get("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield knex_1.db.select("*").from("products");
        res.status(200).send({ result });
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}));
app.get("/products/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const q = req.query.name;
        const result = yield knex_1.db.select("*").from("products").where("name", "LIKE", `%${q}%`);
        res.status(200).send({ result });
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}));
app.get("/purchases/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        console.log(`Buscando informações da compra ${id}`);
        const purchase = yield (0, knex_1.db)("purchases").where({ id }).first();
        if (!purchase) {
            return res.status(404).send("Compra não encontrada");
        }
        const buyer = yield (0, knex_1.db)("users").where({ id: purchase.buyer }).first();
        if (!buyer) {
            return res.status(404).send("Comprador não encontrado");
        }
        const products = yield (0, knex_1.db)("products")
            .join("purchases_products", "purchases_products.product_id", "products.id")
            .where("purchases_products.purchase_id", id);
        console.log(`Produtos encontrados: ${JSON.stringify(products)}`);
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
    }
    catch (error) {
        console.log(error.message);
        res.status(400).send(error.message);
    }
}));
//# sourceMappingURL=index.js.map