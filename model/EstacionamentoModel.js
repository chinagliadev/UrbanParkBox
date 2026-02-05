const conexao = require('../config/bancoDeDados')

const EstacionamentoModel = {
  registrarEntrada: async ({ veiculo_id, vaga_id, entrada }) => {
    const sql = `INSERT INTO estacionamento (veiculo_id, vaga_id, entrada) 
                 VALUES (?, ?, ?)`;
    const [result] = await conexao.query(sql, [veiculo_id, vaga_id, entrada]);
    return result;
  },

  atualizarSaidaEstacionamento: async (estacionamentoId) => {
    try {
      const sql = `
      UPDATE estacionamento 
      SET saida = NOW() 
      WHERE id = ?
    `

      const [result] = await conexao.query(sql, [estacionamentoId])
      return result
    } catch (error) {
      throw error
    }
  },

  buscarPlacaHistorico: async (placa) => {
    try {
      const sql = `
      SELECT 
        estacionamento.id AS estacionamento_id,
        vagas.id AS vaga_id,
        veiculos.id AS veiculo_id,
        veiculos.status AS veiculos_status,
        DATE_FORMAT(estacionamento.entrada, '%d/%m/%Y %H:%i') AS entrada,
        DATE_FORMAT(estacionamento.saida, '%d/%m/%Y %H:%i') AS saida,
        veiculos.modelo,
        veiculos.placa,
        veiculos.cor,
        veiculos.tipo,
        vagas.numero,
        vagas.setor
      FROM estacionamento
      INNER JOIN veiculos ON estacionamento.veiculo_id = veiculos.id
      INNER JOIN vagas ON estacionamento.vaga_id = vagas.id
      WHERE veiculos.status <> 'ativo' AND veiculos.placa = ?
    `;

      const [rows] = await conexao.query(sql, [placa]); 
      return rows; 
    } catch (error) {
      console.error('Erro ao buscar histórico da placa:', error);
      throw error; 
    }
  }


};

module.exports = EstacionamentoModel;