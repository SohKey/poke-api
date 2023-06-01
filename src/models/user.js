export default (sequelize, DataTypes) => {
    return sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        unique: {
            msg: 'Ce nom d\'utilisateur est déjà utilisé'
        }
      },
      email: {
        type: DataTypes.STRING,
        unique: {
            msg: 'Cet email est déjà utilisé'
        }
      },
      password: {
        type: DataTypes.STRING
      }
    })
  }