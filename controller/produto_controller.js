const negocio = require('../negocio/produto_negocio')

// Iniciando CRUD

// Create
async function addProduto(req, res) {
    const produto = req.body

    try {
        const produtos = await negocio.addProduto(produto)
        res.status(201).json(produtos)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(402).json({message: "Erro ao adicionar Produto!"})
        }
    }
}

// Read
async function buscarProduto(req, res) {
    const produto = req.body

    try {
        const produtos = await negocio.buscarProduto(produto)
        res.status(200).json(produtos)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro  ao  buscar Produto!"})
        }
    }
}

async function buscarProdutoPorNome(req, res) {
    const nome = req.params.nome

    try {
        const nomeProduto = await negocio.buscarProdutoPorNome(nome)
        res.status(200).json(nomeProduto)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro buscar Produto por nome!"})
        }
    }
}

async function buscarProdutoPorCategoria(req, res) {
    const categoria = req.params.categoriaId

    try {
        const categoriaProduto = await negocio.buscarProdutoPorCategoria(categoria)
        res.status(200).json(categoriaProduto)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro buscar Produto por Categoria!"})
        }
    }
}
async function buscarProdutoPorId(req, res) {
    const id = req.params.id

    try {
        const idProduto = await negocio.buscarProdutoPorId(id)
        res.status(200).json(idProduto)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro busca por Id!"})
        }
    }
}

// Update
async function atualizarProduto(req, res) {
    const id = req.params.id
    const produto = req.body

    try {
        const produtoAtualizado = await negocio.atualizarProduto(id, produto)
        res.status(200).json(produtoAtualizado)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro ao atualizar!"})
        }
    }
}

// Delete
async function deletarProduto(req, res) {
    const id = req.params.id

    try {
        const produtoDeletado = await negocio.deletarProduto(id)
        res.status(200).json(produtoDeletado)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro interno!"})
        }
    }
}

module.exports = {
    addProduto,
    buscarProduto,
    buscarProdutoPorNome,
    buscarProdutoPorCategoria,  
    buscarProdutoPorId,
    atualizarProduto,
    deletarProduto
}