const express = require('express')
const controller = require('../controller/categoria_controller')

const router = express.Router()


router.post('/', controller.addCategoria)
router.get('/', controller.buscarCategoria) 
router.get('/:id', controller.buscarCategoriaPorId)
router.get('/categoria/:nome', controller.buscarCategoriaPorNome)
router.put('/:id', controller.atualizarCategoria)
router.delete('/:id', controller.deletarCategoria)

module.exports = router