const validTypes = ['Plante', 'Poison', 'Feu', 'Eau', 'Insecte', 'Vol', 'Normal', 'Combat', 'Electrik', 'Fée']

export default (sequelize, DataTypes) => {
  return sequelize.define('Pokemon', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Le nom est déjà pris"
      },
      validate: {
        notEmpty: {msg: 'Le nom du pokemon ne peut pas être vide.'},
        notNull: {msg: 'Le pokemon doit avoir un nom.'}
      }
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {msg: 'Utilisez uniquement des nombres entiers pour les hp.'},
        notNull: {msg: 'Les pv sont une propriété requise.'},
        min: {
            args: [0],
            msg: 'Les pv ne peuvent être inferieurs à 0'
        },
        max: {
            args: [999],
            msg: 'Les pv ne peuvent être superieurs à 999'
        }
      }
    },
    cp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {msg: 'Utilisez uniquement des nombres entiers pour les cp.'},
        notNull: {msg: 'Les cp sont une propriété requise.'},
        min: {
            args: [0],
            msg: 'Les cp ne peuvent être inferieurs à 0'
        },
        max: {
            args: [99],
            msg: 'Les cp ne peuvent être superieurs à 999'
        }
      }
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: {msg: 'Utilisez uniquement un URL.'},
        notNull: {msg: 'La photo est une propriété requise.'}
      }
    },
    types: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue('types').split(',')
      },
      set(types) {
        this.setDataValue('types', types.join())
      },
      validate: {
        isTypesValid(value) {
            if(!value) {
                throw new Error('Un pokémon doit au moins avoir un type.')
            }
            if(value.split(',').length > 3) {
                throw new Error('Un pokémon ne peux pas avoir plus de trois types.')
            }
            value.split(',').forEach(type => {
                if(!validTypes.includes(type)) {
                    throw new Error(`Le type d'un pokémon doit appartenir à la liste suivante: ${validTypes}`)
                }
            });
        }
      }
    }
  }, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
  })
}