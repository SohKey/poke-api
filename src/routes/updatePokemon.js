import { Pokemon } from '../db/sequelize.js'
import { ValidationError } from 'sequelize'
import auth from '../auth/auth.js'

export default (app) => {
  app.put('/api/pokemons/:id', auth, (req, res) => {
    const id = req.params.id
    Pokemon.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      return Pokemon.findByPk(id).then(pokemon => {
        if (pokemon === null) {
            const message = 'Le pokemon n\'existe pas. Réessayer avec un nouvel identifiant'
            res.status(404).json({ message, data: error })
        }
        const message = `Le pokémon ${pokemon.name} a bien été modifié.`
        res.json({message, data: pokemon })
      })
    })
    .catch(error => {
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, error})
      }
      if (error instanceof UniqueConstraintError) {
        return res.status(400).json({ message: error.message, error})
      }
      const message = 'Le pokemon n\'a pas pu être modifié. Réessayer dans quelques intants'
      res.status(500).json({ message, data: error })
    })
  })
}