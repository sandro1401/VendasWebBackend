const express = require('express')
const controller = require('../controller/produto_controller')

const router = express.Router()


router.post('/', controller.addProduto)
router.get('/', controller.buscarProduto) 
router.get('/:id', controller.buscarProdutoPorId)
router.get('/nome/:nome', controller.buscarProdutoPorNome)
router.get('/categoria/:categoriaId', controller.buscarProdutoPorCategoria)
router.put('/:id', controller.atualizarProduto)
router.delete('/:id', controller.deletarProduto)

module.exports = router