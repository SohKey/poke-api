const express = require('express')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 3000

app 
.use(favicon(__dirname + '/favicon.ico'))
// .use(morgan('dev'))
.use(bodyParser.json())
.use(cors())

sequelize.initDb()

// Points de terminaisons

app.get('/', (req, res) => {
    res.json('Hello, poke-api is ready to use !')
})

require('./src/routes/findAllPokemons')(app)
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)
require('./src/routes/login')(app)
require('./src/routes/register')(app)
require('./src/routes/getAccountInfo')(app)

// Gestion d'erreurs
app.use(({res}) => {
    const message = 'Impossible de trouver la ressource demandée !'
    res.status(404).json({message})
})

app.listen(port, () => console.log(`Appli démarée sur: http://localhost:${port}`))