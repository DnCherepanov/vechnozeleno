const Product = require('../models/product.model')

module.exports.create = async (req, res) => {
  try {
    const product = new Product({
      title: req.body.title,
      category: {
        title: req.body.category.title,
        slug: req.body.category.slug,
        path: req.body.category.path,
      },
      description: req.body.description,
      specification: req.body.specification,
      size: JSON.parse(req.body.size),
      color: JSON.parse(req.body.color),
      netPrice: req.body.netPrice,
      grossPrice: req.body.grossPrice,
      discount: req.body.discount,
      stock: req.body.stock,
      categories: req.body.categories,
      isActive: req.body.isActive,
      cover: req.body.cover[0],
      media: req.body.media,
    })
    await product.save()
    res.status(201).json(product)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

module.exports.prilavokAll = async (req, res) => {
  try {
    const products = await Product.find()
      .select('title netPrice grossPrice stock cover date')
      .sort({ date: -1 })
      .lean()
    res.status(200).json(products)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

module.exports.getAll = async (req, res) => {
  try {
    const limit = Number(req.query.limit)
    const products = await Product.find({ isActive: true })
      .select(
        'title category netPrice grossPrice discount stock cover media date'
      )
      .sort({ date: -1 })
      .limit(limit)
      .lean()
    res.status(200).json(products)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

module.exports.getSearch = async (req, res) => {
  try {
    const term = req.query.search
    const condition = term
      ? { title: { $regex: new RegExp(term), $options: 'i' } }
      : {}
    const result = await Product.find(condition)
      .select('title category grossPrice discount cover isActive date')
      .sort({ date: -1 })
      .lean()
    res.status(200).json(result)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

module.exports.getById = async (req, res) => {
  try {
    await Product.findById(req.params.id).exec((_error, product) => {
      res.status(200).json(product)
    })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

module.exports.update = async (req, res) => {
  const $set = {
    title: req.body.title,
    category: {
      title: req.body.category.title,
      slug: req.body.category.slug,
      path: req.body.category.path,
    },
    size: JSON.parse(req.body.size),
    color: JSON.parse(req.body.color),
    description: req.body.description,
    specification: req.body.specification,
    netPrice: req.body.netPrice,
    grossPrice: req.body.grossPrice,
    discount: req.body.discount,
    stock: req.body.stock,
    isActive: req.body.isActive,
  }
  if (req.body.cover.length > 0) {
    Object.assign($set, { cover: req.body.cover[0] })
  }
  if (req.body.media.length > 0) {
    Object.assign($set, { media: req.body.media })
  }
  try {
    const product = await Product.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set }
    )
    res.status(200).json(product)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

module.exports.delete = async (req, res) => {
  try {
    await Product.deleteOne({ _id: req.params.id })
    res.status(200).json({ message: 'товар удален' })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
