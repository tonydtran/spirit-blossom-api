const app = require('../src/app')
const createUserModel = require('../src/models/users.model')
const createAccountModel = require('../src/models/accounts.model')
const createCategoryModel = require('../src/models/categories.model')

const User = createUserModel(app)
const Account = createAccountModel(app)
const Category = createCategoryModel(app)

/**
 * Make any changes you need to make to the database here
 */
async function up () {
  await User.updateMany(
    {
      archived: { $exists: false }
    },
    {
      $set: {
        archived: false
      }
    }
  )
  await Account.updateMany(
    {
      archived: { $exists: false }
    },
    {
      $set: {
        archived: false
      }
    }
  )
  await Category.updateMany(
    {
      archived: { $exists: false }
    },
    {
      $set: {
        archived: false
      }
    }
  )
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down () {
  await User.updateMany(
    {
      archived: { $exists: true }
    },
    {
      $unset: {
        archived: ''
      }
    }
  )
  await Account.updateMany(
    {
      archived: { $exists: true }
    },
    {
      $unset: {
        archived: ''
      }
    }
  )
  await Category.updateMany(
    {
      archived: { $exists: true }
    },
    {
      $unset: {
        archived: ''
      }
    }
  )
}

module.exports = { up, down }
