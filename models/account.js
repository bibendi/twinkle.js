import { Sequelize, Model } from 'sequelize'
import { sequelize } from '../lib/sequelize'

export class Account extends Model {}

Account.init({
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 64]
    }
  }
}, { sequelize, underscored: true })
