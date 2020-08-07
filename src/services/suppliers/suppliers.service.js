// Initializes the `suppliers` service on path `/suppliers`
const { Suppliers } = require('./suppliers.class')
const createModel = require('../../models/suppliers.model')
const hooks = require('./suppliers.hooks')

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
  app.use('/suppliers', new Suppliers(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('suppliers')

  service.hooks(hooks)
}
