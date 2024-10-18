const express = require('express')
const controller = require('../controller/usuario_controller')

const router = express.Router()


router.post('/', controller.addUsuario)
router.get('/', controller.buscarUsuario) 
router.get('/:id', controller.buscarUsuarioPorId)
router.get('/nome/:nome', controller.buscarUsuarioPorNome)
router.get('/email/:email', controller.buscarUsuarioPorEmail)
router.put('/:id', controller.atualizarUsuario)
router.delete('/:id', controller.deletarUsuario)

module.exports = router