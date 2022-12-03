/* eslint-disable no-console */
const express = require('express')
const helmet = require('helmet')
const compression = require('compression')
const logger = require('morgan')
const rateLimit = require('express-rate-limit')
const db = require('./db')

const app = express()

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function callback() {
  console.log('...Database Connected...')
})

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())
app.use(compression())

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

app.use(limiter)

const authRoutes = require('./routes/auth.routes')
const productRoutes = require('./routes/product.routes')
const categoryRoutes = require('./routes/category.routes')
const orderRoutes = require('./routes/order.routes')
const formsRoutes = require('./routes/forms.routes')

app.use(authRoutes)
app.use(productRoutes)
app.use(categoryRoutes)
app.use(orderRoutes)
app.use(formsRoutes)

module.exports = {
  path: '/api',
  handler: app,
}
