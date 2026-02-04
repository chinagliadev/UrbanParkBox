const conexao = require('../config/bancoDeDados');

const VeiculosModel = {
  listarAtivos: async () => {
    try {
      const sql = `SELECT * FROM veiculos WHERE status = 'ativo'`;
      const [rows] = await conexao.query(sql);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  contarPorTipo: async (type) => {
    try {
      const sql = `SELECT COUNT(*) AS totalVeiculos 
                   FROM veiculos 
                   WHERE status = 'ativo' AND tipo = ?`;
      const [rows] = await conexao.query(sql, [type]);
      return rows[0]?.totalVeiculos || 0;
    } catch (error) {
      throw error;
    }
  },

  registrarEntrada: async ({tipo, placa, modelo, cor, status}) => {
    const sql = `INSERT INTO veiculos (tipo, placa, modelo, cor, status) 
                 VALUES (?, ?, ?, ?)`;
    const [result] = await conexao.query(sql, [tipo, placa, modelo, cor,status]);
    return result;
  }
};

module.exports = VeiculosModel;
