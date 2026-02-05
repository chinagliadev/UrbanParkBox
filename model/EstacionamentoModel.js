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
  }


};

module.exports = EstacionamentoModel;