const Article = require('../models/article.model')

module.exports.create = async (req, res) => {
  try {
    const article = new Article({
      title: req.body.title,
      photo: req.body.photo[0],
      content: req.body.content,
      tags: req.body.tags,
      readingTime: req.body.readingTime,
    })
    await article.save()
    res.status(201).json(article)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

module.exports.getAll = async (req, res) => {
  try {
    const limit = Number(req.query.limit)
    const articles = await Article.find().sort({ date: -1 }).limit(limit).lean()
    res.status(200).json(articles)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

module.exports.getById = async (req, res) => {
  try {
    await Article.findById(req.params.id).exec((_error, article) => {
      res.status(200).json(article)
    })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

module.exports.delete = async (req, res) => {
  try {
    await Article.deleteOne({ _id: req.params.id })
    res.status(200).json({ message: 'статья удалена' })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
