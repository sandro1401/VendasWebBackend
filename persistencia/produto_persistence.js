// const { Client} = require('pg')
// const { conexao } = require('./conexao')
const connect = require("../db");
const { query } = require('express')


// Create
async function addProduto(produto) {
    const client = await connect()
    // const client = new Client(conexao)
    // client.connect()
   
    try {
        const sql = `INSERT INTO Produto(nome, descricao, preco, categoriaId, usuarioId, imagem_url) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`
        const values = [produto.nome, produto.descricao, produto.preco, produto.categoriaId, 
            produto.usuarioId, produto.imagem_url]
        const produtos = await client.query(sql, values)

         console.log("teste", produtos.rows[0])  
        //client.release()
        client.end()
        return produtos.rows[0]

    } catch (error) { throw error }
}

// Read
async function buscarProduto() {
    const client = await connect()
    // const client = new Client(conexao)
    // client.connect()
    try {
        const sql = `SELECT * FROM produto`
        const produto = await client.query(sql)

        client.end()
        return produto.rows
    } catch (error) { throw error }
}

async function buscarProdutoPorNome(nome) {
    const client = await connect()
    // const client = new Client(conexao)
    // client.connect()
    try {
        const sql = `SELECT * FROM produto WHERE nome = $1`
        const values = [nome]
        const nomeProduto = await client.query(sql, values)

        client.end()
        return nomeProduto.rows[0]
    } catch (error) { throw error }
}

async function buscarProdutoPorCategoria(categoriaId) {
    const client = await connect()
    // client.connect()
    try {
        const sql = `SELECT * FROM produto WHERE categoriaId = $1`
        const values = [categoriaId]
        const categoriaProduto = await client.query(sql, values)

        client.end()
        return categoriaProduto.rows[0]
    } catch (error) { throw error }
}


async function buscarProdutoPorId(id) {
    const client = await connect()
    // const client = new Client(conexao)
    // client.connect()
    try {
        const sql = `SELECT * FROM Produto WHERE id = $1`
        const values = [id]
        const idProduto = await client.query(sql, values)

        client.end()
        return idProduto.rows[0]
    } catch (error) { throw error }
}

// Atualizar Produto
async function atualizarProduto(id, produto) {
    // const client = new Client(conexao);
    const client = await connect()
    // client.connect();

    try {
        let sql;
        let values;
        console.log(produto.imagem_url)

        if (produto.imagem_url) {
            sql = `UPDATE produto 
                   SET nome = $1, descricao = $2, preco = $3, categoriaId = $4, 
                       usuarioId = $5, imagem_url = $6 
                   WHERE id = $7 RETURNING *`;
            values = [produto.nome, produto.descricao, produto.preco, produto.categoriaId, 
                      produto.usuarioId, produto.imagem_url, id];
        } else {
            sql = `UPDATE produto 
                   SET nome = $1, descricao = $2, preco = $3, categoriaId = $4, 
                       usuarioId = $5 
                   WHERE id = $6 RETURNING *`;
            values = [produto.nome, produto.descricao, produto.preco, produto.categoriaId, 
                      produto.usuarioId, id];
        }

        const result = await client.query(sql, values);
        client.end();
        return result.rows[0];
    } catch (error) {
        client.end();
        throw error;
    }
}

async function atualizarImagemProduto(id,produto) {
    const client = await connect()
    try{
        const sql = 'UPDATE produto set imagem_url = $1 where id = $2 RETURNING *'
        const value = [produto.imagem_url, id]

        const imgProduto = await client.query(sql,value)
        client.release;
        return imgProduto.rows[0]

    }catch(error){
        throw error;
    }
    
}


// Delete
async function deletarProduto(id) {
    
    const client = await connect()
    // const client = new Client(conexao)
    // client.connect()
    try {
        const sql = `DELETE FROM produto WHERE id = $1 RETURNING *`
        const values = [id]
        const produtoDeletado = await client.query(sql, values)

        client.end()
        return produtoDeletado.rows[0]
    } catch (error) { throw error }
}

module.exports = {
    addProduto,
    buscarProduto,
    buscarProdutoPorNome,
    buscarProdutoPorCategoria,
    buscarProdutoPorId,
    atualizarProduto,
    atualizarImagemProduto,
    deletarProduto,
    
    
}