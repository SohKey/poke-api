import { User } from '../db/sequelize.js'
import bcrypt from 'bcrypt'
import { ValidationError, UniqueConstraintError} from 'sequelize'

export default (app) => {
    app.post('/api/register', (req, res) => {

        console.log(req.body.userInfos)
        bcrypt.hash(req.body.userInfos.password, 10)
        .then(pass =>
            User.create({
                username: req.body.userInfos.username, 
                email: req.body.userInfos.email,
                password: pass,
        }))
          .then(user => {
            const message = `Le compte ${req.body.username} a bien été créer.`
            res.json({ message, user })
          })
          .catch(error => {
            if (error instanceof ValidationError) {
              return res.status(400).json({ message: error.message, error})
            }
            if (error instanceof UniqueConstraintError) {
              return res.status(400).json({ message: error.message, error})
            }
            const message = 'Le compte n\'a pas pu être créer. Réessayer dans quelques intants'
            res.status(500).json({ message, data: error })
          })
    })
}
