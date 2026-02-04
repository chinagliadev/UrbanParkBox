const conexao = require('../config/bancoDeDados')

const veiculos = {

    getCountVeiculosByType: async (type) => {
        try {
            const sql = `SELECT tipo, COUNT(*) AS totalVeiculos FROM veiculos WHERE status = 'ativo' GROUP BY tipo`
            const [rows] = await conexao.query(sql, [type])
            return rows[0].totalVeiculos
        } catch (error) {
            throw error
        }
    }

}

module.exports = veiculos
