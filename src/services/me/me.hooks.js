const { authenticate } = require('@feathersjs/authentication').hooks
const { protect } = require('@feathersjs/authentication-local').hooks
const { disallow } = require('feathers-hooks-common')

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [disallow('rest')], // TODO: Make it work!
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
