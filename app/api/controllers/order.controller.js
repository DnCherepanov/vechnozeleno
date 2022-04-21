const mailer = require('../services/mailer')
const Order = require('../models/order.model')

module.exports.create = async (req, res) => {
  const customer = {
    firstName: req.body.customer.firstName,
    lastName: req.body.customer.lastName,
    phone: req.body.customer.phone,
    email: req.body.customer.email,
  }
  const order = new Order({
    status: req.body.status,
    customer,
    cart: req.body.cart,
    delivery: req.body.delivery,
    totalPrice: req.body.total,
  })
  try {
    await order.save()
    const orderObject = {
      id: order._id,
      items: order.cart,
      customer: order.customer,
      delivery: order.delivery,
      totalPrice: order.totalPrice,
      date: order.date,
    }
    await mailer.toPourtoi(orderObject)
    await mailer.toCustomer(orderObject)
    res.status(201).json(order)
  } catch (e) {
    res.status(500).json(e.errors)
  }
}

module.exports.update = async (req, res) => {
  const $set = req.body
  try {
    const order = await Order.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set }
    )
    res.status(200).json(order)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

module.exports.getAll = async (req, res) => {
  try {
    const orders = await Order.find().sort({ date: -1 })
    res.json(orders)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

module.exports.getById = async (req, res) => {
  try {
    await Order.findById(req.params.id).exec((_error, order) => {
      res.json(order)
    })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

module.exports.remove = async (req, res) => {
  try {
    await Order.deleteOne({ _id: req.params.id })
    res.json({ message: 'Категория удалена' })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
