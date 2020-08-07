const { authenticate } = require('@feathersjs/authentication').hooks
const { protect } = require('@feathersjs/authentication-local').hooks
const { populate } = require('feathers-hooks-common')

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
    all: [
      protect('password'),
      populate({
        schema: {
          include: [
            {
              service: 'categories',
              nameAs: 'categories',
              parentField: 'categories',
              childField: '_id',
              asArray: true
            },
            {
              service: 'suppliers',
              nameAs: 'suppliers',
              parentField: 'suppliers',
              childField: '_id',
              asArray: true
            }
          ]
        }
      })
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
