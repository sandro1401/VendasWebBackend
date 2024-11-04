const express = require('express')
const controller = require('../controller/login_controller')

const router = express.Router()


router.get('/', controller.login)


module.exports = router