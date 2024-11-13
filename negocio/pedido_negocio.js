const persistencia = require('../persistencia/pedido_persistence')
const {buscarUsuarioPorId} = require('../persistencia/usuario_persistence')

// Iniciando CRUD

// Create
async function addPedido(usuarioId, pedidos) {
    const id = await buscarUsuarioPorId(usuarioId)
//    console.log(id)
    if (!id) {
        throw ({status: 400, message: "Usuário inexistente."})
    }

    
    if (pedidos && pedidos.quantidade 
         && pedidos.data_Pedido && pedidos.produtoId && usuarioId
       ) {
        try {
            const pedido = await persistencia.addPedido(usuarioId, pedidos)
            return pedido
        } catch (error) { throw error }
    } else {
        const erro = new Error()
        erro.message = "Todos os campos são obrigatórios."
        erro.status = 400
        throw erro
    }
}

// Read
async function buscarPedido() {
    try {
        const pedido = await persistencia.buscarPedido()

        if (pedido.length == 0) {
            const erro = new Error()
            erro.message = "Não há Pedidos cadastrados."
            erro.status = 404
            throw erro
        }

        return pedido
    } catch (error) { throw error }
}

async function buscarPedidoPorProdutoId(produtoId) {
    try {
        const produtoPedido = await persistencia.buscarPedidoPorProduto(produtoId)

        if (!produtoPedido) {
            const erro = new Error()
            erro.message = "produto de Pedido não encontrado."
            erro.status = 404
            throw erro
        }

        return produtoPedido
    } catch (error) { throw error }
}

async function buscarPedidoPorUsuarioId(usuarioId) {
    try {
        const usuarioPedido = await persistencia.buscarPedidoPorUsuarioId(usuarioId)

        if (!usuarioPedido) {
            const erro = new Error()
            erro.message = "usuario de Pedido não encontrado."
            erro.status = 404
            throw erro
        }

        return usuarioPedido
    } catch (error) { throw error }
}

async function buscarPedidoPorId(id) {
    try {
        const idPedido = await persistencia.buscarPedidoPorId(id)

        if (!idPedido) {
            const erro = new Error()
            erro.message = "Id não encontrado."
            erro.status = 404
            throw erro
        }

        return idPedido
    } catch (error) { throw error }
}

// Update
async function atualizarPedido(id, pedidos) {
    if (pedidos && pedidos.quantidade && pedidos.valorTotal  && pedidos.data_Pedido  && pedidos.produtoId 
        && pedidos.usuarioId) {
        const pedidoAtualizado = await persistencia.atualizarPedido(id, pedidos)

        if (!pedidoAtualizado) {
            let erro = new Error()
            erro.message = "Pedido não encontrado."
            erro.status = 404
            throw erro
        }

        return pedidoAtualizado
    } else {
        let erro = new Error()
        erro.message = "Todos os campos são obrigatórios."
        erro.status = 400
        throw erro
    }
}

// Delete
async function deletarPedido(id) {
    try {
        const pedidoDeletada =  await persistencia.deletarPedido(id)

        if (!pedidoDeletada) {
            const erro = new Error()
            erro.message = "Usuário não encontrado"
            erro.status = 404
            throw erro
        }

        return pedidoDeletada
    } catch (error) { throw error }
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