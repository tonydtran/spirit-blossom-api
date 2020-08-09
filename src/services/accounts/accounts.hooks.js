const { authenticate } = require('@feathersjs/authentication').hooks
const { populate } = require('feathers-hooks-common')

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
        try {
          await context.app.service('companies').get(context.data.company._id)
        } catch (e) {
          const newCompany = await context.app.service('companies').create({
            name: context.data.company.name
          })

          context.data.company = newCompany._id
        } finally {
          const userId = context.params.user._id
          let owners = context.data.owners || []

          if (!owners.includes(userId)) {
            owners = [userId, ...owners]
          }

          context.data.owners = owners
        }
      }
    ],
    update: [],
    patch: [
      onlyCurrentUser,
      async context => {
        try {
          await context.app.service('companies').get(context.data.company._id)
        } catch (e) {
          const newCompany = await context.app.service('companies').create({
            name: context.data.company.name
          })

          context.data.company = newCompany._id
        }
      }
    ],
    remove: []
  },

  after: {
    all: [
      populate({
        schema: {
          include: {
            service: 'companies',
            nameAs: 'company',
            parentField: 'company',
            childField: '_id'
          }
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
