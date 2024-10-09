const { Client} = require('pg')
const { conexao } = require('./conexao')
const { query } = require('express')


// Create
async function addUsuario(usuario) {
    //const client = await connect()
    const client = new Client(conexao)
    client.connect()
   
    try {
        const sql = `INSERT INTO usuario(nome, cpf, email, senha, endereco, dt_nascimento, sexo, telefone, status) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`
        const values = [usuario.nome, usuario.cpf, usuario.email, usuario.senha, usuario.endereco, usuario.dt_nascimento, 
            usuario.sexo, usuario.telefone, usuario.status ]
        const usuarios = await client.query(sql, values)

        // console.log("teste", usuarios.rows[0])  
        //client.release()
        client.end()
        return usuarios.rows[0]

    } catch (error) { throw error }
}

// Read
async function buscarUsuario() {
    //const client = await connect()
    const client = new Client(conexao)
    client.connect()
    try {
        const sql = `SELECT * FROM usuario`
        const usuario = await client.query(sql)

        client.end()
        return usuario.rows
    } catch (error) { throw error }
}

async function buscarUsuarioPorNome(nome) {
    //const client = await connect()
    const client = new Client(conexao)
    client.connect()
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

    try {
        const sql = `SELECT * FROM usuario WHERE cpf = $1`
        const values = [cpf]
        const cpfUsuario = await client.query(sql, values)

        client.end()
        return cpfUsuario.rows[0]
    } catch (error) { throw error }
}

async function buscarUsuarioPorEmail(email) {
    //const client = await connect()
    const client = new Client(conexao)
    client.connect()
    try {
        const sql = `SELECT * FROM usuario WHERE email = $1`
        const values = [email]
        const emailUsuario = await client.query(sql, values)

        client.end()
        return emailUsuario.rows[0]
    } catch (error) { throw error }
}

async function buscarUsuarioPorId(id) {
    //const client = await connect()
    const client = new Client(conexao)
    client.connect()
    try {
        const sql = `SELECT * FROM usuario WHERE id = $1`
        const values = [id]
        const idUsuario = await client.query(sql, values)

        client.end()
        return idUsuario.rows[0]
    } catch (error) { throw error }
}

// Update
async function atualizarUsuario(id, usuario) {
    //const client = await connect()
    const client = new Client(conexao)
    client.connect()
    try {
        const sql = `UPDATE usuario SET nome = $1, cpf = $2, email = $3, senha = $4, endereco = $5, dt_nascimento = $6, sexo = $7, telefone = $8, status = $9 WHERE id = $10 RETURNING *`
        const values = [usuario.nome, usuario.cpf, usuario.email, usuario.senha, usuario.endereco, usuario.dt_nascimento, 
            usuario.sexo, usuario.telefone, usuario.status, id]
        const usuarioAtualizado = await client.query(sql, values)

        client.end()
        return usuarioAtualizado.rows[0]
    } catch (error) { throw error }
}

// Delete
async function deletarUsuario(id) {
    
    //const client = await connect()
    const client = new Client(conexao)
    client.connect()
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