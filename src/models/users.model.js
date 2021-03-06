// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'users'
  const mongooseClient = app.get('mongooseClient')
  const schema = new mongooseClient.Schema({

    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, 'Email is required.'],
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    firstname: { type: String, trim: true, default: null },
    lastname: { type: String, trim: true, default: null },
    roles: {
      type: [String],
      default: ['user'], // ['user', 'admin']
      required: true
    },
    categories: {
      type: [mongooseClient.Schema.Types.ObjectId],
      ref: 'categories'
    },
    suppliers: {
      type: [mongooseClient.Schema.Types.ObjectId],
      ref: 'suppliers'
    },
    recipients: [{
      account: {
        type: mongooseClient.Schema.Types.ObjectId,
        ref: 'accounts'
      },
      customName: { type: String, trim: true }
    }],
    archived: {
      type: Boolean,
      default: false
    }
  }, {
    timestamps: true
  })

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName)
  }
  return mongooseClient.model(modelName, schema)

}
