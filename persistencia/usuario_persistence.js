// const { Client} = require('pg')
// const { conexao } = require('./conexao')
const { query } = require('express')
const connect = require("../db");

// Create
async function addUsuario(usuario) {
    const client = await connect()
    // const client = new Client(conexao)
    // client.connect()
   
    try {
        const sql = `INSERT INTO usuario(nome, cpf, email, senha,
         cep, logradouro, unidade, bairro, cidade, estado,
         dt_nascimento, sexo, telefone, tipo) 
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`
        const values = [usuario.nome, usuario.cpf, usuario.email, usuario.senha,
             usuario.cep, usuario.logradouro, usuario.unidade, usuario.bairro, usuario.cidade, usuario.estado, 
             usuario.dt_nascimento, usuario.sexo, usuario.telefone, usuario.tipo ]
        const usuarios = await client.query(sql, values)

        // console.log("teste", usuarios.rows[0])  
        //client.release()
        client.end()
        return usuarios.rows[0]

    } catch (error) { throw error }
}

// Read
async function buscarUsuario() {
    const client = await connect()
    // const client = new Client(conexao)
    // client.connect()
    try {
        const sql = `SELECT * FROM usuario`
        const usuario = await client.query(sql)

        client.end()
        return usuario.rows
    } catch (error) { throw error }
}

async function buscarUsuarioPorNome(nome) {
    const client = await connect()
    // const client = new Client(conexao)
    // client.connect()
    try {
        const sql = `SELECT * FROM usuario WHERE nome = $1`
        const values = [nome]
        const nomeUsuario = await client.query(sql, values)

        client.end()
        return nomeUsuario.rows[0]
    } catch (error) { throw error }
}

async function buscarUsuarioPorCpf(cpf) {
    const client = await connect()
    // client.connect()
    try {
        const sql = `SELECT * FROM usuario WHERE cpf = $1`
        const values = [cpf]
        const cpfUsuario = await client.query(sql, values)

        client.end()
        return cpfUsuario.rows[0]
    } catch (error) { throw error }
}

async function buscarUsuarioPorEmail(email) {
    const client = await connect()
    // const client = new Client(conexao)
    // client.connect()
    try {
        const sql = `SELECT * FROM usuario WHERE email = $1`
        const values = [email]
        const emailUsuario = await client.query(sql, values)

        client.end()
        return emailUsuario.rows[0]
    } catch (error) { throw error }
}

async function buscarUsuarioPorId(id) {
    const client = await connect()
    // const client = new Client(conexao)
    // client.connect()
    try {
        const sql = `SELECT * FROM usuario WHERE id = $1`
        const values = [id]
        const usuarios = await client.query(sql, values)

        client.end()
        return usuarios.rows[0]
    } catch (error) { throw error }
}

// Update
async function atualizarUsuario(id, usuario) {
    const client = await connect()
    // const client = new Client(conexao)
    // client.connect()
    try {
        const sql = `UPDATE usuario SET nome = $1, cpf = $2, email = $3, senha = $4, cep = $5, logradouro = $6, unidade = $7, bairro = $8, cidade = $9, estado = $10, 
        dt_nascimento = $11, sexo = $12, telefone = $13, tipo = $14 WHERE id = $15 RETURNING *`
        const values = [usuario.nome, usuario.cpf, usuario.email, usuario.senha, 
            usuario.cep, usuario.logradouro, usuario.unidade, usuario.bairro, usuario.cidade, 
            usuario.estado, usuario.dt_nascimento, 
            usuario.sexo, usuario.telefone, usuario.tipo, id]
        const usuarioAtualizado = await client.query(sql, values)

        client.end()
        return usuarioAtualizado.rows[0]
    } catch (error) { throw error }
}

// Delete
async function deletarUsuario(id) {
    
    const client = await connect()
    // const client = new Client(conexao)
    // client.connect()
    try {
        const sql = `DELETE FROM usuario WHERE id = $1 RETURNING *`
        const values = [id]
        const clienteDeletado = await client.query(sql, values)

        client.end()
        return clienteDeletado.rows[0]
    } catch (error) { throw error }
}

module.exports = {
    addUsuario,
    buscarUsuario,
    buscarUsuarioPorNome,
    buscarUsuarioPorCpf,
    buscarUsuarioPorEmail,
    buscarUsuarioPorId,
    atualizarUsuario,
    deletarUsuario,
    
}