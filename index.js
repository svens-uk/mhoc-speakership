const express = require('express')
const path = require('path')
const session = require('express-session')
const app = express()
const PORT = process.env.PORT || 3400

const database = require('./database')
const api = require('./routes/api')
const auth = require('./routes/auth')
const bills = require('./routes/bills')

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views/'))

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: crypto.randomUUID(),
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use(express.static(path.join(__dirname, 'public/')))
app.use('/css/icons', express.static(path.join(__dirname, 'node_modules/bootstrap-icons/font')))
app.use('/css/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js/dompurify', express.static(path.join(__dirname, 'node_modules/dompurify/dist')))
app.use('/js/marked', express.static(path.join(__dirname, 'node_modules/marked')))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(auth.authenticator)

app.use('/', auth.router)
app.use('/bills', bills)
app.use('/api', api)

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(PORT, () => console.log('listening on ' + PORT))
