const conexao = require('../config/bancoDeDados')

const veiculos = {

    getCountVeiculosByType: async (type) => {
        try {
            const sql = `SELECT COUNT(*) AS totalVeiculos FROM veiculos WHERE tipo = ? AND status = 'ativo'`
            const [rows] = await conexao.query(sql, [type])
            return rows[0].totalVeiculos
        } catch (error) {
            throw error
        }
    }

}

module.exports = veiculos

 