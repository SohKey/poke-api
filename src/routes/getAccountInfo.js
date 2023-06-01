import { User } from '../db/sequelize.js'
import auth from '../auth/auth.js'

export default (app) => {
  app.get('/api/account/:id', auth, (req, res) => {
    User.findByPk(req.params.id)
      .then(user => {
        const message = 'Un utilisateur a bien été trouvé.'
        res.json({ message, data: user })
      })
      .catch(error => {
        const message = 'L\'utilisateur n\'a pas pu être récupéré. Réessayer dans quelques intants'
        res.status(500).json({ message, data: error })
      })
  })
}