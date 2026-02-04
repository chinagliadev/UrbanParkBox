const conexao = require('../config/bancoDeDados');

const VagasModel = {
  async listarTodas() {
    const [rows] = await conexao.query('SELECT * FROM vagas');
    return rows;
  },

  async listarPorStatus(status) {
    const [rows] = await conexao.query('SELECT * FROM vagas WHERE status = ?', [status]);
    return rows;
  },

  async contarPorStatus(status) {
    const [rows] = await conexao.query('SELECT COUNT(*) AS total FROM vagas WHERE status = ?', [status]);
    return rows[0].total;
  },

  atualizarStatusVaga: async (id) => {
    const sql = 'UPDATE vagas SET status = ? WHERE id = ?';
    const [result] = await conexao.query(sql, ['ocupado', id]);
    return result;
  },

  buscarVagasProxima: async () =>{
    const [rows] = await conexao.query('SELECT * FROM vagas LIMIT 1');
    return rows[0];
  }

};

module.exports = VagasModel;
