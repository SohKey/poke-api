import { Pokemon } from '../db/sequelize.js'
import { Op } from 'sequelize'

export default (app) => {
  app.get('/api/pokemons', (req, res) => {
    if(req.query.name) { // Query with filters
      const name = req.query.name
      const limit = parseInt(req.query.limit) || 5

      if(name.length < 2) {
        const message = 'La recherche dois contenir au minimum 2 caractères.'
        return res.status(400).json({ message })
      }

      return Pokemon.findAndCountAll({ 
        where: {
          name: {
            [Op.like]: `%${name}%`
          },
        },
        limit: limit,
        order: ['name'],
        subQuery:false
      })
      .then(({count, rows}) => {
        const message = `Il y a ${count} pokemons qui correspondent au terme de recherche ${name}.`
        res.json({ message, data: rows })
      })
    } else if(req.query.limit) { // No filter
      const limit = parseInt(req.query.limit) || 5
      const min_id = parseInt(req.query.min_id) || 0

      return Pokemon.findAll({ 
        order: ['id'], 
        limit: limit,
        where: {
          id: {
            [Op.gte]: min_id
          }
        }
      })
        .then(pokemons => {
          const message = 'La liste des pokémons a bien été récupérée.'
          res.json({ message, data: pokemons })
        })
        .catch(error => {
          const message = "La liste des pokemons n'a pas pu être récupérée. Réessayer dans quelques instants"
          res.status(500).json({ message, data: error })
        })
    } else {
      return Pokemon.findAll({ 
        order: ['id'], 
      })
        .then(pokemons => {
          const message = 'La liste des pokémons a bien été récupérée.'
          res.json({ message, data: pokemons })
        })
        .catch(error => {
          const message = "La liste des pokemons n'a pas pu être récupérée. Réessayer dans quelques instants"
          res.status(500).json({ message, data: error })
        })
    }
  })
}