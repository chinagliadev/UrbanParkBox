const conexao = require('../config/bancoDeDados');

const VagaModel = {

    getAllVagas: async () => {
        try {
            const sql = 'SELECT * FROM vagas';
            const [rows] = await conexao.query(sql);
            return rows;
        } catch (error) {
            throw error;
        }
    },

    getAllVagasStatus: async (status) => {
        try {
            const sql = 'SELECT * FROM vagas WHERE status = ?';
            const [rows] = await conexao.query(sql, [status]);
            return rows;
        } catch (error) {
            throw error;
        }
    },

    getCountVagasByStatus: async (status) => {
        try {
            const sql = 'SELECT COUNT(*) AS totalVagas FROM vagas WHERE status = ?'
            const [rows] = await conexao.query(sql, [status])
            return rows[0].totalVagas
        } catch (error) {
            throw error;
        }
    }

};

module.exports = VagaModel;