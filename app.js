const express = require('express')
const conexao = require('./config/bancoDeDados')

const { engine } = require('express-handlebars')

const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine('handlebars', engine({
  partialsDir: './views/partials'
}))

app.set('view engine', 'handlebars')
app.set('views', './views')

app.use('/bootstrap', express.static('./node_modules/bootstrap/dist'))
app.use(express.static('public'))


app.get('/', async (req, res) => {
  try {
    const SQL = "SELECT * FROM vagas WHERE status = 'disponivel'";
    const [vagas] = await conexao.query(SQL);

    res.render('home', {
      vagas,
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


app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000')
})
