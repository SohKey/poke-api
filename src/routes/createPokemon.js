const { Pokemon } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
  app.post('/api/pokemons', auth, (req, res) => {
    console.log(req.body)
    Pokemon.create(req.body)
      .then(pokemon => {
        const message = `Le pokémon ${req.body.name} a bien été crée.`
        res.json({ message, pokemon })
      })
      .catch(error => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, error})
        }
        if (error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, error})
        }
        const message = 'Le pokemon n\'a pas pu être ajouté. Réessayer dans quelques intants'
        res.status(500).json({ message, error })
      })
  })
}