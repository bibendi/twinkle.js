import { Base } from '../base'
import { Membership } from '../../models'

export class JoinAccount extends Base {
  constructor (account, user, { role = 'user' } = {}, options) {
    super(options)

    if (role === 'owner') throw new Error('Cannot join account as owner')

    this.account = account
    this.user = user
    this.role = role
  }

  call () {
    return Membership.create({
      userId: this.user.id,
      accountId: this.account.id,
      role: this.role
    }, { transaction: this.transaction })
  }
}
