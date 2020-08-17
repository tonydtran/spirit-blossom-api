// Application hooks that run for every service
const { disallow } = require('feathers-hooks-common')

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [disallow('rest')],
    patch: [],
    remove: [
      async context => {
        const { params: { user } } = context
        const isAdmin = user && user.roles.includes('admin')

        if (!isAdmin) {
          disallow('rest')
        }
      }
    ]
  },

  after: {
    all: [
      async context => {
        const { params: { user }, result } = context
        const isAdmin = user && user.roles.includes('admin')

        if (!isAdmin) {
          delete result.archived
          delete result.__v
          delete result.createdAt
          delete result.updatedAt
        }
      }
    ],
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
