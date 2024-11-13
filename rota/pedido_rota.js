const express = require('express')
const controller = require('../controller/pedido_controller')

const router = express.Router()


router.post('/', controller.addPedido)
router.get('/', controller.buscarPedido)
router.get('/:id', controller.buscarPedidoPorId)
router.get('/pedido/:produtoId', controller.buscarPedidoPorProdutoId)
router.get('/user/:id', controller.buscarPedidoPorUsuarioId)
router.put('/:id', controller.atualizarPedido)
router.delete('/:id', controller.deletarPedido)

module.exports = router