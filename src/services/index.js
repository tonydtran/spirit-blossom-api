const users = require('./users/users.service.js')
const accounts = require('./accounts/accounts.service.js')
const me = require('./me/me.service.js')
const categories = require('./categories/categories.service.js')
const suppliers = require('./suppliers/suppliers.service.js')
const companies = require('./companies/companies.service.js')
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users)
  app.configure(accounts)
  app.configure(me)
  app.configure(categories)
  app.configure(suppliers)
  app.configure(companies)
}
