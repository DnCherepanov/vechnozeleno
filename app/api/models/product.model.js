const { Schema, model } = require('mongoose')

const ProductSize = Schema({
  _id: false,
  label: { type: String },
  value: { type: String },
  stock: { type: Number },
})

const ProductColor = Schema({
  _id: false,
  label: { type: String },
  value: { type: String },
  stock: { type: Number },
})

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    title: { type: String, default: '' },
    slug: { type: String, default: '' },
    path: { type: String, default: '' },
  },
  description: {
    type: String,
  },
  specification: {
    type: String,
  },
  size: [ProductSize],
  color: [ProductColor],
  netPrice: {
    type: Number,
    default: 0,
  },
  grossPrice: {
    type: Number,
    default: 0,
  },
  discount: {
    type: Number,
    default: 0,
  },
  stock: {
    type: String,
    default: 0,
  },
  cover: {
    type: String,
    default: '/products/default-cover.svg',
  },
  media: {
    type: Array,
    default: [],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = model('products', productSchema)
