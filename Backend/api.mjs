import { createConnection } from "mysql2";
import dotenv from "dotenv";
import pkg from "body-parser";
import express from "express";
import cors from "cors";

const app = express();
const { json } = pkg;
const port = 3000;
dotenv.config();

const connection = createConnection({
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
})

connection.connect((err) => {
    if (err) {
        console.log("Erro ao conectar no banco de dados");
    } else {
        console.log("Parabéns! Você conseguiu conectar no banco de dados");
    }
})

app.use (
    cors({
        origin: ["http://192.168.100.129:5500", "http://127.0.0.1:5500", "http://127.0.0.1:5501"], //permitir apenas este domínio
    })
);

//middleware
app.use(json())

//criar uma nova cidade

app.post("/novo-produto", (req, res) => {
    const {name, preco, tipo} = req.body;
    const novo_produto = {name, preco, tipo};
    connection.query("insert into produtos set ?", novo_produto, (err, result) => {
        if (err) {
            console.log("Deu erro para tentar cadastrar um novo produto");
        } else {
            res.json(result);
        }
    });
});

//deleta uma cidade

app.delete("/delete-produto/:id", (req, res) => {
    const id = req.params.id;
    connection.query("delete from produtos where id = ?", id, (err, result) => {
        if (err) {
            console.log("Ocorreu um erro para tentar deletar seu produto");
        } else {
            res.json(result);
        }
    })
})

app.get("/consultar-produtos", (req, res) => {
    connection.query("select * from produtos", (err, result) => {
        if (err) {
            console.log("Ocorreu um erro para tentar consultar seus produtos");
        } else {
            res.json(result);
        }
    })
})

//alterar uma cidade
app.put("/editar-produto", (req, res) => {
    const {id} = req.body;
    const {name, preco, tipo} = req.body;
    const Produtos = {name, preco, tipo};
    connection.query ("update produtos set ? where id = ?", [Produtos, id], (err, result) => {
        if (err) {
            console.log("Ocorreu um erro para tentar editar seu produto");
        } else {
            res.json(result);
        }
    })
})

app.listen(port, () => {
    console.log(`A sua API está funcionando na porta ${port}`);
  });