// Initializes the `categories` service on path `/categories`
const { Categories } = require('./categories.class')
const createModel = require('../../models/categories.model')
const hooks = require('./categories.hooks')

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: {
      'default': 50,
      'max': 50
    },
    multi: true,
    whitelist: ['$populate']
  }

  // Initialize our service with any options it requires
  app.use('/categories', new Categories(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('categories')

  service.hooks(hooks)
}
