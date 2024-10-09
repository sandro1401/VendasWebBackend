const negocio = require('../negocio/usuario_negocio')

// Iniciando CRUD

// Create
async function addUsuario(req, res) {
    const usuario = req.body

    try {
        const usuarios = await negocio.addUsuario(usuario)
        res.status(201).json(usuarios)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(402).json({message: "Erro ao adicionar Usuário!"})
        }
    }
}

// Read
async function buscarUsuario(req, res) {
    const usuario = req.body

    try {
        const usuarios = await negocio.buscarUsuario(usuario)
        res.status(200).json(usuarios)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro  ao  buscar Usuario!"})
        }
    }
}

async function buscarUsuarioPorNome(req, res) {
    const nome = req.params.nome

    try {
        const nomeUsuario = await negocio.buscarUsuarioPorNome(nome)
        res.status(200).json(nomeUsuario)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro busca por nome!"})
        }
    }
}

async function buscarUsuarioPorCpf(req, res) {
    const cpf = req.params.cpf

    try {
        const cpfUsuario = await negocio.buscarUsuarioPorCpf(cpf)
        res.status(200).json(cpfUsuario)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro interno!"}) // verificar
        }
    }
}
async function buscarUsuarioPorEmail(req, res) {
    const email = req.params.email

    try {
        const emailUsuario = await negocio.buscarUsuarioPorEmail(email)
        res.status(200).json(emailUsuario)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro busca por email!"})
        }
    }
}

async function buscarUsuarioPorId(req, res) {
    const id = req.params.id

    try {
        const idUsuario = await negocio.buscarUsuarioPorId(id)
        res.status(200).json(idUsuario)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro busca por Id!"})
        }
    }
}

// Update
async function atualizarUsuario(req, res) {
    const id = req.params.id
    const usuario = req.body

    try {
        const usuarioAtualizado = await negocio.atualizarUsuario(id, usuario)
        res.status(200).json(usuarioAtualizado)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro ao atualizar!"})
        }
    }
}

// Delete
async function deletarUsuario(req, res) {
    const id = req.params.id

    try {
        const usuarioDeletado = await negocio.deletarUsuario(id)
        res.status(200).json(usuarioDeletado)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro interno!"})
        }
    }
}

module.exports = {
    addUsuario,
    buscarUsuario,
    buscarUsuarioPorNome,
    buscarUsuarioPorCpf,
    buscarUsuarioPorEmail,
    buscarUsuarioPorId,
    atualizarUsuario,
    deletarUsuario
}