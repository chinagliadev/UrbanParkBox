const express = require('express')
const conexao = require('./config/bancoDeDados')

const { engine } = require('express-handlebars')

const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine('handlebars', engine({
  defaultLayout: 'main',
  partialsDir: './views/partials',
  helpers: {
    eq: (a, b) => a === b
  }
}));

app.set('view engine', 'handlebars')
app.set('views', './views')

app.use('/bootstrap', express.static('./node_modules/bootstrap/dist'))
app.use(express.static('public'))


app.get('/', async (req, res) => {
  try {
    const SQLVAGASDISPONIVEIS = "SELECT * FROM vagas WHERE status = 'disponivel'";
    const SQLLISTARVEICULOS = `SELECT 
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

    const SQLCONTAGEMVAGASDISPONIVEIS = `SELECT COUNT(*) AS total FROM vagas WHERE status = 'disponivel'
`   

    const SQLCONTAGEMVAGASOCUPADAS = `SELECT COUNT(*) AS totalOcupadas FROM vagas WHERE status = 'ocupado'`

    const [vagas] = await conexao.query(SQLVAGASDISPONIVEIS);
    const [veiculos_estacionados] = await conexao.query(SQLLISTARVEICULOS)
    const [resultado] = await conexao.query(SQLCONTAGEMVAGASDISPONIVEIS)
    const [resultadoOcupadas] = await conexao.query(SQLCONTAGEMVAGASOCUPADAS)

    res.render('home', {
      vagas,
      veiculos_estacionados,
      vaga_disponiveis: resultado[0].total,
      vagas_ocupadas: resultadoOcupadas[0].totalOcupadas,
      sucesso: req.query.sucesso === '1',
      erro: null
    });

  } catch (err) {
    console.error(err);

    res.render('home', {
      vagas: [],
      erro: 'Erro ao carregar as vagas. Tente novamente mais tarde.'
    });
  }
});

app.post('/', async (req, res) => {
  const { tipo_veiculo, vaga_disponivel, placa, modelo, cor } = req.body;
  const status = 'ativo';

  if (!tipo_veiculo || !placa || !modelo || !cor) {
    return res.redirect('/erro');
  }

  const SQLVEICULO = `
    INSERT INTO veiculos (tipo, placa, modelo, cor, status)
    VALUES (?, ?, ?, ?, ?)
  `;

  const SQLVAGAALEATORIA = `
    SELECT id FROM vagas WHERE status = 'disponivel' LIMIT 1
  `;

  const SQLUPDATEVAGA = `
    UPDATE vagas SET status = 'ocupado' WHERE id = ?
  `;

  const SQLESTACIONAMENTO = `
    INSERT INTO estacionamento (veiculo_id, vaga_id)
    VALUES (?, ?)
  `;

  try {
    let vagaId = vaga_disponivel;

    if (!vagaId) {
      const [vagas] = await conexao.query(SQLVAGAALEATORIA);

      if (vagas.length === 0) {
        return res.redirect('/semVagas');
      }

      vagaId = vagas[0].id;
    }

    const [resultadoVeiculo] = await conexao.query(SQLVEICULO, [
      tipo_veiculo,
      placa,
      modelo,
      cor,
      status,
    ]);

    const veiculoId = resultadoVeiculo.insertId;

    await conexao.query(SQLUPDATEVAGA, [vagaId]);

    await conexao.query(SQLESTACIONAMENTO, [
      veiculoId,
      vagaId,
    ]);

    res.redirect('/?sucesso=1');

  } catch (err) {
    console.error(err);
    res.redirect('/erro');
  }
});

app.post('/liberar_veiculo', async (req, res) => {
  const { veiculo_id, vaga_id, estacionamento_id } = req.body;

  if (!veiculo_id || !vaga_id || !estacionamento_id) {
    return res.redirect('/');
  }

  const SQLUPDATEVEICULO = `
  UPDATE veiculos
  SET status = 'finalizado',
      data_saida = NOW()
  WHERE id = ?
  `;


  const SQLUPDATEVAGA = `
    UPDATE vagas 
    SET status = 'disponivel' 
    WHERE id = ?
  `;

  const SQLUPDATEESTACIONAMENTO = `
    UPDATE estacionamento
    SET saida = NOW()
    WHERE id = ?;
  `;

  await conexao.query(SQLUPDATEVEICULO, [veiculo_id]);
  await conexao.query(SQLUPDATEVAGA, [vaga_id]);
  await conexao.query(SQLUPDATEESTACIONAMENTO, [estacionamento_id]);

  return res.redirect('/');
});



app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000')
})
