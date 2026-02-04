const express = require('express')
const router = express.Router()

const EstacionamentoController = require('../controller/EstacionamentoController')

router.get('/', EstacionamentoController.home)

module.exports = router