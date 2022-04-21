/* eslint-disable no-console */
const express = require('express')
const logger = require('morgan')
const db = require('./db')

const app = express()

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function callback() {
  console.log('MongoDB Connected...')
})

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

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
