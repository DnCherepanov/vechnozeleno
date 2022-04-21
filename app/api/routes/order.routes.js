const { Router } = require('express')
const ctr = require('../controllers/order.controller')
const router = Router()

router.post('/prilavok/order', ctr.create)
router.get('/prilavok/orders', ctr.getAll)
router.get('/prilavok/order/:id', ctr.getById)
router.put('/prilavok/order/:id', ctr.update)
router.delete('/prilavok/order/:id', ctr.remove)

module.exports = router
