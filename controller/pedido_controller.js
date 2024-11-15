const negocio = require('../negocio/pedido_negocio')

// Iniciando CRUD

// Create
async function addPedido(req, res) {
    const usuarioId = req.body.usuarioId;
    const pedido = req.body
    console.log(usuarioId)
    console.log(pedido)

    try {
        const pedidos = await negocio.addPedido(usuarioId, pedido)
        res.status(201).json(pedidos)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro ao adicionar Pedido$!"})
        }
    }
}

// Read
async function buscarPedido(req, res) {
    const pedido = req.body

    try {
        const pedidos = await negocio.buscarPedido(pedido)
        res.status(200).json(pedidos)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro  ao  buscar Pedido!"})
        }
    }
}

async function buscarPedidoPorProdutoId(req, res) {
    const produto = req.params.produtoId

    try {
        const produtoPedido = await negocio.buscarPedidoPorProdutoId(produto)
        res.status(200).json(produtoPedido)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro busca por nome!"})
        }
    }
}


async function buscarPedidoPorUsuarioId(req, res) {
    const usuarioId = req.params.id

    try {
        const usuarioPedido = await negocio.buscarPedidoPorUsuarioId(usuarioId)
        res.status(200).json(usuarioPedido)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro busca por Usuario!"})
        }
    }
}

async function buscarPedidoPorId(req, res) {
    const id = req.params.id

    try {
        const idPedido = await negocio.buscarPedidoPorId(id)
        res.status(200).json(idPedido)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro busca por Id!"})
        }
    }
}

// Update
async function atualizarPedido(req, res) {
    const id = req.params.id
    const pedido = req.body

    try {
        const pedidoAtualizado = await negocio.atualizarPedido(id, pedido)
        res.status(200).json(pedidoAtualizado)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro ao atualizar!"})
        }
    }
}

// Delete
async function deletarPedido(req, res) {
    const id = req.params.id

    try {
        const pedidoDeletado = await negocio.deletarPedido(id)
        res.status(200).json(pedidoDeletado)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error)
        } else {
            res.status(500).json({message: "Erro interno!"})
        }
    }
}

module.exports = {
    addPedido,
    buscarPedido,
    buscarPedidoPorProdutoId,
    buscarPedidoPorUsuarioId,  
    buscarPedidoPorId,
    atualizarPedido,
    deletarPedido
}