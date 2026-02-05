const express = require('express')
const router = express.Router()

const EstacionamentoController = require('../controller/EstacionamentoController')

router.get('/', EstacionamentoController.home)

router.post('/registrarEntrada', async (req, res) => {
  try {
    await EstacionamentoController.registrarEntrada(req, res)
  } catch (error) {
    console.error(error)
    res.redirect('/?erro=1')
  }
})

router.post('/liberar_veiculo', async(req, res)=>{
  try {
    
  } catch (error) {
    console.log(error)
    res.redirect('/?erro=1')
  }
})

module.exports = router