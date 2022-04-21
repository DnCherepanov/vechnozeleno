const { Router } = require('express')
const router = Router()

const upload = require('../middleware/upload')
const ctr = require('../controllers/product.controller')

router.post(
  '/prilavok/product',
  upload.fields([
    { name: 'cover', maxCount: 1 },
    { name: 'media', maxCount: 4 },
  ]),
  ctr.create
)

router.get('/products', ctr.getAll)
router.get('/product/:id', ctr.getById)
router.get('/search/', ctr.getSearch)
router.put('/prilavok/product/:id', ctr.update)
router.delete('/prilavok/product/:id', ctr.delete)

module.exports = router
