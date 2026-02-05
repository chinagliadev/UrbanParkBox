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

  veiculosEstacionados: async () => {

    try {
      const sql = `SELECT 
      estacionamento.id AS estacionamento_id,
      vagas.id AS vaga_id,
      veiculos.id AS veiculo_id,
      veiculos.status AS veiculos_status,
      DATE_FORMAT(estacionamento.entrada, '%d/%m/%Y %H:%i') AS entrada,
      veiculos.modelo,
      veiculos.placa,
      veiculos.cor,
      veiculos.tipo,
      vagas.numero,
      vagas.setor
      FROM estacionamento
      INNER JOIN veiculos ON estacionamento.veiculo_id = veiculos.id
      INNER JOIN vagas ON estacionamento.vaga_id = vagas.id
      WHERE veiculos.status = 'ativo';`

      const [rows] = await conexao.query(sql)
      return rows
    } catch (error) {
      throw error
    }

  },
  historicoVeiculosEstacionados: async () => {
    try {
      const sql = `SELECT 
      estacionamento.id AS estacionamento_id,
      vagas.id AS vaga_id,
      veiculos.id AS veiculo_id,
      veiculos.status AS veiculos_status,
      DATE_FORMAT(estacionamento.entrada, '%d/%m/%Y %H:%i') AS entrada,
      veiculos.modelo,
      veiculos.placa,
      veiculos.cor,
      veiculos.tipo,
      vagas.numero,
      vagas.setor
      FROM estacionamento
      INNER JOIN veiculos ON estacionamento.veiculo_id = veiculos.id
      INNER JOIN vagas ON estacionamento.vaga_id = vagas.id`

      const [rows] = await conexao.query(sql)
      return rows
    } catch (error) {
      throw error
    }
  }
  ,

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

  registrarEntrada: async ({ tipo_veiculo, placa, modelo, cor, status }) => {
    const sql = `INSERT INTO veiculos (tipo, placa, modelo, cor, status) 
               VALUES (?, ?, ?, ?, ?)`;

    const [result] = await conexao.query(sql, [
      tipo_veiculo || null,
      placa,
      modelo || null,
      cor || null,
      status || 'ativo'
    ]);

    return result;
  }

};

module.exports = VeiculosModel;
