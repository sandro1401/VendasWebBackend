const express = require('express')
const controller = require('../controller/usuario_controller')

const router = express.Router()


router.post('/', controller.addUsuario)
router.get('/usuarios', controller.buscarUsuario) //listar
router.get('/nome/:nome', controller.buscarUsuarioPorNome)
router.get('/email/:email', controller.buscarUsuarioPorEmail)

router.get('/:id', controller.buscarUsuarioPorId)
router.put('/:id', controller.atualizarUsuario)
router.delete('/:id', controller.deletarUsuario)

module.exports = router