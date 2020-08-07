const { authenticate } = require('@feathersjs/authentication').hooks

const onlyCurrentUser = context => {
  const userId = context.params.user._id

  context.params.query = {
    owners: userId
  }
}

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [onlyCurrentUser],
    get: [onlyCurrentUser],
    create: [
      async context => {
        const userId = context.params.user._id
        let owners = context.data.owners || []

        if (!owners.includes(userId)) {
          owners = [userId, ...owners]
        }

        context.data.owners = owners
      }
    ],
    update: [],
    patch: [onlyCurrentUser],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [
      // async context => {
      //   const { _id: accountId, owners } = context.result

      //   owners.forEach(async ownerId => {
      //     await context.app.service('users').patch(ownerId, {
      //       $push: {
      //         accounts: accountId
      //       }
      //     })
      //   })
      // }
    ],
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
