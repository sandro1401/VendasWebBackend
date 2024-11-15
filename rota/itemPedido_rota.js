const express = require('express')
const controller = require('../controller/itemPedido_controller')

const router = express.Router()


router.post('/:id', controller.addItemPedido)
router.get('/', controller.buscarItemPedido) 
router.get('/:id', controller.buscarItemPedidoPorId)
router.get('/produto/:produtoId', controller.buscarItemPedidoPorProdutoId)
router.get('/pedido/:pedidoId', controller.buscarItemPedidoPorPedidoId)
router.put('/:id', controller.atualizarItemPedido)
router.delete('/:id', controller.deletarItemPedido)

module.exports = router