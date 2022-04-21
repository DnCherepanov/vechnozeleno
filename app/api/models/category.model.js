const { Schema, model } = require('mongoose')

const categorySchema = new Schema({
  title: {
    type: String,
  },
  slug: {
    type: String,
    unique: true,
  },
  parent: {
    type: String,
    default: '/',
  },
  path: {
    type: String,
  },
})

module.exports = model('categories', categorySchema)
