const { Router } = require('express')
const router = Router()

const upload = require('../middleware/upload')
const remove = require('../middleware/remove')
const ctr = require('../controllers/product.controller')

router.post(
  '/prilavok/product',
  upload.handleErrors,
  upload.resizeImages,
  ctr.create
)

router.get('/prilavok/products', ctr.prilavokAll)
router.get('/products', ctr.getAll)
router.get('/product/:id', ctr.getById)
router.get('/search/', ctr.getSearch)
router.put(
  '/prilavok/product/:id',
  upload.handleErrors,
  upload.resizeImages,
  ctr.update
)
router.delete('/prilavok/product/:id', remove.images, ctr.delete)

module.exports = router
