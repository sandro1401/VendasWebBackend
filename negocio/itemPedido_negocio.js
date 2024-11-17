const persistencia = require('../persistencia/itemPedido_persistence')
const {buscarPedidoPorId} = require('..//persistencia/pedido_persistence')

// Iniciando CRUD

// Create
async function addItemPedido(pedidoId, itemPedidos) {
    const id = await buscarPedidoPorId(pedidoId)
   
    if (!id) {
        throw ({status: 400, message: "Não exite  este Pedido."})
    }

    
    if (itemPedidos && itemPedidos.quantidade && itemPedidos.preco_unitario
        && itemPedidos.produtoId && itemPedidos.concluido) {
        try {
            const itemPedido = await persistencia.addItemPedido(pedidoId, itemPedidos)
            return itemPedido
        } catch (error) { throw error }
    } else {
        console.log(itemPedidos)
        const erro = new Error()
        erro.message = "Todos os campos são obrigatórios."
        erro.status = 400
        throw erro
    }
}

// Read
async function buscarItemPedido() {
    try {
        const itemPedido = await persistencia.buscarItemPedido()

        if (itemPedido.length == 0) {
            const erro = new Error()
            erro.message = "Não há item no Pedido cadastrados."
            erro.status = 404
            throw erro
        }

        return itemPedido
    } catch (error) { throw error }
}

async function buscarItemPedidoPorProdutoId(produtoId) {
    try {
        const produtoItemPedido = await persistencia.buscarItemPedidoPorProdutoId(produtoId)

        if (!produtoItemPedido) {
            const erro = new Error()
            erro.message = "produtos de item Pedido não encontrado."
            erro.status = 404
            throw erro
        }

        return produtoItemPedido
    } catch (error) { throw error }
}

async function buscarItemPedidoPorPedidoId(pedidoId) {
    try {
        const pedidoItemPedido = await persistencia.buscarItemPedidoPorPedidoId(pedidoId)

        if (!pedidoItemPedido) {
            const erro = new Error()
            erro.message = "pedido do item Pedido não encontrado."
            erro.status = 404
            throw erro
        }

        return pedidoItemPedido
    } catch (error) { throw error }
}

async function buscarItemPedidoPorId(id) {
    try {
        const idItemPedido = await persistencia.buscarItemPedidoPorId(id)

        if (!idItemPedido) {
            const erro = new Error()
            erro.message = "Id não encontrado."
            erro.status = 404
            throw erro
        }

        return idItemPedido
    } catch (error) { throw error }
}

// Update
async function atualizarItemPedido(id, itemPedidos) {
    if (itemPedidos && itemPedidos.quantidade && itemPedidos.preco_unitario && itemPedidos.pedidoId 
        && itemPedidos.produtoId && itemPedidos.concluido ) {
        const itemPedidoAtualizado = await persistencia.atualizarItemPedido(id, itemPedidos)
           
        if (!itemPedidoAtualizado) {
            let erro = new Error()
            erro.message = "Item Pedido não encontrado."
            erro.status = 404
            throw erro
        }

        return itemPedidoAtualizado
    } else {
        let erro = new Error()
        erro.message = "Todos os campos são obrigatórios."
        erro.status = 400
        throw erro
    }
}

// Delete
async function deletarItemPedido(id) {
    try {
        const itemPedidoDeletada =  await persistencia.deletarItemPedido(id)

        if (!itemPedidoDeletada) {
            const erro = new Error()
            erro.message = "Item Pedido não encontrado"
            erro.status = 404
            throw erro
        }

        return itemPedidoDeletada
    } catch (error) { throw error }
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