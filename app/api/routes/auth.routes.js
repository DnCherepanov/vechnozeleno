const express = require('express')
const router = express.Router()
const expressJwt = require('express-jwt')

const ctr = require('../controllers/auth.controller')

const app = express()

app.use(
  expressJwt({
    secret: process.env.SECRET,
    algorithms: ['HS256'],
  }).unless({
    path: '/api/auth/login',
  })
)

router.post('/auth/login', ctr.login)
router.get('/auth/user', ctr.user)
router.post('/auth/logout', ctr.logout)

module.exports = router
