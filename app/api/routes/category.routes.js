const { Router } = require('express')
const ctr = require('../controllers/category.controller')
const router = Router()

// /api/prilavok/category
router.post('/prilavok/category', ctr.create)
router.get('/prilavok/categories', ctr.getAll)
router.get('/prilavok/category/:id', ctr.getById)
router.put('/prilavok/category/:id', ctr.update)
router.delete('/prilavok/category/:id', ctr.remove)

// /api/category
router.get('/categories', ctr.getAll)
router.get('/category/:slug', ctr.getBySlug)

module.exports = router
