import { Pokemon } from '../db/sequelize.js'
import auth from '../auth/auth.js'

export default (app) => {
  app.delete('/api/pokemons/:id', auth, (req, res) => {
     Pokemon.findByPk(req.params.id).then(pokemon => {
      if (pokemon === null) {
        const message = 'Le pokemon n\'existe pas. Réessayer avec un nouvel identifiant'
        res.status(404).json({ message, data: error })
      }
      const pokemonDeleted = pokemon;
      return Pokemon.destroy({
        where: { id: pokemon.id }
      })
      .then(_ => {
        const message = `Le pokémon avec l'identifiant n°${pokemonDeleted.id} a bien été supprimé.`
        res.json({message, pokemonDeleted })
      })
    })
    .catch(error => {
      const message = 'Le pokemon n\'a pas pu être supprimé. Réessayer dans quelques intants'
      res.status(500).json({ message, data: error })
    })
  })
}