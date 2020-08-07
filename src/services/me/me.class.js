/* eslint-disable no-unused-vars */
exports.Me = class Me {
  constructor (options) {
    this.options = options || {}
  }

  async find (params) {
    const userId = params.user._id
    const userData = await this.options.users.get(userId)
    const userAccounts = await this.options.accounts.find(params)

    return {
      ...userData,
      accounts: userAccounts
    }
  }

  async patch (id, data, params) {
    return data
  }
}
