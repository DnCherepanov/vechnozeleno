const { Router } = require('express')
const ctr = require('../controllers/forms.controller')
const router = Router()

// /api/certificate
router.post('/certificate', ctr.createCertificate)

// /api/contactUs
router.post('/contactUs', ctr.sendForm)

module.exports = router
