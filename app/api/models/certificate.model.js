const { Schema, model } = require('mongoose')

const certificateSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  phone: {
    type: Number,
    unique: true,
  },
  certificate: {
    type: String,
    unique: true,
  },
})

module.exports = model('certificates', certificateSchema)
