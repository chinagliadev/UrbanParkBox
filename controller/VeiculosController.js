const VeiculosModel = require('../model/VeiculosModel')

const VeiculosController = {
  contarVeiculosPorTipo: async (req, res) => {
    try {
      const qtdVeiculos = await VeiculosModel.contarVeiculosPorTipo()

      res.render('home', {
        qtdVeiculos
      })
    } catch (error) {
      console.error('Erro ao contar veículos por tipo:', error)

      res.status(500).render('erro', {
        mensagem: 'Erro ao carregar contagem de veículos'
      })
    }
  }
}

module.exports = VeiculosController