const express = require('express')
const controller = require('../controller/categoria_controller')

const router = express.Router()


router.post('/', controller.addCategoria)
router.get('/categorias', controller.buscarCategoria) //listar
router.get('/nome/:nome', controller.buscarCategoriaPorNome)


router.get('/:id', controller.buscarCategoriaPorId)
router.put('/:id', controller.atualizarCategoria)
router.delete('/:id', controller.deletarCategoria)

module.exports = router