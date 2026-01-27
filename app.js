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

app.get('/', (req, res) => {
  res.render('home')
})

app.post('/registrarEntrada', (req, res) => {

  const { tipo_veiculo, vagas_disponivel, placa, modelo, cor } = req.body;

  console.log(tipo_veiculo);
  console.log(vagas_disponivel);
  console.log(placa);
  console.log(modelo);
  console.log(cor);

  res.send('Entrada registrada');
});


app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000 🚀')
})
