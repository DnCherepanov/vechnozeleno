const { Router } = require('express')
const router = Router()

const upload = require('../middleware/upload')
const remove = require('../middleware/remove')
const ctr = require('../controllers/article.controller')

router.post(
  '/prilavok/article',
  upload.handleErrors,
  upload.resizeImages,

  ctr.create
)

router.get('/articles', ctr.getAll)
router.get('/article/:id', ctr.getById)
router.delete('/prilavok/article/:id', remove.images, ctr.delete)

module.exports = router
