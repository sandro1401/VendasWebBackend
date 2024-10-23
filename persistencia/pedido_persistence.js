const { Client} = require('pg')
const { conexao } = require('./conexao')
const { query } = require('express')


// Create
async function addPedido(pedido) {
    //const client = await connect()
    const client = new Client(conexao)
    client.connect()
   
    try {
        const sql = `INSERT INTO pedido(quantidade, valorTotal, data_Pedido, produtoId, usuarioId
        ) VALUES($1, $2, $3, $4, $5) RETURNING *`
        const values = [pedido.quantidade, pedido.valorTotal, pedido.data_Pedido, pedido.produtoId, pedido.usuarioId]
        const pedidos = await client.query(sql, values)

        // console.log("teste", Pedidos.rows[0])  
        //client.release()
        client.end()
        return pedidos.rows[0]

    } catch (error) { throw error }
}

// Read
async function buscarPedido() {
    //const client = await connect()
    const client = new Client(conexao)
    client.connect()
    try {
        const sql = `SELECT * FROM pedido`
        const pedido = await client.query(sql)

        client.end()
        return pedido.rows
    } catch (error) { throw error }
}

async function buscarPedidoPorUsuarioId(usuarioId) {
    //const client = await connect()
    const client = new Client(conexao)
    client.connect()
    try {
        const sql = `SELECT * FROM pedido WHERE usuarioId = $1`
        const values = [usuarioId]
        const UsuarioPedido = await client.query(sql, values)

        client.end()
        return UsuarioPedido.rows[0]
    } catch (error) { throw error }
}

async function buscarPedidoPorProdutoId(produtoId) {
    const client = await connect()

    try {
        const sql = `SELECT * FROM Pedido WHERE ProdutoId = $1`
        const values = [produtoId]
        const ProdutoPedido = await client.query(sql, values)

        client.end()
        return ProdutoPedido.rows[0]
    } catch (error) { throw error }
}


async function buscarPedidoPorId(id) {
    //const client = await connect()
    const client = new Client(conexao)
    client.connect()
    try {
        const sql = `SELECT * FROM pedido WHERE id = $1`
        const values = [id]
        const idPedido = await client.query(sql, values)

        client.end()
        return idPedido.rows[0]
    } catch (error) { throw error }
}

// Update
async function atualizarPedido(id, pedido) {
    //const client = await connect()
    const client = new Client(conexao)
    client.connect()
    try {
        const sql = `UPDATE pedido SET quantidade = $1, valorTotal = $2, data_pedido = $3,  produtoId = $4, usuarioId = $5 WHERE id = $6 RETURNING *`
        const values = [pedido.quantidade, pedido.valorTotal, pedido.data_Pedido, pedido.produtoId, pedido.usuarioId, id]
        const pedidoAtualizado = await client.query(sql, values)

        client.end()
        return pedidoAtualizado.rows[0]
    } catch (error) { throw error }
}

// Delete
async function deletarPedido(id) {
    
    //const client = await connect()
    const client = new Client(conexao)
    client.connect()
    try {
        const sql = `DELETE FROM pedido WHERE id = $1 RETURNING *`
        const values = [id]
        const pedidoDeletado = await client.query(sql, values)

        client.end()
        return pedidoDeletado.rows[0]
    } catch (error) { throw error }
}

module.exports = {
    addPedido,
    buscarPedido,
    buscarPedidoPorProdutoId,
    buscarPedidoPorUsuarioId,
   
    buscarPedidoPorId,
    atualizarPedido,
    deletarPedido,
    
}