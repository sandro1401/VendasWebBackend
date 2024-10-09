const express = require('express')
const controller = require('../controller/pedido_controller')

const router = express.Router()


router.post('/', controller.addPedido)
router.get('/pedidos', controller.buscarPedido) //listar
router.get('/produto/:produtoId', controller.buscarPedidoPorProdutoId)

router.get('/usuario/:usuarioId', controller.buscarPedidoPorUsuarioId)

router.get('/:id', controller.buscarPedidoPorId)
router.put('/:id', controller.atualizarPedido)
router.delete('/:id', controller.deletarPedido)

module.exports = router