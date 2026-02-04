const VagasModel = require('../model/VagasModel');
const VeiculosModel = require('../model/VeiculosModel');

const EstacionamentoController = {
  async home(req, res) {
    try {
      const vagasDisponiveis = await VagasModel.listarPorStatus('disponivel');
      const vagasLista = await VagasModel.listarTodas();
      const veiculosAtivos = await VeiculosModel.listarAtivos();

      const setores = {};
      vagasLista.forEach(vaga => {
        if (!setores[vaga.setor]) setores[vaga.setor] = [];
        setores[vaga.setor].push(vaga);
      });

      const totalDisponiveis = await VagasModel.contarPorStatus('disponivel');
      const totalOcupadas = await VagasModel.contarPorStatus('ocupado');
      const totalCarros = await VeiculosModel.contarPorTipo('carro');
      const totalMotos = await VeiculosModel.contarPorTipo('moto');

      return res.render('home', {
        vagas: vagasDisponiveis,
        setores,
        veiculos_estacionados: veiculosAtivos,
        vaga_disponiveis: totalDisponiveis,
        vagas_ocupadas: totalOcupadas,
        carro: totalCarros,
        moto: totalMotos,
        sucesso: req.query.sucesso === '1',
        erro: null
      });
    } catch (error) {
      console.error(error);
      return res.render('home', {
        vagas: [],
        setores: {},
        veiculos_estacionados: [],
        vaga_disponiveis: 0,
        vagas_ocupadas: 0,
        carro: 0,
        moto: 0,
        sucesso: false,
        erro: 'Erro ao carregar as vagas. Tente novamente mais tarde.'
      });
    }
  }
};

module.exports = EstacionamentoController;
