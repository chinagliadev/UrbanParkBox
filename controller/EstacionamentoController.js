const EstacionamentoModel = require('../model/EstacionamentoModel')

const estacionamentoController = {
  listarEstacionamento: async (req, res) => {
    try {
      const veiculosEstacionados = await EstacionamentoModel.getVeiculosEstacionados()

      res.render('home', {
        veiculosEstacionados
      })
    } catch (error) {
      console.error('Erro ao listar estacionamento:', error)

      res.status(500).render('erro', {
        mensagem: 'Erro ao carregar o estacionamento'
      })
    }
  }
}

module.exports = estacionamentoController
