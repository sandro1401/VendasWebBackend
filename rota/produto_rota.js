const express = require('express')
const controller = require('../controller/produto_controller')
const{ upload, processImages } = require('../multerConfig')
const router = express.Router()


// router.post('/', controller.addProduto)
router.post('/', upload.array('imagem_url'),processImages, controller.addProduto)
router.get('/', controller.buscarProduto) 
router.get('/:id', controller.buscarProdutoPorId)
router.get('/nome/:nome', controller.buscarProdutoPorNome)
router.get('/categoria/:categoriaId', controller.buscarProdutoPorCategoria)
router.put('/:id', controller.atualizarProduto)

router.delete('/:id', controller.deletarProduto)

module.exports = router