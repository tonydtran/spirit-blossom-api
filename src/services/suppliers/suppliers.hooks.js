const { authenticate } = require('@feathersjs/authentication').hooks

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [],
    update: [],
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
            suppliers: categoryId
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
            suppliers: categoryId
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
