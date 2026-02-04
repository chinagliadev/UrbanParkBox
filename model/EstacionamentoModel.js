const conexao = require('../config/bancoDeDados')

const estacionamento = {

    getVeiculosEstacionados: async () => {
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
    }

}

module.exports = estacionamento