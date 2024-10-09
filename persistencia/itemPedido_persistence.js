const { Client} = require('pg')
const { conexao } = require('./conexao')
const { query } = require('express')


// Create
async function addItemPedido(itemPedido) {
    //const client = await connect()
    const client = new Client(conexao)
    client.connect()
   
    try {
        const sql = `INSERT INTO itemPedido(quantidade, preco_unitario, pedidoId, produtoId
        ) VALUES($1, $2, $3, $4) RETURNING *`
        const values = [itemPedido.quantidade, itemPedido.preco_unitario, itemPedido.pedidoId, itemPedido.produtoId]
        const itemPedidos = await client.query(sql, values)

        // console.log("teste", ItemPedidos.rows[0])  
        //client.release()
        client.end()
        return itemPedidos.rows[0]

    } catch (error) { throw error }
}

// Read
async function buscarItemPedido() {
    //const client = await connect()
    const client = new Client(conexao)
    client.connect()
    try {
        const sql = `SELECT * FROM itemPedido`
        const itemPedido = await client.query(sql)

        client.end()
        return itemPedido.rows
    } catch (error) { throw error }
}

async function buscarItemPedidoPorPedidoId(pedidoId) {
    //const client = await connect()
    const client = new Client(conexao)
    client.connect()
    try {
        const sql = `SELECT * FROM itemPedido WHERE pedidoId = $1`
        const values = [pedidoId]
        const pedidoItemPedido = await client.query(sql, values)

        client.end()
        return pedidoItemPedido.rows[0]
    } catch (error) { throw error }
}

async function buscarItemPedidoPorProdutoId(produtoId) {
    const client = await connect()

    try {
        const sql = `SELECT * FROM ItemPedido WHERE produtoId = $1`
        const values = [produtoId]
        const produtoItemPedido = await client.query(sql, values)

        client.end()
        return produtoItemPedido.rows[0]
    } catch (error) { throw error }
}


async function buscarItemPedidoPorId(id) {
    //const client = await connect()
    const client = new Client(conexao)
    client.connect()
    try {
        const sql = `SELECT * FROM itemPedido WHERE id = $1`
        const values = [id]
        const idItemPedido = await client.query(sql, values)

        client.end()
        return idItemPedido.rows[0]
    } catch (error) { throw error }
}

// Update
async function atualizarItemPedido(id, itemPedido) {
    //const client = await connect()
    const client = new Client(conexao)
    client.connect()
    try {
        const sql = `UPDATE itemPedido SET quantidade = $1, preco_unitario = $2, pedidoId = $3, produtoId = $4 WHERE id = $5 RETURNING *`
        const values = [itemPedido.quantidade, itemPedido.preco_unitario, itemPedido.pedidoId, itemPedido.produtoId, id]
        const itemPedidoAtualizado = await client.query(sql, values)

        client.end()
        return itemPedidoAtualizado.rows[0]
    } catch (error) { throw error }
}

// Delete
async function deletarItemPedido(id) {
    
    //const client = await connect()
    const client = new Client(conexao)
    client.connect()
    try {
        const sql = `DELETE FROM itemPedido WHERE id = $1 RETURNING *`
        const values = [id]
        const itemPedidoDeletado = await client.query(sql, values)

        client.end()
        return itemPedidoDeletado.rows[0]
    } catch (error) { throw error }
}

module.exports = {
    addItemPedido,
    buscarItemPedido,
    buscarItemPedidoPorProdutoId,
    buscarItemPedidoPorPedidoId,
    buscarItemPedidoPorId,
    atualizarItemPedido,
    deletarItemPedido,
    
}