const { Client} = require('pg')
const { conexao } = require('./conexao')
const { query } = require('express')


// Create
async function addItemPedido(pedidoId,itemPedido) {
    //const client = await connect()
    const client = new Client(conexao)
    client.connect()
   
    try {
        const sql = `INSERT INTO itemPedido(quantidade, preco_unitario, pedidoId, produtoId, concluido
        ) VALUES($1, $2, $3, $4, $5) RETURNING *`
        const values = [itemPedido.quantidade, itemPedido.preco_unitario, pedidoId, itemPedido.produtoId, itemPedido.concluido]
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
async function buscarItemPedidoPorUsuarioId(usuarioId) {
    //const client = await connect()
    const client = new Client(conexao)
    client.connect()
    try {
        const sql = `SELECT * FROM itemPedido WHERE usuarioId = $1`
        const values = [usuarioId]
        const usuarioIdItemPedido = await client.query(sql, values)

        client.end()
        return usuarioIdItemPedido.rows[0]
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
        const sql = `UPDATE itemPedido SET quantidade = $1, preco_unitario = $2, pedidoId = $3, produtoId = $4, cocluido = $5  WHERE id = $6 RETURNING *`
        const values = [itemPedido.quantidade, itemPedido.preco_unitario, itemPedido.pedidoId, itemPedido.produtoId, itemPedido.concluido, id]
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
    buscarItemPedidoPorUsuarioId
}