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

router.post('/liberar_veiculo', async (req, res) => {
  try {
    await EstacionamentoController.liberar_veiculo(req, res)
  } catch (error) {
    console.log(error)
    res.redirect('/?erro=1')
  }
})

router.post('/historico', async (req, res) => {
  try {
    await EstacionamentoController.pesquisar_historico(req, res);
  } catch (error) {
    res.status(500).json({ erro: 'Erro inesperado ao buscar histórico' });
  }
});

module.exports = router