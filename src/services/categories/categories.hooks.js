const { authenticate } = require('@feathersjs/authentication').hooks
const { disallow } = require('feathers-hooks-common')

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [],
    update: [disallow('rest')],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [
      async context => {
        const { _id: categoryId } = context.result
        const { _id: userId } = context.params.user._id

        await context.app.service('users').patch(userId, {
          $push: {
            categories: categoryId
          }
        })
      }
    ],
    update: [],
    patch: [],
    remove: [
      async context => {
        const { _id: categoryId } = context.result
        const { _id: userId } = context.params.user._id

        await context.app.service('users').patch(userId, {
          $pull: {
            categories: categoryId
          }
        })
      }
    ]
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
