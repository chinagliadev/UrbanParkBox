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
  }
};

module.exports = VagasModel;
