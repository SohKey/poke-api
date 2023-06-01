import { Pokemon } from '../db/sequelize.js'

export default (app) =>  {
  app.get('/api/pokemons/:id', (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then(pokemon => {
        const message = 'Un pokémon a bien été trouvé.'
        res.json({ message, data: pokemon })
      })
      .catch(error => {
        const message = 'Le pokemon n\'a pas pu être récupéré. Réessayer dans quelques intants'
        res.status(500).json({ message, data: error })
      })
  })
}