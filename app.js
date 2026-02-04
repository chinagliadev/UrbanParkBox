const express = require('express');
const app = express();
const estacionamentoRouter = require('./routes/estacionamento');
const { engine } = require('express-handlebars')

app.engine('handlebars', engine({
  defaultLayout: 'main',
  partialsDir: './views/partials',
  helpers: {
    eq: (a, b) => a === b
  }
}));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.set('view engine', 'handlebars')
app.set('views', './views')

app.use('/bootstrap', express.static('./node_modules/bootstrap/dist'))
app.use(express.static('public'))

app.use('/', estacionamentoRouter);

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
