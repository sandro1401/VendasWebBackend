const { Client} = require('pg')
const { conexao } = require('./conexao')
const { query } = require('express')


// Create
async function addCategoria(categoria) {
    //const client = await connect()
    const client = new Client(conexao)
    client.connect()
   
    try {
        const sql = `INSERT INTO Categoria(nome) VALUES($1) RETURNING *`
        const values = [categoria.nome ]
        const categorias = await client.query(sql, values)

        // console.log("teste", Categorias.rows[0])  
        //client.release()
        client.end()
        return categorias.rows[0]

    } catch (error) { throw error }
}

// Read
async function buscarCategoria() {
    //const client = await connect()
    const client = new Client(conexao)
    client.connect()
    try {
        const sql = `SELECT * FROM categoria`
        const categoria = await client.query(sql)

        client.end()
        return categoria.rows
    } catch (error) { throw error }
}

async function buscarCategoriaPorNome(nome) {
    //const client = await connect()
    const client = new Client(conexao)
    client.connect()
    try {
        const sql = `SELECT * FROM categoria WHERE nome = $1`
        const values = [nome]
        const nomeCategoria = await client.query(sql, values)

        client.end()
        return nomeCategoria.rows[0]
    } catch (error) { throw error }
}




async function buscarCategoriaPorId(id) {
    //const client = await connect()
    const client = new Client(conexao)
    client.connect()
    try {
        const sql = `SELECT * FROM categoria WHERE id = $1`
        const values = [id]
        const idCategoria = await client.query(sql, values)

        client.end()
        return idCategoria.rows[0]
    } catch (error) { throw error }
}

// Update
async function atualizarCategoria(id, categoria) {
    //const client = await connect()
    const client = new Client(conexao)
    client.connect()
    try {
        const sql = `UPDATE categoria SET nome = $1 WHERE id = $2 RETURNING *`
        const values = [categoria.nome, id]
        const categoriaAtualizado = await client.query(sql, values)

        client.end()
        return categoriaAtualizado.rows[0]
    } catch (error) { throw error }
}

// Delete
async function deletarCategoria(id) {
    
    //const client = await connect()
    const client = new Client(conexao)
    client.connect()
    try {
        const sql = `DELETE FROM categoria WHERE id = $1 RETURNING *`
        const values = [id]
        const clienteDeletado = await client.query(sql, values)

        client.end()
        return clienteDeletado.rows[0]
    } catch (error) { throw error }
}

module.exports = {
    addCategoria,
    buscarCategoria,
    buscarCategoriaPorNome,
    buscarCategoriaPorId,
    atualizarCategoria,
    deletarCategoria,
    
}