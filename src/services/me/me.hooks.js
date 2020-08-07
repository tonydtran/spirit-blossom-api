const { authenticate } = require('@feathersjs/authentication').hooks
const { protect } = require('@feathersjs/authentication-local').hooks

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [
      async context => {
        const userId = context.params.user._id

        context.id = userId
      }
    ],
    remove: []
  },

  after: {
    all: [protect('password')],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}
