const express = require('express')
const { engine } = require('express-handlebars')

const app = express()

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

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000 🚀')
})
