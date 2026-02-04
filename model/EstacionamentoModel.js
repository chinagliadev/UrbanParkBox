const conexao = require('../config/bancoDeDados')

const EstacionamentoModel = {
  registrarEntrada: async ({ veiculo_id, vaga_id, entrada }) => {
    const sql = `INSERT INTO estacionamento (veiculo_id, vaga_id, entrada) 
                 VALUES (?, ?, ?)`;
    const [result] = await conexao.query(sql, [veiculo_id, vaga_id, entrada]);
    return result;
  }
};

module.exports = EstacionamentoModel;