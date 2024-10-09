const negocio = require('../negocio/categoria_negocio')

// Iniciando CRUD

// Create
async function addCategoria(req, res) {
    const categoria = req.body

    try {
        const categorias = await negocio.addCategoria(categoria)
        res.status(201).json(categorias)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(402).json({message: "Erro ao adicionar Categoria!"})
        }
    }
}

// Read
async function buscarCategoria(req, res) {
    const categoria = req.body

    try {
        const categorias = await negocio.buscarCategoria(categoria)
        res.status(200).json(categorias)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro  ao  buscar Categoria!"})
        }
    }
}

async function buscarCategoriaPorNome(req, res) {
    const nome = req.params.nome

    try {
        const nomeCategoria = await negocio.buscarCategoriaPorNome(nome)
        res.status(200).json(nomeCategoria)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro busca por nome!"})
        }
    }
}


async function buscarCategoriaPorId(req, res) {
    const id = req.params.id

    try {
        const idCategoria = await negocio.buscarCategoriaPorId(id)
        res.status(200).json(idCategoria)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro busca por Id!"})
        }
    }
}

// Update
async function atualizarCategoria(req, res) {
    const id = req.params.id
    const categoria = req.body

    try {
        const categoriaAtualizado = await negocio.atualizarCategoria(id, categoria)
        res.status(200).json(categoriaAtualizado)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro ao atualizar!"})
        }
    }
}

// Delete
async function deletarCategoria(req, res) {
    const id = req.params.id

    try {
        const categoriaDeletado = await negocio.deletarCategoria(id)
        res.status(200).json(categoriaDeletado)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro interno!"})
        }
    }
}

module.exports = {
    addCategoria,
    buscarCategoria,
    buscarCategoriaPorNome,
  
    buscarCategoriaPorId,
    atualizarCategoria,
    deletarCategoria
}