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
    firstname: { type: String, trim: true },
    lastname: { type: String, trim: true },
    categories: {
      type: [mongooseClient.Schema.Types.ObjectId],
      ref: 'categories'
    },
    providers: {
      type: [mongooseClient.Schema.Types.ObjectId],
      ref: 'providers'
    },
    recipients: [{
      account: {
        type: mongooseClient.Schema.Types.ObjectId,
        ref: 'accounts'
      },
      customName: { type: String, trim: true }
    }]


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
