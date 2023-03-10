const cyrillic = require('slug')
const Category = require('../models/category.model')
const Product = require('../models/product.model')

module.exports.create = async (req, res) => {
  const slug = cyrillic(req.body.title)
  const category = new Category({
    title: req.body.title,
    slug,
    parent: req.body.parent,
    path:
      req.body.parent !== '/'
        ? req.body.parent + '/' + slug
        : req.body.parent + slug,
  })

  try {
    await category.save()
    res.status(201).json(category)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

module.exports.getAll = async (req, res) => {
  try {
    const categories = await Category.find().sort({ date: -1 })
    res.json(categories)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

module.exports.getById = async (req, res) => {
  try {
    await Category.findById(req.params.id).exec((_error, category) => {
      res.json(category)
    })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

module.exports.getBySlug = async (req, res) => {
  try {
    const products = await Product.find({
      isActive: true,
      // eslint-disable-next-line security/detect-non-literal-regexp
      'category.path': { $regex: new RegExp('^/' + req.params.slug) },
    })
      .select(
        'title category netPrice grossPrice discount stock cover media date'
      )
      .sort({ date: -1 })
      .lean()
    res.json(products)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

module.exports.update = async (req, res) => {
  const slug = cyrillic(req.body.title)
  const $set = {
    title: req.body.title,
    slug,
    parent: req.body.parent,
    path:
      req.body.parent !== '/'
        ? req.body.parent + '/' + slug
        : req.body.parent + slug,
  }
  try {
    const category = await Category.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set },
      { new: true }
    )
    res.json(category)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

module.exports.remove = async (req, res) => {
  try {
    await Category.deleteMany({ parent: req.body.path })
    await Category.deleteOne({ _id: req.params.id })
    res.json({ message: 'Категория удалена' })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
