const VagasModel = require('../model/VagasModel');
const VeiculosModel = require('../model/VeiculosModel');
const EstacionamentoModel = require('../model/EstacionamentoModel'); // Novo model para a tabela estacionamento
const conexao = require('../config/bancoDeDados');

const EstacionamentoController = {

  async home(req, res) {
    try {
      const vagasDisponiveis = await VagasModel.listarPorStatus('disponivel');
      const vagasLista = await VagasModel.listarTodas();
      const veiculosAtivos = await VeiculosModel.listarAtivos();
      const veiculos_estacionados = await VeiculosModel.veiculosEstacionados();
      const historicoVeiculosEstacionados = await VeiculosModel.historicoVeiculosEstacionados();


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
        veiculosAtivos,
        veiculos_estacionados,
        historicoVeiculosEstacionados,
        vaga_disponiveis: totalDisponiveis,
        vagas_ocupadas: totalOcupadas,
        carro: totalCarros,
        moto: totalMotos,
        sucesso: req.query.sucesso || null,
        erro: req.query.erro || null
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
  },

  async registrarEntrada(req, res) {
    try {
      let { vaga_disponivel, tipo_veiculo, placa, modelo, cor } = req.body;

      if (!placa) {
        return res.status(400).json({ erro: 'Placa é obrigatória' })
      }

      if (await VeiculosModel.placaExiste(placa)) {
        return res.redirect('/?erro=placa_existente');
      }

      if (!vaga_disponivel) {
        const proximaVaga = await VagasModel.buscarVagasProxima();
        vaga_disponivel = proximaVaga.id;
      }

      const veiculo = await VeiculosModel.registrarEntrada({
        tipo_veiculo,
        placa,
        modelo,
        cor,
        status: 'ativo'
      });

      await EstacionamentoModel.registrarEntrada({
        veiculo_id: veiculo.insertId,
        vaga_id: vaga_disponivel,
        entrada: new Date()
      });

      await VagasModel.atualizarStatusVaga(vaga_disponivel, 'ocupado');

      res.redirect('/?sucesso=1');
    } catch (error) {
      console.error(error);
      res.redirect('/?erro=1');
    }
  },

  async liberar_veiculo(req, res) {
    try {
      const { veiculo_id, vaga_id, estacionamento_id } = req.body

      if (!veiculo_id || !vaga_id || !estacionamento_id) {
        throw new Error('Dados obrigatórios não informados')
      }

      await VeiculosModel.atualizarStatusVeiculo(veiculo_id)
      await EstacionamentoModel.atualizarSaidaEstacionamento(estacionamento_id)
      await VagasModel.atualizarStatusVaga(vaga_id, 'disponivel')

      res.redirect('/?sucesso=2')

    } catch (error) {
      console.error(error)
      res.redirect('/?erro=1')
    }
  },

  async pesquisar_historico(req, res) {
    try {
      const { placa_veiculo } = req.body;

      if (!placa_veiculo) {
        return res.status(400).json({ erro: 'Placa não informada' });
      }

      const historicoPesquisa = await EstacionamentoModel.buscarPlacaHistorico(placa_veiculo);

      if (historicoPesquisa.length === 0) {
        return res.status(404).json({ erro: 'Nenhum registro encontrado', historico: [] });
      }

      res.json({ historico: historicoPesquisa });

    } catch (error) {
      console.error('Erro ao pesquisar histórico:', error);
      res.status(500).json({ erro: 'Ocorreu um erro ao buscar o histórico' });
    }
  }
  
};

module.exports = EstacionamentoController;
