const { Service } = require('feathers-mongoose')

exports.Users = class Users extends Service {
  create (data, params) {
    const {
      email,
      password,
      firstname,
      lastname
    } = data

    const userData = {
      email,
      password,
      firstname,
      lastname
    }

    return super.create(userData, params)
  }


}
