const { Schema, model } = require('mongoose')

const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    default: '',
  },
  content: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    default: [],
  },
  readingTime: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = model('articles', articleSchema)
