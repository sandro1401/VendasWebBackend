const express = require('express')
const cors = require('cors')
require("dotenv").config();
const app = express()

const rotaUsuario = require('./rota/usuario_rota')
const rotaCategoria = require('./rota/categoria_rota')
const rotaProduto = require('./rota/produto_rota')
const rotaPedido = require('./rota/pedido_rota')
const rotaItemPedido = require('./rota/itemPedido_rota')
const loginController = require('./controller/login_controller');

const port = process.env.PORT

app.use('/uploads', express.static('uploads'));
app.use(cors({ origin: '*' }));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/usuario", rotaUsuario);
app.use("/api/categoria", rotaCategoria);
app.use("/api/produto", rotaProduto);
app.use("/api/pedido", rotaPedido);
app.use("/api/itemPedido", rotaItemPedido);
app.post("/api/login", loginController.realizarLogin);
app.get("/api/login/usuario", loginController.obterUsuarioLogado)


app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
});