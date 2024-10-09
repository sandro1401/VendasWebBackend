const negocio = require('../negocio/itemPedido_negocio')

// Iniciando CRUD

// Create
async function addItemPedido(req, res) {
    const itemPedido = req.body

    try {
        const itemPedidos = await negocio.addItemPedido(itemPedido)
        res.status(201).json(itemPedidos)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(402).json({message: "Erro ao adicionar Item ao Pedido!"})
        }
    }
}

// Read
async function buscarItemPedido(req, res) {
    const itemPedido = req.body

    try {
        const itemPedidos = await negocio.buscarItemPedido(itemPedido)
        res.status(200).json(itemPedidos)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro  ao  buscar ItemPedido!"})
        }
    }
}

async function buscarItemPedidoPorProdutoId(req, res) {
    const produto = req.params.produtoId

    try {
        const produtoItemPedido = await negocio.buscarItemPedidoPorProdutoId(produto)
        res.status(200).json(produtoItemPedido)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro busca por produto!"})
        }
    }
}


async function buscarItemPedidoPorPedidoId(req, res) {
    const pedido = req.params.pedidoId

    try {
        const pedidoItemPedido = await negocio.buscarItemPedidoPorPedidoId(pedido)
        res.status(200).json(pedidoItemPedido)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro busca por pedido!"})
        }
    }
}

async function buscarItemPedidoPorId(req, res) {
    const id = req.params.id

    try {
        const idItemPedido = await negocio.buscarItemPedidoPorId(id)
        res.status(200).json(idItemPedido)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro busca por Id!"})
        }
    }
}

// Update
async function atualizarItemPedido(req, res) {
    const id = req.params.id
    const itemPedido = req.body

    try {
        const itemPedidoAtualizado = await negocio.atualizarItemPedido(id, itemPedido)
        res.status(200).json(itemPedidoAtualizado)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro ao atualizar!"})
        }
    }
}

// Delete
async function deletarItemPedido(req, res) {
    const id = req.params.id

    try {
        const itemPedidoDeletado = await negocio.deletarItemPedido(id)
        res.status(200).json(itemPedidoDeletado)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro interno!"})
        }
    }
}

module.exports = {
    addItemPedido,
    buscarItemPedido,
    buscarItemPedidoPorProdutoId,
    buscarItemPedidoPorPedidoId,  
    buscarItemPedidoPorId,
    atualizarItemPedido,
    deletarItemPedido
}