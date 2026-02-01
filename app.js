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
  const { tipo_veiculo, vagas_disponivel, placa, modelo, cor } = req.body;
  const status = 'ativo';

  if (!tipo_veiculo || !placa || !modelo || !cor) {
    return res.redirect('/erro');
  }

  try {

    let vagaId = vagas_disponivel
    if (vagaId === '') {
      const SQLVAGAS = "SELECT * FROM vagas WHERE status = 'disponivel' LIMIT 1";
      const [vagas] = await conexao.query(SQLVAGAS);
      const vagaDisponivel = vagas[0];
      const UPDATEVAGA = "UPDATE vagas SET status = 'ocupado' WHERE id = ?";
      await conexao.query(UPDATEVAGA, [vagaDisponivel.id]);

      return  res.redirect('/');
    }

    const SQLVEICULO = `
        INSERT INTO veiculos (tipo, placa, modelo, cor, status)
        VALUES (?, ?, ?, ?, ?)
      `;

    const SQLVAGAS = `
      UPDATE vagas SET status = 'ocupado' WHERE id = ?
    `

    await conexao.query(SQLVEICULO, [
      tipo_veiculo,
      placa,
      modelo,
      cor,
      status,
    ]);

    await conexao.query(SQLVAGAS, [vagas_disponivel])

    res.redirect('/');

  } catch (err) {
    console.error(err);
    res.redirect('/erro');
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000')
})
