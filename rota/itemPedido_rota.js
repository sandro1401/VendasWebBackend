const express = require('express')
const controller = require('../controller/itemPedido_controller')

const router = express.Router()


router.post('/', controller.addItemPedido)
router.get('/itemPedidos', controller.buscarItemPedido) //listar
router.get('/produto/:produtoId', controller.buscarItemPedidoPorProdutoId)

router.get('/pedido/:pedidoId', controller.buscarItemPedidoPorPedidoId)

router.get('/:id', controller.buscarItemPedidoPorId)
router.put('/:id', controller.atualizarItemPedido)
router.delete('/:id', controller.deletarItemPedido)

module.exports = router