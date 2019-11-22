import { rule, allow } from 'graphql-shield'
import { User } from '../../models'

async function setUserContext (context) {
  if (context.authPayload) context.user = await User.findByPk(context.authPayload.id)
}

export const isAuthenticated = rule({ cache: 'contextual' })(
  async (_, __, context) => {
    await setUserContext(context)
    return !!context.user
  }
)

export const isMember = rule({ cache: 'contextual' })(
  async (_, __, context) => {
    await setUserContext(context)
    return !!(context.user && context.user.role === 'member')
  }
)

export const isAdmin = rule({ cache: 'contextual' })(
  async (_, __, context) => {
    await setUserContext(context)
    return !!(context.user && context.user.role === 'admin')
  }
)

export const permissions = {
  Query: {
    currentUser: isAuthenticated
  },

  Mutation: {
    login: allow,
    signup: allow
  }
}