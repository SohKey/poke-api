import express from 'express'
import favicon from 'serve-favicon'
import bodyParser from 'body-parser'
import { initDb } from './src/db/sequelize.js'
import cors from 'cors'

// routes

import findAllPokemons from './src/routes/findAllPokemons.js'
import findPokemonByPk from './src/routes/findPokemonByPk.js'
import createPokemon from './src/routes/createPokemon.js'
import updatePokemon from './src/routes/updatePokemon.js'
import deletePokemon from './src/routes/deletePokemon.js'
import login from './src/routes/login.js'
import register from './src/routes/register.js'
import getAccountInfo from './src/routes/getAccountInfo.js'

const app = express()
const port = process.env.PORT || 3000

app
.use(favicon('./favicon.ico'))
.use(bodyParser.json())
.use(cors())

initDb()

// Points de terminaisons

app.get('/', (req, res) => {
    res.json('Hello, poke-api is ready to use !')
})

findAllPokemons(app)
findPokemonByPk(app)
createPokemon(app)
updatePokemon(app)
deletePokemon(app)
login(app)
register(app)
getAccountInfo(app)

// Gestion d'erreurs
app.use(({res}) => {
    const message = 'Impossible de trouver la ressource demandée !'
    res.status(404).json({message})
})

app.listen(port, () => console.log(`Appli démarée sur: http://localhost:${port}`))