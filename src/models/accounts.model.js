// accounts-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'accounts'
  const mongooseClient = app.get('mongooseClient')
  const Float = require('mongoose-float').loadType(mongooseClient)
  const { Schema } = mongooseClient
  const schema = new Schema({
    name: {
      type: String,
      required: [true, 'Name is required.'],
      trim: true
    },
    owners: {
      type: [mongooseClient.Schema.Types.ObjectId],
      ref: 'users'
    },
    balance: { type: Float, default: 0.00 },
    transaction: {
      type: [mongooseClient.Schema.Types.ObjectId],
      ref: 'transactions',
    },
    recurrences: {
      type: [mongooseClient.Schema.Types.ObjectId],
      ref: 'recurrences'
    },
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
